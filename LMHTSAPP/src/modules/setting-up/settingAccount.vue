<template>
  <div class="setting-account" v-show="false">
    <img src="../../../static/image/touxiang.png" style="width:214px;height:132;">
    <p style="padding-top:26px;">王涛</p>
    <p class="account_num">账号：tao.wang123456</p>
    <aui-button class="btn_exit">退出登录</aui-button>
    <p class="account_bottom"><span style="padding-right: 25px;">版本信息：V.2.0</span> <button style="float:right;" class="btn_update">检查更新</button></p>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
      name: 'setting-account'
  }
</script>
<style scoped>
  .setting-account{
    width:100%;
    text-align:center;
    padding-top:15%;
    font-size:22px;
  }
  .setting-account .btn_exit{
    width:14%;
    background:#B89E6C;
    color:#fff;
    font-size:16px;
  }
  .setting-account .btn_update{
    height:30px;
    line-height:30px;
    width:83px;
    border-radius:2px;
    background:#B89E6C;
    color:#fff;
    font-size:16px;
  }
  .setting-account .account_num{
    padding-top:20px;
    padding-bottom:49px;
    font-family:Airal;
  }
  .setting-account .account_bottom{
    font-size: 16px;
    position: absolute;
    bottom: 22px;
    right: 71px;
    line-height: 40px;
  }
  </style>
