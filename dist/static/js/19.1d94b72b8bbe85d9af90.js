webpackJsonp([19],{"3QU7":function(e,t,i){"use strict";function s(e){i("5xKW")}var o=i("b79V"),a=i("6BtH"),r=i("VU/8"),n=s,l=r(o.a,a.a,n,null,null);t.a=l.exports},"5xKW":function(e,t){},"6BtH":function(e,t,i){"use strict";var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("el-dialog",{attrs:{"custom-class":"aflcmap-pop-wrapper",title:"地图",visible:e.dialogTableVisible},on:{close:e.close,"update:visible":function(t){e.dialogTableVisible=t}}},[i("div",{attrs:{id:"mapcontainer"}}),e._v(" "),i("div",{attrs:{id:"myPageTop"}},[i("table",[i("tr",[i("td",[i("label",[e._v("请输入关键字：")])])]),e._v(" "),i("tr",[i("td",[i("input",{ref:"tipinput",attrs:{id:"tipinput"}})])])])]),e._v(" "),i("div",{staticClass:"aflcmap-pop-footer",attrs:{slot:"footer"},slot:"footer"},[i("div",{staticClass:"addrname"},[e._v("当前选中的地址："+e._s(this.thename)),i("br"),e._v("当前经纬度信息："+e._s(this.thepos))]),e._v(" "),i("el-button",{attrs:{type:"primary",disabled:e.noinfo},on:{click:e.submitForm}},[e._v("确 定")]),e._v(" "),i("el-button",{attrs:{type:"info"},on:{click:e.close}},[e._v("取 消")])],1)])},o=[],a={render:s,staticRenderFns:o};t.a=a},E4LH:function(e,t,i){"use strict";function s(e){return/^([0-9a-zA-Z]|[\u0391-\uFFE5]){2,}$/.test(e.trim())}t.b=s,i.d(t,"a",function(){return o});var o={USERNAME:/^([0-9a-zA-Z]|[\u0391-\uFFE5]){2,}$/,ONLY_CHINESE:/^[\u4E00-\u9FA5]+$/,CHINESE_AND_ENGLISH:/^[\u4E00-\u9FA5a-zA-Z]+$/,MOBILE:/^[1][3-8]\d{9}$/,ID_CARD:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,ENGLISH_AND_NUMBER:/^[a-zA-Z0-9]+$/,SPECIAL_CHARACTER:/([^0-9a-zA-Z\u4E00-\u9FA5])+/,FLOAT2ING:/^\d+(\.\d{0,2})?$/,EMAIL:/^[\w!#$%&\'*+\/=?^_`{|}~-]+(?:\.[\w!#$%&\'*+\/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/,NO_NUMBER:/[\D|\.]/,ONLY_NUMBER:/^[0-9]+$/,ONLY_LETTER:/^[a-zA-Z]+$/,ONLY_PUNCTUATION:/^[~\!@#\$%\^\&\*\(\)_\+\{\}\|\:\"<>\?`\-\=\[\]\\;\',\.\/]+$/,ONLY_NUMBER_AND_LETTER:/^[0-9a-zA-Z]+$/,PWD_NUMBER_AND_LETTER:/^[0-9a-zA-Z_#]{6,32}$/,ONLY_LETTER_AND_PUNCTUATION:/^[a-zA-Z~\!@#\$%\^\&\*\(\)_\+\{\}\|\:\"<>\?`\-\=\[\]\\;\',\.\/]+$/,ONLY_NUMBER_AND_PUNCTUATION:/^[0-9~\!@#\$%\^\&\*\(\)_\+\{\}\|\:\"<>\?`\-\=\[\]\\;\',\.\/]+$/,LETTER_AND_NUMBER_AND_PUNCTUATION:/^[a-zA-Z0-9~\!@#\$%\^\&\*\(\)_\+\{\}\|\:\"<>\?`\-\=\[\]\\;\',\.\/]+$/,ONLY_NUMBER_GT:/^[1-9]\d*$/,KONGE:/^[^ ]{6,16}$/,ONLY_ENGLISH_NUMBER:/^[A-Za-z0-9_]+$/,TELEPHONE:/(^\d{3}-\d{8}$)|(^\d{4}-\d{7,8}$)/,ZIPCODE:/^[1-9]\d{5}(?!\d)$/,NUM_POINT:/^(([1-9][0-9])|(([0].\d{0,2}|[1-9][0-9].\d{0,2})))$/,NUM_PERCENTAGE:/^([1-9]{1}[0-9]{0,1}|0|100)(.\d{1,2}){0,1}%$/,strlen:function(e){for(var t=0,i=0;i<e.length;i++)e.charAt(i).match(/[\u0391-\uFFE5]/)?t+=2:t++;return t}}},EPeO:function(e,t,i){"use strict";var s=i("mvHQ"),o=i.n(s),a=i("//Fk"),r=i.n(a),n=i("t5DY"),l=i("0xDb");t.a={name:"singleImageUpload",props:{value:[String,Array],title:{type:String,default:""},tip:{type:String,default:"（jpg/png。小于5M）"},multiple:{type:Boolean,default:!1},size:{type:String,default:"mini"},showFileList:{type:Boolean,default:!1},limit:{type:Number,default:10},listtype:{type:String,default:"picture",enum:["text","picture","picture-card"]},disabled:{type:Boolean,default:!1}},computed:{imageUrl:function(){return this.value}},data:function(){return{tempUrl:"",dataObj:{token:"",key:""},upload:{key:"",policy:"",OSSAccessKeyId:"",success_action_status:"201",signature:""},uploadUrl:"",dir:"",filelist:[]}},watch:{value:{handler:function(e){if(this.showFileList){var t=Array.isArray(e)?e:e?e.split(","):[];t=t.filter(function(e){return e}),this.filelist=t.map(function(e){var t={};return t.url=e,t})}else this.filelist=[{url:e}]},immediate:!0}},mounted:function(){this.init()},methods:{init:function(){var e=this;return Object(n.h)().then(function(t){e.upload.OSSAccessKeyId=t.accessid,e.upload.policy=t.policy,e.upload.signature=t.signature,e.uploadUrl=t.host,e.dir=t.dir}).catch(function(e){console.log("get Policy ERror:",e)})},rmImage:function(){this.emitInput("")},onexceed:function(e,t){this.$message.error("最多上传 "+this.limit+" 张!")},handleRemove:function(e,t){console.log("handleRemove:",e,t),this.filelist=t,this.emitInput()},random_string:function(e){e=e||32;for(var t="ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",i=t.length,s="",o=0;o<e;o++)s+=t.charAt(Math.floor(Math.random()*i));return s},emitInput:function(e){e&&this.filelist.push({url:e}),this.$emit("input",this.showFileList?this.filelist.map(function(e){return e.url}).join(","):e)},handleImageScucess:function(e){var t="";-1!==e.indexOf("Location")&&(t=e.match(/<Location>([^<]+)<\/Location>/m),t=t?t[1]:""),this.emitInput(t)},handleError:function(e){console.log("upload err:",e),this.$emit("error",e)},beforeUpload:function(e){var t=this;console.log("beforeUpload:",e);var i=/image\/\w+/.test(e.type)&&/(jpe?g|png)/i.test(e.type),s=e.size/1024/1024<5,a=e.name.match(/([^\.]+)$/);return a=a?"."+a[1]:"",new r.a(function(e,r){i?s?(console.log("loooo1"),t.init().then(function(i){console.log("loooo2"),t.upload.key=t.dir+Object(l.e)(new Date,"{y}{m}{d}")+"/"+t.random_string()+a,e(!0)}).catch(function(i){console.log("loooo3"),t.$message.error("未知错误："+o()(i)),e(!1)})):(t.$message.error("上传头像图片大小不能超过 5MB!"),r(!1)):(t.$message.error("上传头像图片只能是 JPG/PNG 格式!"),r(!1))})}}}},LkYF:function(e,t,i){"use strict";function s(e){i("NLSf")}Object.defineProperty(t,"__esModule",{value:!0});var o=i("l6eg"),a=i("fL29"),r=i("VU/8"),n=s,l=r(o.a,a.a,n,null,null);t.default=l.exports},NLSf:function(e,t){},QbVN:function(e,t,i){"use strict";function s(e){i("rFkn"),i("Qtds")}var o=i("EPeO"),a=i("X/Qy"),r=i("VU/8"),n=s,l=r(o.a,a.a,n,"data-v-5d7a9fe6",null);t.a=l.exports},QqKo:function(e,t,i){"use strict";function s(e){return o.b.axios({url:"/"+a+"/usercenter/aflcShipper/v1/update",method:"PUT",data:e})}t.a=s;var o=i("Vo7i"),a="aflc-uc"},Qtds:function(e,t){},"X/Qy":function(e,t,i){"use strict";var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"upload-container",class:{uploadlist:e.showFileList}},[e.uploadUrl?i("el-upload",{staticClass:"image-uploader",attrs:{data:e.upload,action:e.uploadUrl,multiple:e.multiple,drag:!e.showFileList,"show-file-list":e.showFileList,"file-list":e.filelist,limit:e.limit,"before-upload":e.beforeUpload,"list-type":e.listtype,"on-exceed":e.onexceed,disabled:e.disabled,"on-remove":e.handleRemove,"on-error":e.handleError,"on-success":e.handleImageScucess}},[e._t("content",[e.title&&!e.showFileList?i("div",{staticClass:"upload__title"},[e._v(e._s(e.title))]):e._e(),e._v(" "),i("el-button",{attrs:{size:e.size,type:"primary"}},[e._v("点击上传")]),e._v(" "),e.showFileList?e._e():i("div",{staticClass:"el-upload__text"},[e._v("将文件拖拽到此区域")]),e._v(" "),e.tip?i("div",{staticClass:"upload__tip"},[e._v(e._s(e.tip))]):e._e()])],2):e._e(),e._v(" "),e.imageUrl&&!e.showFileList?i("div",{staticClass:"image-preview"},[i("div",{staticClass:"image-preview-wrapper"},[i("img",{attrs:{src:e.imageUrl}}),e._v(" "),i("div",{staticClass:"image-preview-action"},[i("i",{staticClass:"el-icon-delete",on:{click:e.rmImage}})])])]):e._e()],1)},o=[],a={render:s,staticRenderFns:o};t.a=a},b79V:function(e,t,i){"use strict";var s=i("0xDb");t.a={props:{pos:{type:[String,Array],default:""},name:{type:String,default:""},popVisible:{type:Boolean,default:!1}},watch:{popVisible:function(e){this.init()},name:function(){this.thename=this.name},pos:function(){this.thepos=this.pos}},mounted:function(){var e=this;window.loadedGaodeMap=function(){e.initMap(),e.hasLoadedMap=!0}},created:function(){},destoryed:function(){this.exit()},data:function(){return{noinfo:!0,dialogTableVisible:!1,thepos:"",thename:"",theobj:{}}},methods:{exit:function(){this.map&&this.map.destroy&&"function"==typeof this.map.destroy&&(this.map.destroy(),this.map={}),this.thepos="",this.thename="",this.theobj={},this.noinfo=!0},init:function(){this.dialogTableVisible=this.popVisible,console.log("this.popVisible:",this.popVisible),this.popVisible&&(this.thepos=this.pos,this.thename=this.name,this.loadMap())},loadMap:function(){var e=this;window.AMap?setTimeout(function(){e.initMap()},500):Object(s.c)("https://webapi.amap.com/maps?v=1.4.8&key=e61aa7ddc6349acdb3b57c062080f730&plugin=AMap.Autocomplete,AMap.PlaceSearch,AMap.Geocoder&callback=loadedGaodeMap").then(function(){})},close:function(e){this.exit(),this.$emit("update:popVisible",!1),"function"==typeof e&&e()},initMap:function(){function e(){p&&(p.setMap(null),p=null)}function t(t){console.log("2222",t),d.getAddress(t,function(s,o){"complete"===s&&"OK"===o.info?i(o,t):(e(),alert("获取不到当前位置的地址信息~"))})}function i(e,t){console.log("1111111111111",t);var i=!!t.lat;console.log("geocodeer:",e);var s=e.regeocode.formattedAddress;i&&(p=new a.Marker({map:r,position:t}),p.on("click",function(e){u.open(r,e.target.getPosition())}),p.emit("click",{target:p}),u.setContent(s)),o.setData(i?t.lng+","+t.lat:t,s,e.regeocode)}function s(e){console.log("select e:",e),c.setCity(e.poi.adcode),c.search(e.poi.name)}var o=this,a=window.AMap;window.AMapUI;o.map=new a.Map("mapcontainer",{resizeEnable:!0});var r=this.map,n={input:"tipinput"},l=new a.Autocomplete(n),c=new a.PlaceSearch({map:r,extensions:"base"}),m=this.name;m&&(this.$refs.tipinput.value=m.replace("市辖区",""),c.search(m));var p,u=new a.InfoWindow({offset:new a.Pixel(0,-30),content:""}),d=new a.Geocoder({radius:1e3}),f=new a.ContextMenu,g=[];f.addItem("添加标记",function(i){e(),c.clear(),u.close(),t(g)},3),r.on("rightclick",function(e){console.log("right click:",e);var t=e.lnglat;f.open(r,t),g=t}),r.on("click",function(e){console.log("e:",e)}),r.plugin(["AMap.ToolBar"],function(){r.addControl(new a.ToolBar)}),a.event.addListener(l,"select",s),a.event.addListener(c,"markerClick",function(e){t(e.data.location)})},setData:function(e,t,i){this.thepos=e,this.thename=t,this.theobj=i,this.noinfo=!1,console.log(i)},submitForm:function(){this.$emit("success",this.thepos,this.thename,this.theobj),this.close()}}}},fL29:function(e,t,i){"use strict";var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"consignorIdentification identification"},[i("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.logisticsForm,rules:e.rules,"label-width":"250px"}},[i("div",{staticClass:"carrierTitle"},[i("div",{staticClass:"realname"},[i("h2",[e._v("完善实名认证 "),i("span",{class:{certified:"待认证"==e.logisticsForm.shipperStatusName,certify:"认证成功"==e.logisticsForm.shipperStatusName}},[e._v("( "+e._s(e.logisticsForm.shipperStatusName)+" )")])])]),e._v(" "),i("div",{staticClass:"prompt"},[i("p",[i("span",{staticClass:"tishi"},[i("i",{staticClass:"el-icon-warning"}),e._v("小提示： ")]),e._v("(打"),i("span",{staticClass:"star"},[e._v("*")]),e._v("号为必填项)")])])]),e._v(" "),i("div",{staticClass:"companyInformation information"},[i("h2",[e._v("基本信息")]),e._v(" "),i("el-form-item",{attrs:{label:"货主类型：",prop:"shipperType"}},[i("el-input",{attrs:{disabled:""},model:{value:e.logisticsForm.shipperTypeName,callback:function(t){e.$set(e.logisticsForm,"shipperTypeName",t)},expression:"logisticsForm.shipperTypeName"}})],1),e._v(" "),(e.logisticsForm.shipperType,i("el-form-item",{attrs:{label:"公司名称：",prop:"companyName"}},[i("el-input",{attrs:{disabled:!1===e.ifDisable,maxlength:25},model:{value:e.logisticsForm.companyName,callback:function(t){e.$set(e.logisticsForm,"companyName",t)},expression:"logisticsForm.companyName"}},[i("p",{attrs:{slot:"append"},slot:"append"},[e._v("请填写企业在工商局注册的全称，完整的信息让客户更加信赖您")])])],1)),e._v(" "),(e.logisticsForm.shipperType,i("el-form-item",{attrs:{label:"法人/负责人：",prop:"legalPerson"}},[i("el-input",{attrs:{disabled:!1===e.ifDisable,maxlength:15},model:{value:e.logisticsForm.legalPerson,callback:function(t){e.$set(e.logisticsForm,"legalPerson",t)},expression:"logisticsForm.legalPerson"}})],1)),e._v(" "),i("el-form-item",{attrs:{label:"统一社会信用代码（营业执照）：",prop:"creditCode"}},[i("el-input",{attrs:{disabled:!1===e.ifDisable,maxlength:"18"},model:{value:e.logisticsForm.creditCode,callback:function(t){e.$set(e.logisticsForm,"creditCode",t)},expression:"logisticsForm.creditCode"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"身份证号：",prop:"legalPersonIdno"}},[i("el-input",{attrs:{disabled:!1===e.ifDisable},model:{value:e.logisticsForm.legalPersonIdno,callback:function(t){e.$set(e.logisticsForm,"legalPersonIdno",t)},expression:"logisticsForm.legalPersonIdno"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"公司成立时间："}},[i("el-date-picker",{attrs:{align:"right",type:"date",placeholder:"选择日期","value-format":"timestamp",disabled:!1===e.ifDisable,"picker-options":e.pickerOptions},model:{value:e.logisticsForm.companyEstablishDate,callback:function(t){e.$set(e.logisticsForm,"companyEstablishDate",t)},expression:"logisticsForm.companyEstablishDate"}})],1),e._v(" "),i("el-form-item",{staticClass:"minHeight",attrs:{label:"企业LOGO：",prop:"companyLogo"}},[1==e.ifDisable?i("upload",{staticClass:"licensePicture",attrs:{tip:"（必须为jpg/png并且小于5M）"},model:{value:e.logisticsForm.companyLogo,callback:function(t){e.$set(e.logisticsForm,"companyLogo",t)},expression:"logisticsForm.companyLogo"}}):i("img",{staticClass:"showPicture",attrs:{src:e.logisticsForm.companyLogo,alt:"LOGO"}}),e._v(" "),i("el-button",{directives:[{name:"show",rawName:"v-show",value:!!e.logisticsForm.companyLogo,expression:"logisticsForm.companyLogo ? true : false"},{name:"showPicture",rawName:"v-showPicture"}],staticClass:"preview",attrs:{type:"primary",plain:"",imgurl:e.logisticsForm.companyLogo}},[e._v("点击预览\n        ")])],1),e._v(" "),i("el-form-item",{staticClass:"textarea",attrs:{label:"公司简介：",prop:"driverDesc"}},[0==e.ifDisable?i("div",[i("p",{staticStyle:{"text-indent":"2em","white-space":"pre-wrap","word-wrap":"break-word","word-break":"break-all","font-size":"14px",color:"#333"}},[e._v("\n            "+e._s(e.logisticsForm.driverDesc))])]):i("div",[i("el-input",{attrs:{type:"textarea",autosize:{minRows:5,maxRows:10},placeholder:"请输入内容",maxlength:e.maxlength},model:{value:e.logisticsForm.driverDesc,callback:function(t){e.$set(e.logisticsForm,"driverDesc",t)},expression:"logisticsForm.driverDesc"}}),e._v(" "),i("span",[e._v(e._s(e.totalNumber)+" / "+e._s(e.maxlength))]),e._v(" "),i("p",[e._v("必须填写完整细致的企业简介，不得出现违法词语，字数不低于30字")])],1)])],1),e._v(" "),i("div",{staticClass:"contactInformation information"},[i("h2",[e._v("联系方式")]),e._v(" "),i("el-form-item",{attrs:{label:"联系人：",prop:"contacts"}},[i("el-input",{attrs:{disabled:!1===e.ifDisable},model:{value:e.logisticsForm.contacts,callback:function(t){e.$set(e.logisticsForm,"contacts",t)},expression:"logisticsForm.contacts"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"手机：",prop:"mobile"}},[i("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],attrs:{maxlength:"11",disabled:""},model:{value:e.logisticsForm.mobile,callback:function(t){e.$set(e.logisticsForm,"mobile",t)},expression:"logisticsForm.mobile"}})],1),e._v(" "),i("br"),e._v(" "),i("el-form-item",{attrs:{label:"公司所在地：",prop:"belongCityName"}},[i("el-input",{attrs:{disabled:!1===e.ifDisable},on:{focus:function(){e.showMap("endAddress")}},model:{value:e.logisticsForm.belongCity,callback:function(t){e.$set(e.logisticsForm,"belongCity",t)},expression:"logisticsForm.belongCity"}})],1),e._v(" "),i("el-form-item",{staticClass:"moreWidth",attrs:{label:"详细地址：",prop:"address"}},[i("el-input",{attrs:{disabled:!1===e.ifDisable},on:{focus:function(){e.showMap("endAddress")}},model:{value:e.logisticsForm.address,callback:function(t){e.$set(e.logisticsForm,"address",t)},expression:"logisticsForm.address"}})],1),e._v(" "),i("br"),e._v(" "),i("el-form-item",{attrs:{label:"联系电话：",prop:"contactsTel"}},[i("el-input",{attrs:{maxlength:"11",disabled:!1===e.ifDisable},model:{value:e.logisticsForm.contactsTel,callback:function(t){e.$set(e.logisticsForm,"contactsTel",t)},expression:"logisticsForm.contactsTel"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"QQ："}},[i("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],attrs:{placeholder:"填写QQ，方便物流公司联系您",disabled:!1===e.ifDisable},model:{value:e.logisticsForm.qq,callback:function(t){e.$set(e.logisticsForm,"qq",t)},expression:"logisticsForm.qq"}})],1)],1),e._v(" "),"AF0010202"==e.logisticsForm.shipperType?i("div",{staticClass:"picInformation information"},[i("h2",[e._v("货主认证照片")]),e._v(" "),i("el-form-item",[i("p",[e._v("上传营业执照照片：")]),e._v(" "),1==e.ifDisable?i("upload",{staticClass:"licensePicture",attrs:{tip:"（必须为jpg/png并且小于5M）"},model:{value:e.logisticsForm.businessLicenceFile,callback:function(t){e.$set(e.logisticsForm,"businessLicenceFile",t)},expression:"logisticsForm.businessLicenceFile"}}):i("img",{staticClass:"showPicture",attrs:{src:e.logisticsForm.businessLicenceFile,alt:"营业执照"}}),e._v(" "),i("el-button",{directives:[{name:"show",rawName:"v-show",value:!!e.logisticsForm.businessLicenceFile,expression:"logisticsForm.businessLicenceFile ? true : false"},{name:"showPicture",rawName:"v-showPicture"}],staticClass:"preview",attrs:{type:"primary",plain:"",imgurl:e.logisticsForm.businessLicenceFile}},[e._v("点击预览\n        ")])],1),e._v(" "),i("el-form-item",{attrs:{prop:"companyFacadeFile"}},[i("p",[i("span",[e._v("*")]),e._v("上传公司或者档口照片：")]),e._v(" "),1==e.ifDisable?i("upload",{staticClass:"licensePicture",attrs:{tip:"（必须为jpg/png并且小于5M）"},model:{value:e.logisticsForm.companyFacadeFile,callback:function(t){e.$set(e.logisticsForm,"companyFacadeFile",t)},expression:"logisticsForm.companyFacadeFile"}}):i("img",{staticClass:"showPicture",attrs:{src:e.logisticsForm.companyFacadeFile,alt:"公司或者档口照片"}}),e._v(" "),i("el-button",{directives:[{name:"show",rawName:"v-show",value:!!e.logisticsForm.companyFacadeFile,expression:"logisticsForm.companyFacadeFile ? true : false"},{name:"showPicture",rawName:"v-showPicture"}],staticClass:"preview",attrs:{type:"primary",plain:"",imgurl:e.logisticsForm.companyFacadeFile}},[e._v("点击预览\n        ")])],1),e._v(" "),i("el-form-item",{attrs:{prop:"shipperCardFile"}},[i("p",[i("span",[e._v("*")]),e._v("上传发货人名片照片：")]),e._v(" "),1==e.ifDisable?i("upload",{staticClass:"licensePicture",attrs:{tip:"（必须为jpg/png并且小于5M）"},model:{value:e.logisticsForm.shipperCardFile,callback:function(t){e.$set(e.logisticsForm,"shipperCardFile",t)},expression:"logisticsForm.shipperCardFile"}}):i("img",{staticClass:"showPicture",attrs:{src:e.logisticsForm.shipperCardFile,alt:""}}),e._v(" "),i("el-button",{directives:[{name:"show",rawName:"v-show",value:!!e.logisticsForm.shipperCardFile,expression:"logisticsForm.shipperCardFile ? true : false"},{name:"showPicture",rawName:"v-showPicture"}],staticClass:"preview",attrs:{type:"primary",plain:"",imgurl:e.logisticsForm.shipperCardFile}},[e._v("点击预览\n        ")])],1)],1):e._e(),e._v(" "),i("el-form-item",{staticClass:"fromfooter"},[i("el-button",{directives:[{name:"show",rawName:"v-show",value:e.ifDisable,expression:"ifDisable"}],attrs:{size:"medium"},on:{click:function(t){e.resetForm("ruleForm")}}},[e._v("取消")]),e._v(" "),i("el-button",{directives:[{name:"show",rawName:"v-show",value:e.ifDisable,expression:"ifDisable"}],attrs:{size:"medium",type:"primary"},on:{click:function(t){e.submitForm("ruleForm")}}},[e._v("确认")])],1)],1),e._v(" "),i("tmsmap",{attrs:{pos:"",name:"",popVisible:e.popVisible},on:{success:e.getInfo,"update:popVisible":function(t){e.popVisible=t}}})],1)},o=[],a={render:s,staticRenderFns:o};t.a=a},l6eg:function(e,t,i){"use strict";var s=i("mvHQ"),o=i.n(s),a=i("woOf"),r=i.n(a),n=i("//Fk"),l=i.n(n),c=i("nOfT"),m=(i.n(c),i("QbVN")),p=i("t5DY"),u=i("TIfe"),d=i("QqKo"),f=i("E4LH"),g=i("3QU7");t.a={components:{upload:m.a,tmsmap:g.a},computed:{totalNum:function(){return this.logisticsForm.driverDesc},disabled:function(){return this.logisticsForm.shipperStatusName}},watch:{totalNum:{handler:function(e,t){e&&(this.totalNumber=e.length)},deep:!0},disabled:{handler:function(e){console.log(e),this.ifDisable="待认证"!==e&&"认证成功"!==e,console.log(this.ifDisable)},deep:!0}},data:function(){var e=function(e,t,i){if(t&&!f.a.ENGLISH_AND_NUMBER.test(t))return i(new Error("仅可输入数字或者英文字母"));i()},t=function(e,t,i){if(t||i(),!f.a.ID_CARD.test(t))return i(new Error("请输入正确的二代身份证号码"));i()},i=function(e,t,i){return t?f.a.MOBILE.test(t)?void i():i(new Error("请输入正确的手机号码格式")):i(new Error("请输入手机号码"))};return{pickerOptions:{disabledDate:function(e){return e.getTime()>Date.now()},shortcuts:[{text:"今天",onClick:function(e){e.$emit("pick",new Date)}},{text:"昨天",onClick:function(e){var t=new Date;t.setTime(t.getTime()-864e5),e.$emit("pick",t)}},{text:"一周前",onClick:function(e){var t=new Date;t.setTime(t.getTime()-6048e5),e.$emit("pick",t)}},{text:"一月前",onClick:function(e){var t=new Date;t.setTime(t.getTime()-2592e6),e.$emit("pick",t)}},{text:"半年前",onClick:function(e){var t=new Date;t.setTime(t.getTime()-157248e5),e.$emit("pick",t)}},{text:"一年前",onClick:function(e){var t=new Date;t.setTime(t.getTime()-31536e6),e.$emit("pick",t)}}]},popVisible:!1,ifDisable:!0,driverPhone:"",totalNumber:0,maxlength:2e3,shipperType:"AF00101",optionsShipperType:[],logisticsForm:{shipperType:"AF0010202",shipperTypeName:"企业货主",companyName:"",legalPerson:"",legalPersonIdno:"",companyEstablishDate:"",companyLogo:"",driverDesc:"",contacts:"",mobile:"",belongCity:"",address:"",contactsTel:"",qq:"",businessLicenceFile:"",companyFacadeFile:"",shipperCardFile:""},rules:{address:[{required:!0,message:"请输入详细地址",trigger:"blur"}],belongCity:[{required:!0,message:"请输入公司所在地"}],shipperType:[{required:!0,message:"请选择货主类型",trigger:"blur"}],companyName:[{required:!0,message:"请输入公司名称",trigger:"blur"},{message:"只能输入中文和字母~",pattern:f.a.CHINESE_AND_ENGLISH}],legalPerson:[{required:!0,message:"请输入法人/负责人信息",trigger:"blur"},{message:"只能输入中文和字母~",pattern:f.a.CHINESE_AND_ENGLISH}],creditCode:[{validator:e,trigger:"blur"}],legalPersonIdno:[{validator:t,trigger:"blur"}],driverDesc:[{required:!0,message:"请完善公司简介内容",trigger:"blur"},{min:30,message:"公司简介，不能少于30个字",trigger:"blur"}],contacts:[{required:!0,message:"请输入联系人信息，以方便物流公司和您联系",trigger:"blur"}],contactsTel:[{pattern:/^\d{11}$/,message:"请填写正确的联系电话",trigger:"blur"}],mobile:[{required:!0,validator:i,trigger:"blur"}],companyFacadeFile:[{required:!0,message:"请上传公司或者档口照片",trigger:"blur"}],shipperCardFile:[{required:!0,message:"请上传发货人名片",trigger:"blur"}]}}},mounted:function(){this.getMoreInformation()},methods:{getInfo:function(e,t,i){console.log(e,t,i),this.logisticsForm.belongCity=i.addressComponent.province+i.addressComponent.city+i.addressComponent.district,this.logisticsForm.address=t},showMap:function(e){this.popVisible=!0},getMoreInformation:function(){var e=this,t=Object(u.d)();l.a.all([Object(p.c)(this.shipperType),Object(p.g)(t.mobile)]).then(function(t){e.optionsShipperType=t[0].data,e.logisticsForm=r()({},t[1].data,{shipperType:"AF0010202",shipperTypeName:"企业货主"})}).catch(function(t){e.$message.error("操作失败："+o()(t.text))})},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;var i=r()({},t.logisticsForm,{shipperStatus:"AF0010402"});Object(d.a)(i).then(function(e){console.log(e),t.getMoreInformation()}).catch(function(e){t.$message({type:"info",message:e.errorInfo})})})},resetForm:function(e){this.$refs[e].resetFields()}}}},nOfT:function(e,t){},rFkn:function(e,t){},t5DY:function(e,t,i){"use strict";function s(e){return e=e||"",f.b.get("/aflccommonservice/common/aflcCommonPCA/v1/findAflcCommonPCAByCode?code="+e).then(function(t){return t.code=e,t})}function o(){return h?new d.a(function(e){e(h)}):f.b.get("/anfacommonservice/common/oss/v1/policy").then(function(e){return h=e.data||"",setTimeout(function(){h=""},18e4),h})}function a(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return f.b.get("/aflccommonservice/sysDict/getSysDictByCodeGet/"+e).then(function(e){return e.data||[]})}function r(e){return f.b.axios({url:"/"+g+"/sysDict/getSysDictByCodeGet/"+e,method:"get"})}function n(e){return f.b.axios({url:"/"+g+"/common/aflcMemberCenter/v1/getShipperInfoByMobile?mobile="+e,method:"get"})}function l(e){return f.b.axios({url:"/"+g+"/common/aflcMemberCenter/v1/getDriverInfoByMobile?mobile="+e,method:"get"})}function c(e){return f.b.axios({url:"/"+g+"/common/aflcMemberCenter/v1/getLogisticsCompanyInfoByMobile?mobile="+e,method:"get"})}function m(e){return f.b.axios({url:"/aflcorderservice/order/fclOrder/v1/getDetailsByOrderSerial/"+e,method:"get"})}function p(e,t){var i=new FormData;for(var s in t)i.append(s,t[s]);var o="";for(var a in t)o+="&"+a+"="+t[a];return f.b.request({url:"/aflccommonservice/common/aflcMemberCenter/v1/updatePassword?memberType="+e,method:"put",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:o})}t.a=s,t.h=o,t.f=a,t.c=r,t.g=n,t.d=l,t.e=c,t.b=m,t.i=p;var u=i("//Fk"),d=i.n(u),f=i("Vo7i"),g="aflccommonservice",h=void 0}});