<template>
  <div class="vux-header">
    <div class="vux-header-left">
      <slot name="overwrite-left">
       <!-- <transition :name="transition">
          <div class="left-arrow" @click="onClickBack" v-show="_leftOptions.showBack"></div>
        </transition>-->
        <!-- <transition :name="transition">
          <a class="vux-header-back" @click.preventDefault v-show="_leftOptions.showBack" @click="onClickBack">{{ typeof _leftOptions.backText === 'undefined' ? $t('back_text') : _leftOptions.backText}}</a>
        </transition> -->
        <transition :name="transition">
          <a class="vux-header-back set-area" @click.preventDefault v-show="_leftOptions.showBack" @click="onClickBack">
            <i class="fa fa-reply"></i>
          </a>
        </transition>
      </slot>
      <slot name="left"></slot>
    </div>
    <h1 class="vux-header-title" @click="$emit('on-click-title')" v-if="!shouldOverWriteTitle">
      <slot>
        <transition :name="transition">
          <span v-show="title">{{title}}</span>
        </transition>
      </slot>
    </h1>
    <div class="vux-header-title-area" v-if="shouldOverWriteTitle">
      <slot name="overwrite-title"></slot>
    </div>
    <div class="vux-header-right">
      <a class="vux-header-more" @click.preventDefault @click="$emit('on-click-more')" v-if="rightOptions.showMore"></a>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<!--<i18n>-->
<!--back_text:-->
  <!--en: Back-->
  <!--zh-CN: 返回-->
<!--</i18n>-->

<script>
import objectAssign from '../../../node_modules/object-assign'

export default {
  name: 'x-header',
  props: {
    leftOptions: Object,
    title: String,
    transition: String,
    rightOptions: {
      type: Object,
      default () {
        return {
          showMore: false
        }
      }
    }
  },
  beforeMount () {
    if (this.$slots['overwrite-title']) {
      this.shouldOverWriteTitle = true
    }
  },
  computed: {
    _leftOptions () {
      return objectAssign({
        showBack: true,
        preventGoBack: false
      }, this.leftOptions || {})
    }
  },
  mounted(){
    // // 获取状态栏高度
    let statusBarHeight = AgreeSDK.screen.statusBarHeight;
    // // 设置相关高度

  },
  methods: {
    onClickBack () {
      if (this._leftOptions.preventGoBack) {
        this.$emit('on-click-back')
      } else {
        this.$router ? this.$router.back() : window.history.back()
      }
    }
  },
  data () {
    return {
      shouldOverWriteTitle: false
    }
  }
}
</script>

<style lang="less" scoped>
/*@import '../../styles/variable.less';*/
.set-area{
  padding:0 20px;
}
.vux-header {

  box-sizing: border-box;
  background-color: #ffffff;
  height: 66px;//头部高度46+状态栏高度24
  display: flex;
  align-items: center;
  justify-content:   space-between;
  padding: 0 5%;
  padding-top: 24px;//状态栏高度24
  /*min-height: 48px;*/
  border-bottom: 1px solid rgba(120, 90, 77, 0.58);
}
.vux-header .vux-header-title {
  text-align: center;
  font-size: 18px;
  font-weight: 400;
  color: black;
}
.vux-header-title-area, .vux-header .vux-header-title {
  width: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.vux-header .vux-header-title > span {
  display: inline-block;
}
.vux-header .vux-header-left,.vux-header .vux-header-right {
  font-size: 24px;
  color: black;
}
.vux-header .vux-header-left a,.vux-header .vux-header-left button,.vux-header .vux-header-right a,.vux-header .vux-header-right button {
  /*float: left;*/
  /*margin-right: 8px;*/
  color: black;
}
.vux-header .vux-header-left a:active,.vux-header .vux-header-left button:active,.vux-header .vux-header-right a:active,.vux-header .vux-header-right button:active {
  opacity: .5
}
.vux-header .vux-header-left {
  left: 18px
}
.vux-header .vux-header-left .vux-header-back {
  float: left;
  font-size: 24px;
}
.vux-header .vux-header-left .left-arrow {
  width: 24px;
  height: 32px;
  float: left;

  &:before {
    content: "";
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 1px solid #ffffff;
    border-width: 1px 0 0 1px;
    transform: rotate(315deg);
  }
}
.vux-header .vux-header-right {
  right: 15px
}
.vux-header .vux-header-right a,.vux-header .vux-header-right button {
  margin-left: 8px;
  margin-right: 0
}
.vux-header .vux-header-right .vux-header-more:after {
  content: "\2022\0020\2022\0020\2022\0020";
  font-size: 16px;
}
.vux-header-fade-in-right-enter-active {
  animation: fadeinR .5s;
}
.vux-header-fade-in-left-enter-active {
  animation: fadeinL .5s;
}
@keyframes fadeinR {
  0% {
    opacity: 0;
    transform: translateX(150px);
  }
  100% {
    opacity:1;
    transform:translateX(0);
  }
}
@keyframes fadeinL{
  0% {
    opacity: 0;
    transform: translateX(-150px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
