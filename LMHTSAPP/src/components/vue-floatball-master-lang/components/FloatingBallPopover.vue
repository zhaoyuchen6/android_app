<template>
  <div class="floating-ball-popover">
      <div class="floating-ball-popover-item" v-for="(item,index) in popoverEvents" :key="'table'+index">
        <div class="floating-ball-popover-item-icon" @click="itemClick(index)">
          <img :src="item.iconSrc" :style="`width:${iconWidth};`">
          <span class="ball-badge" v-if="$store.state[item.badge] != 0 && showBadge===true">{{$store.state[item.badge]}}</span>
        </div>
      </div>
  </div>
</template>

<script>
import Emitter from '../libs/emitter'

export default {
  name: 'FloatingBallPopover',
  mixins: [ Emitter ],
  data() {
    return {

    }
  },
  props: {
    //弹出的悬浮小球集合
    popoverEvents: {
      type: Array,
      validator (val) {
        return val instanceof Array
      }
    },
    //icon宽度
    iconWidth:{
      type:String,
      default:"60%"
    },
    //是否显示徽章
    showBadge:{
      type:Boolean,
      default:true
    }
  },
  mounted () {
    // console.log(this.popoverEvents);
    // console.log(this.$store.state[this.popoverEvents[0]]);
    // debugger;
  },
  computed: {
    /*ball num*/
    ballClickNum: {
      get() {
        return this.$store.state.ballClickNum;
      },
      set(val) {
        this.$store.commit("setBallNum", val);
      },
    },
  },
  methods : {
    itemClick(index){
      this.ballClickNum = index;
      this.$emit('clickItem',index);
    },
  },
}
</script>

<style lang="less" scoped>
// @import "../style/ionicons";
.floating-ball-popover-trans{
  .floating-ball-popover-item{
  }
   .floating-ball-popover-item:nth-child(1){
    transform: rotateZ(0deg);
  }
  .floating-ball-popover-item:nth-child(2){
    transform: rotateZ(-30deg);
  }
  .floating-ball-popover-item:nth-child(3){
    transform: rotateZ(-60deg);
  }
  .floating-ball-popover-item:nth-child(4){
    transform: rotateZ(-90deg);
  }
  // .floating-ball-popover-item:nth-child(5){
  //   transform: rotateZ(-90deg);
  // }
}
// .ball-badge{
//   right: 5px;
//     top: 5px;
//     position: absolute;
// }
.floating-ball-popover {
  position: absolute;
  border-radius: 25.6px;
  margin-bottom: 25.6px;
  // transition: width 2s, height 2s;
   .floating-ball-popover-item:nth-child(1){
    .floating-ball-popover-item-icon{
      background-color: #ca71ee;
    }
  }
  .floating-ball-popover-item:nth-child(2){
    .floating-ball-popover-item-icon{
      background-color: #fb80a2;
    }
  }
  .floating-ball-popover-item:nth-child(3){
     .floating-ball-popover-item-icon{
      background-color: #8597f2;
    }
  }
  .floating-ball-popover-item:nth-child(4){
    .floating-ball-popover-item-icon{
      background-color: #81daae;
    }
  }
  .floating-ball-popover-item:nth-child(5){
    .floating-ball-popover-item-icon{
      background-color: red;
    }
  }
  &-item {
    position: absolute;
    bottom: 0px;
    right: 0px;
    color: #fff;
    cursor: pointer;
    opacity:1;
    // width: 48.64px;
    // height:166.4px;
    width: 30%;
    height: 87%;
    vertical-align: top;
    text-align: center;
    // transform-origin: 25.6px 12.8px;
    transition: all .3s ease;
    transform-origin:center bottom;
    .floating-ball-popover-item-icon {
      // border: 1px #fff solid;
      border-radius: 50%;
      box-sizing: border-box;
      // width: 48.64px;
      // height: 48.64px;
      width: 90%;
      height: 27%;
      line-height: 48.64px;
      font-size: 25.6px;
      /*display: flex;*/
      opacity:1;
      align-items: center;
      vertical-align: middle;
      img{
        width: 60%;
        vertical-align: middle;
      }
    }

    &-word {
      height: 12.8px;
      font-size: 12.8px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .ball-badge{
    display: inline-block;
    text-align: center;
    background: #f74c31;
    color: #fff;
    font-size: 12px;
    height: 10px;
    line-height: 10px;
    border-radius: 0.625vw;
    padding: 0 0.469vw;
    background-clip: padding-box;
    vertical-align: middle;
    height: auto;
    padding: 0.391vw;
    position: absolute;
    top:5px;
    right: 5px;
  }
}
</style>

