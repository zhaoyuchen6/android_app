<template>
  <div class="satisfied-detail">
    <x-header :left-options="{preventGoBack:true}" class="blue-header" @on-click-back="close">
      客户满意度详情
    </x-header>
    <aui-table :content-bordered="false" :cell-bordered="false">
      <thead>
        <tr>
          <th v-for="(item,index) in headList">{{item}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(satisfied,index) in satisfiedList">
          <th v-for="(item,index) in satisfied">{{item}}</th>
        </tr>
      </tbody>
    </aui-table>
  </div>
</template>

<script>
    export default {
        name: "satisfied-detail",
        data(){
          return {
            headList:["客户姓名","业务类型","时间","柜员","满意度"],
            satisfiedList:[
              {name:"张三",type:"签约类",time:"12:30",clerk:"李四-099000",attitude:"不满意"},
              {name:"张三",type:"签约类",time:"12:30",clerk:"李四-099000",attitude:"不满意"},
              {name:"张三",type:"签约类",time:"12:30",clerk:"李四-099000",attitude:"不满意"}
            ]
          }
        },
        methods:{
           close(){
             this.$emit('close');
           }
        }
    }
</script>

<style scoped lang="less">
  .back-icon{
    display: inline-block;
    width:30px;
    img{
      width:100%;
      height:100%;
    }
  }
   thead{
     background:#F4FBFE;
   }
   th{
     width:20%;
     &:before{
       border-bottom-width:0 ;
     }
   }
  tbody{
    tr{
      &:nth-child(2n+1){
        background-color: #ffffff;
      }
      &:nth-child(2n){
        background-color:#F9F9F9;
      }
    }
  }
</style>
