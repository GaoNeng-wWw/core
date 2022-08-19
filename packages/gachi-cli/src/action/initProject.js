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
        })
    })
}
module.exports = {
    initProject,
}