const path = require('path')
var fs = require('fs');
console.log("===============build store start==============");
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
                    str += "import " + modulename + " from '../../src/modules" + subfilepath.replace(basePath, '').replace(/\\/g, "\/") + "'" + "\r\n";
                    registerModule += "    store.registerModule(" + modulename + ".name" + ", " + modulename + ");\r\n"
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

str += "\r\nexport default{ \r\n init (store) {\r\n" + registerModule + "  }\r\n}"

let result = fs.existsSync(path.resolve(__dirname, '../ab-manager/ab-manager-store/storeManager.js'));
if (result) {
    fs.writeFileSync(path.resolve(__dirname, '../ab-manager/ab-manager-store/storeManager.js'), str);
} else {
    fs.open(path.resolve(__dirname, '../ab-manager/ab-manager-store/storeManager.js'), 'w', (err, fd) => {
        fs.writeFileSync(path.resolve(__dirname, '../ab-manager/ab-manager-store/storeManager.js'), str);
    });
}
console.log("===============build store sucess==============");
