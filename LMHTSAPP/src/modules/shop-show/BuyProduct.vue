<template>
  <div class="buy-product">
    <aui-header class="set-header" :showBack=false>
      <img slot="left" @click="hideMasker()" src="static/image/icon-fanhui-2.svg" alt="" style="width:2.34vw;margin-left: 2.34vw;;margin-top: -0.39vw;">
      <span style="font-size:1.88vw;letter-spacing: 0.39vw;font-family: 黑体;">购买</span>
    </aui-header>

    <aui-flexbox class="set-content" :gutter=0 align="stretch">
      <aui-flexbox-item :span="1/6" style="border-right: 1px solid #FFFFFF; background-color: #FFFFFF;">
        <!-- 左侧购买流程 -->
        <aui-flow orientation="vertical" class="set-flow" style="height:19.53vw; padding-left: 0; color: deepskyblue !important;">
          <aui-flow-state state="1" title="身份验证" :is-done="currentStep >= 0"></aui-flow-state>
          <aui-flow-line :is-done="currentStep > 0"></aui-flow-line>

          <aui-flow-state state="2" title="风险承诺" :is-done="currentStep >= 1"></aui-flow-state>
          <aui-flow-line :is-done="currentStep > 1"></aui-flow-line>

          <aui-flow-state state="3" title="订单确认" :is-done="currentStep >= 2"></aui-flow-state>
          <aui-flow-line :is-done="currentStep > 2"></aui-flow-line>

          <aui-flow-state state="4" title="打印凭证" :is-done="currentStep >= 3"></aui-flow-state>
          <aui-flow-line :is-done="currentStep > 3"></aui-flow-line>

          <aui-flow-state state="5" title="购买成功" :is-done="currentStep >= 4"></aui-flow-state>
        </aui-flow>
      </aui-flexbox-item>
      <aui-flexbox-item :span="5/6" style="padding: 0;background-color: #FFFFFF;">
        <!-- 右侧详细信息 -->
          <!-- 每一步详细信息 -->
          <div class="step-box">
            <!-- 第一步，确认客户信息 -->
            <transition name="slide-fade">
              <div v-if="currentStep == 0 && showCurrentStep">
                <aui-flexbox orient="vertical" :gutter=0>
                  <aui-flexbox-item>
                    <div class="info_title_step1">客户身份信息（请刷卡确认）</div>
                  </aui-flexbox-item>
                  <aui-flexbox-item>
                    <div class="line"></div>
                  </aui-flexbox-item>
                  <aui-flexbox-item>
                    <aui-flexbox>
                      <aui-flexbox-item :span="1/2">
                        <div class="info_content_step1">
                          <label>客户姓名</label>
                          <input placeholder="客户姓名" v-model="data.custname"/>
                        </div>
                      </aui-flexbox-item>
                      <aui-flexbox-item :span="1/2">
                        <div class="info_content_step1">
                          <label>卡号</label>
                          <input placeholder="卡号" v-model="data.cardno"/>
                        </div>
                      </aui-flexbox-item>
                    </aui-flexbox>
                  </aui-flexbox-item>
                  <aui-flexbox-item>
                    <aui-flexbox>
                      <aui-flexbox-item :span="1/2">
                        <div class="info_content_step1">
                          <label>证件类型</label>
                          <input placeholder="证件类型" v-model="data.idtype"/>
                        </div>
                      </aui-flexbox-item>
                      <aui-flexbox-item :span="1/2">
                        <div class="info_content_step1">
                          <label>理财账号</label>
                          <input placeholder="理财账号" v-model="data.financialcardno" style="color: #FF5C5C;"/>
                        </div>
                      </aui-flexbox-item>
                    </aui-flexbox>
                  </aui-flexbox-item>
                  <aui-flexbox-item>
                    <aui-flexbox>
                      <aui-flexbox-item :span="1/2">
                        <div class="info_content_step1">
                          <label>证件号码</label>
                          <input v-model="data.idno" placeholder="证件号码"/>
                        </div>
                      </aui-flexbox-item>
                      <aui-flexbox-item :span="1/2"></aui-flexbox-item>
                    </aui-flexbox>
                  </aui-flexbox-item>
                  <aui-flexbox-item>
                    <div class="info_tips_step1">
                      <p>温馨提示：您即将购买的是一款保守型的理财产品</p>
                      <p>适合风险等级为进取型、成长型、平衡型、稳健型、保守型的客户购买，投资有风险，入市需谨慎。购买前请清楚地了解产品的特点和风险。</p>
                    </div>
                  </aui-flexbox-item>
                  <aui-flexbox-item>
                    <div class="info_openAccount" v-if="!openAccount">
                      <div>
                        <button>开通交易账户</button>
                      </div>
                      <p>尊敬的客户，尚未开通交易账户，请协助客户开通交易账户</p>
                    </div>
                  </aui-flexbox-item>
                </aui-flexbox>
              </div>
            </transition>
            <!-- 第二步，风险承诺 -->
            <transition name="slide-fade">
              <div v-if="currentStep == 1 && showCurrentStep">
                <div style="width: 80%; margin-left: 12%;">
                  <aui-flexbox orient="vertical" :gutter=0>
                    <aui-flexbox-item>
                      <div class="info_title_step2">
                        风险承诺
                      </div>
                    </aui-flexbox-item>
                    <aui-flexbox-item>
                      <aui-group>
                        <aui-cell is-link title="XX银行个人理财产品协议书" style="color: #FF5C5C;font-size: 1.5vw"
                                  @click.native="options.showWin1 = !options.showWin1"></aui-cell>
                        <aui-cell is-link title="XX银行本外币理财产品章程" style="color: #FF5C5C;font-size: 1.5vw"
                                  @click.native="options.showWin2 = !options.showWin2"></aui-cell>
                      </aui-group>
                    </aui-flexbox-item>
                    <aui-flexbox-item>
                      <div class="info_content_step2">
                        <p>
                          本人已经阅读《XX银行个人理财产品协议书》和《XX银行本外币理财产品章程》及相应的产品说明书和风险提示，充分了解并清楚知晓本产品的风险，愿意承担相关的风险。
                        </p>
                      </div>
                    </aui-flexbox-item>
                    <aui-flexbox-item>
                      <div class="info_ck_step2">
                        <input type="checkbox" v-model="data.ensureRisk" id="ensureRisk"/>
                        <label for="ensureRisk">本人同意并遵守上述产品说明书和风险提示</label>
                      </div>
                    </aui-flexbox-item>
                  </aui-flexbox>
                </div>

                <!-- 银行个人理财产品协议书内容 -->
                <div v-transfer-dom>
                  <aui-popup v-model="options.showWin1" height="100%">
                    <div class="popupWin">
                      <div class="showWinTitle">
                        XX银行个人理财产品协议书
                      </div>
                      <div class="showWinContent">
                        <p>
                          “灵通快线”超短期产品是中国工商银行为满足投资者现金管理的需求，自行研发的的创新型理财产品，具有本金安全、流动性强、预期收益高的特点，使投资者提高闲置资金利用效率和收益水平的首先理财产品。
                        </p>

                        <p>
                          一、本金安全
                        </p>
                        <p>
                          本产品主要投资与国债、央行票据、金融债、企业债等债券，及优质企业信托融资项目、货币市场基金、回购、新购申购、银行承兑汇票、本外币货币基金市场安全性交稿的其他投资管理工具等。投资风险较小。
                        </p>

                        <p>
                          二、流动性强
                        </p>
                        <p>
                          本产品流动性可与活期储蓄相媲美，具有“买入即时成交，即可享受收益；赎回瞬时入账，资金即时可用”的特点。具体可参见交易规则部分。
                        </p>

                        <p>
                          三、预期收益较高
                        </p>
                        <p>
                          预期最高年华收益率（不含销售手续费，托管费、管理费）为1.45%。
                        </p>
                        <p>
                          银行将根据存款利率变动及资金运作情况不定期调整预期最高年收益率，并至少于新预期最高年化收益率启动前一个工作日公布。
                        </p>
                      </div>
                      <div class="closeWinBtn">
                        <button @click="options.showWin1 = !options.showWin1">同  意</button>
                      </div>
                    </div>
                  </aui-popup>
                </div>
                <div v-transfer-dom>
                  <aui-popup v-model="options.showWin2" height="100%">
                    <div class="popupWin">
                      <div class="showWinTitle">
                        XX银行本外币理财产品章程
                      </div>
                      <div class="showWinContent">
                        <p>
                          “灵通快线”超短期产品是中国工商银行为满足投资者现金管理的需求，自行研发的的创新型理财产品，具有本金安全、流动性强、预期收益高的特点，使投资者提高闲置资金利用效率和收益水平的首先理财产品。
                        </p>

                        <p>
                          一、本金安全
                        </p>
                        <p>
                          本产品主要投资与国债、央行票据、金融债、企业债等债券，及优质企业信托融资项目、货币市场基金、回购、新购申购、银行承兑汇票、本外币货币基金市场安全性交稿的其他投资管理工具等。投资风险较小。
                        </p>

                        <p>
                          二、流动性强
                        </p>
                        <p>
                          本产品流动性可与活期储蓄相媲美，具有“买入即时成交，即可享受收益；赎回瞬时入账，资金即时可用”的特点。具体可参见交易规则部分。
                        </p>

                        <p>
                          三、预期收益较高
                        </p>
                        <p>
                          预期最高年华收益率（不含销售手续费，托管费、管理费）为1.45%。
                        </p>
                        <p>
                          银行将根据存款利率变动及资金运作情况不定期调整预期最高年收益率，并至少于新预期最高年化收益率启动前一个工作日公布。
                        </p>
                      </div>
                      <div class="closeWinBtn">
                        <button @click="options.showWin2 = !options.showWin2">同  意</button>
                      </div>
                    </div>
                  </aui-popup>
                </div>
              </div>
            </transition>
            <!-- 第三步，订单确认 -->
            <transition name="slide-fade">
              <div v-if="currentStep == 2 && showCurrentStep">
                <aui-flexbox orient="vertical" :gutter=0>
                  <aui-flexbox-item>
                    <div class="info_title_step1">订单确认</div>
                  </aui-flexbox-item>
                  <aui-flexbox-item>
                    <div class="line"></div>
                  </aui-flexbox-item>
                  <aui-flexbox-item>
                    <aui-flexbox :gutter=0 align="stretch">
                      <aui-flexbox-item :span="1/2" style="margin-right: 0.39vw;">
                        <aui-flexbox orient="vertical" :gutter=0>
                          <aui-flexbox-item>
                            <div class="step3_leftinfo">
                              <label>请输入购买金额</label>
                              <label>元</label>
                              <input placeholder="购买金额" v-model="data.purchaseFigure"/>
                            </div>
                          </aui-flexbox-item>
                          <aui-flexbox-item>
                            <aui-group class="set-switch">
                              <aui-switch title="到期后是否自动投入下期产品" v-model="data.carryforward"></aui-switch>
                            </aui-group>
                          </aui-flexbox-item>
                          <aui-flexbox-item>
                            <div class="step3_leftinfo">
                              <label>自动再投资类型</label>
                              <select v-model="data.reinvestmentType">
                                <option v-for="item in select.reinvestmentType" :value="item.key">{{item.value}}
                                </option>
                              </select>
                            </div>
                          </aui-flexbox-item>
                          <aui-flexbox-item>
                            <div class="step3_leftinfo">
                              <label>自动再投资金额</label>
                              <label>元</label>
                              <input placeholder="自动再投资金额" v-model="data.reinvestmentFigure"/>
                            </div>
                          </aui-flexbox-item>
                        </aui-flexbox>
                      </aui-flexbox-item>
                      <aui-flexbox-item :span="1/2" style="margin-left: 0.39vw;">
                        <aui-flexbox orient="vertical" :gutter="0">
                          <aui-flexbox-item>
                            <div class="info_content_step3">
                              <label class="leftlabel">产品代码</label>
                              <label class="rightlabel">{{productInfo.productcode}}</label>
                            </div>
                          </aui-flexbox-item>
                          <aui-flexbox-item>
                            <div class="info_content_step3">
                              <label class="leftlabel">产品名称</label>
                              <label class="rightlabel">{{productInfo.productname}}</label>
                            </div>
                          </aui-flexbox-item>
                          <aui-flexbox-item>
                            <div class="info_content_step3">
                              <label class="leftlabel">币种</label>
                              <label class="rightlabel">人民币</label>
                            </div>
                          </aui-flexbox-item>
                          <aui-flexbox-item>
                            <div class="info_content_step3">
                              <label class="leftlabel">购买价格</label>
                              <label class="rightlabel">{{productInfo.buystart}}.00</label>
                            </div>
                          </aui-flexbox-item>
                          <aui-flexbox-item>
                            <div class="info_content_step3">
                              <label class="leftlabel">起购金额</label>
                              <label class="rightlabel">{{productInfo.buystart}}.00</label>
                            </div>
                          </aui-flexbox-item>
                          <aui-flexbox-item>
                            <div class="info_content_step3">
                              <label class="leftlabel">交易级差金额</label>
                              <label class="rightlabel">800.00</label>
                            </div>
                          </aui-flexbox-item>
                          <aui-flexbox-item>
                            <div class="info_content_step3">
                              <label class="leftlabel">追加认申购最低金额</label>
                              <label class="rightlabel">10,000.00</label>
                            </div>
                          </aui-flexbox-item>
                          <aui-flexbox-item>
                            <div class="info_content_step3">
                              <label class="leftlabel">购买申请是否允许微单</label>
                              <label class="rightlabel">否</label>
                            </div>
                          </aui-flexbox-item>
                        </aui-flexbox>
                      </aui-flexbox-item>
                    </aui-flexbox>
                  </aui-flexbox-item>

                </aui-flexbox>
              </div>
            </transition>
            <!-- 打印凭证 -->
            <transition name="slide-fade">
              <div v-if="currentStep == 3 && showCurrentStep">
                <div class="info_title_step1">凭证打印</div>
                <div class="line"></div>
                <div style="padding: 1%; font-size: 1.406vw;">
                  <aui-table :full-bordered=true class="custom_table">
                    <tr>
                      <td>申请单号</td>
                      <td>10011907020099826</td>
                      <td>网点号</td>
                      <td>1907</td>
                    </tr>
                    <tr>
                      <td>交易单号</td>
                      <td>6222 0210 0130 7603 195</td>
                      <td>客户姓名</td>
                      <td>伊泽民</td>
                    </tr>
                    <tr>
                      <td>日期</td>
                      <td>2010-11-30 15:30:35</td>
                      <td>业务类型</td>
                      <td>理财-购买</td>
                    </tr>
                    <tr>
                      <td>产品代码</td>
                      <td>{{procode}}</td>
                      <td>产品名称</td>
                      <td>{{prod.pro_name}}</td>
                    </tr>
                    <tr>
                      <td>份额</td>
                      <td>15,000</td>
                      <td>理财终端号</td>
                      <td>00224607DC01</td>
                    </tr>
                  </aui-table>

                  <!-- 打印凭证按钮 -->
                  <div class="prtBtn">
                    <button>打印凭证</button>
                  </div>
                </div>

              </div>
            </transition>
            <!-- 购买成功 -->
            <transition name="slide-fade">
              <div v-if="currentStep == 4 && showCurrentStep">
                <aui-flexbox :gutter=0 orient="vertical">
                  <aui-flexbox-item>
                    <div class="info_title_step5">
                      <img src="static/image/icon_success.svg"/>
                      <span>购买成功</span>
                    </div>
                  </aui-flexbox-item>
                  <aui-flexbox-item>
                    <div class="info_tips1_step5">
                      恭喜您，您已成功购买该理财产品。您可以在我行网站或App，查询您购买的理财产品。
                    </div>
                  </aui-flexbox-item>
                  <aui-flexbox-item>
                    <div class="qrcode_step5">
                      <img src="static/image/shopShow/qrcode.png"/>
                    </div>
                  </aui-flexbox-item>
                  <aui-flexbox-item>
                    <div class="info_tips2_step5">
                      <p>尊敬的客户</p>
                      <p>你可以通过手机银行扫描二维码查看该订单</p>
                    </div>
                  </aui-flexbox-item>
                </aui-flexbox>
              </div>
            </transition>
          </div>
          <!-- 上一步和下一步按钮 -->
          <div class="btnPosition">
            <aui-flexbox :gutter=20>
              <aui-flexbox-item :span="13/20"></aui-flexbox-item>
              <aui-flexbox-item :span="3/20">
                <aui-button :disabled="!showCurrentStep" @click.native="preStep"
                            v-if="currentStep != 0 && currentStep != 4 && openAccount" style="font-size: 1.5vw">上一步
                </aui-button>
              </aui-flexbox-item>
              <aui-flexbox-item :span="3/20" style="">
                <aui-button @click.native="nextStep" type="warn" v-if="currentStep != 4 && openAccount" style="font-size: 1.5vw">下一步</aui-button>
                <aui-button :disabled="!showCurrentStep" type="warn" @click.native="hideMasker" v-if="currentStep == 4" style="font-size: 1.5vw">
                  完  成
                </aui-button>
              </aui-flexbox-item>
              <aui-flexbox-item :span="1/20"></aui-flexbox-item>
            </aui-flexbox>
          </div>
      </aui-flexbox-item>
    </aui-flexbox>
  </div>
</template>

<script>
  export default {
    name: 'buy-product',
    props: {
      productInfo: [String, Object]
    },
    data () {
      return {
        procode: '',
        currentStep: 0,
        showCurrentStep: true,
        openAccount: true,
        data: {
          custname: '',
          cardno: '',
          idtype: '身份证',
          financialcardno: '',
          idno: '',
          personalFinalcial1: [],
          personalFinalcial2: [],
          ensureRisk: '',
          purchaseFigure: 0,
          carryforward: true,
          reinvestmentType: '1',
          reinvestmentFigure: 0
        },
        select: {
          reinvestmentType: [{key: '1', value: '部分再投'}, {key: '2', value: '全部再投'}]
        },
        options: {
          checkLabelPosition: 'left',
          showWin1: false,
          showWin2: false
        },
        riskEnsure1: ['中国工商银行个人理财产品协议书'],
        prod: {}
      };
    },
    mounted () {
    },
    methods: {
      hideMasker(){
        this.$emit('displayHide');
      },
      preStep () {
        let _this = this;
        this.showCurrentStep = false;

        setTimeout(function () {
          _this.currentStep--;
          _this.showCurrentStep = true;
        }, 500);
      },
      nextStep () {
        let _this = this;
        this.showCurrentStep = false;

        setTimeout(function () {
          _this.currentStep++;
          _this.showCurrentStep = true;
        }, 500);
      },
      doneBuy () {
        let url = '/main/shopShow/0';
        this.$router.push({
          path: url,
          replace: true
        })
      }
    },
    activated(){
        this.currentStep = 0;
    },
    created () {
      this.procode = this.$route.params.procode;
    }
  }
</script>

<style scoped lang="less">
  @r:163.84px;
  /*容器属性*/
  .buy-product {
    width: 100%;
    height:100%;
    overflow-x: hidden;
  }
  /*主内容高度*/
  .set-content{
    height:calc(~"100% - "46px);
  }
  /*流程样式*/
  .set-flow{
    /deep/p{
      font-size:14px;
    }
  }
  /*步骤位置*/
  .step-box{
    width: 100%;
    overflow-x: hidden;
    height:550px;
  }
  /*底部按钮位置*/
  .btnPosition {
    margin-left:20%;
    width: 75%;
    height:calc(~"100% - "550px);
  }
  /*修改switch样式*/
  .set-switch{
    height: 48px;
    line-height: 48px;
    margin: 2.5% 15px;
    border: 1px solid #E6E6E6;
    padding-left: 1%;
    padding-right: 1%;
    /deep/.aui-cells{
      margin-top:0;
      font-size: 16px;
      font-family: PingFangSC-Regular;
      height:100%;
      color: #999999;
      &:before{
        border:none;
      }
      &:after{
        border:none;
      }
      .aui-cell{
        padding-left:5px;
      }
    }
  }





  .proList_header {
    height: 3.51vw;
    background: #1D2128;
    line-height: 3.51vw;
    color: #fff;
  }

  .line {
    width: 100%;
    height: 1px;
    border-top: 1px solid #EEEEEE;
  }

  .info_title_step1 {
    font-family: PingFangSC-Medium;
    color: #4C4C4C;
    font-size: 1.56vw;
    line-height: 4.29vw;
    font-weight: 600;
    height: 4.69vw;
    padding-left: 2%;
  }

  .info_content_step1 {
    height: 3.75vw;
    line-height: 3.75vw;
    margin: auto 1%;
    border-bottom: 1px dashed #E6E6E6;
  }

  .info_content_step1 label {
    font-size: 1.25vw;
    font-family: PingFangSC-Regular;
    line-height: 3.51vw;
    color: #999999;
    float: left;
    width: 25%;
    margin-left: 2%;
  }

  .info_content_step1 input {
    font-size: 1.25vw;
    font-family: PingFangSC-Regular;
    line-height: 3.51vw;
    text-align: right;
    color: #333333;
    float: right;
    padding-right: 5%;
    padding-left: 5%;
    width: 63%;
    border: 0px;
    outline: 0px;
  }

  .info_tips_step1 {
    margin-top: 3%;
    padding-left: 2%;
    font-size: 1.4vw;
  }

  .info_tips_step1 p {
    font-family: PingFangSC-Regular;
    color: #999999;
    line-height: 1.406vw;
  }

  .info_title_step2 {
    font-family: PingFangSC-Medium;
    color: #4C4C4C;
    font-size: 1.56vw;
    line-height: 3.44vw;
    font-weight: 600;
    height: 3.125vw;
    text-align: center;
  }

  .info_content_step2 {
    height: 3.51vw;
    padding-left: 2%;
    padding-right: 1%;
    margin: 0;
    font-size: 1.4vw;
  }

  .info_content_step2 p {
    margin-top: 3%;
    font-family: PingFangSC-Regular;
    color: #999999;
    line-height: 1.406vw;
  }

  .info_ck_step2 {
    position: relative;
    margin-bottom: 1.56vw;
    margin-left: 2%;
    font-family: PingFangSC-Regular;
    color: #4C4C4C;
    font-size: 1.56vw;
    margin-top: 1.56vw;
  }

  .info_ck_step2 label {
    margin-left: 1%;
  }

  /*第三步左侧信息样式*/
  .step3_leftinfo {
    height: 3.75vw;
    line-height: 3.75vw;
    margin: 2.5% 1.17vw;
    border: 1px solid #E6E6E6;
    padding-left: 1%;
  }

  .step3_leftinfo label:nth-child(1) {
    font-size: 1.25vw;
    font-family: PingFangSC-Regular;
    line-height: 3.51vw;
    color: #999999;
    float: left;
    width: 40%;
  }

  .step3_leftinfo label:nth-child(2) {
    width: 1.56vw;
    font-size: 1.25vw;
    font-family: PingFangSC-Regular;
    line-height: 3.51vw;
    color: #999999;
    float: right;
  }

  .step3_leftinfo select {
    font-size: 1.25vw;
    font-family: PingFangSC-Regular;
    float: right;
    margin-top: 1%;
    height: 3.125vw;
    width: 30%;
    border: 0px;
    text-align: right;
    padding: 0.2em 0.4em 0.2em 0.4em;
    text-indent: 4pt;
    background-color: #FFFFFF;
  }

  .step3_leftinfo input {
    font-size: 1.25vw;
    font-family: PingFangSC-Regular;
    line-height: 3.51vw;
    text-align: right;
    color: #333333;
    float: right;
    padding-right: 5%;
    padding-left: 5%;
    width: 45%;
    border: 0px;
    outline: 0px;
  }

  .info_content_step3 {
    height: 3.75vw;
    line-height: 3.75vw;
    margin: auto 1%;
    width: 95%;
    /*height: 8%;*/
    border-bottom: 1px dashed #E6E6E6;
  }

  .info_content_step3 .leftlabel {
    font-size: 1.25vw;
    font-family: PingFangSC-Regular;
    line-height: 3.51vw;
    text-align: left;
    color: #999999;
    float: left;
  }

  .info_content_step3 .rightlabel {
    font-size: 1.25vw;
    font-family: PingFangSC-Regular;
    line-height: 3.51vw;
    color: #333333;
    float: right;
    text-align: right;
    margin-right: 3%;
  }

  /*购买成功标题*/
  .info_title_step5 {
    width: 100%;
    margin-top: 2%;
    text-align: center;
  }

  .info_title_step5 img {
    height: 1.72vw;
    width: 1.72vw;
    position: relative;
    top: 3px;
  }

  .info_title_step5 span {
    position: relative;
    left: 0.78vw;
    color: #FF5C5C;
    font-family: PingFangSC-Medium;
    font-size: 1.56vw;
    line-height: 1.875vw;
  }

  /*购买成功提示*/
  .info_tips1_step5 {
    width: 100%;
    text-align: center;
    color: #999999;
    margin-top: 2%;
    font-size: 1.25vw;
  }

  /*二维码*/
  .qrcode_step5 {
    border: 1px solid #E6E6E6;
    padding:20px;
    text-align: center;
    border-radius: 0.78vw;
    width:220px;
    height:220px;
    box-sizing: border-box;
    margin:15px auto;
    img{
      width:178px;
      height:178px;
    }
  }

  .info_tips2_step5 {
    width: 100%;
    text-align: center;
    margin-top: 2%;
    font-size: 1.25vw;
  }

  .info_tips2_step5 p {
    text-align: center;
    color: #FF5C5C;
  }

  .info_openAccount {
    margin-top: 3%;
  }

  .info_openAccount button {
    width: 20%;
    height: 3.28vw;
    background-color: #00AAFF;
    border: 0px;
    border-radius: 0.78vw;
    font-size: 1.406vw;
    color: #FFFFFF;
  }

  .info_openAccount p {
    margin-top: 1%;
    font-family: PingFangSC-Regular;
    color: #999999;
    line-height: 1.406vw;
  }

  /*设置输入框的placeholder样式*/
  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    text-align: right;
  }

  input:-moz-placeholder, textarea:-moz-placeholder {
    text-align: right;
  }

  input::-moz-placeholder, textarea::-moz-placeholder {
    text-align: right;
  }

  input:-ms-input-placeholder, textarea:-ms-input-placeholder {
    text-align: right;
  }

  /*动画效果相关的css*/
  .slide-fade-enter-active {
    transition: all .2s ease;
  }

  .slide-fade-leave-active {
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter {
    transform: translateX(20%);
    opacity: 0;
  }

  .slide-fade-leave-active {
    transform: translateX(-20%);
    opacity: -10;
  }

  /*表格相关样式*/
  .table tr > td:nth-of-type(odd) {
    background: #FAFAFA;
  }

  .table tr > td:nth-child(1) {
    border-left: 1px solid #e0e0e0;
  }


  /*弹窗样式*/
  .popupWin {
    height: 100%;
    width: 100%;
    background-color: #FFFFFF;
    overflow:hidden;
  }

  /*弹窗标题*/
  .showWinTitle {
    height:60px;
    box-sizing: border-box;
    line-height:40px;
    padding:10px 0;
    text-align: center;
    font-family: PingFangSC-Medium;
    font-size: 1.8vw;
    color: #4C4C4C;
    border-bottom: 1px solid #E6E6E6;
  }

  /*弹窗内容*/
  .showWinContent {
    height:calc(~"100% - "160px);
    overflow-y: auto;
    font-family: PingFangSC-Regular;
    font-size: 1.406vw;
    line-height: 1.56vw;
    padding: 1% 5%;
  }

  .showWinContent p {
    line-height: 2.39vw;
    margin-top: 8px;
    text-indent: 2em;
  }

  /*弹窗下面按钮*/
  .closeWinBtn {
    font-size:16px;
    width: 100%;
    height: 100px;
    text-align: center;
  }

  .closeWinBtn button {
    width: 20%;
    background-color: #00AAFF;
    border-radius: 0.39vw;
    height: 3.125vw;
    color: #FFFFFF;
    font-family: PingFangSC-Regular;
    font-size: 1.56vw;
    border: 0px;
  }

  /*打印凭证按钮*/
  .prtBtn {
    border: 0px solid #000000;
    margin-top: 3%;
    height: 4.69vw;
    text-align: right;
  }

  .prtBtn button {
    background-color: #00AAFF;
    color: #FFFFFF;
    border: 0px;
    border-radius: 0.31vw;
    height: 2.73vw;
    font-size: 1.56vw;
    width: 11.56vw;
  }

  /*打印凭证表格*/
  .custom_table {
    border-left: 1px solid #E4E4E4;
  }

  .custom_table tr > td {
    text-align: left;
    padding-left: 1.17vw;
  }

  .custom_table tr > td:nth-child(odd) {
    background-color: #FAFAFA;
  }
</style>

