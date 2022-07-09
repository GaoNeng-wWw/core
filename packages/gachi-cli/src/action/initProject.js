const { readdirSync, readFileSync } = require('fs');
const path = require('path');
const {exec} = require('child_process');
const inquirer = require('inquirer');
const { resolve } = require('path');
const { outputFileSync, mkdir, outputFile } = require('fs-extra');
const Handlebars = require('handlebars');
const getGachiVersion = () => {
    return new Promise((resolve)=>{
        exec(`npm view gachi versions`, (err,stdout,stderr)=>{
            resolve(stdout);
        })
    })
}
function initProject(arg){
    inquirer.prompt([
        {
            name: 'name',
            message:'Project name:',
            type: 'input',
            default: arg
        }
    ]).then((answer)=>{
        getGachiVersion()
        .then((res)=>{
            /** @type {String} */
            let version = JSON.parse(res.replace(/\'/gim,'"')).at(-1)
            const inputFileList = readdirSync(`${__dirname}\\template`)
            const inputFilePath = resolve(__dirname)
            const outputFilePath = resolve('.',answer.name)
            mkdir(outputFilePath)
            inputFileList.forEach((p)=>{
                const path = resolve(outputFilePath, p).replace('.tpl','');
                let template = Handlebars.compile(
                    readFileSync(`${resolve(inputFilePath, 'template', p)}`).toString()
                )({
                    gachi_version: version,
                    ...answer
                })
                try{
                    outputFile(path, template)
                    console.log(`[${new Date().getDate()}][gachi-cli][info]: ${p.replace('.tpl','')} create is success.`);
                } catch (e) {
                    console.log(`[${new Date().getDate()}][gachi-cli][info]: ${e.message}`);
                }
            })
            // inputFileList.forEach((path)=>{
            //     let template = Handlebars.compile(
            //         readFileSync(path).toString()
            //     )(
            //         {
            //             gachi_version: version,
            //             ...answer
            //         }
            //     )
            //     console.log(path);
            // })
        })
        // let crawlerName = res.name === '.' ? '' : res.name;
        // let path = realpathSync('.') + '\\' + crawlerName;
        // let stat;
        // try {
        //     stat = statSync(`${path}`);
        //     const fileList = readdirSync(`${path}`);
        //     if (stat.isDirectory() && fileList.length){
        //         console.error(`${res.name} is already will overwrite this fold`);
        //     }
        // } catch (e){
        //     mkdirSync(path);
        //     stat = statSync(`${path}`);
        // }
        // let fileList;
        // fileList = [
        //     'index.ts.tpl',
		// 	'config.ts.tpl',
        //     'app.ts.tpl',
        //     'tsconfig.json.tpl',
        //     'package.json.tpl'
        // ]
        // let errorCount = 0;
        // try {
        //     fileList.forEach((path_)=>{
        //         copyFileSync(`${__dirname}\\template\\${path_}`, `${path}\\${path_}`);
		// 		console.log(`${path}\\${path_}: Is Ok`);
        //     })
        //     pack.name = res.name;
        //     writeFileSync(`${path}\\package.json`, JSON.stringify(pack));
        // } catch (e){
        //     console.error(`${e.message}`);
        //     errorCount++;
        //     return errorCount
        // }
        // console.log(`
        //     ${errorCount === 0 ? 'Not Error' : `Have ${errorCount} error${errorCount < 1 ? 's' : ''}`}
        // `)
    })
}
module.exports = {
    initProject,
}