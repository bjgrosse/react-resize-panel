import babel from 'rollup-plugin-babel';
import pkg from './package.json';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';

export default [
	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, using
	// an array for the `output` option, where we can specify 
	// `file` and `format` for each target)
	{
		input: 'src/main.js',
		external: ['react','react-dom'],
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' }
		],
		plugins: [
			resolve(),
			commonjs({
				exclude: ['src/**'],
				namedExports: {'node_modules/lodash.debounce/index.js' : ['debounce']}	
			}),		
			postcss(),
			babel({
				exclude: ['node_modules/**']
			})
		]
	}
];
