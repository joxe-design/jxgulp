// ///////////////////////////////////////////////
//
// EDIT CONFIG OBJECT BELOW !!!
// jsConcatFiles => lista de archivos javascript (en orden) para concatenar
// buildFilesFoldersRemove => lista de archivos para borrar cuando se ejecute la versión final
// ///////////////////////////////////////////////

var config = {
    jsConcatFiles: [
        './src/js/module1.js',
        './src/js/main.js'
    ],
    buildFilesFoldersRemove: [
        'dist/scss/',
        'dist/js/!(*.min.js)',
        'dist/bower.json',
        'dist/bower_components/',
        'dist/maps/',
        'dist/assets/'
    ]
};

// ///////////////////////////////////////////////
// Required
// gulp build
// bulp build:serve
// ///////////////////////////////////////////////

var gulp = require('gulp'),
sass = require('gulp-sass'), // Compilar y minifiar Sass
sourcemaps = require('gulp-sourcemaps')
autoprefixer = require('gulp-autoprefixer'), // Añadir prefijos CSS
concat = require('gulp-concat'), // Concatenar
uglify = require('gulp-uglify'), // Minificar JavaScript
rename = require('gulp-rename'), // Renombrar
imagemin = require('gulp-imagemin'), // Comprimir imágenes
del = require('del'),
pngquant = require('imagemin-pngquant'), // Comprimir imágenes
browserSync = require('browser-sync'), // BrowserSync
reload = browserSync.reload; // BrowserSync


// ///////////////////////////////////////////////
// Log Errors
// ///////////////////////////////////////////////

function errorlog(err){
    console.error(err.message);
    this.emit('end');
}

// ///////////////////////////////////////////////
// Scripts Task
// ///////////////////////////////////////////////

gulp.task('scripts', function () {
    return gulp.src(config.jsConcatFiles)
    .pipe(sourcemaps.init())
    .pipe(concat('temp.js'))
    .pipe(uglify())
    .on('error', errorlog)
    .pipe(rename('src.min.js'))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('./src/js/'))

    .pipe(reload({stream:true}));
});


// ///////////////////////////////////////////////
// Styles Tasks
// ///////////////////////////////////////////////

gulp.task('styles', function() {
    gulp.src('src/scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'})) // nested  compact  expanded  compressed
    .on('error', errorlog)
    .pipe(autoprefixer({
        browsers: ['last 3 versions'],
        cascade: false
    }))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('src/css/'))

    .pipe(reload({stream:true}));
});


// ///////////////////////////////////////////////
// HTML Tasks
// ///////////////////////////////////////////////

gulp.task('html', function () {
    gulp.src('src/**/*.html')

    .pipe(reload({stream:true}));
});


// ///////////////////////////////////////////////
// Browser-Sync Tasks
// ///////////////////////////////////////////////

gulp.task('browser-sync', function () {
    browserSync({
        server:{
            baseDir: "./src/"
        }
    });
});

// Task to run build server for testing final src

gulp.task('dist:test', function () {
    browserSync({
        server:{
            baseDir: "./dist/"
        }
    });
});


// ///////////////////////////////////////////////
// Build Tasks (gulp build)
// ///////////////////////////////////////////////

// // Tarea para borrar los archivos innecesarios

gulp.task('cleanfolder', function () {
    del([
        'dist/**'
    ]);
});

// Tarea para crear el directorio con los archivos necesarios:

gulp.task('copyfolder', ['cleanfolder'], function () {
    return gulp.src('src/**/*/')
    .pipe(gulp.dest('dist/'));
});

// Tarea para borrar los archivos innecesarios

gulp.task('removefolder', ['copyfolder'], function (cb) {
    del(config.buildFilesFoldersRemove, cb);
});

gulp.task('dist', ['copyfolder', 'removefolder']);



// ///////////////////////////////////////////////
// Image Task (gulp image)
// ///////////////////////////////////////////////

gulp.task('image', function () {
    gulp.src('src/img/*')
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant({quality: '65-80', speed: 4})]
    })) // Imagemin
    .pipe(gulp.dest('dist/img'));

    gulp.src('src/photos/*')
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant({quality: '65-80', speed: 4})]
    })) // Imagemin
    .pipe(gulp.dest('dist/photos/'));
});


// ///////////////////////////////////////////////
// Watch Tasks
// ///////////////////////////////////////////////

gulp.task('watch', function (){
    gulp.watch('src/scss/**/*.scss', ['styles']);
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch('**/*.html', ['html']);
    gulp.watch('src/assets/img/**/*', ['image']);
    gulp.watch('src/assets/ui/**/*', ['image']);
});


// ///////////////////////////////////////////////
// Default Task (gulp)
// ///////////////////////////////////////////////

gulp.task('default', ['scripts', 'styles', 'html', 'browser-sync', 'watch']);
