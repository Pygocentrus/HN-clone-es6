// NPM modules
var gulp        = require('gulp'),
    browserify  = require('browserify'),
    babelify    = require('babelify'),
    browserSync = require('browser-sync'),
    source      = require('vinyl-source-stream'),
    reload      = browserSync.reload;
    stream      = browserSync.stream;

// APP vars
var APP = './app',
    DIST = './dist',
    SCRIPTS = APP + '/scripts',
    STYLES = APP + '/styles';

// Scripts task
gulp.task('scripts', function() {
  return browserify(SCRIPTS + '/main.js')
    .transform(babelify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest(SCRIPTS))
    .pipe(stream());
});

// Live task
gulp.task('serve', ['scripts'], function() {
  browserSync({
    notify: false,
    server: './app',
  });

  // Scripts
  gulp.watch([
    SCRIPTS + '/**/*.js',
    '!' + SCRIPTS + '/app.js'
  ], ['scripts']);

  // HTML & templates
  gulp.watch([
    APP + '/**/*.html',
  ], [reload]);
});
