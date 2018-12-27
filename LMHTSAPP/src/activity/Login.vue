<template>
  <div class="loading_background">
    <div class="win">
      <form action="index" method="post">
        <div class="set-icon">
          <img src="static/image/login/切换.svg"  @click="toSelectRole()">
        </div>
      <img src="static/image/login/agree_tech.png" alt="">

        <div id='loading_content' class="loading_content">
          <!-- <div style="display:block;positon:relative;padding-top:2rem;"> -->
            <!-- <div style="height: 23rem;width: 31rem;margin: 0 auto;margin-top: 1rem"> -->
             <div class="name-box">
              <img src="static/image/login/用户名(1).svg" alt="">
              <input v-model="UserCode" class="input_account" type="text" placeholder="请输入账户">
             </div>
             <div class="password-box">
              <img src="static/image/login/密码.svg" alt="">
              <input v-model="UserPassword" class="input_password" type="password" placeholder="密码/手机验证登陆">
             </div>
             <div class="loginbtn">
              <button type="button" @click="loginFn(UserCode, UserPassword)">登录</button>
             </div>
              <!--<button id="loginBtn1" type="button" @click="forAfa(username, password)">AFA测试</button>-->
              <p class="load_text" v-show="loginParam">正在登录中......</p>
              <p class="load_text" v-show="verifyAccount">账号或密码错误</p>
              <p class="load_text" v-show="verifyPasswd">用户名和密码不能为空</p>
            <!-- </div> -->
          <!-- </div> -->
        </div>

      </form>
    </div>
  </div>
</template>

<script>
// import ValidatorTemplate from "@/components/ValidatorTemplate";
import TradeActivityManager from "@/common/activity-manager/trade-activity-manager"; // 相对路径
import BasicActivity from "@/mixins/basic-activity";
import EventNames from "@/common/activity-manager/activity-event-names";
// import ajax from '@/common/js/baseAjax'
  import loginJs from '../common/api/login.js';
//  import SelectRole from "@/components/SelectRole";  //角色选择
export default {
  name:"login",
  mixins: [BasicActivity],
  // components: { ValidatorTemplate, ajax },
    components: {
    },
  data() {
    return {
      loginParam: false,
      verifyAccount: false,
      verifyPasswd: false,
      UserCode: '0000',
      UserPassword: '64731133'
    }
  },
  methods: {
        loginSucess(){
          this.$store.commit('setLoginRole','manager');
          this.$store.commit('setManager',true);
        },
        loginFn() {
          let _this = this;
          _this.verifyAccount = false;
          let submitdata = {};
          submitdata.UserCode = _this.UserCode;
          submitdata.UserPassword = _this.UserPassword;
          submitdata.host = "pad";

          if (_this.UserCode == '' || _this.UserPassword == '') {
              _this.verifyPasswd = true;
          }else{
            _this.loginParam = true;

            loginJs.Login(submitdata, _this, (rsp) => {

            if (rsp.TradeResult == "true") {

              _this.loginParam = false;
              let result = rsp;
              // console.log(result);
              let loginObj ={};//用户登录信息
                loginObj.DeptName = result.DeptName.trim();  // 用户所属网点名称
                loginObj.MailBox = result.MailBox.trim();   // 用户邮箱
                loginObj.RoleId = result.RoleId.trim();       // 角色编号
                loginObj.RoleName = result.RoleName.trim();     // 角色名称
                loginObj.Sex = result.Sex.trim();  // 用户性别
                loginObj.TelePhone = result.TelePhone.trim();  // 用户联系方式
                loginObj.UnitID = result.UnitID.trim();  // 登录机构编码
                loginObj.UnitName = result.UnitName.trim(); //登录机构名称
                loginObj.userName = result.UserName.trim(); //用户名称
                loginObj.userCode = result.UserCode.trim(); //用户编号
                loginObj.userPassword = result.UserPassword.trim(); //登录密码
                sessionStorage.setItem('xToken', result.XToken.trim());
                sessionStorage.setItem('loginObj',JSON.stringify(loginObj));  
                 _this.loginSucess();
                 _this.$activityManager.requestUpdateView(EventNames.HOME);
                _this.$store.state.floatBallIsShow = true;
          } else {
            _this.loginParam = false;
            _this.verifyAccount = true;
            _this.verifyPasswd = false;
          }
        }, (err) => {
          console.log(err);
        });
        }
      },
        toSelectRole(){
          this.$activityManager.requestUpdateView(EventNames.SELECTROLE);
        }
  },
  // activated () {
  //   //设置右上角倒计时的字体颜色
  //   this.$parent.fontColor = 'color: #999999; top: 0rem;';
  // },

}
</script>

<style scoped lang="less">

  .loading_background {
    position: fixed;
    width: 100%;
    height: 100%;
    background: url("../../static/image/loginBgHF.png");
    background-size:100% 100%;
  }
  .load_text {
    text-align: center;
    margin-top: 16px;
    font-size: 12.8px;
    color: #ff5c5c;
  }

  // .loading_content {
  //   /*width: 408px;*/
  //   /*height: 320px;*/
  //   margin: 0 auto;
  //   margin-top: 12%;
  //   border-radius: 4px;
  //   text-align: center;
  // }

  // .loading_content img {
  //   display: inline;
  //   margin-top: 1.2rem;
  // }

  // .loading_content input {
  //   width: 23rem;
  //   height: 3rem;
  //   border: 1px solid #e6e6e6;
  //   border-radius: 2px;
  //   font-family: "PingFangSC-Regular";
  //   font-size: 1rem;
  //   // color: #C8C8CC;
  //   line-height: 1rem;
  //   padding-left: 2.9rem;
  //   box-sizing: border-box;
  //   outline: none;
  // }
    .loading_content {
      height: 69%;
      button{
      border-style: none;
      width: 332px;
      height: 42px;
      background: #3CBFEF;
      font-size: 22px;
      line-height: 38px;
      color: #fff;
      margin-top: 25px;
      margin-left: 100px;
      outline: none;
      cursor: pointer;
      border-radius: 10px;
      }
    }


    .win {
    width: 40%;
    height: 45%;
    background-color: rgba(255,255,255,0.3);
    position: relative;
    left: 30%;
    top: 25.5%;
    border-radius: 13.3PX;
    form{
      height: 100%;
      width: 100%;
    .set-icon{
      margin-left: 8%;
      margin-top: 8%;
      display:inline-block;
      width:40px;
      height:40px;
      img{
        width:100%;
        height:100%;
      }
    }
    &>img{
      margin-left: 15%;
      margin-top: 5%;
      width: 35%;
      height: 20%;
      vertical-align: top;
    }
    }

  }
  .name-box{
    position: relative;
    width:60%;
    height:20%;
    margin:0 auto;
    margin-top: 3%;
    margin-bottom: 3%;
       input {
        border-radius: 10px;
        border:1px solid #FFFFFF;

        padding: 5px 10px 5px 40px;
        width: 280px;
        height: 30px;
        font: 14px normal Arial;
        color: #fff;
        background: none;
        }
    img{
      position: absolute;
      top:50%;
      transform: translateY(-50%);
      left:10px;
      width:30px;
      height:30px;
    }
  }
  .password-box{
    position: relative;
    width:60%;
    height:20%;
    margin:0 auto;
    input {
      border-radius: 10px;
      border:1px solid #FFFFFF;
      padding: 5px 10px 5px 40px;
      width: 280px;
      height: 30px;
      color: #fff;
      font:14px normal Arial;
      background: none;
        }
    img{
      position: absolute;
      top:50%;
      transform: translateY(-50%);
      left:10px;
      width:30px;
      height:30px;
    }
  }
</style>
