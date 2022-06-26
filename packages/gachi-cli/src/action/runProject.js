const { exec } = require("child_process");
const { readdirSync, realpathSync } = require("fs");
function runProject(relativePath){
    //
    let path = realpathSync(relativePath);
    const runArgs = ``;
    const dir = readdirSync(path);
    if (dir.includes('index.ts')){
        exec(`ts-node ${path}\\index.ts`, (err,stdout,stderr)=>{
            if (err || stderr){
                console.log(err || stderr)
            }
            if (stdout){
                console.log(stdout);
            }
        })
    } else {
        //
        const command = `
            "import('gachi').then((module)=>{
                const {gachi} = module;
                new gachi()
            })"
        `
        exec(
        `
            ts-node -e "import('${__dirname.replace(/\\/gim,'/')}/lib/run').then((module)=>{module.default('${arg}')})"
        `
        ,(err,out,stderr)=>{
            if (err || stderr){
                console.error(err || stderr)
            }
            if(stdout){
                console.log(stdout);
            }
        })
    }
}

module.exports = {
    runProject
}
