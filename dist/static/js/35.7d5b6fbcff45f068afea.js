webpackJsonp([35],{"5Y71":function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"component"},[i("h2",[e._v("上传图片")]),e._v(" "),i("h4",[e._v("默认样式")]),e._v(" "),i("UploadImage",{model:{value:e.url1,callback:function(t){e.url1=t},expression:"url1"}}),e._v(" "),i("h4",[e._v("定义标题")]),e._v(" "),i("UploadImage",{attrs:{title:"法人身份证正面"},model:{value:e.url2,callback:function(t){e.url2=t},expression:"url2"}}),e._v(" "),i("h4",[e._v("定义提示")]),e._v(" "),i("UploadImage",{attrs:{tip:"（有年检章，jpg/png。小于5M）"},model:{value:e.url3,callback:function(t){e.url3=t},expression:"url3"}}),e._v(" "),i("h4",[e._v("定义标题跟提示 + 默认值")]),e._v(" "),i("UploadImage",{attrs:{title:"法人身份证正面",tip:"（有年检章，jpg/png。小于5M）"},on:{success:e.getUrl},model:{value:e.url,callback:function(t){e.url=t},expression:"url"}}),e._v(" "),i("p",[e._v("上传后的链接地址："+e._s(e.url))]),e._v(" "),i("img",{attrs:{src:e.url}}),e._v(" "),i("h4",[e._v("展示预览列表")]),e._v(" "),i("UploadImage",{attrs:{multiple:"",showFileList:"",limit:50,listtype:"picture",tip:""},on:{success:e.getUrl},model:{value:e.url4,callback:function(t){e.url4=t},expression:"url4"}}),e._v(" "),i("p",[e._v("上传后的链接地址："+e._s(JSON.stringify(e.url4)))]),e._v(" "),i("blockquote",[e._v("\n    引用地址：\n    components/Upload/singleImage.vue\n  ")]),e._v(" "),i("h3",[e._v("prop")]),e._v(" "),e._m(0),e._v(" "),i("p",[e._v("注意事项：当showFileList为true时，v-model绑定的值为数组类型或者是以英文逗号分隔的图片链接")]),e._v(" "),i("h3",[e._v("event")]),e._v(" "),e._m(1)],1)},o=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("ul",[i("li",{staticClass:"info-require"},[e._v("v-model"),i("div",{staticClass:"type"},[e._v("String")]),e._v("用来绑定控件的值")]),e._v(" "),i("li",[e._v("title"),i("div",{staticClass:"type"},[e._v("String")]),e._v("标题")]),e._v(" "),i("li",[e._v("tip"),i("div",{staticClass:"type"},[e._v("String")]),e._v("提示信息")]),e._v(" "),i("li",[e._v("showFileList"),i("div",{staticClass:"type"},[e._v("Boolean")]),e._v("是否显示预览图")]),e._v(" "),i("li",[e._v("limit"),i("div",{staticClass:"type"},[e._v("Number")]),e._v("限制上传n张图片")]),e._v(" "),i("li",[e._v("listtype"),i("div",{staticClass:"type"},[e._v("String")]),e._v("展示形式，可取'text', 'picture', 'picture-card' ")])])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("ul",[i("li",[i("div",{staticClass:"function"},[e._v("success")]),e._v("返回当前控件的值，如 "),i("pre",[e._v("    'xxxx' // 上传后的链接  \n    ")])])])}],l={render:n,staticRenderFns:o};t.a=l},EPeO:function(e,t,i){"use strict";var n=i("mvHQ"),o=i.n(n),l=i("//Fk"),r=i.n(l),a=i("t5DY"),s=i("0xDb");t.a={name:"singleImageUpload",props:{value:[String,Array],title:{type:String,default:""},tip:{type:String,default:"（jpg/png。小于5M）"},multiple:{type:Boolean,default:!1},size:{type:String,default:"mini"},showFileList:{type:Boolean,default:!1},limit:{type:Number,default:10},listtype:{type:String,default:"picture",enum:["text","picture","picture-card"]},disabled:{type:Boolean,default:!1}},computed:{imageUrl:function(){return this.value}},data:function(){return{tempUrl:"",dataObj:{token:"",key:""},upload:{key:"",policy:"",OSSAccessKeyId:"",success_action_status:"201",signature:""},uploadUrl:"",dir:"",filelist:[]}},watch:{value:{handler:function(e){if(this.showFileList){var t=Array.isArray(e)?e:e?e.split(","):[];t=t.filter(function(e){return e}),this.filelist=t.map(function(e){var t={};return t.url=e,t})}else this.filelist=[{url:e}]},immediate:!0}},mounted:function(){this.init()},methods:{init:function(){var e=this;return Object(a.h)().then(function(t){e.upload.OSSAccessKeyId=t.accessid,e.upload.policy=t.policy,e.upload.signature=t.signature,e.uploadUrl=t.host,e.dir=t.dir}).catch(function(e){console.log("get Policy ERror:",e)})},rmImage:function(){this.emitInput("")},onexceed:function(e,t){this.$message.error("最多上传 "+this.limit+" 张!")},handleRemove:function(e,t){console.log("handleRemove:",e,t),this.filelist=t,this.emitInput()},random_string:function(e){e=e||32;for(var t="ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",i=t.length,n="",o=0;o<e;o++)n+=t.charAt(Math.floor(Math.random()*i));return n},emitInput:function(e){e&&this.filelist.push({url:e}),this.$emit("input",this.showFileList?this.filelist.map(function(e){return e.url}).join(","):e)},handleImageScucess:function(e){var t="";-1!==e.indexOf("Location")&&(t=e.match(/<Location>([^<]+)<\/Location>/m),t=t?t[1]:""),this.emitInput(t)},handleError:function(e){console.log("upload err:",e),this.$emit("error",e)},beforeUpload:function(e){var t=this;console.log("beforeUpload:",e);var i=/image\/\w+/.test(e.type)&&/(jpe?g|png)/i.test(e.type),n=e.size/1024/1024<5,l=e.name.match(/([^\.]+)$/);return l=l?"."+l[1]:"",new r.a(function(e,r){i?n?(console.log("loooo1"),t.init().then(function(i){console.log("loooo2"),t.upload.key=t.dir+Object(s.e)(new Date,"{y}{m}{d}")+"/"+t.random_string()+l,e(!0)}).catch(function(i){console.log("loooo3"),t.$message.error("未知错误："+o()(i)),e(!1)})):(t.$message.error("上传头像图片大小不能超过 5MB!"),r(!1)):(t.$message.error("上传头像图片只能是 JPG/PNG 格式!"),r(!1))})}}}},HMrH:function(e,t,i){"use strict";var n=i("QbVN");t.a={components:{UploadImage:n.a},data:function(){return{url:"http://aflc.oss-cn-shenzhen.aliyuncs.com//tms/JepzficX6twzc2F76MtED8kMC53pxQmH.png",url1:"",url2:"",url3:"",url4:["https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"]}},methods:{getUrl:function(e){console.log("upload Url:",e)}}}},IJ74:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i("HMrH"),o=i("5Y71"),l=i("VU/8"),r=l(n.a,o.a,null,null,null);t.default=r.exports},QbVN:function(e,t,i){"use strict";function n(e){i("rFkn"),i("Qtds")}var o=i("EPeO"),l=i("X/Qy"),r=i("VU/8"),a=n,s=r(o.a,l.a,a,"data-v-5d7a9fe6",null);t.a=s.exports},Qtds:function(e,t){},"X/Qy":function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"upload-container",class:{uploadlist:e.showFileList}},[e.uploadUrl?i("el-upload",{staticClass:"image-uploader",attrs:{data:e.upload,action:e.uploadUrl,multiple:e.multiple,drag:!e.showFileList,"show-file-list":e.showFileList,"file-list":e.filelist,limit:e.limit,"before-upload":e.beforeUpload,"list-type":e.listtype,"on-exceed":e.onexceed,disabled:e.disabled,"on-remove":e.handleRemove,"on-error":e.handleError,"on-success":e.handleImageScucess}},[e._t("content",[e.title&&!e.showFileList?i("div",{staticClass:"upload__title"},[e._v(e._s(e.title))]):e._e(),e._v(" "),i("el-button",{attrs:{size:e.size,type:"primary"}},[e._v("点击上传")]),e._v(" "),e.showFileList?e._e():i("div",{staticClass:"el-upload__text"},[e._v("将文件拖拽到此区域")]),e._v(" "),e.tip?i("div",{staticClass:"upload__tip"},[e._v(e._s(e.tip))]):e._e()])],2):e._e(),e._v(" "),e.imageUrl&&!e.showFileList?i("div",{staticClass:"image-preview"},[i("div",{staticClass:"image-preview-wrapper"},[i("img",{attrs:{src:e.imageUrl}}),e._v(" "),i("div",{staticClass:"image-preview-action"},[i("i",{staticClass:"el-icon-delete",on:{click:e.rmImage}})])])]):e._e()],1)},o=[],l={render:n,staticRenderFns:o};t.a=l},rFkn:function(e,t){},t5DY:function(e,t,i){"use strict";function n(e){return e=e||"",p.b.get("/aflccommonservice/common/aflcCommonPCA/v1/findAflcCommonPCAByCode?code="+e).then(function(t){return t.code=e,t})}function o(){return _?new v.a(function(e){e(_)}):p.b.get("/anfacommonservice/common/oss/v1/policy").then(function(e){return _=e.data||"",setTimeout(function(){_=""},18e4),_})}function l(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return p.b.get("/aflccommonservice/sysDict/getSysDictByCodeGet/"+e).then(function(e){return e.data||[]})}function r(e){return p.b.axios({url:"/"+f+"/sysDict/getSysDictByCodeGet/"+e,method:"get"})}function a(e){return p.b.axios({url:"/"+f+"/common/aflcMemberCenter/v1/getShipperInfoByMobile?mobile="+e,method:"get"})}function s(e){return p.b.axios({url:"/"+f+"/common/aflcMemberCenter/v1/getDriverInfoByMobile?mobile="+e,method:"get"})}function c(e){return p.b.axios({url:"/"+f+"/common/aflcMemberCenter/v1/getLogisticsCompanyInfoByMobile?mobile="+e,method:"get"})}function u(e){return p.b.axios({url:"/aflcorderservice/order/fclOrder/v1/getDetailsByOrderSerial/"+e,method:"get"})}function d(e,t){var i=new FormData;for(var n in t)i.append(n,t[n]);var o="";for(var l in t)o+="&"+l+"="+t[l];return p.b.request({url:"/aflccommonservice/common/aflcMemberCenter/v1/updatePassword?memberType="+e,method:"put",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:o})}t.a=n,t.h=o,t.f=l,t.c=r,t.g=a,t.d=s,t.e=c,t.b=u,t.i=d;var m=i("//Fk"),v=i.n(m),p=i("Vo7i"),f="aflccommonservice",_=void 0}});