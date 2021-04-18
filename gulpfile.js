const {src, dest, series, watch} = require('gulp');
const path = require('path')
const csso = require('gulp-csso');
const include = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const sync = require('browser-sync').create();
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');


const jsPath = 'src/js/**/*.js';

const paths = {
  webroot: "./wwwroot/",
  node_modules: "./node_modules/"
};

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;


function fonts() {
  return src('src/fonts/**/*.{eot,svg,ttf,woff,woff2}')
    .pipe(dest('dist/fonts'));
}


function html() {
  if (isProd) {
    return src('src/**.html')
      .pipe(include({
        prefix: '@@'
      }))
      .pipe(htmlmin({
        collapseWhitespace: true
      }))
      .pipe(dest('dist'))
  } else {
    return src('src/**.html')
      .pipe(include({
        prefix: '@@'
      }))
      .pipe(dest('dist'))
  }
}

function css() {
  if (isProd) {
    return src(['node_modules/bootstrap/dist/ccs/bootstrap.css', 'src/css/**.css'])
      .pipe(csso())
      .pipe(autoprefixer({
        cascade: false
      }))
      .pipe(concat('index.css'))
      .pipe(dest('dist/css'))
  } else {
    return src(['node_modules/bootstrap/dist/css/bootstrap.css', 'src/css/**.css'])
      .pipe(autoprefixer({
        cascade: false
      }))
      .pipe(concat('index.css'))
      .pipe(dest('dist/css'))
  }
}

function clear() {
  return del('dist')
}

function img() {
  return src('src/img/*')
    .pipe(imagemin())
    .pipe(dest('dist/img'))

}

function js() {
  if (isProd) {
    return src(['node_modules/jquery/dist/jquery.js', 'node_modules/bootstrap/dist/js/bootstrap.js', jsPath])
      .pipe(sourcemaps.init())
      .pipe(concat('index.js'))
      .pipe(terser())
      .pipe(sourcemaps.write('.'))
      .pipe(dest('dist/js'));
  } else {
    return src(['node_modules/jquery/dist/jquery.js', 'node_modules/bootstrap/dist/js/bootstrap.js', jsPath])
      .pipe(concat('index.js'))
      .pipe(dest('dist/js'))
  }
}

function serve() {
  sync.init({
    server: './dist'
  })

  watch('src/**.html', series(html)).on('change', sync.reload)
  watch('src/css/**.css', series(css)).on('change', sync.reload)
}


exports.serve = series(clear, css, js, fonts, img, html, serve)
exports.build = series(clear, css, js, fonts, img, html)
exports.dev = series(clear, css, js, fonts, img, html)

