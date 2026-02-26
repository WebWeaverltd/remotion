import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {WebWeaverLogo} from '../components/WebWeaverLogo';
import {COLORS, fontFamily} from '../lib/constants';

export const Scene5Outro: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	// Logo scale-up animation
	const logoScale = spring({
		fps,
		frame: frame - 5,
		config: {damping: 12, stiffness: 100, mass: 0.8},
	});

	// Brand text fade
	const brandOpacity = spring({
		fps,
		frame: frame - 25,
		config: {damping: 20, stiffness: 100},
	});

	// CTA bounce
	const ctaEntry = spring({
		fps,
		frame: frame - 40,
		config: {damping: 8, stiffness: 200, mass: 0.5},
	});

	// Continuous gentle bounce for CTA
	const ctaBounce = interpolate(Math.sin(frame * 0.12), [-1, 1], [-4, 4]);

	// Subtle pulse for CTA background
	const ctaPulse = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.97, 1.03]);

	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: COLORS.white,
			}}
		>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: 24,
					marginTop: -60,
				}}
			>
				{/* Logo */}
				<div
					style={{
						transform: `scale(${logoScale})`,
					}}
				>
					<WebWeaverLogo size={280} />
				</div>

				{/* Brand name */}
				<div
					style={{
						fontFamily,
						fontSize: 64,
						fontWeight: '900',
						color: COLORS.navy,
						opacity: brandOpacity,
						letterSpacing: 2,
						marginTop: 16,
					}}
				>
					WebWeaver
				</div>

				{/* Tagline */}
				<div
					style={{
						fontFamily,
						fontSize: 28,
						fontWeight: '600',
						color: COLORS.navy,
						opacity: brandOpacity * 0.7,
					}}
				>
					Modern Web Design Agency
				</div>

				{/* CTA Button */}
				<div
					style={{
						transform: `scale(${ctaEntry * ctaPulse}) translateY(${ctaBounce}px)`,
						background: COLORS.navy,
						borderRadius: 60,
						padding: '28px 80px',
						marginTop: 40,
						boxShadow: '0 8px 40px rgba(0, 34, 68, 0.3)',
					}}
				>
					<div
						style={{
							fontFamily,
							fontSize: 44,
							fontWeight: '800',
							color: COLORS.white,
							textAlign: 'center',
						}}
					>
						Book a Call Now
					</div>
				</div>

				{/* Website URL */}
				<div
					style={{
						fontFamily,
						fontSize: 24,
						fontWeight: '500',
						color: COLORS.accent,
						opacity: brandOpacity * 0.6,
						marginTop: 16,
					}}
				>
					webweaverltd.co.uk
				</div>
			</div>
		</AbsoluteFill>
	);
};
