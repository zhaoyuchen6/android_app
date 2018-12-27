<template>
  <div class="main">
    <div class="win">
      <div class="header">
        <img class="agree-icon" src="static/image/login/agree_white.png">
        <span class="header-content">请选择用户角色</span>
      </div>

      <div class="body">
        <aui-flexbox :gutter="0">
          <aui-flexbox-item>
            <!-- 大堂经理 -->
            <div class="content" @click="toLogin()">
                <div class="jumplink">
                  <div class="set-img">
                    <img src="static/image/login/大堂经理.svg" alt="">
                  </div>
                  <p >大堂经理</p>
                </div>
            </div>
          </aui-flexbox-item>
          <aui-flexbox-item>
            <!-- 普通用户 -->
            <div class="content" @click="toShopShow()">
                <div class="jumplink">
                  <div class="set-img">
                  <img src="static/image/login/普通用户.svg" alt="">
                  </div>
                  <p>普通用户</p>
                </div>
            </div>
          </aui-flexbox-item>
        </aui-flexbox>
      </div>
    </div>
  </div>
</template>

<script>
  import { RootActivityManager } from "ab-manager-activity";
  import TradeActivityManager from "@/common/activity-manager/trade-activity-manager"; // 相对路径
  import BasicActivity from "@/mixins/basic-activity";
  import EventNames from "@/common/activity-manager/activity-event-names";
  export default {
    name:"select-role",
    mixins: [BasicActivity],
//    components: { ValidatorTemplate },
    data () {
      return {};
    },
    computed: {
      loginRole: {
        get() {
          return this.$store.state.loginRole;
        },
        set(val) {
          this.$store.commit("setLoginRole", val);
        },

      },
    },

    methods:{
        // this.$store.commit('setManager',flag);
        // sessionStorage.setItem('xToken',"Notoken");
        toShopShow(){
          this.loginRole='visitor';
          sessionStorage.setItem('xToken',"Notoken");
          this.$activityManager.requestUpdateView(EventNames.INDEXPAGE); //去游客的菜单页
        },
        toLogin(){
          this.$activityManager.requestUpdateView(EventNames.LOGIN);
        }
    }
  }
</script>

<style scoped lang="less">
  a {
    text-decoration: none;
  }
  .main {
    width: 100%;
    height: 100%;
    background: url("../../static/image/loginBgHF.png");
    background-size:100% 100%;
  }

  .win {
    width: 40%;
    height: 45%;
    background-color: rgba(255,255,255,0.3);
    position: relative;
    left: 30%;
    top: 25.5%;
    border-radius: 13.3PX;
  }

  .header {
    /* background-color: rgb(255,158,108); */
    height: 40px;
    line-height: 40px;
    width: 100%;
    border-radius: 1px;
    text-align: center;
    img {
      margin-top: 7%;
      vertical-align: bottom;
    }
    span {
      vertical-align: middle;
      letter-spacing: 4px;
      font-size: 30px;
    }
  }

  .header-content {
    font-size: 30px;
    color: rgb(255,255,255);
    margin-top: 10%;
    margin-left: 5%;
  }

  .content {
    width: 316px;
    height: 436px;
  }

  .jumplink {
    background-color: rgb(76,166,206);
    width: 50%;
    height: 36%;
    text-align: center;
    margin-top: 25%;
    margin-left: 15%;
    p {
    color: rgb(255,255,255);
    font-size: 20px;
    line-height: 40px;
    position: relative;
    margin-top: -5%;
    // top: 0.5rem;
    }
  }
  // .jumplink > span {
  //   color: rgb(255,255,255);
  //   font-size: 1.5rem;
  //   line-height: 3rem;
  //   position: relative;
  //   top: 3.5rem;
  // }
  .set-img {
    display: inline-block;
    width: 70px;
    height: 80px;
    margin-top: 15%;
    margin-left: 0%;
    img {
      width:100%;
      height: 100%;
    }

  }
  /* @media screen and (max-width: 860px) {
    .header{
      line-height: 2rem;
    }
    .jumplink > span {
      color: rgb(255,255,255);
      font-size: 1.5rem;
      line-height: 3rem;
      position: relative;
      top: 1rem;
    }
    .agree-icon {
      margin-top: 50%;
      margin-left: 15%;
    }
     */
  // }
</style>
