<template>
  <!--科学计算器界面-->
   <div class="science-cal">
     <!--上一步的结果-->
     <div class="pre" id="sci-pre-step">
       &nbsp;
     </div>
     <!--第二个/运算结果-->
     <div class="second" id="sci-show-input">0</div>
     <!--上面的3行运算符-->
     <ul id="sci-top-symbol">
       <li value="21">(</li>
       <li value="22">)</li>
       <li value="23">
         <div class="set-img">
           <img src="../images/x_y_sqrt.png"/>
         </div>
       </li>
       <li value="24">n!</li>
       <li value="25">Exp</li>
       <li value="19">
         <div class="set-img">
           <img src="../images/x_2.png"/>
         </div>
       </li>
       <li value="26">
         <div class="set-img">
           <img src="../images/x_y.png"/>
         </div>
       </li>
       <li value="27">sin</li>
       <li value="28">cos</li>
       <li value="29">tan</li>
       <li value="30"><img src="../images/10_x.png" /></li>
       <li value="31">log</li>
       <li value="32">sinh</li>
       <li value="33">cosh</li>
       <li value="34">tanh</li>
     </ul>
     <!--数字和符号-->
     <ul id="sci-num-symbol">
       <li value="35">π</li>
       <li value="37">CE</li>
       <li value="38">C</li>
       <li value="39">Back</li>
       <li value="16">÷</li>
       <li value="18">√</li>
       <li value="7" class= "number">7</li>
       <li value="8" class= "number">8</li>
       <li value="9" class= "number">9</li>
       <li value="15">×</li>
       <li value="17">%</li>
       <li value="4" class= "number">4</li>
       <li value="5" class= "number">5</li>
       <li value="6" class= "number">6</li>
       <li value="14">-</li>
       <li value="20"><img src="../images/1_x.png"/></li>
       <li value="1" class= "number">1</li>
       <li value="2" class= "number">2</li>
       <li value="3" class= "number">3</li>
       <li value="13">+</li>
       <li value="36">↑</li>
       <li value="11">±</li>
       <li value="0" class= "number">0</li>
       <li value="10">.</li>
       <li value="12">=</li>
     </ul>
   </div>
</template>

<script>
  import {cal,Calc} from '../js/cal'
    export default {
        name: "science-calc",
        methods:{
        },
        mounted(){
          this.$emit('isMounted',2);
        }
    }
</script>

<style scoped lang="less">
  @import "../styles/common";
  /*科学型界面开始*/
  .science-main {
    display: none;
    width: 350px;
  }
  .sci-result {
    height: 120px;
    text-align: right;
  }
  #sci-top-symbol {
    border-top: 1px #A7A7A7 solid;
    height: 135px;
    width:100%;
  }
  #sci-top-symbol li, #sci-num-symbol li {
    line-height: 45px;
    width:20%;
    font-size:20px;
  }
  #sci-num-symbol {
    height: 225px;
    background-color: #E6E6E6;
  }
  .set-img{
    display: inline-block;
    height: 18px;
    width: 22px;
    img{
      width:100%;
      height:100%;
    }
  }
  /*科学型界面结束*/
</style>
