import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {SlideIn} from '../components/AnimatedText';
import {COLORS, fontFamily} from '../lib/constants';

const OfferCard: React.FC<{
	readonly title: string;
	readonly price: string;
	readonly delay: number;
	readonly direction: 'left' | 'right';
}> = ({title, price, delay, direction}) => {
	return (
		<SlideIn delay={delay} direction={direction}>
			<div
				style={{
					background: COLORS.white,
					border: `3px solid ${COLORS.navy}`,
					borderRadius: 24,
					padding: '40px 50px',
					width: 860,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: 12,
					boxShadow: '0 8px 40px rgba(0, 34, 68, 0.12)',
				}}
			>
				<div
					style={{
						fontFamily,
						fontSize: 38,
						fontWeight: '700',
						color: COLORS.navy,
					}}
				>
					{title}
				</div>
				<div
					style={{
						fontFamily,
						fontSize: 56,
						fontWeight: '900',
						color: COLORS.accent,
					}}
				>
					{price}
				</div>
			</div>
		</SlideIn>
	);
};

export const Scene2Offers: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const badgeScale = spring({
		fps,
		frame: frame - 55,
		config: {damping: 8, stiffness: 200, mass: 0.5},
	});

	const badgeRotation = interpolate(
		spring({
			fps,
			frame: frame - 55,
			config: {damping: 12, stiffness: 150},
		}),
		[0, 1],
		[-5, 0],
	);

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
					gap: 36,
					marginTop: -60,
				}}
			>
				{/* Section title */}
				<SlideIn delay={0} direction="up">
					<div
						style={{
							fontFamily,
							fontSize: 52,
							fontWeight: '900',
							color: COLORS.navy,
							textAlign: 'center',
							marginBottom: 16,
						}}
					>
						Our Website Packages
					</div>
				</SlideIn>

				{/* Cards */}
				<OfferCard
					title="Landing Page"
					price="£399.99"
					delay={12}
					direction="left"
				/>
				<OfferCard
					title="Custom 5+ Page Site"
					price="£799.99"
					delay={24}
					direction="right"
				/>

				{/* Hassle-free badge */}
				<div
					style={{
						transform: `scale(${badgeScale}) rotate(${badgeRotation}deg)`,
						background: COLORS.navy,
						borderRadius: 20,
						padding: '28px 50px',
						marginTop: 20,
					}}
				>
					<div
						style={{
							fontFamily,
							fontSize: 36,
							fontWeight: '800',
							color: COLORS.gold,
							textAlign: 'center',
						}}
					>
						100% Hassle-Free
					</div>
					<div
						style={{
							fontFamily,
							fontSize: 26,
							fontWeight: '600',
							color: COLORS.white,
							textAlign: 'center',
							marginTop: 4,
						}}
					>
						From Design to Hosting!
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
};
