export type Category = 'desk' | 'chair' | 'accessory';

export interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	category: Category;
	icon: string; // Keep icon for fallback or list view
	image: string; // URL for the product image
	dimensions?: {
		width: number;
		height: number;
		depth: number;
	};
}

export interface WorkspaceItem {
	id: string; // Unique instance ID
	productId: string;
	product: Product;
	position: { x: number; y: number; z?: number };
	rotation?: number;
	scale?: number;
}

export interface WorkspaceState {
	items: WorkspaceItem[];
	selectedItemIds: string[];
	isFullscreen: boolean;
	isShoppingListOpen: boolean;
	zoomScale: number;

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

	undo: () => void;
	redo: () => void;
}
