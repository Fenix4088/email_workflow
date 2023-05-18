'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const inlineCss = require('gulp-inline-css');
const pug = require('gulp-pug')


const PATH = {
    SCSS_DIR: './src/scss/**/*.scss',
//     PUG_FILES: "src/*.pug"
      PUG_FILES: "src/emails/**/*.pug",
      PUG_COMPONENTS: "src/components/**/*.pug"
}

function html() {
      return gulp.src(PATH.PUG_FILES)
            .pipe(pug({pretty: true}))
            // .pipe(gulp.dest("dist"))
            .pipe(gulp.dest("src/html"))


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


function convertInline() {
      return gulp.src('./src/html/**/*.html')
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
exports.html = html;

exports.watch = function async () {
      gulp.watch(PATH.SCSS_DIR, buildStyles);
      gulp.watch([PATH.PUG_FILES, PATH.PUG_COMPONENTS], html);
      gulp.watch(['./src/html/**/*.html', './src/css/bundle.css'], convertInline);
};