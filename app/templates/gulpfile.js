var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();
    
var browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

var rem = require('gulp-rem');

var staticBase = './';

var cssSrc = `${staticBase}less`;
var cssDst = `${staticBase}css`;

var jsSrc = `${staticBase}js`;
var jsDst = `${staticBase}js/dist`;


gulp.task('build-css', function() {
    return gulp.src([cssSrc + '/base.less'])
        .pipe(plugins.less())
        .pipe(plugins.autoprefixer({
            browsers: [
                'ie >= 9',
                'ff >= 10',
                'chrome >= 20',
                'safari >= 7',
                'opera >= 10',
                'ios >= 7',
                'android >= 2.3'
            ]
        }))
        <% if(!weixin) { %>
        .pipe(rem({
            prop: 100,
            unit: 'px'
        }))
        <% } %>
        .pipe(plugins.cssmin())
        .pipe(gulp.dest(cssDst))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('server', ['build-css'], function() {
    browserSync.init({
        server: "./"
    });

    gulp.watch([cssSrc + '/*.less', cssSrc + '/**/*.less'], ['build-css']);
});

gulp.task('default', ['build-js','build-css'], function() {
    console.log('Build all files finish.');
});


gulp.task('watch', function() {
    gulp.watch([cssSrc + '/*.less', cssSrc + '/**/*.less'], ['build-css']).on('change', function(event) {
        console.log('Event type: ' + event.type);
        console.log('Event path: ' + event.path);
    });
});

<% if(isrequire) { %>

var shellStart = 'node ' + staticBase + 'js/third/r.js -o baseUrl=' + staticBase + 'js ';
var shellEnd = [
    'paths.$=empty: ',
    'paths.base=page'
].join(' ');


var pages = [
    'app'
];

var _tasks = [];

pages.forEach(function(page){
    _tasks.push(`${shellStart} name=base/${page} out=${jsDst}${page}.js ${shellEnd}`);
});

gulp.task('build-js',plugins.shell.task(_tasks));

<%}%>



