var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');

gulp.task('lint', function () {
    return gulp.src([
            '.index.js',
            './routes/*.js',
            './public/js/*.js'
        ])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('cssify', function () {
    return gulp.src('./public/sass/*.scss')
            .pipe(sass())
            .pipe(gulp.dest('./public/css'));
});

gulp.task('dev', ['lint', 'cssify'], function (){
    nodemon({
        script: 'index.js',
        ext: 'js mustache css html scss',
        ignore: [
            'gulpfile.js'
        ]
    })
    .on('change', ['lint', 'cssify']);
});