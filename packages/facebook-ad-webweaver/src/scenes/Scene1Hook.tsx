import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {WordByWord} from '../components/AnimatedText';
import {COLORS, fontFamily} from '../lib/constants';

const RisingGraph: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const progress = spring({
		fps,
		frame: frame - 15,
		config: {damping: 20, stiffness: 80, mass: 0.8},
	});

	const pathLength = interpolate(progress, [0, 1], [0, 1]);

	return (
		<svg
			width={400}
			height={200}
			viewBox="0 0 400 200"
			style={{position: 'absolute', bottom: 240, right: 60, opacity: 0.15}}
		>
			<path
				d="M 0 180 Q 50 170 100 150 T 200 100 T 300 50 T 400 10"
				stroke={COLORS.navy}
				strokeWidth="4"
				fill="none"
				strokeDasharray="600"
				strokeDashoffset={600 * (1 - pathLength)}
				strokeLinecap="round"
			/>
			<circle
				cx={interpolate(progress, [0, 1], [0, 400])}
				cy={interpolate(progress, [0, 1], [180, 10])}
				r="8"
				fill={COLORS.accent}
				opacity={progress}
			/>
		</svg>
	);
};

export const Scene1Hook: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const subtextOpacity = spring({
		fps,
		frame: frame - 55,
		config: {damping: 20, stiffness: 100},
	});

	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			{/* Main hook text */}
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: 40,
					marginTop: -80,
				}}
			>
				<WordByWord
					text="Struggling to get leads?"
					fontSize={72}
					color={COLORS.navy}
					fontWeight="900"
					delay={5}
					wordDelay={3}
				/>

				<WordByWord
					text="We build high-converting websites."
					fontSize={56}
					color={COLORS.accent}
					fontWeight="700"
					delay={25}
					wordDelay={3}
				/>

				{/* Subtext */}
				<div
					style={{
						fontFamily,
						fontSize: 30,
						color: COLORS.navy,
						opacity: subtextOpacity * 0.7,
						textAlign: 'center',
						padding: '0 80px',
						fontWeight: '500',
						marginTop: 20,
					}}
				>
					Powered by highly skilled AI models & expert design.
				</div>
			</div>

			<RisingGraph />
		</AbsoluteFill>
	);
};
