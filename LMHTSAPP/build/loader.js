const path = require('path')
const getOptions = require('loader-utils').getOptions 
const fs = require('fs');

function toDash(str) {
    return str.toUpperCase().replace(/[-.]/g, '')
}

function buildStore(filepath, modulename) {
    let dirs = fs.readdirSync(filepath);
    for (let i = 0; i < dirs.length; i++) {
        //不读取shared目录
        if (dirs[i] != 'shared') {
            let subfilepath = filepath + '/' + dirs[i];
            let filestatusinfo = fs.statSync(subfilepath);
            if (filestatusinfo.isFile()) {
                if (dirs[i] == 'index.js') {
                    str += "import " + modulename + " from './modules" + subfilepath.replace(basePath, '').replace(/\\/g, "\/") + "'" + "\r\n";
                    registerModule += "store.registerModule(" + modulename + ".name" + ", " + modulename + ");\r\n"
                }
            } else {
                buildStore(subfilepath, toDash(dirs[i]));
            }
        }
    }
}
let basePath = path.resolve(__dirname, '../src/modules'); //基础路径

let str = ''
let registerModule = ''

buildStore(path.resolve(__dirname, "../src/modules"), 'MODULES');
module.exports = function (source) {
    let reg = /StoreManager\.init\s{0,}\(\s{0,}store\s{0,}\)/
    if(reg.test(source)){
        let sourceStr = str + "\r\n" + registerModule + "StoreManager\.init(store) \r\n"
        source = source.replace(reg,sourceStr)
    }
    return source;
}