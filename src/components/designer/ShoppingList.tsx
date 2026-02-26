'use client';

import { useWorkspaceStore } from '@/store/workspace';
import { ShoppingCart, X, Trash2, Plus, Minus } from 'lucide-react';
import { useState, useMemo } from 'react';

export default function ShoppingList() {
	const { items, removeItem, addItem, isFullscreen, isShoppingListOpen, setShoppingListOpen } = useWorkspaceStore();

	// Group items by product ID to count quantities
	const groupedItems = useMemo(() => {
		const grouped: Record<string, { product: any; quantity: number; total: number; itemIds: string[] }> = {};

		items.forEach((item) => {
			if (!grouped[item.productId]) {
				grouped[item.productId] = {
					product: item.product,
					quantity: 0,
					total: 0,
					itemIds: [],
				};
			}
			grouped[item.productId].quantity += 1;
			grouped[item.productId].total += item.product.price;
			grouped[item.productId].itemIds.push(item.id);
		});

		return Object.values(grouped);
	}, [items]);

	const grandTotal = items.reduce((sum, item) => sum + item.product.price, 0);

	if (isFullscreen) return null;

	return (
		<>
			{/* Drawer Overlay */}
			{isShoppingListOpen && (
				<div className='fixed inset-0 bg-black/20 backdrop-blur-sm z-40' onClick={() => setShoppingListOpen(false)} />
			)}

			{/* Drawer Content */}
			<div
				className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 flex flex-col ${
					isShoppingListOpen ? 'translate-x-0' : 'translate-x-full'
				}`}
			>
				<div className='p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50'>
					<h2 className='font-bold text-lg text-gray-800 dark:text-white flex items-center gap-2'>
						<ShoppingCart size={20} />
						Shopping List
					</h2>
					<button
						onClick={() => setShoppingListOpen(false)}
						className='p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors'
					>
						<X size={20} />
					</button>
				</div>

				<div className='flex-1 overflow-y-auto p-4 space-y-4'>
					{groupedItems.length === 0 ? (
						<div className='text-center py-10 text-gray-400'>
							<ShoppingCart size={48} className='mx-auto mb-3 opacity-20' />
							<p>Your workspace is empty.</p>
							<p className='text-sm mt-1'>Add items to start designing!</p>
						</div>
					) : (
						groupedItems.map((group) => (
							<div
								key={group.product.id}
								className='bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-100 dark:border-gray-700 relative group'
							>
								{/* Remove All Button (Top Right) */}
								<button
									onClick={() => {
										// Remove all instances of this product
										group.itemIds.forEach((id) => removeItem(id));
									}}
									className='absolute top-2 right-2 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100'
									title='Remove all items'
								>
									<Trash2 size={14} />
								</button>

								<div className='flex gap-3 mb-2 pr-6'>
									<div className='w-12 h-12 bg-white rounded border border-gray-200 overflow-hidden shrink-0'>
										<img
											src={group.product.image}
											alt={group.product.name}
											className='w-full h-full object-contain p-1'
										/>
									</div>
									<div className='flex-1 min-w-0'>
										<h3 className='font-medium text-sm text-gray-900 dark:text-gray-100 truncate pr-2'>
											{group.product.name}
										</h3>
										<p className='text-xs text-gray-500 capitalize'>{group.product.category}</p>
									</div>
								</div>

								<div className='flex justify-between items-end pt-2 border-t border-gray-200 dark:border-gray-700 mt-2'>
									<div className='text-left'>
										<div className='font-bold text-sm text-gray-900 dark:text-gray-100'>${group.total}</div>
										<div className='text-xs text-gray-500'>${group.product.price} each</div>
									</div>

									{/* Quantity Controls */}
									<div className='flex items-center gap-2 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-1'>
										<button
											onClick={() => {
												// Remove one instance (last one added)
												if (group.itemIds.length > 0) {
													removeItem(group.itemIds[group.itemIds.length - 1]);
												}
											}}
											className='p-1 text-gray-500 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors disabled:opacity-50'
											disabled={group.quantity <= 0}
										>
											<Minus size={12} />
										</button>
										<span className='text-xs font-medium w-4 text-center select-none'>{group.quantity}</span>
										<button
											onClick={() => addItem(group.product)}
											className='p-1 text-gray-500 hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors'
										>
											<Plus size={12} />
										</button>
									</div>
								</div>
							</div>
						))
					)}
				</div>

				<div className='p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50'>
					<div className='flex justify-between items-center mb-4'>
						<span className='text-gray-500'>Total Items</span>
						<span className='font-medium'>{items.length}</span>
					</div>
					<div className='flex justify-between items-center mb-6'>
						<span className='text-lg font-bold text-gray-800 dark:text-white'>Total Cost</span>
						<span className='text-2xl font-bold text-blue-600'>${grandTotal}</span>
					</div>
					<button
						className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-blue-500/30 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'
						disabled={items.length === 0}
						onClick={() => alert('Proceeding to checkout! (This is a demo)')}
					>
						Checkout Now
					</button>
				</div>
			</div>
		</>
	);
}
