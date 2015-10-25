'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var _ = require('lodash');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    this.log(yosay(
      'Welcome to the awesome ' + chalk.red('SERVICE') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'How would you like to call this package?',
      default: _.kebabCase(path.basename(this.destinationRoot()))
    }, {
      type: 'input',
      name: 'version',
      message: 'Which version number should this package have?',
      default: '0.0.0'
    }, {
      type: 'input',
      name: 'description',
      message: 'Which description should this package have?'
    }, {
      type: 'input',
      name: 'author',
      message: 'What is the package author\'s name?'
    }, {
      type: 'input',
      name: 'license',
      message: 'Which license should this package have?',
      default: 'MIT'
    }, {
      type: 'input',
      name: 'repositoryUrl',
      message: 'What is the package\'s repository url?'
    }, {
      type: 'confirm',
      name: 'private',
      message: 'Should this package be marked as private?',
      default: true
    }, {
      type: 'list',
      name: 'appFramework',
      message: 'Which application framework do you want to use?',
      choices: ['express', 'koa'],
      default: 'express'
    }, {
      type: 'list',
      name: 'testFramework',
      message: 'Which test framework do you want to use?',
      choices: ['mocha/expect', 'mocha/should', 'mocha/chai', 'jasmine'],
      default: 'mocha/expect'
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        this.props
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('_.gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copy(
        this.templatePath('_.dockerignore'),
        this.destinationPath('.dockerignore')
      );
      this.fs.copy(
        this.templatePath('_.editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copyTpl(
        this.templatePath('_Dockerfile'),
        this.destinationPath('Dockerfile'),
        this.props
      );
      this.fs.copyTpl(
        this.templatePath('README.md'),
        this.destinationPath('README.md'),
        this.props
      );
      this.fs.copy(
        this.templatePath('index.' + this.props.appFramework + '.js'),
        this.destinationPath('index.js')
      );
      this.fs.copy(
        this.templatePath('index.spec.' + this.props.testFramework.replace(/\//g, '-') + '.js'),
        this.destinationPath('index.spec.js')
      );
    }
  },

  install: function () {
    var npmInstall = chalk.yellow('npm install');
    var message = '\n\nI\'m all done.';
    if (this.skipInstall) {
      message += ' Just run ' + npmInstall + ' to install the required dependencies.';
    } else {
      message += ' Running ' + npmInstall + ' for you to install the required dependencies.';
      message += '\nIf this fails, try running the command yourself.';
    }
    message += '\n\n';
    this.log(message);
    this.runInstall('npm');
  }
});
