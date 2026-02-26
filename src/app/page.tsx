import Link from 'next/link';
import { Move, DollarSign, Layers, ArrowRight, Layout } from 'lucide-react';

export default function Home() {
	return (
		<div className='flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]'>
			{/* Hero Section */}
			<section className='relative flex flex-col items-center justify-center px-4 pt-32 pb-20 text-center overflow-hidden'>
				{/* Background decorative elements */}
				<div className='absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>
				<div className='absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-3xl -z-10 opacity-50'></div>

				<div className='inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm font-medium text-blue-700 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-300 rounded-full border border-blue-100 dark:border-blue-800 animate-fade-in-up'>
					<span className='relative flex h-2 w-2'>
						<span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75'></span>
						<span className='relative inline-flex rounded-full h-2 w-2 bg-blue-500'></span>
					</span>
					v1.0 is live
				</div>

				<h1 className='text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 max-w-4xl mx-auto leading-[1.1]'>
					Design Your Dream <br />
					<span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500'>Workspace</span>
				</h1>

				<p className='text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed'>
					Experience the future of workspace customization. Drag, drop, and visualize your perfect setup in real-time with our
					interactive designer.
				</p>

				<div className='flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto'>
					<Link
						href='/designer'
						className='group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white transition-all duration-200 bg-blue-600 rounded-full hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600'
					>
						Start Designing
						<ArrowRight className='ml-2 w-4 h-4 transition-transform group-hover:translate-x-1' />
					</Link>
					<Link
						href='/checkout'
						className='inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-gray-700 transition-all duration-200 bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700'
					>
						View Cart
					</Link>
				</div>

				{/* Preview Image / Placeholder */}
				<div className='mt-16 relative w-full max-w-5xl mx-auto rounded-xl border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden bg-white dark:bg-gray-900 aspect-video group'>
					<div className='absolute inset-0 bg-gradient-to-t from-white/20 to-transparent z-10 pointer-events-none'></div>
					{/* Placeholder for actual app screenshot */}
					<div className='absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-800 text-gray-400'>
						<img
							src='/images/setup-clean.jpeg'
							alt='Workspace Setup Preview'
							className='w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500'
						/>
					</div>
					{/* Add a subtle overlay on hover */}
					<div className='absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
				</div>
			</section>

			{/* Features Section */}
			<section className='py-24 bg-gray-50 dark:bg-gray-900/50'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-16'>
						<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>Everything you need</h2>
						<p className='text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
							Built for productivity enthusiasts and interior design lovers. Create your ideal environment with powerful
							tools.
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						{[
							{
								icon: <Move className='w-6 h-6 text-blue-600' />,
								title: 'Drag & Drop Interface',
								description:
									'Intuitive controls allow you to position desks, chairs, and accessories exactly where you want them.',
							},
							{
								icon: <DollarSign className='w-6 h-6 text-green-600' />,
								title: 'Real-time Pricing',
								description: 'Keep track of your budget as you add or remove items. See the total cost update instantly.',
							},
							{
								icon: <Layers className='w-6 h-6 text-purple-600' />,
								title: 'Smart Layouts',
								description:
									'Automatic snapping and alignment tools help you create professional-looking arrangements effortlessly.',
							},
						].map((feature, index) => (
							<div
								key={index}
								className='p-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300'
							>
								<div className='w-12 h-12 bg-gray-50 dark:bg-gray-700 rounded-xl flex items-center justify-center mb-6'>
									{feature.icon}
								</div>
								<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3'>{feature.title}</h3>
								<p className='text-gray-600 dark:text-gray-400 leading-relaxed'>{feature.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='py-20'>
				<div className='max-w-4xl mx-auto px-4 text-center'>
					<h2 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6'>
						Ready to transform your workspace?
					</h2>
					<p className='text-lg text-gray-600 dark:text-gray-400 mb-10'>
						Join thousands of users designing their perfect setup today. No account required to start.
					</p>
					<Link
						href='/designer'
						className='inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 rounded-full hover:bg-gray-800 hover:scale-105 shadow-xl dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100'
					>
						Launch Designer
					</Link>
				</div>
			</section>
		</div>
	);
}
