"use strict";

const gulp = require('gulp');
const less = require('gulp-less');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');


function less_css(){
  return gulp
    .src('./src/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('./src'))
}

function watchFiles() {
    gulp.watch('./src/**/*.less', less_css);
}


function css_min(){
  return gulp
    .src([
      './src/css/normalize.css',
      './src/css/**/*.css'
    ])
    // .pipe(concat('style.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest("./build/css/"))
}

function html_min(){
  return gulp
    .src('./src/index.html')
    .pipe(gulp.dest('./build/'));
}

function copy_images(){
  return gulp
    .src('./src/img/**/*.{gif,jpg,png,svg}')
    .pipe(gulp.dest('./build/img/'));
}

const build = gulp.series(css_min, gulp.parallel(copy_images, html_min));
const watch = gulp.series(watchFiles);

exports.copy_images = copy_images;
exports.css_min = css_min;
exports.build = build;
exports.watch = watch;
