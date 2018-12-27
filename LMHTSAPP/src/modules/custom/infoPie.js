/*客户资产统计*/
export let pie = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      data: ['存款','理财', '基金', '贵金属', '保险'],
      align: 'right', //水平方向位置
      verticalAlign: 'bottom', //垂直方向位置
      right:20,
      top:"10%",
      itemWidth:20,
      itemHeight:10,
      itemGap:8,
      textStyle:{
        fontSize:"80%"
      },
    },
    dataLabels: {
      //connectorColor: '#f00',  //设置连接线的颜色
      style: {  //设置标识文字的样式
        color: '#999999',
        fontSize:10,
        fontWeight: 'normal',   //字体不加粗
      },
    },
    series: [
      {
        name:"客户资产统计",
        type: 'pie',
        radius: ['35%', '50%'],
        center: ['40%', '50%'],
        color: [            //设置饼状图的颜色
          '#FF5F54',  //第一个颜色
          '#FDBA28',  //第二个颜色
          '#FDDD28',  //第三个颜色
          '#8CE5FF',  //第四个颜色
          '#00BAF1',  //第五个颜色
        ],
        data: [
          {value: 2010, name: '存款'},
          {value: 500, name: '理财'},
          {value: 234, name: '基金'},
          {value: 135, name: '贵金属'},
          {value: 300, name: '保险'}
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 5,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        label: {
          normal: {
            textStyle: {
              fontSize:"90%",
              color: 'black'
            }
          }
        },
      },
      {
        name: '',
        type: 'pie',
        clockWise: true,
        hoverAnimation: false,
        radius: [150, 150],
        center: ['40%', '50%'],
        label: {
          normal: {
            position: 'center',
          }
        },
        data: [{
          value: 0,
          label: {
            normal: {
              position: 'center',
              formatter: '客户资产统计',
              align:'center',
              verticalAlign:'middle',
              textStyle: {
                color: '#999999',
                fontSize:"90%",
              }
            },
          }
        },
          {
          tooltip: {
            show: false
          },
          label: {
            normal: {
              formatter: '\n56万',
              textStyle: {
                color: '#4C4C4C',
                fontSize:"100%"
              }
            }
          }
        }]
      }]
  };
/*客户负债总额*/
export let fzpie = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    data: ['存款','理财', '基金', '贵金属', '保险'],
    align: 'right', //水平方向位置
    verticalAlign: 'bottom', //垂直方向位置
    right:10,
    top:"10%",
    itemWidth:20,
    itemHeight:10,
    itemGap:8,
    textStyle:{
      fontSize:"80%"
    },
  },
  dataLabels: {
    //connectorColor: '#f00',  //设置连接线的颜色
    style: {  //设置标识文字的样式
      color: '#999999',
      fontWeight: 'normal',   //字体不加粗
    },
  },
  series: [
    {
      name:"客户负债总额",
      type: 'pie',
      radius: ['35%', '50%'],
      center: ['40%', '50%'],
      color: [            //设置饼状图的颜色
        '#FF5F54',  //第一个颜色
        '#FDBA28',  //第二个颜色
        '#FDDD28',  //第三个颜色
        '#8CE5FF',  //第四个颜色
        '#00BAF1',  //第五个颜色
      ],
      data: [
        {value: 2010, name: '存款'},
        {value: 1510, name: '理财'},
        {value: 500, name: '基金'},
        {value: 600, name: '贵金属'},
        {value: 780, name: '保险'}
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 5,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      label: {
        normal: {
          textStyle: {
            fontSize: "90%",
            color: 'black'
          }
        }
      },
    },
    {
      name: '',
      type: 'pie',
      clockWise: true,
      hoverAnimation: false,
      radius: [150, 150],
      center: ['40%', '50%'],
      label: {
        normal: {
          position: 'center',
        }
      },
      data: [{
        value: 0,
        label: {
          normal: {
            formatter: '客户负债总额',
            textStyle: {
              color: '#999999',
              fontSize:"90%",
            }
          }
        }
      }, {
        tooltip: {
          show: false
        },
        label: {
          normal: {
            formatter: '\n2300元',
            textStyle: {
              color: '#4C4C4C',
              fontSize:"100%"
            }
          }
        }
      }]
    }
  ]
};
/*月日均AUM*/
export let bar = {
  title : {
    text: '月日均AUM',
    left:5,
    top:5,
    textStyle:{
      fontSize:"100%"
    }
  },
  tooltip : {
    trigger: 'axis'
  },
  legend: {
    data:['AUM'],
    top:10,
    itemWidth:20,
    itemHeight:10,
    textStyle:{
      fontSize:"90%"
    },
  },
 /* toolbox: {
    show : true,
    feature : {
      dataView : {show: true, readOnly: false},
      magicType : {show: true, type: ['line', 'bar']},
      restore : {show: true},
      saveAsImage : {show: true}
    }
  },*/
  calculable : true,
  xAxis : [
    {
      type : 'category',
      data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
    }
  ],
  yAxis : [
    {
      type : 'value'
    }
  ],
  series : [
    {
      name:'AUM',
      type:'bar',
      data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
     /* markPoint : {
        data : [
          {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183},
          {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
        ]
      },
      markLine : {
        data : [
          {type : 'average', name : '平均值'}
        ]
      }*/
    }
  ]
};


