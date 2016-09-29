const gulp = require('gulp');
const spritesmith = require('gulp.spritesmith');
const dirname = __dirname;
const href = '2';

gulp.task('spritesmith', function(){
    gulp.src(`${dirname}/${href}/*.png`)
        .pipe(spritesmith({
            imgName: 'indexicons.png',
            cssName: 'indexicons.sass',
            padding: 10,
            algorithm: 'binary-tree',
            cssTemplate: './handlebarsInheritance.sass.handlebars'
        }))
        .pipe(gulp.dest(`${dirname}/${href}/build`));
});

gulp.task('default', ['spritesmith']);