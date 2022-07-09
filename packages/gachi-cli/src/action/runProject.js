const { exec } = require("child_process");
const { readdirSync, realpathSync, readFileSync, fstat, writeFileSync } = require("fs");

function runProject(relativePath){
    //
    let path = realpathSync(relativePath);
    const runArgs = ``;
    let command = ``
    let dir = readdirSync(path);
    if (dir.includes('config.ts')){
        exec('tsc', ()=>{
            exec(`node ${relativePath}/dist/app.js`, (err, stdout, stderr)=>{
                if (err)    {console.log(err)}
                if (stdout) {console.log(stdout)}
                if (stderr) {console.log(stderr)}
            })
        })
    } else {
        console.warn('not find any Config File');
    }
}

module.exports = {
    runProject
}
