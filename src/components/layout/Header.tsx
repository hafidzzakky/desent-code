'use client';

import Link from 'next/link';
import { useWorkspaceStore } from '@/store/workspace';
import { usePathname } from 'next/navigation';

export default function Header() {
	const { isFullscreen, setShoppingListOpen, items } = useWorkspaceStore();
	const pathname = usePathname();

	if (isFullscreen) return null;

	// Check if we are on the designer page
	const isDesignerPage = pathname === '/designer';

	return (
		<header
			className={`flex justify-between items-center px-6 h-16 transition-all duration-300 group z-50 ${
				isDesignerPage
					? 'fixed top-0 left-0 right-0 bg-gradient-to-b from-black/50 to-transparent backdrop-blur-sm text-white hover:from-white hover:to-white hover:bg-white hover:text-black hover:shadow-md'
					: 'sticky top-0 bg-white/70 dark:bg-black/70 backdrop-blur-md border-b border-white/20 dark:border-gray-800'
			}`}
		>
			<Link href='/' className='text-xl font-extrabold tracking-tight'>
				Monis
			</Link>
			<nav className='flex gap-6 text-sm font-semibold cursor-pointer items-center'>
				<Link
					href='/designer'
					className={`hover:text-blue-600 transition-colors ${pathname === '/designer' ? 'text-blue-500' : ''}`}
				>
					Designer
				</Link>
				{isDesignerPage ? (
					<button
						onClick={() => setShoppingListOpen(true)}
						className='hover:text-blue-600 transition-colors relative flex items-center gap-1 cursor-pointer'
					>
						Cart
						{items.length > 0 && (
							<span className='bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] h-[18px] flex items-center justify-center'>
								{items.length}
							</span>
						)}
					</button>
				) : (
					<Link
						href='/checkout'
						className={`hover:text-blue-600 transition-colors relative flex items-center gap-1 ${
							pathname === '/checkout' ? 'text-blue-500' : ''
						}`}
					>
						Cart
						{items.length > 0 && (
							<span className='bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] h-[18px] flex items-center justify-center'>
								{items.length}
							</span>
						)}
					</Link>
				)}
			</nav>
		</header>
	);
}
