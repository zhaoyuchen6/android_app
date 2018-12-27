import pinying from './pinying';
import common from './common';

export default{
  // 按名字排序
  sortByName(customArray){
    return customArray.sort(function (a, b) {
      var a_pinying = pinying.makePy(a.cust_name);
      var b_pinying = pinying.makePy(b.cust_name);
      if (a_pinying > b_pinying) {
        return 1;
      } else if (a_pinying < b_pinying) {
        return -1;
      } else {
        return 0;
      }
    });
  },

// 按名字首字母分组
  getNewCustomArray(customArray, groupInfo) {
    var newCustomArray = new Array();
    var tmpChar = "";
    var tmpArray = new Array();
    for (var i = 0; i < customArray.length; i++) {
      var customObj = customArray[i];
      customObj.cust_name_short = common.getShortName(customObj.cust_name);
      customObj.group_name_text = this.getGroupNode(groupInfo, customObj.group_id).group_name;
      if (i == 0) {
        tmpChar = pinying.makePy(customObj.cust_name)[0].charAt(0);
        tmpArray.push(customObj);
      } else {
        if (tmpChar == pinying.makePy(customObj.cust_name)[0].charAt(0)) {
          tmpArray.push(customObj);
        } else {
          var tmpObj = {};
          tmpObj.tmpChar = tmpChar;
          tmpObj.tmpArray = tmpArray;
          newCustomArray.push(tmpObj);
          tmpChar = pinying.makePy(customObj.cust_name)[0].charAt(0);
          tmpArray = new Array();
          tmpArray.push(customObj);
        }
      }
      if (i == customArray.length - 1) {
        var tmpObj = {};
        tmpObj.tmpChar = tmpChar;
        tmpObj.tmpArray = tmpArray;
        newCustomArray.push(tmpObj);
      }
    }
    return newCustomArray;
  },

  getNewCustomArray2(customArray, groupInfo) {
    var newCustomArray = new Array();
    for (var i = 0; i < customArray.length; i++) {
      var customObj = customArray[i];
      customObj.cust_name_short = common.getShortName(customObj.cust_name);
      customObj.group_name_text = this.getGroupNode(groupInfo, customObj.group_id).group_name;
      newCustomArray.push(customObj);
    }
    return newCustomArray;
  },

//群组
  getGroupNode(groupInfo, group_id) {
    for (var i = 0; i < groupInfo.length; i++) {
      if (group_id == groupInfo[i].group_id) {
        return groupInfo[i];
      }
    }
    return "无";
  },
//群主变形key-value
  getSelectGroupList(groupInfo) {
    var groupInfoList = [];
    for (var i = 0; i < groupInfo.length; i++) {
      var objTmp = {};
      objTmp.key = groupInfo[i].id;
      objTmp.value = groupInfo[i].group_name;
      groupInfoList.push(objTmp);
    }
    return groupInfoList;
  },
  getCustomGroupNode(groupList, index) {
    if(groupList == undefined || groupList == [] || groupList == null ||groupList == 'null' || groupList == ''){
      return {};
    }
    if(groupList.length == 0){
      return {};
    }
    for (var i = 0; i < groupList.length; i++) {
      if (index == groupList[i].index) {
        return groupList[i];
      }
    }
    return groupList[index];
  },
}
