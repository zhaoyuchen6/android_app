<template>
  <div>
<!--     <aui-button @click="pushMessageFn()" style="    bottom: 38px;">xxx</aui-button>-->
    <transition name="slide" mode="out-in">
      <div class="ball-toast-box" v-show="isShow">
        <div class="ball-toast" >{{pushMessage}}</div>
      </div>
    </transition>
  </div>

</template>

<script>

export default {
  name: 'toast-ball',
  data () {
    return {
      isShow: false,
      timeOut : "",
      pushTime : "",
      toastNum : 0,
      pushMessage : '',
      mesg:'',
    }
  },
  created () {

  },
  mounted () {
    let _this = this;
    AgreeSDK.push.open({
 /*     url: "httpConfig.websocketIp",*/
      url: "ws://192.9.200.220:52005/ws/broadcast",
      oid: "padM3",
      data: {

      },
      onOpen() {

      },
      onMessage(message) {
        _this.mesg=JSON.parse(JSON.parse(message))
        AgreeSDK.ui.toast('收到消息：'+_this.mesg[0].msg);
        _this.pushTime = Date.parse(new Date());;
        _this.pushMessage = _this.mesg[0].msg;
        _this.setbadge(_this.mesg[1].msgType)
        AgreeSDK.notification.beep(1);
        /* AgreeSDK.notification.vibrate(1000);*/

        AgreeSDK.notification.createMessage({
          title: "收到消息",
          content: message,
          data: {
          }
        });

      },
      onClose() {
      },
      onError() {
      }
    });
  },
  watch : {
    pushTime : function (){
      this.addNew();
    }
  },
  methods: {
    pushMessageFn (){
      // this.addNew();

      this.$store.state.authorNum += 1;

      this.toastNum += 1;
      this.pushMessage = "toase消息" + this.toastNum;
    },

    setbadge(type){
      if(type==8){
        this.$store.state.authorNum += 1;
      }else if(type==1){
        this.$store.state.custvisitinfoNum+= 1;
      }else if(type==5){
        this.$store.state.callHelpNum+= 1;
      }
    },


    addNew(){
      let _this = this;
      clearTimeout(this.timeOut);
      _this.timeOut = '';
      _this.isShow = false;
      setTimeout(() => {
          _this.isShow = true;
        }, 800);
      _this.timeOut = setTimeout(() => {
        _this.isShow = false;
        _this.timeOut = '';
        console.log(_this.timeOut)
      }, 3000);

      // if(_this.timeOut != ''){//上一个toast还没消失
      //   clearTimeout(this.timeOut);
      //    _this.timeOut = '';
      //   _this.isShow = false;
      //   setTimeout(() => {
      //     _this.isShow = true;
      //   }, 1000);
      //   setTimeout(() => {
      //     _this.isShow = false;
      //     _this.timeOut = '';
      //   }, 3000);
      // }else{//上一个定时器已经消除
      //   _this.isShow = true;
      //   _this.timeOut = setTimeout(() => {
      //     _this.isShow = false;
      //     _this.timeOut = '';
      //     console.log(_this.timeOut)
      //   }, 3000);
      // }


    },
  },

}
</script>

<style lang="less" scoped>
  .ball-toast-box{
    width: 500px;
    height: 40px;
    background: rgba(248,167,22, 0.7);
    position: relative;
    border-radius: 10px;
    z-index: 9999999;
    left: 44px;
    // top: 7px;
    bottom : 0;
    // transition: all 3s ease-in;
    .ball-toast{
      width: 450px;
      margin: 0 auto;
      line-height: 40px;
      text-align: center;
      color: #ffffff;
      font-size: 18px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }

  }
  .slide-enter-active {
      transition: all .3s ease-in;
    }
    .slide-leave-active {
        // transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
        transition: all .8s ease-out;
    }
    .slide-enter,.slide-leave-active {
      // transform: translateX(-500px) scale(0.2);
      transform: translateX(-100px);
      opacity: 0;
    }
</style>

