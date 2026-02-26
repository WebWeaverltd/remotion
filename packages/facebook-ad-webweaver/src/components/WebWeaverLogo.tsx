import React from 'react';
import {COLORS} from '../lib/constants';

export const WebWeaverLogo: React.FC<{
	readonly size?: number;
	readonly color?: string;
}> = ({size = 300, color = COLORS.navy}) => {
	const scale = size / 300;

	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 300 300"
			fill="none"
			style={{transform: `scale(${scale / (size / 300)})`}}
		>
			{/* Network connection lines */}
			<g stroke={color} strokeWidth="2.5" opacity="0.6">
				{/* Left side of W */}
				<line x1="50" y1="60" x2="80" y2="130" />
				<line x1="80" y1="130" x2="110" y2="200" />
				<line x1="110" y1="200" x2="130" y2="240" />
				{/* Left-center of W */}
				<line x1="130" y1="240" x2="150" y2="170" />
				<line x1="150" y1="170" x2="150" y2="130" />
				{/* Right-center of W */}
				<line x1="150" y1="130" x2="150" y2="170" />
				<line x1="150" y1="170" x2="170" y2="240" />
				{/* Right side of W */}
				<line x1="170" y1="240" x2="190" y2="200" />
				<line x1="190" y1="200" x2="220" y2="130" />
				<line x1="220" y1="130" x2="250" y2="60" />
				{/* Cross connections */}
				<line x1="50" y1="60" x2="110" y2="60" />
				<line x1="110" y1="60" x2="150" y2="60" />
				<line x1="150" y1="60" x2="190" y2="60" />
				<line x1="190" y1="60" x2="250" y2="60" />
				<line x1="80" y1="130" x2="150" y2="130" />
				<line x1="150" y1="130" x2="220" y2="130" />
				<line x1="110" y1="200" x2="150" y2="170" />
				<line x1="150" y1="170" x2="190" y2="200" />
				<line x1="110" y1="60" x2="80" y2="130" />
				<line x1="190" y1="60" x2="220" y2="130" />
				<line x1="110" y1="60" x2="150" y2="130" />
				<line x1="190" y1="60" x2="150" y2="130" />
			</g>
			{/* Network nodes */}
			<g fill={color}>
				<circle cx="50" cy="60" r="7" />
				<circle cx="110" cy="60" r="6" />
				<circle cx="150" cy="60" r="5" />
				<circle cx="190" cy="60" r="6" />
				<circle cx="250" cy="60" r="7" />
				<circle cx="80" cy="130" r="6" />
				<circle cx="150" cy="130" r="7" />
				<circle cx="220" cy="130" r="6" />
				<circle cx="110" cy="200" r="6" />
				<circle cx="150" cy="170" r="5" />
				<circle cx="190" cy="200" r="6" />
				<circle cx="130" cy="240" r="7" />
				<circle cx="170" cy="240" r="7" />
			</g>
		</svg>
	);
};
