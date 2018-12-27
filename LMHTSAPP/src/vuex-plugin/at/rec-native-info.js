/**
 * Created by zhaoyuchen on 2018/06/11.
 * 录制时,获取原生组件信息方法
 */
export default {
    mounted: function () {
      let _this = this;
      this._vnode.children && this._vnode.children.forEach(element => {
        let tag = element.tag;
        if (tag === undefined) return;
        tag === "img" && getImgTagDta(element, _this);
        tag === "div" && getDivTagData(element, _this);
        tag === "input" && getInputTagData(element, _this);
        tag === "button" && getButtonTagData(element, _this);
        tag === "select" && getSelectTagData(element, _this);
        tag === "textarea" && getTextareaTagData(element, _this);
        element.children && getChildrenTag(element.children, _this);
      });
    },
    /*updated() {
      let _this = this;
      this._vnode.children && this._vnode.children.forEach(element => {
        let tag = element.tag;
        if (tag === undefined) return;
        tag === "img" && getImgTagDta(element, _this);
        tag === "div" && getDivTagData(element, _this);
        tag === "input" && getInputTagData(element, _this);
        tag === "button" && getButtonTagData(element, _this);
        tag === "select" && getSelectTagData(element, _this);
        tag === "textarea" && getTextareaTagData(element, _this);
        element.children && getChildrenTag(element.children, _this);
      });
    }*/
  }
  
  function getInputTagData(VNode, _this) {
    if (VNode.data && VNode.data.on) {
      if(VNode.data.on.blur){
        let myFn = VNode.data.on.blur.fns;
        VNode.data.on.blur.fns = function ($event) {
          if(window.flag){
            setNativeTagData(VNode, _this);
          }
          myFn();
        };
      }else{
        VNode.elm.addEventListener("blur",function(){
          if(window.flag){
            setNativeTagData(VNode, _this);
          }
        })
      }
    }
  }
  
  function getTextareaTagData(VNode, _this) {
    getInputTagData(VNode, _this);
  }
  
  function getButtonTagData(VNode, _this){
    if (VNode.data && VNode.data.on && VNode.data.on.click){
      let myFn = VNode.data.on.click.fns;
      VNode.data.on.click.fns = function ($event){
        if(window.flag){
          setNativeTagData(VNode, _this);
        }
        myFn();
      }
    }
  }
  
  function getSelectTagData(VNode, _this){
    if(VNode.data && VNode.data.on && VNode.data.on.change){
      let myFn = VNode.data.on.change.fns;
      VNode.data.on.change.fns = function ($event) {
        if(window.flag){
          setNativeTagData(VNode, _this);
        }
        myFn($event);
      }
    }
  }
  
  function getImgTagDta(VNode, _this){
    if (VNode.data && VNode.data.on && VNode.data.on.click){
      let myFn = VNode.data.on.click.fns;
      VNode.data.on.click.fns = function ($event){
        if(window.flag){
          setNativeTagData(VNode, _this);
        }
        myFn();
      }
    }
  }
  
  function getDivTagData(VNode, _this){
    if (VNode.data && VNode.data.on && VNode.data.on.click){
      let myFn = VNode.data.on.click.fns;
      VNode.data.on.click.fns = function ($event){
        if(window.flag){
          setNativeTagData(VNode, _this);
        }
        myFn($event);
      }
    }
  }
  
  function getChildrenTag(children, _this) {
    for (let i = 0; i < children.length; i++){
      if(children[i].tag === "input"){
        getInputTagData(children[i], _this)
      }else if(children[i].tag === "textarea"){
        getTextareaTagData(children[i], _this)
      }else if(children[i].tag === "button"){
        getButtonTagData(children[i], _this)
      }else if(children[i].tag === "select"){
        getSelectTagData(children[i], _this)
      }else if(children[i].tag === "img"){
        getImgTagDta(children[i], _this)
      }else if(children[i].tag === "div"){
        getDivTagData(children[i], _this);
        children[i].children && getChildrenTag(children[i].children, _this)
      }else if (children[i].children) {
        getChildrenTag(children[i].children, _this)
      }
    }
  }
  
  function setNativeTagData(VNode, _this) {
      if(VNode.data === undefined || VNode.data.ref === undefined){
        return;
      }
      let recContext = window.recContext;
      let map = new Map;
      // let isTradeParent = VNode.context;
      // while(isTradeParent!=undefined&&isTradeParent.constructor.extendOptions.isTrade === undefined||!isTradeParent.constructor.extendOptions.isTrade){
      //   isTradeParent = isTradeParent.$parent;
      // }
      map['pageName'] = VNode.context.constructor.extendOptions.name;
      map['ref'] = VNode.data.ref;
      map['controlType']
      map['vModel'] = '';
      map['value'] = '';
      map['addiValue'] = '';
      map['transCode'] = VNode.context.constructor.extendOptions.name;
      if(VNode.tag === "input"){
        map['controlType'] = 'Text';
        map['vModel'] = VNode.data.directives[0].expression;
        if(VNode.data && VNode.data.attrs && VNode.data.attrs.type === "checkbox"){
          map['value'] = VNode.elm.checked;
        }else{
          map['value'] = VNode.elm.value;
        }
      }else if(VNode.tag === "textarea"){
        map['controlType'] = 'MultiLineText';
        map['vModel'] = VNode.data.directives[0].expression;
        map['value'] = VNode.elm.value;
      }else if(VNode.tag === "button"){
        map['controlType'] = 'Button';
        if(VNode.data.key!=undefined){
          map['value'] = VNode.data.key;
          map['addiValue'] = 'FB';
        }
      }else if(VNode.tag === "select"){
        map['controlType'] = 'Select';
        map['vModel'] = VNode.data.directives[0].expression;
        map['value'] = VNode.elm.value;
      }else if(VNode.tag === "img" || VNode.tag === "div"){
        map['controlType'] = 'Image';
      }
      recContext.push(map);
  }
  
  
  