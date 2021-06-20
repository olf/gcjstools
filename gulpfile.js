/* eslint-env node */

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var jest = require('gulp-jest').default;

gulp.task('unittest', function () {
    return gulp.src('tests')
        .pipe(jest({
            "automock": false
        }))
});

gulp.task('lint', function () {
    return gulp.src(['**/*.js', '!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('watch', function () {
    gulp.watch('**/*.js', gulp.series('lint', 'unittest'));
});

gulp.task('watch', function () {
    gulp.watch('./sass/**/*.scss', gulp.series('lint', 'unittest'));
});

gulp.task('default', gulp.parallel('watch'));

