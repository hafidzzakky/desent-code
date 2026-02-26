import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WorkspaceItem, Product } from '@/types';

// Define the shape of a history state snapshot
interface HistoryState {
	items: WorkspaceItem[];
}

interface WorkspaceState {
	items: WorkspaceItem[];
	selectedItemIds: string[];
	isFullscreen: boolean;
	isShoppingListOpen: boolean;
	zoomScale: number;

	// History
	past: HistoryState[];
	future: HistoryState[];

	setShoppingListOpen: (isOpen: boolean) => void;
	setZoomScale: (scale: number) => void;
	zoomIn: () => void;
	zoomOut: () => void;
	resetZoom: () => void;

	addItem: (product: Product) => void;
	removeItem: (itemId: string) => void;
	removeSelected: () => void;

	updateItemPosition: (itemId: string, position: { x: number; y: number }) => void;
	moveSelectedItems: (delta: { x: number; y: number }) => void;

	rotateItem: (itemId: string, angle: number) => void;
	scaleItem: (itemId: string, scale: number) => void;

	selectItem: (itemId: string | null, multi?: boolean) => void;
	toggleSelection: (itemId: string) => void;
	deselectAll: () => void;

	toggleFullscreen: () => void;
	clearWorkspace: () => void;

	// History Actions
	undo: () => void;
	redo: () => void;
}

const MAX_HISTORY = 20;

export const useWorkspaceStore = create<WorkspaceState>()(
	persist(
		(set, get) => ({
			items: [],
			selectedItemIds: [],
			isFullscreen: false,
			isShoppingListOpen: false,
			zoomScale: 1,
			past: [],
			future: [],

			setShoppingListOpen: (isOpen) => set({ isShoppingListOpen: isOpen }),
			setZoomScale: (scale) => set({ zoomScale: Math.max(0.1, Math.min(3, scale)) }),
			zoomIn: () => set((state) => ({ zoomScale: Math.min(3, state.zoomScale + 0.1) })),
			zoomOut: () => set((state) => ({ zoomScale: Math.max(0.1, state.zoomScale - 0.1) })),
			resetZoom: () => set({ zoomScale: 1 }),

			// Helper to push state to history
			_pushToHistory: () => {
				const { items, past } = get();
				const newPast = [...past, { items: [...items] }].slice(-MAX_HISTORY);
				set({ past: newPast, future: [] });
			},

			addItem: (product) => {
				const { items, past } = get();
				const newPast = [...past, { items: [...items] }].slice(-MAX_HISTORY);

				const randomOffset = Math.floor(Math.random() * 50) - 25;
				const newItem: WorkspaceItem = {
					id: Math.random().toString(36).substr(2, 9),
					productId: product.id,
					product,
					position: { x: 400 + randomOffset, y: 300 + randomOffset },
					rotation: 0,
					scale: 1,
				};

				set({
					items: [...items, newItem],
					selectedItemIds: [newItem.id],
					past: newPast,
					future: [],
				});
			},

			removeItem: (itemId) => {
				const { items, past, selectedItemIds } = get();
				const newPast = [...past, { items: [...items] }].slice(-MAX_HISTORY);

				set({
					items: items.filter((item) => item.id !== itemId),
					selectedItemIds: selectedItemIds.filter((id) => id !== itemId),
					past: newPast,
					future: [],
				});
			},

			removeSelected: () => {
				const { items, past, selectedItemIds } = get();
				if (selectedItemIds.length === 0) return;

				const newPast = [...past, { items: [...items] }].slice(-MAX_HISTORY);

				set({
					items: items.filter((item) => !selectedItemIds.includes(item.id)),
					selectedItemIds: [],
					past: newPast,
					future: [],
				});
			},

			updateItemPosition: (itemId, position) => {
				const { items, past } = get();
				// This is for absolute positioning (e.g. from properties panel or initial drop if we had that)
				// Or singular drag if we want to support that explicitly.
				const newPast = [...past, { items: [...items] }].slice(-MAX_HISTORY);

				set({
					items: items.map((item) => (item.id === itemId ? { ...item, position } : item)),
					past: newPast,
					future: [],
				});
			},

			moveSelectedItems: (delta) => {
				const { items, past, selectedItemIds } = get();
				if (selectedItemIds.length === 0) return;

				const newPast = [...past, { items: [...items] }].slice(-MAX_HISTORY);

				set({
					items: items.map((item) =>
						selectedItemIds.includes(item.id)
							? {
									...item,
									position: {
										x: item.position.x + delta.x,
										y: item.position.y + delta.y,
									},
								}
							: item,
					),
					past: newPast,
					future: [],
				});
			},

			rotateItem: (itemId, angle) => {
				const { items, past } = get();
				const newPast = [...past, { items: [...items] }].slice(-MAX_HISTORY);

				set({
					items: items.map((item) => (item.id === itemId ? { ...item, rotation: (item.rotation || 0) + angle } : item)),
					past: newPast,
					future: [],
				});
			},

			scaleItem: (itemId, scale) => {
				const { items, past } = get();
				const newPast = [...past, { items: [...items] }].slice(-MAX_HISTORY);

				set({
					items: items.map((item) => (item.id === itemId ? { ...item, scale } : item)),
					past: newPast,
					future: [],
				});
			},

			selectItem: (itemId, multi = false) => {
				if (itemId === null) {
					set({ selectedItemIds: [] });
					return;
				}

				set((state) => {
					if (multi) {
						if (state.selectedItemIds.includes(itemId)) {
							return { selectedItemIds: state.selectedItemIds.filter((id) => id !== itemId) };
						} else {
							return { selectedItemIds: [...state.selectedItemIds, itemId] };
						}
					} else {
						return { selectedItemIds: [itemId] };
					}
				});
			},

			toggleSelection: (itemId) => {
				set((state) => {
					if (state.selectedItemIds.includes(itemId)) {
						return { selectedItemIds: state.selectedItemIds.filter((id) => id !== itemId) };
					} else {
						return { selectedItemIds: [...state.selectedItemIds, itemId] };
					}
				});
			},

			deselectAll: () => set({ selectedItemIds: [] }),

			toggleFullscreen: () => set((state) => ({ isFullscreen: !state.isFullscreen })),

			clearWorkspace: () => {
				const { items, past } = get();
				if (items.length === 0) return;

				const newPast = [...past, { items: [...items] }].slice(-MAX_HISTORY);
				set({ items: [], selectedItemIds: [], past: newPast, future: [] });
			},

			undo: () => {
				const { past, future, items } = get();
				if (past.length === 0) return;

				const previous = past[past.length - 1];
				const newPast = past.slice(0, past.length - 1);

				set({
					items: previous.items,
					past: newPast,
					future: [{ items }, ...future],
					selectedItemIds: [], // Clear selection on undo
				});
			},

			redo: () => {
				const { past, future, items } = get();
				if (future.length === 0) return;

				const next = future[0];
				const newFuture = future.slice(1);

				set({
					items: next.items,
					past: [...past, { items }],
					future: newFuture,
					selectedItemIds: [],
				});
			},
		}),
		{
			name: 'morint-workspace-storage',
			partialize: (state) => ({
				items: state.items,
				past: state.past,
				future: state.future,
				zoomScale: state.zoomScale,
				// We don't persist selection
			}),
		},
	),
);
