import {loadFont} from '@remotion/google-fonts/Montserrat';
import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	Sequence,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

// ─── Font & Constants ────────────────────────────────────────────────────────

const {fontFamily} = loadFont('normal', {
	weights: ['400', '700', '900'],
	subsets: ['latin'],
});

const NAVY = '#002244';
const WHITE = '#FFFFFF';
const GOLD = '#FFB800';

const SCENE = {
	s1: {from: 0, dur: 90},
	s2: {from: 90, dur: 120},
	s3: {from: 210, dur: 120},
	s4: {from: 330, dur: 120},
	s5: {from: 450, dur: 90},
} as const;

// ─── Reusable Animation Helpers ──────────────────────────────────────────────

const WordByWord: React.FC<{
	readonly text: string;
	readonly fontSize?: number;
	readonly color?: string;
	readonly fontWeight?: React.CSSProperties['fontWeight'];
	readonly delay?: number;
	readonly wordDelay?: number;
}> = ({
	text,
	fontSize = 64,
	color = NAVY,
	fontWeight = '900',
	delay = 0,
	wordDelay = 4,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const words = text.split(' ');

	return (
		<div
			style={{
				fontFamily,
				fontSize,
				fontWeight,
				color,
				textAlign: 'center',
				lineHeight: 1.2,
				padding: '0 60px',
			}}
		>
			{words.map((word, i) => {
				const s = spring({
					fps,
					frame: frame - delay - i * wordDelay,
					config: {damping: 12, stiffness: 200, mass: 0.5},
				});
				return (
					<span
						key={`${word}-${i}`}
						style={{
							display: 'inline-block',
							marginRight: fontSize * 0.25,
							transform: `translateY(${(1 - s) * 50}px) scale(${0.7 + s * 0.3})`,
							opacity: s,
						}}
					>
						{word}
					</span>
				);
			})}
		</div>
	);
};

const SlideIn: React.FC<{
	readonly children: React.ReactNode;
	readonly delay?: number;
	readonly direction?: 'left' | 'right' | 'up' | 'down';
}> = ({children, delay = 0, direction = 'up'}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const p = spring({
		fps,
		frame: frame - delay,
		config: {damping: 14, stiffness: 180, mass: 0.6},
	});
	const off = {left: [-300, 0], right: [300, 0], up: [0, 120], down: [0, -120]};
	const [ox, oy] = off[direction];
	return (
		<div
			style={{
				transform: `translate(${ox * (1 - p)}px, ${oy * (1 - p)}px)`,
				opacity: p,
			}}
		>
			{children}
		</div>
	);
};

const PopIn: React.FC<{
	readonly children: React.ReactNode;
	readonly delay?: number;
}> = ({children, delay = 0}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const s = spring({
		fps,
		frame: frame - delay,
		config: {damping: 10, stiffness: 200, mass: 0.4},
	});
	return (
		<div style={{transform: `scale(${s})`, opacity: Math.min(s * 2, 1)}}>
			{children}
		</div>
	);
};

const BounceIn: React.FC<{
	readonly children: React.ReactNode;
	readonly delay?: number;
}> = ({children, delay = 0}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const s = spring({
		fps,
		frame: frame - delay,
		config: {damping: 8, stiffness: 200, mass: 0.5},
	});
	return (
		<div style={{transform: `scale(${s})`, opacity: Math.min(s * 3, 1)}}>
			{children}
		</div>
	);
};

// ─── WebWeaver Logo (SVG W with network nodes) ──────────────────────────────

const WebWeaverLogo: React.FC<{
	readonly size?: number;
	readonly color?: string;
}> = ({size = 300, color = NAVY}) => {
	return (
		<svg width={size} height={size} viewBox="0 0 300 300" fill="none">
			<g stroke={color} strokeWidth="2.5" opacity="0.6">
				<line x1="50" y1="60" x2="80" y2="130" />
				<line x1="80" y1="130" x2="110" y2="200" />
				<line x1="110" y1="200" x2="130" y2="240" />
				<line x1="130" y1="240" x2="150" y2="170" />
				<line x1="150" y1="170" x2="150" y2="130" />
				<line x1="150" y1="130" x2="150" y2="170" />
				<line x1="150" y1="170" x2="170" y2="240" />
				<line x1="170" y1="240" x2="190" y2="200" />
				<line x1="190" y1="200" x2="220" y2="130" />
				<line x1="220" y1="130" x2="250" y2="60" />
				<line x1="50" y1="60" x2="110" y2="60" />
				<line x1="110" y1="60" x2="150" y2="60" />
				<line x1="150" y1="60" x2="190" y2="60" />
				<line x1="190" y1="60" x2="250" y2="60" />
				<line x1="80" y1="130" x2="150" y2="130" />
				<line x1="150" y1="130" x2="220" y2="130" />
				<line x1="110" y1="200" x2="150" y2="170" />
				<line x1="150" y1="170" x2="190" y2="200" />
				<line x1="110" y1="60" x2="80" y2="130" />
				<line x1="190" y1="60" x2="220" y2="130" />
				<line x1="110" y1="60" x2="150" y2="130" />
				<line x1="190" y1="60" x2="150" y2="130" />
			</g>
			<g fill={color}>
				<circle cx="50" cy="60" r="7" />
				<circle cx="110" cy="60" r="6" />
				<circle cx="150" cy="60" r="5" />
				<circle cx="190" cy="60" r="6" />
				<circle cx="250" cy="60" r="7" />
				<circle cx="80" cy="130" r="6" />
				<circle cx="150" cy="130" r="7" />
				<circle cx="220" cy="130" r="6" />
				<circle cx="110" cy="200" r="6" />
				<circle cx="150" cy="170" r="5" />
				<circle cx="190" cy="200" r="6" />
				<circle cx="130" cy="240" r="7" />
				<circle cx="170" cy="240" r="7" />
			</g>
		</svg>
	);
};

// ─── Scene Cross-Fade Wrapper ────────────────────────────────────────────────

const SceneFade: React.FC<{
	readonly children: React.ReactNode;
	readonly durationInFrames: number;
}> = ({children, durationInFrames}) => {
	const frame = useCurrentFrame();
	const fadeIn = interpolate(frame, [0, 12], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const fadeOut = interpolate(
		frame,
		[durationInFrames - 10, durationInFrames],
		[1, 0],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);
	return (
		<AbsoluteFill style={{opacity: fadeIn * fadeOut}}>{children}</AbsoluteFill>
	);
};

// ─── Scene 1: Hook (0–3s) — White bg ────────────────────────────────────────

const Scene1Hook: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const lineWidth = spring({
		fps,
		frame: frame - 2,
		config: {damping: 30, stiffness: 60},
	});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: WHITE,
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
				<div
					style={{
						width: 120 * lineWidth,
						height: 4,
						backgroundColor: GOLD,
						borderRadius: 2,
						marginBottom: 8,
					}}
				/>
				<WordByWord
					text="Struggling to get leads online?"
					fontSize={68}
					color={NAVY}
					fontWeight="900"
					delay={5}
					wordDelay={3}
				/>
				<SlideIn delay={30} direction="up">
					<div
						style={{
							fontFamily,
							fontSize: 72,
							fontWeight: '900',
							color: GOLD,
							textAlign: 'center',
						}}
					>
						We fix that.
					</div>
				</SlideIn>
				<PopIn delay={50}>
					<div
						style={{
							fontFamily,
							fontSize: 30,
							fontWeight: '700',
							color: NAVY,
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

// ─── Scene 2: Website Packages (3–7s) — Navy bg ─────────────────────────────

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
				}}
			>
				<div
					style={{fontFamily, fontSize: 36, fontWeight: '700', color: WHITE}}
				>
					{title}
				</div>
				<div style={{fontFamily, fontSize: 58, fontWeight: '900', color: GOLD}}>
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

const Scene2Offers: React.FC = () => {
	return (
		<AbsoluteFill
			style={{
				backgroundColor: NAVY,
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
				<SlideIn delay={0} direction="up">
					<div
						style={{
							fontFamily,
							fontSize: 56,
							fontWeight: '900',
							color: WHITE,
							textAlign: 'center',
							marginBottom: 12,
						}}
					>
						Our Websites
					</div>
				</SlideIn>

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

				<BounceIn delay={60}>
					<div
						style={{
							background: GOLD,
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
								color: NAVY,
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

// ─── Scene 3: Ad Packages (7–11s) — White bg ────────────────────────────────

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
				background: WHITE,
				border: `3px solid ${NAVY}`,
				borderRadius: 20,
				padding: '34px 52px',
				width: 840,
				boxShadow: '0 6px 30px rgba(0, 34, 68, 0.08)',
			}}
		>
			<div
				style={{
					width: 22,
					height: 22,
					borderRadius: '50%',
					background: GOLD,
					flexShrink: 0,
				}}
			/>
			<div
				style={{
					flex: 1,
					fontFamily,
					fontSize: 40,
					fontWeight: '700',
					color: NAVY,
				}}
			>
				{text}
			</div>
		</div>
	);
};

const Scene3AdPackages: React.FC = () => {
	return (
		<AbsoluteFill
			style={{
				backgroundColor: WHITE,
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
				<SlideIn delay={0} direction="up">
					<div
						style={{
							fontFamily,
							fontSize: 52,
							fontWeight: '900',
							color: NAVY,
							textAlign: 'center',
							marginBottom: 12,
						}}
					>
						Grow With Our Ad Packages
					</div>
				</SlideIn>

				<AdBullet text="10 Ads/mo — £150" delay={18} />
				<AdBullet text="20 Ads/mo — £225" delay={30} />
				<AdBullet text="30 Ads/mo — £275" delay={42} />

				<PopIn delay={58}>
					<div
						style={{
							fontFamily,
							fontSize: 32,
							fontWeight: '700',
							color: GOLD,
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

// ─── Scene 4: March Promo (11–15s) — Gold bg ────────────────────────────────

const Scene4MarchPromo: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const pulse = interpolate(Math.sin(frame * 0.15), [-1, 1], [0.95, 1.05]);
	const bannerSlide = spring({
		fps,
		frame: frame - 3,
		config: {damping: 12, stiffness: 180, mass: 0.5},
	});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: GOLD,
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
				<div style={{transform: `scaleX(${bannerSlide}) scale(${pulse})`}}>
					<div
						style={{
							fontFamily,
							fontSize: 56,
							fontWeight: '900',
							color: NAVY,
							textAlign: 'center',
							letterSpacing: 4,
						}}
					>
						{'MARCH EXCLUSIVE 🎁'}
					</div>
				</div>

				<div
					style={{
						width: 600 * bannerSlide,
						height: 4,
						backgroundColor: NAVY,
						borderRadius: 2,
						opacity: 0.3,
					}}
				/>

				<div style={{marginTop: 12}}>
					<WordByWord
						text="Buy any website ="
						fontSize={48}
						color={NAVY}
						fontWeight="700"
						delay={15}
						wordDelay={3}
					/>
				</div>

				<PopIn delay={35}>
					<div
						style={{
							background: NAVY,
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
								color: GOLD,
								textAlign: 'center',
							}}
						>
							5 FREE Ads included
						</div>
					</div>
				</PopIn>

				<SlideIn delay={55} direction="up">
					<div
						style={{
							fontFamily,
							fontSize: 32,
							fontWeight: '700',
							color: NAVY,
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

// ─── Scene 5: Outro & CTA (15–18s) — Navy bg ────────────────────────────────

const Scene5Outro: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const logoScale = spring({
		fps,
		frame: frame - 3,
		config: {damping: 12, stiffness: 100, mass: 0.8},
	});
	const textEntry = spring({
		fps,
		frame: frame - 22,
		config: {damping: 10, stiffness: 180, mass: 0.5},
	});
	const ctaEntry = spring({
		fps,
		frame: frame - 38,
		config: {damping: 8, stiffness: 200, mass: 0.5},
	});
	const ctaPulse = interpolate(Math.sin(frame * 0.12), [-1, 1], [0.96, 1.04]);
	const urlOpacity = spring({
		fps,
		frame: frame - 52,
		config: {damping: 20, stiffness: 100},
	});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: NAVY,
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
				<div style={{transform: `scale(${logoScale})`}}>
					<WebWeaverLogo size={260} color={WHITE} />
				</div>

				<div
					style={{
						fontFamily,
						fontSize: 60,
						fontWeight: '900',
						color: WHITE,
						letterSpacing: 3,
						marginTop: 20,
						transform: `scale(${textEntry})`,
						opacity: Math.min(textEntry * 2, 1),
					}}
				>
					WebWeaver Ltd
				</div>

				<div
					style={{
						transform: `scale(${ctaEntry * ctaPulse})`,
						background: GOLD,
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
							color: NAVY,
							textAlign: 'center',
						}}
					>
						{'Book a Call Now →'}
					</div>
				</div>

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

// ─── Main Composition ────────────────────────────────────────────────────────

export const FacebookAdComposition: React.FC = () => {
	return (
		<AbsoluteFill style={{backgroundColor: '#000'}}>
			<Sequence from={SCENE.s1.from} durationInFrames={SCENE.s1.dur}>
				<SceneFade durationInFrames={SCENE.s1.dur}>
					<Scene1Hook />
				</SceneFade>
			</Sequence>

			<Sequence from={SCENE.s2.from} durationInFrames={SCENE.s2.dur}>
				<SceneFade durationInFrames={SCENE.s2.dur}>
					<Scene2Offers />
				</SceneFade>
			</Sequence>

			<Sequence from={SCENE.s3.from} durationInFrames={SCENE.s3.dur}>
				<SceneFade durationInFrames={SCENE.s3.dur}>
					<Scene3AdPackages />
				</SceneFade>
			</Sequence>

			<Sequence from={SCENE.s4.from} durationInFrames={SCENE.s4.dur}>
				<SceneFade durationInFrames={SCENE.s4.dur}>
					<Scene4MarchPromo />
				</SceneFade>
			</Sequence>

			<Sequence from={SCENE.s5.from} durationInFrames={SCENE.s5.dur}>
				<SceneFade durationInFrames={SCENE.s5.dur}>
					<Scene5Outro />
				</SceneFade>
			</Sequence>
		</AbsoluteFill>
	);
};
