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
