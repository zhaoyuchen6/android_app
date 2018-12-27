export default {
    mounted() {
        if(window.bFlag === true && this.$vnode && (this.$vnode.isRootInsert === true || (this.$vnode.data && (this.$vnode.data.tag === "component" || this.$vnode.data.routerView === true)))){
            if(this.$options._componentTag === "transition" || this.$options._componentTag === "App"){ return; }
            if(this.constructor && this.constructor.extendOptions){
                window.tradePageInfo = {};
                window.tradePageInfo['pageNum'] = "";
                window.tradePageInfo['uid'] = this._uid;
                window.tradePageInfo['pageName'] = this.constructor.extendOptions.name;
                window.tradePageInfo['pageStartTime'] = new Date();
                window.tradePageInfo['pageEndTime'] = "";
                window.tradePageInfo['pageDuration'] = "";
                window.tradePageInfo['pageControlList'] = [];
                window.tradeInfo['tradePageList'].push(window.tradePageInfo);
            }
        }
    },
    destroyed(){
        if(window.bFlag === true && window.tradeInfo['tradePageList']){
          for (var i = window.tradeInfo['tradePageList'].length - 1; i >= 0; i--){
            if (this._uid === window.tradeInfo['tradePageList'][i]['uid']){
                var pageEndTime = new Date();
                var pageStartTime = window.tradeInfo['tradePageList'][i]['pageStartTime'];
                if (window.tradeInfo['tradePageList'][i]['pageEndTime'] === ""){
                    window.tradeInfo['tradePageList'][i]['pageDuration'] = (pageEndTime - pageStartTime) / 1000;
                    window.tradeInfo['tradePageList'][i]['pageStartTime'] = format(pageStartTime.getHours(), pageStartTime.getMinutes(), pageStartTime.getSeconds());
                    window.tradeInfo['tradePageList'][i]['pageEndTime'] = format(pageEndTime.getHours(), pageEndTime.getMinutes(), pageEndTime.getSeconds());
                    break;
              }
            }
          }
        }  
    }
}

//时间格式转换
function format(hours, minutes, seconds) {
    hours =  hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return hours + "" + minutes + "" + seconds;
}