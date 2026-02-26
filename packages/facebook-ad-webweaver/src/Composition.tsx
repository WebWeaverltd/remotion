import React from 'react';
import {AbsoluteFill, interpolate, Sequence, useCurrentFrame} from 'remotion';
import {SCENE_TIMING} from './lib/constants';
import {Scene1Hook} from './scenes/Scene1Hook';
import {Scene2Offers} from './scenes/Scene2Offers';
import {Scene3AdPackages} from './scenes/Scene3AdPackages';
import {Scene4MarchPromo} from './scenes/Scene4MarchPromo';
import {Scene5Outro} from './scenes/Scene5Outro';

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
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		},
	);

	return (
		<AbsoluteFill style={{opacity: fadeIn * fadeOut}}>{children}</AbsoluteFill>
	);
};

export const FacebookAdComposition: React.FC = () => {
	return (
		<AbsoluteFill style={{backgroundColor: '#000'}}>
			{/* Scene 1: Hook (0-3s) — white bg */}
			<Sequence
				from={SCENE_TIMING.scene1.from}
				durationInFrames={SCENE_TIMING.scene1.duration}
			>
				<SceneFade durationInFrames={SCENE_TIMING.scene1.duration}>
					<Scene1Hook />
				</SceneFade>
			</Sequence>

			{/* Scene 2: Website Packages (3-7s) — navy bg */}
			<Sequence
				from={SCENE_TIMING.scene2.from}
				durationInFrames={SCENE_TIMING.scene2.duration}
			>
				<SceneFade durationInFrames={SCENE_TIMING.scene2.duration}>
					<Scene2Offers />
				</SceneFade>
			</Sequence>

			{/* Scene 3: Ad Packages (7-11s) — white bg */}
			<Sequence
				from={SCENE_TIMING.scene3.from}
				durationInFrames={SCENE_TIMING.scene3.duration}
			>
				<SceneFade durationInFrames={SCENE_TIMING.scene3.duration}>
					<Scene3AdPackages />
				</SceneFade>
			</Sequence>

			{/* Scene 4: March Promo (11-15s) — gold bg */}
			<Sequence
				from={SCENE_TIMING.scene4.from}
				durationInFrames={SCENE_TIMING.scene4.duration}
			>
				<SceneFade durationInFrames={SCENE_TIMING.scene4.duration}>
					<Scene4MarchPromo />
				</SceneFade>
			</Sequence>

			{/* Scene 5: Outro CTA (15-18s) — navy bg */}
			<Sequence
				from={SCENE_TIMING.scene5.from}
				durationInFrames={SCENE_TIMING.scene5.duration}
			>
				<SceneFade durationInFrames={SCENE_TIMING.scene5.duration}>
					<Scene5Outro />
				</SceneFade>
			</Sequence>
		</AbsoluteFill>
	);
};
