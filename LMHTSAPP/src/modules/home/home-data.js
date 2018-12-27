import themeColor from "../../../static/public-style/themeColor";
/*定义JSON数据*/
let businessJson={
  "all":100,
  "charts":{
    "query":30,
    "loss":10,
    "change":10,
    "contract":10,
    "open":40
  }
};
/*定义常用变量*/
let lineColor=themeColor.colorBg;
let fontColor=themeColor.colorFont;
let pieColor="#4C4C4C";
let fontSize="100%";
let bgColor="#F7F7F7";
let fontFamily="simHei";
let barLineColor="#0C6E84";
/*当天业务流量曲线图*/
let line={
  title:{
    text:"当天业务流量曲线图",
    textStyle:{
      color:fontColor,
      fontSize:fontSize,
      fontWeight:"normal"
    },
    left:"1%",
    top:"5%",
  },
  grid:{
    top:"30%",
    left:"3%",
    right:"3%",
    bottom:"2%",
    containLabel:true
  },
  xAxis: {
    type: 'category',
    boundaryGap:false,
    //坐标轴轴线
    axisLine:{
      lineStyle:{
        color:lineColor
      }
    },
    //坐标轴刻度
    axisTick:{
      show:false
    },
    //坐标轴刻度标签
    axisLabel:{
      interval:1,
      fontSize:fontSize,
      color:fontColor,
      align:"left"
    },
    data: ['8:00~10:00', '8:00~10:00', '10:00~12:00', '10:00~12:00', '12:00~14:00', '12:00~14:00', '14:00~16:00', '14:00~16:00', '16:00~17:30', '16:00~17:30']
  },
  yAxis: {
    name:"人数",
    type: 'value',
    // show:false,
    //坐标轴名称的文字样式
    nameTextStyle:{
      fontSize:fontSize,
      color:fontColor
    },
    //坐标轴在 grid 区域中的分隔线
    splitLine: {
      show: false
    },
    //坐标轴轴线
    axisLine:{
      lineStyle:{
        color:lineColor
      }
    },
    //坐标轴刻度
    axisTick:{
      show:false
    },
    //坐标轴刻度标签
    axisLabel:{
      show:false,
    }
  },
  series: [{
    data: [600,800,200,700,300,900,400,800,600,800],
    type: 'line',
    smooth: true,
    lineStyle:{
      color:lineColor
    },
    areaStyle: {
      color:lineColor,
      opacity:1
    },
    showSymbol:false
  }]
};
/*业务类型数据展示——饼图*/
function pie(bgColor){
  return {
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    grid:{
      top:"30%",
      left:"5%",
      right:"5%",
      bottom:"5%",
      containLabel:true
    },
    series : [
      {
        name:"业务类型数据展示",
        type: 'pie',
        radius : '60%',
        center: ['45%', '50%'],
        avoidLabelOverlap:true,
        data:[
          {
            value:10,
            name:'挂失',
            itemStyle:{
              color:"#f0b1b3",
              borderColor:bgColor,
              borderWidth:5
            }
          },
          {
            value:10,
            name:'借记卡换卡',
            itemStyle:{
              color:"#fcd105",
              borderColor:bgColor,
              borderWidth:5
            }
          },
          {
            value:10,
            name:'签约',
            itemStyle:{
              color:"#b2e6fa",
              borderColor:bgColor,
              borderWidth:5
            }
          },
          {
            value:40,
            name:'开卡',
            itemStyle:{
              color:"#6aaae1",
              borderColor:bgColor,
              borderWidth:5
            }
          },
          {
            value:30,
            name:'查询',
            itemStyle:{
              color:"#f27f77",
              borderColor:bgColor,
              borderWidth:5
            }
          }
        ],
        label:{
          color:pieColor,
          fontSize:fontSize,
          fontFamily:fontFamily
        },
        labelLine:{
          show:false,
          length:5
        },
        itemStyle: {
          emphasis: {
            borderColor:bgColor
          }
        }
      }
    ]
  }
}
/*业务类型数据展示——柱状图*/
function bar(){
  return {
    title:{
      text:"当天统计共"+businessJson.all+"条",
      top:"10%",
      left:"30%"
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      top:"30%",
      bottom: '30%',
      left:"0",
      width:"80%",
      containLabel: true
    },
    xAxis: {
      name:"数量",
      type: 'value',
      //坐标轴名称的文字样式
      nameTextStyle:{
        color:pieColor,
        fontSize:fontSize
      },
      //坐标轴在 grid 区域中的分隔线
      splitLine: {
        show: false
      },
      //坐标轴轴线
      axisLine:{
        symbol:['none','arrow'],
        symbolSize:[8,10],
        lineStyle:{
          color:barLineColor
        }
      },
      //坐标轴刻度
      axisTick:{
        show:false
      },
      //坐标轴刻度标签
      axisLabel:{
        show:false
      }
    },
    yAxis: {
      name:"业务类型",
      nameTextStyle:{
        color:pieColor,
        fontSize:fontSize
      },
      type: 'category',
      data: ['挂失','换卡','签约','查询','开卡'],
      max:5,
      //坐标轴轴线
      axisLine:{
        symbol:['none','arrow'],
        symbolSize:[8,10],
        lineStyle:{
          color:barLineColor
        }
      },
      //坐标轴刻度
      axisTick:{
        show:false
      },
      //坐标轴刻度标签
      axisLabel:{
        color:pieColor,
        fontSize:"90%"
      }
    },
    series: [
      {
        type: 'bar',
        data: [
          {
            value:10,
            name:'挂失',
            itemStyle:{
              color:"#f0b1b3"
            }
          },
          {
            value:10,
            name:'借记卡换卡',
            itemStyle:{
              color:"#fcd105"
            }
          },
          {
            value:10,
            name:'签约',
            itemStyle:{
              color:"#b2e6fa"
            }
          },
          {
            value:30,
            name:'查询',
            itemStyle:{
              color:"#f27f77"
            }
          },
          {
            value:40,
            name:'开卡',
            itemStyle:{
              color:"#6aaae1"
            }
          }
        ],
        barWidth:"50%",
      }
    ]
  };

}

export {line,pie,bar};
