var gulp = require('gulp-param')(require('gulp'), process.argv),
	image = require('gulp-image'),
	del = require('del'),
    md5 = require('md5'),
    pkg = require('./package.json'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    exec = require('child_process').exec;
var pubVersion =  getPubVersion()
gulp.task('clean', function (callback) {
    return del(['build/*'], callback);
});

gulp.task('image', function () {
  gulp.src('./img/**/*.*',{base: './'})
    .pipe(image())
    .pipe(gulp.dest('build/'+pubVersion));
});
gulp.task('assets', function () {
  gulp.src(['./assets/**/*.*','!./assets/**/*.js'],{base: './'})
    .pipe(gulp.dest('build/'+pubVersion));
  gulp.src('./assets/**/*.js',{base: './'})
    .pipe(uglify())
    .pipe(gulp.dest('build/'+pubVersion));
});
gulp.task('html',function(){
	gulp.src('./index.html',{base: './'})
    .pipe(gulp.dest('build'));
})
gulp.task('js',function(){
	gulp.src('./dist/**/*.js')
    .pipe(gulp.dest('build/'+pubVersion+'/js'));
})


function exe(cmd,fn){
    exec(cmd, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        console.log(err);
        if(fn){
            fn()
        }
    });
}      


gulp.task('build',function(){
    vera(function(){
        gulp.start(['clean']);
        console.log(gutil.colors.green('build is starting...'))
        exe('webpack --progress -p  --config webpack.config.prod.js --optimize-minimize',function(){
            gulp.start(['assets','image','js']);
            console.log(gutil.colors.green('build is end'))
        })
    })
	
})

gulp.task('default', function () {
    gulp.start(['build']);
});

gulp.task('vera', function(){
    vera()
    
})
function vera(fn){
    del('./lib/vera').then(function(paths){
        console.log(gutil.colors.green('del...:'+paths.join('\n')))
        exe('cd lib && git clone *.git && cd vera && git checkout *',function(){
            del('*/.git')
            del('*/.gitignore')
            console.log(gutil.colors.green('vera is updated'))
            if(fn){
                fn()
            }
        })
    })
}

gulp.task('md5', ['doMd5'], function(version) {
});

gulp.task('doMd5', function(version) {

    if(typeof version!=='string'){
        console.error(gutil.colors.red('error: gulp md5 --version yourVerson'))
        return false
    }
    var versonMd5 = md5(version)
    console.log(versonMd5)
    console.log(versonMd5.substring(0,8))
});

function getPubVersion(){
    var versonMd5 = md5(pkg.version)
    versonMd5 = versonMd5.substring(0,8)
    console.log(gutil.colors.red('publish version md5 is '+versonMd5))
    return versonMd5
}




