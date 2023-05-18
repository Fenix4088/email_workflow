'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const inlineCss = require('gulp-inline-css');
const pug = require('gulp-pug');
const path = require('path');

const SRC = path.resolve('./src');

const PATH = {
      SCSS_DIR: `${SRC}/scss/**/*.scss`,
      CSS_DIR: `${SRC}/css/**/*.css`,
      PUG_ENTRY: `${SRC}/emails/**/*.pug`,
      PUG_COMPONENTS: `${SRC}/components/**/*.pug`
}


function html() {
      return gulp.src(PATH.PUG_ENTRY)
            .pipe(pug({pretty: true}))
            .pipe(inlineCss({
                  applyStyleTags: true,
                  applyLinkTags: true,
                  removeStyleTags: true,
                  removeLinkTags: true
            }))
            .pipe(gulp.dest("dist/"))


}

function buildStyles() {
      return gulp.src(PATH.SCSS_DIR)
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(autoprefixer({
                  cascade: false
            }))
            .pipe(concat('bundle.css'))
            .pipe(gulp.dest('./src/css'));
};


exports.buildStyles = buildStyles;
exports.html = html;

exports.watch = function async () {
      gulp.watch(PATH.SCSS_DIR, buildStyles);
      gulp.watch([PATH.PUG_ENTRY, PATH.PUG_COMPONENTS, PATH.CSS_DIR], html);
};