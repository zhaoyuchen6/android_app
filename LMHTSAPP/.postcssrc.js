// https://github.com/michael-ciniawsky/postcss-load-config

/*module.exports = {
 "plugins": {
 "postcss-import": {},
 "postcss-url": {},
 // to edit target browsers: use "browserslist" field in package.json
 "autoprefixer": {}
 }
 }*/
module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    /*由于cssnext和cssnano都具有autoprefixer,事实上只需要一个，所以把默认的autoprefixer删除掉，然后把cssnano中的autoprefixer设置为false*/
    // to edit target browsers: use "browserslist" field in package.json
    // "autoprefixer": {},
    /*处理元素容器宽高比*/
    "postcss-aspect-ratio-mini": {},
    /*处理移动端1px的解决方案*/
    "postcss-write-svg": { utf8: false },
    /*该插件可以让我们使用CSS未来的特性，其会对这些特性做相关的兼容性处理*/
    "postcss-cssnext": {},
    "postcss-px-to-viewport": {
      viewportWidth: 1280, // (Number) 视窗的宽度，对应的是我们设计稿的宽度
      viewportHeight: 775, // (Number) 视窗的高度，对应的是我们设计稿的高度
      unitPrecision: 3, // (Number) 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: "vw",// (String) 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: [".ignore",".hairlines"], // (Array) // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      minPixelValue: 1, // (Number)小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      mediaQuery: false // (Boolean) 允许在媒体查询中转换`px`
    },
    /*插件主要是给CSS的属性添加content的属性，配合viewport-units-buggyfill库给vw、vh、vmin和vmax做适配的操作*/
    "postcss-viewport-units":{},
    /*压缩和清理CSS代码*/
    "cssnano": {
      preset: "advanced",
      autoprefixer: false,
      "postcss-zindex": false  //启用了这个插件，z-index的值就会重置为1，必须禁用
    }
  }
}
