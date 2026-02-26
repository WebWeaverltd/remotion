import React, {useMemo} from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {COLORS, HEIGHT, WIDTH} from '../lib/constants';

export const GridBackground: React.FC = () => {
	const frame = useCurrentFrame();
	const gridSpacing = 60;

	const nodes = useMemo(() => {
		const result: {x: number; y: number; delay: number}[] = [];
		for (let x = 0; x <= WIDTH; x += gridSpacing * 2) {
			for (let y = 0; y <= HEIGHT; y += gridSpacing * 2) {
				result.push({
					x: x + Math.sin(x * 0.01 + y * 0.02) * 15,
					y: y + Math.cos(x * 0.02 + y * 0.01) * 15,
					delay: (x + y) * 0.002,
				});
			}
		}
		return result;
	}, []);

	return (
		<AbsoluteFill style={{backgroundColor: COLORS.white}}>
			<svg width={WIDTH} height={HEIGHT}>
				{/* Grid lines */}
				{Array.from({length: Math.ceil(WIDTH / gridSpacing) + 1}, (_, i) => (
					<line
						key={`v-${i}`}
						x1={i * gridSpacing}
						y1={0}
						x2={i * gridSpacing}
						y2={HEIGHT}
						stroke={COLORS.gridLine}
						strokeWidth={1}
					/>
				))}
				{Array.from({length: Math.ceil(HEIGHT / gridSpacing) + 1}, (_, i) => (
					<line
						key={`h-${i}`}
						x1={0}
						y1={i * gridSpacing}
						x2={WIDTH}
						y2={i * gridSpacing}
						stroke={COLORS.gridLine}
						strokeWidth={1}
					/>
				))}
				{/* Animated nodes at intersections */}
				{nodes.map((node, i) => {
					const pulse = interpolate(
						Math.sin((frame + node.delay * 30) * 0.08),
						[-1, 1],
						[0.3, 1],
					);
					return (
						<circle
							key={`node-${i}`}
							cx={node.x}
							cy={node.y}
							r={3 * pulse}
							fill={COLORS.gridNode}
						/>
					);
				})}
			</svg>
		</AbsoluteFill>
	);
};
