import BmmpService from "@/common/api/bmmp-service";
export default {
    /**
     * @Description: 客户条件查询一
     * @Param: submitdata: AFA请求报文体
     * */

    customQuery(submitdata, groupFlag, func) {
        if (groupFlag) {
            return BmmpService.bmmpService('bmmp.cst.c0153.01', submitdata, func)
        } else {
            return BmmpService.bmmpService('bmmp.cst.c0011.01', submitdata, func)
        }
    },
    /**
     * @Description: 客户分组查询
     * @Param: submitdata: AFA请求报文体
     * */

    groupQuery(submitdata, func) {
        submitdata.XToken = "Notoken";
        return BmmpService.bmmpService('bmmp.cst.c0110.01', submitdata, func)
    },
    /**
     * @Description: 客户联系信息查询
     * @Param: submitdata: AFA请求报文体
     * */
    customInfoQuery(submitdata, func) {
        return BmmpService.bmmpService('bmmp.cst.c0037.01', submitdata, func)
    },
    /**
     * @Description: 客户标签信息查询
     * @Param: submitdata: AFA请求报文体
     * */
    custPcustLabelQuery(submitdata, func) {
        return BmmpService.bmmpService('bmmp.cst.c0060.01', submitdata, func)
    },
    /**
     * @Description: 客户标签信息查询
     * @Param: submitdata: AFA请求报文体
     * */
    custActivityInfoQuery(submitdata, func) {
        return BmmpService.bmmpService('bmmp.cst.c0141.01', submitdata, func)
    },
    /**
     * @Description: 联系信息
     * @Param: submitdata: AFA请求报文体
     * */
    liaisonInfoQuery(submitdata, func) {
        return BmmpService.bmmpService('bmmp.cst.c0057.01', submitdata, func)
    },
    /**
     * @Description: 借记卡持有查询
     * @Param: submitdata: AFA请求报文体
     * */
    cardQuery(submitdata, func) {
        return BmmpService.bmmpService('bmmp.cst.c0014.01', submitdata, func)
    },
    /**
     * @Description: 信用卡持有查询
     * @Param: submitdata: AFA请求报文体
     * */
    creditcardQuery(submitdata, func) {
        return BmmpService.bmmpService('bmmp.cst.c0016.01', submitdata, func)
    },
    /**
     * @Description: 理财持有查询
     * @Param: submitdata: AFA请求报文体
     **/
    finbindFormQuery(submitdata, func) {
        return BmmpService.bmmpService('bmmp.cst.c0020.01', submitdata, func)
    },

    /**
     * @Description: 归属历史记录
     * @Param: submitdata: AFA请求报文体
     * */
    belonghisInfoquery(submitdata, func) {
        return BmmpService.bmmpService('bmmp.cst.c0056.01', submitdata, func)
    },
    /**
     * @Description: 业务经办人记录
     * @Param: submitdata: AFA请求报文体
     * */
    processInfoquery(submitdata, func) {
        return BmmpService.bmmpService('bmmp.cst.c0120.01', submitdata, func)
    },
    /**
     * @Description: 消费查询
     * @Param: submitdata: AFA请求报文体
     * */
    creditInfoquery(submitdata, func) {
        return BmmpService.bmmpService('bmmp.cst.c0033.01', submitdata, func)
    },

    /**
     * @Description: 测试
     * @Param: submitdata: AFA请求报文体
     * */
    testquery(submitdata, func) {
        return BmmpService.bmmpService('bmmp.cst.c0033.01', submitdata, func)
    },

}