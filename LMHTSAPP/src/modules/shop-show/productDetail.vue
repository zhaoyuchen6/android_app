<template>
  <div class="product-detail">
    <masker :value="displayFlag" style="border-radius: 2px;height:100%" color="#f5f5f5" :opacity="1" >
      <div slot="default" style="height:100%">
      <x-header  :left-options="{preventGoBack:true}" class="blue-header" @on-click-back="detailHide">
        <span>产品详情</span>
      </x-header>
        <!--主体框-->
        <div class="set-content">
          <aui-header :showBack=false class="set-header" style="background-color: white;">
            <div slot="overwrite-left">
              <span style="color:#CA261E;" class="fontS_20">理财产品：{{productList.productname}}</span>
              <span style="padding-left: 3.9vw;"></span>
              <span style="color:#9E9C9C;" class="fontS_20">产品代码：{{productList.productcode}}</span>
            </div>
          </aui-header>
          <aui-flexbox align="stretch" class="set-content-bottom">
            <aui-flexbox-item>
              <div class="flex-demo" style="height:100%;border-right: 0.15vw solid #F5F4F1;background-color: #F5F4F1;">
                <!--swipper-->
                <aui-tab :line-width=2  :active-color='selectedColor' v-model="index" class="set-tab">
                  <aui-tab-item class="fontS_20" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}</aui-tab-item>
                </aui-tab>
                <aui-swiper v-model="index" class="set-swiper-height" :show-dots="false" :disabled="swipeDisabled">
                  <!-- 产品信息 -->
                  <aui-swiper-item>
                    <div class="set-swiper-item">
                      <aui-flexbox orient="vertical" :gutter=0>
                        <aui-flexbox-item>
                          <aui-flexbox orient="vertical" style="background-color: #FFFFFF;" :gutter=0>
                            <aui-flexbox-item>
                              <div class="dt2_row">
                                <span>FSAA17135G非凡资产管理双月增利第227期(直销特供)专享款</span>
                                <b class="icon_cl">封闭型</b>
                              </div>
                            </aui-flexbox-item>
                            <aui-flexbox-item style="background-color: #FFFFFF;">
                              <aui-flexbox class="" :gutter=0 style="background-color: #FFF9EC; padding-bottom: 0.78vw; width: 98%; margin: 0 1%;height: 60px">
                                <aui-flexbox-item :span="1/4" class="content1">
                                  <span>预期年化收益</span>
                                  <span>{{productList.profityearly}}%</span>
                                </aui-flexbox-item>
                                <aui-flexbox-item :span="1/4" class="content1">
                                  <span>预期周期</span>
                                  <span>180天</span>
                                </aui-flexbox-item>
                                <aui-flexbox-item :span="1/4" class="content1">
                                  <span>起购金额</span>
                                  <span>￥{{productList.buystart}}.00</span>
                                </aui-flexbox-item>
                                <aui-flexbox-item :span="1/4" class="content1">
                                  <span>剩余天数</span>
                                  <span>10天</span>
                                </aui-flexbox-item>
                              </aui-flexbox>
                            </aui-flexbox-item>
                            <aui-flexbox-item>
                              <div class="gathering">
                                <span>已募集</span>
                                <span>￥200,000</span>
                              </div>
                            </aui-flexbox-item>
                            <aui-flexbox-item>
                              <div class="pr_row">
                                <span>项目进度</span>
                                <span class="pr_pr"><i></i></span>
                                <div class="pr_wid">
                                  <i class="pr_sanjiao"></i>
                                  <b>68%</b>
                                </div>
                              </div>
                            </aui-flexbox-item>
                            <aui-flexbox-item>
                              <div class="pr_row">
                                <span>风险等级</span>
                                <span style="font-size: 1.09vw;color: #FF5C5C;">较低风险(2级)</span>
                              </div>
                            </aui-flexbox-item>
                            <aui-flexbox-item>
                              <div class="pr_row">
                                <span>项目时间</span>
                                <span style="font-size: 1.09vw;color: #EE6723;">{{productList.profitstart}}-{{productList.profitend}}</span>
                              </div>
                            </aui-flexbox-item>
                          </aui-flexbox>
                        </aui-flexbox-item>
                        <aui-flexbox-item>
                          <aui-flexbox orient="vertical" style="background-color: #FFFFFF; margin-top: 5px;">
                            <aui-flexbox-item>
                              <div class="prod_title">
                                产品概要信息
                              </div>
                            </aui-flexbox-item>
                            <aui-flexbox-item>
                              <div class="jijin_row" style="width: 95%;">
                                <div class="jijin_box" style="margin-right: 5%">
                                  <span>产品编码</span>
                                  <span>24554646461</span>
                                </div>
                                <div class="jijin_box">
                                  <span>产品名称</span>
                                  <span style="color: #FF5C5C;">非凡资产管理天溢普通款</span>
                                </div>
                                <div class="jijin_box" style="margin-right: 5%">
                                  <span>理财类型</span>
                                  <span>保本保收益类</span>
                                </div>
                                <div class="jijin_box">
                                  <span>预计年化收益率</span>
                                  <span style="color: #FF5C5C;">3.6%</span>
                                </div>
                                <div class="jijin_box" style="margin-right: 5%">
                                  <span>募集结束时间</span>
                                  <span>2009-12-32</span>
                                </div>
                                <div class="jijin_box">
                                  <span>起息时间</span>
                                  <span>2008-02-02</span>
                                </div>
                                <div class="jijin_box" style="margin-right: 5%">
                                  <span>首次购买起点</span>
                                  <span>50,000.00元 </span>
                                </div>
                                <div class="jijin_box">
                                  <span>追加购买起点</span>
                                  <span>1,000.00元</span>
                                </div>
                                <div class="jijin_box" style="margin-right: 5%">
                                  <span>购买渠道</span>
                                  <span>手机、网银 </span>
                                </div>
                                <div class="jijin_box">
                                  <span>最小赎回单位</span>
                                  <span>1,000.00元</span>
                                </div>
                                <div class="jijin_box" style="margin-right: 5%">
                                  <span>个人产品账户最低份额</span>
                                  <span style="color: #FF5C5C;">1,000.00</span>
                                </div>
                                <div class="jijin_box">
                                  <span>追加认购最低金额</span>
                                  <span style="color: #FF5C5C;">1,000.00</span>
                                </div>
                                <div class="jijin_box" style="margin-right: 5%">
                                  <span>风险等级</span>
                                  <span style="color: #FF5C5C;">42(稳健型 )</span>
                                </div>
                                <div class="jijin_box">
                                  <span>最小认购单位</span>
                                  <span>1,000.00元</span>
                                </div>
                                <div class="jijin_box" style="margin-right: 5%">
                                  <span>止息时间 </span>
                                  <span style="color: #FF5C5C;">2008-02-02</span>
                                </div>
                                <div class="jijin_box">
                                  <span>起购金额</span>
                                  <span>50,000.00元</span>
                                </div>
                                <div class="jijin_box" style="margin-right: 5%">
                                  <span>募集开始时间 </span>
                                  <span>2008-02-02</span>
                                </div>
                              </div>
                            </aui-flexbox-item>
                          </aui-flexbox>
                        </aui-flexbox-item>
                        <aui-flexbox-item>
                          <aui-flexbox orient="vertical" style="background-color: #FFFFFF; margin-top: 5px;">
                            <aui-flexbox-item>
                              <div class="prod_title">
                                相关协议
                              </div>
                            </aui-flexbox-item>
                            <aui-flexbox-item>
                              <div class="wenjian_row">
                                <img src="../../../static/image/chakan.png" alt="">
                                <span>《南方医药保健灵活配置混合型证券投资基金招募说明书》</span>
                              </div>
                              <div class="wenjian_row">
                                <img src="../../../static/image/chakan.png" alt="">
                                <span>《南方医药保健灵活配置混合型证券投资基金招募说明书》</span>
                              </div>
                              <div class="wenjian_row">
                                <img src="../../../static/image/chakan.png" alt="">
                                <span>《南方医药保健灵活配置混合型证券投资基金招募说明书》</span>
                              </div>
                              <div class="wenjian_row">
                                <img src="../../../static/image/chakan.png" alt="">
                                <span>《南方医药保健灵活配置混合型证券投资基金招募说明书》</span>
                              </div>
                              <div class="wenjian_row">
                                <img src="../../../static/image/chakan.png" alt="">
                                <span>《南方医药保健灵活配置混合型证券投资基金招募说明书》</span>
                              </div>
                              <div class="wenjian_row">
                                <img src="../../../static/image/chakan.png" alt="">
                                <span>《南方医药保健灵活配置混合型证券投资基金招募说明书》</span>
                              </div>
                              <div class="wenjian_row">
                                <img src="../../../static/image/chakan.png" alt="">
                                <span>《南方医药保健灵活配置混合型证券投资基金招募说明书》</span>
                              </div>
                            </aui-flexbox-item>
                          </aui-flexbox>
                        </aui-flexbox-item>
                      </aui-flexbox>
                    </div>
                  </aui-swiper-item>
                  <!-- 特别提醒 -->
                  <aui-swiper-item>
                    <aui-flexbox orient="vertical" class="set-swiper-item" >
                      <aui-flexbox-item class="remindinfo">
                        <div class="title1">
                          <span>风险提醒</span>
                        </div>
                        <div class="info">
                          <p>
                            理财产品有风险，投资决策需谨慎。本理财产品为非保本浮动收益型产品，请认真阅读风险揭示内容，基于自身的判断进行投资决策，工商银行对产品本金和收益的偿还不承
                          </p>
                        </div>
                      </aui-flexbox-item>
                      <aui-flexbox-item class="remindinfo">
                        <div class="title1">
                          <span>变现提醒</span>
                        </div>
                        <div class="info">
                          <p class="redFont">
                            本产品不支持变现请注意
                          </p>
                        </div>
                      </aui-flexbox-item>
                      <aui-flexbox-item class="remindinfo">
                        <div class="title1">
                          <span>手续费率</span>
                        </div>
                        <div class="info">
                          <p>
                            本产品不收取销售手续费。<br/>
                            本产品的费用包括：<br/>
                            产品管理费率：<span class="redFont">0.2%</span>；<br/>
                            理财托管费率：<span class="redFont">0.03%</span>；<br/>
                            上述费用均按日由资产余额计提。理财资金超过曲奇最高收益率的部分作为银行投资管理费用<br/>
                          </p>
                        </div>
                      </aui-flexbox-item>
                      <aui-flexbox-item class="remindinfo">
                        <div class="title1">
                          <span>风险揭示</span>
                        </div>
                        <div class="info">
                          <p>
                            本理财产品计划有投资风险，客户应允许认识投资风险，谨慎投资。客户投资本期理财产品可能面临以下风险：<br/>
                            （一）、信用风险：本产品主要投资与国债、央行票据、金融债、企业债等债券，及优质企业信托融资项目、货币市场基金、回购、新购申购、银行承兑汇票、本外币货币基金市场安全性交稿的其他投资管理工具等。投资风险较小。<br/>
                            （二）、市场风险：本产品流动性可与活期储蓄相媲美，具有“买入即时成交，即可享受收益；赎回瞬时入账，资金即时可用”的特点。具体可参见交易规则部分。<br/>
                            （三）、流动性风险：银行将根据存款利率变动及资金运作情况不定期调整预期最高年收益率，并至少于新预期最高年化收益率启动前一个工作日公布。<br/>
                            （四）、不可抗力及意外事件风险：本产品主要投资与国债、央行票据、金融债、企业债等债券，及优质企业信托融资项目、货币市场基金、回购、新购申购、银行承兑汇票、本外币货币基金市场安全性交稿的其他投资管理工具等。投资风险较小。<br/>
                          </p>
                        </div>
                      </aui-flexbox-item>
                    </aui-flexbox>
                  </aui-swiper-item>
                  <!-- 交易规则 -->
                  <aui-swiper-item>
                    <div class="set-swiper-item">
                      <aui-flexbox orient="vertical">
                        <aui-flexbox-item class="remindinfo">
                          <div class="title1">
                            <span>1、申购</span>
                          </div>
                          <div class="info">
                            <p>
                              【手动申购】：单人单日累计申购上限100万元<br />
                              【余额自动申购】：单人单日申购上限500万元<br />
                              <span class="redFont">*限额可能调整，最终以网站页面显示为准。</span>
                            </p>
                          </div>
                        </aui-flexbox-item>
                        <aui-flexbox-item class="remindinfo">
                          <div class="title1">
                            <span>2、收益</span>
                          </div>
                          <div class="info">
                            <p>
                              交易日下午15：00前申购，下一个交易日开始计算收益。举例如下：
                            </p>
                            <div class="width: 100%;">
                              <aui-table class="table">
                                <thead>
                                <tr>
                                  <td>申购时间</td>
                                  <td>开始计算收益</td>
                                  <td>收益到账</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                  <td>周一15:00前</td>
                                  <td>周二</td>
                                  <td>周三</td>
                                </tr>
                                <tr>
                                  <td>周一15:00至周二15:00</td>
                                  <td>周三</td>
                                  <td>周四</td>
                                </tr>
                                <tr>
                                  <td>周二15:00至周三15:00</td>
                                  <td>周四</td>
                                  <td>周五</td>
                                </tr>
                                <tr>
                                  <td>周二15:00至周三15:00</td>
                                  <td>周四</td>
                                  <td>周五</td>
                                </tr>
                                <tr>
                                  <td>周三15:00至周四15:00</td>
                                  <td>周五</td>
                                  <td>周六</td>
                                </tr>
                                <tr>
                                  <td>周四15:00至周五15:00</td>
                                  <td>下周一</td>
                                  <td>下周二</td>
                                </tr>
                                <tr>
                                  <td>周五15:00至下周一15:00</td>
                                  <td>下周二</td>
                                  <td>下周三</td>
                                </tr>
                                </tbody>
                              </aui-table>
                            </div>
                            <p class="redFont">注：以上示例假定周一至周五均为交易日，如遇非交易日则相应顺延。</p>
                          </div>
                        </aui-flexbox-item>
                        <aui-flexbox-item class="remindinfo">
                          <div class="title1">
                            <span>3、赎回</span>
                          </div>
                          <div class="info">
                            <p>【快速赎回】：单日累计金额小于等于20万元时为快速赎回，一般十分钟内到账。</p>
                            <aui-table class="table">
                              <thead>
                              <tr>
                                <td>赎回至账户余额</td>
                                <td>赎回至银行卡</td>
                              </tr>
                              </thead>
                              <tbody>
                              <tr>
                                <td>十分钟内到账</td>
                                <td>两个小时到账</td>
                              </tr>
                              </tbody>
                            </aui-table>
                            <p class="redFont">
                              注：<br />
                              (1)快速赎回额度可能不时调整，最终请以网站页面显示为准。<br />
                              (2)快速赎回成功的金额，赎回当天不计收益。<br />
                              (3)以上时间仅供参考，最终以实际到账时间为准。<br />
                            </p>
                          </div>
                        </aui-flexbox-item>
                      </aui-flexbox>
                    </div>
                  </aui-swiper-item>
                  <!-- 投资须知 -->
                  <aui-swiper-item>
                    <div class="set-swiper-item">
                      <aui-flexbox orient="vertical">
                        <aui-flexbox-item class="remindinfo">
                          <div class="title1">
                            <span>投资团队</span>
                          </div>
                          <div class="info">
                            <p>
                              平安大华日增利货币基金以往的经营业绩不代表基金的未来业绩，
                              投资者购买货币市场基金不等于资金作为存款放在银行或存款类金融机构，
                              不保证一定盈利，也不保证最低收益。投资者谨慎操作，需仔细阅读基金合同和招募说明书等，
                              了解基金的具体情况，风险自担。在货币基金的申购和赎回过程中，
                              不排除由于网络或银行业务限制等原因，造成资金未能及时到账，因此产生的损失与风险由投资者自行承担，与陆金所无关。
                            </p>
                          </div>
                        </aui-flexbox-item>
                        <aui-flexbox-item class="remindinfo">
                          <div class="title1">
                            <span>其他事项</span>
                          </div>
                          <div class="info">
                            <p>
                              一、提前终止<br />
                              本产品主要投资与国债、央行票据、金融债、企业债等债券，及优质企业信托融资项目、货币市场基金、回购、新购申购、银行承兑汇票、本外币货币基金市场安全性交稿的其他投资管理工具等。投资风险较小。<br />
                              <br />
                              二、信息公告<br />
                              本产品流动性可与活期储蓄相媲美，具有“买入即时成交，即可享受收益；赎回瞬时入账，资金即时可用”的特点。具体可参见交易规则部分。<br />
                              <br />
                              三、特别提示<br />
                              银行将根据存款利率变动及资金运作情况不定期调整预期最高年收益率，并至少于新预期最高年化收益率启动前一个工作日公布。
                              本产品主要投资与国债、央行票据、金融债、企业债等债券，及优质企业信托融资项目、货币市场基金、回购、新购申购、
                              银行承兑汇票、本外币货币基金市场安全性交稿的其他投资管理工具等。投资风险较小。<br />
                            </p>
                          </div>
                        </aui-flexbox-item>
                      </aui-flexbox>
                    </div>
                  </aui-swiper-item>
                </aui-swiper>
              </div>
            </aui-flexbox-item>
            <aui-flexbox-item :span="4">
              <div class="flex-demo" style="height:100%">
                <div class="grids_cell">
                  <div class="grid_cell half_div" style="padding: 23px 0 0 1.56vw;">
                    <div class="fontS_18 fontC_gray">预期收益率</div>
                    <div class="fontS_24 fontC_red paddingTB_20">{{productList.profityearly}}%</div>
                  </div>
                  <div class="grid_cell half_div" style="padding: 23px 0 0 0.39vw;">
                    <div class="fontS_18 fontC_gray">起投金额</div>
                    <div class="fontS_24 fontC_red paddingTB_20">{{productList.buystart}}元起</div>
                  </div>
                  <div class="grid_cell half_div" style="padding: 0 0 0 1.56vw;border-bottom:2px solid #e5e5e5;">
                    <div class="fontS_18 fontC_gray">投资期限</div>
                    <div class="fontS_24 paddingTB_20">90天（无固定）</div>
                  </div>
                  <div class="grid_cell half_div" style="padding: 0 0 0 0.39vw;border-bottom:2px solid #e5e5e5;">
                    <div class="fontS_18 fontC_gray">投资期限</div>
                    <div class="fontS_24 paddingTB_20">{{productList.content}}</div>
                  </div>
                </div>
                <div>
                  <div class="grid_cell paddingTB_20 paddingLR_20">
                    <div class="fontS_18 fontC_gray" >风险等级：低风险</div>
                    <div class="fontS_18 fontC_gray" style="padding-top: 0.78vw;">投资人条件：风险承受能力保守型以上</div>
                  </div>
                  <div class="grid_cell paddingTB_20 paddingLR_20" style="text-align: center">
                    <img src="../../../static/image/iconQRcode.svg" style="width: 11.71vw;">
                  </div>
                  <div style="height: 2.34vw;"></div>
                </div>
              </div>
            </aui-flexbox-item>
          </aui-flexbox>
        </div>
      </div>
      <div slot="content" style="height: 100%;width: 100%;" v-if="displayFlag">
        <!--<productDisplay @displayHide="displayHide()"></productDisplay>-->
        <aui-component :is="isComponent"   @displayHide="detailHide()" :productid="productid" :productInfo="productList" ref="selectfood" ></aui-component>
      </div>
    </masker>

  </div>
</template>

<script type="text/ecmascript-6">

  import Masker from '../../components/masker'
  import shopDetileApi from  '../../common/api/shopShow.js'
  import themeColor from "@/../static/public-style/themeColor";  //引入主题颜色js文件
  const list = () => ['产品信息', '特别提醒', '交易规则', '投资须知']

  export default {
    name: 'product-detail',
    components: {
      Masker,
    },
    props: ['productid'],
    data() {
      return {
        displayFlag:false,
        List:{
          ProductName:'零活宝T+0',
          ProductCode:'1001002332',
          Warning:{
            RiskWarning: '',
            Liquidityarning:'',
            CommissionRate: '本产品不收取销售手续费。本产品的费用包括'
          }
        },
        selectedColor:themeColor.themeColorFont,
        isComponent:"", // 动态设置组件名称
        productList:'',
        //分页
        pageCtrl: {
          currpage: 1,   // 当前页码
          pagenum: 10,    // 显示条数
          pageflag: 4    // 4-分页状态
        },
        demo2: '产品信息',
        list2: list(),
        index: 0,
        swiperHeightStyle: 'height: ' + (window.screen.availHeight - 240) + 'px; overflow-y: auto; overflow-x: hidden;'
      }
    },
    mounted(){
      this.queryData(this.productid);
    },
    computed:{
      //是否禁用滑动组件
      swipeDisabled(){
        return this.canDrag;
      },
    },
    methods:{
      displayShow(params){
        this.displayFlag=true;
        this.isComponent = params;
      },
      displayHide(){
        this.displayFlag=false;
      },
      detailHide(){
        this.$emit('detailHide');
      },
      // 查询数据
      queryData (productid){
        let vm = this;
        let submintData = {},body={};
        body.productid = productid;
        body.PageCtrl = this.pageCtrl;
        submintData.body=JSON.stringify(body);
        shopDetileApi.shopDetileQuery(submintData,vm,function (rsp)  {
          let reutrnData = rsp
          vm.productList = reutrnData.productList[0];
        });
      },

    }


  }
</script>

<style scoped lang="less">
  @import '../../../static/public-style/theme-blue.less';
  .set-content{
    height:calc(~"100% - "66px);
    overflow: hidden;
    .set-btn{
      &:after{
        border:none;
      }
      border:1px solid #E5E5E5;
      height:40px;
      box-sizing: border-box;
    }
  }
  .set-content-bottom{
    border-top: 2px solid #F5F4F1;
    height:calc(~"100% - "46px);
    box-sizing: border-box;
    /deep/.aui-flexbox-item{
      height:100%;
    }
    .set-tab{
      height:44px;
      box-sizing: border-box;
      /deep/.aui-tab-item{
      }
    }
    .set-swiper-height{
      height:calc(~"100% - "44px);
      /deep/.aui-swiper{
        height:100%  !important;
      }
    }
    .set-swiper-item{
      font-size:14px;
      height:100%;
      overflow-y: auto;
      overflow-x: hidden;
      background-color: white;
    }
  }

  .product-detail{
    height:100%;
    background-color: white;
  }
  .flex-demo {
    background-color: white;
    border-radius: 3.97px;
    background-clip: padding-box;
  }
  /*swipper的tab页*/
  .fontS_20 {
    font-size: 18px !important;
  }
  .fontS_18 {
    font-size: 16px !important;
  }

  .font_content {
    font-size: 16px !important;
    color: #9E9C9C;
  }
  .cell_title {
    border-bottom: 1px solid #F5F4F1;
    /*letter-spacing: 0.38px;*/
    /*padding: 9.98px 0;*/
  }
  .border_bottom {
    border-bottom: 1px solid #f5f4f1;
  }
  .grids_cell{
    position: relative;
    overflow: hidden;
  }
  .grid_cell {
    position: relative;
    padding: 9.98px 9.98px;
    box-sizing: border-box;
  }
  .half_div {
    float: left;
    width: 50%;
    padding: 0 29.95px;
  }
  .fontC_gray {
    color: #9E9C9C !important;
  }
  .fontC_red {
    color: #ca261e !important;
  }
  .fontS_24 {
    font-size: 20px !important;
  }
  .paddingTB_20 {
    padding-top: 16.64px;
    padding-bottom: 16.64px;
  }
  .paddingLR_20 {
    padding-left: 19.97px;
    padding-right: 19.97px;
  }

  /*swiper-item*/
  .dt2_row{
    width: 100%;
    height: 50px;
    font-size: 15px;
    color: #4C4C4C;
    border-bottom: 1px solid #e5e5e5;
    line-height: 50px;
    padding: 0 2%;
    background-color: #FFFFFF;
  }
  .dt2_row span:nth-child(1){
    font-weight: 600;
  }
  .dt2_row span:nth-child(1){
    font-weight: 600;
  }

  .icon_cl{
    display: inline-block;
    width: 46.98px;
    background: #FF5C5C;
    border-radius: -1px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    color: #fff;
  }

  .content1 {
    line-height: 89.98px;
    display: inline-block;
  }
  .content1 span {
    display: block;
    height: 29.95px;
    line-height: 29.95px;
    padding-left: 10%;
    font-size: 16px;
    color: #333333;
    border-right: 1px solid #e5e5e5;
  }
  .content1 span:nth-child(1) {
    margin-top: 14.98px;
  }
  .content1 span:nth-child(2) {
    font-size: 18px;
    color: #FF5C5C;
  }

  .gathering {
    text-align: center;
    margin-top: 2%;
    margin-bottom: 4.99px;
  }
  .gathering span {
    width: 100%;
    font-size: 16px;
    font-family: STHeitiSC-Medium;
    color: #333333;
  }
  .gathering span:nth-child(2) {
    font-size: 18px;
    font-family: Arial-BoldMT;
    color: #FF5C5C;
  }
  .pr_row{
    width: 99%;
    margin-left: 1%;
    height: 24.96px;
  }
  .pr_row span:nth-child(1){
    font-size: 16px;
    color: #999999;
    margin-right: 9.98px;
  }
  .pr_row .pr_pr{
    background: #CCCCCC;
    width: 70%;
    height: 3.97px;
    display: inline-block;
    /* line-height: 19.97px; */
    margin-bottom: 4.99px;
  }
  .pr_row .pr_pr i{
    background: #FF5C5C;
    width: 68%;
    height: 3.97px;
    float: left;
  }
  .pr_wid{
    width: 10%;
    display: inline-block;
  }
  .pr_row b{
    width: 29.95px;
    height: 13.95px;
    background: #FF5C5C;
    border-radius: 1px 2px 2px 1px;
    color: #FFFFFF;
    line-height: 13.95px;
    float: left;
    font-size: 16px;
    text-align: center;
    margin-left: -4.99px;
  }
  .pr_wid .pr_sanjiao{
    width: 0;
    height: 0;
    border-top: 9px solid transparent;
    border-right: 9.98px solid #FF5C5C;
    border-bottom: 4.99px solid transparent;
    margin-left: 9.98px;
    float: left;
  }

  .prod_title {
    width: 100%;
    height: 40.0px;
    font-size: 16.0px;
    color: #4C4C4C;
    border-bottom: 1px solid #e5e5e5;
    line-height: 40.0px;
    padding: 0 1%;
    font-weight: 600;
  }

  .jijin_row{
    width: 100%;
    padding: 0 2%;
  }
  .jijin_row .jijin_box{
    width: 45%;
    line-height: 40.0px;
    height: 40.0px;
    display: inline-block;
    border-bottom: 1px dashed #E6E6E6;
  }
  .jijin_row .jijin_box span:nth-child(1){
    font-size: 15px;
    color: #999999;
    text-align: left;
    display: inline-block;
  }
  .jijin_row .jijin_box span:nth-child(2){
    font-size: 16px;
    color: #4C4C4C;
    display: inline-block;
    float: right;
  }

  .wenjian_row{
    width: 100%;
    line-height: 35px;
    padding: 0 3%;
    font-size: 13.95px;
    color: #00AAFF;
  }
  .wenjian_row img{
    vertical-align: middle;
  }
  .wenjian_row span{
    vertical-align: middle;
  }

  .remindinfo {
    margin-left: 2%;
    width: 98%;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    background-color: #FFFFFF;
  }
  .remindinfo .title1 {
    width: 100%;
    border-bottom:5px solid #e5e5e5;
    height: 40.0px;
    font-weight: 600;
    color: #4C4C4C;
    padding-left: 2%;
    font-size: 16.0px;
  }
  .remindinfo .info {
    width: 100%;
  }
  .remindinfo .info p {
    padding-left: 2%;
    font-size:14px;
    color: #666666;
    padding: 9.98px 2%;
  }
  .remindinfo .info .redFont {
    color: #FF5C5C;
  }
  .table {
    margin-left: 2%;
    margin-right: 2%;
    width: 96%;
  }
  .table thead {
    background-color: #FBF9FE;
  }
  .headerdiv{
    background-color: #E4E4E4;
    height: 50px;
  }

</style>

