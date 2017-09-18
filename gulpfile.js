const gulp = require('gulp');
const rollup = require('rollup');
const uglify = require('rollup-plugin-uglify');
const babel = require('rollup-plugin-babel');


const files = {
	input: './src/ResizeImage.js',
	output: './dist/ResizeImage.js',
	output_min: './dist/ResizeImage.min.js',
};


async function build()
{
	try {
		// normal
		const bundle = await rollup.rollup({
			input: files.input,
			plugins: [
				babel()
			]
		});
		bundle.write({
			file: files.output,
			format: 'umd',
			name: 'ResizeImage',
			sourcemap: true,
		});

		// min
		const bundleMin = await rollup.rollup({
			input: files.input,
			plugins: [ babel(), uglify() ],
		});
		bundleMin.write({
			file: files.output_min,
			format: 'umd',
			name: 'ResizeImage',
			sourcemap: false
		});
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
		console.warn(new Date());
		console.log(`${e.type} - ${e.path}`);
	});
});