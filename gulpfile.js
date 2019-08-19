var gulp = require('gulp'),
  del = require('del'),
  babel = require('gulp-babel'),
  jest = require('gulp-jest').default,
  watch = require('gulp-watch'),
  merge = require('merge-stream');

var doBabel = () => babel({ 
  presets: ['@babel/preset-env'],
  plugins: ['@babel/plugin-proposal-class-properties']
});

var SRC_PATH = './src',
  LIB_PATH = './lib_dev',
  LIB_SRC_PATH = './lib_dev/src',
  TEST_PATH = './tests',
  LIB_TEST_PATH = './lib_dev/__tests',
  LIB_SRC_RELEASE_PATH = './lib';

gulp.task('clear_lib_dev', function(cb) {
  del([ LIB_PATH + '/*' ], function() {
    cb();
  });
});

gulp.task('clear_lib', function(cb) {
  del([ LIB_SRC_RELEASE_PATH + '/*' ], function() {
    cb();
  });
});

gulp.task('release', [ 'clear_lib' ], function() {
  return gulp.src([SRC_PATH + '/**/*.js'])
    .pipe(doBabel())
    .pipe(gulp.dest(LIB_SRC_RELEASE_PATH));
});

gulp.task('build', [ 'clear_lib_dev' ], function() {
  const js = gulp.src([SRC_PATH + '/**/*.js'])
    .pipe(doBabel())
    .pipe(gulp.dest(LIB_SRC_PATH));

  const tests = gulp.src([TEST_PATH + '/**/*.js'])
    .pipe(doBabel())
    .pipe(gulp.dest(LIB_TEST_PATH));

  return merge(js, tests);
});

gulp.task('default', function() {
  gulp.start('build');
});

const watchOutput = (task, showsInitial) => task
  .on('ready', () => {
    if (!showsInitial) return;
    console.clear();
    console.log("\n  \x1b[42m\x1b[30m Started Development Server \x1b[0m");
    console.log("\n  \x1b[2m Changes to javascript and json files in ./src and ./tests will");
    console.log("   automatically be built and available in ./lib/src and ./lib/__tests \x1b[0m");
    console.log("\n   Listening for changes ...\n");
  })
  .on('change', (file) => {
    console.log("  \x1b[36m[CHANGE]\x1b[0m in " + file.replace(__dirname, '.'));
  })
  .on('add', (file) => {
    console.log("  \x1b[32m[NEW]\x1b[0m file " + file.replace(__dirname, '.'));
  })
  .on('addDir', (file) => {
    console.log("  \x1b[32m[NEW]\x1b[0m folder " + file.replace(__dirname, '.'));
  })
  .on('unlink', (file) => {
    console.log("  \x1b[31m[DELETED]\x1b[0m file " + file.replace(__dirname, '.'));
  })
  .on('unlinkDir', (file) => {
    console.log("  \x1b[31m[DELETED]\x1b[0m folder " + file.replace(__dirname, '.'));
  })
  .on('error', () => {
    console.log("  \x1b[41m\x1b[37m [ERROR] Something went wrong \x1b[0m");
  });

// Development Server (Watches changes in js files and builds them to ./lib)
gulp.task('watch', function () {
  const js = watchOutput(watch(SRC_PATH + '/**/*.js'), true)
    .pipe(doBabel())
    .pipe(gulp.dest(LIB_SRC_PATH));

  const tests = watchOutput(watch(TEST_PATH + '/**/*.js'), false)
    .pipe(doBabel())
    .pipe(gulp.dest(LIB_TEST_PATH));

  return merge(js, tests);
});

module.exports = gulp;
