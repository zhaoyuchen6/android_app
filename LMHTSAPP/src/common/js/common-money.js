export const softKeyboardHeight = 300;

export default {
  /**
   * @Description: 格式化金额
   * */
  formatCurrency (num) {
    if (num == undefined || num == null || num == '') {
      return '0.00';
    } else {
      if (parseFloat(num) > -0.01 && parseFloat(num) < 0.0) {
        return "0.00";
      } else {
        num = num.toString().replace(/\$|\,/g, '');
        if (isNaN(num)) {
          num = "0.00";
        } else {
          let sign = (num == (num = Math.abs(num)));
          num = Math.floor(num * 100 + 0.50000000001);
          let cents = num % 100;
          num = Math.floor(num / 100).toString();
          if (cents < 10) {
            cents = "0" + cents;
          }

          for (let i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
            num = num.substring(0, num.length - (4 * i + 3)) + ',' +
              num.substring(num.length - (4 * i + 3));
          }

          return "" + (((sign) ? '' : '-') + '' + num + '.' + cents);
        }
      }
    }
  },

  /**
   * @Description: 格式化百分比
   * */
  formatPercent (num) {
    if (!/\d+(\.\d+)?/.test(num)) {
      num = 0;
    }
    let result = (num * 100).toString(),
      index = result.indexOf(".");
    if (index == -1 || result.substr(index + 1).length <= 4) {
      return result + "%";
    }
    return result.substr(0, index + 5) + "%";
  },

  /**
   * @Description: 提示消息
   * */
  popup (toaster, level, title, message){
    toaster.pop(level, title, message);
  },

  /**
   * @Description: 封装ajax跨域请求大零售PC端后台
   * @Param: url: 请求后台的URL
   * @Param: tradecode: AFA交易码
   * @Param: message: JSON格式报文
   * @Param: async: 是否异步(true-异步; false-同步)
   * @Param: func: 回调函数
   * */
  jquerypost (url, tradecode, message, async, func) {
    let submitdata = {};
    submitdata.tranCode = tradecode;
    submitdata.body = JSON.stringify(message);

    jQuery.ajax({
      url: url,
      /*accepts: {
       mycustomtype: 'application/x-www-form-urlencoded'
       },*/
      data: submitdata,
      async: async,
      method: 'post',
      dataType: 'json',
      timeout: 60000,
      cache: false,
      success: function (data) {
        func(data.result);
      }
    });
  },

  /**
   * @Description: 获取用来生成头像的短用户名
   * */
  getShortName (custname) {
    let engRegex = /^[A-Za-z]+$/, custshortname = '',
      familyNameArray = ['欧阳', '太史', '端木', '上官', '司马', '东方', '独孤', '南宫', '万俟', '闻人', '夏侯', '诸葛', '尉迟', '公羊', '赫连', '澹台', '皇甫',
        '宗政', '濮阳', '公冶', '太叔', '申屠', '公孙', '慕容', '仲孙', '钟离', '长孙', '宇文', '城池', '司徒', '鲜于', '司空', '汝嫣', '闾丘', '子车', '亓官',
        '司寇', '巫马', '公西', '颛孙', '壤驷', '公良', '漆雕', '乐正', '宰父', '谷梁', '拓跋', '夹谷', '轩辕', '令狐', '段干', '百里', '呼延', '东郭', '南门',
        '羊舌', '微生', '公户', '公玉', '公仪', '梁丘', '公仲', '公上', '公门', '公山', '公坚', '左丘', '公伯', '西门', '公祖', '第五', '公乘', '贯丘', '公皙',
        '南荣', '东里', '东宫', '仲长', '子书', '子桑', '即墨', '达奚', '褚师'];

    if (engRegex.test(custname.replace(new RegExp(/ /g), ''))) {
      //正则表达式校验通过，英文姓名
      let custnames = custname.split(' ');
      custshortname = custnames[custnames.length - 1];
    } else {
      //正则表达式校验不通过，中文姓名
      let familyName = custname.substr(0, 2);

      for (let i = 0; i < familyNameArray.length; i++) {
        if (familyNameArray[i] == familyName) {
          //是复姓
          custshortname = custname.substr(2, custname.length - 2);
          return custshortname;
        }
      }
      custshortname = custname.substr(1, custname.length - 1);
    }
    return custshortname;
  }
}
