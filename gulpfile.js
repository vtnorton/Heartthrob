let gulp = require('gulp')
let cleanCSS = require('gulp-clean-css')
var concat = require('gulp-concat')
var rename = require('gulp-rename')
var uglify = require('gulp-uglify')
var merge = require('merge-stream')

var deps = {
	'heartthrob-vision': {
		'build/js/**': ''
	}
}

gulp.task('restore', async () => {
	var streams = []

	for (var prop in deps) {
		console.log('Restaurando scripts para: ' + prop)
		for (var itemProp in deps[prop]) {
			streams.push(gulp.src('node_modules/' + prop + '/' + itemProp)
				.pipe(gulp.dest('src/js/' + deps[prop][itemProp])))
		}
	}

	return merge(streams)
})

gulp.task('minify-css', () => {
	return gulp.src('src/css/*.css')
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('build/css'))
})

gulp.task('minify-js', function () {
	return gulp.src('src/js/*.js')
		.pipe(concat('heartthrob.js'))
		.pipe(rename('heartthrob.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('build/js'))
})

gulp.task('copy-files', () => {
	return gulp.src('node_modules/heartthrob-vision/build/js/**')
		.pipe(gulp.dest('src/js'))
})

gulp.task('copy-files-img', () => {
	return gulp.src('src/img/**')
		.pipe(gulp.dest('build/img'))
})

gulp.task('copy-files-js', () => {
	return gulp.src('src/js/**')
		.pipe(gulp.dest('build/js'))
})

gulp.task('build', gulp.parallel('restore', 'minify-css', 'minify-js', 'copy-files-js', 'copy-files-img'))
gulp.task('default', gulp.parallel('build'))
