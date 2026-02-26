'use client';

import { useWorkspaceStore } from '@/store/workspace';
import { WorkspaceItem } from '@/types';
import { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/Icon';
import {
	RotateCw,
	X,
	Maximize2,
	Info,
	Minimize2,
	Grid,
	Trash2,
	Image as ImageIcon,
	Undo2,
	Redo2,
	ZoomIn,
	ZoomOut,
} from 'lucide-react';

export default function WorkspaceCanvas() {
	const {
		items,
		selectedItemIds,
		selectItem,
		moveSelectedItems,
		removeSelected,
		rotateItem,
		scaleItem,
		isFullscreen,
		toggleFullscreen,
		clearWorkspace,
		undo,
		redo,
		past,
		future,
		zoomScale,
		setZoomScale,
		zoomIn,
		zoomOut,
	} = useWorkspaceStore();
	const canvasRef = useRef<HTMLDivElement>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [resizingItemId, setResizingItemId] = useState<string | null>(null);
	const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
	const [resizeStart, setResizeStart] = useState({ x: 0, scale: 1 });
	const [showControls, setShowControls] = useState(true);
	const [showGrid, setShowGrid] = useState(false);
	const [bgIndex, setBgIndex] = useState(0);

	const backgrounds = [
		'/images/setup-clean-1.jpeg',
		'/images/setup-clean.jpeg',
		'linear-gradient(to bottom right, #e2e8f0, #cbd5e1)', // Solid/Gradient fallback
	];

	const handleClearWorkspace = () => {
		if (window.confirm('Are you sure you want to clear the entire workspace?')) {
			clearWorkspace();
		}
	};

	// Keyboard Shortcuts
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			// Undo/Redo Shortcuts
			if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
				e.preventDefault();
				if (e.shiftKey) {
					redo();
				} else {
					undo();
				}
				return;
			}
			if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
				e.preventDefault();
				redo();
				return;
			}

			if (selectedItemIds.length === 0) return;

			const step = e.shiftKey ? 10 : 1; // Shift + Arrow for faster movement

			switch (e.key) {
				case 'Delete':
				case 'Backspace':
					removeSelected();
					break;
				case 'ArrowUp':
					e.preventDefault();
					moveSelectedItems({ x: 0, y: -step });
					break;
				case 'ArrowDown':
					e.preventDefault();
					moveSelectedItems({ x: 0, y: step });
					break;
				case 'ArrowLeft':
					e.preventDefault();
					moveSelectedItems({ x: -step, y: 0 });
					break;
				case 'ArrowRight':
					e.preventDefault();
					moveSelectedItems({ x: step, y: 0 });
					break;
				case 'r':
				case 'R':
					if (selectedItemIds.length === 1) rotateItem(selectedItemIds[0], 45);
					break;
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [selectedItemIds, removeSelected, moveSelectedItems, rotateItem, undo, redo]);

	const handleMouseDown = (e: React.MouseEvent, item: WorkspaceItem) => {
		e.stopPropagation();
		e.preventDefault(); // Prevent text selection and native drag
		
		const isMulti = e.shiftKey || e.ctrlKey || e.metaKey;
		const isAlreadySelected = selectedItemIds.includes(item.id);

		if (isMulti) {
			selectItem(item.id, true);
		} else if (!isAlreadySelected) {
			selectItem(item.id, false);
		}
		
		setIsDragging(true);
		setLastMousePos({ x: e.clientX, y: e.clientY });
	};

	const handleResizeStart = (e: React.MouseEvent, item: WorkspaceItem) => {
		e.stopPropagation();
		e.preventDefault();
		setResizingItemId(item.id);
		setResizeStart({ x: e.clientX, scale: item.scale || 1 });
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (isDragging) {
			const deltaX = (e.clientX - lastMousePos.x) / zoomScale;
			const deltaY = (e.clientY - lastMousePos.y) / zoomScale;

			moveSelectedItems({ x: deltaX, y: deltaY });
			setLastMousePos({ x: e.clientX, y: e.clientY });
		} else if (resizingItemId) {
			e.preventDefault();
			const deltaX = e.clientX - resizeStart.x;
			// Sensitivity: 100px drag = 0.5 scale increase
			const scaleChange = deltaX * 0.005;
			const newScale = Math.max(0.2, Math.min(3, resizeStart.scale + scaleChange)); // Limit scale 0.2 - 3
			scaleItem(resizingItemId, newScale);
		}
	};

	const handleMouseUp = () => {
		setIsDragging(false);
		setResizingItemId(null);
	};

	const handleCanvasClick = () => {
		selectItem(null);
	};

	const handleRotate = (e: React.MouseEvent, itemId: string) => {
		e.stopPropagation();
		rotateItem(itemId, 45);
	};

	return (
		<div
			className='flex-1 bg-gray-100 dark:bg-gray-800 relative overflow-hidden h-full select-none'
			ref={canvasRef}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			onClick={handleCanvasClick}
		>
			{/* Scalable Content */}
			<div
				style={{
					transform: `scale(${zoomScale})`,
					transformOrigin: '0 0',
					width: '100%',
					height: '100%',
					position: 'absolute',
					inset: 0,
				}}
			>
				{/* Background Room Image */}
				<div
					className='absolute inset-0 pointer-events-none transition-all duration-500 ease-in-out'
				style={{
					backgroundImage: backgrounds[bgIndex].startsWith('linear-gradient')
						? backgrounds[bgIndex]
						: `url('${backgrounds[bgIndex]}')`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			/>

			{/* Overlay for better visibility */}
			<div className='absolute inset-0 bg-white/30 pointer-events-none'></div>

			{/* Grid Overlay */}
			{showGrid && (
				<div
					className='absolute inset-0 pointer-events-none z-0'
					style={{
						backgroundImage:
							'linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)',
						backgroundSize: '40px 40px',
					}}
				/>
			)}

			{items.map((item) => {
				const isSelected = selectedItemIds.includes(item.id);
				const showItemControls = isSelected && selectedItemIds.length === 1;

				return (
					<div
						key={item.id}
						className={`absolute cursor-move ${isSelected ? 'z-20' : 'z-10'}`}
						style={{
							left: item.position.x,
							top: item.position.y,
							width: (item.product.dimensions?.width ? item.product.dimensions.width * 3 : 150) * (item.scale || 1), // Increased scaling for better visibility
							height: (item.product.dimensions?.depth ? item.product.dimensions.depth * 3 : 150) * (item.scale || 1),
							transform: `translate(-50%, -50%) rotate(${item.rotation || 0}deg)`,
						}}
						onMouseDown={(e) => handleMouseDown(e, item)}
						onClick={(e) => e.stopPropagation()}
					>
						{/* Visual Representation */}
						<div
							className={`w-full h-full flex flex-col items-center justify-center relative group ${
								isSelected ? 'ring-2 ring-blue-500 bg-blue-50/20' : 'hover:ring-1 hover:ring-gray-300'
							}`}
						>
							{/* Render Image */}
							<div className='w-full h-full pointer-events-none relative'>
								<img
									src={item.product.image}
									alt={item.product.name}
									className='w-full h-full object-contain drop-shadow-lg'
									draggable={false}
								/>
							</div>
						</div>

						{/* Controls for Selected Item */}
						{showItemControls && (
							<>
								<button
									className='absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 shadow-sm hover:bg-red-600 z-30'
									onClick={(e) => {
										e.stopPropagation();
										removeSelected();
									}}
									title='Remove'
								>
									<X size={14} />
								</button>
								<button
									className='absolute -bottom-8 left-1/2 -translate-x-1/2 bg-blue-500 text-white rounded-full p-1.5 shadow-sm hover:bg-blue-600 z-30 flex gap-1 items-center px-3 text-xs'
									onClick={(e) => handleRotate(e, item.id)}
									title='Rotate 45°'
								>
									<RotateCw size={14} /> Rotate
								</button>
								<button
									className='absolute -bottom-3 -right-3 bg-white text-gray-700 rounded-full p-1 shadow-sm hover:bg-gray-100 z-30 border border-gray-200 cursor-ew-resize'
									onMouseDown={(e) => handleResizeStart(e, item)}
									onClick={(e) => e.stopPropagation()}
									title='Drag to Resize'
								>
									<Maximize2 size={14} className='rotate-90' />
								</button>
							</>
						)}
					</div>
				);
			})}
			</div>

			{/* Toolbar (Fullscreen, Grid, Background, Clear) */}
			<div
				className={`fixed z-30 flex flex-col gap-3 transition-all duration-300 ${
					isFullscreen ? 'top-4 right-4' : 'top-20 right-6'
				}`}
			>
				{/* Undo Button */}
				<button
					onClick={undo}
					disabled={past.length === 0}
					className={`w-10 h-10 flex items-center justify-center bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-full shadow-lg border border-white/20 dark:border-gray-700 hover:scale-105 transition-all duration-300 text-gray-700 dark:text-gray-200 ${
						past.length === 0 ? 'opacity-50 cursor-not-allowed hover:scale-100' : ''
					}`}
					title='Undo (Ctrl+Z)'
				>
					<Undo2 size={20} />
				</button>

				{/* Redo Button */}
				<button
					onClick={redo}
					disabled={future.length === 0}
					className={`w-10 h-10 flex items-center justify-center bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-full shadow-lg border border-white/20 dark:border-gray-700 hover:scale-105 transition-all duration-300 text-gray-700 dark:text-gray-200 ${
						future.length === 0 ? 'opacity-50 cursor-not-allowed hover:scale-100' : ''
					}`}
					title='Redo (Ctrl+Y)'
				>
					<Redo2 size={20} />
				</button>

				{/* Zoom In Button */}
				<button
					onClick={zoomIn}
					className='w-10 h-10 flex items-center justify-center bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-full shadow-lg border border-white/20 dark:border-gray-700 hover:scale-105 transition-all duration-300 text-gray-700 dark:text-gray-200'
					title={`Zoom In (${Math.round(zoomScale * 100)}%)`}
				>
					<ZoomIn size={20} />
				</button>

				{/* Zoom Out Button */}
				<button
					onClick={zoomOut}
					className='w-10 h-10 flex items-center justify-center bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-full shadow-lg border border-white/20 dark:border-gray-700 hover:scale-105 transition-all duration-300 text-gray-700 dark:text-gray-200'
					title={`Zoom Out (${Math.round(zoomScale * 100)}%)`}
				>
					<ZoomOut size={20} />
				</button>

				{/* Fullscreen Toggle Button */}
				<button
					onClick={toggleFullscreen}
					className='w-10 h-10 flex items-center justify-center bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-full shadow-lg border border-white/20 dark:border-gray-700 hover:scale-105 transition-all duration-300 text-gray-700 dark:text-gray-200'
					title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
				>
					{isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
				</button>

				{/* Grid Toggle Button */}
				<button
					onClick={() => setShowGrid(!showGrid)}
					className={`w-10 h-10 flex items-center justify-center backdrop-blur-md rounded-full shadow-lg border hover:scale-105 transition-all duration-300 ${
						showGrid
							? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 border-transparent'
							: 'bg-white/70 dark:bg-gray-900/70 text-gray-700 dark:text-gray-200 border-white/20 dark:border-gray-700'
					}`}
					title={showGrid ? 'Hide Grid' : 'Show Grid'}
				>
					<Grid size={20} />
				</button>

				{/* Background Toggle Button */}
				<button
					onClick={() => setBgIndex((prev) => (prev + 1) % backgrounds.length)}
					className='w-10 h-10 flex items-center justify-center bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-full shadow-lg border border-white/20 dark:border-gray-700 hover:scale-105 transition-all duration-300 text-gray-700 dark:text-gray-200'
					title='Change Background'
				>
					<ImageIcon size={20} />
				</button>

				{/* Clear Workspace Button */}
				{items.length > 0 && (
					<button
						onClick={handleClearWorkspace}
						className='w-10 h-10 flex items-center justify-center bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-full shadow-lg border border-white/20 dark:border-gray-700 hover:scale-105 transition-all duration-300 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-transparent'
						title='Clear Workspace'
					>
						<Trash2 size={20} />
					</button>
				)}
			</div>

			{/* Controls Overlay */}
			{!isFullscreen &&
				(showControls ? (
					<div className='absolute top-20 left-4 z-10 bg-white/70 dark:bg-gray-900/70 p-4 rounded-xl shadow-lg backdrop-blur-md text-sm border border-white/20 dark:border-gray-700 animate-in fade-in slide-in-from-top-2 duration-200 w-64'>
						<div className='flex justify-between items-start mb-2'>
							<p className='font-semibold text-gray-800 dark:text-white flex items-center gap-2'>
								<Info size={16} /> Controls
							</p>
							<button
								onClick={() => setShowControls(false)}
								className='text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors'
							>
								<X size={16} />
							</button>
						</div>
						<ul className='space-y-2 text-xs text-gray-600 dark:text-gray-300'>
							<li className='flex items-center justify-between'>
								<span>Move Item</span>
								<span className='font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded'>Drag</span>
							</li>
							<li className='flex items-center justify-between'>
								<span>Precision Move</span>
								<span className='font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded'>Arrows</span>
							</li>
							<li className='flex items-center justify-between'>
								<span>Fast Move</span>
								<span className='font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded'>Shift+Arrow</span>
							</li>
							<li className='flex items-center justify-between'>
								<span>Rotate 45°</span>
								<span className='font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded'>R</span>
							</li>
							<li className='flex items-center justify-between'>
								<span>Delete Item</span>
								<span className='font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded'>Del / Bksp</span>
							</li>
						</ul>
						<div className='mt-3 pt-3 border-t border-gray-200/50 dark:border-gray-700/50'>
							<p className='text-xs text-gray-500 dark:text-gray-400 mb-1'>Selected Item:</p>
							<p className='font-medium text-gray-800 dark:text-white truncate text-sm'>
								{selectedItemIds.length > 1
									? `${selectedItemIds.length} Items Selected`
									: items.find((i) => i.id === selectedItemIds[0])?.product.name || 'None'}
							</p>
						</div>
					</div>
				) : (
					<button
						onClick={() => setShowControls(true)}
						className='absolute top-20 left-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-lg border border-white/20 dark:border-gray-700 hover:scale-105 transition-transform text-gray-700 dark:text-gray-200'
						title='Show Controls'
					>
						<Info size={20} />
					</button>
				))}
		</div>
	);
}
