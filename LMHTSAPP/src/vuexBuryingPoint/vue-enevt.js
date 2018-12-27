const internalRE = /^(?:pre-)?hook:/;
export default {
    install(Vue, pluginOption = {}){
        var method = pluginOption.type;
        const original = Vue.prototype[method];
        if (original) {
            Vue.prototype[method] = function (...args) {
              const res = original.apply(this, args);
              getAuiEventData(this, args[0], args.slice(1));
              return res;
            };
          }

        function getAuiEventData(vm, eventName, payload){
            if(typeof eventName === 'string' && !internalRE.test(eventName)){
                // console.log("eventName:",eventName);
                // console.log("vm:",vm);
                var tag = vm.$options._componentTag;
                if(eventName === "focus"){
                    window.mousedownTime = new Date();
                }
                if(eventName === 'click' || eventName === "item-click" || eventName === 'moreClick'){
                    if(vm._events.click || vm._events.moreClick){
                        getControlInfo(vm, eventName, payload, "点击按钮");
                    }      
                }else if(eventName === 'blur'){
                    getControlInfo(vm, eventName, payload, "输入框赋值");
                }else if(eventName === "selectedItem"){
                    getControlInfo(vm, eventName, payload, "下拉框赋值");
                }else if(eventName === "input"){

                }else if(eventName === "change"){
                    if(tag === "aui-datetime"){
                        getControlInfo(vm, eventName, payload, "时间框赋值");
                    }
                }
            }     
        }

        function getControlInfo(vm, eventName, payload, eventDesc) {
            //console.log(payload);
            var pageControlInfo = {};
            pageControlInfo['controlNum'] = "";
            pageControlInfo['controlTag'] = vm.$options._componentTag;
            pageControlInfo['controlName'] = vm.$el.textContent.trim().split(" ")[0];
            if (vm.$vnode.data && vm.$vnode.data.model&& vm.$vnode.data.model.expression) {
                pageControlInfo['controlCode'] = vm.$vnode.data.model.expression;
            }else{
                pageControlInfo['controlCode'] = "";
            }
            pageControlInfo['controlValue'] = payload[0];             
            pageControlInfo['eventType'] = eventName;
            pageControlInfo['eventDesc'] = eventDesc;
            if(window.mousedownTime === 0){
                pageControlInfo['handleTime'] = 0.1
            }else{
                pageControlInfo['handleTime'] = (new Date() - window.mousedownTime) / 1000;
            }
            window.mousedownTime = 0;
            var coordinates = {};
            coordinates['relativeScreen'] = window.coordinates['relativeScreen'];
            coordinates['relativeClient'] = window.coordinates['relativeClient'];
            coordinates['relativeControl'] = window.coordinates['relativeControl'];
            pageControlInfo['coordinates'] = coordinates;
            if(vm.$vnode.context && window.tradeInfo['tradePageList']){
                for (var i = window.tradeInfo['tradePageList'].length - 1; i >= 0; i--){
                    if (vm.$vnode.context._uid === window.tradeInfo['tradePageList'][i]['uid']){
                      pageControlInfo['controlNum'] = window.tradeInfo['tradePageList'][i]['pageControlList'].length + 1;
                      window.tradeInfo['tradePageList'][i]['pageControlList'].push(pageControlInfo);
                      break;
                    }
                }
            }    
        }
    },
    mounted() {
        if (window.bFlag) {
          this.$children && addChildrenListener(this.$children);
        }
    }
};

function addChildrenListener(childrens) {
    for (let i = 0; i < childrens.length; i++) {
        childrens[i].$el.addEventListener("mousedown", function($event) {
            window.mousedownTime = 0;
            window.mousedownTime = new Date();
            var eve = event || window.event;
            window.coordinates['relativeScreen'] = eve.screenX + "," + eve.screenY;
            window.coordinates['relativeClient'] = eve.clientX + "," + eve.clientY;
            window.coordinates['relativeControl'] = eve.offsetX + "," + eve.offsetY;
            $event.cancelBubble = true;
        });
        childrens[i].$children && addChildrenListener(childrens[i].$children);
    }    
}
