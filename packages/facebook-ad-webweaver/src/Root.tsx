import {Composition} from 'remotion';
import {FacebookAd} from './FacebookAd';
import {DURATION_FRAMES, FPS, HEIGHT, WIDTH} from './lib/constants';

export const RemotionRoot: React.FC = () => {
	return (
		<Composition
			id="FacebookAd"
			component={FacebookAd}
			durationInFrames={DURATION_FRAMES}
			fps={FPS}
			width={WIDTH}
			height={HEIGHT}
		/>
	);
};
