webpackJsonp([11],{"/OH/":function(e,t,i){"use strict";function n(e){i("xT+W")}var a=i("xoQy"),s=i("qZ1X"),o=i("VU/8"),l=n,r=o(a.a,s.a,l,"data-v-173f2f52",null);t.a=r.exports},"1onU":function(e,t,i){"use strict";function n(e){i("Q66M"),i("rwP/")}var a=i("VT+v"),s=i("1pBW"),o=i("VU/8"),l=n,r=o(a.a,s.a,l,"data-v-6902e15e",null);t.a=r.exports},"1pBW":function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"tms-pagenation"},[i("span",{staticClass:"page-num",class:{disabled:e.pageNum<=1},on:{click:function(t){e.jumpTo(1)}}},[i("span",{staticClass:"first-page"})]),i("span",{staticClass:"page-num",class:{disabled:e.pageNum<=1},on:{click:function(t){e.jumpTo(e.pageNum-1)}}},[i("span",{staticClass:"prev-page"})]),e._v(" "),i("span",{staticClass:"page-jumper"},[e._v("\n    第\n    "),i("el-input",{ref:"input",staticClass:"el-pagination__editor is-in-pagination",attrs:{min:1,max:e.pages,type:"number",disabled:e.pages<=1},on:{keyup:e.handleKeyup,change:e.handleChange,focus:e.handleFocus,blur:e.handleBlur},model:{value:e.inputval,callback:function(t){e.inputval="string"==typeof t?t.trim():t},expression:"inputval"}}),e._v(" 页\n  ")],1),e._v("\n  /共 "+e._s(e.pages)+" 页\n  "),i("span",{staticClass:"page-num",class:{disabled:e.pageNum===e.pages},on:{click:function(t){e.jumpTo(e.pageNum+1)}}},[i("span",{staticClass:"next-page"})]),e._v(" "),i("span",{staticClass:"page-num",class:{disabled:e.pageNum===e.pages},on:{click:function(t){e.jumpTo(e.pages)}}},[i("span",{staticClass:"last-page"})]),e._v(" "),i("span",{staticClass:"tms-pagination__sizes"},[i("el-select",{staticClass:"page-select",attrs:{placeholder:"请选择"},on:{change:e.sizeChange},model:{value:e.size,callback:function(t){e.size=t},expression:"size"}},e._l(e.sizes,function(t,n){return i("el-option",{key:n,attrs:{label:t,disabled:e.pages<=1,value:t}})}))],1)])},a=[],s={render:n,staticRenderFns:a};t.a=s},"8Wls":function(e,t,i){"use strict";var n=i("LejG"),a=i("1onU"),s=i("mcg1");t.a={computed:{isShow:{get:function(){return this.centerDialogVisible},set:function(){}}},components:{Pager:a.a,vregion:s.a},props:{centerDialogVisible:{type:Boolean,default:!1},isMatreg:{type:Boolean,default:!1},isComreg:{type:Boolean,default:!1},selectInfo:{type:[Array,Object],default:function(){}},belongCity:{type:[Number,String]}},data:function(){return{popTitle:"",btnsize:"mini",sizes:[20,50,100],dataset:[],dataTotal:0,pagesize:20,page:1,totalCount:null,value:"",itemIndex:null,checked:!1,optionsclaimType:[],optionsComplainatusType:[],searchCreatTime:[],value3:!0,value4:!0,options:[{value:"首页",label:"首页"},{value:"物流专线栏目",label:"物流专线栏目"},{value:"专线详情页",label:"专线详情页"}],options1:[{value:"找物流专线",label:"找物流专线"},{value:"物流专线列表",label:"物流专线列表"},{value:"右侧专线列表",label:"右侧专线列表"},{value:"此路线其他专线",label:"此路线其他专线"}],form:{},rules:{recommendColumn:[{required:!0,message:"请选择推荐栏目"}],claimPic1:[{required:!0,message:"至少上传一张图片"}]},formAllData:{belongCityName:"",parkName:"",locationProvince:"",locationCity:"",locationArea:""}}},watch:{isMatreg:{handler:function(e){this.$refs.ruleForm&&this.$refs.ruleForm.resetFields(),this.isMatreg&&(this.popTitle="选择所在园区",this.fetchInfo(),console.log(this.info,"info"))}}},mounted:function(){},methods:{regionChange:function(e){console.log("data:",e),this.formAllData.belongCityName=e.province||e.city||e.area||e.town?(""+this.getValue(e.province)+this.getValue(e.city)+this.getValue(e.area)+this.getValue(e.town)).trim():"",this.formAllData.locationProvince=e.province?e.province.name:"",this.formAllData.locationCity=e.city?e.city.name:"",this.formAllData.locationArea=e.area?e.area.name:"",console.log(e.province.name)},getValue:function(e){return e?e.value:""},selectList:function(e){this.$emit("success",e),this.$emit("close")},enter:function(e,t){this.itemIndex=t},leave:function(){},reset:function(){this.$refs.ruleForm.resetFields()},closeMe:function(e){this.$emit("close"),this.reset(),"function"==typeof e&&e()},handleSearch:function(e){switch(e){case"searchForm":this.fetchInfo();break;case"clearForm":this.formAllData={parkName:""},console.log(6666),this.fetchInfo();break;case"add":this.isVisibleDialog=!0,this.isModify=!1,this.selectedInfo={}}},fetchInfo:function(){var e=this;return Object(n.a)(this.page,this.pagesize,this.formAllData).then(function(t){console.log("res",t),e.dataset=t.list,e.dataTotal=t.total}).catch(function(t){e.$message.warning(t.text||t.errorInfo||"无法获取服务端数据~")})},handlePageChange:function(e){this.page=e.pageNum,this.pagesize=e.pageSize,this.fetchInfo()},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;t.isMatreg,promiseObj.then(function(e){t.$message({message:"修改成功~",type:"success"}),t.closeMe(),t.$emit("success")}).catch(function(e){t.$message({type:"error",message:e.errorInfo||e.text||"未知错误，请重试~"}),t.loading=!1})})}}}},"8sHD":function(e,t,i){var n=i("kM2E"),a=i("KpO7");n(n.S+n.F*(Number.parseInt!=a),"Number",{parseInt:a})},BpPu:function(e,t){},KpO7:function(e,t,i){var n=i("7KvD").parseInt,a=i("mnVu").trim,s=i("hyta"),o=/^[-+]?0[xX]/;e.exports=8!==n(s+"08")||22!==n(s+"0x16")?function(e,t){var i=a(String(e),3);return n(i,t>>>0||(o.test(i)?16:10))}:n},LbWU:function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return e.isMatreg?i("div",{staticClass:"wzlReg"},[i("el-dialog",{attrs:{title:e.popTitle,visible:e.isShow,width:"30%",center:"","close-on-click-modal":!1,"before-close":e.closeMe},on:{"update:visible":function(t){e.isShow=t},close:e.closeMe}},[i("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.formAllData,rules:e.rules,inline:!0,"label-position":"right","label-width":"100px"}},[i("div",{staticClass:"search_warrper"},[i("el-form-item",{attrs:{label:"",prop:"belongCityName"}},[i("vregion",{staticClass:"form-control",attrs:{ui:!0},on:{values:e.regionChange}},[i("el-input",{attrs:{placeholder:"请选择园区所在地"},model:{value:e.formAllData.belongCityName,callback:function(t){e.$set(e.formAllData,"belongCityName",t)},expression:"formAllData.belongCityName"}})],1)],1),e._v(" "),i("el-form-item",{attrs:{label:"",prop:"recommendFee"}},[i("el-input",{attrs:{maxlength:20,placeholder:"请输入园区名称","auto-complete":"off",clearable:""},model:{value:e.formAllData.parkName,callback:function(t){e.$set(e.formAllData,"parkName","string"==typeof t?t.trim():t)},expression:"formAllData.parkName"}})],1),e._v(" "),i("el-form-item",{staticClass:"staff_searchinfo--btn"},[i("el-button",{attrs:{size:"mini",icon:"el-icon-search",type:"primary"},on:{click:function(t){e.handleSearch("searchForm")}}},[e._v("搜索")]),e._v(" "),i("el-button",{attrs:{size:"mini",icon:"el-icon-close",type:"info",plain:""},on:{click:function(t){e.handleSearch("clearForm")}}},[e._v("重置")])],1)],1),e._v(" "),i("div",{staticClass:"classify_info"},[i("ul",{staticClass:"addlist"},e._l(e.dataset,function(t,n){return i("li",{key:n,class:{itemHover:e.itemIndex===n},on:{click:function(i){e.selectList(t)},mouseenter:function(i){e.enter(t,n),e.dataset}}},[i("h4",[e._v(e._s(t.parkName))]),e._v(" "),i("span",[e._v(e._s(t.locationProvince+t.locationCity+t.locationArea+t.parkAddress))])])}))])]),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("div",{staticClass:"info_tab_footer"},[e._v("共计:"+e._s(e.dataTotal)+"\n      "),i("div",{staticClass:"show_pager"},[i("Pager",{attrs:{total:e.dataTotal,sizes:e.sizes},on:{change:e.handlePageChange}})],1)])])],1)],1):e._e()},a=[],s={render:n,staticRenderFns:a};t.a=s},LejG:function(e,t,i){"use strict";function n(e,t,i){return a.b.post("/aflc-uc/usercenter/aflclogisticspark/v1/list",{currentPage:e,pageSize:t,vo:i}).then(function(e){return e.data})}t.a=n;var a=i("Vo7i")},Q66M:function(e,t){},UZPH:function(e,t,i){"use strict";t.a={cn:{pleaseSelect:"请选择"},en:{pleaseSelect:"Please select"}}},"VT+v":function(e,t,i){"use strict";t.a={props:{sizes:{type:Array,default:function(){return[20,50,100,200]}},total:{type:Number,default:0}},computed:{pages:function(){return Math.ceil(this.total/this.size)}},watch:{pageNum:function(){this.inputval=this.pageNum},size:function(){this.pageNum=1}},data:function(){return{pageNum:1,oldValue:0,inputval:1,oldNum:1,size:20}},mounted:function(){this.size=this.sizes[0]},methods:{handleFocus:function(e){this.oldValue=e.target.value},sizeChange:function(){this.pageNum=1,this.pageNum=this.pageNum,this.$emit("change",{pageNum:this.pageNum,pageSize:this.size})},changeEvent:function(){this.oldNum!==this.pageNum&&(this.oldNum=this.pageNum,this.$emit("change",{pageNum:this.pageNum,pageSize:this.size}))},handleCurrentChange:function(e){this.pageNum=e,this.changeEvent()},handleSizeChange:function(e){this.size=e,this.changeEvent()},handleChange:function(e){var t=parseInt(e,10);isNaN(t)?this.inputval=1:t<1?this.inputval=1:t>this.pages?this.inputval=this.pages:this.inputval=t},handleBlur:function(e){var t=e.target;this.handleChange(t.value),this.jumpTo(this.inputval)},handleKeyup:function(e){var t=e.keyCode,i=e.target;console.log(t,i),13===t&&this.oldValue&&i.value!==this.oldValue&&(this.handleChange(i.value),this.oldValue="")},jumpTo:function(e){e<1?this.pageNum=1:e>this.pages?this.pageNum=this.pages:this.pageNum=e,this.changeEvent()}}}},bkiL:function(e,t){},gBtx:function(e,t,i){e.exports={default:i("qrpI"),__esModule:!0}},hyta:function(e,t){e.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"},keop:function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[!e.ui&&e.text?i("span",[e._v("\n        "+e._s(e.itemProvince&&e.itemProvince.value)+e._s(e.itemCity&&e.itemCity.value)+e._s(e.itemArea&&e.itemArea.value)+e._s(e.itemTown&&e.itemTown.value)+"\n    ")]):e._e(),e._v(" "),e.text||e.ui||!e.province?e._e():i("select",{directives:[{name:"model",rawName:"v-model",value:e.nowProvince,expression:"nowProvince"}],class:e.className,on:{change:function(t){var i=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.nowProvince=t.target.multiple?i:i[0]}}},[e.blank?i("option",{attrs:{value:""}},[e._v(e._s(e.lang.pleaseSelect))]):e._e(),e._v(" "),e._l(e.listProvince,function(t){return i("option",{key:t.key,domProps:{value:t.key}},[e._v(e._s(t.value))])})],2),e._v(" "),!e.text&&!e.ui&&e.city&&e.haveCity?i("select",{directives:[{name:"model",rawName:"v-model",value:e.nowCity,expression:"nowCity"}],class:e.className,on:{change:function(t){var i=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.nowCity=t.target.multiple?i:i[0]}}},[e.blank?i("option",{attrs:{value:""}},[e._v(e._s(e.lang.pleaseSelect))]):e._e(),e._v(" "),e._l(e.listCity,function(t){return i("option",{key:t.key,domProps:{value:t.key}},[e._v(e._s(t.value))])})],2):e._e(),e._v(" "),!e.text&&!e.ui&&(e.area&&e.city||!e.haveCity)&&e.listArea.length?i("select",{directives:[{name:"model",rawName:"v-model",value:e.nowArea,expression:"nowArea"}],class:e.className,on:{change:function(t){var i=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.nowArea=t.target.multiple?i:i[0]}}},[e.blank?i("option",{attrs:{value:""}},[e._v(e._s(e.lang.pleaseSelect))]):e._e(),e._v(" "),e._l(e.listArea,function(t){return i("option",{key:t.key,domProps:{value:t.key}},[e._v(e._s(t.value))])})],2):e._e(),e._v(" "),!e.text&&!e.ui&&e.town&&e.area&&e.city?i("select",{directives:[{name:"model",rawName:"v-model",value:e.nowTown,expression:"nowTown"}],class:e.className,on:{change:function(t){var i=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.nowTown=t.target.multiple?i:i[0]}}},[e.blank?i("option",{attrs:{value:""}},[e._v(e._s(e.lang.pleaseSelect))]):e._e(),e._v(" "),e._l(e.listTown,function(t){return i("option",{key:t.key,domProps:{value:t.key}},[e._v(e._s(t.value))])})],2):e._e(),e._v(" "),e.ui?i("div",{ref:"caller",staticClass:"caller-container",on:{click:function(t){t.stopPropagation(),t.preventDefault(),e.showDropdown(!0)}}},[e._t("default")],2):e._e(),e._v(" "),e.ui?i("v-dropdown",{ref:"dropdown"},[i("div",{staticClass:"rg-header"},[i("h3",[i("span",{directives:[{name:"show",rawName:"v-show",value:!(e.itemProvince||e.itemCity||e.itemArea||e.itemTown),expression:"!itemProvince&&!itemCity&&!itemArea&&!itemTown"}]},[e._v("行政区划选择器")]),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:e.itemProvince||e.itemCity||e.itemArea||e.itemTown,expression:"itemProvince||itemCity||itemArea||itemTown"}],staticClass:"rg-header-selected"},[e._v("\n                    "+e._s(e.itemProvince&&e.itemProvince.value)+e._s(e.itemCity&&e.itemCity.value)+e._s(e.itemArea&&e.itemArea.value)+e._s(e.itemTown&&e.itemTown.value)+"\n                ")])]),e._v(" "),i("button",{staticClass:"rg-removeall-button",attrs:{type:"button",title:"清除选择"},on:{click:e.clear}},[i("i",{staticClass:"iconfont icon-removeall"})]),e._v(" "),i("button",{staticClass:"rg-done-button",attrs:{type:"button",title:"完成"},on:{click:function(t){e.showDropdown(!1)}}},[i("i",{staticClass:"iconfont icon-selected"})])]),e._v(" "),e.search?i("div",{staticClass:"rg-search"},[i("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.query,expression:"query",modifiers:{trim:!0}}],ref:"input",staticClass:"rg-input",attrs:{type:"text",autocomplete:"off"},domProps:{value:e.query},on:{input:function(t){t.target.composing||(e.query=t.target.value.trim())},blur:function(t){e.$forceUpdate()}}})]):e._e(),e._v(" "),i("div",{staticClass:"rg-level-tabs"},[i("ul",e._l(e.levels,function(t,n){return e.checkAvailable(n)?i("li",{key:n},[i("a",{class:{active:n===e.levelIndex},attrs:{href:"javascript:void(0);",tab_id:"selectmenu_tab_"+(n+1),data_index:n},on:{click:function(t){e.levelIndex=n}}},[e._v(e._s(t.title))])]):e._e()}))]),e._v(" "),i("div",{staticClass:"rg-results-container"},[i("ul",{staticClass:"rg-results"},[e._l(e.list,function(t,n){return i("li",{key:n,class:{"rg-item":!0,active:e.matchItem(t)},on:{click:function(i){e.itemSelect(t)}}},[e._v(e._s(t.value))])}),e._v(" "),i("li",{directives:[{name:"show",rawName:"v-show",value:0===e.list.length,expression:"list.length === 0"}],staticClass:"rg-message-box"},[e._v("无匹配项目")])],2)])]):e._e()],1)},a=[],s={render:n,staticRenderFns:a};t.a=s},mcg1:function(e,t,i){"use strict";function n(e){i("BpPu")}var a=i("oCPT"),s=i("keop"),o=i("VU/8"),l=n,r=o(a.a,s.a,l,null,null);t.a=r.exports},mnVu:function(e,t,i){var n=i("kM2E"),a=i("52gC"),s=i("S82l"),o=i("hyta"),l="["+o+"]",r="​",c=RegExp("^"+l+l+"*"),u=RegExp(l+l+"*$"),h=function(e,t,i){var a={},l=s(function(){return!!o[e]()||r[e]()!=r}),c=a[e]=l?t(v):o[e];i&&(a[i]=c),n(n.P+n.F*l,"String",a)},v=h.trim=function(e,t){return e=String(a(e)),1&t&&(e=e.replace(c,"")),2&t&&(e=e.replace(u,"")),e};e.exports=h},nJn9:function(e,t,i){"use strict";function n(e){i("bkiL")}Object.defineProperty(t,"__esModule",{value:!0});var a=i("8Wls"),s=i("LbWU"),o=i("VU/8"),l=n,r=o(a.a,s.a,l,null,null);t.default=r.exports},oCPT:function(e,t,i){"use strict";var n=i("//Fk"),a=i.n(n),s=i("gBtx"),o=i.n(s),l=i("fZjL"),r=i.n(l),c=i("t5DY"),u=i("/OH/"),h=i("UZPH");t.a={name:"vregion",components:{"v-dropdown":u.a},props:{blank:{type:Boolean,default:!0},province:{type:Boolean,default:!0},city:{type:Boolean,default:!0},area:{type:Boolean,default:!0},town:{type:Boolean,default:!1},i18n:{type:String,default:"cn"},selected:Object,ui:{type:Boolean,default:!1},search:{type:Boolean,default:!0},text:{type:Boolean,default:!1},ifAera:{type:Boolean,default:!1}},data:function(){return{listProvince:[],listCity:[],listArea:[],listTown:[],nowProvince:"",nowCity:"",nowArea:"",nowTown:"",haveCity:!0,className:"",lang:{},init:this.selected,pauseWatch:!1,query:"",levels:[{index:0,title:"省/直辖市"},{index:1,title:"市"},{index:2,title:"区/县"},{index:3,title:"乡/镇/街道"}],levelIndex:-1,list:[],itemProvince:null,itemCity:null,itemArea:null,itemTown:null}},watch:{query:function(e){var t=this.getList(this.levelIndex),i=[];i=t.filter(function(t){return t.value.toLowerCase().includes(e.toLowerCase())}),0===i.length&&(i=t.filter(function(t){return t.key.includes(e)})),this.list=i},nowProvince:function(e){var t=this;this.pauseWatch||this.city&&this.fetchCity(e).then(function(i){if(i.code===t.nowProvince){var n=i.data;t.listArea.length&&t.listArea.splice(0,t.listArea.length),t.listCity=n,t.nowCity="",t.haveCity||(t.nowArea=""),t.itemProvince=t.listProvince.find(function(t){return t.key===e}),t.haveCity=!!t.listCity.length,t.$nextTick(function(){!t.haveCity&&t.area?t.changeCity():t.initSelected(2),t.ui&&(t.levelIndex=t.haveCity?1:2)}),t.changeValues()}})},nowCity:function(e){this.pauseWatch||(this.changeCity(),this.itemCity=this.listCity.find(function(t){return t.key===e}),this.ui&&(this.levelIndex=2),this.changeValues())},nowArea:function(e){if(!this.pauseWatch){var t=this;if(e&&t.town){var i=[];this.listTown=i}else this.listTown=[];this.town&&(this.nowTown=""),console.log("nowArea:",e,this.listArea),this.itemArea=this.listArea.find(function(t){return t.key===e}),this.initSelected(4),this.ui&&this.town&&(this.levelIndex=3),this.changeValues()}},nowTown:function(e){this.pauseWatch||(this.itemTown=this.listTown.find(function(t){return t.key===e}),this.changeValues())},selected:{handler:function(e){e&&r()(e).length&&(this.init=e,this.initSelected(1))},deep:!0},levelIndex:function(e){this.list=this.getList(e)}},methods:{changeCity:function(){var e=this;if(this.area||!this.haveCity&&this.province){if(this.haveCity&&!this.nowCity||!this.haveCity&&!this.nowProvince)console.log("2222222222:",this.haveCity,this.nowProvince,this.nowCity),this.listArea=[];else{var t=o()(this.haveCity?this.nowCity:this.nowProvince),i=this.haveCity;this.fetchCity(t).then(function(t){var n=t.data;if(i){if(e.nowCity!==t.code)return}else if(e.nowProvince!==t.code)return;e.listArea=n,console.log("333333333:",e.haveCity,e.nowProvince,e.nowCity,i,t.code,n),n.length&&(e.list=e.getList(2),e.initSelected(3))})}this.nowArea=""}else this.initSelected(3)},changeValues:function(){var e=this;this.$nextTick(function(){e.$emit("values",{province:e.itemProvince,city:e.itemCity,area:e.itemArea,town:e.itemTown})})},initSelected:function(e){var t=this,i=this.init,n=0;if(i&&r()(i).length){switch(e){case 1:t.province&&i.province&&(t.nowProvince=i.province);break;case 2:t.city&&i.city&&(t.nowCity=i.city);break;case 3:t.area&&i.area&&(t.nowArea=i.area);break;case 4:t.town&&i.town&&(t.nowTown=i.town)}t.province&&i.province&&n++,t.city&&(i.city||!i.city&&!t.haveCity&&t.area&&i.area)&&n++,t.area&&i.area&&n++,t.town&&i.town&&n++,e===n&&(this.init=null)}},getList:function(e){var t=[];switch(e){case 0:t=this.listProvince;break;case 1:t=this.listCity;break;case 2:t=this.listArea;break;case 3:t=this.listTown}return t},checkAvailable:function(e){var t=!1;switch(e){case 0:this.province&&(t=!0);break;case 1:this.city&&this.haveCity&&(t=!0);break;case 2:this.area&&(t=!0);break;case 3:this.town&&(t=!0)}return t},matchItem:function(e){return e.key===this.nowProvince||e.key===this.nowCity||e.key===this.nowArea||e.key===this.nowTown},itemSelect:function(e){switch(this.levelIndex){case 0:this.nowProvince=e.key,this.itemProvince=e;break;case 1:this.nowCity=e.key,this.itemCity=e;break;case 2:this.nowArea=e.key,this.itemArea=e;break;case 3:this.nowTown=e.key,this.itemTown=e}},showDropdown:function(e){var t=this;if(console.log(e),"boolean"==typeof e){var i=this;this.$refs.dropdown.$emit("show",e,this.$refs.caller);var n=!1,a=["北京市","天津市","重庆市","上海市","香港","澳门","台湾"];!1===e&&this.ifAera&&(a.forEach(function(e){0===t.itemProvince.name.indexOf(e)&&(n=!0)}),null==this.itemCity&&!1===n&&this.$emit("testCity")),e&&(this.query="",this.$nextTick(function(){return i.$refs.input.focus({preventScroll:!0})}))}},clear:function(){var e=this;this.pauseWatch=!0,this.nowProvince="",this.nowCity="",this.nowArea="",this.nowTown="",this.itemProvince=null,this.itemCity=null,this.itemArea=null,this.itemTown=null,this.listCity=[],this.listArea=[],this.listTown=[],this.levelIndex=0,this.$nextTick(function(){e.pauseWatch=!1,e.changeValues()})},fetchCity:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return new a.a(function(i){return Object(c.a)(t).then(function(t){return t.data=e.formatCity(t.data),i(t),t}).catch(function(e){console.log("err:",e),i({code:t,data:[]})})})},formatCity:function(e){return e.map(function(e){return e.key=e.code,e.value=e.name,e})}},beforeMount:function(){this.lang=h.a[this.i18n]},mounted:function(){var e=this;this.fetchCity().then(function(t){var i=t.data.filter(function(e){return e});e.listProvince=e.ui?i.concat().sort(function(e,t){var i=e.value.length-t.value.length;return 0===i?Number(e.key)-Number(t.key):i}):i.concat(),e.className=e.$el.className,e.$el.className="v-region",e.selected&&e.selected.province&&(e.nowProvince=e.selected.province),e.ui&&(e.levelIndex=0)})}}},qZ1X:function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"show"}],staticClass:"v-dropdown-container",style:[e.styleSheet]},[e._t("default")],2)},a=[],s={render:n,staticRenderFns:a};t.a=s},qrpI:function(e,t,i){i("8sHD"),e.exports=i("FeBl").Number.parseInt},"rwP/":function(e,t){},t5DY:function(e,t,i){"use strict";function n(e){return e=e||"",m.b.get("/aflccommonservice/common/aflcCommonPCA/v1/findAflcCommonPCAByCode?code="+e).then(function(t){return t.code=e,t})}function a(){return d?new f.a(function(e){e(d)}):m.b.get("/anfacommonservice/common/oss/v1/policy").then(function(e){return d=e.data||"",setTimeout(function(){d=""},18e4),d})}function s(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return m.b.get("/aflccommonservice/sysDict/getSysDictByCodeGet/"+e).then(function(e){return e.data||[]})}function o(e){return m.b.axios({url:"/"+p+"/sysDict/getSysDictByCodeGet/"+e,method:"get"})}function l(e){return m.b.axios({url:"/"+p+"/common/aflcMemberCenter/v1/getShipperInfoByMobile?mobile="+e,method:"get"})}function r(e){return m.b.axios({url:"/"+p+"/common/aflcMemberCenter/v1/getDriverInfoByMobile?mobile="+e,method:"get"})}function c(e){return m.b.axios({url:"/"+p+"/common/aflcMemberCenter/v1/getLogisticsCompanyInfoByMobile?mobile="+e,method:"get"})}function u(e){return m.b.axios({url:"/aflcorderservice/order/fclOrder/v1/getDetailsByOrderSerial/"+e,method:"get"})}function h(e,t){var i=new FormData;for(var n in t)i.append(n,t[n]);var a="";for(var s in t)a+="&"+s+"="+t[s];return m.b.request({url:"/aflccommonservice/common/aflcMemberCenter/v1/updatePassword?memberType="+e,method:"put",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:a})}t.a=n,t.h=a,t.f=s,t.c=o,t.g=l,t.d=r,t.e=c,t.b=u,t.i=h;var v=i("//Fk"),f=i.n(v),m=i("Vo7i"),p="aflccommonservice",d=void 0},"xT+W":function(e,t){},xoQy:function(e,t,i){"use strict";t.a={name:"v-dropdown",props:{position:{type:String,default:"left"}},data:function(){return{show:!1,styleSheet:{top:"",left:""}}},watch:{},methods:{visible:function(e,t){if("boolean"==typeof e){this.show=e;var i=this;this.$nextTick(function(){i.show&&i.adjust(t)})}},adjust:function(e){var t=e.getBoundingClientRect(),i=0,n=0,a=this.$el.getBoundingClientRect(),s=window.scrollY,o=document.body.clientHeight;if(this.rightClick){var l=this.y;this.y+a.height>s+o&&(l=this.y-a.height),n=this.x,i=l}else switch(i=t.top+t.height+5+s,this.position){case"left":n=t.left;break;case"center":n=t.left+t.width/2-a.width/2;break;case"right":n=t.left+t.width-a.width}this.styleSheet.top=i+"px",this.styleSheet.left=n+"px"},whole:function(e){if(this.show){-1===e.path.findIndex(function(e){return e.className&&e.className.includes("v-dropdown-container")})&&(this.show=!1)}}},mounted:function(){this.$on("show",this.visible),document.addEventListener("mousedown",this.whole)},destroyed:function(){this.$off("show",this.visible),document.removeEventListener("mousedown",this.whole)}}}});