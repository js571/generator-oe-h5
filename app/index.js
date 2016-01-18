'use strict';
var generators = require('yeoman-generator');
var chalk = require('chalk');

module.exports = generators.Base.extend({
    constructor: function() {
        generators.Base.apply(this, arguments);
    },
    initializing: function() {
        //初始化操作，存储变量
        this.pkg = this.templatePath('package.json');
        this.gulpfile = this.templatePath('gulpfile.js');
        this.html = this.templatePath('index.html');
        this.less = this.templatePath('less/base.less');
        this.auto = this.templatePath('auto.js');
    },

    askFor: function() {
        var done = this.async();
        var prompts = [{
            type: 'input',
            name: 'title',
            message: '项目名称（英文）',
            default: 'app'
        }, {
            type: 'input',
            name: 'author',
            message: '作者(不填我就写maat了啊)',
            default: 'maat'
        }, {
            type: 'confirm',
            name: 'isrequire',
            message: '是否使用require.js?',
            default: true
        }, {
            type: 'confirm',
            name: 'weixin',
            message: '使用场景是否仅仅只是微信?',
            default: false
        },{
            type: 'confirm',
            name: 'install',
            message: '是否需要安装node模块',
            default: false
        }];
        this.prompt(prompts, function(answers) {
            this.title = answers.title;
            this.author = answers.author;
            this.isrequire = answers.isrequire;
            this.weixin = answers.weixin;
            this.ifInstall = answers.install;
            done();
        }.bind(this));
    },

    writing: {
        package: function() {
            this.fs.copyTpl(
                this.pkg,
                this.destinationPath('package.json'), {
                    title: this.title,
                    isrequire: this.isrequire,
                    weixin: this.weixin,
                }
            );
        },
        gulpfile: function() {
            this.fs.copyTpl(
                this.gulpfile,
                this.destinationPath('gulpfile.js'), {
                    isrequire: this.isrequire,
                    weixin: this.weixin,
                }
            );
        },
        html: function() {
            this.fs.copyTpl(
                this.html,
                this.destinationPath('html/index.html'), {
                    weixin: this.weixin,
                    isrequire: this.isrequire
                }
            );
        },
        less: function() {
            this.fs.copyTpl(
                this.less,
                this.destinationPath('less/base.less'), {
                    weixin: this.weixin
                }
            );
        },
        auto: function() {
            if (!this.weixin) {
                this.fs.copy(
                    this.auto,
                    this.destinationPath('js/auto.js')
                );
            }
        },
        requirejs: function() {
            if (this.isrequire) {
                this.directory('js','js');
            }
        }
    },

    install: function() {
        if(this.ifInstall){
            this.installDependencies();
        }
    },
    end: function() {
        this.log(chalk.bgGreen.bold('已经安装完成！你可以愉快的玩耍了!'))
    }
});