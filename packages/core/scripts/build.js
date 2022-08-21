const {readConfigFile, createProgram, createCompilerHost} = require('typescript');
const {join, resolve, normalize} = require('path');
const { readFileSync, rmSync, statSync, rmdirSync } = require('fs');
const glob = require('glob');
const { execSync } = require('child_process');
/**
 * 
 * @param {string[]} steps 
 */
function dist(){
    const projectPath = resolve('.');
    const configPath = normalize(join(projectPath, 'tsconfig.json'));
    const {config: {compilerOptions, include, exclude}} = readConfigFile(configPath,(path)=>{
        if (configPath === path) return readFileSync(path).toString();
    });
    const host = createCompilerHost(compilerOptions);
    const includesFile = include.map((value)=>glob.sync(value)).flat();
    console.log('Bundle....');
    const program = createProgram(includesFile, compilerOptions, host);
    program.emit();
    console.log('Bundle Success');

    console.log('Clear delcaration files');
    const removeDeclarationFiles = glob.sync('./dist/**/*.d.ts').filter(v => v !=='./dist/index.d.ts');
    const removeTypeFiles = glob.sync('./dist/src/types/*');
    const removeFiles = [...new Set([...removeDeclarationFiles, ...removeTypeFiles, './dist/src/types'])];
    try {
        execSync('api-extractor run');
    } catch (e) {}
    removeFiles.forEach((value)=>{
        const stat = statSync(value);
        console.log(`remove ${value}`)
        if (stat.isDirectory()){
            rmdirSync(value)
        } else {
            rmSync(value);
        }
    })
    console.log('Clear Success');
}
dist()

