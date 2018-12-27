<template>
  <!--标准计算器界面-->
  <div class="standard-cal">
    <!--上一步的结果-->
    <div class="pre" id="std-pre-step">
      &nbsp;
    </div>
    <!--第二个/运算结果-->
    <div class="second" id="std-show-input">0</div>
    <ul id="std-top-symbol">
      <li value="17">%</li>
      <li value="18">√</li>
      <li value="19"><img src="../images/x_2.png" style="height: 18px;"/></li>
      <li value="20"><img src="../images/1_x.png"/></li>
    </ul>
    <!--数字和符号-->
    <ul id="std-num-symbol">
      <li value="37">CE</li>
      <li value="38">C</li>
      <li value="39">Back</li>
      <li value="16">÷</li>
      <li class= "number" value="7">7</li>
      <li class= "number" value="8">8</li>
      <li class= "number" value="9">9</li>
      <li value="15">×</li>
      <li class= "number" value="4">4</li>
      <li class= "number" value="5">5</li>
      <li class= "number" value="6">6</li>
      <li value="14">-</li>
      <li class= "number" value="1">1</li>
      <li class= "number" value="2">2</li>
      <li class= "number" value="3">3</li>
      <li value="13">+</li>
      <li value="11">±</li>
      <li class= "number" value="0">0</li>
      <li value="10">.</li>
      <li value="12">=</li>
    </ul>
  </div>
</template>

<script>
  import {cal,Calc} from '../js/cal'
    export default {
        name: "standard-calc",
        data(){
          return {
            calc:null
          }
        },
        methods:{
        },
        mounted(){
          this.$emit('isMounted',1);
        }
    }
</script>

<style scoped lang="less">
  @import "../styles/common";
  /*计算器标准版界面开始*/
  .standard-main {
    width: 350px;
    height: 480px;
  }
  #std-top-symbol {
    border-top: 1px #A7A7A7 solid;
    height: 52px;
  }
  #std-num-symbol {
    background-color: #E6E6E6;
    height: 270px;
    font-size: 20px;
    width:100%;
  }
  #std-top-symbol li, #std-num-symbol li {
    line-height: 52px;
    width: 25%;
  }
  /*标准界面结束*/

</style>
