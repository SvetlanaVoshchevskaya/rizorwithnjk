const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const njkRender = require('gulp-nunjucks-render');
const pretiffy = require('gulp-html-prettify');
// const nunjucks = require('gulp-nunjucks');

// Static server
gulp.task('server', function() {
  browserSync.init({
    server: {
      baseDir: 'src'
    }
  });
});
//task for  work with style
gulp.task('styles', function() {
  return gulp
    .src('src/sass/**/*.+(scss|sass)')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(rename({ suffix: '.min' }))
    .pipe(
      autoprefixer({
        cascade: false
      })
    )
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('src'))
    .pipe(browserSync.stream());
});
//nunjucks
gulp.task('nunjucks', function() {
  return gulp
    .src('src/njk/**/*.+(njk|html)')
    .pipe(njkRender({path:'src/njk/templates'}))
    // .pipe(pretiffy({ indent_size: 4 }))
    .pipe(gulp.dest('src'))
    // .pipe(browserSync.stream());
});

//watcher
gulp.task('watch', function() {
  gulp.watch('src/sass/**/*.+(scss|sass)', gulp.parallel('styles'));
  gulp.watch('src/*.html').on('change', browserSync.reload);
  gulp.watch('./src/njk/*.njk', gulp.parallel('nunjucks'));
});
// add start default task
gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'nunjucks'));
