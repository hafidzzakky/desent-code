import ProductList from '@/components/designer/ProductList';
import ShoppingList from '@/components/designer/ShoppingList';
import WorkspaceCanvas from '@/components/designer/WorkspaceCanvas';

export default function DesignerPage() {
	return (
		<div className='flex flex-col h-[calc(100vh-64px)] overflow-hidden relative'>
			<ShoppingList />
			<WorkspaceCanvas />
			<ProductList />
		</div>
	);
}
