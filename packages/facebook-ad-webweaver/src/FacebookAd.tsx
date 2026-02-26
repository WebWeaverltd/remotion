import React from 'react';
import {AbsoluteFill, interpolate, Sequence, useCurrentFrame} from 'remotion';
import {GridBackground} from './components/GridBackground';
import {SCENE_TIMING} from './lib/constants';
import {Scene1Hook} from './scenes/Scene1Hook';
import {Scene2Offers} from './scenes/Scene2Offers';
import {Scene3AdPackages} from './scenes/Scene3AdPackages';
import {Scene4MarchPromo} from './scenes/Scene4MarchPromo';
import {Scene5Outro} from './scenes/Scene5Outro';

const SceneTransition: React.FC<{
	readonly children: React.ReactNode;
	readonly durationInFrames: number;
}> = ({children, durationInFrames}) => {
	const frame = useCurrentFrame();

	// Fade in over first 10 frames
	const fadeIn = interpolate(frame, [0, 10], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Fade out over last 8 frames
	const fadeOut = interpolate(
		frame,
		[durationInFrames - 8, durationInFrames],
		[1, 0],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		},
	);

	return (
		<AbsoluteFill style={{opacity: fadeIn * fadeOut}}>{children}</AbsoluteFill>
	);
};

export const FacebookAd: React.FC = () => {
	return (
		<AbsoluteFill>
			{/* Persistent grid background */}
			<GridBackground />

			{/* Scene 1: The Hook (0-3s) */}
			<Sequence
				from={SCENE_TIMING.scene1.from}
				durationInFrames={SCENE_TIMING.scene1.duration}
			>
				<SceneTransition durationInFrames={SCENE_TIMING.scene1.duration}>
					<Scene1Hook />
				</SceneTransition>
			</Sequence>

			{/* Scene 2: Website Offers (3-7s) */}
			<Sequence
				from={SCENE_TIMING.scene2.from}
				durationInFrames={SCENE_TIMING.scene2.duration}
			>
				<SceneTransition durationInFrames={SCENE_TIMING.scene2.duration}>
					<Scene2Offers />
				</SceneTransition>
			</Sequence>

			{/* Scene 3: Ad Packages (7-11s) */}
			<Sequence
				from={SCENE_TIMING.scene3.from}
				durationInFrames={SCENE_TIMING.scene3.duration}
			>
				<SceneTransition durationInFrames={SCENE_TIMING.scene3.duration}>
					<Scene3AdPackages />
				</SceneTransition>
			</Sequence>

			{/* Scene 4: March Promo (11-15s) */}
			<Sequence
				from={SCENE_TIMING.scene4.from}
				durationInFrames={SCENE_TIMING.scene4.duration}
			>
				<SceneTransition durationInFrames={SCENE_TIMING.scene4.duration}>
					<Scene4MarchPromo />
				</SceneTransition>
			</Sequence>

			{/* Scene 5: Outro & CTA (15-18s) */}
			<Sequence
				from={SCENE_TIMING.scene5.from}
				durationInFrames={SCENE_TIMING.scene5.duration}
			>
				<SceneTransition durationInFrames={SCENE_TIMING.scene5.duration}>
					<Scene5Outro />
				</SceneTransition>
			</Sequence>
		</AbsoluteFill>
	);
};
