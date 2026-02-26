import { create } from 'zustand';
import { WorkspaceItem, Product } from '@/types';

interface WorkspaceState {
	items: WorkspaceItem[];
	selectedItemId: string | null;
	isFullscreen: boolean;
	isShoppingListOpen: boolean;
	setShoppingListOpen: (isOpen: boolean) => void;
	addItem: (product: Product) => void;
	removeItem: (itemId: string) => void;
	updateItemPosition: (itemId: string, position: { x: number; y: number }, isRelative?: boolean) => void;
	rotateItem: (itemId: string, angle: number) => void;
	scaleItem: (itemId: string, scale: number) => void;
	selectItem: (itemId: string | null) => void;
	toggleFullscreen: () => void;
	clearWorkspace: () => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
	items: [],
	selectedItemId: null,
	isFullscreen: false,
	isShoppingListOpen: false,
	setShoppingListOpen: (isOpen) => set({ isShoppingListOpen: isOpen }),
	addItem: (product) =>
		set((state) => {
			// Allow multiple items of any category
			// Only replace if it's the exact same product ID (optional, but good for avoiding duplicates if desired)
			// But for now, let's allow multiple instances of everything as requested by user.

			// Generate a random offset so new items don't stack exactly on top of each other
			const randomOffset = Math.floor(Math.random() * 50) - 25;

			const newItem: WorkspaceItem = {
				id: Math.random().toString(36).substr(2, 9), // Simple ID generation
				productId: product.id,
				product,
				position: { x: 400 + randomOffset, y: 300 + randomOffset }, // Default position center-ish with offset
				rotation: 0,
				scale: 1,
			};

			return { items: [...state.items, newItem], selectedItemId: newItem.id };
		}),
	removeItem: (itemId) =>
		set((state) => ({
			items: state.items.filter((item) => item.id !== itemId),
			selectedItemId: state.selectedItemId === itemId ? null : state.selectedItemId,
		})),
	updateItemPosition: (itemId, position, isRelative = false) =>
		set((state) => ({
			items: state.items.map((item) =>
				item.id === itemId
					? {
							...item,
							position: isRelative ? { x: item.position.x + position.x, y: item.position.y + position.y } : position,
						}
					: item,
			),
		})),
	rotateItem: (itemId, angle) =>
		set((state) => ({
			items: state.items.map((item) => (item.id === itemId ? { ...item, rotation: (item.rotation || 0) + angle } : item)),
		})),
	scaleItem: (itemId, scale) =>
		set((state) => ({
			items: state.items.map((item) => (item.id === itemId ? { ...item, scale } : item)),
		})),
	selectItem: (itemId) => set({ selectedItemId: itemId }),
	toggleFullscreen: () => set((state) => ({ isFullscreen: !state.isFullscreen })),
	clearWorkspace: () => set({ items: [], selectedItemId: null }),
}));
