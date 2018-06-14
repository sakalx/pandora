const gulp = require('gulp');
const del = require('del');
const encryption = require('encryption-gulp');

const KEY = require('./KEY');

const path = {
  decrypted: 'src-decrypted',
  encrypted: 'src-encrypted',
};

const pathSrc = {
  assets: ['src/**/*', '!src/**/*.js'],
  js: 'src/**/*.js',
};

const pathEncrypt = {
  assets: [`${path.encrypted}/**/*`, `!${path.encrypted}/**/*.js`],
  js: `${path.encrypted}/**/*.js`,
};

const encrypt = (pathIn, pathOut, decrypt) => {
  gulp.src(pathIn)
    .pipe(encryption({
      password: KEY,
      decrypt: decrypt,
    }))
    .pipe(gulp.dest(pathOut));
};

const assets = (pathIn, pathOut) => {
  gulp.src(pathIn)
    .pipe(gulp.dest(pathOut));
};

gulp.task('clean', () => del(['src-encrypted/**', '!src-encrypted'], {force:true}));

gulp.task('addAssetsSrc', () => assets(pathSrc.assets, path.encrypted));
gulp.task('addAssetsEncrypt', () => assets(pathEncrypt.assets, path.decrypted));

gulp.task('encrypting', ['clean', 'addAssetsSrc'], () => encrypt(pathSrc.js, path.encrypted, false));
gulp.task('decrypting', ['addAssetsEncrypt'], () => encrypt(pathEncrypt.js, path.decrypted, true));