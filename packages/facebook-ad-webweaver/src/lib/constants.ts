import {loadFont} from '@remotion/google-fonts/Montserrat';

export const {fontFamily} = loadFont('normal', {
	weights: ['400', '600', '700', '800', '900'],
	subsets: ['latin'],
});

export const COLORS = {
	navy: '#002244',
	navyLight: '#003366',
	white: '#FFFFFF',
	offWhite: '#F8F9FA',
	accent: '#0066CC',
	gold: '#FFB800',
	gridLine: 'rgba(0, 34, 68, 0.06)',
	gridNode: 'rgba(0, 34, 68, 0.12)',
} as const;

export const WIDTH = 1080;
export const HEIGHT = 1350;
export const FPS = 30;
export const DURATION_SECONDS = 18;
export const DURATION_FRAMES = FPS * DURATION_SECONDS;

export const SCENE_TIMING = {
	scene1: {from: 0, duration: 90},
	scene2: {from: 90, duration: 120},
	scene3: {from: 210, duration: 120},
	scene4: {from: 330, duration: 120},
	scene5: {from: 450, duration: 90},
} as const;
