<template>
  <div class="index-page">
    <!--头部-->
    <div class="content-top">
      <div class="set-logo" v-finger:long-tap="longTap">
        <img src="static/image/logo.png" alt="">
      </div>
      <div class="top-right">
        <panel-box :title="$t('indexPage.information')">
          <div slot="body" class="info">
            <aui-swiper :show-dots="true" :aspect-ratio="110/286" dots-position="center" dots-class="set-dot">
              <aui-swiper-item v-for="(item,index) in $t('indexPage.infoList')" :key="index">
                <div class="info-item">{{item}}</div>
              </aui-swiper-item>
            </aui-swiper>
          </div>
        </panel-box>
        <panel-box :title="$t('indexPage.city')" class="weather-box">
          <div slot="body" class="weather">
            <div class="time">
              <p class="top-line">09:25</p>
              <!-- <p class="bottom-line">上午</p> -->
              <p class="bottom-line">{{$t("indexPage.time")}}</p>
            </div>
            <div class="weather-icon">
              <img src="static/image/sun.png" alt="">
            </div>
            <div class="temperature">
              <p class="top-line">25 ℃</p>
              <p class="bottom-line">{{$t("indexPage.weather")}}</p>
            </div>
          </div>
        </panel-box>
      </div>
    </div>
    <!--菜单部分-->
    <select-card class="content-middle" @clickBankCardImg="clickBankCardImg" :bankCardTypeList="$t('indexPage.menuCardList')" @toJump="toJump"></select-card>
    <!--弹窗-->
    <div aui-transfer-dom>
      <aui-confirm v-model="outPutConfirmFlag" title="确认退出？" confirm-text="确定" cancel-text="取消" @confirm="outPut">
      </aui-confirm>
    </div>
    <!--悬浮球-->
    <floating-ball-lang theme-color="transparent" :init-position="initPosition"
                   :popover-events="popoverEvents" :custom="true" iconWidth="100%" @clickItem="changeLang" :showBadge="false">
      <div slot="currentBall" class="country-icon">
        <img :src="currentLangImg">
      </div>
    </floating-ball-lang>
  </div>
</template>

<script>
    import {RootActivityManager} from "ab-manager-activity";   //路由跳转相关
    import TradeActivityManager from "@/common/activity-manager/trade-activity-manager";  //路由跳转相关
    import EventNames from "@/common/activity-manager/activity-event-names"; //路由事件名称
    import SelectCard from '@/components/select-card/selectCard'  //引入选择菜单组件
    import panelBox from '@/components/panel-box/panelBox'  //引入选择菜单组件

    export default {
      name: "index-page",
      components:{ SelectCard,panelBox},
      data(){
        return {
          // menuCardList : "indexPage.menuCardList",//i18n//菜单卡片设置
          outPutConfirmFlag: false,  //显示退出弹窗
          initPosition: "left bottom",  //悬浮球初始位置
          currentLang:this.$store.state.currentLang,  //当前语言
          //语言列表
          popoverEvents: [
            {
              iconSrc: "static/image/country/China.png",
              chName:'汉语'
            },
            {
              iconSrc: "static/image/country/Britain.png",
              chName:'英语'
            },
            {
              iconSrc: "static/image/country/Japan.png",
              chName:'日语'
            },
            {
              iconSrc: "static/image/country/Korea.png",
              chName:'韩语'
            },
          ]
        }
      },
      computed:{
        currentLangImg(){
          let index=this.currentLang;
          this.$store.commit('update_currentLang', index);  //将当前选择的语言保存到store全局变量中
          return this.popoverEvents[index].iconSrc;
        }
      },
      methods: {
        /*选择菜单项*/
        clickBankCardImg(index){
          for (let i = 0; i < this.$t('indexPage.menuCardList').length; i++) {
            this.$t('indexPage.menuCardList')[i].ifClick = false;
          }
          this.$t('indexPage.menuCardList')[index].ifClick = true;
        },
      // 跳页面
        toJump(target){
         this.$activityManager.requestUpdateView(EventNames[target]);
        },
      // 长按logo 弹出窗口
        longTap(){
          this.outPutConfirmFlag=true;  //弹出确认退出窗口
        },
      //退出
        outPut(){
          this.showgoOut = false;
          this.$store.commit('setLoginRole', '');
          this.$activityManager.requestUpdateView(EventNames.SELECTROLE);
          sessionStorage.setItem('xToken', '');
          sessionStorage.setItem('loginObj', '');  // 登录角色ID
          this.outPutConfirmFlag = false;
        },
      //切换语言
        changeLang(index){
          this.currentLang=index;
           if(index == 0){
             this.$i18n.set('zh-CN');
           }else if(index == 1){
             this.$i18n.set('en');
           }else if(index == 2){
             this.$i18n.set('zh-jp');
           }else if(index == 3){
             this.$i18n.set('zh-ko');
           }else if(index == 4){
             this.$i18n.set('zh-CN');
           }

        }
      }
    }
</script>

<style scoped lang="less">
  .index-page{
    width:100%;
    height:100%;
    background-image: url("../../static/image/background.png");
    background-size: 100% 100%;
    overflow: hidden;
    position: relative;
  }
  .content-top{
    height:200px;
    position: relative;
    /*logo样式*/
    .set-logo{
      width:220px;
      height:48px;
      padding:36px;
      img{
        width:100%;
        height:100%;
      }
    }
    /*右上角标签*/
    .top-right{
     position: absolute;
     top:40px;
     right:40px;
     display: flex;
    }
    .weather-box{
      margin-left:20px;
    }
    .info{
      background: linear-gradient(to top,#5F97A7,#8DB1C1);
      width:100%;
      height:100%;
      .info-item{
        color:rgba(255,255,255,0.8);
        padding:10px;
        text-indent:20px;
      }
      /deep/.set-dot{
        .aui-icon-dot.active{
          background-color:#fff;
        }
      }
    }
    .weather{
      /*background:liner#647C86;*/
      background:linear-gradient(to top,#647C86,#94A3AA);
      width:100%;
      height:100%;
      display: flex;
      align-items: center;
      text-align: center;
      color:rgba(255,255,255,0.8);
      .time,.temperature{
        width:calc(~"50% - "50px);
      }
      .weather-icon{
        width:100px;
        height:100px;
        img{
          width:100%;
          height:100%;
        }
      }
      .top-line{
        font-size: 22px;
      }
      .bottom-line{
        font-size: 16px;
      }
    }
  }
  .country-icon{
    width:50px;
    height:50px;
    img{
      width:100%;
      height:100%;
    }
  }
</style>
