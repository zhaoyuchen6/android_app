<template>
  <i :class="[className, isMsg ? 'weui-icon_msg' : '']"></i>
</template>

<script>
export default {
  name: 'icon',
  props: {
    type: String,
    isMsg: Boolean
  },
  computed: {
    className () { // compatible with old type param
      return `weui-icon weui_icon_${this.type} weui-icon-${this.type.replace(/_/g, '-')}`
    }
  }
}
</script>

<style lang="less">
@import '../icon/weui_font';
@r:12.8rem;
/**
following styles will be removed after v3.0.0
*/
.icon-big:before {
  font-size: 93/@r;
}
</style>
