<template>
  <div class="setting-num">
    <div class="cust_type">
      <p>对公客户</p>
      <p class="style_setparam" style="color:#5dd439;" @click="showadd()">＋参数设置</p>
    </div>
    <div class="cust_type">
      <p>对私客户</p>
      <p class="style_setparam">已设置参数5人<span class="color_style">修改</span></p>
    </div>
    <div class="cust_type">
      <p>普通客户</p>
      <p class="style_setparam">已设置参数10人<span class="color_style">修改</span></p>
    </div>
    <div class="btn_div">
      <aui-flexbox style="padding-left:25%;">
        <aui-flexbox-item :span="1/4"> <aui-button class="btn_del">删除分组</aui-button></aui-flexbox-item>
        <aui-flexbox-item :span="1/4"><aui-button class="btn_add">增加分组</aui-button></aui-flexbox-item>
      </aui-flexbox>
    </div>
    <!--弹框-->
    <aui-table class="dialog_xtable"  v-show="show">
      <thead>
        <tr class="xtable_thead_tr">
          <th Colspan="2" class="xtable_thead_th">对公客户参数配置</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td Colspan="2" class="xtable_tb_td">
            <input type="text" class="xtable_tb_input">
            <span style="padding-left:10px;">人</span>
          </td>
        </tr>
        <tr>
          <td>
            <aui-flexbox>
              <aui-flexbox-item><aui-button style="background:#fff;" @click.native="cancel">取消</aui-button></aui-flexbox-item>
              <aui-flexbox-item style="margin-left:0px;"><aui-button style="background:#fff;">确定</aui-button></aui-flexbox-item>
            </aui-flexbox>
          </td>
        </tr>
      </tbody>
    </aui-table>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'setting-num',
    data(){
        return{
          show:false, /*是否显示弹框*/
      }
    },
    methods:{
      showadd(){
          let vm=this;
          vm.show=true;
      },
      cancel(){
        this.show = false;
      },
    }
  }
</script>
<style scoped>
  .cust_type{
    border-bottom:1px solid #B89E6C;
    padding:40px 0px 10px 40px;
  }
  .color_style{
    color:#5dd439;
    padding-left:5%;
  }
  .style_setparam{
    padding:20px 0px 0px 25px;
  }
  .btn_div{
    position: absolute;
    bottom: 70px;
    width:70%;
  }
  .btn_div .btn_del{
    background:#EDEDED;
    font-size:16px;
    width:60%;
  }
  .btn_div .btn_add{
    background:#B89E6C;
    color:#fff;
    font-size:16px;
    width:60%;
  }
/*弹框表格样式*/
  .dialog_xtable{
    border:1px solid #E2E2E2;
    background:#fff;
    font-size:16px;
    width: 350px;
    position: absolute;
    top: 220px;
    right: 230px;
    box-shadow: 5px 5px 5px #d0cece;
  }
  .xtable_thead_th{
    text-align:left;
    padding-left:20px;
  }
  .xtable_thead_tr{
    background:#ededed;
    height:50px;
  }
  .xtable_tb_td{
    text-align:center;
    padding-top:15px;
    padding-bottom:15px;
  }
  .xtable_tb_input{
    text-align:center;
    height:30px;
    width:18%;
    background:#F5F4F1;
    border:1px solid #C6C4C6;
  }
</style>
