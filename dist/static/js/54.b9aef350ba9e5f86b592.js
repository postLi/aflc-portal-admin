webpackJsonp([54],{"6j+O":function(t,e,n){"use strict";var s=n("Dd8w"),r=n.n(s),i=n("NYxO");e.a={computed:r()({},Object(i.b)(["permission_routers"]),{sidebar:function(){return this.permission_routers.filter(function(t){return"/components"===t.path})[0].children}})}},NLv0:function(t,e,n){"use strict";function s(t){n("nPmq")}Object.defineProperty(e,"__esModule",{value:!0});var r=n("6j+O"),i=n("pbNv"),a=n("VU/8"),o=s,c=a(r.a,i.a,o,null,null);e.default=c.exports},nPmq:function(t,e){},pbNv:function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"showComponents"},[n("div",{staticClass:"sidebar-demo"},[n("h2",[t._v("边栏导航")]),t._v(" "),n("ol",t._l(t.sidebar,function(e,s){return n("li",{key:s,class:{active:e.path===t.$route.path}},[n("router-link",{attrs:{to:e.path}},[t._v(t._s(s+1)+" 、 "+t._s(e.name))])],1)}))]),t._v(" "),n("div",{staticClass:"demo-contents"},[n("h1",[t._v("展示自定义的组件、指令、过滤器等")]),t._v(" "),n("p",[t._v("为了方便大家使用各自开发的公共组件，希望大家弄了自定义组件、指令等，都添加示例到这个页面")]),t._v(" "),n("div",{staticClass:"important"},[t._v("\n      正式上线需要屏蔽此页面，减小打包体积\n    ")]),t._v(" "),n("router-view")],1)])},r=[],i={render:s,staticRenderFns:r};e.a=i}});