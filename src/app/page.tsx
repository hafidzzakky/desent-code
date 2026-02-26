import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
			<main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
				<h1 className='text-4xl font-bold text-center sm:text-left'>Interactive Workspace Designer</h1>
				<p className='text-lg text-center sm:text-left'>Build your perfect workspace visually.</p>
				<div className='flex gap-4 items-center flex-col sm:flex-row'>
					<Link
						href='/designer'
						className='rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5'
					>
						Start Designing
					</Link>
				</div>
			</main>
		</div>
	);
}
