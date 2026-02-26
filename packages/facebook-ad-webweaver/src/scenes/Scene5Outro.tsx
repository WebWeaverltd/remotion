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

	// Logo scale-up with spring
	const logoScale = spring({
		fps,
		frame: frame - 3,
		config: {damping: 12, stiffness: 100, mass: 0.8},
	});

	// Brand text bounce
	const textEntry = spring({
		fps,
		frame: frame - 22,
		config: {damping: 10, stiffness: 180, mass: 0.5},
	});

	// CTA entry
	const ctaEntry = spring({
		fps,
		frame: frame - 38,
		config: {damping: 8, stiffness: 200, mass: 0.5},
	});

	// CTA continuous pulse
	const ctaPulse = interpolate(Math.sin(frame * 0.12), [-1, 1], [0.96, 1.04]);

	// URL fade
	const urlOpacity = spring({
		fps,
		frame: frame - 52,
		config: {damping: 20, stiffness: 100},
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
					gap: 20,
					marginTop: -60,
				}}
			>
				{/* Logo — scale up smoothly */}
				<div style={{transform: `scale(${logoScale})`}}>
					<WebWeaverLogo size={260} color={COLORS.white} />
				</div>

				{/* Brand name — bounce in */}
				<div
					style={{
						fontFamily,
						fontSize: 60,
						fontWeight: '900',
						color: COLORS.white,
						letterSpacing: 3,
						marginTop: 20,
						transform: `scale(${textEntry})`,
						opacity: Math.min(textEntry * 2, 1),
					}}
				>
					WebWeaver Ltd
				</div>

				{/* CTA — pulses */}
				<div
					style={{
						transform: `scale(${ctaEntry * ctaPulse})`,
						background: COLORS.gold,
						borderRadius: 60,
						padding: '26px 72px',
						marginTop: 32,
						opacity: Math.min(ctaEntry * 2, 1),
					}}
				>
					<div
						style={{
							fontFamily,
							fontSize: 44,
							fontWeight: '900',
							color: COLORS.navy,
							textAlign: 'center',
						}}
					>
						{'Book a Call Now →'}
					</div>
				</div>

				{/* URL — fade in */}
				<div
					style={{
						fontFamily,
						fontSize: 28,
						fontWeight: '400',
						color: 'rgba(255, 255, 255, 0.6)',
						marginTop: 20,
						opacity: urlOpacity,
					}}
				>
					webweaverltd.co.uk
				</div>
			</div>
		</AbsoluteFill>
	);
};
