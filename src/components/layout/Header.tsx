'use client';

import Link from 'next/link';
import { useWorkspaceStore } from '@/store/workspace';

export default function Header() {
	const { isFullscreen } = useWorkspaceStore();

	if (isFullscreen) return null;

	return (
		<header className='flex justify-between items-center p-4 border-b border-white/20 dark:border-gray-800 bg-white/70 dark:bg-black/70 backdrop-blur-md h-16 sticky top-0 z-50'>
			<Link href='/' className='text-xl font-bold'>
				monis.rent
			</Link>
			<nav className='flex gap-4'>
				<Link href='/designer' className='hover:underline'>
					Designer
				</Link>
				<Link href='/checkout' className='hover:underline'>
					Checkout
				</Link>
			</nav>
		</header>
	);
}
