import LmhtsService from "@/common/api/lmhts-service";
import { LoginCsd } from '../js/resource';

export default{
    /**
   * @description: 查询  知识点
   * @author: 王哲
   * */
  // 查询知识点列表
  queryKnowledgeList(submitdata, obj, func) {
    return LmhtsService.lmhtsService('lmhts.kno.k005.01', submitdata, obj, func);
  },
  // 新增知识点
  addKnowledgeList(submitdata, func){
    let tradeCode = 'lmhts.kno.k002.01';
    ajax.vueRequest(tradeCode, submitdata, 'post', func);
  },
  // 修改知识点
  updateKnowledgeList(submitdata, func){
    let tradeCode = 'lmhts.kno.k003.01';
    ajax.vueRequest(tradeCode, submitdata, 'post', func);
  },
  // 删除知识点
  delKnowledgeList(submitdata, func){
    let tradeCode = 'lmhts.kno.k004.01';
    ajax.vueRequest(tradeCode, submitdata, 'post', func);
  },

}

