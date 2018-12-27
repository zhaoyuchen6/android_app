var fs = require('fs');
var path = require("path");

var pagesPath = path.resolve("./src/pages");
var pagePath = path.resolve("./src/pages.js");

var pagesList = '';

console.log("===============build pages start==============");
/*
let dirs = fs.readdirSync(pagesPath, "utf-8")

for (let i = 0; i < dirs.length; i++) {
  let result = fs.readFileSync(path.resolve("./src/pages", dirs[i]), 'utf-8')
  if(result.length>0){
    let startIndex = result.indexOf("[");
    let endIndex = result.indexOf("]");
    let liststring = result.substring(startIndex + 1, endIndex - 1) + "," + "\n\t";
    pagesList += liststring;
  }
}

pagesList = pagesList.substring(0,pagesList.length-3)

let outPutJsString = "export default [ \n" + pagesList + "]";
fs.writeFileSync(pagePath, outPutJsString);

*/




function fileDisplay (pagesPath) {
  fs.readdir(pagesPath, "utf-8", ((err, files) => {
    if (err) throw err;
    let fileCount = 0;
    files.forEach(fileName => {
      fileCount++;
      let filePath = path.join(pagesPath, fileName);
      fs.stat(filePath, ((err, stats) => {
        if (err) throw err;
        if (stats.isFile()) {
          fs.readFile(filePath, 'utf-8', function(err, result) {
            let startIndex = result.indexOf("[");
            let endIndex = result.indexOf("]");
            let liststring = result.substring(startIndex + 1, endIndex - 1) + "," + "\n\t";
            pagesList += liststring;
          })
        }
        if (stats.isDirectory()){
          console.log("文件夹================"+filePath);
          fileDisplay(filePath)
        }
      }));
    });
  }));
}
// 执行方法
fileDisplay(pagesPath);

process.on('beforeExit', function(code) {
  let outPutJsString = "export default [ \n" + pagesList + "]";
  let result = fs.existsSync(path.resolve(__dirname, '../src/pages.js'));
  let cs = console;
  if (result) {
    fs.writeFileSync(path.resolve(__dirname, '../src/pages.js'), outPutJsString);
    console.log("===============build pages success==============");
  } else {
    fs.open(path.resolve(__dirname, '../src/pages.js'), 'w', (err, fd) => {
      fs.writeFileSync(path.resolve(__dirname, '../src/pages.js'), outPutJsString);
    });
  }
})



console.log("===============build pages success==============");
