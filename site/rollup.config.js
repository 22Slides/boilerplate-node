import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

const dev = process.env.ROLLUP_WATCH

function js(file, destination=false) {

	if (!destination) destination = file.replace('/src/', '/dist/')

	return {
		input: file,
		output: {
			file: destination,
			format: 'es',
			name: 'script',
			sourcemap: false,
		},
		plugins: [
			resolve(),
			// commonjs(),
			!dev && terser(),
		]
	}
}

function css(file, destination=false) {
	if (!destination) destination = file.replace('/src/', '/dist/').replace(/\.scss$/, '.css')
	return {
		input: file,
		output: {
			file: destination
		},
		plugins: [
			postcss({
				extract: true,
				minimize: false,
				sourceMap: false,
				plugins: [
					autoprefixer(),
				],
			})
		]
	}
}

export default [
	
  js('./src/scripts/scripts.js'),
	css('./src/styles/styles.scss'),
	
]
