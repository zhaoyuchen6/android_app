<template>
  <div class="card-box" :style="`background-image:url('${imgSrc}')`">
    <div class="mask" :style="`background:linear-gradient(${maskColor[0]},${maskColor[1]},${maskColor[0]}`">
      <img src="static/image/mask.png" alt="">
      <div class="content">
        <span :class="'set-icon icon-'+icon"></span>
        <p class="set-title">{{text}}</p>
       </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "card-box",
        props:{
          text:{
            type:String,
            default:"标题"
          },
          icon:{
            type:String,
            default:"amebient-point"
          },
          imgSrc:{
            type:String,
            required:true
          },
          maskColor:{
            type:Array,
            default:function(){
              return ["#F35044","#F09893"]
            }
          }
        }
    }
</script>

<style scoped lang="less">
  .card-box{
    width:380px;
    height:273px;
    background-size:380px 273px;
    border-radius:10px;
    position:relative;
    overflow: hidden;
    box-shadow:2px 2px 8px #4D4D4D;
    -webkit-box-reflect:below 4px -webkit-linear-gradient(top,transparent 78%,rgba(255,255,255,0.1),rgba(255,255,255,0.2));
  }
  .mask{
    height:100%;
    width:100%;
    position: absolute;
    /*background: linear-gradient(#F35044,#F09893,#F35044);*/
    border-radius:0 10px 10px 0;
    /*z-index:100;*/
    -webkit-clip-path: polygon(57% 0,100% 0,100% 100%,50% 100% );
    top:0;
    right:0;
    img{
      width:100%;
      height:100%;
      opacity:0.1;
    }
    .content{
      position: absolute;
      top:20%;
      left:63%;
      text-align: center;
      color:#fff;
      .set-title{
        padding-top:20px;
        font-family: simHei;
        font-weight: bold;
        font-size:24px;
      }
      .set-icon{
        font-size:60px;
      }
    }
  }
</style>
