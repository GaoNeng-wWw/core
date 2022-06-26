const {statSync} = require('fs');
/**
 * 
 * @param {string} path 
 * @returns {boolean}
 */
export function isFile(path){
    return statSync(path).isFile;
}