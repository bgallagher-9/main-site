const gulp = require('gulp');
const args = require('yargs').argv;
const del = require('del');

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

gulp.task('styles', ['clean-styles'], function() {
  log('Compiling Sass to CSS');

  return gulp
    .src('./*.scss')
    .pipe(glp.sass())
    .pipe(glp.sass().on('error', glp.sass.logError))
    .pipe(glp.autoprefixer({browsers: ['last 2 version', '> 5%']}))
    .pipe(gulp.dest('./'));
});

gulp.task('clean-styles', function() {
  var files = './*.css';
  clean(files);
});

// gulp.task('sass-watch', function() {
//   gulp.watch([]);
// });


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
