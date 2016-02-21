/* eslint-env node */

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    batch = require('gulp-batch'),
    qunit = require('gulp-qunit');

gulp.task('default', ['watch']);

gulp.task('test', function() {
    return gulp
        .src('./tests/index.html')
        .pipe(qunit());
});

gulp.task('watch', function () {
    watch('**/*.js', batch(function (events, done) {
        gulp.start('test', done);
    }));
});
