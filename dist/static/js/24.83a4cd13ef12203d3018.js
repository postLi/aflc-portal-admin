webpackJsonp([24],{"1jhZ":function(e,i,t){"use strict";function r(e){return d.b.get("/aflc-uc/usercenter/aflcCarInfo/v1/getDetails/"+e)}function s(e){return d.b.post("/aflc-uc/usercenter/aflcCarInfo/v1/add",e)}function a(e){return d.b.delete("/aflc-uc/usercenter/aflcCarInfo/v1/delete/"+e)}function o(e){return d.b.post("/aflc-uc/usercenter/aflcCarInfo/v1/list",e).then(function(e){return e.data||{list:[],totalCount:0}})}function n(e){return d.b.put("/aflc-uc/usercenter/aflcCarInfo/v1/update",e)}function l(e,i){return d.b.put("/aflc-uc/usercenter/aflcCarInfo/v1/setEnableType/"+e+"/"+i)}function c(e,i){return d.b.put("/aflc-uc/usercenter/aflcCarInfo/v1/setRouteType/"+e+"/"+i)}function u(e){return d.b.axios({url:"/aflc-uc/usercenter/aflcDriver/v1/authAflcDriver",method:"post",data:e})}i.b=r,i.e=s,i.a=a,i.c=o,i.f=n,i.g=l,i.h=c,i.d=u;var d=t("Vo7i")},E4LH:function(e,i,t){"use strict";function r(e){return/^([0-9a-zA-Z]|[\u0391-\uFFE5]){2,}$/.test(e.trim())}i.b=r,t.d(i,"a",function(){return s});var s={USERNAME:/^([0-9a-zA-Z]|[\u0391-\uFFE5]){2,}$/,ONLY_CHINESE:/^[\u4E00-\u9FA5]+$/,CHINESE_AND_ENGLISH:/^[\u4E00-\u9FA5a-zA-Z]+$/,MOBILE:/^[1][3-8]\d{9}$/,ID_CARD:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,ENGLISH_AND_NUMBER:/^[a-zA-Z0-9]+$/,SPECIAL_CHARACTER:/([^0-9a-zA-Z\u4E00-\u9FA5])+/,FLOAT2ING:/^\d+(\.\d{0,2})?$/,EMAIL:/^[\w!#$%&\'*+\/=?^_`{|}~-]+(?:\.[\w!#$%&\'*+\/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/,NO_NUMBER:/[\D|\.]/,ONLY_NUMBER:/^[0-9]+$/,ONLY_LETTER:/^[a-zA-Z]+$/,ONLY_PUNCTUATION:/^[~\!@#\$%\^\&\*\(\)_\+\{\}\|\:\"<>\?`\-\=\[\]\\;\',\.\/]+$/,ONLY_NUMBER_AND_LETTER:/^[0-9a-zA-Z]+$/,PWD_NUMBER_AND_LETTER:/^[0-9a-zA-Z_#]{6,32}$/,ONLY_LETTER_AND_PUNCTUATION:/^[a-zA-Z~\!@#\$%\^\&\*\(\)_\+\{\}\|\:\"<>\?`\-\=\[\]\\;\',\.\/]+$/,ONLY_NUMBER_AND_PUNCTUATION:/^[0-9~\!@#\$%\^\&\*\(\)_\+\{\}\|\:\"<>\?`\-\=\[\]\\;\',\.\/]+$/,LETTER_AND_NUMBER_AND_PUNCTUATION:/^[a-zA-Z0-9~\!@#\$%\^\&\*\(\)_\+\{\}\|\:\"<>\?`\-\=\[\]\\;\',\.\/]+$/,ONLY_NUMBER_GT:/^[1-9]\d*$/,KONGE:/^[^ ]{6,16}$/,ONLY_ENGLISH_NUMBER:/^[A-Za-z0-9_]+$/,TELEPHONE:/(^\d{3}-\d{8}$)|(^\d{4}-\d{7,8}$)/,ZIPCODE:/^[1-9]\d{5}(?!\d)$/,NUM_POINT:/^(([1-9][0-9])|(([0].\d{0,2}|[1-9][0-9].\d{0,2})))$/,NUM_PERCENTAGE:/^([1-9]{1}[0-9]{0,1}|0|100)(.\d{1,2}){0,1}%$/,strlen:function(e){for(var i=0,t=0;t<e.length;t++)e.charAt(t).match(/[\u0391-\uFFE5]/)?i+=2:i++;return i}}},EPeO:function(e,i,t){"use strict";var r=t("mvHQ"),s=t.n(r),a=t("//Fk"),o=t.n(a),n=t("t5DY"),l=t("0xDb");i.a={name:"singleImageUpload",props:{value:[String,Array],title:{type:String,default:""},tip:{type:String,default:"（jpg/png。小于5M）"},multiple:{type:Boolean,default:!1},size:{type:String,default:"mini"},showFileList:{type:Boolean,default:!1},limit:{type:Number,default:10},listtype:{type:String,default:"picture",enum:["text","picture","picture-card"]},disabled:{type:Boolean,default:!1}},computed:{imageUrl:function(){return this.value}},data:function(){return{tempUrl:"",dataObj:{token:"",key:""},upload:{key:"",policy:"",OSSAccessKeyId:"",success_action_status:"201",signature:""},uploadUrl:"",dir:"",filelist:[]}},watch:{value:{handler:function(e){if(this.showFileList){var i=Array.isArray(e)?e:e?e.split(","):[];i=i.filter(function(e){return e}),this.filelist=i.map(function(e){var i={};return i.url=e,i})}else this.filelist=[{url:e}]},immediate:!0}},mounted:function(){this.init()},methods:{init:function(){var e=this;return Object(n.h)().then(function(i){e.upload.OSSAccessKeyId=i.accessid,e.upload.policy=i.policy,e.upload.signature=i.signature,e.uploadUrl=i.host,e.dir=i.dir}).catch(function(e){console.log("get Policy ERror:",e)})},rmImage:function(){this.emitInput("")},onexceed:function(e,i){this.$message.error("最多上传 "+this.limit+" 张!")},handleRemove:function(e,i){console.log("handleRemove:",e,i),this.filelist=i,this.emitInput()},random_string:function(e){e=e||32;for(var i="ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",t=i.length,r="",s=0;s<e;s++)r+=i.charAt(Math.floor(Math.random()*t));return r},emitInput:function(e){e&&this.filelist.push({url:e}),this.$emit("input",this.showFileList?this.filelist.map(function(e){return e.url}).join(","):e)},handleImageScucess:function(e){var i="";-1!==e.indexOf("Location")&&(i=e.match(/<Location>([^<]+)<\/Location>/m),i=i?i[1]:""),this.emitInput(i)},handleError:function(e){console.log("upload err:",e),this.$emit("error",e)},beforeUpload:function(e){var i=this;console.log("beforeUpload:",e);var t=/image\/\w+/.test(e.type)&&/(jpe?g|png)/i.test(e.type),r=e.size/1024/1024<5,a=e.name.match(/([^\.]+)$/);return a=a?"."+a[1]:"",new o.a(function(e,o){t?r?(console.log("loooo1"),i.init().then(function(t){console.log("loooo2"),i.upload.key=i.dir+Object(l.e)(new Date,"{y}{m}{d}")+"/"+i.random_string()+a,e(!0)}).catch(function(t){console.log("loooo3"),i.$message.error("未知错误："+s()(t)),e(!1)})):(i.$message.error("上传头像图片大小不能超过 5MB!"),o(!1)):(i.$message.error("上传头像图片只能是 JPG/PNG 格式!"),o(!1))})}}}},"J6G/":function(e,i,t){"use strict";function r(e){t("T4Ok")}Object.defineProperty(i,"__esModule",{value:!0});var s=t("Yc8N"),a=t("XPAp"),o=t("VU/8"),n=r,l=o(s.a,a.a,n,null,null);i.default=l.exports},QbVN:function(e,i,t){"use strict";function r(e){t("rFkn"),t("Qtds")}var s=t("EPeO"),a=t("X/Qy"),o=t("VU/8"),n=r,l=o(s.a,a.a,n,"data-v-5d7a9fe6",null);i.a=l.exports},Qtds:function(e,i){},T4Ok:function(e,i){},"X/Qy":function(e,i,t){"use strict";var r=function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("div",{staticClass:"upload-container",class:{uploadlist:e.showFileList}},[e.uploadUrl?t("el-upload",{staticClass:"image-uploader",attrs:{data:e.upload,action:e.uploadUrl,multiple:e.multiple,drag:!e.showFileList,"show-file-list":e.showFileList,"file-list":e.filelist,limit:e.limit,"before-upload":e.beforeUpload,"list-type":e.listtype,"on-exceed":e.onexceed,disabled:e.disabled,"on-remove":e.handleRemove,"on-error":e.handleError,"on-success":e.handleImageScucess}},[e._t("content",[e.title&&!e.showFileList?t("div",{staticClass:"upload__title"},[e._v(e._s(e.title))]):e._e(),e._v(" "),t("el-button",{attrs:{size:e.size,type:"primary"}},[e._v("点击上传")]),e._v(" "),e.showFileList?e._e():t("div",{staticClass:"el-upload__text"},[e._v("将文件拖拽到此区域")]),e._v(" "),e.tip?t("div",{staticClass:"upload__tip"},[e._v(e._s(e.tip))]):e._e()])],2):e._e(),e._v(" "),e.imageUrl&&!e.showFileList?t("div",{staticClass:"image-preview"},[t("div",{staticClass:"image-preview-wrapper"},[t("img",{attrs:{src:e.imageUrl}}),e._v(" "),t("div",{staticClass:"image-preview-action"},[t("i",{staticClass:"el-icon-delete",on:{click:e.rmImage}})])])]):e._e()],1)},s=[],a={render:r,staticRenderFns:s};i.a=a},XPAp:function(e,i,t){"use strict";var r=function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("div",{staticClass:"carownerIdentification identification"},[t("el-form",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.logisticsForm,rules:e.rules,"label-width":"250px"}},[t("div",{staticClass:"carrierTitle"},[t("div",{staticClass:"realname"},[t("h2",[e._v("完善实名认证 "),t("span",{class:{certified:"待认证"==e.logisticsForm.driverStatusName,certify:"认证成功"==e.logisticsForm.driverStatusName}},[e._v("( "+e._s(e.logisticsForm.driverStatusName)+" )")])])]),e._v(" "),t("div",{staticClass:"prompt"},[t("p",[t("span",{staticClass:"tishi"},[t("i",{staticClass:"el-icon-warning"}),e._v("小提示： ")]),e._v("(打"),t("span",{staticClass:"star"},[e._v("*")]),e._v("号为必填项)")])])]),e._v(" "),t("div",{staticClass:"companyInformation information"},[t("h2",[e._v("基本信息")]),e._v(" "),t("el-form-item",{attrs:{label:"车主：",prop:"driverName"}},[t("el-input",{attrs:{placeholder:"请填写车主姓名",disabled:!1===e.ifDisable},model:{value:e.logisticsForm.driverName,callback:function(i){e.$set(e.logisticsForm,"driverName",i)},expression:"logisticsForm.driverName"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"身份证号：",prop:"driverCardid"}},[t("el-input",{attrs:{placeholder:"请输入18位身份证号",disabled:!1===e.ifDisable},model:{value:e.logisticsForm.driverCardid,callback:function(i){e.$set(e.logisticsForm,"driverCardid",i)},expression:"logisticsForm.driverCardid"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"手机号码：",prop:"driverMobile"}},[t("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],attrs:{maxlength:"11",disabled:""},model:{value:e.logisticsForm.driverMobile,callback:function(i){e.$set(e.logisticsForm,"driverMobile",i)},expression:"logisticsForm.driverMobile"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"车主QQ：",prop:"QQ"}},[t("el-input",{directives:[{name:"numberOnly",rawName:"v-numberOnly"}],attrs:{disabled:!1===e.ifDisable},model:{value:e.logisticsForm.qq,callback:function(i){e.$set(e.logisticsForm,"qq",i)},expression:"logisticsForm.qq"}})],1),e._v(" "),t("el-form-item",{staticClass:"textarea",attrs:{label:"车主简介：",prop:"driverDesc"}},[t("el-input",{attrs:{type:"textarea",autosize:{minRows:5,maxRows:10},placeholder:"请输入内容",disabled:!1===e.ifDisable,maxlength:e.maxlength},model:{value:e.logisticsForm.driverDesc,callback:function(i){e.$set(e.logisticsForm,"driverDesc",i)},expression:"logisticsForm.driverDesc"}}),e._v(" "),t("span",[e._v(e._s(e.totalNumber)+" / "+e._s(e.maxlength))]),e._v(" "),t("p",[e._v("请输入30-2000字，建议您详细介绍您的服务信息")])],1)],1),e._v(" "),t("div",{staticClass:"picInformation information"},[t("h2",[e._v("车主认证照片")]),e._v(" "),t("el-form-item",{attrs:{prop:"drivingLicenceFile"}},[t("p",[t("span",[e._v("*")]),e._v("上传驾驶证照片：")]),e._v(" "),1==e.ifDisable?t("upload",{staticClass:"licensePicture",attrs:{tip:"（必须为jpg/png并且小于5M）"},model:{value:e.logisticsForm.drivingLicenceFile,callback:function(i){e.$set(e.logisticsForm,"drivingLicenceFile",i)},expression:"logisticsForm.drivingLicenceFile"}}):t("img",{staticClass:"showPicture",attrs:{src:e.logisticsForm.drivingLicenceFile?e.logisticsForm.drivingLicenceFile:e.defaultImg,alt:"驾驶证照片"}}),e._v(" "),t("el-button",{directives:[{name:"show",rawName:"v-show",value:!!e.logisticsForm.drivingLicenceFile,expression:"logisticsForm.drivingLicenceFile ? true : false"},{name:"showPicture",rawName:"v-showPicture"}],staticClass:"preview",attrs:{type:"primary",plain:"",imgurl:e.logisticsForm.drivingLicenceFile}},[e._v("点击预览")])],1),e._v(" "),t("el-form-item",{attrs:{prop:"idCardFile"}},[t("p",[t("span",[e._v("*")]),e._v("上传车主身份证照片：")]),e._v(" "),1==e.ifDisable?t("upload",{staticClass:"licensePicture",attrs:{tip:"（必须为jpg/png并且小于5M）"},model:{value:e.logisticsForm.idCardFile,callback:function(i){e.$set(e.logisticsForm,"idCardFile",i)},expression:"logisticsForm.idCardFile"}}):t("img",{staticClass:"showPicture",attrs:{src:e.logisticsForm.idCardFile?e.logisticsForm.idCardFile:e.defaultImg,alt:"车主身份证照片"}}),e._v(" "),t("el-button",{directives:[{name:"show",rawName:"v-show",value:!!e.logisticsForm.idCardFile,expression:"logisticsForm.idCardFile ? true : false"},{name:"showPicture",rawName:"v-showPicture"}],staticClass:"preview",attrs:{type:"primary",plain:"",imgurl:e.logisticsForm.idCardFile}},[e._v("点击预览")])],1),e._v(" "),t("el-form-item",{attrs:{prop:"personalImageFile"}},[t("p",[t("span",[e._v("*")]),e._v("上传车主个人形象照：")]),e._v(" "),1==e.ifDisable?t("upload",{staticClass:"licensePicture",attrs:{tip:"（必须为jpg/png并且小于5M）"},model:{value:e.logisticsForm.personalImageFile,callback:function(i){e.$set(e.logisticsForm,"personalImageFile",i)},expression:"logisticsForm.personalImageFile"}}):t("img",{staticClass:"showPicture",attrs:{src:e.logisticsForm.personalImageFile?e.logisticsForm.personalImageFile:e.defaultImg,alt:"车主个人形象照"}}),e._v(" "),t("el-button",{directives:[{name:"show",rawName:"v-show",value:!!e.logisticsForm.personalImageFile,expression:"logisticsForm.personalImageFile ? true : false"},{name:"showPicture",rawName:"v-showPicture"}],staticClass:"preview",attrs:{type:"primary",plain:"",imgurl:e.logisticsForm.personalImageFile}},[e._v("点击预览")])],1)],1),e._v(" "),t("el-form-item",{staticClass:"fromfooter"},[t("el-button",{directives:[{name:"show",rawName:"v-show",value:e.ifDisable,expression:"ifDisable"}],attrs:{size:"medium"},on:{click:function(i){e.resetForm("ruleForm")}}},[e._v("取消")]),e._v(" "),t("el-button",{directives:[{name:"show",rawName:"v-show",value:e.ifDisable,expression:"ifDisable"}],attrs:{size:"medium",type:"primary"},on:{click:function(i){e.submitForm("ruleForm")}}},[e._v("确认")])],1)],1)],1)},s=[],a={render:r,staticRenderFns:s};i.a=a},Yc8N:function(e,i,t){"use strict";var r=t("woOf"),s=t.n(r),a=t("nOfT"),o=(t.n(a),t("QbVN")),n=t("1jhZ"),l=t("t5DY"),c=t("E4LH"),u=t("TIfe");i.a={components:{upload:o.a},computed:{totalNum:function(){return this.logisticsForm.driverDesc},disabled:function(){return this.logisticsForm.driverStatusName}},watch:{totalNum:{handler:function(e,i){e&&(this.totalNumber=e.length)},deep:!0},disabled:{handler:function(e){this.ifDisable="待认证"!==e&&"认证成功"!==e},deep:!0}},data:function(){return{loading:!0,defaultImg:"/static/default.png",ifDisable:!1,totalNumber:0,maxlength:2e3,logisticsForm:{driverName:"",driverCardid:"",driverMobile:"",qq:"",driverDesc:"",drivingLicenceFile:"",idCardFile:"",personalImageFile:""},rules:{driverName:[{required:!0,message:"请输入车主名称",trigger:"blur"}],driverCardid:[{required:!0,validator:function(e,i,t){return i?c.a.ID_CARD.test(i)?void t():t(new Error("请输入正确的二代身份证号码")):t(new Error("请输入身份证号码"))},trigger:"blur"}],driverDesc:[{required:!0,message:"请完善个人内容",trigger:"blur"},{min:30,message:"车主简介，不能少于30个字",trigger:"blur"}],driverMobile:[{required:!0,message:"请填写手机号码",trigger:"blur"}],drivingLicenceFile:[{required:!0,message:"请上传驾驶证照片",trigger:"blur"}],idCardFile:[{required:!0,message:"请上传车主身份证照片",trigger:"blur"}],personalImageFile:[{required:!0,message:"请上传车主个人形象照",trigger:"blur"}]}}},mounted:function(){this.getMoreInformation()},methods:{getMoreInformation:function(){var e=this,i=Object(u.d)();Object(l.d)(i.mobile).then(function(i){e.logisticsForm=i.data,e.loading=!1})},submitForm:function(e){var i=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;var t=s()({},i.logisticsForm,{driverStatus:"AF0010402"});Object(n.d)(t).then(function(e){i.$alert("操作成功","提示",{confirmButtonText:"确定",callback:function(e){i.getMoreInformation()}}).catch(function(){i.$message({type:"info",message:"已取消"})})}).catch(function(e){i.$message({type:"info",message:e.errorInfo})})})},resetForm:function(e){this.$refs[e].resetFields()}}}},nOfT:function(e,i){},rFkn:function(e,i){},t5DY:function(e,i,t){"use strict";function r(e){return e=e||"",v.b.get("/aflccommonservice/common/aflcCommonPCA/v1/findAflcCommonPCAByCode?code="+e).then(function(i){return i.code=e,i})}function s(){return g?new f.a(function(e){e(g)}):v.b.get("/anfacommonservice/common/oss/v1/policy").then(function(e){return g=e.data||"",setTimeout(function(){g=""},18e4),g})}function a(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return v.b.get("/aflccommonservice/sysDict/getSysDictByCodeGet/"+e).then(function(e){return e.data||[]})}function o(e){return v.b.axios({url:"/"+p+"/sysDict/getSysDictByCodeGet/"+e,method:"get"})}function n(e){return v.b.axios({url:"/"+p+"/common/aflcMemberCenter/v1/getShipperInfoByMobile?mobile="+e,method:"get"})}function l(e){return v.b.axios({url:"/"+p+"/common/aflcMemberCenter/v1/getDriverInfoByMobile?mobile="+e,method:"get"})}function c(e){return v.b.axios({url:"/"+p+"/common/aflcMemberCenter/v1/getLogisticsCompanyInfoByMobile?mobile="+e,method:"get"})}function u(e){return v.b.axios({url:"/aflcorderservice/order/fclOrder/v1/getDetailsByOrderSerial/"+e,method:"get"})}function d(e,i){var t=new FormData;for(var r in i)t.append(r,i[r]);var s="";for(var a in i)s+="&"+a+"="+i[a];return v.b.request({url:"/aflccommonservice/common/aflcMemberCenter/v1/updatePassword?memberType="+e,method:"put",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:s})}i.a=r,i.h=s,i.f=a,i.c=o,i.g=n,i.d=l,i.e=c,i.b=u,i.i=d;var m=t("//Fk"),f=t.n(m),v=t("Vo7i"),p="aflccommonservice",g=void 0}});