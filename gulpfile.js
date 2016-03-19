/* eslint-env node */

var gulp = require('gulp');
var tape = require('gulp-tape');
var tapReporter = require('faucet');

gulp.task('default', ['watch']);

gulp.task('test', function() {
    return gulp.src('tests/**/*.js')
        .pipe(tape({
            reporter: tapReporter()
        }));
});

gulp.task('watch', function () {
    gulp.watch('**/*.js', ['test']);
});
