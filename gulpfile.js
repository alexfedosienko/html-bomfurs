const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const notify = require("gulp-notify");
const clean = require('gulp-clean');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');
const fileinclude = require('gulp-file-include');
const replace = require('gulp-replace');

const addCssBefore = [
  './node_modules/normalize.css/normalize.css',
  './node_modules/slick-carousel/slick/slick.css',
  './node_modules/nouislider/dist/nouislider.min.css',
];

const addJsBefore = [
  './node_modules/jquery/dist/jquery.min.js',
  './node_modules/slick-carousel/slick/slick.min.js',
  './node_modules/jquery.inputmask/dist/jquery.inputmask.bundle.js',
  './node_modules/nouislider/dist/nouislider.min.js',
];

const dirs = {
  build: './build',
  buildStyles: './build/css',
  buildImages: './build/img',
  buildJs: './build/js',
  blocks: './src/blocks',
  pages: './src/pages',
  include: './src/include',
  images: './src/img',
  globalStyles: './src/scss',
  globalJs: './src/js',
  fonts: './src/fonts',
};

const styleDir = [
  `${dirs.globalStyles}/**/*.scss`,
  `${dirs.blocks}/**/*.scss`,
];

const jsDir = [
  `${dirs.globalJs}/**/*.js`,
  `${dirs.blocks}/**/*.js`,
];

const htmlDir = [
  `${dirs.pages}/**/*.html`,
  `${dirs.blocks}/**/*.html`,
  `${dirs.include}/**/*.html`,
];
const isDev = !process.env.NODE_ENV || process.env.NODE_ENV == 'dev';

// const otherFiles = [
//   'src/sitemap.xml',
//   'src/robots.txt'
// ];

// const fonts = [
//   'node_modules/simple-line-icons/dist/fonts/**/*'
// ];

const cleanBuild = () => gulp.src(dirs.build + '/*', { read: false }).pipe(clean());
const buildHtml = () => {
  return gulp.src(htmlDir[0])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
    }))
    .pipe(replace(/\n\s*<!--DEV[\s\S]+?-->/gm, ''))
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(browserSync.reload({ stream: true }))
    .pipe(gulp.dest(dirs.build));
}

const buildFonts = () => {
  return gulp.src(`${dirs.fonts}/**/*`)
    .pipe(gulp.dest('build/fonts'));
}

const buildImg = () => {
  return gulp.src(`${dirs.images}/**/*`)
    // .pipe(imagemin())
    .pipe(gulp.dest(dirs.buildImages));
}

const buildStyles = () => {
  return gulp.src(addCssBefore.concat(styleDir))
    .pipe(concat('style.min.css'))
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'expanded'
      }).on("error", notify.onError()))
    .pipe(autoprefixer(['last 5 versions']))

    // .pipe(cleanCSS())

    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest(dirs.buildStyles))
    .pipe(browserSync.reload({
      stream: true
    }));
};

const buildJs = () => {
  return gulp.src(addJsBefore.concat(jsDir))
    .pipe(concat('script.min.js'))
    .pipe(gulp.dest(dirs.buildJs))
    .pipe(browserSync.reload({
      stream: true
    }));
};

const watch = () => {
  browserSync({
    server: {
        baseDir: dirs.build,
      },
      port: 8080,
      notify: true,
      open: true
    }
  );
  gulp.watch(styleDir, gulp.parallel(
    buildStyles,
    buildFonts
  ));
  gulp.watch([dirs.images], gulp.parallel(buildImg));
  gulp.watch(htmlDir, gulp.parallel(buildHtml));
  gulp.watch(jsDir, gulp.parallel(buildJs));
};

gulp.task('build', gulp.series(
  cleanBuild,
  buildImg,
  buildFonts,
  buildStyles,
  buildJs,
  buildHtml,
));
gulp.task('default', gulp.parallel('build', watch));
