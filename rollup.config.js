// @ts-check
import peerDepsExternal from 'rollup-plugin-peer-deps-external'; // 这个插件排除掉 peerDependencies 中的依赖 避免依赖重复引用
import { terser } from 'rollup-plugin-terser';
import { babel } from '@rollup/plugin-babel';

import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const packageJson = require('./package.json');

const umdName = packageJson.name;

const globals = {
	// @ts-ignore
	...(packageJson?.peerDependencies || {}),
};

const dir = 'dist';

/**
 * @type {import('rollup').RollupOptions[]}
 */
const config = [
	{
		input: 'src/index.ts',
		// ignore lib
		external: ['lodash', 'lodash-es', ...Object.keys(globals)],

		output: [
			{
				file: `${dir}/index.umd.js`,
				format: 'umd',
				sourcemap: true,
				name: umdName,
			},
			{
				file: `${dir}/index.umd.min.js`,
				format: 'umd',
				sourcemap: true,
				name: umdName,
				plugins: [terser()],
			},
		],
		plugins: [
			babel({
				extensions: ['.js', '.ts'],
				exclude: 'node_modules/**',
				babelHelpers: 'bundled',
			}),
			nodeResolve(),
			commonjs({ include: 'node_modules/**' }),
			typescript({
				tsconfig: './src/tsconfig.build.json',
				declaration: false,
			}),
			// @ts-ignore
			peerDepsExternal(),
		],

		treeshake: true,
	},
];

export default config;
