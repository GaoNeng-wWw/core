import {readdir, readdirSync, readFileSync} from 'fs';
import { join, resolve } from 'path';
import { isFile } from './utils/file';
const paths = resolve('./docs');
const table = JSON.parse(readFileSync(`${paths}\\i18.json`).toString());
function getSideBarDir(){
    const black_list = ['.vitepress', 'index.md', 'nav','i18.json'];
    const dir = readdirSync(paths).filter((val)=>!black_list.includes(val));
    return dir.map((val) => `/${val}/`);
}
/**
 * 
 * @param {string[]} list 
 */
function bundleSideBar(list){
    // 
    let obj = {};
    let tmpObj = {};
    list.forEach((relativePath)=>{
        const path = join(paths,relativePath.replace(/\//gim, '\\'));
        if (isFile(path)){
            const text = table[relativePath] || relativePath.replace(/\//gim,'');
            const collapsible = true;
            tmpObj = {text, collapsible, items: []};
            const postPath = `${resolve(paths,path)}`;
            const postDir = readdirSync(postPath);
            postDir.forEach((post)=>{
                const link = `${relativePath}${post.replace('.md','')}`;
                const text = `${table[link]}`;
                console.log(link)
                tmpObj.items.push({link,text});
            })
            
            obj[relativePath] = [tmpObj];
        }
    })
    return obj;
}
const sidebar = bundleSideBar(getSideBarDir());
export default {
    title: 'Gachi',
    description: 'Just playing around.',
    themeConfig: {
      nav: [
        { text: '教程', link: '/guide/' },
      ],
      sidebar
    }
}