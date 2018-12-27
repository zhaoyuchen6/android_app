<template>
  <div class="shop-show">
    <masker :value="detailFlag" style="border-radius: 2px;height:100%" color="#f5f5f5" :opacity="1" >
      <div class="all_div">
        <!--标题栏-->
        <x-header :left-options="{showBack:false}">
            <span>产品展示</span>
        </x-header>
        <div class="backTo">
          <img @click="backToIndexPage()" src="static/image/icon-fanhui黑-2.svg"  class="" v-if="!this.$store.state.showMenu">
        </div>
        <!--主体框-->
        <div class="set-content">
          <div class="typeList">
            <aui-flexbox :gutter="0" align="stretch">
              <aui-flexbox-item :span="0.2" style="position: relative;">
                <div class="list_box">
                  <div class="box_cell" v-for="(item,index) in listMun" :key="'table'+index" @click="changeIndex(index)">
                    <span class="cee_b" :class="{'ce_active':currentIndex===index}">{{item.name}}</span>
                  </div>
                </div>
              </aui-flexbox-item>
              <aui-flexbox-item :span="0.8" class="banner-box" @click="detailShopShow(productIndex)">
                <aui-swiper v-model="productIndex" :list="imgList" :show-desc-mask="false" dots-position="center" class="set-swiper">
                </aui-swiper>
              </aui-flexbox-item>
            </aui-flexbox>
          </div>
          <div class="shop_list">
            <div class="shop_title">
              <span style="float: left;margin-left: 5%;">{{currentIndex|titleFilter}}</span>
              <div class="look_more">
                <input class="accountInput" placeholder="搜索更多产品" >
              </div>
            </div>
             <!--热销产品-->
            <div class="list_row" v-for="(item,index) in list" v-show="currentIndex===0">
              <p class="list_title">
                <span>{{item.productname}}</span>
                <span class="tt_box">热销</span>
              </p>
              <div class="list_main">
                <aui-flexbox :gutter="0" align="stretch">
                  <aui-flexbox-item :span="2.5">
                    <p>预计收益率</p>
                    <p class="tt_text tt_red">{{item.profityearly}}%</p>
                  </aui-flexbox-item>
                  <aui-flexbox-item :span="2.5">
                    <p>投资期限</p>
                    <p class="tt_text">{{item.newestvalue}}天(无固定)</p>
                  </aui-flexbox-item>
                  <aui-flexbox-item :span="2.5">
                    <p>赎回规则</p>
                    <p class="tt_text">{{item.content}}</p>
                  </aui-flexbox-item>
                  <aui-flexbox-item :span="2.5">
                    <p>起购金额</p>
                    <p class="tt_text tt_red">{{item.minraise}}元起</p>
                  </aui-flexbox-item>
                  <aui-flexbox-item :span="3">
                    <aui-button class="list_btn" mini @click.native="detailShow(item.productid)" >
                      <span class="icon-pro-info icon-style"></span>
                      <span>产品详情</span>
                    </aui-button>
                  </aui-flexbox-item>
                </aui-flexbox>
              </div>
            </div>
            <!--推荐产品-->
            <div v-show="currentIndex===1">
              <div class="recommend" v-for="(item,index) in recommendList">
                <p class="product-title">{{item.title}}</p>
                <aui-flexbox :gutter="0" align="stretch" class="cell-box">
                  <aui-flexbox-item :span="2">
                    <p class="top-line">
                      <span class="red-text-strong">{{item.rate}}%</span>
                      <span v-if="item.increaseRate!==''" class="red-text">{{"+"+item.increaseRate}}%</span>
                    </p>
                    <p class="default-text">期待年回报率</p>
                  </aui-flexbox-item>
                  <aui-flexbox-item :span="2">
                    <p class="top-line tip-text">{{item.term}}个月</p>
                    <p class="default-text">锁定期</p>
                  </aui-flexbox-item>
                  <aui-flexbox-item :span="2">
                    <p class="top-line tip-text">{{item.minraise}}元</p>
                    <p class="default-text">最低出借金额</p>
                  </aui-flexbox-item>
                  <aui-flexbox-item :span="3">
                    <p class="full-line tip-text">{{item.tip}}</p>
                  </aui-flexbox-item>
                  <aui-flexbox-item :span="3" class="full-line">
                    <aui-button class="list_btn">立即加入</aui-button>
                  </aui-flexbox-item>
                </aui-flexbox>
              </div>
            </div>
            <!--储蓄产品-->
            <div v-show="currentIndex===2" class="bank-card">
              <div v-for="(item,index) in bankCardList" :key="index" class="cell-box">
                <p class="bank-card-title">{{item.title}}</p>
                <aui-flexbox :gutter="0" class="bank-card-content">
                  <aui-flexbox-item :span="0.75">
                    <p>{{item.content}}<span class="show-detail">点击查看详情&nbsp;></span> </p>
                  </aui-flexbox-item>
                  <aui-flexbox-item :span="0.25" class="center">
                    <aui-button class="list_btn">点击办卡</aui-button>
                  </aui-flexbox-item>
                </aui-flexbox>
              </div>
            </div>
            <!--财富管理产品-->
            <div v-show="currentIndex===3" class="wealth-management">
              <div v-for="(item,index) in wealthList" :key="index">
                <p class="product-title">{{item.title}}</p>
                <aui-flexbox :gutter="0" class="cell-box">
                  <aui-flexbox-item :span="0.8">
                    <p class="wealth-management-title">单位净值：<span class="red-text">{{item.netAssetValue}}</span></p>
                    <aui-flexbox :gutter="0">
                      <aui-flexbox-item :span="0.24">
                        <p>基金状态：&nbsp;&nbsp;{{item.fundState}}</p>
                        <p>备案编号：{{item.recordNumber}}</p>
                      </aui-flexbox-item>
                      <aui-flexbox-item :span="0.26">
                        <p>成立时间：{{item.foundingTime}}</p>
                        <p>起投金额：{{item.minraise}}</p>
                      </aui-flexbox-item>
                      <aui-flexbox-item :span="0.2">
                        <p>基金经理：{{item.fundManager}}</p>
                        <p>投资顾问：{{item.investmentAdvisor}}</p>
                      </aui-flexbox-item>
                      <aui-flexbox-item :span="0.3">
                        <p>累计净值（复权）：<span class="red-text">{{item.accumulatedNetValue}}</span></p>
                        <p>累计收益：<span class="red-text">{{item.accumulatedIncome}}</span></p>
                      </aui-flexbox-item>
                    </aui-flexbox>
                  </aui-flexbox-item>
                  <aui-flexbox-item :span="0.2">
                    <p>
                      <aui-button class="list_btn btn-small">加入对比</aui-button>
                    </p>
                    <p>
                      <aui-button class="list_btn btn-small">自选+</aui-button>
                    </p>
                  </aui-flexbox-item>
                </aui-flexbox>
              </div>
            </div>
          </div>
          <div>
            <span class="ckMore">查看更多</span>
            <span class="ckMoreImg"> > </span>
          </div>
        </div>
      </div>
      <div slot="content" style="height: 100%;width: 100%;" v-if="detailFlag">
        <component :is="currentComponent"  @detailHide="detailHide()" :productid="productid" ref="selectfood" ></component>
      </div>
    </masker>
  </div>
</template>

<script>
  import EventNames from "@/common/activity-manager/activity-event-names"; //路由事件名称
  import { PageManager } from "ab-manager-page"; //页面管理
  import { TradeFlowManager } from "ab-manager-trade-flow"; //流程管理
  import TradeActivityManager from "@/common/activity-manager/trade-activity-manager"; // 相对路径
  import BasicActivity from "@/mixins/basic-activity";


  import Masker from '../../components/masker'
  import prodectDetail from './productDetail.vue'
  import shopShowApi from  '../../common/api/shopShow.js'
  import hotProduct from './hotProduct.vue'

  export default {
    name: 'shop-show',
    mixins: [BasicActivity],
    components: {
      Masker,
      prodectDetail,
      hotProduct
    },
    data() {
      return {
        detailFlag:false,
        currentIndex:0,
        productIndex:0,
        currentComponent:"prodectDetail",
        pageCtrl: {
          currpage: 1,   // 当前页码
          pagenum: 2,    // 显示条数
          pageflag: 4    // 4-分页状态
        },
        productid:'',
        listMun:[
          {name:"热销产品"},
          {name:"推荐产品"},
          {name:"储蓄产品"},
          {name:"财富管理产品"}
        ],
        imgList:[
          {img:"static/image/shopShow/banner1.png"},
          {img:"static/image/shopShow/banner2.png"}
        ],
        list:[
         /* {"id":"0001","productname":"零活宝T+0","profityearly":"3.20","newestvalue":"90","minraise":"50,000","content":"期限内不可赎"},
          {"id":"0001","productname":"零活宝T+0","profityearly":"3.30","newestvalue":"90","minraise":"50,000","content":"期限内不可赎"},*/
        ],
        recommendList:[
          {title:"明星推荐，优选计划",rate:"3.20",increaseRate:"0.4",term:"12",minraise:"1000",tip:"限时加息"},
          {title:"新手专享",rate:"10",increaseRate:"",term:"1",minraise:"1000",tip:"使用红包，收益更高"},
        ],
        bankCardList:[
          {title:"菁英卡",content:"菁英卡是XX银行专为18-35岁的白领菁英人群提供的一张互联网特权的理财卡。除了具备传统借记卡的功能外，菁英卡针对白领青年群体频繁使用网络的特点。"},
          {title:"菁英卡",content:"菁英卡是XX银行专为18-35岁的白领菁英人群提供的一张互联网特权的理财卡。除了具备传统借记卡的功能外，菁英卡针对白领青年群体频繁使用网络的特点。"}
        ],
        wealthList:[
          {title:"财富管理10号",netAssetValue:"1.000",fundState:"已清算",foundingTime:"2017-01-25",fundManager:"--",accumulatedNetValue:"1.000",recordNumber:"USB200",minraise:"100万人民币",investmentAdvisor:"--",accumulatedIncome:"0.00%"},
          {title:"财富管理3号",netAssetValue:"1.000",fundState:"已清算",foundingTime:"2017-01-25",fundManager:"--",accumulatedNetValue:"1.000",recordNumber:"USB200",minraise:"100万人民币",investmentAdvisor:"--",accumulatedIncome:"0.00%"}
        ]
      }
    },
    created(){
      this.queryData();
    },

    activated(){
      // keep-aline 调用时重新初始化窗口内容
      this.queryData();
      this.detailFlag = false;
    },
    filters:{
      titleFilter(val){
        let title="";
        switch(val){
          case 0:title="零活宝-随时提取，最快T+0到账";break;
          case 1:title=" ";break;
          case 2:title="银行卡";break;
          case 3:title=" ";break;
        }
       return title;
      }
    },
    methods: {
      //返回游客主页
      backToIndexPage(){
        this.$activityManager.requestUpdateView(EventNames.INDEXPAGE); //去游客的菜单页
      },
      //查看热销展示详情
      detailShopShow(index){
        this.currentComponent='hotProduct';
        this.productid = index;
        this.detailFlag = true;
      },
      //查看产品详情
      detailShow(productid){
        this.currentComponent='prodectDetail';
        this.productid = productid;
        this.detailFlag = true;
      },
      detailHide(){
        this.detailFlag=false;
      },
      //选择不同类型产品
      changeIndex(index){
        this.currentIndex=index;
      },
      // 查询数据
      queryData (direction){
        let vm = this;
        let submintData = {},body={};
        body.PageCtrl = this.pageCtrl;
        submintData.body=JSON.stringify(body);
        shopShowApi.queryShopQuery(submintData,vm,function (rsp) {
          let reutrnData = rsp;
          vm.list = reutrnData.productList;

        });
      },
    },

  }
</script>
<style scoped lang="less">
  @import '../../../static/public-style/theme-blue.less';
  .headerdiv{
    background-color: white;
    height: 30px;
  }
  .shop-show{
    height:100%;
    background-color: white;
    .all_div{
      font-family: Arial,'黑体';
      border: @theme-color;
      height:100%;
      .set-content{
        height: calc(~"100% - "46px);
        overflow-y: auto;
        overflow-x: hidden;
      }
    }
  }
  .center{
    text-align: center;
  }
  p {
    text-indent:25.6px;
    line-height:25.6px;
    letter-spacing: 0.64px;
  }
  .typeList{
    height: 335px;
    width: 100%;
    background-color: #ffffff;
    padding: 10px 0 5px 0;
    box-sizing: border-box;
    border-bottom:1px solid #eee;
  }
  .list_box{
    width:86%;
    height:225px;
    font-size:16px;
    box-shadow: -3px 0 9px #ececec,0 -3px 9px #ececec,0 3px 9px #ececec,0 0 9px #ececec;
    margin: 0 7%;
  }
  .box_cell{
    width: 80%;
    margin: 0 auto;
    height: 54px;
    text-align: center;
    line-height:54px;
    word-break:keep-all;           /* 不换行 */
    white-space:nowrap;          /* 不换行 */
    border-bottom: 1px dashed #e5e5e5;
  }
  /*list*/
  .shop_list{
    width: 100%;
    margin-top:5px;
  }
  .shop_title{
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #f5f5f5;
    color: #706f6f;
    font-size: 18px;
  }
  .look_more{
    float: right;
    margin-right: 3%;
  }
  .list_row{
    width: 95%;
    height: 116.0px;
    border-bottom: 1px dashed #DACECE;
    float: right;
  }
  .list_row .list_title{
    width: 100%;
    height: 52px;
    line-height: 49.92px;
    font-size: 18px;
  }
  .list_main{
    width: 100%;
    height: 59.9px;
    color: #9e9c9c;
    text-align: left;
    font-size: 16px;
  }
  .tt_text{
    font-size: 16px;
    color: #4c4c4c;
  }
  .tt_red{
    color: #C9261F;
  }
  .tt_box{
    color: #FFF;
    background-color: #FF991A;
    border: none;
    border-radius: 5px;
    padding: 3px;
    font-size: 16px;
    margin-left: 5px;
  }
  .list_btn{
    background-color: @theme-color-bg;
    display:inline-block;
    font-size: 16px;
    width: 140px;
    height: 44px;
    line-height: 44px;
    color:@title-color-font;
   .icon-style{
     vertical-align: middle;
     margin-right:4px;
   }
    &:after{
      border:none;
    }
  }
  .btn-small{
    width:95px;
    height:40px;
    margin:2px;
  }
  .list_btn img{
    line-height: 29.95px;
    margin-top: 12px;
    float: left;
    width: 18px;
    height: 18px

  }
  .sanjiao{
    width: 0;
    height: 0;
    border-top: 9.98px solid transparent;
    border-left: 16.64px solid #b89e6c;
    border-bottom: 9.98px solid transparent;
    display: inline-block;
  }
  .sanjiao_box{
    width: 19.97px;
    height: 19.97px;
    position: absolute;
    top: 45%;
    right: 14.08px;
  }
  .cee_b{
    display: inline-block;
    width: 89.6px;
    height:40px;
    text-decoration:none;
    font-size: 16px;
  }
  .ce_active{
    color:@theme-color;
    border-bottom: 2px solid @theme-color;
  }
  .accountInput{
    width: 100%;
    height: 29.44px;
    display: inline-block;
    border: 1px solid #e5e5e5;
    border-radius: 10.24px;
    padding: 0 3%;
    font-size: 14px;
    margin-top: 10px;
    outline:none;
    text-align: center;
  }
  .ckMore{
    float: right;
    margin-right: 50px;
    margin-top: 5px;
  }
  .ckMoreImg{
    float: right;
    margin-right: -80px;
    margin-top: 5px;
  }
  .banner-box{
    padding-right:10px;
    box-sizing: border-box;
    /deep/.aui-icon-dot{
      background-color: rgba(255,255,255,0.5)!important;
    }
    /deep/.aui-icon-dot.active{
      background-color: rgba(255,255,255,1)!important;
    }
  }
  .product-title{
    width: 100%;
    height:40px;
    line-height:40px;
    border-bottom: 1px solid #f5f5f5;
    color: #706f6f;
    font-size: 18px;
    padding-left:40px;
  }
  .cell-box{
    margin:0 20px 5px 50px;
    width:calc(~"100% - "70px);
    text-align: center;
    box-sizing: border-box;
    border-bottom:1px dashed #e5e5e5;
  }
  .red-text-strong{
    color:#CA261E;
    font-size:20px;
    font-weight:bold;
  }
  .red-text{
    color:#CA261E;
    font-size:18px;
  }
  .recommend{
    .default-text{
      font-size:16px;
      color:#9E9C9C;
      height:40px;
      line-height:40px;
    }
    .tip-text{
     font-size:20px;
     color:#4C4C4C;
     text-align: center;
    }
    .top-line{
      height:50px;
      line-height:40px;
      padding-top:10px;
      box-sizing: border-box;
    }
    .full-line{
      height:90px;
      line-height:90px;
    }
  }
  .bank-card{
    p{
      text-indent: 0;
    }
    .bank-card-title{
     text-align: left;
     padding:10px 0 10px 8px;
    }
    .bank-card-content{
      padding:0 0 10px 8px;
      p{
        width:85%;
      }
    }
    .show-detail{
      color:#868686;
    }
  }
  .wealth-management{
    .wealth-management-title{
      text-align: left;
    }
    color: #706f6f;
  }
  .backTo{
    display: inline-block;
    float: left;
    margin-top: -38px;
    width: 34px;
    height:34px;
    box-sizing: border-box;
    padding:5px;
    margin-left: 30px;
    img{
      width:100%;
      height:100%;
    }
  }
  .set-swiper{
    width:900px;
    height:318px;
    margin:0 auto;
    /deep/.aui-swiper{
      height:100%!important;
    }
  }
</style>

