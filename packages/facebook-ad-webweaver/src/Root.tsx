import {Composition} from 'remotion';
import {FacebookAdComposition} from './Composition';

export const RemotionRoot: React.FC = () => {
	return (
		<Composition
			id="FacebookAd"
			component={FacebookAdComposition}
			durationInFrames={540}
			fps={30}
			width={1080}
			height={1350}
		/>
	);
};
