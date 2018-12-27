<template>
  <!--程序员计算器界面-->
  <div class="programmer-calc">
    <!--上一步的结果-->
    <div class="pre" id="pro-pre-step">
      &nbsp;
    </div>
    <!--第二个/运算结果-->
    <div class="second" id="pro-show-input">0</div>
    <!--显示16、10、8、2进制的值-->
    <div id="pro-scales">
      <div scale="16">HEX&nbsp;&nbsp;&nbsp;<span>0</span></div>
      <div scale="10" class="scale-active">DEC&nbsp;&nbsp;&nbsp;<span>0</span></div>
      <div scale="8">OCT&nbsp;&nbsp;&nbsp;<span>0</span></div>
      <div scale="2">BIN&nbsp;&nbsp;&nbsp;&nbsp;<span>0</span></div>
    </div>
    <!--上面的一行十六进制数字，因为默认是10进制，所以这些按钮默认禁用-->
    <ul id="pro-top-symbol">
      <li class="disable-btn" value="40">A</li>
      <li class="disable-btn" value="41">B</li>
      <li class="disable-btn" value="42">C</li>
      <li class="disable-btn" value="43">D</li>
      <li class="disable-btn" value="44">E</li>
      <li class="disable-btn" value="45">F</li>
    </ul>
    <!--数字和符号-->
    <ul id="pro-num-symbol">
      <li value="36">↑</li>
      <li value="37">CE</li>
      <li value="38">C</li>
      <li value="39">Back</li>
      <li value="16">÷</li>
      <li value="46">And</li>
      <li value="7" class= "number" bin-disable="1">7</li>
      <li value="8" class= "number" oct-disable="1" bin-disable="1">8</li>
      <li value="9" class= "number" oct-disable="1" bin-disable="1">9</li>
      <li value="15">×</li>
      <li value="47">Or</li>
      <li value="4" class= "number" bin-disable="1">4</li>
      <li value="5" class= "number" bin-disable="1">5</li>
      <li value="6" class= "number" bin-disable="1">6</li>
      <li value="14">-</li>
      <li value="48">Not</li>
      <li value="1" class= "number">1</li>
      <li value="2" class= "number" bin-disable="1">2</li>
      <li value="3" class= "number" bin-disable="1">3</li>
      <li value="13">+</li>
      <li value="21">(</li>
      <li value="22">)</li>
      <li value="0" class= "number">0</li>
      <li value="10" class="disable-btn" id="pro-point">.</li>
      <li value="12">=</li>
    </ul>
  </div>
</template>

<script>
  import {cal} from '../js/cal'
    export default {
        name: "programmer-calc",
        mounted(){
         this.$emit('isMounted',3);
        }
    }
</script>

<style scoped lang="less">
  @import "../styles/common";
  /*程序员型界面开始*/
  .programmer-main {
    display: none;
    width: 350px;
  }
  .pro-result {
    height: 220px;
    text-align: right;
  }
  #pro-top-symbol {
    border-top: 1px #A7A7A7 solid;
    height: 45px;
    width:100%;
  }
  #pro-top-symbol li {
    line-height: 45px;
    width:16.66%;
  }
  #pro-num-symbol li {
    line-height: 45px;
    width:20%;
  }
  #pro-num-symbol {
    height: 235px;
    background-color: #E6E6E6;
  }
  /*四个进制*/
  #pro-scales {
    margin-left: 20px;
  }
  #pro-scales div {
    text-align: left;
    margin-top: 5px;
    cursor: pointer;
  }
  /*当前使用的进制*/
  .scale-active {
    color: cornflowerblue;
  }
  /*按键不可用*/
  .disable-btn {
    color: #CACACA;
  }
  /*程序员型界面结束*/

</style>
