<template>
  <div class="floating-ball-contain">
    <floating-ball :tltalBadgeNum = "tltalBadgeNum" :custom="custom">
      <div slot="currentBall">
        <slot name="currentBall"></slot>
      </div>
    </floating-ball>
    <floating-ball-popover :popoverEvents="popoverEvents" :iconWidth="iconWidth" @clickItem="clickItem" :showBadge="showBadge"></floating-ball-popover>
    <toast-ball></toast-ball>
  </div>
</template>

<script>
import FloatBallEvent from '../libs/floating-ball-event'
import FloatingBall from './FloatingBall.vue'
import FloatingBallPopover from './FloatingBallPopover.vue'
import ToastBall from './ToastBall.vue'

export default {
  name: 'FloatingBallContain',
  components: {
    'floating-ball-popover': FloatingBallPopover,
    'floating-ball': FloatingBall,
    'toast-ball':ToastBall
  },
  props: {
    themeColor: {
      type: String,
      default: '#adadad'
    },
    tltalBadgeNum : {
      type : Number
    },
    initPosition: {
      type: String,
      default: 'bottom right'
    },
    popoverEvents: {
      type: Array,
      validator (val) {
        return val instanceof Array
      },
      default: function () {
        return []
      }
    },
    custom:{ //是否自定义悬浮球
      type:Boolean,
      default:false
    },
    iconWidth:{  //图标宽度
      type:String,
      default:"60%"
    },
    showBadge:{ //是否显示徽章
      type:Boolean,
      default:true
    }
  },
  data () {
    return {
      isShow: false,
      isMove : false,
      popoverEventsNum: null
    }
  },
  created () {
    this.popoverEventsNum = this.popoverEvents.length > 4 ? this.popoverEvents.length : 4
  },
  mounted () {
    this.$nextTick(() => {
      FloatBallEvent.init(this, this.themeColor, this.initPosition)
    })
  },
  methods:{
    clickItem(index){
      this.$emit('clickItem',index);
    }
  }
}
</script>

<style lang="less" scoped>
.floating-ball-contain {
  width: 65px;
  height: 65px;
  position: absolute;
  z-index:999999999;
}

</style>
