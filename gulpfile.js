const gulp = require('gulp'); 
const sass = require('gulp-sass');
const browserSync = require('browser-sync'); //автообновление страницы
const sourcemaps = require('gulp-sourcemaps'); //просмотр scss в браузере
const watch = require('gulp-watch'); //Наблюдение за изменениями файлов
const cssnano = require('gulp-cssnano'); //Сжатие css кода
const rename = require('gulp-rename'); //минимизация файлов 
const autoprefixer = require('gulp-autoprefixer'); 
const concat = require('gulp-concat'); // Подключаем gulp-concat (для конкатенации файлов)
const uglify = require('gulp-uglifyjs'); // Подключаем gulp-uglifyjs (для сжатия JS)
const del = require('del'); // Подключаем библиотеку для удаления файлов и папок
const imagemin = require('gulp-imagemin'); // Подключаем библиотеку для работы с изображениями
const pngquant = require('imagemin-pngquant'); // Подключаем библиотеку для работы с png
const cache = require('gulp-cache'); // Подключаем библиотеку кеширования


gulp.task('sass', function(){ // функция преобразования sass в css
    return gulp.src('app/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer(['last 15 versions', '> 10%', 'ie 8', 'ie 7'], { cascade: true })) 
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('app/css/'))
        .pipe(browserSync.reload({stream: true})) //автообновление scss
})

gulp.task('css-libs', function() { // функция минимизирования
    return gulp.src('app/scss/*.scss') // Выбираем файл для минификации
        .pipe(sass())
        .pipe(cssnano()) // Сжимаем
        .pipe(rename({suffix:'.min'})) // Добавляем суффикс .min
        .pipe(gulp.dest('app/css')); // Выгружаем в папку /css
});

gulp.task('browser-sync', function() { //функция запуска сервера 
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
});

gulp.task('code', function() {  //Функция автообновления html
    return gulp.src('app/*.html')
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('scripts', function() {
    return gulp.src([ // Берем все необходимые библиотеки
        'app/js/jquery.min.js'
        ])
        .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('app/js')) // Выгружаем в папку app/js
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('clean', async function() {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('img', function() {
    return gulp.src('app/img/**/*') // Берем все изображения из app
        .pipe(cache(imagemin({ // С кешированием
        // .pipe(imagemin({ // Сжимаем изображения без кеширования
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))/**/)
        .pipe(gulp.dest('dist/img')); // Выгружаем на dist
});

gulp.task('prebuild', async function() {

    var buildCss = gulp.src([ // Переносим библиотеки в dist
        'app/css/style.css',
        'app/css/style.min.css',
        'app/css/style.css.map'
        ])
    .pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в dist
    .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в dist
    .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html') // Переносим HTML в dist
    .pipe(gulp.dest('dist'));

});

gulp.task('clear', function (callback) {
    return cache.clearAll();
})

gulp.task('watch', function(){
    gulp.watch('app/scss/*.scss' , gulp.parallel('sass')) // Наблюдение за sass файлами
    gulp.watch('app/*.html', gulp.parallel('code')); // Наблюдение за HTML файлами в корне проекта
    gulp.watch(['app/js/common.js', 'app/libs/**/*.js'], gulp.parallel('scripts')); // Наблюдение за главным JS файлом и за библиотеками
})
gulp.task('default', gulp.parallel('css-libs', 'sass', 'scripts', 'browser-sync' ,'watch'));
gulp.task('build', gulp.parallel('prebuild', 'clean', 'img', 'sass', 'scripts'));