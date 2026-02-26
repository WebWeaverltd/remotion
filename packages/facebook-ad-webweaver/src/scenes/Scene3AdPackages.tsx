import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {PopIn, SlideIn} from '../components/AnimatedText';
import {COLORS, fontFamily} from '../lib/constants';

const AdBullet: React.FC<{
	readonly text: string;
	readonly delay: number;
}> = ({text, delay}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const pop = spring({
		fps,
		frame: frame - delay,
		config: {damping: 10, stiffness: 200, mass: 0.4},
	});

	return (
		<div
			style={{
				transform: `scale(${pop})`,
				opacity: Math.min(pop * 2, 1),
				display: 'flex',
				alignItems: 'center',
				gap: 28,
				background: COLORS.white,
				border: `3px solid ${COLORS.navy}`,
				borderRadius: 20,
				padding: '34px 52px',
				width: 840,
				boxShadow: '0 6px 30px rgba(0, 34, 68, 0.08)',
			}}
		>
			{/* Gold bullet dot */}
			<div
				style={{
					width: 22,
					height: 22,
					borderRadius: '50%',
					background: COLORS.gold,
					flexShrink: 0,
				}}
			/>
			<div
				style={{
					flex: 1,
					fontFamily,
					fontSize: 40,
					fontWeight: '700',
					color: COLORS.navy,
				}}
			>
				{text}
			</div>
		</div>
	);
};

export const Scene3AdPackages: React.FC = () => {
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
					gap: 28,
					marginTop: -40,
				}}
			>
				{/* Title */}
				<SlideIn delay={0} direction="up">
					<div
						style={{
							fontFamily,
							fontSize: 52,
							fontWeight: '900',
							color: COLORS.navy,
							textAlign: 'center',
							marginBottom: 12,
						}}
					>
						Grow With Our Ad Packages
					</div>
				</SlideIn>

				{/* Ad bullets — staggered pop-in */}
				<AdBullet text="10 Ads/mo — £150" delay={18} />
				<AdBullet text="20 Ads/mo — £225" delay={30} />
				<AdBullet text="30 Ads/mo — £275" delay={42} />

				{/* Subtext */}
				<PopIn delay={58}>
					<div
						style={{
							fontFamily,
							fontSize: 32,
							fontWeight: '700',
							color: COLORS.gold,
							textAlign: 'center',
							letterSpacing: 4,
							marginTop: 20,
						}}
					>
						Targeted. Managed. Converting.
					</div>
				</PopIn>
			</div>
		</AbsoluteFill>
	);
};
