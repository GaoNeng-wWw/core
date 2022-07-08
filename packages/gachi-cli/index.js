#!/usr/bin/env node
const program = require('commander');
const package = require('./package.json');
const {initProject} = require('./src/action/initProject');
const {runProject} = require('./src/action/runProject');

program
.name('gachi-cli')
.version(package.version)

program
.command('init [name]')
.action((arg)=>initProject(arg))

program
.command('run [name]')
.action((arg)=>runProject(arg));


program.parse(process.argv);
