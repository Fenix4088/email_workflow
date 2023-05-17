'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const inlineCss = require('gulp-inline-css');

function buildStyles() {
      return gulp.src('./scss/**/*.scss')
      //   .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      //   .pipe(sourcemaps.write('./maps'))
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
      gulp.watch('./scss/**/*.scss', buildStyles);
      gulp.watch('./dist/css/bundle.css', convertInline);
};