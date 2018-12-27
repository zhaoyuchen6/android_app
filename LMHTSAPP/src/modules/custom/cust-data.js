/*定义JSON数据*/
let businessJson = {
  "all": 100,
  "charts": {
    "query": 30,
    "loss": 10,
    "change": 10,
    "contract": 10,
    "open": 40
  }
};
/*定义常用变量*/
let lineColor = "#20C5FE";
let pieColor = "#4C4C4C";
let fontSize = "100%";
let bgColor = "#F7F7F7";
let fontFamily = "simHei";
let barLineColor = "#0C6E84";
/*客户活跃数-线图*/
export let cusActive = {
  tooltip: {
    trigger: 'axis'
  },
  toolbox: {
    show: false,
    feature: {
      mark: {
        show: true
      },
      dataView: {
        show: true,
        readOnly: false
      },
      magicType: {
        show: true,
        type: ['line', 'bar']
      },
      restore: {
        show: true
      },
      saveAsImage: {
        show: true
      }
    }
  },
  calculable: true,
  xAxis: [{
    type: 'category',
    boundaryGap: false,
    axisLabel: {
      show: true,
      interval: 0, //横轴信息全部显示
      rotate: 40, //40度角倾斜显示
      fontSize: "75%"
    },
    data: ['201701', '201702', '201703', '201704', '201705', '201706',
      '201707', '201708', '201709', '201710', '201711', '201712'
    ]
  }],
  yAxis: [{
    type: 'value',
    axisLabel: {
      formatter: '{value}',
      show: true,
      interval: 0, //纵轴信息全部显示
      fontSize: "75%"
    }
  }],
  grid: {
    containLabel: true,
    width: "90%",
    height: "90%",
    top: "5%",
    bottom: "5%",
    left: "5%",
    right: "5%"
  },
  series: [{
    name: '活跃客户数',
    type: 'line',
    data: [100, 120, 200, 190, 170, 180, 210, 250, 200, 170, 200, 190],
  }],
  color: ['#5AB1EF']
};
/*客户变动*/
export let custChange = {
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    textStyle: {
      fontSize: "75%"
    },
    data: ['新增客户', '流失客户']
  },
  toolbox: {
    show: false,
    feature: {
      mark: {
        show: true
      },
      dataView: {
        show: true,
        readOnly: false
      },
      magicType: {
        show: true,
        type: ['line', 'bar']
      },
      restore: {
        show: true
      },
      saveAsImage: {
        show: true
      }
    }
  },
  calculable: true,
  xAxis: [{
    type: 'category',
    boundaryGap: false,
    axisLabel: {
      show: true,
      interval: 0, //横轴信息全部显示
      rotate: 40, //40度角倾斜显示
      fontSize: "75%"
    },
    data: ['201701', '201702', '201703', '201704', '201705', '201706',
      '201707', '201708', '201709', '201710', '201711', '201712'
    ]
  }],
  yAxis: [{
    type: 'value',
    axisLabel: {
      formatter: '{value}',
      show: true,
      interval: 0, //纵轴信息全部显示
      fontSize: "75%"
    }
  }],
  grid: {
    containLabel: true,
    width: "90%",
    height: "80%",
    top: "15%",
    bottom: "5%",
    left: "5%",
    right: "5%"
  },
  series: [{
      name: '新增客户',
      type: 'line',
      data: [20, 10, 0, 12, 15, 24, 30, 40, 10, 20, 0, 5],
    },
    {
      name: '流失客户',
      type: 'line',
      data: [5, 2, 6, 3, 10, 7, 3, 1, 0, 0, 7, 2],
    }
  ],
  color: ['#FFB980', '#B6A2DE']
};
/*客户等级分布*/
export let custLevel = {
  title: {
    x: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
    orient: 'vertical',
    top: "middle",
    left: "right",
    itemWidth: 18,
    itemHeight: 9,
    itemGap: 5,
    textStyle: {
      fontSize: "75%"
    },
    data: ['普通', '白银', '黄金', '白金', '铂金', '钻石']
  },
  toolbox: {
    show: false,
    feature: {
      mark: {
        show: true
      },
      dataView: {
        show: true,
        readOnly: false
      },
      magicType: {
        show: true,
        type: ['pie', 'funnel']
      },
      restore: {
        show: true
      },
      saveAsImage: {
        show: true
      }
    }
  },
  calculable: true,
  series: [{
    name: '客户等级分布',
    type: 'pie',
    radius: '65%',
    center: ['50%', '48%'],
    label: {
      normal: {
        fontSize: "75%"
      }
    },
    data: [{
        value: 45,
        name: '普通'
      },
      {
        value: 20,
        name: '白银'
      },
      {
        value: 15,
        name: '黄金'
      },
      {
        value: 10,
        name: '白金'
      },
      {
        value: 6,
        name: '铂金'
      },
      {
        value: 4,
        name: '钻石'
      }
    ]
  }],
  color: ['#D87A80', '#B6A2DE', '#5AB1EF', '#2EC7C9', '#FFB980', '#C8E49C']
};
/*客户资产 柱状图*/
export let custAmount = {

  tooltip: {
    trigger: 'axis'
  },
  legend: {
    orient: 'horizontal',
    y: 'top',
    x: 'center',
    itemWidth: 18,
    itemHeight: 9,
    textStyle: {
      fontSize: "75%"
    },
    data: ['客户资产额'],
    title: {
      show: true,
      text: '金额'
    }
  },
  toolbox: {
    show: false,
    feature: {
      dataView: {
        show: true,
        readOnly: false
      },
      magicType: {
        show: true,
        type: ['line', 'bar']
      },
      restore: {
        show: true
      },
      saveAsImage: {
        show: true
      }
    }
  },
  calculable: true,
  xAxis: [{
    type: 'category',
    axisLabel: {
      show: true,
      interval: 0, //横轴信息全部显示
      rotate: 40, //40度角倾斜显示
      fontSize: "75%"
    },
    data: ['201701', '201702', '201703', '201704', '201705', '201706',
      '201707', '201708', '201709', '201710', '201711', '201712'
    ]
  }],
  yAxis: [{
    type: 'value',
    axisLabel: {
      formatter: '{value}万',
      show: true,
      interval: 0, //纵轴信息全部显示
      fontSize: "75%"
    }
  }],
  grid: {
    containLabel: true,
    width: "90%",
    height: "80%",
    top: "15%",
    bottom: "5%",
    left: "5%",
    right: "5%"
  },
  series: [{
    name: '客户资产额',
    type: 'bar',
    data: [25.0, 26.9, 37.0, 23.2, 25.6, 56.7, 55.6, 72.2, 82.6, 88.0, 60, 90],
  }],
  color: ['#2EC7C9']
};
