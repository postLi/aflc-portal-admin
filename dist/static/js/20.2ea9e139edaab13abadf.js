webpackJsonp([20,49],{"09dA":function(e,t,s){"use strict";var n=s("mvHQ"),a=s.n(n),i=s("4UdH"),r=s("1jhZ"),o=s("GHq+"),c=s("1onU");t.a={components:{SearchForm:o.default,Pager:c.a},computed:{orgid:function(){return console.log(this.selectInfo.orgid,this.searchQuery.vo.orgid,this.otherinfo.orgid),this.isModify?this.selectInfo.orgid:this.searchQuery.vo.orgid||this.otherinfo.orgid}},mounted:function(){var e=this;this.searchQuery.vo.orgid=this.otherinfo.orgid,this.fetchAllCustomer(this.otherinfo.orgid).then(function(t){e.loading=!1})},data:function(){return{btnsize:"mini",usersArr:[],total:0,loading:!0,setupTableVisible:!1,AddCustomerVisible:!1,isModify:!1,selectInfo:{},selected:[],sizes:[20,50,100],searchQuery:{currentPage:1,pageSize:20,vo:{endAddress:"",strartAddress:""}}}},methods:{createNew:function(){this.$router.push("/carinfo/create")},fetchAllCustomer:function(){var e=this;return this.loading=!0,r.c(this.searchQuery).then(function(t){console.log("list:",t,t.list),e.usersArr=t.list,e.total=t.totalCount,e.loading=!1})},fetchData:function(){this.fetchAllCustomer()},handlePageChange:function(e){this.searchQuery.currentPage=e.pageNum,this.searchQuery.pageSize=e.pageSize,this.fetchAllCustomer()},getSearchParam:function(e){this.searchQuery.currentPage=1,this.searchQuery.vo=e,this.fetchAllCustomer()},showImport:function(){},setRemote:function(e,t){var s=this;return r.h(e,t).then(function(){s.fetchData()}).catch(function(e){s.$message.error("操作出错了： "+a()(e))})},enableItem:function(e,t){var s=this;return r.g(e,t).then(function(){s.fetchData()}).catch(function(e){s.$message.error("操作出错了： "+a()(e))})},doAction:function(e){var t=this;if("import"===e)return this.showImport(),!1;if(!this.selected.length&&"add"!==e)return this.closeAddCustomer(),this.$message({message:"请选择要操作的项~",type:"warning"}),!1;switch(console.log("this.selected:",this.selected),e){case"add":this.isModify=!1,this.selectInfo={},this.openAddCustomer();break;case"modify":this.isModify=!0,this.selected.length>1&&this.$message({message:"每次只能修改单条数据~",type:"warning"}),this.selectInfo=this.selected[0],this.openAddCustomer();break;case"delete":var s=this.selected.length>1?this.selected.length+"名":this.selected[0].carrierName,n=this.selected.map(function(e){return e.carrierId});n=n.join(","),this.$confirm("确定要删除 "+s+" 客户吗？","提示",{confirmButtonText:"删除",cancelButtonText:"取消",type:"warning"}).then(function(){Object(i.a)(n).then(function(e){t.$message({type:"success",message:"删除成功!"}),t.fetchData()}).catch(function(e){t.$message({type:"info",message:e.errorInfo})})}).catch(function(){t.$message({type:"info",message:"已取消删除"})});break;case"export":var a=this.selected.map(function(e){return e.carrierId});Object(i.c)(a.join(",")).then(function(e){t.$message({type:"success",message:"即将自动下载!"})})}this.$refs.multipleTable.clearSelection()},deleteItem:function(e){var t=this;this.$confirm("确定要删除吗？","提示",{confirmButtonText:"删除",cancelButtonText:"取消",type:"warning"}).then(function(){r.a(e).then(function(e){t.$message({type:"success",message:"删除成功!"}),t.fetchData()}).catch(function(e){t.$message({type:"info",message:e.errorInfo})})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},changeItem:function(e){this.$router.push("/carinfo/create?id="+e)},setTable:function(){this.setupTableVisible=!0},closeSetupTable:function(){this.setupTableVisible=!1},openAddCustomer:function(){this.AddCustomerVisible=!0},closeAddCustomer:function(){this.AddCustomerVisible=!1},clickDetails:function(e,t,s){this.$refs.multipleTable.toggleRowSelection(e)},getSelection:function(e){this.selected=e},onSubmit:function(){}}}},"13md":function(e,t){},"1jhZ":function(e,t,s){"use strict";function n(e){return d.b.get("/aflc-uc/usercenter/aflcCarInfo/v1/getDetails/"+e)}function a(e){return d.b.post("/aflc-uc/usercenter/aflcCarInfo/v1/add",e)}function i(e){return d.b.delete("/aflc-uc/usercenter/aflcCarInfo/v1/delete/"+e)}function r(e){return d.b.post("/aflc-uc/usercenter/aflcCarInfo/v1/list",e).then(function(e){return e.data||{list:[],totalCount:0}})}function o(e){return d.b.put("/aflc-uc/usercenter/aflcCarInfo/v1/update",e)}function c(e,t){return d.b.put("/aflc-uc/usercenter/aflcCarInfo/v1/setEnableType/"+e+"/"+t)}function u(e,t){return d.b.put("/aflc-uc/usercenter/aflcCarInfo/v1/setRouteType/"+e+"/"+t)}function l(e){return d.b.axios({url:"/aflc-uc/usercenter/aflcDriver/v1/authAflcDriver",method:"post",data:e})}t.b=n,t.e=a,t.a=i,t.c=r,t.f=o,t.g=c,t.h=u,t.d=l;var d=s("Vo7i")},"1onU":function(e,t,s){"use strict";function n(e){s("Q66M"),s("rwP/")}var a=s("VT+v"),i=s("1pBW"),r=s("VU/8"),o=n,c=r(a.a,i.a,o,"data-v-6902e15e",null);t.a=c.exports},"1pBW":function(e,t,s){"use strict";var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"tms-pagenation"},[s("span",{staticClass:"page-num",class:{disabled:e.pageNum<=1},on:{click:function(t){e.jumpTo(1)}}},[s("span",{staticClass:"first-page"})]),s("span",{staticClass:"page-num",class:{disabled:e.pageNum<=1},on:{click:function(t){e.jumpTo(e.pageNum-1)}}},[s("span",{staticClass:"prev-page"})]),e._v(" "),s("span",{staticClass:"page-jumper"},[e._v("\n    第\n    "),s("el-input",{ref:"input",staticClass:"el-pagination__editor is-in-pagination",attrs:{min:1,max:e.pages,type:"number",disabled:e.pages<=1},on:{keyup:e.handleKeyup,change:e.handleChange,focus:e.handleFocus,blur:e.handleBlur},model:{value:e.inputval,callback:function(t){e.inputval="string"==typeof t?t.trim():t},expression:"inputval"}}),e._v(" 页\n  ")],1),e._v("\n  /共 "+e._s(e.pages)+" 页\n  "),s("span",{staticClass:"page-num",class:{disabled:e.pageNum===e.pages},on:{click:function(t){e.jumpTo(e.pageNum+1)}}},[s("span",{staticClass:"next-page"})]),e._v(" "),s("span",{staticClass:"page-num",class:{disabled:e.pageNum===e.pages},on:{click:function(t){e.jumpTo(e.pages)}}},[s("span",{staticClass:"last-page"})]),e._v(" "),s("span",{staticClass:"tms-pagination__sizes"},[s("el-select",{staticClass:"page-select",attrs:{placeholder:"请选择"},on:{change:e.sizeChange},model:{value:e.size,callback:function(t){e.size=t},expression:"size"}},e._l(e.sizes,function(t,n){return s("el-option",{key:n,attrs:{label:t,disabled:e.pages<=1,value:t}})}))],1)])},a=[],i={render:n,staticRenderFns:a};t.a=i},"4UdH":function(e,t,s){"use strict";function n(e){return c.b.post("/api-system/system/carrier/v1/list",e).then(function(e){return e.data||{list:[],totalCount:0}})}function a(e){return c.b.post("/api-system/system/carrier/v1/bathDelete/?ids="+e)}function i(e){return new o.a(function(t,s){Object(l.b)("/api/api-system/system/carrier/v1/exportCarrier?access_token="+Object(u.c)()+"&ids="+e),t(!0)})}t.b=n,t.a=a,t.c=i;var r=s("//Fk"),o=s.n(r),c=s("Vo7i"),u=s("TIfe"),l=s("0xDb")},E4LH:function(e,t,s){"use strict";function n(e){return/^([0-9a-zA-Z]|[\u0391-\uFFE5]){2,}$/.test(e.trim())}t.b=n,s.d(t,"a",function(){return a});var a={USERNAME:/^([0-9a-zA-Z]|[\u0391-\uFFE5]){2,}$/,ONLY_CHINESE:/^[\u4E00-\u9FA5]+$/,CHINESE_AND_ENGLISH:/^[\u4E00-\u9FA5a-zA-Z]+$/,MOBILE:/^[1][3-8]\d{9}$/,ID_CARD:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,ENGLISH_AND_NUMBER:/^[a-zA-Z0-9]+$/,SPECIAL_CHARACTER:/([^0-9a-zA-Z\u4E00-\u9FA5])+/,FLOAT2ING:/^\d+(\.\d{0,2})?$/,EMAIL:/^[\w!#$%&\'*+\/=?^_`{|}~-]+(?:\.[\w!#$%&\'*+\/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/,NO_NUMBER:/[\D|\.]/,ONLY_NUMBER:/^[0-9]+$/,ONLY_LETTER:/^[a-zA-Z]+$/,ONLY_PUNCTUATION:/^[~\!@#\$%\^\&\*\(\)_\+\{\}\|\:\"<>\?`\-\=\[\]\\;\',\.\/]+$/,ONLY_NUMBER_AND_LETTER:/^[0-9a-zA-Z]+$/,PWD_NUMBER_AND_LETTER:/^[0-9a-zA-Z_#]{6,32}$/,ONLY_LETTER_AND_PUNCTUATION:/^[a-zA-Z~\!@#\$%\^\&\*\(\)_\+\{\}\|\:\"<>\?`\-\=\[\]\\;\',\.\/]+$/,ONLY_NUMBER_AND_PUNCTUATION:/^[0-9~\!@#\$%\^\&\*\(\)_\+\{\}\|\:\"<>\?`\-\=\[\]\\;\',\.\/]+$/,LETTER_AND_NUMBER_AND_PUNCTUATION:/^[a-zA-Z0-9~\!@#\$%\^\&\*\(\)_\+\{\}\|\:\"<>\?`\-\=\[\]\\;\',\.\/]+$/,ONLY_NUMBER_GT:/^[1-9]\d*$/,KONGE:/^[^ ]{6,16}$/,ONLY_ENGLISH_NUMBER:/^[A-Za-z0-9_]+$/,TELEPHONE:/(^\d{3}-\d{8}$)|(^\d{4}-\d{7,8}$)/,ZIPCODE:/^[1-9]\d{5}(?!\d)$/,NUM_POINT:/^(([1-9][0-9])|(([0].\d{0,2}|[1-9][0-9].\d{0,2})))$/,NUM_PERCENTAGE:/^([1-9]{1}[0-9]{0,1}|0|100)(.\d{1,2}){0,1}%$/,strlen:function(e){for(var t=0,s=0;s<e.length;s++)e.charAt(s).match(/[\u0391-\uFFE5]/)?t+=2:t++;return t}}},"GHq+":function(e,t,s){"use strict";function n(e){s("13md")}Object.defineProperty(t,"__esModule",{value:!0});var a=s("SgQk"),i=s("m2+B"),r=s("VU/8"),o=n,c=r(a.a,i.a,o,null,null);t.default=c.exports},Q66M:function(e,t){},SgQk:function(e,t,s){"use strict";var n=s("E4LH");t.a={props:{btnsize:{type:String,default:"mini"},orgid:{type:Number}},data:function(){var e=this;return{searchForm:{strartAddress:"",endAddress:""},rules:{mobile:[{validator:function(t,s,a){e.searchForm.mobile=s.replace(n.a.NO_NUMBER,""),a()},trigger:"change"}]}}},watch:{orgid:function(e){}},mounted:function(){},methods:{getOrgid:function(e){},onSubmit:function(){alert(),this.$emit("change",this.searchForm)},clearForm:function(){this.searchForm.strartAddress="",this.searchForm.endAddress=""}}}},UAR4:function(e,t,s){"use strict";function n(e){s("ooP+"),s("rvZV")}Object.defineProperty(t,"__esModule",{value:!0});var a=s("09dA"),i=s("dDgD"),r=s("VU/8"),o=n,c=r(a.a,i.a,o,"data-v-005e152e",null);t.default=c.exports},"VT+v":function(e,t,s){"use strict";t.a={props:{sizes:{type:Array,default:function(){return[20,50,100,200]}},total:{type:Number,default:0}},computed:{pages:function(){return Math.ceil(this.total/this.size)}},watch:{pageNum:function(){this.inputval=this.pageNum},size:function(){this.pageNum=1}},data:function(){return{pageNum:1,oldValue:0,inputval:1,oldNum:1,size:20}},mounted:function(){this.size=this.sizes[0]},methods:{handleFocus:function(e){this.oldValue=e.target.value},sizeChange:function(){this.pageNum=1,this.pageNum=this.pageNum,this.$emit("change",{pageNum:this.pageNum,pageSize:this.size})},changeEvent:function(){this.oldNum!==this.pageNum&&(this.oldNum=this.pageNum,this.$emit("change",{pageNum:this.pageNum,pageSize:this.size}))},handleCurrentChange:function(e){this.pageNum=e,this.changeEvent()},handleSizeChange:function(e){this.size=e,this.changeEvent()},handleChange:function(e){var t=parseInt(e,10);isNaN(t)?this.inputval=1:t<1?this.inputval=1:t>this.pages?this.inputval=this.pages:this.inputval=t},handleBlur:function(e){var t=e.target;this.handleChange(t.value),this.jumpTo(this.inputval)},handleKeyup:function(e){var t=e.keyCode,s=e.target;console.log(t,s),13===t&&this.oldValue&&s.value!==this.oldValue&&(this.handleChange(s.value),this.oldValue="")},jumpTo:function(e){e<1?this.pageNum=1:e>this.pages?this.pageNum=this.pages:this.pageNum=e,this.changeEvent()}}}},dDgD:function(e,t,s){"use strict";var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"carrier-manager"},[e._m(0),e._v(" "),s("SearchForm",{attrs:{orgid:e.otherinfo.orgid,issender:!0,btnsize:e.btnsize},on:{change:e.getSearchParam}}),e._v(" "),s("div",{staticClass:"tab_info"},[s("div",{staticClass:"btns_box"},[s("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.createNew}},[e._v("发布车源")])],1),e._v(" "),s("div",{staticClass:"info_tab"},[s("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.usersArr,stripe:"",border:"",height:"100%","tooltip-effect":"dark","default-sort":{prop:"id",order:"ascending"}},on:{"row-click":e.clickDetails,"selection-change":e.getSelection}},[s("el-table-column",{attrs:{fixed:"",label:"序号",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n            "+e._s((e.searchQuery.currentPage-1)*e.searchQuery.pageSize+t.$index+1)+"\n          ")]}}])}),e._v(" "),s("el-table-column",{attrs:{fixed:"",label:"出发地 -> 到达地",width:"400"},scopedSlots:e._u([{key:"default",fn:function(t){return["1"===t.row.isCommonRoute?s("span",{staticClass:"vipline"}):e._e(),e._v("\n            "+e._s(t.row.strartAddress+"->"+t.row.endAddress)+"\n          ")]}}])}),e._v(" "),s("el-table-column",{attrs:{prop:"carNum",width:"120",label:"车牌号"}}),e._v(" "),s("el-table-column",{attrs:{prop:"carTypeName",width:"120",label:"车型"}}),e._v(" "),s("el-table-column",{attrs:{prop:"carSourceTypeName",width:"120",label:"类型"}}),e._v(" "),s("el-table-column",{attrs:{prop:"createrName",width:"120",label:"创建人"}}),e._v(" "),s("el-table-column",{attrs:{width:"200",label:"创建时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                "+e._s(e._f("parseTime")(t.row.createTime))+"\n          ")]}}])}),e._v(" "),s("el-table-column",{attrs:{width:"330",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(s){e.changeItem(t.row.id)}}},[e._v("修改")]),e._v(" "),s("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(s){e.deleteItem(t.row.id)}}},[e._v("删除")]),e._v(" "),"0"===t.row.isEnable?s("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(s){e.enableItem(t.row.id,"1")}}},[e._v("启用")]):e._e(),e._v(" "),"1"===t.row.isEnable?s("el-button",{attrs:{size:"mini",type:"info"},on:{click:function(s){e.enableItem(t.row.id,"0")}}},[e._v("禁用")]):e._e(),e._v(" "),"1"===t.row.isCommonRoute?s("el-button",{attrs:{size:"mini",type:"info"},on:{click:function(s){e.setRemote(t.row.id,"0")}}},[e._v("取消常跑")]):e._e(),e._v(" "),"0"===t.row.isCommonRoute?s("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(s){e.setRemote(t.row.id,"1")}}},[e._v("设置常跑")]):e._e()]}}])})],1)],1),e._v(" "),s("div",{staticClass:"info_tab_footer"},[e._v("共计:"+e._s(e.total)+" "),s("div",{staticClass:"show_pager"},[s("Pager",{attrs:{sizes:e.sizes,total:e.total},on:{change:e.handlePageChange}})],1)])])],1)},a=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"tab-info-title"},[s("h2",[s("span",[e._v("管理车源信息")])])])}],i={render:n,staticRenderFns:a};t.a=i},"m2+B":function(e,t,s){"use strict";var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("el-form",{staticClass:"carrier_searchinfo clearfix",attrs:{inline:!0,size:e.btnsize,"label-position":"right",rules:e.rules,model:e.searchForm}},[s("el-form-item",{attrs:{label:"出发地："}},[s("el-input",{attrs:{placeholder:"",maxlength:"15",clearable:""},model:{value:e.searchForm.strartAddress,callback:function(t){e.$set(e.searchForm,"strartAddress",t)},expression:"searchForm.strartAddress"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"到达地："}},[s("el-input",{attrs:{placeholder:"",maxlength:"15",clearable:""},model:{value:e.searchForm.endAddress,callback:function(t){e.$set(e.searchForm,"endAddress",t)},expression:"searchForm.endAddress"}})],1),e._v(" "),s("el-form-item",{staticClass:"carrier_searchinfo--btn"},[s("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("搜索")]),e._v(" "),s("el-button",{attrs:{type:"info",plain:""},on:{click:e.clearForm}},[e._v("重置")])],1)],1)},a=[],i={render:n,staticRenderFns:a};t.a=i},"ooP+":function(e,t){},rvZV:function(e,t){},"rwP/":function(e,t){}});