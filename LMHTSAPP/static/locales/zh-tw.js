module.exports = {
    header: {
        i18n: '網上預填客戶資料',
        login: "登陸",
        first: "第壹支交易",
        list: "agreeSDK功能列表"
    },
    app: {
        changeLang: "中／英文轉換",
        zhCN: "簡體",
        zhTw: "繁體",
        English: "英語"
    },
    login: {
        home: "路由跳轉至主頁",
        i18n: "路由跳轉至I18N",
        agreeSDK: "路由跳轉至agreeSDK"
    },
    i18n: {
        name: '姓名',
        changeLang: "中／英文轉換",
    },
    indexPage: {
        information: "資訊",
        city: "北京",
        time: "上午", //上午
        weather: "晴天", //晴天
        infoList: [
            "根據管理辦法規定，存量個人高淨值賬戶需要在2018年12月31日前完成盡職調查。",
            "銀聯小額免密免簽限額提升至千元，持卡人可自主關閉。",
            "嚴監管降低風險，穆迪上調12家中資行基礎信用評級。"

        ], //資訊列表
        menuCardList: [
          {name:"AMEBIENTPOINT",text:"周邊網點",icon:"amebient-point",maskColor:['#a368bb','#cf9ee3'],img:"static/image/select-card/amebient-point.png",ifClick:false},
          {name:"SHOPSHOW",text:"産品展示",icon:"shop-show",maskColor:["#d81616","#e9322e"],img:"static/image/select-card/shop-show.png",ifClick:true},
          {name:"COMPREHENSIVECONTRACT",text:"客戶預約",icon:"comprehensive-contract",maskColor:['#f47115','#f5a973'],img:"static/image/select-card/comprehensive-contract.png",ifClick:false},
          {name:"SMARTFORM",text:"智能填單",icon:"smart-form",maskColor:['#07cee0','#84eff9'],img:"static/image/select-card/smart-form.png",ifClick:false}
        ], //菜單卡片設置
    }
}
