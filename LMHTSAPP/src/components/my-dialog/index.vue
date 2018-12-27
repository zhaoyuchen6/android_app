<template>
  <div class="vux-x-dialog" @touchmove="onTouchMove">
    <transition :name="maskTransition">
      <div class="weui-mask" @click="hide" v-show="show" :style="maskStyle0"></div>
    </transition>
    <transition :name="dialogTransition">
      <div :class="dialogClass" v-show="show" :style="mainStyle">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'my-dialog',
  model: {
    prop: 'show',
    event: 'change'
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    maskTransition: {
      type: String,
      default: 'vux-mask'
    },
    zIndex: {
      type: Number,
      default: 1000
    },
    maskStyle: {
      type: String,
      default: ""
    },
    dialogTransition: {
      type: String,
      default: 'vux-dialog'
    },
    dialogClass: {
      type: String,
      default: 'weui-dialog'
    },
    hideOnBlur: Boolean,
    dialogStyle: Object,
    scroll: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    show (val) {
      this.$emit('update:show', val)
      this.$emit(val ? 'on-show' : 'on-hide')
    }
  },
  methods: {
    onTouchMove (event) {
      !this.scroll && event.preventDefault()
    },
    hide () {
      if (this.hideOnBlur) {
        this.$emit('update:show', false)
        this.$emit('change', false)
      }
    }
  },
  computed:{
    mainStyle(){
      this.dialogStyle["z-index"] = this.zIndex+1;
      return this.dialogStyle;
    },
    maskStyle0(){
      return "z-index:"+ this.zIndex + ";" + this.maskStyle;
    }
  }
}
</script>

<style lang="less">
@import './transition.less';
@import './weui/widget/weui_tips/weui_mask';
@import './weui/widget/weui_tips/weui_dialog';
</style>
