<template>
  <div class="container">
    <div class="line"></div>
    <div class="no_info_div">
      <span class="info_left">客户姓名</span>
      <span class="info_right">{{cust_name}}</span>
    </div>
    <div class="info_div">
      <span class="info_left">客户等级</span>
      <span class="info_right">{{cust_grade}}</span>
    </div>
    <div class="info_div">
      <span class="info_left">手机号</span>
      <span class="info_right">{{contact_tele}}</span>
    </div>
    <div class="info_div">
      <span class="info_left">邮箱</span>
      <span class="info_right">{{email}}</span>
    </div>
    <div class="line"></div>
    <div class="no_info_div">
      <span class="info_left">主管机构</span>
      <span class="info_right">{{corp_name}}</span>
    </div>
    <div class="info_div">
      <span class="info_left">主管户人</span>
      <span class="info_right">{{person_name}}</span>
    </div>
    <div class="line"></div>
    <div class="no_info_div">
      <span class="info_left">性别</span>
      <span class="info_right">{{sex}}</span>
    </div>
    <div class="info_div">
      <span class="info_left">年龄</span>
      <span class="info_right">{{formatage(birthday_gc)}}</span>
    </div>
    <div class="info_div">
      <span class="info_left">出生日期</span>
      <span class="info_right">{{birthday_gc}}</span>
    </div>
    <div class="info_div">
      <span class="info_left">学历</span>
      <span class="info_right">{{education}}</span>
    </div>
    <div class="info_div">
      <span class="info_left">户籍地址</span>
      <span class="info_right">{{origin_place}}</span>
    </div>
    <div class="info_div">
      <span class="info_left">婚姻状况</span>
      <span class="info_right">{{marriage}}</span>
    </div>
    <div class="inputBottomLine"></div>
    <!--<div class="line_down"></div>-->
  </div>
</template>
<script>
  import { RootActivityManager } from "ab-manager-activity";
  import TradeActivityManager from "@/common/activity-manager/trade-activity-manager"; // 相对路径
  import BasicActivity from "@/mixins/basic-activity"; //当前路由事件集合
  import EventNames from "@/common/activity-manager/activity-event-names"; //路由事件名称
  import { PageManager } from "ab-manager-page"; //页面管理
  import { TradeFlowManager } from "ab-manager-trade-flow"; //流程管理
  import afaApi from '@/common/api/custom'
  import common from '@/common/js/common'

  export default {
    mixins: [BasicActivity],
    components: {

    },
    activated () {
      this.cust_no=this.$route.params.cust_no;
      this.queryCustomInfo();
    },
    data () {
      return {
        //客户号
        cust_no:'',
        //客户姓名
        cust_name:'',
        //客户等级
        cust_grade:'',
        //手机号
        contact_tele:'',
        //邮箱
        email:'',
        //主管机构
        corp_name:'',
        //主管户人
        person_name:'',
        //性别
        sex:'',
        //出生日期
        birthday_gc:'',
        //学历
        education:'',
        //户籍地址
        origin_place:'',
        //婚姻状况
        marriage:'',

      };
    },
    methods: {
      //客户信息查询
      queryCustomInfo() {
        let submitdata = {}, body = {},_this = this;
        body.cust_no=this.cust_no;
        submitdata.body=JSON.stringify(body);
        afaApi.customInfoQuery(submitdata, function (response){
          var result = response;
          _this.personInfo = result.PersonInfo;
          _this.cust_name = _this.personInfo[0].cust_name;
          _this.cust_grade = _this.personInfo[0].cust_grade;
          if(_this.cust_grade=='8000280001'){
            _this.cust_grade='铂金客户';
          }else if(_this.cust_grade=='8000280005'){
            _this.cust_grade='普通客户';
          }
          _this.contact_tele = _this.personInfo[0].contact_tele;
          _this.email = _this.personInfo[0].email;
          _this.corp_name=_this.personInfo[0].corp_name;
          _this.person_name=_this.personInfo[0].person_name;
          _this.sex=_this.personInfo[0].sex;
          if(_this.sex=='9000010002'){
            _this.sex='女';
          }else{
            _this.sex='男';
          }
          _this.birthday_gc=_this.personInfo[0].birthday_gc;
          _this.education=_this.personInfo[0].education;
          if(_this.education=='9000030001'){
            _this.education='小学';
          }else if(_this.education=='9000030002'){
            _this.education='初中';
          }else if(_this.education=='9000030003'){
            _this.education='中专/高中';
          }else if(_this.education=='9000030004'){
            _this.education='专科';
          }else if(_this.education=='9000030005'){
            _this.education='本科';
          }else if(_this.education=='9000030006'){
            _this.education='硕士研究生';
          }else if(_this.education=='9000030007'){
            _this.education='博士研究生';
          }else if(_this.education=='9000030008'){
            _this.education='博士后';
          }else{
            _this.education='不知道';
          }
          _this.origin_place=_this.personInfo[0].origin_place;
          _this.marriage=_this.personInfo[0].marriage;
          if(_this.marriage=='9000060001'){
            _this.marriage='未婚';
          }else if(_this.marriage=='9000060002'){
            _this.marriage='已婚';
          }else if(_this.marriage=='9000060003'){
            _this.marriage='再婚';
          }else if(_this.marriage=='9000060004'){
            _this.marriage='丧偶';
          }else if(_this.marriage=='9000060005'){
            _this.marriage='离异';
          }else{
            _this.marriage='不知道';
          }
        });
      },
      formatage(strBirthday){
        var returnAge;
        var strBirthdayArr=strBirthday.split("-");
        var birthYear = strBirthdayArr[0];
        var birthMonth = strBirthdayArr[1];
        var birthDay = strBirthdayArr[2];

        var d = new Date();
        var nowYear = d.getFullYear();
        var nowMonth = d.getMonth() + 1;
        var nowDay = d.getDate();
        if(nowYear == birthYear)
        {
          returnAge = 0;//同年 则为0岁
        }
        else
        {
          var ageDiff = nowYear - birthYear ; //年之差
          if(ageDiff > 0)
          {
            if(nowMonth == birthMonth)
            {
              var dayDiff = nowDay - birthDay;//日之差
              if(dayDiff < 0)
              {
                returnAge = ageDiff - 1;
              }
              else
              {
                returnAge = ageDiff ;
              }
            }
            else
            {
              var monthDiff = nowMonth - birthMonth;//月之差
              if(monthDiff < 0)
              {
                returnAge = ageDiff - 1;
              }
              else
              {
                returnAge = ageDiff ;
              }
            }
          }
          else
          {
            returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
          }
        }
        return returnAge;//返回周岁年龄

      }
    }
  }
</script>
<style scoped lang="less">
  .container{
    font-size: 16px;
  }
.info_div{
  height: 52px;
  background: #FFFFFF;
  width: 98%;
  margin-left: 2%;
  border-top: 1px solid #e5e5e5;
}
.no_info_div{
  height: 52px;
  background: #FFFFFF;
  width: 98%;
  margin-left: 2%;
}
.info_left{
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #666666;
  line-height: 14px;
  float: left;
  margin-top: 20px;
}
.info_right{
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #333333;
  line-height: 14px;
  float: right;
  margin-right: 15px;
  margin-top: 17px;
}
.line{
  height: 10px;
  width: 100%;
  background: #F5F5F5;
}
.line_down{
    height: 80px;
    width: 100%;
    background: #F5F5F5;
}

.inputBottomLine{
  border-bottom: solid 1px #e5e5e5;
}
</style>

