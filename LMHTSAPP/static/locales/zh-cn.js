module.exports= {
    header: {
        i18n: '网上预填客户资料',
        login:"登陆",
        first:"第一支交易",
        list:"agreeSDK功能列表"
    },
    app:{
        changeLang:"中／英文转换",
        zhCN:"简体",
        zhTw:"繁体",
        English:"英语"
    },
    login:{
        home:"路由跳转至主页",
        i18n:"路由跳转至I18N",
        agreeSDK:"路由跳转至agreeSDK"
    },
    i18n:{
        name:'姓名',
        changeLang:"中／英文转换",
    },
    indexPage:{
        information : "资讯",
        city : "北京",
        time : "上午",//上午
        weather : "晴天",//晴天
        infoList:[
            "根据管理办法规定，存量个人高净值账户需要在2018年12月31日前完成尽职调查。",
            "银联小额免密免签限额提升至千元，持卡人可自主关闭。",
            "严监管降低风险，穆迪上调12家中资行基础信用评级。"
        ],//资讯列表
        menuCardList:[
          {name:"AMEBIENTPOINT",text:"周边网点",icon:"amebient-point",maskColor:['#a368bb','#cf9ee3'],img:"static/image/select-card/amebient-point.png",ifClick:false},
          {name:"SHOPSHOW",text:"产品展示",icon:"shop-show",maskColor:["#d81616","#e9322e"],img:"static/image/select-card/shop-show.png",ifClick:true},
          {name:"COMPREHENSIVECONTRACT",text:"客户预约",icon:"comprehensive-contract",maskColor:['#f47115','#f5a973'],img:"static/image/select-card/comprehensive-contract.png",ifClick:false},
          {name:"SMARTFORM",text:"智能填单",icon:"smart-form",maskColor:['#07cee0','#84eff9'],img:"static/image/select-card/smart-form.png",ifClick:false}
        ],//菜单卡片设置
    }
}
