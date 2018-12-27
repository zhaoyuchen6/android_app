<!--
@description: 字体动画
@author: 刘晓斌
参数:
  isAccess:是否通过
  showAnimate:是否显示组件,一般是拿到后台数据后再传个true进来
-->
<template>
  <div class="AccessAnimate">
    <transition name="slide-scale">
      <div v-if="showAnimate==true&&isAccess == true" class="animate-content">
        <div class="animate-img-box">
          <img :src="accessImg" alt="">
        </div>
      </div>
    </transition>
    <transition name="slide-scale">
      <div v-if="showAnimate==true&&isAccess == false" class="animate-content">
        <div class="animate-img-box">
          <img :src="unAccessImg" alt="">
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
  export default {
    name: "AccessAnimate",
    data(){
      return {
        accessImg:require('../AccessAnimate/img/access.svg'),
        unAccessImg:require('../AccessAnimate/img/unaccess.svg'),
      }
    },
    props: {
      showAnimate: {  //设置题目列表
        type: Boolean,
        default: function(){
          return false;
        }
      },
      isAccess: {  //设置题目列表
        type: Boolean,
        default: function(){
          return true;
        }
      },
    },
    computed:{

    },
    created(){

    },
    mounted(){

    },
    methods: {

    }
  }
</script>

<style scoped lang='less'>
  .AccessAnimate{
    // width: 100%;
    // height: 100%;
  }
  .animate-img-box{
    width:150px;
    height: 150px;
    img{
      width: 100%;
      height: 100%;

    }
  }
.slide-scale-enter {
  transform: scale(4.6) translateX(-20px);
  opacity: 0.5;
}
.slide-scale-enter-active {
  transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-scale-leave-active {
  transition: all 0s;
}
.slide-scale-leave-to {

}
</style>
