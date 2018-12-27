<template>
    <div class="search-input all-box">
      <div class="search-input-box">
        <input class="search-input-content" type="text" v-model="thisInputData" v-on:input="changeInputDataFunc">
        <transition name="slide-right">
          <div v-if="showCheckList" class="checkList-box all-search-box" >
            <ul v-bind:style="[{'background-color':bgColorForSearch},{'color':colorForSearch}]"v-for="searchListItem in searchList">
              <li v-on:click="selectItem(searchListItem)">
                <span class="searchListKe-box" v-for="searchListKey in searchListItem">{{searchListKey}}</span>
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </div>
</template>

<script>
    export default {
        name: "search-input",
        directives: {},
        props: ['searchList','bgColorForSearch','colorForSearch'],
        data() {
            return {
              thisInputData:'',//input输入的值
              showCheckList:false//是否显示查询列表
            }
        },
        components: {},
        methods: {
          //改变input的值
          changeInputDataFunc(){
            if(this.thisInputData == ''){
              this.showCheckList = false;
            }else{
              this.showCheckList = true;
            }
            this.$emit("updateSearchList", this.thisInputData);
          },
          //选中一条数据
          selectItem(searchListItem){
            console.log(searchListItem)
            this.showCheckList = false;
            this.$emit("selected", searchListItem);
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
    .search-input {

    }

    .all-box {

    }
  .search-input-box{
    width:100%;
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    position: relative;
    .search-input-content{
      padding-left: 10px;
      height: 40px;
      line-height: 40px;
      width:100%;
      box-sizing: border-box;
      font-size: 18px;
    }
  }
  .checkList-box{
    position: absolute;
    left: 0px;
    width:100%;
    z-index: 999;

  }
  .searchListKe-box{
    padding-left: 20px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    display: inline-block;
    min-width:20%
  }
  .slide-right-enter {
    transform: translateX(1000px);
    opacity: 0;
  }
  .slide-right-enter-active {
    transition: all 0.4s ease;
  }
  .slide-right-leave-active {
    transition: all 0s;
  }
  .slide-right-leave-to {
    opacity: 0;
  }
  .all-search-box{
    max-height: 280px;
    height: 280px;
    overflow-y: scroll;
  }
</style>
