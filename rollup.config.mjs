// rollup.config.js
import { terser } from 'rollup-plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import vue from 'rollup-plugin-vue'
import babel from 'rollup-plugin-babel'
import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import replace from 'rollup-plugin-replace'
import postcss from 'rollup-plugin-postcss'
import discardComments from 'postcss-discard-comments'
import nodePolyfills from 'rollup-plugin-polyfill-node'
import json from '@rollup/plugin-json'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

export default {
	input: 'src/index.ts',
	external: ['vue', 'lodash'],
	output: [
		{
			file: 'lib/index.esm.js',
			format: 'esm'
		},
		{
			file: 'lib/index.umd.js',
			format: 'umd',
			name: 'xl-ui2',
			globals: {
				vue: 'Vue',
				lodash: 'lodash'
			}
		}
	],
	plugins: [
		nodeResolve({
			browser: true,
			extensions: ['.js', '.ts']
		}),
		commonjs(),
		replace({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		typescript(),
		vue({}),
		nodePolyfills(),
		babel({
			extensions: ['.vue', '.ts', '.js', '.tsx', '.jsx'],
			exclude: 'node_modules/**',
			runtimeHelpers: true
			//plugins: ['external-helpers'],
			//externalHelpers: true
		}),
		terser(),
		postcss({
			plugins: [autoprefixer(), discardComments(), cssnano()],
			extract: 'index.css',
			extensions: ['.css']
		}),
		json()
	],
	// 用来指定代码执行环境的参数，解决this执行undefined问题
	context: 'window'
}
