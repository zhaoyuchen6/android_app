/**
 * Created by getl on 2017/8/21.
 */
export default {
   getAfaJsonData (tradeCode,submitData){
     let SYS_HEAD = '{"ConsumerId":"01","TransServiceCode":"lmhts.kno.k005.01","RequestDate":"20160115","RequestTime":"162551","ConsumerSeqNo":"28160110183553234","ConsumerIP":"192.9.203.6","ServerIP":"192.9.200.131","TranMode":"1","MacValue":"68-F7-28-12-07-14","Reserve":""}';
     let APP_HEAD = '{"TdgBrah":"000000","TranTellerNo":"001"}';
     let Body = submitData;
     let sysHeadJSON = JSON.parse(SYS_HEAD);
     sysHeadJSON.TransServiceCode = tradeCode;
     let appHeadJSON = JSON.parse(APP_HEAD);
     let afaJSON  = {};
     afaJSON.SYS_HEAD = sysHeadJSON;
     afaJSON.APP_HEAD = appHeadJSON;
     if (JSON.stringify(Body)!="{}") {  // 如果没有参数则不传递
       afaJSON.Body = Body;
     }
     return afaJSON;
   }
}
