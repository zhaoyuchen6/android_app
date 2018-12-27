<template>
  <!-- <div
    class="floating-ball-box"
    @mousedown.prevent="mouseDown"
    @mouseup.prevent="mouseUp"
    @mouseenter.prevent="mouseEnter"
    @mouseleave.prevent="mouseLeave"
    @touchstart.prevent="touchStart"
    @touchmove.prevent="touchMove"
    @touchend.prevent="touchEnd"
    > -->
    <div class="floating-ball-box"

    @mousedown.prevent="mouseDown"
    @mouseup.prevent="mouseUp"
    @mouseenter.prevent="mouseEnter"
    @mouseleave.prevent="mouseLeave"
    @touchmove.prevent="touchMove"
    @touchend.prevent="touchEnd"

       v-finger:tap="tap"

  >
   	<!--
    v-finger:touch-cancel="touchCancel"

    v-finger:long-tap="longTap"
    v-finger:press-move="pressMove.bind(this, 12)" -->

  <!-- @touchstart.prevent="touchStart"
    @touchmove.prevent="touchMove"
    @touchend.prevent="touchEnd" -->
    <div v-if="!custom" class="set-ball">
      <div class="floating-ball-out"></div>
      <div class="floating-ball-in"></div>
      <div class="floating-ball-center"></div>
      <div class="ball-badge" style="background: #f74c31;" v-if="this.$store.state.callHelpNum+this.$store.state.personWarnNum+this.$store.state.timeWarnNum+this.$store.state.custvisitinfoNum+this.$store.state.authorNum!= 0">
        {{this.$store.state.callHelpNum+this.$store.state.personWarnNum+this.$store.state.timeWarnNum+this.$store.state.custvisitinfoNum+this.$store.state.authorNum}}
      </div>
    </div>
    <slot name="currentBall"></slot>
  </div>
</template>

<script>

export default {
  name: 'FloatingBallLang',
  props:{
    tltalBadgeNum : {
      type : Number
    },
    custom:{  //是否自定义悬浮球
      type:Boolean,
      default:false
    }
  },
  methods: {
    tap: function(e) {
      this.$emit('tap',e)
    },
    // longTap: function(e) {
    //   console.log('onLongTap');
    //   // this.$emit('longTap', e.changedTouches[0])
    //   this.$emit('touchmove', e.changedTouches[0])
    // },
    // pressMove: function(num, evt) {
    //     // console.log(evt.deltaX);
    //     // console.log(evt.deltaY);
    //     // console.log('onPressMove with params:' + num);
    //     this.$emit('pressMove',evt)
    // },
    // touchCancel: function() {
    //   this.$emit('touchCancel')
    //   console.log('onTouchCancel');
    // },


    mouseDown (event) {
      this.$emit('mousedown', event);
    },
    mouseUp (event) {
      this.$emit('mouseup', event)
    },
    mouseEnter (event) {
      this.$emit('mouseenter', event)
    },
    mouseLeave (event) {
      this.$emit('mouseleave', event)
    },
    // touchStart (event) {
    //   this.$emit('touchstart', event)
    // },
    touchMove (event) {
      this.$emit('touchmove', event)
    },
    touchEnd (event) {
      console.log('touchend')
    }
  }
}
</script>

<style lang="less" scoped>
.floating-ball-box {
  position: absolute;
  width: 65px;
  height: 65px;
  z-index: 30000;
  .set-ball{
    width:100%;
    height:100%;
    background-color: transparent!important;
  }
  .ball-position {
    position: absolute;
    display: block;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    border-radius: 50%;
    transition: transform 0.2s;
  }
  .floating-ball-out {
    .ball-position;
    width: 75%;
    height: 75%;
    background-color: rgba(248,167,22, 0.1);
  }
  .floating-ball-in {
    .ball-position;
    width: 55%;
    height: 55%;
    background-color: rgba(248,167,22, 0.2);
  }
  .floating-ball-center {
   .ball-position;
    width: 50%;
    height: 50%;
    background-color: rgba(248,167,22, 0.3);
  }
  &:hover {
    cursor: pointer;
  }
}
.ball-badge{
  font-size: 14px;
  color: #fff;
  background: #F74C31;
  position: absolute;
  top: 8px;
  right:8px;
  width: 15px;
  height: 15px;
  border-radius: 7.5px;
  line-height: 15px;
  text-align: center;
}
</style>
