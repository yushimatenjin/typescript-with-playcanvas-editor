const gulp = require("gulp");
const playcanvas = require("gulp-playcanvas");
const pcOptions = require("./playcanvas.json");
const pug = require("gulp-pug");
const sass = require("gulp-sass");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");

gulp.task("pug", () => {
  return gulp
    .src(["src/**/*.pug", "!src/**/_*.pug"])
    .pipe(pug())
    .pipe(gulp.dest("dist/"))
    .pipe(playcanvas(pcOptions));
});

gulp.task("js", () => {
  return gulp
    .src(["src/**/*.js", "!src/**/_*.js"])
    .pipe(gulp.dest("dist/"))
    .pipe(playcanvas(pcOptions));
});

gulp.task("ts", () => {
  return tsProject
    .src()
    .pipe(tsProject())
    .js.pipe(gulp.dest("dist"))
    .pipe(playcanvas(pcOptions));
});

gulp.task("sass", () => {
  return gulp
    .src("src/**/*.+(scss|sass)")
    .pipe(sass())
    .pipe(gulp.dest("dist/"))
    .pipe(playcanvas(pcOptions));
});

gulp.task("watch", function() {
  gulp.watch(["src/**/*.pug", "!src/**/_*.pug"], gulp.task("pug"));
  gulp.watch(["src/**/*.js", "!src/**/_*.js"], gulp.task("js"));
  gulp.watch("src/**/*.+(scss|sass)", gulp.task("sass"));
  gulp.watch(["src/**/*.ts", "!src/**/_*.ts"], gulp.task("ts"));
});
gulp.task("default", gulp.parallel("watch"));
