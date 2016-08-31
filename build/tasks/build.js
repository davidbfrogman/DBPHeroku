var gulp = require('gulp');
var debug = require('gulp-debug');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var to5 = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var paths = require('../paths');
var compilerOptions = require('../babel-options');
var assign = Object.assign || require('object.assign');
var notify = require("gulp-notify");
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var gulpSharp = require('gulp-sharp');

// transpiles changed es6 files to SystemJS format
// the plumber() call prevents 'pipe breaking' caused
// by errors from other gulp plugins
// https://www.npmjs.com/package/gulp-plumber
gulp.task('build-system', function() {
  return gulp.src(paths.source)
    .pipe(debug())
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(changed(paths.output, {extension: '.js'}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(to5(assign({}, compilerOptions, {modules: 'system'})))
    .pipe(sourcemaps.write({includeContent: true}))
    .pipe(gulp.dest(paths.output));
});

gulp.task('build-system-no-source-maps', function() {
  return gulp.src(paths.source)
    .pipe(debug())
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(changed(paths.output, {extension: '.js'}))
    .pipe(to5(assign({}, compilerOptions, {modules: 'system'})))
    .pipe(gulp.dest(paths.output));
});

// copies changed html files to the output directory
gulp.task('build-html', function() {
  return gulp.src(paths.html)
    .pipe(changed(paths.output, {extension: '.html'}))
    .pipe(gulp.dest(paths.output));
});

gulp.task('build-css-styles', function() {
  return gulp.src(paths.styles)
    .pipe(debug())
    .pipe(changed(paths.output, {extension: '.css'}))
    .pipe(gulp.dest(paths.output));
});

// copies changed image files to the output directory
gulp.task('build-content', function() {
  return gulp.src(paths.content)
    .pipe(changed(paths.output, {extension: '.png'}))
    .pipe(gulp.dest(paths.output));
});

gulp.task('generate-thumbnails', function(){
  return gulp.src( paths.imagesFulls )
    .pipe(debug({title: 'Resizing: '}))  
    .pipe(gulpSharp({
      resize : [265],
      quality : 80, //I really tried to go below 80, which is the default, but it really looks like shit otherwise.
    }))
    .pipe(gulp.dest(paths.imagesThumbs));
});

gulp.task('copy-images', function() {
  return gulp.src(paths.imagesIn)
    .pipe(changed(paths.imagesOut, {extension: '.jpg'}))
    .pipe(gulp.dest(paths.imagesOut));
});

gulp.task('copy-gifs', function() {
  return gulp.src(paths.gifsIn)
    .pipe(changed(paths.gifsOut, {extension: '.gif'}))
    .pipe(gulp.dest(paths.gifsOut));
});

gulp.task('optimize-images', () => {
	return gulp.src(paths.imagesIn)
        .pipe(debug({title: 'Optimizing Image: '}))
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest(paths.imagesOut));
});

// this task calls the clean task (located
// in ./clean.js), then runs the build-system
// and build-html tasks in parallel
// https://www.npmjs.com/package/gulp-run-sequence
gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    ['build-system', 'build-html', 'build-css-styles','build-content' , 'copy-images', 'copy-gifs'],
    callback
  );
});

gulp.task('build-for-bundle', function(callback) {
  return runSequence(
    'clean',
    ['build-system-no-source-maps', 'build-html', 'build-css-styles','build-content', 'copy-images', 'copy-gifs'],
    callback
  );
});

gulp.task('build-for-deploy', function(callback) {
  return runSequence(
    'clean',
    'generate-thumbnails',
    ['build-system-no-source-maps', 'build-html', 'build-css-styles','build-content', 'optimize-images', 'copy-gifs'],
    callback
  );
});