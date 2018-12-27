<template>
 <div class="visit-info" @click="showDetail">
   <span class="level-icon">
     <img :src="'static/image/home/'+icon+'.svg'">
     <i v-show="info.custlevel==='4'" class="light"></i>
   </span>
   <span class="level-text">{{info.custlevel|levelText}}</span>
   <span class="customer-name">{{info.custname}}</span>
   <span class="order-time">{{info.inqueuetime}}</span>
 </div>
</template>

<script>
    export default {
        name: "visit-info",
        props:{
          info:{
            type:Object,
            required:true
          }
        },
        computed:{
          icon(){
            let val=this.info.custlevel;
            if(val==='1'){ return "normal";}
            else if(val==='2'){ return "gold";}
            else if(val==='3'){ return "platinum";}
            else if(val==='4'){ return "diamond";}
          }
        },
        filters:{
          levelText(val){
            if(val==='1'){ return "普通客户";}
            else if(val==='2'){ return "黄金客户";}
            else if(val==='3'){ return "白金客户";}
            else if(val==='4'){ return "钻石客户";}
          }
        },
        methods:{
          showDetail(){
            this.$emit('showDetail',this.info.custid)
          }
        }
    }
</script>

<style scoped lang="less">
  @import '../../static/public-style/theme-blue.less';
  @color-blue:#16A8DE;
  .visit-info{
    height:40px;
    line-height:40px;
    padding:5px 30px;
  }
  .level-icon,.level-text,.customer-name,.order-time{
    display:inline-block;
  }
  .level-text{
    color:@visit-level-color;
  }
  .customer-name,.order-time{
    color: @visit-info-color;
  }
  .level-icon{
    width:26px;
    height:26px;
    display: inline-block;
    position: relative;
    top:2px;
    img{
      width:100%;
      height:100%;
    }
    .light{
      cursor:pointer;
      position: absolute;
      left: -26px;
      top: 0;
      width: 26px;
      height: 26px;
      background-image: -moz-linear-gradient(0deg,rgba(255,255,255,0),rgba(255,255,255,0.5),rgba(255,255,255,0));
      background-image: -webkit-linear-gradient(0deg,rgba(255,255,255,0),rgba(255,255,255,0.5),rgba(255,255,255,0));
      transform: skewx(-25deg);
      animation:light 1s linear 0s  infinite;

    }
  }
  .level-text{
    width:80px;
  }
  .customer-name{
    width:60px;
  }
  @keyframes light{
    from{
      left:-10px;
    }
    to{
      left:10px;
    }
  }
</style>
