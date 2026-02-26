import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {PopIn, SlideIn, WordByWord} from '../components/AnimatedText';
import {COLORS} from '../lib/constants';

export const Scene1Hook: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	// Subtle line decoration that draws in
	const lineWidth = spring({
		fps,
		frame: frame - 2,
		config: {damping: 30, stiffness: 60},
	});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: COLORS.white,
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: 36,
					marginTop: -80,
				}}
			>
				{/* Decorative top line */}
				<div
					style={{
						width: 120 * lineWidth,
						height: 4,
						backgroundColor: COLORS.gold,
						borderRadius: 2,
						marginBottom: 8,
					}}
				/>

				{/* Main hook — word by word */}
				<WordByWord
					text="Struggling to get leads online?"
					fontSize={68}
					color={COLORS.navy}
					fontWeight="900"
					delay={5}
					wordDelay={3}
				/>

				{/* Slide-in punchline */}
				<SlideIn delay={30} direction="up">
					<div
						style={{
							fontFamily: 'Montserrat, sans-serif',
							fontSize: 72,
							fontWeight: '900',
							color: COLORS.gold,
							textAlign: 'center',
						}}
					>
						We fix that.
					</div>
				</SlideIn>

				{/* Subtext pop in */}
				<PopIn delay={50}>
					<div
						style={{
							fontFamily: 'Montserrat, sans-serif',
							fontSize: 30,
							fontWeight: '700',
							color: COLORS.navy,
							textAlign: 'center',
							opacity: 0.75,
							letterSpacing: 2,
							marginTop: 16,
						}}
					>
						AI-powered. Expert-built. Results-driven.
					</div>
				</PopIn>
			</div>
		</AbsoluteFill>
	);
};
