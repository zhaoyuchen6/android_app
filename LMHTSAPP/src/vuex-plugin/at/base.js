export default {
    install(Vue, pluginOption = {}){
        //控制是否记录录制数据
        window.flag = false;
        //用于存放录制的数据
        window.recContext = new Array();

        //根据vue页面定义的name获取vue页面实例对象
        window.findVueByName = function(name){
            let node = document.getElementById('app').__vue__;
            let optionName = node.$options.name;
            if(optionName == name){
                return node;
            }else{
                return traversalVuePage(node,name);
            }   
        }
        //遍历vue页面
        function traversalVuePage(node,name){
            let nodes = node.$children;
            for(let i=0;i<nodes.length;i++){
                let optionName = nodes[i].$options.name;
                if(optionName == name){
                    return nodes[i];
                }else{
                    let node = traversalVuePage(nodes[i],name);
                    if(node != undefined && node != ""){
                        return node;
                    }
                }
            }
        }

        //获取录制数据对象     
        window.getRecContext = function(){
            return window.recContext;
        };
        //清空录制数据对象
        window.clearRecContext = function(){
            window.recContext.splice(0,window.recContext.length);
        };

        //Aui组件库中input组件的聚焦方法
        window.getNativeElement = function(element){
            if(element.tagName === "INPUT"){
                return element;
            }else if(element.children){
                return traversalElement(element.children);
            }
        }
        function traversalElement(){
            for(let i = 0; i < childrens.length; i++){
                if(childrens[i].tagName === "INPUT"){
                    return childrens[i];
                }else if(childrens[i].children){
                    let element = traversalElement(childrens[i].children)
                    if(element != undefined && element != ""){
                        return element;
                    }
                }
            }
        }

        //抓取页面信息
        window.pageInfo = new Map();
        window.setPageInfoMap = function(name){
            let vueInfo = window.findVueByName(name);
            window.pageInfo.set(name,vueInfo);
        };
        window.getPageInfoMap = function(name){
            return window.pageInfo.get(name);
        };
        window.clearPageInfoMap = function(){
            window.pageInfo.clear();
        };
    }
}