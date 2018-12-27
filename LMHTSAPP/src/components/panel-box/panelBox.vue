<template>
  <div class="panel-box">
    <div class="panel-title">
      <span>{{title}}</span>
    </div>
    <div class="panel-body">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
    export default {
        name: "panel-box",
        props:{
          title:{
            type:String,
            default:"标题"
          }
        }
    }
</script>

<style scoped lang="less">
  .panel-box{
    width:286px;
    height:150px;
    box-sizing: border-box;
    border-radius:10px;
    .panel-title{
      height:40px;
      line-height:40px;
      font-family: simHei;
      font-size:20px;
      padding-left:10px;
      background-color:#E8F4FA;
      border-radius:10px 10px 0 0;
      color:#3B464C;
    }
    .panel-body{
      height:110px;
      width:100%;
      background-color:#fff;
      border-radius:0 0 10px 10px;
      font-size:16px;
      &>div{
        border-radius:0 0 10px 10px;
      }
    }
  }
</style>
