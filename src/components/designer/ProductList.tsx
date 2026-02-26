'use client';

import { products } from '@/data/products';
import { useWorkspaceStore } from '@/store/workspace';
import { Product } from '@/types';
import { Plus, ChevronUp, ChevronDown, Maximize2, Minimize2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function ProductList() {
	const { addItem, isFullscreen } = useWorkspaceStore();
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [isExpandedHeight, setIsExpandedHeight] = useState(false);
	const [activeTab, setActiveTab] = useState<'desk' | 'chair' | 'accessory'>('desk');
	const containerRef = useRef<HTMLDivElement>(null);

	const handleAddProduct = (product: Product) => {
		addItem(product);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(event.target as Node) && !isCollapsed) {
				setIsCollapsed(true);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isCollapsed]);

	const handleContainerClick = () => {
		if (isCollapsed) {
			setIsCollapsed(false);
		} else if (!isExpandedHeight) {
			setIsExpandedHeight(true);
		}
	};

	const tabs = [
		{ id: 'desk', label: 'Desks' },
		{ id: 'chair', label: 'Chairs' },
		{ id: 'accessory', label: 'Accessories' },
	] as const;

	if (isFullscreen) return null;

	return (
		<div
			ref={containerRef}
			onClick={handleContainerClick}
			className={`absolute bottom-0 left-0 right-0 w-full z-20 flex flex-col transition-all duration-300 ease-in-out group ${
				isCollapsed
					? 'h-12 bg-white/10 dark:bg-gray-900/10 hover:bg-white dark:hover:bg-gray-900 backdrop-blur-[2px] hover:backdrop-blur-none border-t border-transparent hover:border-gray-200 dark:hover:border-gray-800 cursor-pointer'
					: `${isExpandedHeight ? 'h-3/4' : 'h-80'} bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]`
			}`}
		>
			{/* Header / Tab Bar */}
			<div
				className={`flex items-center justify-between px-4 h-12 shrink-0 transition-colors duration-300 ${
					isCollapsed
						? 'border-b border-transparent group-hover:border-gray-100 dark:group-hover:border-gray-800 cursor-pointer'
						: 'border-b border-gray-100 dark:border-gray-800'
				}`}
			>
				<div className='flex items-center gap-1'>
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={(e) => {
								e.stopPropagation();
								setActiveTab(tab.id);
								if (isCollapsed) setIsCollapsed(false);
							}}
							className={`px-4 py-3 text-sm transition-colors relative ${
								activeTab === tab.id
									? `text-blue-600 dark:text-blue-400 font-semibold ${isCollapsed ? 'drop-shadow-md group-hover:drop-shadow-none' : ''}`
									: `text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 ${
											isCollapsed
												? 'text-blue-600 dark:text-blue-400 font-semibold drop-shadow-md group-hover:drop-shadow-none group-hover:text-gray-500 group-hover:font-medium'
												: 'font-medium'
										}`
							}`}
						>
							{tab.label}
							{activeTab === tab.id && (
								<span className='absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 rounded-t-full' />
							)}
						</button>
					))}
				</div>

				<div className='flex items-center gap-1'>
					{!isCollapsed && (
						<button
							onClick={(e) => {
								e.stopPropagation();
								setIsExpandedHeight(!isExpandedHeight);
							}}
							className='p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-500 transition-colors'
							aria-label={isExpandedHeight ? 'Restore height' : 'Maximize height'}
							title={isExpandedHeight ? 'Restore height' : 'Maximize height'}
						>
							{isExpandedHeight ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
						</button>
					)}
					<button
						onClick={(e) => {
							e.stopPropagation();
							setIsCollapsed(!isCollapsed);
						}}
						className={`p-1.5 rounded-full transition-colors ${
							isCollapsed
								? 'text-blue-600 dark:text-blue-400 font-semibold drop-shadow-md hover:bg-gray-100 dark:hover:bg-gray-800 group-hover:text-gray-500 group-hover:font-normal group-hover:drop-shadow-none'
								: 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
						}`}
						aria-label={isCollapsed ? 'Expand' : 'Collapse'}
					>
						{isCollapsed ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
					</button>
				</div>
			</div>

			{/* Content Area */}
			<div className='flex-1 overflow-y-auto p-4 custom-scrollbar'>
				<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
					{products
						.filter((p) => p.category === activeTab)
						.map((product) => (
							<div
								key={product.id}
								className='group relative bg-gray-50 dark:bg-gray-800 rounded-xl p-2 border border-gray-100 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md flex flex-col h-full'
								onClick={() => handleAddProduct(product)}
							>
								<div className='w-full aspect-[4/3] bg-white rounded-lg overflow-hidden shrink-0 border border-gray-100 mb-2 relative'>
									<img
										src={product.image}
										alt={product.name}
										className='w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300'
									/>
								</div>
								<div className='flex-1 min-w-0 px-1 flex flex-col'>
									<div className='flex justify-between items-start gap-2 mb-1'>
										<h4 className='font-medium text-sm text-gray-900 dark:text-gray-100 truncate leading-tight'>
											{product.name}
										</h4>
										<span className='text-blue-600 font-bold text-xs bg-blue-50 px-1.5 py-0.5 rounded'>
											${product.price}
										</span>
									</div>
									<p className='text-[10px] text-gray-500 line-clamp-2 leading-tight'>{product.description}</p>
								</div>

								<button className='absolute top-2 right-2 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-blue-700 z-10'>
									<Plus size={14} />
								</button>
							</div>
						))}
				</div>
			</div>
		</div>
	);
}
