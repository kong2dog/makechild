import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const { resolve } = require('path');

export default defineConfig({
	base: '',
	plugins: [
		tsconfigPaths({
			projects: [
				resolve(__dirname, './demos/tsconfig.json'),
				resolve(__dirname, './tsconfig.json'),
			],
		}),
	],
	root: resolve(__dirname, './demos'),
	build: {
		outDir: 'dist',
		rollupOptions: {
			input: {
				main: resolve(__dirname, './demos/index.html'),
			},
		},
	},
	server: {
		open: true,
	},
});
