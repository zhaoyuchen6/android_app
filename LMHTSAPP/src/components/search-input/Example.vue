<!--使用方式-->
<!--
  1:注册引用组件 <search-input :searchList='searchList' @selected="selectedFunc" @updateSearchList="updateSearchListFunc" :bgColorForSearch="bgColorForSearch" :colorForSearch="colorForSearch"></search-input>
  2:在页面data中定义传参变量:
    searchList:选择框数据
    serachData:选择框内选中的数据
    bgColorForSearch:选择框背景色
    colorForSearch:选择框内字体颜色
  3:定义选择框内容更改函数updateSearchListFunc,在这个函数内通过获取的组件input值的改变,修改模糊查询框里的数据数组变量searchList,(数据键值可任意取名,不必拘束于id,name等)
  4定义组件选中回执函数selectedFunc,组件点击选中项后,会通过此函数返回点击的那一项的内容,页面拿到后可自行处理
-->
<template>
    <div class="example all-box">
      <div class="header-demo-box">
        <aui-divider class="header-demo">模糊查询搜索</aui-divider>
      </div>
      <div class="content-demo-box">
        <!--在这里引用组件,searchList选择数据作为参数,selectedFunc为引用组件的页面处理组件回执结果的函数,updateSearchList为修改模糊查询列表内容的函数-->
        <search-input :searchList='searchList' @selected="selectedFunc" @updateSearchList="updateSearchListFunc" :bgColorForSearch="bgColorForSearch" :colorForSearch="colorForSearch"></search-input>
        <!--效果如下:-->
        <div>
          <p>选中的数据:</p>
          <p>{{serachData}}</p>
        </div>
      </div>
    </div>
</template>

<script>
  import SearchInput from './SearchInput';
  export default {
      name: "example",
      directives: {},
      props: [],
      data() {
          return {
            searchList:[],//模拟数据待选择的内容
            serachData:'',//已选择的内容,从模糊查询组件返回的选择结果
            bgColorForSearch:'#0C2530',//选择框的背景颜色
            colorForSearch:'#fff'//选择框的字体颜色
          }
      },
      components: {
        SearchInput
      },
      methods: {
        //拿到组件处理的结果(赋值给serachData)
        selectedFunc(selectData){
          this.serachData = selectData;
          console.log('选中的数据:')
          console.log(this.serachData)
        },
        //组件通过调用这个函数可以修改模糊查询的数据内容
        updateSearchListFunc(inputData){

          console.log('通过变量inputData:'+inputData+' '+'修改searchList列表')
          //可以在这里调用后台接口,修改searchList,参数inputData是从组件那里拿到的输入内容,可以将它作为调用后台接口的参数,修改searchList的值,实现模糊查询
          //这里模拟一组待选择的数据内容(实际使用时使用参数inputData自行从后台接口或数据字典中拿到模糊查询检索的数据(自己写检索方法,后台模糊查询,或者前台切割数组遍历等),赋值给searchList)
          this.searchList = [//待选择的内容(组件输入内容inputData改变时,通过自行调后台接口模糊搜索或通过处理前台已有数据拿到)
            {
              id:'000005',//编号
              name:'刘德',//姓名
              typeName:'开卡/开户'//业务类型名称
            },
            {
              id:'000006',
              name:'马少杰',
              typeName:'办理销户'
            },
            {
              id:'000007',
              name:'刘晓斌',
              typeName:'其他业务'
            },{
              id:'000006',
              name:'马少杰',
              typeName:'办理销户'
            },{
              id:'000006',
              name:'马少杰',
              typeName:'办理销户'
            },{
              id:'000006',
              name:'马少杰',
              typeName:'办理销户'
            },{
              id:'000006',
              name:'马少杰',
              typeName:'办理销户'
            },{
              id:'000006',
              name:'马少杰',
              typeName:'办理销户'
            },{
              id:'000006',
              name:'马少杰',
              typeName:'办理销户'
            },{
              id:'000006',
              name:'马少杰',
              typeName:'办理销户'
            },{
              id:'000006',
              name:'马少杰',
              typeName:'办理销户'
            },{
              id:'000006',
              name:'马少杰',
              typeName:'办理销户'
            },{
              id:'000006',
              name:'马少杰',
              typeName:'办理销户'
            },{
              id:'000006',
              name:'马少杰',
              typeName:'办理销户'
            },{
              id:'000006',
              name:'马少杰',
              typeName:'办理销户'
            },{
              id:'000006',
              name:'马少杰',
              typeName:'办理销户'
            },{
              id:'000006',
              name:'马少杰',
              typeName:'办理销户'
            },{
              id:'000006',
              name:'马少杰',
              typeName:'办理销户'
            },
          ]
          // 模拟前端模糊查询,通过id检索
          let searchListLength = this.searchList.length;
          for(let j =0;j<inputData.length;j++){
            console.log(inputData[j])
            for(let i=searchListLength-1;i>=0;i--){
              if(this.searchList[i]){
                if(inputData[j]!=this.searchList[i].id.toString()[j]){
                  this.searchList.splice(i,1)
                }
              }
            }
          }
          //处理后的结果
          console.log('searchList:')
          console.log(this.searchList)
        }
      },
      watch: {},
      created() {

      },
      mounted() {

      },
      computed: {}
  }
</script>

<style lang="less" scoped>
  .example {

  }

  .all-box {

  }
  .header-demo-box{
    .header-demo{
      line-height: 60px;
    }
  }
  .content-demo-box{
    height: 82%;
  }
  .footer-demo-box{
    height: 5%;
  }
</style>
