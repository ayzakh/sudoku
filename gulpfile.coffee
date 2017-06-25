gulp = require 'gulp'
sourcemaps = require 'gulp-sourcemaps'
connect = require 'gulp-connect'
uglify = require 'gulp-uglify'

babelify = require 'babelify'
browserify = require 'browserify'
vinylSourceStream = require 'vinyl-source-stream'
vinylBuffer = require 'vinyl-buffer'

sources = 
  html: 'index.html'
  css: 'style.css'
  babel: 'src/**/*.js'

gulp.task 'html', ->
  gulp.src 'index.html'
    .pipe do connect.reload

gulp.task 'css', ->
  gulp.src 'style.css'
    .pipe do connect.reload

gulp.task 'babel', ->
  browserify entries: 'src/main.js', debug: on
    .transform babelify, presets: 'env'
    .bundle()
    .pipe vinylSourceStream 'app.js'
    .pipe do vinylBuffer
    .pipe sourcemaps.init loadMaps: on
    .pipe do uglify
    .pipe sourcemaps.write '.'
    .pipe gulp.dest 'dist'
    .pipe do connect.reload

gulp.task 'connect', -> connect.server livereload: on

gulp.task 'watch', ->
  gulp.watch sources.html, ['html']
  gulp.watch sources.css, ['css']
  gulp.watch sources.babel, ['babel']

gulp.task 'default', ['babel', 'connect', 'watch']
