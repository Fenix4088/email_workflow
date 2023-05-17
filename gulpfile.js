'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const inlineCss = require('gulp-inline-css');


const PATH = {
    SCSS_DIR: './src/scss/**/*.scss',
}

function buildStyles() {
      return gulp.src(PATH.SCSS_DIR)
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(autoprefixer({
                  cascade: false
            }))
            .pipe(concat('bundle.css'))
            .pipe(gulp.dest('./dist/css'));
    };


function convertInline() {
      return gulp.src('./*.html')
            .pipe(inlineCss({
                        applyStyleTags: true,
                        applyLinkTags: true,
                        removeStyleTags: true,
                        removeLinkTags: true
            }))
            .pipe(gulp.dest('dist/'));
}

exports.buildStyles = buildStyles;
exports.convertInline = convertInline;

exports.watch = function async () {
      gulp.watch(PATH.SCSS_DIR, buildStyles);
      gulp.watch('./dist/css/bundle.css', convertInline);
};