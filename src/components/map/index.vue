<template>
<el-dialog custom-class="aflcmap-pop-wrapper" title="地图" @close="close" :visible.sync="dialogTableVisible">
 <div id="mapcontainer"></div>
 <div id="myPageTop">
    <table>
        <tr>
            <td>
                <label>请输入关键字：</label>
            </td>
        </tr>
        <tr>
            <td>
                <input id="tipinput"/>
            </td>
        </tr>
    </table>
</div>
<div class="aflcmap-pop-footer" slot="footer">
  <el-button type="primary" @click="submitForm">确 定</el-button>
  <el-button type="info" @click="close">取 消</el-button>
  
</div>
</el-dialog>
</template>
<script>
import { loadJs } from '@/utils/'
export default {
  props: {
    popVisible: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.dialogTableVisible = this.popVisible
    console.log('this.popVisible:', this.popVisible)
  },
  created() {
    if (window.AMap) {
      this.initMap()
    } else {
      loadJs('https://webapi.amap.com/maps?v=1.4.8&key=73bdb8428fbfe511ed6c5f3328b5734b&plugin=AMap.Autocomplete,AMap.PlaceSearch,AMap.Geocoder').then(() => {
        // loadJs('//webapi.amap.com/ui/1.0/main-async.js').then(() => {
        loadJs('//webapi.amap.com/ui/1.0/main.js').then(() => {
          this.initMap()
        })
      })
    }
  },
  // 关闭时清空地图数据
  destoryed() {
    if (this.map && this.map.destroy) {
      this.map.destroy()
    }
  },
  data() {
    return {
      dialogTableVisible: false
    }
  },
  methods: {
    close(done) {
      this.$emit('update:popVisible', false)
      if (typeof done === 'function') {
        done()
      }
    },
    initMap() {
      const AMap = window.AMap
      const AMapUI = window.AMapUI
       // 地图加载
      this.map = new AMap.Map('mapcontainer', {
        resizeEnable: true
      })
      const map = this.map
    // 输入提示
      var autoOptions = {
        input: 'tipinput'
      }
      var auto = new AMap.Autocomplete(autoOptions)
      var placeSearch = new AMap.PlaceSearch({
        map: map
      })
      AMapUI.loadUI(['misc/PositionPicker'], function(PositionPicker) {
        var map = new AMap.Map('container', {
          zoom: 16
        })
        var positionPicker = new PositionPicker({
          mode: 'dragMap', // 设定为拖拽地图模式，可选'dragMap'、'dragMarker'，默认为'dragMap'
          map: map// 依赖地图对象
        })
    // TODO:事件绑定、结果处理等
        positionPicker.on('success', function(positionResult) {
          console.log('success:', positionResult)
        })
        positionPicker.on('fail', function(positionResult) {
          console.log('fail:', positionResult)
        })
        // start方法可以接受一个经纬度参数作为，拖拽的起始点
      })
      map.on('click', function(e) {
        console.log('e:', e)
      })
      // 构造地点查询类
      map.plugin(['AMap.ToolBar'], function() {
        map.addControl(new AMap.ToolBar())
      })
      AMap.event.addListener(auto, 'select', select)// 注册监听，当选中某条记录时会触发
      function select(e) {
        console.log('select e:', e)
        placeSearch.setCity(e.poi.adcode)
        // positionPicker.start()
        placeSearch.search(e.poi.name)  // 关键字查询查询
      }
    },
    submitForm() {
      // 提交数据
      // submitForm
    }
  }
}
</script>
<style lang="scss">
.aflcmap-pop-wrapper{
  width: 70%;
  min-width: 400px;

  .el-dialog__body{
    position: relative;
    height: 500px;
    
  }
}
#mapcontainer {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
}

.button-group {
	position: absolute;
	bottom: 20px;
	right: 20px;
	font-size: 12px;
	padding: 10px;
}

.button-group .button {
	height: 28px;
	line-height: 28px;
	background-color: #0D9BF2;
	color: #FFF;
	border: 0;
	outline: none;
	padding-left: 5px;
	padding-right: 5px;
	border-radius: 3px;
	margin-bottom: 4px;
	cursor: pointer;
}
.button-group .inputtext {
	height: 26px;
	line-height: 26px;
	border: 1px;
	outline: none;
	padding-left: 5px;
	padding-right: 5px;
	border-radius: 3px;
	margin-bottom: 4px;
	cursor: pointer;
}
.amap-info-content {
	font-size: 12px;
}

#myPageTop {
	position: absolute;
	top: 5px;
	right: 10px;
	background: #fff none repeat scroll 0 0;
	border: 1px solid #ccc;
	margin: 10px auto;
	padding:6px;
	font-family: "Microsoft Yahei", "微软雅黑", "Pinghei";
	font-size: 14px;
}
#myPageTop label {
  margin: 0 20px 10px 0;
  display: inline-block;
	color: #666666;
	font-weight: normal;
}
#myPageTop input {
  width: 250px;
  height: 30px;
  line-height: 30px;
}
#myPageTop .column2{
	padding-left: 25px;
}
.amap-sug-result{
  z-index: 3999;
}
</style>
