import {Composition} from 'remotion';
import {FacebookAdComposition} from './Composition';
import {DURATION_FRAMES, FPS, HEIGHT, WIDTH} from './lib/constants';

export const RemotionRoot: React.FC = () => {
	return (
		<Composition
			id="FacebookAd"
			component={FacebookAdComposition}
			durationInFrames={DURATION_FRAMES}
			fps={FPS}
			width={WIDTH}
			height={HEIGHT}
		/>
	);
};
