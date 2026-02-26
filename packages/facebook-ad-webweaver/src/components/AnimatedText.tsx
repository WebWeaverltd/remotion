import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {fontFamily} from '../lib/constants';

export const WordByWord: React.FC<{
	readonly text: string;
	readonly fontSize?: number;
	readonly color?: string;
	readonly fontWeight?: React.CSSProperties['fontWeight'];
	readonly delay?: number;
	readonly wordDelay?: number;
	readonly textAlign?: React.CSSProperties['textAlign'];
	readonly lineHeight?: number;
}> = ({
	text,
	fontSize = 64,
	color = '#002244',
	fontWeight = '900',
	delay = 0,
	wordDelay = 4,
	textAlign = 'center',
	lineHeight = 1.2,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const words = text.split(' ');

	return (
		<div
			style={{
				fontFamily,
				fontSize,
				fontWeight,
				color,
				textAlign,
				lineHeight,
				padding: '0 60px',
			}}
		>
			{words.map((word, i) => {
				const wordSpring = spring({
					fps,
					frame: frame - delay - i * wordDelay,
					config: {damping: 12, stiffness: 200, mass: 0.5},
				});

				return (
					<span
						key={`${word}-${i}`}
						style={{
							display: 'inline-block',
							marginRight: fontSize * 0.25,
							transform: `translateY(${(1 - wordSpring) * 50}px) scale(${0.7 + wordSpring * 0.3})`,
							opacity: wordSpring,
						}}
					>
						{word}
					</span>
				);
			})}
		</div>
	);
};

export const SlideIn: React.FC<{
	readonly children: React.ReactNode;
	readonly delay?: number;
	readonly direction?: 'left' | 'right' | 'up' | 'down';
	readonly style?: React.CSSProperties;
}> = ({children, delay = 0, direction = 'up', style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const progress = spring({
		fps,
		frame: frame - delay,
		config: {damping: 14, stiffness: 180, mass: 0.6},
	});

	const offsets = {
		left: {x: -300, y: 0},
		right: {x: 300, y: 0},
		up: {x: 0, y: 120},
		down: {x: 0, y: -120},
	};

	const offset = offsets[direction];
	const x = offset.x * (1 - progress);
	const y = offset.y * (1 - progress);

	return (
		<div
			style={{
				transform: `translate(${x}px, ${y}px)`,
				opacity: progress,
				...style,
			}}
		>
			{children}
		</div>
	);
};

export const PopIn: React.FC<{
	readonly children: React.ReactNode;
	readonly delay?: number;
	readonly style?: React.CSSProperties;
}> = ({children, delay = 0, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const scale = spring({
		fps,
		frame: frame - delay,
		config: {damping: 10, stiffness: 200, mass: 0.4},
	});

	return (
		<div
			style={{
				transform: `scale(${scale})`,
				opacity: Math.min(scale * 2, 1),
				...style,
			}}
		>
			{children}
		</div>
	);
};

export const BounceIn: React.FC<{
	readonly children: React.ReactNode;
	readonly delay?: number;
	readonly style?: React.CSSProperties;
}> = ({children, delay = 0, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const scale = spring({
		fps,
		frame: frame - delay,
		config: {damping: 8, stiffness: 200, mass: 0.5},
	});

	return (
		<div
			style={{
				transform: `scale(${scale})`,
				opacity: Math.min(scale * 3, 1),
				...style,
			}}
		>
			{children}
		</div>
	);
};
