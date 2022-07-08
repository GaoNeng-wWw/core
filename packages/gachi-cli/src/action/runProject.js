const ts = require('typescript');
const { exec } = require("child_process");
const { readdirSync, realpathSync, readFileSync, fstat, writeFileSync } = require("fs");
const { Script } = require('vm');
function runProject(relativePath){
    //
    let path = realpathSync(relativePath);
    const runArgs = ``;
    let command = ``
    const dir = readdirSync(path);
    if (dir.includes('config.ts')){
        exec(`ts-node `, (err,stdout,stderr)=>{
            if (err || stderr){
                console.log(err || stderr);
            }
            console.log(stdout)
        })
        // writeFileSync(`${path}\\config.js`, code);

        // let ctx = new Script(code);
        // ctx.runInNewContext()
        // const data = ctx.cachedData;
        // console.log(data.toString())
    } else {
        console.warn('not find any Config File');
    }
}

module.exports = {
    runProject
}
