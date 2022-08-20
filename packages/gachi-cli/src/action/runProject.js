const { exec } = require("child_process");
const { readdirSync, realpathSync, readFileSync, outputFileSync} = require("fs-extra");
const glob = require('glob');
const { join, resolve, basename } = require("path");
const { createCompilerHost, createProgram } = require('typescript');


function runProject(relativePath){
    let path = realpathSync(relativePath);
    let dir = readdirSync(path);
    let tsConfig = JSON.parse(readFileSync(resolve(relativePath, 'tsconfig.json')).toString()).compilerOptions
    if (dir.includes('config.ts')){
        glob('**/*.ts', (err,matches)=>{
            const files = matches.filter((fileName) => !fileName.includes('node_modules'));
            const host = createCompilerHost(tsConfig);
            const record = {};
            host.writeFile = (fileName, text) => {
                console.log(`[${new Date().getTime()}][gachi-cli][INFO]${fileName} Bundle Success`);
                record[resolve(relativePath, fileName)] = text;
            }
            const program = createProgram(files, tsConfig, host);
            program.emit();
            const entries = Object.entries(record);
            entries.forEach((v)=>{
                const [path, content] = v;
                outputFileSync(path, content);
            })
            exec(`node ${relativePath}/dist/app.js`, (error, stdout, stderr)=>{
                if (error){console.log(error.message)}
                console.log(stdout || stderr);
            })
        })
        
    } else {
        console.warn('not find any Config File');
    }
}

module.exports = {
    runProject
}
