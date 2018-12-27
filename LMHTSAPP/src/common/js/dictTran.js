	/** 
	获取字典
       */  
	  export default{
		getDictJson(itemid){
			let vm = this;
			let dictList =[];
			vm.DictData =  JSON.parse(localStorage.getItem("DictData"));

			for(let i=0,len=vm.DictData.length;i<len;i++){
			  let item = vm.DictData[i];
			  let dict ={};
			   
			  if(item.dictitem ===itemid){
				dict.key = item.dictvalue;
				dict.value = item.dictname;
				dictList.push(dict);
			  }
			 
			}
			return dictList;
		}
	}
			
			// var data;
			// var dictdata= localStorage.getItem('DictData');
			// if(dictdata!=null){
			// 	for(let i=0;i<dictdata.length;i++){
			// 		let item = dictdata[i];
			// 		if(item.dictitem == itemid){
			// 			data = dictdata[i];
			// 	    	return false;
			// 		}
			// 	}
			// 	// $.each( dictdata, function( key, val ) {
			// 	// 	if(key==itemid){
			// 	// 		data=  val;
			// 	// 		return false;
			// 	// 	}
			// 	//   });
			// 	 var dictarr=data;
			// 	   if (dictarr != null && dictarr.length > 0) {
			// 		   for(var i=0;i<dictarr.length;i++){ 
			// 			var tmp=dictarr[i]; 
			// 			dictarr[i].dictValueDesc=tmp.dictValueDesc.substr(tmp.dictValueDesc.indexOf('-') + 1);
			// 		}
			// 	   } 
			// 	   return  dictarr;
			//    }
	// 	   } 
	//   }
// 		function getDictJson(itemid){
// 				var data;
// 				var dictdata= localStorage.getItem('DictData');
// 				if(dictdata!=null){
// 					// for (var i in dictdata){
// 					// 	debugger;
// 					// 	if(i.dictitem==itemid){
// 					//     	data = dictdata[i];
// 					//     	return false;
// 					//     }
// 					// }
// 					$.each( dictdata, function( key, val ) {
// 					    if(key==itemid){
// 					    	data=  val;
// 					    	return false;
// 					    }
// 					  });
// 			         var dictarr=data;
// 			   		if (dictarr != null && dictarr.length > 0) {
// 			   			for(var i=0;i<dictarr.length;i++){ 
// 							var tmp=dictarr[i]; 
// 							dictarr[i].dictValueDesc=tmp.dictValueDesc.substr(tmp.dictValueDesc.indexOf('-') + 1);
// 						}
// 			   		} 
// 			   		return  dictarr;
// 		   		}
// 		   	} 
//           function getDictJsonNomidline(itemid){
//   		   		return getDictJson();
//   		   	}
//   		   	/**
//   		   	*获取带中线的字典
//   		   	*/
//   		   	function getAppDictionaryItemWithline(itemid){
//   		   		var data;
//   		   		var dictdata= localStorage.getItem();
//   		   		if(dictdata!=null){
// 					$.each( dictdata, function( key, val ) {
// 					    if(key==itemid){
// 					    	data=  val;
// 					    }
// 					  });
// 	  		   		return  data;
// 	  		   	}else{
// 			   		var submitdata ={};
// 			   		var dictarr;
// 			   		$.ajax({
// 								   type:"post",
// 			                       url:"BasePackage/common_getSystemDictionaryByItem?item_id="+itemid,
// 			                       async :false,//async 异步 
// 			                   	   dataType:'json',    //接受数据格式
// 					  	 		   data: submitdata, 
// 			                 	   success:function(data){
// 				                 		  data=eval('('+data.actionresult+')');
// 				                 		   dictarr=data.field1;
// 			                   		 }
// 			         });
// 			         return dictarr;
// 	  		   	}
  		   	
//   		   	} 
  		   	 
//        /** 
//        * @see   ç¿»è¯å­å¸å¼ 
//        * @param  
//        * @return è¿åå­ç¬¦ä¸² 
//        */  
//       //ç¿»è¯å­å¸çæ¹æ³
// 		 function  translateDict(jonstore,val){
// 		 	//éålist
// 		 	//è¿åå­å¸å¼
			 
// 			 if(val==null){
// 				 return "";
// 			 }
// 			 if(val=="[object Object]"){
// 						return  "";	 
// 			 }
// //			 storelist=jonstore.field1;
// 			 if(jonstore == null || jonstore == undefined || jonstore == '' || jonstore.length == 0){
// 				 return val;
// 			 }
			 
// 		 	 for(var i=0;i<jonstore.length;i++){
// 		 		 if(typeof jonstore[i].dictValue=='undefined'){
// 		 			 if(jonstore[i].dictename==val){
// 		 				 return jonstore[i].dictcname;
// 		 			 }
// 		 		 }
// 		 		 else{
// 		 			if(jonstore[i].dictValue == val){
// 			 	         return jonstore[i].dictValueDesc;
// 			 	    }	

// 		 		 }
// 		 	}
// 		 	 //ä»¥ä¸è¿ç¨é½æ²¡ææ¾å°å¹éçè§£é
// 		 	return val;
// 		 }
		 
		 
// 		 /**
// 		  * @see ç¿»è¯å­å¸(äºçº§å­å¸ä¸­çç¬¬ä¸çº§)
// 		 * @param jsonstore
// 		 * @param value
// 		 */
// 		function translateLinkage(jsonstore, value) {
// 			 if (value == null) {
// 				 return '';
// 			 } else if (value == '[object Object]') {
// 				 return '';
// 			 } else {
// 				 for (var i = 0; i < jsonstore.length; i++) {
// 					 if (jsonstore[i].dictename == value) {
// 						 return jsonstore[i].dictcname;
// 					 }
// 				 }
// 			 }
// 		 }
		 
// 	      //éè¿UserIdæ¥è¯¢Userä¿¡æ¯
// 		 function  getUserById(userid){
// 		 		var user;
// 		   		var submitdata ={"userid":userid};
// 		   		$.ajax({
// 							   type:"post",
// 		                       url:"BasePackage/ngosscommon_queryUserById",
// 		                       async :false,//async å¼æ­¥ 
// 		                   	   dataType:'json',    //æ¥åæ°æ®æ ¼å¼
// 				  	 		   data: submitdata, 
// 		                 	   success:function(data){
// 		                 		   data=eval('('+data.actionresult+')');
// 		                 		   user=data.user;
// 		                   		 }
// 		         });
		   		
// 		   		return  user;
// 		 }
		 
// 		 //æ ¹æ®ä¼ å¥çæºæç±»åè·åæºææ ä¿¡æ¯(æ¬é¨é¨åä¿¡æ¯)
// 		 function getUnitTreeByUnitType(unittype) {
// 			 var unittree;
// 			 var submitdata = {"unittype": unittype};
// 			 $.ajax({
// 				 type:"post",
//                  url:"ngosscommon/ngosscommon_queryUnitTreeCombobox",//?unittype=4
//                  async :false,//async å¼æ­¥ 
//              	 dataType:'json',    //æ¥åæ°æ®æ ¼å¼
// 	  	 		 data: submitdata, 
// 	  	 		 success:function(data){
// 	  	 			 data=eval('('+data.actionresult+')');
// 	  	 			 unittree=data.unittree;
// 	  	 		 }
// 			 });
			 
// 			 return unittree;
// 		 }
			
// 		//æ ¹æ®ä¼ å¥çæºæç±»åè·åæºææ ä¿¡æ¯//ï¼é©¬å°æ°èªç¨ï¼
// 		 function getUnitTreeByUnitTypeAndNodeId(unittype, nodeid, flag) {
// 			 var unittree;
// 			 var submitdata = {"unittype": unittype, "nodeid" : nodeid, "flag": flag};
// 			 $.ajax({
// 				 type:"post",
//                  url:"ngosscommon/ngosscommon_queryUnitTreeComboboxAndNodeId",
//                  async :false,//async å¼æ­¥ 
//              	 dataType:'json',    //æ¥åæ°æ®æ ¼å¼
// 	  	 		 data: submitdata, 
// 	  	 		 success:function(data){
// 	  	 			 data=eval('('+data.actionresult+')');
// 	  	 			 unittree=data.unittree;
// 	  	 		 }
// 			 });
			 
// 			 return unittree;
// 		 }
		 
// 		//è·åBUåSBUåè¡¨
// 		 function getUnitTreeByType(type) {
// 			 var unitlist;
// 			 var submitdata = {};
// 			 submitdata.type=type;
// 			 $.ajax({
// 				 type:"post",
//                  url:"admin/systemunit_queryUnitByCombobox",
//                  async :false,//async å¼æ­¥ 
//              	 dataType:'json',    //æ¥åæ°æ®æ ¼å¼
// 	  	 		 data: submitdata, 
// 	  	 		 success:function(data){
// 	  	 			 data=eval('('+data.actionresult+')');
// 	  	 			unitlist=data.unitlist;
// 	  	 		 }
// 			 });
			 
// 			 return unitlist;
// 		 }
		 
// 		 /**
// 		 * @param applyareaéç¨èå´(ç¨äºæ¥æ¾ä¸çº§éé¡¹)
// 		 * @param enameè±æåç§°(ç¨äºæ¥æ¾è³æºéé¡¹)
// 		 */
// 		function getLinkageDict(applyarea, secondaryvalue) {
// 			var dicttypelist = window.parent.window.getDicttypeList();
// 			var data, dictitem;
// 			 if(dicttypelist!=null){
// 				$.each(dicttypelist, function(key, value) {
// 					if (key == applyarea) {
// 						data = value;
// 					}
// 				});
				
// 				if (secondaryvalue == undefined || secondaryvalue == null || secondaryvalue == '') {
// 					return data;
// 				} else {
// 					$.each(data, function(index, val) {
// 						if (val.dictename == secondaryvalue || val.secondaryvalue == secondaryvalue) {
// 							dictitem = val.dictitem;
// 						}
// 					});
					
// 					return getDictJson(dictitem);
// 				}
// 			}else{
// 				var url = "BasePackage/common_getSystemLinkageDictionary";
// 				 //处理提交数据
// 				 var submitdata = {};
// 				 submitdata['applyarea'] = applyarea;
// 				 if (secondaryvalue != undefined && secondaryvalue != null && secondaryvalue != '' && secondaryvalue.trim() != '') {
// 					 submitdata['secondaryvalue'] = secondaryvalue;
// 				 }
				 
// 				 var dictjson;
// 				 $.ajax({
// 					 type: "post",
// 	                 url: url,
// 	                 async :false,//async 异步
// 	                 dataType:'json',    //接受数据格式
// 	                 data: submitdata,
// 	                 success:function(data){
// 	                	 data=eval('('+data.actionresult+')');
// 	                	 dictjson=data;
// 	                 }
// 				 });
				 
// 				 return dictjson.diction;
// 			}
// 		 }
		
// 		/**
// 		 * @param count: è·åå¹´ä»½çè®¡æ°(å¦æç´æ¥ä¼ trueï¼åè¡¨ç¤ºæ ¹æ®å½åæ¶é´è·åä¸å¹´æä¸¤å¹´çstore(ç¬¬åå­£åº¦è·åä¸¤å¹´ï¼å¶ä½è·åä¸å¹´))
// 		 * @param from: è¡¨ç¤ºä»fromå¹´åå¼å§è·å(å½count>ä¸ºæ°å­æ¶çæ)
// 		 */
// 		function getYearDict(count, from) {
// 			var url = "ngosscommon/ngosscommon_getYearCombobox";
// 			var dictjson;
// 			var submitdata = {};
// 			submitdata['count'] = count;
// 			if (!isNaN(count)) {
// 				if (from != null) {
// 					//éªè¯fromæ¯å¦ä¸ºæ°å­
// 					if (!isNaN(from)) {
// 						submitdata['from'] = from;
// 					} else {
// 						submitdata['from'] = 0;
// 					}
// 				} else {
// 					submitdata['from'] = 0;
// 				}
// 			}
// 			$.ajax({
// 				 type: "post",
//                 url: url,
//                 async :false,//async å¼æ­¥
//                 dataType:'json',    //æ¥åæ°æ®æ ¼å¼
//                 data: submitdata,
//                 success:function(data){
//                	 data=eval('('+data.actionresult+')');
//                	 dictjson=data;
//                 }
// 			 });
			
// 			return dictjson.yeardict;
// 		}
		
		
// 		/**
//  * @see æ ¹æ®ç±»ååæ ¹èç¹è·åæºææ 
//  * */
// function getUnitComboboxByTypeAndRoot(unittype, root) {
// 	var submitdata = {};
// 	submitdata.unitid = root;
// 	submitdata.unittype = unittype;
	
// 	var unittree;
	 
// 	 $.ajax({
// 		 type:"post",
// 		 url:"admin/systemunit_queryUnitByType",
//        // url:"ngosscommon/ngosscommon_getUnitComboboxByRootAndType",
//         async :false,//async å¼æ­¥ 
//     	 dataType:'json',    //æ¥åæ°æ®æ ¼å¼
// 	 		 data: submitdata, 
// 	 		 success:function(data){
// 	 			// data=eval('('+data.actionresult+')');
// 	 			 unittree=data;
// 	 		 }
// 	 });
	 
// 	 return unittree;
// }
// //ç¿»è¯é¨é¨çæ¹æ³
// function  translateUnit(unitstore,val){
// 			 if(val==null){
// 				 return "";
// 			 }
// 			 if(val=="[object Object]"){
// 						return  "";	 
// 			 }
// 		 	 for(var i=0;i<unitstore.length;i++){
// 		 	     if(unitstore[i].unitid == val.toString()){
// 		 	         return unitstore[i].unitname;
// 		 	     }
// 		 	 }
// 	}
		 
// /**
//  * @see 根据根节点和机构层级获取机构树
//  * @param root
//  * @param level
//  * @param unittype 默认为2-部门
//  */
// function getUnitTreeByRootAndLevel(root, level, unittype) {
// 	var submitdata = {};
// 	submitdata.root = root;
// 	submitdata.level = level;
// 	if (unittype != null && unittype != undefined && unittype != '') {
// 		submitdata.unittype = unittype;
// 	} else {
// 		submitdata.unittype = '2';
// 	}
	
// 	var unittree;
	
// 	$.ajax({
// 		 type:"post",
//       url:"ngosscommon/ngosscommon_getUnitTreeByRootAndLevel",
//       async :false,
//   	 	dataType:'json',
// 	 		 data: submitdata, 
// 	 		 success:function(data){
// 	 			 data=eval('('+data.actionresult+')');
// 	 			 unittree=data.unittree;
// 	 		 }
// 	 });
	 
// 	 return unittree;
// }