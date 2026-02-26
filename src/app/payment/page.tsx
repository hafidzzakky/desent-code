'use client';

import { useState, useEffect } from 'react';
import { useWorkspaceStore } from '@/store/workspace';
import { useRouter } from 'next/navigation';
import { Check, CreditCard, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PaymentPage() {
	const { items, clearWorkspace } = useWorkspaceStore();
	const router = useRouter();
	const [isProcessing, setIsProcessing] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const total = items.reduce((sum, item) => sum + item.product.price, 0);

	const handlePayment = (e: React.FormEvent) => {
		e.preventDefault();
		setIsProcessing(true);

		// Simulate payment processing
		setTimeout(() => {
			setIsProcessing(false);
			setIsSuccess(true);

			// Clear workspace and redirect after a short delay
			setTimeout(() => {
				clearWorkspace();
				router.push('/');
			}, 3000);
		}, 2000);
	};

	if (!mounted) return null;

	if (items.length === 0 && !isSuccess) {
		return (
			<div className='flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-8 text-center'>
				<h2 className='text-2xl font-bold mb-4'>Your cart is empty</h2>
				<p className='mb-8 text-gray-500'>Go back to the designer to create your workspace.</p>
				<Link
					href='/designer'
					className='bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors'
				>
					Go to Designer
				</Link>
			</div>
		);
	}

	if (isSuccess) {
		return (
			<div className='flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-900 p-4'>
				<div className='bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl text-center max-w-md w-full animate-in fade-in zoom-in duration-300'>
					<div className='w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6'>
						<Check size={40} className='text-green-600 dark:text-green-400' />
					</div>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>Payment Successful!</h2>
					<p className='text-gray-500 dark:text-gray-400 mb-6'>
						Thank you for your purchase. Your workspace setup is being prepared.
					</p>
					<div className='text-sm text-gray-400 animate-pulse'>Redirecting to home...</div>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-6xl mx-auto mb-8'>
				<Link href='/checkout' className='inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors'>
					<ArrowLeft size={20} className='mr-2' />
					Back to Summary
				</Link>
			</div>

			<div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8'>
				{/* Order Summary */}
				<div className='bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm h-fit order-2 lg:order-1'>
					<h2 className='text-xl font-bold mb-4 text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-4'>
						Order Summary
					</h2>
					<div className='space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar'>
						{items.map((item, index) => (
							<div
								key={`${item.id}-${index}`}
								className='flex gap-4 py-2 border-b border-gray-100 dark:border-gray-700 last:border-0 items-center'
							>
								<div className='w-16 h-16 bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden shrink-0 border border-gray-100 dark:border-gray-600'>
									<img
										src={item.product.image}
										alt={item.product.name}
										className='w-full h-full object-contain p-2'
									/>
								</div>
								<div className='flex-1 min-w-0'>
									<h3 className='font-medium text-gray-900 dark:text-white truncate'>{item.product.name}</h3>
									<p className='text-sm text-gray-500 capitalize'>{item.product.category}</p>
								</div>
								<div className='font-medium text-gray-900 dark:text-white whitespace-nowrap'>
									${item.product.price}
								</div>
							</div>
						))}
					</div>
					<div className='flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700'>
						<span className='text-lg font-bold text-gray-900 dark:text-white'>Total Amount</span>
						<span className='text-2xl font-bold text-blue-600'>${total}</span>
					</div>
				</div>

				{/* Payment Form */}
				<div className='bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 order-1 lg:order-2'>
					<div className='flex items-center gap-3 mb-8'>
						<div className='w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center'>
							<CreditCard className='text-blue-600 dark:text-blue-400' size={20} />
						</div>
						<div>
							<h2 className='text-xl font-bold text-gray-900 dark:text-white'>Payment Details</h2>
							<p className='text-sm text-gray-500'>Complete your purchase securely</p>
						</div>
					</div>

					<form onSubmit={handlePayment} className='space-y-5'>
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5'>Card Number</label>
							<div className='relative'>
								<input
									type='text'
									placeholder='0000 0000 0000 0000'
									className='w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
									required
								/>
								<CreditCard
									className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400'
									size={18}
								/>
							</div>
						</div>

						<div className='grid grid-cols-2 gap-5'>
							<div>
								<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5'>
									Expiry Date
								</label>
								<input
									type='text'
									placeholder='MM/YY'
									className='w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
									required
								/>
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5'>CVC</label>
								<input
									type='text'
									placeholder='123'
									className='w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
									required
								/>
							</div>
						</div>

						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5'>
								Cardholder Name
							</label>
							<input
								type='text'
								placeholder='John Doe'
								className='w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
								required
							/>
						</div>

						<button
							type='submit'
							disabled={isProcessing}
							className='w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-xl shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg'
						>
							{isProcessing ? (
								<>
									<Loader2 className='animate-spin' size={24} />
									Processing...
								</>
							) : (
								`Pay $${total}`
							)}
						</button>
						
						<p className='text-xs text-center text-gray-400 mt-4'>
							This is a secure 128-bit SSL encrypted payment.
						</p>
					</form>
				</div>
			</div>
		</div>
	);
}