<template>
  <div class="setting-update-pwd" style="padding-top:14%;" v-show="false">
    <aui-flexbox class="flexbox_style">
      <aui-flexbox-item :span="1/3"  style="text-align: right;">当前密码：</aui-flexbox-item>
      <aui-flexbox-item :span="2/3"><input type="password" class="text_input"></aui-flexbox-item>
    </aui-flexbox>
    <aui-flexbox class="flexbox_style" >
      <aui-flexbox-item :span="1/3" style="text-align: right;">新密码：</aui-flexbox-item>
      <aui-flexbox-item :span="2/3"><input type="password" class="text_input"></aui-flexbox-item>
    </aui-flexbox>
    <aui-flexbox class="flexbox_style">
      <aui-flexbox-item :span="1/3"  style="text-align: right;">确认新密码：</aui-flexbox-item>
      <aui-flexbox-item :span="2/3"><input type="password" class="text_input"></aui-flexbox-item>
    </aui-flexbox>
    <aui-flexbox style="padding-top:20px;">
      <aui-flexbox-item :span="1/3"></aui-flexbox-item>
      <aui-flexbox-item :span="2/3"><aui-button class="btn_style">保 存</aui-button></aui-flexbox-item>
    </aui-flexbox>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name:'setting-update-pwd'
  }
</script>
<style scoped>
  .flexbox_style{
    padding-top:27px;
  }
  .text_input{
    width:60%;
    height: 41px;
    border: 1px solid #DBDADB;
    border-radius: 10px;
    background: #f5f4f1;
    padding-left:10px;
    font-size:16px;
  }
  .btn_style{
    width:14%;
    float:left;
    background:#B89E6C;
    color:#fff;
    font-size:16px;
  }
</style>
