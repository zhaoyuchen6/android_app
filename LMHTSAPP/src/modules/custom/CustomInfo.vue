<template>
  <div class="container">
    <div class="userRight">
      <div class="kk_row">
        <span class="am-fl" style="margin-left: 1.2vw">客户基本信息</span>
        <span class="am-fr am-00" style="margin-right: 1.2vw; ">接触记录</span>
      </div>
      <aui-flexbox :gutter=0 justify="space-between" align="center">
        <aui-flexbox-item>
          <div class="plan_row">
            <div class="plan_name plan_red">{{cust_short_name}}</div>
            <div class="play_text">
              <h6 class="play_title">{{cust_name}}</h6>
              <div class="play_time">
                <span style="font-size: 1.1vw">{{cust_grade}} {{contact_tele}}</span>
              </div>
            </div>
          </div>
        </aui-flexbox-item>
        <aui-flexbox-item :span="4/10">
          <aui-flexbox class="contact-info" @click.native="clickCustom()" align="center">
            <aui-flexbox-item>
              <img src="static/image/custom/icon_duanxin.svg">
              <span>电话</span>
            </aui-flexbox-item>
            <aui-flexbox-item>
              <img src="static/image/custom/icon_duanxin.svg">
              <span>短信</span>
            </aui-flexbox-item>
            <aui-flexbox-item>
              <img src="static/image/custom/icon_youjian.svg">
              <span>邮件</span>
              <img src="static/image/custom/rightjiantou.png">
            </aui-flexbox-item>
          </aui-flexbox>
        </aui-flexbox-item>
      </aui-flexbox>
      <div class="line" style="margin-left: 2%"></div>
      <div class="kk_gbox">
        <div class="gbox_row">
          <label>客户签约</label>
          <span class="kk_btn">理财产品</span>
          <span class="kk_btn">基金</span>
          <span class="kk_btn">网上银行</span>
          <span class="kk_btn kk_btn-grey">手机银行</span>
          <span class="kk_btn kk_btn-grey">储蓄国债</span>
          <span class="kk_btn kk_btn-grey">直销银行</span>
        </div>
        <div class="gbox_row">
          <label>客户标签</label>
          <span class="kk_btn" v-for="item in labelInfoList" v-if="item.label_name!=null">{{item.label_name}}</span>
        </div>
        <div class="gbox_row">
          <label>营销活动</label>
          <span class="kk_btn" v-for="item in activityInfoList" v-if="item.activity_name!=null" :key="item.index">{{item.activity_name}}</span>
        </div>
      </div>
      <div class="kk_row_zz">
        <span class="am-98">适合推荐产品：</span>
        <span class="am-00">珠联璧合</span>
        <span class="am-00">鑫薪卡</span>
      </div>
    </div>
    <div class="user-detail">
      <!-- 客户详情 -->
      <aui-tab v-model="prodInfoIndex"  :line-width="3" :scroll-threshold="6" custom-bar-width="80%" bar-active-color="#00AAFF">
        <aui-tab-item selected @on-item-click="clickTabItem" class="tab-span" >客户资产统计</aui-tab-item>
        <aui-tab-item @on-item-click="clickTabItem" class="tab-span" >持有产品信息</aui-tab-item>
        <aui-tab-item @on-item-click="clickTabItem" class="tab-span" >联系信息</aui-tab-item>
        <aui-tab-item @on-item-click="clickTabItem" class="tab-span" >归属信息</aui-tab-item>
        <aui-tab-item @on-item-click="clickTabItem" class="tab-span" >沟通记录</aui-tab-item>
        <aui-tab-item @on-item-click="clickTabItem" class="tab-span" >评价</aui-tab-item>
      </aui-tab>
      <div class="table_one_row"></div>
      <aui-swiper v-model="prodInfoIndex" class="swiper-height" :show-dots="false">
        <!-- 客户资产统计 -->
        <aui-swiper-item>
          <div class="kk_ifrow_title" style="border-bottom: 1px dashed #e5e5e5">
            <span class="am-fl" style="font-size: 1.3vw">客户资产占比分布</span>
            <span class="am-fs">时余节点</span>
          </div>
          <aui-flexbox style="height: 23.4vw;" :gutter="0">
            <aui-flexbox-item style="height:100%">
              <!-- <chart :options="pie" ref="pie" style="width:100%;height:100%"></chart> -->
              <div ref="drawPie" class="set-chart"></div>
            </aui-flexbox-item>
            <aui-flexbox-item style="height:100%">
              <!-- <chart :options="fzpie" ref="pie" style="width:100%;height:100%"></chart> -->
              <div ref="drawFzPie" class="set-chart"></div>
            </aui-flexbox-item>
          </aui-flexbox>
          <div class="table_one_row"></div>
          <div class="kk_ifrow_title" style="border-bottom: 0">
            <span class="am-fl ">消费</span>
            <span class="am-fs">金额单位：元</span>
          </div>
          <div>
            <aui-table :cell-bordered="false" :content-bordered="false">
              <thead>
                <tr class="tab_head">
                  <th style="border-right: 0.5px solid #f5f5f5;width: 20%">分类</th>
                  <th style="width: 20%">当月累计金额</th>
                  <th style="width: 20%">比上月</th>
                  <th style="width: 20%">当年累计消费金额</th>
                  <th style="width: 20%">比上年</th>
                </tr>
              </thead>
              <tbody v-for="(item, index) in creditInfoList" style="border-style:none;" class="tab_body">
                <tr v-if="index%2==0">
                  <td>{{item.name}}</td>
                  <td style="background-color: #f5f5f5">{{item.dyljxfje}}</td>
                  <td style="background-color: #f5f5f5">{{item.bsy}}</td>
                  <td style="background-color: #f5f5f5">{{item.dnljxfje}}</td>
                  <td style="background-color: #f5f5f5">{{item.bsn}}</td>
                </tr>
                <tr v-if="index%2==1">
                  <td>{{item.name}}</td>
                  <td style="background-color:#fafafa">{{item.dyljxfje}}</td>
                  <td style="background-color:#fafafa">{{item.bsy}}</td>
                  <td style="background-color:#fafafa">{{item.dnljxfje}}</td>
                  <td style="background-color:#fafafa">{{item.bsn}}</td>
                </tr>
              </tbody>
            </aui-table>
          </div>
          <div class="table_one_row"></div>
          <div class="kk_ifrow_title" style="border-bottom: 0">
            <span class="am-fl ">当月大额交易</span>
            <span class="am-fs">金额单位：元</span>
          </div>
          <div>
            <aui-table :cell-bordered="false" :content-bordered="false">
              <thead>
                <tr class="tab_head">
                  <th style="border-right: 0.5px solid #f5f5f5;width: 20%">分类</th>
                  <th style="width: 20%">交易时间</th>
                  <th style="width: 20%">交易账户</th>
                  <th style="width: 20%">交易类型</th>
                  <th style="width: 20%">交易金额</th>
                </tr>
              </thead>
              <tbody class="tab_body">
                <tr>
                  <td>大额支出</td>
                  <td style="background-color: #f5f5f5">2016年</td>
                  <td style="background-color: #f5f5f5">6217*********321</td>
                  <td style="background-color: #f5f5f5">跨行转出</td>
                  <td style="background-color: #f5f5f5">5000元</td>
                </tr>
                <tr>
                  <td>大额收入</td>
                  <td style="background-color: #fafafa">2016年</td>
                  <td style="background-color: #fafafa">6217*********321</td>
                  <td style="background-color: #fafafa">跨行转出</td>
                  <td style="background-color: #fafafa">5000元</td>
                </tr>
              </tbody>
            </aui-table>
          </div>
        </aui-swiper-item>
        <!-- 持有产品信息 -->
        <aui-swiper-item>
          <div class="kk_row">
            <span class="am-fl">持有产品明细</span>
            <span class="am-fr am-00" style="margin-right: 1.2vw;">历史持有产品</span>
          </div>
          <div>
            <aui-table :cell-bordered="false" :content-bordered="false">
              <thead>
                <h3>借记卡</h3>
                <tr class="tab_head">
                  <th style="border-right: 0.5px solid #f5f5f5">卡号</th>
                  <th>卡级别</th>
                  <th>开卡日期</th>
                  <th>开卡机构</th>
                  <th>卡介质</th>
                  <th>相关合约</th>
                </tr>
              </thead>
              <tbody v-for="(item,index) in cardList" class="tab_body">
                <tr v-if="index%2==0">
                  <td>{{item.cardno}}</td>
                  <td style="background-color: #f5f5f5">{{item.cardlevel}}</td>
                  <td style="background-color: #f5f5f5">{{item.open_date}}</td>
                  <td style="background-color: #f5f5f5">{{item.org_name}}</td>
                  <td style="background-color: #f5f5f5">{{item.cardmedium}}</td>
                  <td style="background-color: #f5f5f5">{{item.relacontract}}</td>
                </tr>
                <tr v-if="index%2==1">
                  <td>{{item.cardno}}</td>
                  <td style="background-color: #fafafa">{{item.cardlevel}}</td>
                  <td style="background-color: #fafafa">{{item.open_date}}</td>
                  <td style="background-color: #fafafa">{{item.org_name}}</td>
                  <td style="background-color: #fafafa">{{item.cardmedium}}</td>
                  <td style="background-color: #fafafa">{{item.relacontract}}</td>
                </tr>
              </tbody>
            </aui-table>
          </div>
          <div>
            <aui-table :cell-bordered="false" :content-bordered="false">
              <thead>
                <h3>信用卡</h3>
                <tr class="tab_head">
                  <th style="border-right: 0.5px solid #f5f5f5">卡号</th>
                  <th>卡片种类</th>
                  <th>开卡日期</th>
                  <th>信用额度</th>
                  <th>可用额度</th>
                  <th>还款日期</th>
                  <th>账单日</th>
                </tr>
              </thead>
              <tbody v-for="(item,index) in creditcardList" class="tab_body">
                <tr v-if="index%2==0">
                  <td>{{item.cardno}}</td>
                  <td style="background-color: #f5f5f5">{{item.card_type}}</td>
                  <td style="background-color: #f5f5f5">{{item.open_date}}</td>
                  <td style="background-color: #f5f5f5">{{item.credit_limit}}</td>
                  <td style="background-color: #f5f5f5">{{item.unuse_credit_limit}}</td>
                  <td style="background-color: #f5f5f5">{{item.pay_date}}</td>
                  <td style="background-color: #f5f5f5">{{item.bill_date}}</td>
                </tr>
                <tr v-if="index%2==1">
                  <td>{{item.cardno}}</td>
                  <td style="background-color: #fafafa">{{item.card_type}}</td>
                  <td style="background-color: #fafafa">{{item.open_date}}</td>
                  <td style="background-color: #fafafa">{{item.credit_limit}}</td>
                  <td style="background-color: #fafafa">{{item.unuse_credit_limit}}</td>
                  <td style="background-color: #fafafa">{{item.pay_date}}</td>
                  <td style="background-color: #fafafa">{{item.bill_date}}</td>
                </tr>
              </tbody>
            </aui-table>
          </div>
          <div>
            <aui-table :cell-bordered="false" :content-bordered="false">
              <thead>
                <h3>理财</h3>
                <tr class="tab_head">
                  <th style="border-right: 0.5px solid #f5f5f5">产品名称</th>
                  <th>购买日期</th>
                  <th>收益起始日</th>
                  <th>收益到期日</th>
                  <th>持有金额</th>
                  <th>预期年化收益率</th>
                  <th>实际年化收益率</th>
                  <th>冻结份额</th>
                </tr>
              </thead>
              <tbody v-for="(item,index) in finbindFormList" class="tab_body">
                <tr v-if="index%2==0">
                  <td>{{item.fproductname}}</td>
                  <td style="background-color: #f5f5f5">{{item.buydate}}</td>
                  <td style="background-color: #f5f5f5">{{item.incomestartdate}}</td>
                  <td style="background-color: #f5f5f5">{{item.incomeenddate}}</td>
                  <td style="background-color: #f5f5f5">{{item.balance}}</td>
                  <td style="background-color: #f5f5f5">{{item.expecyearrate}}</td>
                  <td style="background-color: #f5f5f5">{{item.realyearrate}}</td>
                  <td style="background-color: #f5f5f5">{{item.vol}}</td>
                </tr>
                <tr v-if="index%2==1">
                  <td>{{item.fproductname}}</td>
                  <td style="background-color: #fafafa">{{item.buydate}}</td>
                  <td style="background-color: #fafafa">{{item.incomestartdate}}</td>
                  <td style="background-color: #fafafa">{{item.incomeenddate}}</td>
                  <td style="background-color: #fafafa">{{item.balance}}</td>
                  <td style="background-color: #fafafa">{{item.expecyearrate}}</td>
                  <td style="background-color: #fafafa">{{item.realyearrate}}</td>
                  <td style="background-color: #fafafa">{{item.vol}}</td>
                </tr>
              </tbody>
            </aui-table>
          </div>
        </aui-swiper-item>
        <!--联系信息-->
        <aui-swiper-item>
          <div class="kk_row">
            <div class="kk_ifrow_title">
              <span class="am-fl">客户联系信息</span>
            </div>
            <div class="jijin_row">
              <div class="jijin_box">
                <span>手机号</span>
                <span class="contact_tele">{{contact_tele}}</span>
              </div>
              <div class="jijin_box" style="margin-left: 8%">
                <span>QQ</span>
                <span>null</span>
              </div>
            </div>
            <div class="jijin_row">
              <div class="jijin_box">
                <span>住宅电话</span>
                <span>null</span>
              </div>
              <div class="jijin_box" style="margin-left: 8%">
                <span>微信</span>
                <span>{{wechat}}</span>
              </div>
              <div class="jijin_box" style="border-bottom:0">
                <span>单位电话</span>
                <span>null</span>
              </div>
              <div class="jijin_box" style="padding-left: 6%;border-bottom:0">
                <span>E-mail</span>
                <span>{{email}}</span>
              </div>
            </div>
            <div class="table_one_row"></div>
            <div class="kk_ifrow_title">
              <span class="am-fl">客户联系地址</span>
            </div>
            <div class="kk_ifrow">
              <span class="am-99">居住地址</span>
              <span class="am-fr">北京市 朝阳区 花家地北里9号楼西侧 赞同科技发展有限公司</span>
            </div>
            <div class="kk_ifrow" style="border-bottom:0">
              <span class="am-99">详细地址</span>
              <span class="am-fr">北京市 朝阳区 花家地北里9号楼西侧 赞同科技发展有限公司详细地址</span>
            </div>
            <div class="table_one_row"></div>
            <div>
              <div class="kk_ifrow_title">
                <span class="am-fl">客户联系</span>
              </div>
              <div class="kk_ifrow">
                <span class="am-99">是否可以联系</span>
                <span class="am-fr">{{contact_whe}}</span>
              </div>
              <div class="kk_ifrow">
                <span class="am-99">偏好时间</span>
                <span class="am-fr">下午，晚上</span>
              </div>
              <div class="kk_ifrow">
                <span class="am-99">偏好联系电话</span>
                <span class="am-fr">13811110000</span>
              </div>
              <div class="kk_ifrow">
                <span class="am-99">偏好联系要求</span>
                <span class="am-fr">不接受营销电话短信与活动</span>
              </div>
              <div class="kk_ifrow">
                <span class="am-99">联系禁忌</span>
                <span class="am-fr">{{contact_taboo}}</span>
              </div>
            </div>
          </div>
        </aui-swiper-item>
        <!-- 归属信息-->
        <aui-swiper-item style="width: 100%">
          <div class="kk_ifrow_title">
            <span class="am-fl ">客户来源</span>
          </div>
          <div style=" width: 100%; border-bottom: 1px dashed #E6E6E6; height: 3.8vw;">
            <span class="am-99">客户来源方式</span>
            <span class="am-fr">客户经理拓展</span>
          </div>
          <div class="kk_ifrow" style="border: none">
            <div class="kk_ifrow3">
              <div style="width:90%;">
                <span class="am-99">主管户机构</span>
                <span class="am-fr">赞同总行</span>
              </div>
            </div>
            <div class="kk_ifrow3">
              <div style="width:90%;">
                <span class="am-99">主管户人类型</span>
                <span class="am-fr">-----</span>
              </div>
            </div>
            <div class="kk_ifrow3">
              <div style="width:90%;">
                <span class="am-99">主管户人姓名</span>
                <span class="am-fr">李涛</span>
              </div>
            </div>
          </div>
          <div class="kk_ifrow" style="border: none">
            <div class="kk_ifrow3">
              <div style="width:90%;">
                <span class="am-99">主管户机构</span>
                <span class="am-fr">赞同总行</span>
              </div>
            </div>
            <div class="kk_ifrow3">
              <div style="width:90%;">
                <span class="am-99">主管户人类型</span>
                <span class="am-fr">-----</span>
              </div>
            </div>
            <div class="kk_ifrow3">
              <div style="width:90%;">
                <span class="am-99">主管户人姓名</span>
                <span class="am-fr">李涛</span>
              </div>
            </div>
          </div>
          <div class="table_one_row"></div>
          <div class="kk_row">
            <span class="am-fl am-4c">业务经办人</span>
            <span class="am-fr am-00">更多</span>
          </div>
          <div>
            <aui-table :cell-bordered="false" :content-bordered="false">
              <thead>
                <tr class="tab_head">
                  <th style="border-right: 0.5px solid #f5f5f5">业务办理类型</th>
                  <th>业务办理内容(合同号/账户)</th>
                  <th>办理人</th>
                  <th>办理日期</th>
                </tr>
              </thead>
              <tbody v-for="(item,index) in processInfoList" class="tab_body">
                <tr v-if="index%2==0">
                  <td>{{item.proc_type}}</td>
                  <td style="background-color: #f5f5f5">{{item.proc_content}}</td>
                  <td style="background-color: #f5f5f5">{{item.proc_emp}}</td>
                  <td style="background-color: #f5f5f5">{{item.proc_date}}</td>
                </tr>
                <tr v-if="index%2==1">
                  <td>{{item.proc_type}}</td>
                  <td style="background-color: #fafafa">{{item.proc_content}}</td>
                  <td style="background-color: #fafafa">{{item.proc_emp}}</td>
                  <td style="background-color: #fafafa">{{item.proc_date}}</td>
                </tr>
              </tbody>
            </aui-table>
          </div>
          <div class="table_one_row"></div>
          <div class="kk_row">
            <span class="am-fl am-4c">归属历史记录</span>
            <span class="am-fr am-00">更多</span>
          </div>
          <div>
            <aui-table :cell-bordered="false" :content-bordered="false">
              <thead>
                <tr class="tab_head">
                  <th style="border-right: 0.5px solid #f5f5f5">归属机构</th>
                  <th>归属人</th>
                  <th>办理日期</th>
                  <th>结束日期</th>
                </tr>
              </thead>
              <tbody v-for="(item,index) in belonghisInfoList" class="tab_body">
                <tr v-if="index%2==0">
                  <td>{{item.belong_org_name}}</td>
                  <td style="background-color: #f5f5f5">{{item.belong_emp_name}}</td>
                  <td style="background-color: #f5f5f5">{{item.start_date}}</td>
                  <td style="background-color: #f5f5f5">{{item.end_date}}</td>
                </tr>
                <tr v-if="index%2==1">
                  <td>{{item.belong_org_name}}</td>
                  <td style="background-color: #fafafa">{{item.belong_emp_name}}</td>
                  <td style="background-color: #fafafa">{{item.start_date}}</td>
                  <td style="background-color: #fafafa">{{item.end_date}}</td>
                </tr>
              </tbody>
            </aui-table>
          </div>
        </aui-swiper-item>
        <!-- 沟通记录-->
        <aui-swiper-item>
          <div class="kk_row">
            <span class="am-fl am-4c">沟通记录</span>
            <span class="am-fr am-00">更多</span>
          </div>
          <div>
            <aui-table :cell-bordered="false" :content-bordered="false">
              <thead>
                <tr class="tab_head">
                  <th style="border-right: 0.5px solid #f5f5f5">联络日期</th>
                  <th>联络类型</th>
                  <th>联络方式</th>
                  <th>联络内容</th>
                  <th>联络反馈</th>
                  <th>联络结果</th>
                  <th>联络人</th>
                  <th>详细信息</th>
                </tr>
              </thead>
              <tbody v-for="(item,index) in liaisonInfoList" class="tab_body">
                <tr v-if="index%2==0">
                  <td>{{item.liai_date}}</td>
                  <td style="background-color: #f5f5f5">{{item.liai_type}}</td>
                  <td style="background-color: #f5f5f5">{{item.liai_way}}</td>
                  <td style="background-color: #f5f5f5">{{item.liai_content}}</td>
                  <td style="background-color: #f5f5f5">{{item.liai_feedback}}</td>
                  <td style="background-color: #f5f5f5">{{item.liai_result}}</td>
                  <td style="background-color: #f5f5f5">{{item.liai_emp}}</td>
                  <td style="background-color: #f5f5f5">{{item.liai_detail}}</td>
                </tr>
                <tr v-if="index%2==1">
                  <td>{{item.liai_date}}</td>
                  <td style="background-color: #fafafa">{{item.liai_type}}</td>
                  <td style="background-color: #fafafa">{{item.liai_way}}</td>
                  <td style="background-color: #fafafa">{{item.liai_content}}</td>
                  <td style="background-color: #fafafa">{{item.liai_feedback}}</td>
                  <td style="background-color: #fafafa">{{item.liai_result}}</td>
                  <td style="background-color: #fafafa">{{item.liai_emp}}</td>
                  <td style="background-color: #fafafa">{{item.liai_detail}}</td>
                </tr>
              </tbody>
            </aui-table>
          </div>
        </aui-swiper-item>
        <!-- 评价-->
        <aui-swiper-item>
          <!-- <chart :options="bar" ref="bar" theme="ovilia-green" auto-resize style="width: 100%;height:99%"></chart> -->
          <div ref="drawBar" class="set-chart"></div>
        </aui-swiper-item>
      </aui-swiper>
    </div>
  </div>
</template>
<script>
  import {
    RootActivityManager
  } from "ab-manager-activity";
  import TradeActivityManager from "@/common/activity-manager/trade-activity-manager"; // 相对路径
  // import BasicActivity from "@/mixins/basic-activity"; //当前路由事件集合
  import EventNames from "@/common/activity-manager/activity-event-names"; //路由事件名称
  import {
    PageManager
  } from "ab-manager-page"; //页面管理
  import {
    TradeFlowManager
  } from "ab-manager-trade-flow"; //流程管理
  import afaApi from '@/common/api/custom'
  import common from '@/common/js/common'
  import {
    pie as pie,
    bar as bar,
    fzpie as fzpie
  } from '@/modules/custom/infoPie'

  export default {
    // mixins: [BasicActivity],
    components: {},
    activated() {
      this.refresh();
      this.cust_no = this.$route.params.cust_no;
      this.queryCustomInfo();
      this.custPcustLabelQuery();
      this.custActivityInfoQuery();
      this.liaisonInfoQuery();
      this.cardQuery();
      this.creditcardQuery();
      this.finbindFormQuery();
      this.financialbindFormQuery();
      this.belonghisInfoquery();
      this.processInfoquery();
      this.creditInfoquery();
    },
    data() {
      return {
        pie: pie,
        fzpie: fzpie,
        bar: bar,
        //客户详情数据
        //客户号
        cust_no: '',
        //客户短名
        cust_short_name: '',
        //客户姓名
        cust_name: '',
        //客户等级
        cust_grade: '',
        //手机号码
        contact_tele: '',
        //微信号
        wechat: '',
        //邮箱
        email: '',
        //居住地址
        detailed_address: '',
        //证件地址
        cert_address: '',
        //是否可以联系
        contact_whe: '',
        //偏好时间

        //偏好联系电话

        //偏好联系要求

        //联系禁忌
        contact_taboo: '',
        //客户标签
        labelInfoList: [{}],
        //客户营销活动
        activityInfoList: [{}],
        //沟通记录
        liaisonInfoList: [{}],
        //持有借记卡信息
        cardList: [{}],
        //持有信用卡信息
        creditcardList: [{}],
        //持有理财产品信息
        finbindFormList: [{}],
        //归属历史记录
        belonghisInfoList: [{}],
        //业务经办人
        processInfoList: [{}],
        //消费
        creditInfoList: [{}],

        returntocustlist: false,
        showkhtitle: false,
        showtitlename: true,
        prodInfoIndex: 0,
      };
    },
    mounted() {
      this.drawPieFn(); //初始化图标
      this.drawFzPieFn(); //初始化图标
      this.drawBarFn(); //初始化图标
    },
    methods: {
      drawPieFn() {
        let element = this.$refs.drawPie;
        let myChart = this.$echarts.init(element);
        let option = this.pie;
        myChart.setOption(option);
      },
      drawFzPieFn() {
        let element = this.$refs.drawFzPie;
        let myChart = this.$echarts.init(element);
        let option = this.fzpie;
        myChart.setOption(option);
      },
      drawBarFn() {
        let element = this.$refs.drawBar;
        let myChart = this.$echarts.init(element);
        let option = this.bar;
        myChart.setOption(option);
      },
      clickTabItem(index) {
        this.prodInfoIndex = index;
      },
      //查询联系信息
      queryCustomInfo() {
        let submitdata = {},
          body = {},
          _this = this;
        body.cust_no = this.cust_no;
        submitdata.body = JSON.stringify(body);
        afaApi.customInfoQuery(submitdata, function (response) {
          var result = response;
          _this.personInfo = result.PersonInfo;
          _this.cust_name = _this.personInfo[0].cust_name;
          _this.cust_short_name = common.getShortName(_this.cust_name);
          _this.cust_grade = _this.personInfo[0].cust_grade;
          if (_this.cust_grade == '8000280001') {
            _this.cust_grade = '铂金客户';
          } else if (_this.cust_grade == '8000280005') {
            _this.cust_grade = '普通客户';
          } else {
            _this.cust_grade = '黄金客户';
          }

          _this.contact_tele = _this.personInfo[0].contact_tele;
          _this.wechat = _this.personInfo[0].wechat;
          _this.email = _this.personInfo[0].email;
          _this.contact_taboo = _this.personInfo[0].contact_taboo;
          //是否可以联系
          _this.contact_whe = _this.personInfo[0].contact_whe;
          if (_this.contact_whe == '9000120001') {
            _this.contact_whe = '可以联系';
          } else {
            _this.contact_whe = '不可以联系';
          }
        });
      },
      //客户标签
      custPcustLabelQuery() {
        let submitdata = {},
          body = {},
          _this = this;
        body.cust_no = this.cust_no;
        submitdata.body = JSON.stringify(body);
        afaApi.custPcustLabelQuery(submitdata,function (response){
          var result = response;
          _this.labelInfo = result.LabelInfo;
          _this.labelInfoList = _this.labelInfoList.concat(_this.labelInfo);
        });

      },
      //营销活动
      custActivityInfoQuery() {
        let submitdata = {},
          body = {},
          _this = this;
        //如果传入cust_no 没有数据回传，所以显示了所有营销活动
        /*body.cust_no='00000080';*/
        submitdata.body = JSON.stringify(body);
        afaApi.custActivityInfoQuery(submitdata, function (response){
          var result = response;
          _this.activityInfo = result.ActivityInfo;
          //为了干净只显示2个
          _this.activityInfo = _this.activityInfo.splice(1, 2);
          _this.activityInfoList = _this.activityInfoList.concat(_this.activityInfo);
        });
      },
      //客户资产统计
      //消费
      creditInfoquery() {
        let submitdata = {},
          body = {},
          _this = this;
        body.Custid = this.cust_no;
        body.Date = '20170531';
        submitdata.body = JSON.stringify(body);
        afaApi.creditInfoquery(submitdata, function (response){
          var result = response;
          _this.creditInfolist = result.CreditInfo;
          console.log(_this.creditInfolist);
          let creditInfoInfo = [{
            name: '借记卡',
            dyljxfje: _this.creditInfolist[0].decard_total_consume,
            bsy: '3000',
            dnljxfje: '60000',
            bsn: '20000',
          }, {
            name: '信用卡',
            dyljxfje: _this.creditInfolist[0].crecard_total_consume,
            bsy: '5000',
            dnljxfje: '80000',
            bsn: '30000',
          }, ]
          _this.creditInfoList = _this.creditInfoList.concat(creditInfoInfo);
        });
      },

      //持有产品信息
      //借记卡
      cardQuery() {
        let submitdata = {},
          body = {},
          _this = this;
        /*body.custid='00000080';*/
        submitdata.body = JSON.stringify(body);
        afaApi.cardQuery(submitdata, function (response){
          var result = response;
          _this.cardlist = result.card;
          _this.cardList = _this.cardList.concat(_this.cardlist);
        });
      },
      //信用卡
      creditcardQuery() {
        let submitdata = {},
          body = {},
          _this = this;
        body.custid = this.cust_no;
        submitdata.body = JSON.stringify(body);
        afaApi.creditcardQuery(submitdata, function (response){
          var result = response;
          _this.creditcardlist = result.creditcard;
          /*console.log(_this.creditcardlist);*/
          _this.creditcardList = _this.creditcardList.concat(_this.creditcardlist);
        });
      },
      //保本理财产品
      financialbindFormQuery() {
        let submitdata = {},
          body = {},
          _this = this;
        body.prodtype = '5000140002';
        submitdata.body = JSON.stringify(body);
        afaApi.finbindFormQuery(submitdata, function (response){
          var result = response;
          _this.financiallist = result.Financial;
          /* console.log(_this.financiallist);*/
          _this.finbindFormList = _this.finbindFormList.concat(_this.financiallist);
        });
      },
      //非保本理财产品
      finbindFormQuery() {
        let submitdata = {},
          body = {},
          _this = this;
        body.prodtype = '5000140003';
        submitdata.body = JSON.stringify(body);
        afaApi.finbindFormQuery(submitdata, function (response){
          var result = response;
          _this.financiallist = result.Financial;
          /*console.log(_this.financiallist);*/
          _this.finbindFormList = _this.finbindFormList.concat(_this.financiallist);
        });
      },
      //归属信息
      //业务经办人
      processInfoquery() {
        let submitdata = {},
          body = {},
          _this = this;
        body.cust_no = this.cust_no;
        submitdata.body = JSON.stringify(body);
        afaApi.processInfoquery(submitdata, function (response){
          var result = response;
          _this.processInfo = result.ProcessInfo;
          _this.processInfoList = _this.processInfoList.concat(_this.processInfo);
        });
      },
      //归属历史记录
      belonghisInfoquery() {
        let submitdata = {},
          body = {},
          _this = this;
        let PageCtrl = {};
        PageCtrl.currpage = '1';
        PageCtrl.pagenum = '6';
        PageCtrl.pageflag = '4';
        body.PageCtrl = PageCtrl;
        body.cust_no = this.cust_no;
        submitdata.body = JSON.stringify(body);
        afaApi.belonghisInfoquery(submitdata, function (response){
          var result = response;
          _this.belonghisInfo = result.BelonghisInfo;
          _this.belonghisInfoList = _this.belonghisInfoList.concat(_this.belonghisInfo);

        });
      },

      //沟通记录
      liaisonInfoQuery() {
        let submitdata = {},
          body = {},
          _this = this;
        body.Custid = this.cust_no;
        submitdata.body = JSON.stringify(body);
        afaApi.liaisonInfoQuery(submitdata,function (response){
          var result = response;
          _this.liaisonInfo = result.LiaisonInfo;
          _this.liaisonInfoList = _this.liaisonInfoList.concat(_this.liaisonInfo)
        });
      },
      //跳转详细
      clickCustom() {
        var cust_no = this.cust_no;
        this.$store.commit('update_customComeBackFlag', true);
        this.$store.commit('update_clickGroupRefreshFlag', false);
        /*this.$router.push('/custom/customInfoInfo/'+ cust_no);*/
        this.$activityManager.requestUpdateView(EventNames.CUSTOMINFOINFO, cust_no)
      },
      //初始化刷新页面数据
      refresh() {
        //初始化data数据
        Object.assign(this.$data, this.$options.data());
        this.$store.commit('update_customComeBackFlag', true);
        this.$store.commit('update_clickGroupRefreshFlag', false);
      },
      //评价

    }
  }

</script>
<style scoped lang="less">
  .container {
    overflow-y: auto;
    height: 100%;
    width: 100%;
    margin: 0 auto;
    font-size: 16px;
    .userRight {
      width: 100%;
      height: 264px;
      .kk_gbox {
        width: 98%;
        margin-left: 2%;
        border-bottom: 1px dashed #e5e5e5;
        padding: 5px 0;
        .gbox_row {
          height: 35px;
          line-height: 35px;
          width: 100%;
          font-size: 14px;
          .kk_btn {
            background-image: linear-gradient(-9deg, #FF9500 0%, #FFC83D 100%);
            border-radius: 39px;
            font-size: 14px;
            color: #fff;
            display: inline-block;
            line-height: 20px;
            text-align: center;
            padding: 0 8px;
            margin-left: 8px;
          }
          .kk_btn-grey {
            background: #F3F3F3;
            color: #919191;
          }
        }
      }
      .kk_row_zz {
        width: 100%;
        height: 44px;
        line-height: 44px;
        font-size: 14px;
        color: #4C4C4C;
        font-weight: 600;
        border-bottom: 1px solid #e5e5e5;
        span {
          margin-left: 2%;
        }
      }
      .contact-info {
        .aui-flexbox-item {
          border-right: 1px solid #e5e5e5;
          text-align: center;
          &:nth-last-child(1) {
            border-right: 0;
          }
        }
        img {
          width: 16px;
          vertical-align: middle;
        }
        span {
          font-size: 14px;
        }
      }
    }
    .user-detail {
      height: 456px;
      width: 100%;
      .tab-span{
        color: #00AAFF;
        font-size: 16px;
      }
      // /deep/.scrollable .aui-tab-item{
      //   flex: auto;
      // }
      .swiper-height {
        height: 400px;
        /deep/.aui-swiper {
          height: 100% !important;
          .aui-swiper-item {
            height: 100%;
            overflow-x: hidden;
            overflow-y: scroll;
            h3 {
              padding-left: 15px;
            }
          }
        }
      }
    }
  }

  .pro_row span:nth-child(2) {
    font-size: 12px;
    color: #00AAFF;
  }

  .pro_row img {
    margin-top: 15px;
    margin-left: 15px;
  }

  .plan_name {
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 50%;
    color: #fff;
    float: left;
    margin-right: 15px;
    font-size: 14px;
  }

  .am-fr {
    float: right;
    margin-right: 15px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    vertical-align: middle;
    border: 0;
    font-size: 16px;
  }

  .am-fl {
    float: left;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    vertical-align: middle;
    border: 0;
    margin-left: 15px;
    font-size: 16px;
  }

  .am-fs {
    margin-left: 5px;
    font-size: 14px;
    color: #999999;
  }

  .plan_red {
    background-image: linear-gradient(-54deg, #FF5451 1%, #FA7B7B 100%);
  }

  .plan_row {
    width: 100%;
    /* height: 72px;
    line-height: 72px;*/
    padding: 10px 20px;
  }

  .play_text {
    float: left;
    height: 51px;
    line-height: 51px;
    padding-left: 2%;
  }

  .play_title {
    width: 100%;
    margin: 0;
    height: 20px;
    line-height: 20px;
    font-size: 18px;
  }

  .play_time {
    margin-top: 5px;
    height: 20px;
    width: 100%;
    line-height: 25px;
  }

  .play_text span {
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #999999;
    line-height: 13px;
    margin-left: 5%;
  }

  .play_text span:nth-child(1) {
    margin-left: 0;
  }

  .plan_red {
    background-image: linear-gradient(-54deg, #FF5451 1%, #FA7B7B 100%);
  }

  .kk_row {
    margin: 0 auto;
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 12px;
    color: #4C4C4C;
    font-weight: 600;
    border-bottom: 1px solid #e5e5e5;
  }

  .am-00 {
    color: #00AAFF;
  }

  .am-99 {
    color: #999999;
    margin-left: 15px;
    font-size: 16px;
  }

  .am-98 {
    color: #999999;
    margin-left: 15px;
    font-size: 14px;
  }

  .kk_ifrow {
    width: 100%;
    border-bottom: 1px dashed #E6E6E6;
    height: 48px;
  }

  .kk_ifrow_title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: #4C4C4C;
    border-bottom: 1px dashed #e5e5e5;
  }

  .table_one_row {
    width: 100%;
    height: 10px;
    background-color: #e5e5e5;
  }

  .table_title1 th {
    width: 19%;
    height: 35px;
    line-height: 35px;
    float: left;
    border-right: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
  }

  .table_title1_row td {
    width: 20%;
    height: 35px;
    line-height: 35px;
    float: left;
    border-right: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
  }

  .jijin_row {
    width: 100%;
    margin: 0 auto;
  }

  .jijin_row .jijin_box {
    width: 45%;
    line-height: 40px;
    height: 40px;
    display: inline-block;
    border-bottom: 1px dashed #E6E6E6;
    margin-left: 15px;
    margin-right: -15px
  }

  .jijin_row .jijin_box span:nth-child(1) {
    font-size: 16px;
    color: #999999;
    text-align: left;
    display: inline-block;
  }

  .jijin_row .jijin_box span:nth-child(2) {
    font-size: 16px;
    color: #4C4C4C;
    display: inline-block;
    float: right;
  }

  .kk_ifrow3 {
    height: 48px;
    line-height: 48px;
    font-size: 14px;
    width: 33%;
    border-bottom: 1px dashed #e5e5e5;
    float: left;
  }

  .line {
    height: 0;
    width: 98%;
    border-top: 1px solid #e5e5e5;
  }

  .tab_head {
    background-color: #828199;
    color: white;
    height: 48px;
    font-size: 16px;
  }

  .tab_body {
    font-size: 16px;
  }
  .set-chart {
    width: 100%;
    height: calc(~"100% - "46px);
  }

</style>
