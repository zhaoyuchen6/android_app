module.exports = {
    header: {
        i18n: '网上预填客户资料',
        login: "登陆",
        first: "第一支交易",
        list: "agreeSDK功能列表"
    },
    app: {
        changeLang: "中／英文转换",
        zhCN: "简体",
        zhTw: "繁体",
        English: "英语"
    },
    login: {
        home: "路由跳转至主页",
        i18n: "路由跳转至I18N",
        agreeSDK: "路由跳转至agreeSDK"
    },
    i18n: {
        name: '姓名',
        changeLang: "中／英文转换",
    },
    indexPage: {
        information: "情報",
        city: "北京",
        time: "朝", //上午
        weather: "晴れた日々", //晴天

        infoList: ["この規則によれば、純資産の高い個人の在庫は、2018年12月31日までにデューデリジェンスを完了する必要があります。",
            "ユニオンペイの小額の非圧縮非課税限度額は1,000元に引き上げられ、カード会員はそれを自力で閉じることができます。",             
            "リスク軽減のための厳格な規制、ムーディーズは中国の12銀行の基本信用格付けを引き上げた。"
        ], //资讯列表
        menuCardList: [
          {name:"AMEBIENTPOINT",text:"周辺網点",icon:"amebient-point",maskColor:['#a368bb','#cf9ee3'],img:"static/image/select-card/amebient-point.png",ifClick:false},
          {name:"SHOPSHOW",text:"製品デモ",icon:"shop-show",maskColor:["#d81616","#e9322e"],img:"static/image/select-card/shop-show.png",ifClick:true},
          {name:"COMPREHENSIVECONTRACT",text:"お客様予約",icon:"comprehensive-contract",maskColor:['#f47115','#f5a973'],img:"static/image/select-card/comprehensive-contract.png",ifClick:false},
          {name:"SMARTFORM",text:"スマート入力",icon:"smart-form",maskColor:['#07cee0','#84eff9'],img:"static/image/select-card/smart-form.png",ifClick:false}
        ], //菜单卡片设置
    }
}
