const gulp = require('gulp');
const args = require('yargs').argv;
const browserSync = require('browser-sync');
const del = require('del');
const pump = require('pump');

const glp = require('gulp-load-plugins')({lazy: true});

gulp.task('vet', function() {
  log('Analyzing source with JSHint and JSCS');

  return gulp
    .src([
      './src/*.js',
      './*.js'
    ])
    .pipe(glp.if(args.verbose, glp.print()))
    .pipe(glp.jscs())
    .pipe(glp.jshint())
    .pipe(glp.jshint.reporter('jshint-stylish', {verbose: true}))
    .pipe(glp.jshint.reporter('fail'));
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    }
  });
});

gulp.task('styles', ['clean-styles'], function() {
  log('Compiling Sass to CSS');

  return gulp
    .src('./app/scss/*.scss')
    .pipe(glp.plumber())
    .pipe(glp.sass())
    .pipe(glp.sass().on('error', errorLogger))
    .pipe(glp.autoprefixer({browsers: ['last 2 version', '> 5%']}))
    .pipe(gulp.dest('./app/css/'));
});

gulp.task('clean-styles', function() {
  var files = [
      './app/dist/*.css',
      './app/css/*.css'
  ];
  clean(files);
});

gulp.task('clean', function() {
  var files = [
    './app/dist/*.js',
    './app/dist/*.css'
  ];
  clean(files);
});

gulp.task('watch', ['browserSync'], function() {
  gulp.watch('./app/scss/*.scss', browserSync.reload);
  gulp.watch('./app/index.html', browserSync.reload);
  gulp.watch('./app/src/*.js', browserSync.reload);
});

gulp.task('concat-min-js', function(done) {
  pump([
    (gulp.src('./app/src/*.js')),
    (glp.concat('all.min.js')),
    (glp.uglify()),
    (gulp.dest('./app/dist/'))
    ],
  done);
});

gulp.task('concat-min-css', function() {
  return gulp
    .src('./app/css/*.css')
    .pipe(glp.concat('all.min.css'))
    .pipe(glp.uglifycss())
    .pipe(gulp.dest('./app/dist/'));
});

gulp.task('concat-min', ['concat-min-css', 'concat-min-js'])


///////////////////////////////////////////////////
function log(msg) {
  if (typeof(msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        glp.util.log(glp.util.colors.blue(msg[item]));
      }
    }
  }
  else {
    glp.util.log(glp.util.colors.blue(msg));
  }
}

function clean(path, done) {
  log('Cleaning up: ' + glp.util.colors.blue(path));
  del(path, done);
}

function errorLogger(error) {
  log('*** Start of Error ***');
  log(error);
  log('*** End of Error ***');
  this.emit('end');
}
