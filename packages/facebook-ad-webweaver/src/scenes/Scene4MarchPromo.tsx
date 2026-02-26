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

	// Pulsing urgency effect
	const pulse = interpolate(Math.sin(frame * 0.15), [-1, 1], [0.95, 1.05]);

	const bannerSlide = spring({
		fps,
		frame: frame - 3,
		config: {damping: 12, stiffness: 180, mass: 0.5},
	});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: COLORS.gold,
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
						transform: `scaleX(${bannerSlide}) scale(${pulse})`,
					}}
				>
					<div
						style={{
							fontFamily,
							fontSize: 56,
							fontWeight: '900',
							color: COLORS.navy,
							textAlign: 'center',
							letterSpacing: 4,
						}}
					>
						{'MARCH EXCLUSIVE 🎁'}
					</div>
				</div>

				{/* Decorative line */}
				<div
					style={{
						width: 600 * bannerSlide,
						height: 4,
						backgroundColor: COLORS.navy,
						borderRadius: 2,
						opacity: 0.3,
					}}
				/>

				{/* Main offer text — word by word */}
				<div style={{marginTop: 12}}>
					<WordByWord
						text="Buy any website ="
						fontSize={48}
						color={COLORS.navy}
						fontWeight="700"
						delay={15}
						wordDelay={3}
					/>
				</div>

				{/* FREE Ads highlight */}
				<PopIn delay={35}>
					<div
						style={{
							background: COLORS.navy,
							borderRadius: 24,
							padding: '32px 64px',
							transform: `scale(${pulse})`,
						}}
					>
						<div
							style={{
								fontFamily,
								fontSize: 62,
								fontWeight: '900',
								color: COLORS.gold,
								textAlign: 'center',
							}}
						>
							5 FREE Ads included
						</div>
					</div>
				</PopIn>

				{/* Subtext */}
				<SlideIn delay={55} direction="up">
					<div
						style={{
							fontFamily,
							fontSize: 32,
							fontWeight: '700',
							color: COLORS.navy,
							textAlign: 'center',
							opacity: 0.85,
							marginTop: 12,
						}}
					>
						Book your FREE demo before 31st March
					</div>
				</SlideIn>
			</div>
		</AbsoluteFill>
	);
};
