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
	selectedItemId: string | null;
	addItem: (product: Product) => void;
	removeItem: (itemId: string) => void;
	updateItemPosition: (itemId: string, position: { x: number; y: number }) => void;
	selectItem: (itemId: string | null) => void;
	clearWorkspace: () => void;
}
