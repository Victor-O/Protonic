const gulp = require('gulp');
const args = require('yargs').argv;
const config = require('./gulp.config')();
const del = require('del');
const $ = require('gulp-load-plugins')({ lazy: true });

gulp.task('hello-world', function () {
  log('hellooo!');

  return gulp
    .src(config.alljs)
    .pipe($.if(args.verbose, $.print()));
});

gulp.task('optimize', ['templatecache'], function() {
  log('Optimizing js, css, html');

  var cssFilter = $.filter(['**/*.css'], { restore: true });
  var jsFilter = $.filter(['**/*.js'], { restore: true });
  var templateCache = config.templateCache.file;

  return gulp
    .src(config.index)
    .pipe($.plumber())
    //.pipe($.inject(gulp.src(templateCache, { read: false }), { starttag: '<!-- inject:templates:js -->' }))
    .pipe($.useref())
    .pipe(cssFilter)
    .pipe($.csso())
    .pipe(cssFilter.restore)
    //.pipe(jsFilter)
    //.pipe($.uglify())
    //.pipe(jsFilter.restore)
    .pipe(gulp.dest(config.build));
});

gulp.task('templatecache', function() {
  return gulp
    .src(config.htmltemplates)
    .pipe($.minifyHtml({ empty: true }))
    .pipe($.angularTemplatecache(config.templateCache.file,
                                 config.templateCache.options))
    .pipe(gulp.dest(config.temp));
});

gulp.task('styles', ['clean-styles'], function () {
  log('scss -> css');

  return gulp
    .src(config.scss)
    .pipe($.plumber())
    .pipe($.sass())
    .pipe($.autoprefixer({ browsers: ['last 2 version', '>5%'] }))
    .pipe(gulp.dest(config.temp));
});

gulp.task('clean-styles', function () {
  const files = config.temp + '**/*.css';
  return clean(files);
});

gulp.task('scss-watcher', function () {
  gulp.watch([config.scss], ['styles']);
});

///////////////////////

function clean(path) {
  log('Cleaning' + $.util.colors.green(path));
  return del(path);
}

function log(msg) {
  if (typeof(msg) === 'object') {
    for (const item in msg) {
      if (msg.hasOwnProperty(item)) {
        $.util.log($.util.colors.blue(msg[item]));
      }
    }
  } else {
    $.util.log($.util.colors.blue(msg));
  }
}
