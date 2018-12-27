/*客户资产占比*/
export let customerAssets = {
  tooltip : {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  grid: {
    containLabel:true,
    width:"90%",
    height:"90%",
    left:"5%",
    right:"5%",
    top:"5%",
    bottom:"5%"
  },
  legend: {
    orient : 'vertical',
    left: 'right',
    bottom: '10%',
    data:['基金','存款','保险','借款','贷款','外汇'],
    textStyle:{
      fontSize:"80%"
    },
    itemWidth:18,
    itemHeight:9,
    itemGap:5
  },
/*  toolbox: {
    show : true,
    feature : {
      mark : {show: true},
      dataView : {show: true, readOnly: false},
      magicType : {
        show: true,
        type: ['pie', 'funnel']
      },
      restore : {show: true},
      saveAsImage : {show: true}
    }
  },*/
  calculable : true,
  series : [
    {
      name:'客户资产占比',
      type:'pie',
      selectedMode: 'single',
      center: ['40%', '55%'],
      radius: ['0%', '50%'],
      label: {
        normal: {
          position: 'inner',
          fontSize:'90%'
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data:[
        {value:335, name:'基金', selected:true},
        {value:679, name:'存款'},
        {value:1548, name:'保险'}
      ]
    },
    {
      name:'客户资产占比',
      type:'pie',
      radius: ['65%', '80%'],
      center: ['40%', '55%'],
      label:{
        normal:{
          fontSize:"90%"
        }
      },
      labelLine:{
        length:10,
        length2:10
      },
      data:[
        {value:335, name:'基金'},
        {value:310, name:'存款'},
        {value:234, name:'保险'},
        {value:135, name:'借款'},
        {value:1048, name:'贷款'},
        {value:251, name:'外汇'}
      ]
    }
  ],
  color:['#D87A80','#B6A2DE','#5AB1EF','#2EC7C9','#FFB980','#C8E49C']
};
