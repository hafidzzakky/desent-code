'use client';

import { useWorkspaceStore } from '@/store/workspace';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon } from '@/components/Icon';

export default function CheckoutPage() {
	const { items, clearWorkspace } = useWorkspaceStore();
	const router = useRouter();

	const total = items.reduce((sum, item) => sum + item.product.price, 0);

	const handleRent = () => {
		alert('Thank you for your order! Your workspace is on its way.');
		clearWorkspace();
		router.push('/');
	};

	if (items.length === 0) {
		return (
			<div className='flex flex-col items-center justify-center h-full p-8 text-center min-h-[calc(100vh-64px)]'>
				<h2 className='text-2xl font-bold mb-4'>Your cart is empty</h2>
				<p className='mb-8'>Go back to the designer to create your workspace.</p>
				<Link href='/designer' className='bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors'>
					Go to Designer
				</Link>
			</div>
		);
	}

	return (
		<div className='max-w-4xl mx-auto p-8 w-full'>
			<h1 className='text-3xl font-bold mb-8'>Checkout Summary</h1>

			<div className='bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mb-8'>
				<table className='w-full text-left'>
					<thead className='bg-gray-50 dark:bg-gray-700'>
						<tr>
							<th className='p-4'>Item</th>
							<th className='p-4'>Category</th>
							<th className='p-4 text-right'>Price</th>
						</tr>
					</thead>
					<tbody>
						{items.map((item) => (
							<tr key={item.id} className='border-t border-gray-100 dark:border-gray-700'>
								<td className='p-4 flex items-center gap-4'>
									<div className='w-16 h-16 bg-white border border-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden shrink-0'>
										<img src={item.product.image} alt={item.product.name} className='w-full h-full object-cover' />
									</div>
									<div>
										<div className='font-medium text-lg'>{item.product.name}</div>
										<div className='text-sm text-gray-500'>{item.product.description}</div>
									</div>
								</td>
								<td className='p-4 capitalize text-gray-600 dark:text-gray-400'>{item.product.category}</td>
								<td className='p-4 text-right font-mono'>${item.product.price}</td>
							</tr>
						))}
					</tbody>
					<tfoot className='bg-gray-50 dark:bg-gray-700 font-bold'>
						<tr>
							<td colSpan={2} className='p-4 text-right'>
								Total
							</td>
							<td className='p-4 text-right text-xl'>${total}</td>
						</tr>
					</tfoot>
				</table>
			</div>

			<div className='flex justify-between items-center'>
				<Link href='/designer' className='text-gray-600 hover:underline'>
					← Back to Designer
				</Link>
				<button
					onClick={handleRent}
					className='bg-green-600 text-white px-8 py-3 rounded-full text-lg font-bold hover:bg-green-700 transition-colors shadow-lg'
				>
					Rent Your Setup
				</button>
			</div>
		</div>
	);
}
