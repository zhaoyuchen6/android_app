/**
 * Created by zhaoyuchen on 2018/06/11.
 * 录制时,获取Aui组件的信息
 */
const internalRE = /^(?:pre-)?hook:/;
export default {
    install(Vue, pluginOption = {}) {
      wrap(pluginOption.type, pluginOption.cb,);
      function wrap(method, cb) {
        const original = Vue.prototype[method];
        if (original) {
          Vue.prototype[method] = function (...args) {
            const res = original.apply(this, args);
            logEvent(this, method, args[0], args.slice(1), cb);
            return res
          }
        }
      }

      function logEvent(vm, type, eventName, payload, cb) {
        if (typeof eventName === 'string' && !internalRE.test(eventName)) {
          if (cb) {
            cb();
          }
          console.log(vm, type, eventName, payload);
          if (window.flag) {
            setRecContext(vm, eventName, payload, window.recContext);
          }
        }
      }

      function setRecContext(vm, eventName, payload, recContext) {
        let node = vm.$vnode;
        if(node===undefined||node.data===undefined||node.data.ref===undefined){
          return;
        }
        if(vm.readonly){
          return;
        }
        let tag = vm.$options._componentTag;
        if(tag === 'aui-autocomplete'){
          if(eventName === 'select'){
            setAuiTagData(vm,eventName,payload,recContext)
          }
        }else if(tag==='aui-button'|| tag === 'submit-button' || tag === 'aui-img'|| tag === 'aui-flexbox' || tag === 'aui-cell'){
          if (eventName === 'click'){
            setAuiTagData(vm,eventName,payload,recContext)
          }
        }else if(tag === 'aui-input' || tag === 'aui-textarea' || tag === 'aui-search'){
          if(vm.$vnode.data.model===undefined){
            return;
          }
          if (eventName === 'blur') {
            setAuiTagData(vm,eventName,payload,recContext)
          }
        }else if(tag === 'aui-select'||tag === 'aui-selector' || tag === 'aui-switch' || tag === 'aui-datetime' || tag === 'aui-datetime-range'
        ||tag==='aui-datetime-view'||tag==='aui-calendar'||tag==='aui-inline-calendar'||tag==='aui-date-key-picker'||tag==='aui-popup-radio'
        ||tag==='aui-checker'||tag==='aui-checklist' ||tag==='aui-radio'||tag==='aui-picker'||tag==='aui-color-picker'||tag==='aui-popup-picker'
        ||tag==='aui-range'||tag==='aui-rate' || tag==='aui-input-number'){
          if (eventName === 'change'){
            setAuiTagData(vm,eventName,payload,recContext)
          }
        }else if(tag === 'aui-tab' || tag === 'aui-button-tab' || tag === 'aui-tabbar' || tag==='aui-address' || tag === 'aui-alert'){
          if (eventName === 'input') {
            setAuiTagData(vm,eventName,payload,recContext)
          }
        }else if(tag === 'aui-check-icon'){
          if (eventName === 'update:value') {
            setAuiTagData(vm,eventName,payload,recContext)
          }
        }else if(tag === 'aui-actionsheet'){
          if (eventName === 'click-menu') {
            setAuiTagData(vm,eventName,payload,recContext)
          }
        }else if (tag === 'aui-confirm') {
          if(eventName === 'confirm'||eventName === 'cancel'){
            setAuiTagData(vm,eventName,payload,recContext)
          }
        }
      }

      function setAuiTagData(vm,eventName,payload,recContext){
        let map = new Map;
        let tag = vm.$options._componentTag;
        // let isTradeParent = vm.$parent;
        // while(isTradeParent!=undefined&&isTradeParent.constructor.extendOptions.isTrade === undefined||!isTradeParent.constructor.extendOptions.isTrade ){
        //   isTradeParent = isTradeParent.$parent;
        // }
        // map['pageName'] = isTradeParent.constructor.extendOptions.name;
        map['pageName'] = vm.$vnode.context.constructor.extendOptions.name;
        map['ref'] = vm.$vnode.data.ref;
        //map['transCode'] = isTradeParent.constructor.extendOptions.name;
        map['transCode'] = vm.$vnode.context.constructor.extendOptions.name;
        map['vModel'] = '';
        map['value'] = "";
        map['addiValue'] = "";
        if(tag === 'aui-autocomplete'){
          map['controlType'] = 'ExpandableText';
        } else if(tag === 'aui-button'||tag === 'submit-button'){
          map['controlType'] = 'Button';
        } else if (tag === 'aui-input') {
          map['controlType'] = 'Text';
        } else if (tag === 'aui-textarea') {
          map['controlType'] = 'MultiLineText';
        } else if(tag === 'aui-img'){
          map['controlType'] = 'Image';
        } else if (tag === 'aui-selector'||tag === 'aui-select') {
          map['controlType'] = 'Select';
        } else if (tag === 'aui-switch') {
          map['controlType'] = "Switch";
        } else if (tag==='aui-datetime'||tag==='aui-date-key-picker') {
          map['controlType'] = "DateText";
        } else if(tag === 'aui-actionsheet'){
          map['controlType'] = 'ActionSheet';
        }else if(tag==='aui-datetime-range'){
          map['controlType'] = "DateRange";
        } else if(tag==='aui-datetime-view'){
          map['controlType'] = "DateView";
        } else if(tag==='aui-calendar'){
          map['controlType'] = "Calendar";
        } else if(tag==='aui-inline-calendar'){
          map['controlType'] = "InlineCalendar";
        } else if (tag === 'aui-checker') {
          let type = vm.type;
          if ("radio" === type) {
            map['controlType'] = "RadioButton";
          } else if ("checkbox" === type) {
            map['controlType'] = "Checkbox";
          }
        } else if(tag === 'aui-radio'){
          map['controlType'] = "RadioButton";
        } else if (tag === 'aui-checklist') {
          map['controlType'] = "CheckList";
        } else if(tag === 'aui-check-icon'){
          map['controlType'] = "CheckIcon";
        } else if(tag === 'aui-popup-radio'){
          map['controlType'] = "PopupRadio";
        } else if(tag === 'aui-search'){
          map['controlType'] = 'Search';
        } else if(tag === 'aui-tab'){
          map['controlType'] = 'Tab';
        } else if(tag === 'aui-button-tab'){
          map['controlType'] = 'ButtonTab';
        } else if(tag === 'aui-tabbar'){
          map['controlType'] = 'Tabbar';
        } else if(tag==='aui-address'){
          map['controlType'] = 'Address';
        } else if(tag==='aui-picker'){
          map['controlType'] = "Picker";
        } else if(tag==='aui-color-picker'){
          map['controlType'] = "ColorPicker";
        } else if(tag==='aui-popup-picker'){
          map['controlType'] = "PopupPicker";
        } else if(tag==='aui-range'){
          map['controlType'] = "Range";
        } else if(tag==='aui-rate'){
          map['controlType'] = "Rate";
        } else if(tag==='aui-input-number'){
          map['controlType'] = "Number";
        } else if(tag === 'aui-flexbox'){
          map['controlType'] = 'FlexBox';
        } else if(tag === 'aui-cell'){
          map['controlType'] = 'Cell';
        } else if(tag === 'aui-alert'){
          map['controlType'] = 'Alert';
        } else if(tag === 'aui-confirm'){
          map['controlType'] = 'Confirm';
        }
        if(vm.$vnode.data.model!=undefined){
          map['vModel'] = vm.$vnode.data.model.expression;
        }
        if(tag === 'aui-autocomplete'){
          map['value'] = payload[0].tradeCode;
        }else if(tag === 'aui-actionsheet'){
          map['value'] = payload[1];
        }else if(tag==='aui-date-key-picker'|| tag === 'aui-check-icon'){
          map['value'] = payload[0];
        }else if(tag === 'aui-tab' || tag === 'aui-button-tab' || tag === 'aui-tabbar'){
          map['value'] = vm.currentIndex;
        }else if(tag==='aui-address'){
          let value = new Array();
          let b = vm.nameValue.split(" ");
          for(let i=0;i<b.length;i++){
            value.push("'"+b[i]+"'");
          }
          map['value'] = value;
        }else if(tag === 'aui-flexbox'||tag === 'aui-button'){
          let _vm = vm;
          while(_vm!=undefined&&_vm.$vnode!=undefined&&_vm.$vnode.data!=undefined&&_vm.$vnode.data.key===undefined){
            _vm = _vm.$parent;
          }
          if(_vm!=undefined&&_vm.$vnode!=undefined&&_vm.$vnode.data!=undefined&&_vm.$vnode.data.key!=undefined){
            map['value'] = vm.$vnode.data.key;
            map['addiValue'] = 'FB';
          }
        }else if(tag ==='aui-datetime-range'||tag ==='aui-checklist'||tag==='aui-picker'
          ||tag==='aui-popup-picker'||map['controlType'] ==="Checkbox"){
          let values = new Array();
          if(value!=undefined){
            for(let i=0;i<value.length;i++){
              values.push("'"+value[i]+"'");
            }
          }else{
            values = "";
          }
          map['value'] = values;
        }else if(tag === 'aui-input' || tag === 'aui-textarea' || tag === 'aui-search'||tag === 'aui-select'
          ||tag === 'aui-selector' || tag === 'aui-switch' || tag === 'aui-datetime' ||tag==='aui-datetime-view'
          ||tag==='aui-calendar'||tag==='aui-inline-calendar'||tag==='aui-checker' ||tag==='aui-color-picker'
          ||tag==='aui-range'||tag==='aui-rate' || tag==='aui-input-number'||tag==='aui-radio'||tag==='aui-popup-radio'){
          map['value'] = vm.$vnode.data.model.value;
        }else if(tag === 'aui-alert'){
          map['value'] = vm.showValue;
        }else if(tag === 'aui-confirm'){
          map['value'] = vm.msg;
          if(eventName === 'confirm'){
            map['addiValue'] = 'true'
          }else if(eventName === 'cancel'){
            map['addiValue'] = 'false'
          }
        }
        recContext.push(map);
      }
    }
}
