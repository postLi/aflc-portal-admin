webpackJsonp([23],{"/O8v":function(e,t,n){"use strict";function o(e){n("oszT")}Object.defineProperty(t,"__esModule",{value:!0});var i=n("RqXf"),r=n("jqQh"),a=n("VU/8"),c=o,s=a(i.a,r.a,c,null,null);t.default=s.exports},"9UCZ":function(e,t,n){"use strict";var o=n("TuGF"),i=n("GrA4"),r=n("VU/8"),a=r(o.a,i.a,null,null,null);t.a=a.exports},"BTi/":function(e,t,n){"use strict";function o(e,t){var n=[];return e.map(function(e){e.index=t,n.push(e),e.children&&(n=n.concat(o(e.children,t+1)))}),n}var i=n("Dd8w"),r=n.n(i),a=n("O6e2"),c=n("u8ra"),s=n("NYxO");t.a={props:{value:{type:[Number,String]},disabled:{type:Boolean,default:!1}},watch:{value:function(e){this.aid=e,this.init()}},mounted:function(){var e=this;this.aid=this.value,this.init(),a.a.$on("closepopbox",function(){console.log("closepopbox selectTree:"),e.$refs.myautocomplete.handleClose()})},computed:r()({},Object(s.b)(["otherinfo"]),{openGroups:function(){return o(this.groups,1)}}),data:function(){return{groups:[],aid:""}},methods:{init:function(){var e=this;this.inited||(this.inited=!0,Object(c.a)(this.otherinfo.companyId).then(function(t){e.groups=t}).catch(function(t){e.inited=!1}))},change:function(e){this.$emit("change",e),this.$emit("input",e)}}}},GrA4:function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-select",e._b({ref:"myautocomplete",attrs:{placeholder:e.placeholder},on:{change:e.change},model:{value:e.val,callback:function(t){e.val=t},expression:"val"}},"el-select",e.$attrs,!1),[e._t("head"),e._v(" "),e._l(e.types,function(t){return[e._t("default",[n("el-option",{key:t.code,attrs:{label:t.name,value:t.code}})],{item:t})]}),e._v(" "),e._t("foot")],2)},i=[],r={render:o,staticRenderFns:i};t.a=r},RqXf:function(e,t,n){"use strict";var o=n("mvHQ"),i=n.n(o),r=n("woOf"),a=n.n(r),c=n("o9X6"),s=n("9UCZ");t.a={name:"cargoInfo-insure-search",components:{SelectTree:c.a,SelectType:s.a},props:{btnsize:{type:String,default:"mini"},orgid:{type:Number},isall:{type:Boolean,default:!1}},data:function(){return{searchForm:{insuranceName:""}}},watch:{orgid:function(e){}},mounted:function(){this.onSubmit()},methods:{onSubmit:function(){var e=a()({},this.searchForm);this.isall||delete e.orderStatus,console.log("this.searchForm2:",this.searchForm,i()(e)),this.$emit("change",e)},clearForm:function(){this.searchForm={insuranceName:""}}}}},TuGF:function(e,t,n){"use strict";var o=n("Dd8w"),i=n.n(o),r=n("O6e2"),a=n("t5DY"),c=n("NYxO"),s=n("TuU3");t.a={name:"selectType",props:{orgid:{type:[Number,String],default:""},type:{type:String,default:"",required:!0},placeholder:{type:String,default:"请选择"},value:{type:[Number,String,Array]},remote:{type:Boolean,default:!1}},computed:i()({},Object(c.b)(["otherinfo"])),data:function(){return{val:"",types:[],dataCache:{}}},watch:{value:{handler:function(e){this.val=e||""},immediate:!0}},mounted:function(){var e=this;if(this.remote)this.fetchData();else{var t=s.a.get(this.type);""===t?this.fetchData():this.types=t}r.a.$on("closepopbox",function(){console.log("closepopbox selectType:"),e.$refs.myautocomplete.handleClose()})},methods:{fetchData:function(){var e=this,t=function(t){e.types=t,s.a.set(e.type,t)};this.dataCache[this.type]?t(this.dataCache[this.type]):Object(a.f)(this.type,this.orgid||this.otherinfo.companyId).then(t)},change:function(e){this.$emit("change",e),this.$emit("input",this.val)}}}},TuU3:function(e,t,n){"use strict";window.TMS_DATA_CACHE={};var o={get:function(e){return window.TMS_DATA_CACHE[e]||""},set:function(e,t){return window.TMS_DATA_CACHE[e]=t,t}};t.a=o},fwBU:function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-select",{ref:"myautocomplete",staticClass:"select-tree",attrs:{disabled:e.disabled},on:{change:e.change},model:{value:e.aid,callback:function(t){e.aid=t},expression:"aid"}},e._l(e.openGroups,function(t){return n("el-option",{key:t.id,attrs:{label:t.name,value:t.id}},[n("div",{class:"indent indent"+t.index},[e._v(e._s(t.name))])])}))},i=[],r={render:o,staticRenderFns:i};t.a=r},jqQh:function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-form",{staticClass:"orderlist-search staff_searchinfo clearfix",attrs:{inline:!0,size:e.btnsize,"label-position":"right",model:e.searchForm}},[n("div",{staticClass:"search_warrper"},[n("el-form-item",{attrs:{label:"投保："}},[n("el-input",{attrs:{placeholder:"保险公司/产品名称/被保险人",maxlength:50,"auto-complete":"off"},model:{value:e.searchForm.insuranceName,callback:function(t){e.$set(e.searchForm,"insuranceName",t)},expression:"searchForm.insuranceName"}})],1)],1),e._v(" "),n("el-form-item",{staticClass:"staff_searchinfo--btn"},[n("el-button",{attrs:{size:"mini",icon:"el-icon-search",type:"primary"},on:{click:e.onSubmit}},[e._v("搜索")]),e._v(" "),n("el-button",{attrs:{size:"mini",icon:"el-icon-close",type:"info",plain:""},on:{click:e.clearForm}},[e._v("重置")])],1)],1)},i=[],r={render:o,staticRenderFns:i};t.a=r},kyx1:function(e,t){},o9X6:function(e,t,n){"use strict";function o(e){n("kyx1")}var i=n("BTi/"),r=n("fwBU"),a=n("VU/8"),c=o,s=a(i.a,r.a,c,null,null);t.a=s.exports},oszT:function(e,t){},t5DY:function(e,t,n){"use strict";function o(e){return e=e||"",h.b.get("/aflccommonservice/common/aflcCommonPCA/v1/findAflcCommonPCAByCode?code="+e).then(function(t){return t.code=e,t})}function i(){return v?new d.a(function(e){e(v)}):h.b.get("/anfacommonservice/common/oss/v1/policy").then(function(e){return v=e.data||"",setTimeout(function(){v=""},18e4),v})}function r(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return h.b.get("/aflccommonservice/sysDict/getSysDictByCodeGet/"+e).then(function(e){return e.data||[]})}function a(e){return h.b.axios({url:"/"+p+"/sysDict/getSysDictByCodeGet/"+e,method:"get"})}function c(e){return h.b.axios({url:"/"+p+"/common/aflcMemberCenter/v1/getShipperInfoByMobile?mobile="+e,method:"get"})}function s(e){return h.b.axios({url:"/"+p+"/common/aflcMemberCenter/v1/getDriverInfoByMobile?mobile="+e,method:"get"})}function u(e){return h.b.axios({url:"/"+p+"/common/aflcMemberCenter/v1/getLogisticsCompanyInfoByMobile?mobile="+e,method:"get"})}function l(e){return h.b.axios({url:"/aflcorderservice/order/fclOrder/v1/getDetailsByOrderSerial/"+e,method:"get"})}function f(e,t){var n=new FormData;for(var o in t)n.append(o,t[o]);var i="";for(var r in t)i+="&"+r+"="+t[r];return h.b.request({url:"/aflccommonservice/common/aflcMemberCenter/v1/updatePassword?memberType="+e,method:"put",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:i})}t.a=o,t.h=i,t.f=r,t.c=a,t.g=c,t.d=s,t.e=u,t.b=l,t.i=f;var m=n("//Fk"),d=n.n(m),h=n("Vo7i"),p="aflccommonservice",v=void 0},u8ra:function(e,t,n){"use strict";function o(e,t){return t||!l[e]?u.b.get("/api-system/system/org/v1/tree/"+e).then(function(t){var n=t.data||[];return l[e]=n,n}):new s.a(function(t){t(l[e])})}function i(e,t,n){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:100,i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1,r=e;return"object"!==(void 0===e?"undefined":a()(e))&&(r={pageSize:o,currentPage:i,vo:{name:t,orgid:e,mobilephone:n}}),u.b.post("/api-system/system/user/v1/findAllInfo",r).then(function(e){return e.data||{total:0,list:[]}})}t.a=o,t.b=i;var r=n("pFYg"),a=n.n(r),c=n("//Fk"),s=n.n(c),u=n("Vo7i"),l={}}});