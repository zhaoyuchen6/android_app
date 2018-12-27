/**
 * Created by zhaoyuchen on 2018/08/08.
 * 数据埋点,native组件事件监听
 */
export default {
    mounted() {
      if (window.bFlag) {
        this._vnode.children && this._vnode.children.forEach(element => {
          if (element.tag === "input") {
            getInputTagData(element);
          } else if (element.tag === "textarea") {
            getTextareaTagData(element);
          } else if (element.tag === "select") {
            getSelectTagData(element);
          } else if (element.tag === "a") {
            getLinkTagData(element);
          } else if (element.data && element.data.on && element.data.on.click) {
            getClickEventTagData(element);
          } else if (element.data && element.data.on && element.data.on["~click"]) {
            getClickOnceEventTagData(element);
          } else if (element.data && element.data.on && element.data.on.dblclick) {
            getDblclickEventTagData(element);
          }
          element.children && getChildrenTag(element.children);
        });
      }
    },
    // updated(){
    //   if (window.bFlag) {
    //     this._vnode.children && this._vnode.children.forEach(element => {
    //       if (element.tag === "a") {
    //         getLinkTagData(element);
    //       } else if (element.data && element.data.on && element.data.on.click) {
    //         getClickEventTagData(element);
    //       } else if (element.data && element.data.on && element.data.on["~click"]) {
    //         getClickOnceEventTagData(element);
    //       } else if (element.data && element.data.on && element.data.on.dblclick) {
    //         getDblclickEventTagData(element);
    //       }
    //       element.children && getChildrenTag(element.children);
    //     });
    //   }
    // }
  };

  function getChildrenTag(childrens) {
    for (let i = 0; i < childrens.length; i++) {
      if (childrens[i].tag === "input") {
        getInputTagData(childrens[i]);
      } else if (childrens[i].tag === "textarea") {
        getTextareaTagData(childrens[i]);
      } else if (childrens[i].tag === "select") {
        getSelectTagData(childrens[i]);
      } else if (childrens[i].tag === "a") {
        getLinkTagData(childrens[i]);
      } else if (childrens[i].data && childrens[i].data.on && childrens[i].data.on.click) {
        getClickEventTagData(childrens[i]);
      } else if (childrens[i].data && childrens[i].data.on && childrens[i].data.on["~click"]) {
        getClickOnceEventTagData(childrens[i]);
      } else if (childrens[i].data && childrens[i].data.on && childrens[i].data.on.dblclick) {
        getDblclickEventTagData(childrens[i]);
      }
      childrens[i].children && getChildrenTag(childrens[i].children);
    }
  }

  function getInputTagData(VNode){
    getMousedownInfo(VNode);
    if(VNode.data && VNode.data.attrs && VNode.data.attrs.type && (VNode.data.attrs.type === "check" || VNode.data.attrs.type === "radio")){
        VNode.elm.addEventListener("blur", function($event) {
            if (window.bFlag) {
                getNativeTagData(VNode, "blur", "单(复)选框勾选");
            }
            $event.cancelBubble = true;
        });
    }else{
        VNode.elm.addEventListener("blur", function($event) {
            if (window.bFlag) {
                getNativeTagData(VNode, "blur", "文本框赋值");
            }
            $event.cancelBubble = true;
        });
    }
  }

  function getTextareaTagData(VNode) {
    getMousedownInfo(VNode);
    VNode.elm.addEventListener("blur", function($event) {
        if (window.bFlag) {
            getNativeTagData(VNode, "blur", "文本域赋值");
        }
        $event.cancelBubble = true;
    });
  }

  function getSelectTagData(VNode) {
    getMousedownInfo(VNode);
    //监听change事件
    VNode.elm.addEventListener("change", function($event) {
      if (window.bFlag) {
          getNativeTagData(VNode, "change", "下拉框赋值");
      }
      $event.cancelBubble = true;
    });
  }

  function getLinkTagData(VNode) {
    getMousedownInfo(VNode);
    if (VNode.data && (VNode.data.attrs && VNode.data.attrs.href) || (VNode.data.on && VNode.data.on.click)) {
      VNode.elm.addEventListener("click", function($event) {
        if (window.bFlag) {
          getNativeTagData(VNode, "click", "点击链接");
        }
        $event.cancelBubble = true;
      });
    }
  }

  function getClickEventTagData(VNode) {
    getMousedownInfo(VNode);
    //监听click事件
    if (VNode.tag === "button") {
      let myFn = VNode.data.on.click.fns;
      VNode.data.on.click.fns = function ($event) {
        if (window.bFlag) {
          getNativeTagData(VNode, "click",  "点击按钮");
        }
        myFn();
      };
    } else {
      VNode.elm.addEventListener("click", function($event) {
        if (window.bFlag) {
          getNativeTagData(VNode, "click", "点击视图");
        }
        $event.cancelBubble = true;
      });
    }
  }

  function getClickOnceEventTagData(VNode) {
    getMousedownInfo(VNode);
    //监听click事件
    let myFn = VNode.data.on["~click"].fns;
    VNode.data.on["~click"].fns = function ($event) {
      if (window.bFlag) {
        getNativeTagData(VNode, "click", "点击视图");
      }
      myFn($event);
    };
  }

  function getDblclickEventTagData(VNode) {
    getMousedownInfo(VNode);
    let myFn = VNode.data.on.dblclick.fns;
    VNode.data.on.dblclick.fns = function ($event) {
      if (window.bFlag) {
        getNativeTagData(VNode, "dblclick", "双击视图");
      }
      myFn($event);
    };
  }

  //给节点元素添加mousedown事件，获取鼠标点击时，鼠标坐标，鼠标点击时间
  function getMousedownInfo(VNode){
    if(VNode.tag === "input" || VNode.tag === "textarea" || VNode.tag === "select"){
      VNode.elm.addEventListener("focus", function() {
        if (window.bFlag) {
          window.mousedownTime = new Date();
        }
      });
    }
    VNode.elm.addEventListener("mousedown", function($event) {
      if (window.bFlag) {
        if(VNode.tag != "input" && VNode.tag != "textarea" && VNode.tag === "select"){
          window.mousedownTime = new Date();
        }       
        var eve = event || window.event;
        window.coordinates['relativeScreen'] = eve.screenX + "," + eve.screenY;
        window.coordinates['relativeClient'] = eve.clientX + "," + eve.clientY;
        window.coordinates['relativeControl'] = eve.offsetX + "," + eve.offsetY;
        $event.cancelBubble = true;
      }
    });
  }

  function getNativeTagData(VNode, eventName, eventDesc){
    //console.log("VNode:",VNode);
    var pageControlInfo = {};
    pageControlInfo['controlNum'] = "";
    if(VNode.componentOptions){
      pageControlInfo['controlTag'] = VNode.componentOptions.tag
    }else{
      pageControlInfo['controlTag'] = VNode.tag;
    }
    if(VNode.elm.textContent === ""){
      pageControlInfo['controlName'] = VNode.elm.placeholder;
    }else{
      pageControlInfo['controlName'] = VNode.elm.textContent.trim().split(" ")[0];
    } 
    if (VNode.data && VNode.data.directives && VNode.data.directives[0] && VNode.data.directives[0].expression) {
      pageControlInfo['controlCode'] = VNode.data.directives[0].expression;
    }else{
      pageControlInfo['controlCode'] = "";
    }
    if(VNode.data && VNode.data.model){
      pageControlInfo['controlValue'] = VNode.data.model.value;
    }else{
      pageControlInfo['controlValue'] = VNode.elm.value || "";
    }
    pageControlInfo['eventType'] = eventName;
    pageControlInfo['eventDesc'] = eventDesc;
    if(window.mousedownTime === 0){
      pageControlInfo['handleTime'] = 0.1;
    }else{
      pageControlInfo['handleTime'] = (new Date() - window.mousedownTime) / 1000;
    }
    window.mousedownTime = 0;
    var coordinates = {};
    coordinates['relativeScreen'] = window.coordinates['relativeScreen'];
    coordinates['relativeClient'] = window.coordinates['relativeClient'];
    coordinates['relativeControl'] = window.coordinates['relativeControl'];
    pageControlInfo['coordinates'] = coordinates;
    if(VNode.context && window.tradeInfo['tradePageList']){
        for (var i = window.tradeInfo['tradePageList'].length - 1; i >= 0; i--){
            if (VNode.context._uid === window.tradeInfo['tradePageList'][i]['uid']){
                pageControlInfo['controlNum'] = window.tradeInfo['tradePageList'][i]['pageControlList'].length + 1;
                window.tradeInfo['tradePageList'][i]['pageControlList'].push(pageControlInfo);
                break;
            }
        }
    }     
}
  