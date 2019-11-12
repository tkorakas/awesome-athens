const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");

const sassDev = _ => {
  return src("./sass/*.scss")
    .pipe(sass.sync().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(dest("./public/css"));
};

const sassProd = _ => {
  return src("./sass/*.scss")
    .pipe(sass.sync({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(dest("./public/css"));
};

const copy = _ => {
  return src("assets/*").pipe(dest("public/assets"));
};

const copyFiles = _ => {
  return src("files/*").pipe(dest("public"));
};

const build = series(sassProd, copy, copyFiles);

exports.default = _ => {
  watch("./sass/*.scss", sassDev);
};

exports.build = build;
