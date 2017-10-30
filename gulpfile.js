var gulp = require('gulp');
var plugins = require('gulp-load-plugins')(); // tous les plugins de package.json
var source = './';
var destination = './dist/';

// Preprocesseur sass + autoprefixer
gulp.task('css', function () {
  return gulp.src('./assets/sass/app.scss')
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(gulp.dest("./assets/css"));
});

gulp.task('sass:watch', function () {
  gulp.watch('./assets/sass/**/*.scss', ['css']);
});

gulp.task("js:minify", function(){
    gulp.watch("./assets/js/*.js", ["minify"]);
});

gulp.task("minify", function(){
	gulp.src('assets/js/*.js')
    .pipe(plugins.minify({
        ext:{
            // src:'-debug.js',
            min:'-min.js'
        },
        ignoreFiles: ["*-min.js"] 
    }))
    .pipe(gulp.dest('assets/js'))
});