const gulp = require('gulp');
const rollup = require('rollup');
const uglify = require('rollup-plugin-uglify');
const babel = require('rollup-plugin-babel');
const babelrc = require('babelrc-rollup');
const resolve = require('rollup-plugin-node-resolve');


async function build()
{
	try {
		// normal
		const bundle = await rollup.rollup({
			input: './src/ResizeImage.js',
			plugins: [
				resolve(),
				babel()
			]
		});
		await bundle.write({
			file: './dist/ResizeImage.js',
			format: 'umd',
			name: 'ResizeImage',
			sourcemap: false,
		});

		// min
		// const minBundle = await rollup.rollup({
		// 	input: './src/ResizeImage.js',
		// 	plugins: [
		// 		...rollupOptions.plugins,
		// 		uglify()
		// 	]
		// });
		// await minBundle.write({
		// 	file: './dist/ResizeImage.min.js',
		// 	format: 'umd',
		// 	name: 'ResizeImage',
		// 	sourcemap: false
		// });
		return null;
	} catch(e) {
		console.error(e);
		return new Error(e);
	}
}


// build
gulp.task('build', build);


// watch
gulp.task('watch', function () {
	gulp.watch('./src/**/*.js', async function(e) {
		await build();
		console.warn(new Date().toISOString());
		console.log(`${e.type} - ${e.path}`);
	});
});