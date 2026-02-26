import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {PopIn, SlideIn, WordByWord} from '../components/AnimatedText';
import {COLORS, fontFamily} from '../lib/constants';

export const Scene4MarchPromo: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	// Pulsing urgency glow
	const pulse = interpolate(Math.sin(frame * 0.15), [-1, 1], [0.85, 1]);

	const bannerSlide = spring({
		fps,
		frame: frame - 5,
		config: {damping: 12, stiffness: 180, mass: 0.5},
	});

	const arrowBounce = spring({
		fps,
		frame: frame - 50,
		config: {damping: 6, stiffness: 300, mass: 0.3},
	});

	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: 32,
					marginTop: -40,
				}}
			>
				{/* EXCLUSIVE banner */}
				<div
					style={{
						background: COLORS.gold,
						padding: '20px 80px',
						borderRadius: 16,
						transform: `scaleX(${bannerSlide}) scale(${pulse})`,
					}}
				>
					<div
						style={{
							fontFamily,
							fontSize: 48,
							fontWeight: '900',
							color: COLORS.navy,
							letterSpacing: 6,
						}}
					>
						MARCH EXCLUSIVE
					</div>
				</div>

				{/* Main offer text */}
				<div style={{marginTop: 20}}>
					<WordByWord
						text="Purchase a website before end of March"
						fontSize={46}
						color={COLORS.navy}
						fontWeight="700"
						delay={15}
						wordDelay={2}
					/>
				</div>

				{/* Arrow */}
				<PopIn delay={40}>
					<div
						style={{
							fontFamily,
							fontSize: 60,
							color: COLORS.gold,
							transform: `translateY(${(1 - arrowBounce) * 20}px)`,
						}}
					>
						↓
					</div>
				</PopIn>

				{/* FREE ads offer */}
				<SlideIn delay={50} direction="up">
					<div
						style={{
							background: COLORS.navy,
							borderRadius: 24,
							padding: '36px 60px',
							border: `4px solid ${COLORS.gold}`,
							transform: `scale(${pulse})`,
						}}
					>
						<div
							style={{
								fontFamily,
								fontSize: 58,
								fontWeight: '900',
								color: COLORS.gold,
								textAlign: 'center',
							}}
						>
							Get 5 FREE Ads!
						</div>
					</div>
				</SlideIn>

				{/* Subtext */}
				<SlideIn delay={65} direction="up">
					<div
						style={{
							fontFamily,
							fontSize: 32,
							fontWeight: '600',
							color: COLORS.navy,
							textAlign: 'center',
							opacity: 0.8,
							marginTop: 12,
						}}
					>
						Book now to claim your FREE demo.
					</div>
				</SlideIn>
			</div>
		</AbsoluteFill>
	);
};
