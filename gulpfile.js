/* eslint-env node */

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var tape = require('gulp-tape');
var tapReporter = require('faucet');

gulp.task('default', ['watch']);

gulp.task('unittest', function() {
    return gulp.src('tests/**/*.js')
        .pipe(tape({
            reporter: tapReporter()
        }));
});

gulp.task('lint', function () {
    return gulp.src(['**/*.js','!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('watch', function () {
    gulp.watch('**/*.js', ['lint', 'unittest']);
});
