module.exports= {
    header: {
        i18n: 'Account Opening Pre-Application',
        login:"login",
        first:"first trade",
        list:"agreeSDK list"
    },
    app:{
        changeLang:"Chinese／Einglish",
        zhCN:"simplified",
        zhTw:"complex",
        English:"English"
    },
    login:{
        home:"Route to home",
        i18n:"Route to I18N",
        agreeSDK:"Route to agreeSDK"
    },
    i18n:{
        name:'Name',
        changeLang:"Chinese／Einglish",
        information : "information",
    },
    indexPage:{
        information : "information",
        city : "BeiJing",
        time : "morning",//??
        weather : "sunshine",//??
        infoList:[
            "According to the regulations, the existing personal high net worth account shall complete the due diligence before December 31, 2018",
            "Unionpay has raised the limit of small visa-free access to 1,000 yuan, allowing cardholders to close the card on their own",
            "Tighter regulation reduces risk, and moody's raised its basic credit ratings on 12 Chinese Banks"
        ],//????
        menuCardList:[
          {name:"AMEBIENTPOINT",text:"Peripheral branches",icon:"amebient-point",maskColor:['#a368bb','#cf9ee3'],img:"static/image/select-card/amebient-point.png",ifClick:false},
          {name:"SHOPSHOW",text:"Product display",icon:"shop-show",maskColor:["#d81616","#e9322e"],img:"static/image/select-card/shop-show.png",ifClick:true},
          {name:"COMPREHENSIVECONTRACT",text:"Customers booking",icon:"comprehensive-contract",maskColor:['#f47115','#f5a973'],img:"static/image/select-card/comprehensive-contract.png",ifClick:false},
          {name:"SMARTFORM",text:"Smart fill sheet",icon:"smart-form",maskColor:['#07cee0','#84eff9'],img:"static/image/select-card/smart-form.png",ifClick:false}
        ]//菜单卡片设置
    }
}
