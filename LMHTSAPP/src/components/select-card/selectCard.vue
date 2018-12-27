<!--
@description: 开立银行卡-选择银行卡类型
@author: nww
-->
<template>
  <div class="select-card">
    <!--卡类型-->
    <div class="card-type">
      <div class="img-box">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide"  v-for="(item,index) in bankCardTypeList" :key="'table'+index">
              <div class="cards-img"  >
                <card-box :text="item.text" :icon="item.icon" :maskColor="item.maskColor" :imgSrc="item.img" @click.native="jump(item.ifClick,item.name)"></card-box>
              </div>
            </div>
          </div>
          <!-- 分页按钮 -->
          <div class="swiper-pagination"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import CardBox from '@/components/card-box/cardBox'
  export default {
    name: "select-card",
    components:{ CardBox },
    props: {
      bankCardTypeList:{  //卡片列表
        type: Array,
        default: function(){
          return [];
        }
      }
    },
    data() {
      return {

      }
    },
    mounted:function() {
      let _this = this;
      let mySwiper = new Swiper('.swiper-container', {
        effect : 'coverflow',
        slidesPerView:4, //显示数量
        initialSlide:1,  //初始显示的index
        centeredSlides:true,
        // spaceBetween:50,  //Distance between slides in px.
        coverflowEffect: {
          rotate: 10,
          stretch: 1,  //	Stretch space between slides (in px)
          depth: 60,  //	Depth offset in px (slides translate in Z axis)   z轴的深度偏移 （单位：px）
          modifier:2,
          slideShadows :false   //是否显示阴影
        },
        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        observer: true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents: true,//修改swiper的父元素时，自动初始化swiper
        pagination: { //分页组件
          el: '.swiper-pagination',
          type: 'bullets',
        },
        on:{
          slideChange: function(){
            _this.isClick(this.activeIndex);//切换结束时，告诉我现在是第几个slide
          },
        },
      });
    },
    methods:{
      /*选择银行卡图片*/
      isClick(index){
        this.$emit("clickBankCardImg", index);
      },
      jump(flag,target){
        if(flag){
          this.$emit("toJump",target)
        }
      }
    }
  }
</script>
<style scoped lang="less">
  .select-card {
    box-sizing: border-box;
    padding-top:50px;
    height:410px;
    overflow: hidden;
    text-align: center;
    .card-type {
      width: 100%;
      margin: auto;
      height: 360px;
      .img-box {
        height: 360px;
        width: 100%;
        overflow: hidden;
        /*transition:all linear 1s;*/
        /*background: rgba(0, 120, 215, 0.4) none repeat scroll !important;*/
        .swiper-container {
          height: 100%;
          width: 96%;
          .swiper-slide {
            text-align: center;
            .cards-img {
              width: 356px;
              height:256px;
            /*  line-height: 214px;
              margin-top: 15px;*/
              img {
                width:100%;
                height:100%;
                vertical-align: middle;
              }
            }
            //当前页样式
            .is-rotate {

            }
          }
        }
      }
      p {
        width: 100%;
        height: 80px;
        line-height: 80px;
      }
    }
    .vtm-info {
      border: 1px solid;
      width: 50%;
      margin-left: 25%;
      padding-top: 26px;
      text-align: center;
      .vtm-item {
        height: 100%;
        .vtm-item-p {
          height: 90px;
          line-height: 90px;
        }
      }
    }
  }

</style>
