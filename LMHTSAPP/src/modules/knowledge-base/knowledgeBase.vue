<template>
  <div class="knowledge-base">
    <!--标题栏-->
    <x-header :left-options="{showBack:false}">
      <span>知识库</span>
    </x-header>
    <!--主体框-->
    <aui-toast v-model="showMes" type="text" style="font-size: 1.5vw">{{alMes}}</aui-toast>
    <div class="top_div">
      <!--左边下拉框-->
      <div class="div-inline dropdown">
        <div class="dropdown-title" @click="mr_sel2()">
          <div class="div-inline" style="color: #9e9c9c">{{knowledgetype}}</div>
          <div class="div-inline" style="text-align: center">
            <!--        <img src="static/image/triangle-down.svg">-->
          </div>
        </div>
        <aui-group class="dropdown-content" v-show="drop_boolean" :gutter="0">
          <div v-for='(item,index) in menu' v-bind:class="{'on':flag==index}" v-on:click='light(index,item.name)' :key="index" style="border-bottom: 1px solid #f5f4f1;padding-left: 2%;">
            <aui-cell :border-intent="false">
              <div slot="title" style="font-size: 1.5vw">{{item.name}}</div>
            </aui-cell>
          </div>
        </aui-group>
      </div>
      <!--右边搜索框-->
      <div class="div-inline div_right">
        <div class="searchbox">
          <input type="text" name="search" class="search_input" v-model="knowledgetitle">
            <div class="search">
            <div @click="queryByTitle()">
              <span class="fa fa-search search-icon"></span>
              <!--       <img src="static/image/ambientpoint/icon-mirror.svg" class="icon-img-big">-->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="middle-div">
      <aui-flexbox>
        <aui-flexbox-item :span="1/3" style="font-size: 1.44vw;border-right: solid 1px #d9d9d9;text-align:center;">知识点</aui-flexbox-item>
        <aui-flexbox-item :span="1/3" style="font-size: 1.44vw;text-align:center;border-right: solid 1px #d9d9d9">更新时间</aui-flexbox-item>
        <aui-flexbox-item :span="1/3" style="font-size: 1.44vw;text-align:center;">创建人</aui-flexbox-item>
      </aui-flexbox>
      <div class="set-line"></div>
    </div>
    <div class="bottom-div">
      <div style="height:100%">
        <div class="page-loadmore-wrapper" ref="wrapper">
          <mt-loadmore :bottom-method="loadBottom" :auto-fill="false" :bottom-all-loaded="allLoaded" @bottom-status-change="handleBottomChange"
            @top-status-change="handleTopChange" :top-method="loadTop" ref="loadmore">
            <div >
              <div v-for="(item,index) in knowledgeList" :key="index" >
                <div class="rol_box" @click="operation(index);changeEditStatus(item.knowledgeno)">
                  <span class="span_box">
                    <!--<span class="icon-xin noLook"></span>-->
                    <span>&nbsp;{{item.knowledgetitle}}</span>
                  </span>

                  <span class="span_box" style="margin-left: 10%">{{item.lastmodifydate}} {{item.lastmodifytime}}</span>
                  <span class="span_box" style="margin-left: 10%">{{item.username}}</span>
                </div>
                <transition name="staggered-fade" v-bind:css="false" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave">
                  <div v-show="showOperation == index" class="slide_box" style="position: relative;">
                    <p class="slide_row">
                      <span>知识点： {{knowledge.knowledgetitle}}</span>
                      <span style="margin-left: 10%">创建人：{{knowledge.username}}</span>
                    </p>
                    <p class="slide_row">
                      <span>知识点类别：{{knowledge.knowledgetype}}</span>
                    </p>
                    <p class="slide_row">
                      <span style="width: 70%">创建时间：{{knowledge.createdate}} {{knowledge.createtime}}</span>
                    </p>
                    <p class="slide_row">
                      <span>内容：{{knowledge.content}}</span>
                    </p>
                    <div class="btn_box" v-if="currentUser==item.createuser">
                    </div>
                  </div>
                </transition>
              </div>
            </div>
            <!--加载显示设置-->
            <div slot="top" class="mint-loadmore-top">
              <div v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">
                <span>↓</span>
              </div>
              <div v-show="topStatus === 'pull'">
                <span>下拉刷新</span>
              </div>
              <div v-show="topStatus === 'drop'">
                <span>释放更新</span>
              </div>
              <div v-show="topStatus === 'loading'">
                <mt-spinner type="snake"></mt-spinner>
              </div>
            </div>
            <div slot="bottom" class="mint-loadmore-bottom">
              <div v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">
                <span>↑</span>
              </div>
              <div v-show="bottomStatus === 'pull'">
                <span>上拉加载更多</span>
              </div>
              <div v-show="bottomStatus === 'drop'">
                <span>释放加载更多</span>
              </div>
              <div v-show="bottomStatus === 'loading'">
                <mt-spinner type="snake"></mt-spinner>
              </div>
            </div>
            <div style="text-align: center;padding-top:0.78vw; color: #999;" v-if="allLoaded===true">加载完毕</div>
          </mt-loadmore>
        </div>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import MtLoadmore from '@/components/loadmore/index'
  import MtSpinner from '@/components/spinner/index'
  import knowledgeQuery from '@/common/api/knowledgeBase.js'
  export default {
    name: 'knowledge-base',
    components: {
      MtLoadmore,
      MtSpinner
    },
    deactivated() {
      this.showOperation = -1;
    },
    mounted() {
      let lojinObject = JSON.parse(sessionStorage.getItem("loginObj"));
      this.currentUser = lojinObject.code;
      this.queryKnowledgeList('', this.knowledgetypeno, this.knowledgetitle)
    },
    data() {
      return {
        showMes: false,
        alMes: '',
        currentUser: '0',
        //title搜索
        knowledgetitle: '',
        //类型搜索
        knowledgetype: '知识点搜索',
        knowledgetypeno: '0',
        //        HeightStyle: 'height: ' + (window.screen.availHeight - 95) + 'px;  overflow: hidden;',
        knowledgeList: [],
        knowledge: {},
        menu: [{
            "name": "全部"
          },
          {
            "name": "业务类知识点"
          },
          {
            "name": "技巧类知识点"
          },
          {
            "name": "常识类知识点"
          },
          {
            "name": "其他知识点"
          },
        ],
        flag: 0,
        results: [],
        value: 'test',
        showEdit: false,
        drop_boolean: false,

        allLoaded: false, // 数据加载状态   true时表示数据没有加载完毕
        bottomStatus: '', //上拉刷新状态
        topStatus: '', // 下拉刷新状态
        /* wrapperHeight: 0,  //初始化下拉框高度*/
        statusValue: '', //状态
        showOperation: '-1', //显示消息操作
        pageCtrl: {
          currpage: '1',
          pagenum: '10',
          pageflag: '4'
        },

      }
    },
    methods: {
      mr_sel2() {
        this.drop_boolean = !this.drop_boolean;
      },
      light: function (index, item) {
        if (this.drop_boolean) {
          this.knowledgetype = item;
          this.knowledgetypeno = index;
          this.drop_boolean = false;
          this.pageCtrl.currpage = '1';
          this.allLoaded = false; // 数据已经加载完毕
          this.queryKnowledgeList('', this.knowledgetypeno, this.knowledgetitle)
        }
        this.flag = index;
      },
      changeEditStatus(no) {
        this.queryKnowledgeList(no, '0', '');
      },

      //查询知识点
      queryKnowledgeList(no, type, title) {
        let vm = this;
        let submintData = {};
        let body = {};
        let hsitoryRsp = {};
        if (no != '') {
          body.knowledgeno = no;
          vm.pageCtrl.currpage = '1';
        }
        if (type != '0') {
          body.knowledgetype = type;
        }
        if (title != '') {
          body.knowledgetitle = title;
        }
        body.PageCtrl = vm.pageCtrl;
        submintData.body = JSON.stringify(body);
        /*查询知识点*/
        knowledgeQuery.queryKnowledgeList(submintData, vm, rsp => {
          if (no == '') {
            if (vm.pageCtrl.currpage == "1") {
              vm.knowledgeList = rsp.knowledgeList
            } else {
              vm.knowledgeList = vm.knowledgeList.concat(rsp.knowledgeList)
            }
            if (vm.statusValue == 'top') {
              vm.$refs.loadmore.onTopLoaded();
              vm.statusValue = '';
            } else {
              vm.statusValue = '';
              vm.$refs.loadmore.onBottomLoaded({
                top: 0
              });
            }
            // 如果是最后一页，将完全加载状态置为true；如果不是则页码+1
            if (vm.pageCtrl.currpage == rsp.PageInfo.totalpagenum || rsp.PageInfo.totalpagenum === 0) {
              vm.allLoaded = true; // 数据已经加载完毕
              vm.showLoading = false; // 不展示loading
            } else {
              vm.pageCtrl.currpage++;
            }
          } else {
            vm.knowledge = rsp.knowledgeList[0]
            if (vm.knowledge.knowledgetype == '1') {
              vm.knowledge.knowledgetype = '业务类知识点';
            } else if (vm.knowledge.knowledgetype == '2') {
              vm.knowledge.knowledgetype = '技巧类知识点';
            } else if (vm.knowledge.knowledgetype == '3') {
              vm.knowledge.knowledgetype = '常识类知识点';
            } else if (vm.knowledge.knowledgetype == '4') {
              vm.knowledge.knowledgetype = '其他知识点';
            }
          }

        })
      },
      //根据title查
      queryByTitle() {
        this.pageCtrl.currpage = '1';
        this.allLoaded = false; // 数据已经加载完毕
        this.queryKnowledgeList('', this.knowledgetypeno, this.knowledgetitle);
      },
      //消息操作
      operation(index) {
        if (index == this.showOperation) {
          this.showOperation = -1;
        } else {
          this.showOperation = index;
        }
      },

      // 下拉加载数据相关方法
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      handleTopChange(status) {
        this.moveTranslate = 0;
        this.topStatus = status;
      },
      loadBottom() {
        this.statusValue = 'Bottom'
        this.queryKnowledgeList('', this.knowledgetypeno, this.knowledgetitle);
      },
      loadTop() {
        this.pageCtrl.currpage = 1;
        this.allLoaded = false;
        this.statusValue = 'top';
        this.queryKnowledgeList('', this.knowledgetypeno, this.knowledgetitle);
      },

      //row--animate
      beforeEnter: function (el) {
        el.style.opacity = 0;
        el.style.height = 0
      },
      enter: function (el, done) {
        var delay = el.dataset.index * 150;
        let chileNum = el.children.length;
        //        console.log(el);
        setTimeout(function () {
          Velocity(
            el, {
              opacity: 1,
              height: 2.3 * chileNum + 'em'
            }, {
              complete: done
            }
          )
        }, delay)
      },
      leave: function (el, done) {
        var delay = el.dataset.index * 150;
        setTimeout(function () {
          Velocity(
            el, {
              opacity: 0,
              height: 0
            }, {
              complete: done
            }
          )
        }, delay)
      },

    },

  }
</script>
<style scoped lang="less">
  .icon-img {
    width: 20px;
    height: 20px;
  }

  .icon-img-big {
    width: 30px;
    height: 30px;
  }

  .add_title {
    font-size: 18.43px;
    color: #333;
    letter-spacing: 17.79px;
    height: 60.03px;
    line-height: 60.03px;
    float: right;
    margin-right: 20%;
  }

  html {
    font-size: 62.5%;
  }

  body {
    overflow: hidden;
    font-family: Arial, '黑体';
  }

  p {
    text-indent: 25.6px;
    line-height: 25.6px;
    letter-spacing: 0.38px;
  }

  /*上div*/

  .top_div {
    height: 70px;
  }

  .middle-div {
    height: 55px;
    &>div:nth-child(1) {
      height: 30px;
      padding-bottom: 15px;
    }
    .set-line {
      height: 10px;
      background-color: #f5f4f1;
      width: 100%;
    }
  }

  .bottom-div {
    height: calc(~"100% - "170px);
  }

  .text_row {
    margin: 19.2px auto;
  }

  .div-inline {
    display: inline;
    position: relative;
    padding: 13px 9.98px;
    box-sizing: border-box;
  }

  /*下拉框*/

  .dropdown {
    width: 25%;
    text-align: center;
    padding: 10px;
    font-family: '黑体';
    float: left;
    font-size: 18px;
  }

  .dropdown-title {
    border: 1px solid #b89e6c;
    padding: 9.98px 0;
    border-radius: 9.98px;
    letter-spacing: 5px;
    height: 50px;
    box-sizing: border-box;
  }

  .dropdown-content {
    font-family: '黑体';
    letter-spacing: 2px;
    display: none;
    position: absolute;
    background-color: white;
    width: 77%;
    text-align: left;
    border-left: 1px solid #b89e6c;
    border-right: 1px solid #b89e6c;
    border-bottom: 1px solid #b89e6c;
    margin-left: 9.98px;
    z-index: 1;
    font-size: 19.2px;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }

  /*搜索框*/

  .div_right {
    width: 65% !important;
    float: left;
    font-size: 19.2px;
    height: 70px;
  }

  .searchbox {
    font-family: '黑体';
    font-size: 19.97px;
    background-color: #f5f4f1;
    border-radius: 19.97px;
  }

  .search_input {
    width: 450.05px;
    border: 1px solid #f5f4f1;
    background-color: #f5f4f1;
    border-radius: 19.97px;
    height: 50px;
    box-sizing: border-box;
    background-repeat: no-repeat;
    background-size: 24.96px;
    background-position: 5px center;
    padding: 0 0 0 29.95px;
    outline: none;
  }

  .search {
    width: 119.97px;
    height: 50px;
    float: right;
    background: #ff991a;
    color: white;
    text-align: center;
    line-height: 49.92px;
    cursor: pointer;
    border-radius: 19.97px;
    .search-icon {
      font-size: 18px;
    }
  }

  /*表单*/

  .tdborder {
    border-right: 2px solid #ededed;
    font-size: 19.2px;
    color: #4c4c4c;
    font-family: Arial, 黑体;
  }

  .table_style {
    border-left: 2px solid #ededed;
    border-right: 2px solid #ededed;
    z-index: 0;
    font-family: Arial, 黑体;
  }

  .vux-table td:after,
  .vux-table th:after {
    border-color: #F5F4F1 !important;
  }

  .td_id {
    width: 15%;
  }

  .td_content {
    width: 46%;
  }

  .td_buttons {
    width: 48%;
  }

  /*按钮*/

  .btn_style {
    width: 80%;
    height: 33.02px;
    line-height: 33.02px;
    background: #B89E6C;
    color: #fff;
    font-size: 18.43px;
    font-family: Arial, 黑体;
  }

  th {
    padding: 5px;
  }

  .bdcolor {
    background: #F5F4F1;
  }

  .on {
    background-color: #ff991a;
  }

  /*新增dialog*/

  .text_style {
    width: 60%;
    height: 34.05px;
    border: 1px solid #DBDADB;
    border-radius: 9.98px;
    background: #f5f4f1;
    padding-left: 9.98px;
    font-size: 18.43px;
  }

  .text_span {
    display: inline-block;
    width: 25%;
    font-size: 18.43px;
  }

  .input_text_width {
    width: 58%;
  }

  .text_content {
    width: 514.94px;
    height: 280.06px;
    border: 1px solid #DBDADB;
    border-radius: 9.98px;
    background: #f5f4f1;
    padding: 9.98px;
    font-size: 18.43px;
  }

  .btn_sure {
    margin-bottom: 0rem;
    width: 18%;
    height: 38.4px;
    line-height: 38.4px;
    background: #B89E6C;
    color: #fff;
    font-size: 17.92px;
    position: absolute;
    bottom: 12.8px;
    left: 45%;
  }

  option {
    font-size: 13.95px;
  }

  .rol_box {
    width: 100%;
    height: 51.2px;
    line-height: 51.2px;
    text-align: center;
    font-size: 12.8px;
    border-bottom: 1px solid #e5e5e5;
    color: #505050;
  }

  /*查看详情dialog*/

  .dialog_button {
    right: 0;
    line-height: 33.02px;
    background: #B89E6C;
    color: #fff;
    font-size: 18.43px;
  }

  .dialog_content {
    /*    background: url("../../../static/image/ambientpoint/knowledge-tree.png");*/
    height: 512.0px;
    background-size: cover;
    padding: 0rem 0;
    position: relative;
  }

  /*loadmore组件相关自定义样式*/

  .page-loadmore-wrapper {
    overflow: scroll;
    height: 98%;
    // .agree-studio-container{
    //   /deep/.mint-loadmore-content{
    //   }
    // }
  }

  .mint-loadmore-bottom {
    font-size: 19.2px;
  }

  .mint-loadmore-bottom div {
    display: inline-block;
    transition: .2s linear;
    vertical-align: middle;
  }

  .mint-loadmore-bottom div>span {
    display: inline-block;
    position: relative;
    margin-left: 9.98px;
  }

  .mint-loadmore-top {
    font-size: 19.2px;
  }

  .mint-loadmore-top div {
    display: inline-block;
    transition: .2s linear;
    vertical-align: middle;
  }

  .mint-loadmore-top div>span {
    display: inline-block;
    position: relative;
    margin-left: 9.98px;
  }
  .rol_box {
    width: 100%;
    height: 46.08px;
    line-height: 46.08px;
    text-align: center;
    font-size: 12.8px;
    border-bottom: 1px solid #e5e5e5;
    color: #505050;
  }

  .slide_box {
    width: 100%;
    height: 38.4px;
    font-size: 16px;
    color: #505050;
    background-color: #f5f5f5;
  }

  .slide_row {
    height: 25.6px;
    line-height: 25.6px;
    font-size: 12.8px;
    padding-left: 10%;
  }

  .slide_row span {
    display: inline-block;
    width: 25%;
  }

  .slide_row span:nth-child(3) {
    margin-left: 5%;
  }

  .span_box {
    display: inline-block;
    width: 24%;
    text-align: center;
    height: 46.08px;
    line-height: 46.08px;
  }

  .container_box {
    text-align: center;
  }

  .noLook {
    float: left;
    margin: 12.8px 0 0 25.6px;
    color: #B89E6C;
    font-size: 25.6px;
  }

  .btn_box {
    position: absolute;
    bottom: 1em;
    right: 3em;
  }

  .dialog_button {
    right: 0;
    background: #B89E6C;
    color: #fff;
    display: inline-block;
    font-size: 1em;
  }

  .knowledge-base {
    width: 100%;
    // height: calc(~"100% - "15px);
    height: 100%;
    margin: 0 auto;
    font-family: SimHei;
    font-size: 16px;
  }

  .textArea {
    width: 54%;
    font-size: 19.2px;
    display: inline-block;
    border: 1px solid #e5e5e5;
    vertical-align: text-top;
    /deep/.aui-textarea {
      width: 100% !important;
    }
  }

</style>
