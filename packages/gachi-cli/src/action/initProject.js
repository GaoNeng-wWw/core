const { mkdirSync, statSync, realpathSync, copyFileSync, readdirSync} = require('fs');
const path = require('path');
const {exec} = require('child_process');
const inquirer = require('inquirer');


function initProject(arg){
    inquirer.prompt([
        {
            name: 'name',
            message:'Project name:',
            type: 'input',
            default: arg
        }
    ]).then((res)=>{
        let crawlerName = res.name === '.' ? '' : res.name;
        let path = realpathSync('.') + '\\' + crawlerName;
        let stat;
        try {
            stat = statSync(`${path}`);
            const fileList = readdirSync(`${path}`);
            if (stat.isDirectory() && fileList.length){
                console.error(`${res.name} is already will overwrite this fold`);
            }
        } catch (e){
            mkdirSync(path);
            stat = statSync(`${path}`);
        }
        let fileList;
        fileList = [
            'index.ts',
			'config.ts'
        ]
        let errorCount = 0;
        try {
            fileList.forEach((path_)=>{
                copyFileSync(`${__dirname}\\template\\${path_}`, `${path}\\${path_}`);
				console.log(`${path}\\${path_}: Is Ok`);
            })
        } catch (e){
            console.error(`${e.message}`);
            errorCount++;
            return errorCount
        }
        console.log(`
            ${errorCount === 0 ? 'Not Error' : `Have ${errorCount} error${errorCount < 1 ? 's' : ''}`}
        `)
    })
}
module.exports = {
    initProject,
}