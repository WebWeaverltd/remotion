import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {BounceIn, SlideIn} from '../components/AnimatedText';
import {COLORS, fontFamily} from '../lib/constants';

const OfferCard: React.FC<{
	readonly title: string;
	readonly price: string;
	readonly description: string;
	readonly delay: number;
	readonly direction: 'left' | 'right';
}> = ({title, price, description, delay, direction}) => {
	return (
		<SlideIn delay={delay} direction={direction}>
			<div
				style={{
					background: 'rgba(255, 255, 255, 0.1)',
					border: '2px solid rgba(255, 255, 255, 0.25)',
					borderRadius: 24,
					padding: '36px 44px',
					width: 880,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: 10,
					backdropFilter: 'blur(10px)',
				}}
			>
				<div
					style={{
						fontFamily,
						fontSize: 36,
						fontWeight: '700',
						color: COLORS.white,
					}}
				>
					{title}
				</div>
				<div
					style={{
						fontFamily,
						fontSize: 58,
						fontWeight: '900',
						color: COLORS.gold,
					}}
				>
					{price}
				</div>
				<div
					style={{
						fontFamily,
						fontSize: 26,
						fontWeight: '400',
						color: 'rgba(255, 255, 255, 0.75)',
						marginTop: 2,
					}}
				>
					{description}
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
		frame: frame - 60,
		config: {damping: 8, stiffness: 200, mass: 0.5},
	});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: COLORS.navy,
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
				{/* Section title */}
				<SlideIn delay={0} direction="up">
					<div
						style={{
							fontFamily,
							fontSize: 56,
							fontWeight: '900',
							color: COLORS.white,
							textAlign: 'center',
							marginBottom: 12,
						}}
					>
						Our Websites
					</div>
				</SlideIn>

				{/* Cards */}
				<OfferCard
					title="Landing Page"
					price="£399.99"
					description="Perfect for small businesses"
					delay={14}
					direction="left"
				/>
				<OfferCard
					title="Custom Website"
					price="£799.99"
					description="5+ pages, fully bespoke"
					delay={26}
					direction="right"
				/>

				{/* Hassle-free badge */}
				<BounceIn delay={60}>
					<div
						style={{
							transform: `scale(${badgeScale > 0 ? 1 : 0})`,
							background: COLORS.gold,
							borderRadius: 50,
							padding: '22px 56px',
							marginTop: 16,
						}}
					>
						<div
							style={{
								fontFamily,
								fontSize: 30,
								fontWeight: '900',
								color: COLORS.navy,
								textAlign: 'center',
								letterSpacing: 1,
							}}
						>
							{'Hassle-Free: Design → Build → Hosting ✓'}
						</div>
					</div>
				</BounceIn>
			</div>
		</AbsoluteFill>
	);
};
