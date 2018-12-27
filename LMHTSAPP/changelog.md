##v1.2.0
- 修改ab-manager-store初始化方法，注入全局store 
  由StoreManager.init()更改为StoreManager.init(store)
- 修改了ab-manager-router，全局注册了$activityManager属性，取消mixin方法
- 更改build-pages.js为同步执行，适配IDE的壳
##v1.2.1
- 更改agreeSDK和aui-m的目录结构
- 修改打包指令，每次打包前重新构建静态依赖
- 首页增加国际化示例
- 修复storeManager的clear方法
##v1.2.2
- 修改meta信息修复工程在移动端的展示比例问题
- 新增aui-m-config，处理aui组件库的引入配置
- 修改utils的引入方式，单个导出
- 抽离配置文件