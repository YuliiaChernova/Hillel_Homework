const {series, src, dest, watch} = require('gulp');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
       
function copyHtml() {
    return src('./src/index.html')
            .pipe(dest('./dist'));
}

function copyJs() {
    return src('./src/**/*.js')
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(dest('./dist'));
}

function copyCss() {
    return src('./src/**/*.css')
        .pipe(concat('style.css'))
        .pipe(dest('./dist'));
}

function copyVendorJs() {
    return src(['./node_modules/jquery/dist/jquery.min.js'])
        .pipe(concat('vendor.js'))
        .pipe(dest('./dist'));
}

function cleanDist() {
    return src('./dist', {read: false})
        .pipe(clean());
}

function watchFiles() {
    watch('./src/**/*.js', function () {
        return copyJs();
    });
    watch('./src/**/*.css', function () {
        return copyCss();
    });
    watch('./src/**/*.html', function () {
        return copyHtml();
    });
}



module.exports = {
    build: series(cleanDist, copyHtml, copyJs, copyCss, copyVendorJs),
    serve: series(cleanDist, copyHtml, copyJs, copyCss, copyVendorJs, watchFiles),
}