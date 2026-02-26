import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {PopIn, SlideIn} from '../components/AnimatedText';
import {COLORS, fontFamily} from '../lib/constants';

const AdBullet: React.FC<{
	readonly text: string;
	readonly price: string;
	readonly delay: number;
	readonly index: number;
}> = ({text, price, delay, index}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const pop = spring({
		fps,
		frame: frame - delay,
		config: {damping: 10, stiffness: 200, mass: 0.4},
	});

	const colors = [COLORS.accent, COLORS.navyLight, COLORS.navy];

	return (
		<div
			style={{
				transform: `scale(${pop})`,
				opacity: Math.min(pop * 2, 1),
				display: 'flex',
				alignItems: 'center',
				gap: 24,
				background: COLORS.white,
				border: `3px solid ${colors[index % colors.length]}`,
				borderRadius: 20,
				padding: '32px 48px',
				width: 820,
				boxShadow: '0 6px 30px rgba(0, 34, 68, 0.1)',
			}}
		>
			{/* Bullet dot */}
			<div
				style={{
					width: 20,
					height: 20,
					borderRadius: '50%',
					background: colors[index % colors.length],
					flexShrink: 0,
				}}
			/>
			<div
				style={{
					flex: 1,
					fontFamily,
					fontSize: 38,
					fontWeight: '700',
					color: COLORS.navy,
				}}
			>
				{text}
			</div>
			<div
				style={{
					fontFamily,
					fontSize: 40,
					fontWeight: '900',
					color: colors[index % colors.length],
				}}
			>
				{price}
			</div>
		</div>
	);
};

export const Scene3AdPackages: React.FC = () => {
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
				{/* Title */}
				<SlideIn delay={0} direction="up">
					<div
						style={{
							fontFamily,
							fontSize: 52,
							fontWeight: '900',
							color: COLORS.navy,
							textAlign: 'center',
							marginBottom: 8,
						}}
					>
						Scale with Targeted Ads
					</div>
				</SlideIn>

				{/* Subtitle */}
				<PopIn delay={10}>
					<div
						style={{
							fontFamily,
							fontSize: 30,
							fontWeight: '600',
							color: COLORS.accent,
							textAlign: 'center',
							marginBottom: 16,
						}}
					>
						Monthly packages to grow your business
					</div>
				</PopIn>

				{/* Ad bullets */}
				<AdBullet text="10 Ads" price="£150/mo" delay={20} index={0} />
				<AdBullet text="20 Ads" price="£225/mo" delay={32} index={1} />
				<AdBullet text="30 Ads" price="£275/mo" delay={44} index={2} />
			</div>
		</AbsoluteFill>
	);
};
