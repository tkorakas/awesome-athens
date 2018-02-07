const gulp = require('gulp')
const sass = require('gulp-sass')

// Compile sass to css for dev.
gulp.task('sass', () => {
  return gulp.src('./sass/*.scss')
  // Initializes sourcemaps.
    .pipe(sass.sync().on('error', sass.logError))
    // Writes sourcemaps into the CSS file.
    .pipe(gulp.dest('./public/css'))
})

gulp.task('sass:prod', function() {
  return gulp.src('./sass/*.scss')
    .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./public/css'))
})

gulp.task('copy', function () {
  gulp
    .src('assets/*')
    .pipe(gulp.dest('public/assets'))
});

gulp.task('copy-files', function () {
  gulp
    .src('files/*')
    .pipe(gulp.dest('public'))
});

gulp.task('build', ['sass:prod', 'copy'])

gulp.task('default', () => {
  gulp.watch('./sass/*.scss', ['sass'])
})
