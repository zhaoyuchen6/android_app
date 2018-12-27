<template>
    <div class="calculator-box"  @mousedown="down" @touchstart="down"
         @mousemove="move" @touchmove="move"
         @mouseup="end" @touchend="end" :class="{'show-table':showTable}">
      <!--结果显示区域-->
      <div class="result">
        <!--显示类型-->
        <div class="type" @click="showType">
          <i class="fa fa-bars"></i>&nbsp;&nbsp;&nbsp;{{type|typeName}}
          <span class="close" @click="close"><i class="fa fa-close"></i></span>
        </div>
        <!--侧边栏，选择计算器类型-->
        <ul class="type-bar" v-show="typeBar">
          <li v-for="(item,index) in typeList" @click="chooseType(item)" :class="{'active':type===index}">{{item.title}}</li>
        </ul>
      </div>
      <!--计算器内容-->
      <component :is="currentComponent" @isMounted="switchType"></component>
    </div>
</template>

<script>
    import {cal,Calc} from './js/cal'
    import ScienceCalc from './components/scienceCalc'
    import StandardCalc from './components/standardCalc'
    import FinancingCalc from './components/financingCalc'
    export default {
        name: "float-calculator",
        components:{
          StandardCalc,
          ScienceCalc,
          FinancingCalc
        },
       data(){
         return  {
           typeBar:false,  //类型选择下拉框
           type:0,      //当前类型
           typeList:[
             {index:0,title:"标准",component:"StandardCalc"},
             {index:1,title:"科学",component:"ScienceCalc"},
             {index:2,title:"理财",component:"FinancingCalc"},
           ],
           currentComponent:"StandardCalc",
           calc:null,
           switch:false,  //是否切换过类型
           flags: false,
           position: {  //触摸点坐标
             x: 0,
             y: 0
           },
           range:{  //移动范围
             minX:"",
             maxX:"",
             minY:"",
             maxY:""
           },
           nx: '',   //触摸点水平移动距离
           ny: '',   //触摸点垂直移动距离
           dx: '',   //元素初始水平坐标
           dy: '',    //元素初始垂直坐标
           xPum: '',  //元素新水平坐标
           yPum: '',  //元素新垂直坐标
         }
       },
       methods:{
         // 初始化
         initCalc(){
           this.typeBar=false;  //类型选择下拉框
           this.type=0;      //当前类型
           this.currentComponent="StandardCalc";
         },
         //显示类型选择列表
          showType(){
            this.typeBar=!this.typeBar;
          },
          //切换类型
          chooseType(parm){
            this.type=parm.index;
            this.typeBar=false;
            this.currentComponent=parm.component;
          },
          //初始化计算器函数
          render(){
            this.calc=new Calc({
              type:1
            });
            this.calc.initCache();
            this.calc.initListeners();
          },
          //切换计算器类型
          switchType(index){
            if(!this.switch){
              this.switch=true;
            }else{
              this.calc.switchType(index);
            }
          },
          // 实现移动端拖拽
          down(){
            this.flags = true;
            var touch ;
            let moveDiv=this.$el;
            if(event.touches){
              touch = event.touches[0];  //touches 屏幕上所有触摸点列表
            }else {
              touch = event;
            }
            this.position.x = touch.clientX;  //触摸点0 距页面左侧距离
            this.position.y = touch.clientY;  //触摸点0 距页面上侧距离
            this.dx = moveDiv.offsetLeft;  //元素中心点距页面左侧距离
            this.dy = moveDiv.offsetTop;  //元素中心点距页面上侧距离
            this.range.minX=moveDiv.offsetWidth/2;
            this.range.minY=moveDiv.offsetHeight/2;
            this.range.maxX=this.winWidth - moveDiv.offsetWidth/2;
            this.range.maxY=this.winHeight-moveDiv.offsetHeight/2;
          },
          move(){
            if(this.$store.state.touchTable){
              return
            }
            if(this.flags){
              var touch ;
              let moveDiv=this.$el;
              if(event.touches){
                touch = event.touches[0];
              }else {
                touch = event;
              }
              this.nx = touch.clientX - this.position.x;  //触摸点0  水平移动距离
              this.ny = touch.clientY - this.position.y;  //触摸点0  垂直移动距离
              this.xPum = this.dx+this.nx;  //元素水平 原位置+移动距离
              this.yPum = this.dy+this.ny;  //元素垂直  原位置+移动距离
              if(this.xPum<this.range.minX){
                moveDiv.style.left=this.range.minX+"px";
              }else if(this.xPum>this.range.maxX){
                moveDiv.style.left=this.range.maxX+"px";
              }else{
                moveDiv.style.left=this.xPum+"px";
              }
              if(this.yPum<this.range.minY){
                moveDiv.style.top=this.range.minY+"px";
              }else if(this.yPum>this.range.maxY){
                moveDiv.style.top=this.range.maxY+"px";
              }else{
                moveDiv.style.top=this.yPum+"px";
              }
              //阻止页面的滑动默认事件
              /*document.addEventListener("touchmove",function(){
                // 判断默认行为是否可以被禁用
                if (event.cancelable) {
                  // 判断默认行为是否已经被禁用
                  if (!event.defaultPrevented) {
                    event.preventDefault();
                  }
                }
              },false);*/
            }
          },
          //鼠标释放时候的函数
          end(){
            this.flags = false;
          },
          //初始化计算器位置
          initPosition(){
            let ele=this.$el;
            ele.style.top="50%";
            ele.style.left="50%";
          },
          //关闭计算器
          close(){
            this.initCalc();
            this.initPosition();
            this.$emit('close');
          }
        },
       computed:{
        showTable(){
          return this.$store.state.showTable;
        },
        winWidth(){
          return window.screen.width;
        },
        winHeight(){
          return window.screen.height;
        }
       },
       filters:{
          typeName(val){
            if(val===0){return "标准计算器"}
            if(val===1){return "科学计算器"}
            if(val===2){return "理财计算器"}
          }
       },
       mounted(){
         this.render();
       }
    }
</script>

<style scoped lang="less">
  @import "./styles/common";
  /*计算器容器*/
  .calculator-box {
    width: 460px;
    border: 1px solid #DDDDDD;
    background-color: #F2F2F2;
    box-shadow: 0px 0px 15px #4D4D4D;
    z-index: 990;
    position: fixed;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    box-sizing: border-box;

    .close{
      float:right;
      padding-right:20px;
    }
  }
  .show-table{
    width:920px;
    padding-right:460px;
  }
/*
title  30px
type 40px

*/
</style>
