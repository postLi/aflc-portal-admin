<template>
  <div class="lll-carinfo identification page-main">
    <!-- <div class="tab-info-title">
      <h2><span>{{title}}车辆信息</span></h2>
    </div> -->
     <div class="carrierTitle">
        <div class="realname">
            <h2>{{ title }}</h2>
        </div>
        <div class="prompt">
            <p><span class="tishi"><i class="el-icon-warning"></i>小提示： </span>完善车辆信息才能成功发布车源

            </p>
        </div>
    </div>
    <el-form :model="ruleForm" :rules="rules" size="mini" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <div class="car-baseinfo-wrapper">
      <!--<div class="tab-info-stitle"><strong>11基本信息：</strong>(<span class="important">带*为必填项</span>)</div>-->
      <div class="car-base-info clearfix">
      <el-form-item required  label="车牌号">
        <el-input maxlength="15" v-model="ruleForm.carNumber"></el-input>
      </el-form-item>
      <el-form-item required label="车辆类型">
        <selectType v-model="ruleForm.carType" type="AF018" clearable size="mini"></selectType>
      </el-form-item>
        <el-form-item required label="车辆规格">
          <selectType v-model="ruleForm.carSpec" type="AF009" clearable size="mini"></selectType>
        </el-form-item>
      <el-form-item class="carvinfo" required label="车   长">
        长 <input class="nativeinput" :value="ruleForm.carLength" @change="(e)=>{setInputVal(e.target.value,ruleForm, 'carLength')}" :maxlength="4" placeholder="" auto-complete="off"  clearable
          v-number-only:point1 type="text">
          <!-- <el-input maxlength="5" v-numberOnly:point1 v-model="ruleForm.carLength"></el-input> -->
        宽 <input class="nativeinput" :value="ruleForm.carWidth" @change="(e)=>{setInputVal(e.target.value,ruleForm, 'carWidth')}" :maxlength="4" placeholder="" auto-complete="off"  clearable
          v-number-only:point1 type="text">
          <!-- <el-input maxlength="5" v-numberOnly:point1 v-model="ruleForm.carWidth"></el-input> -->
        高 <input class="nativeinput" :value="ruleForm.carHeight" @change="(e)=>{setInputVal(e.target.value,ruleForm, 'carHeight')}" :maxlength="4" placeholder="" auto-complete="off"  clearable
          v-number-only:point1 type="text">
          <!-- <el-input maxlength="5" v-numberOnly:point1 v-model="ruleForm.carHeight"></el-input>（米） -->
      </el-form-item>

      <el-form-item required label="车辆载重">
        <div class="el-input-group">
            <input class="nativeinput"  :value="ruleForm.carLoad"  @change="(e)=>{setInputVal(e.target.value,ruleForm, 'carLoad')}" :maxlength="3" v-numberOnly:point1 placeholder="" auto-complete="off"  clearable
                      type="text" />
            <div class="el-input-group__append">（吨）</div>
          </div>
        <!-- <el-input v-model="ruleForm.carLoad">
           <template slot="append">（吨）</template>
        </el-input> -->
      </el-form-item>
        <el-form-item required label="车辆常驻地">
          <vregion :ui="true" @values="regionChangeUsual" class="form-control" :ifAera = 'true' @testCity="ifProvice('usualPlace')">
            <el-input v-model="ruleForm.usualPlace" placeholder="车辆常驻地"></el-input>
          </vregion>
        </el-form-item>
      <el-form-item required label="车辆体积" class="floatleft">
        <el-input disabled v-model="ruleForm.carVolume">
          <template slot="append">（立方米）</template>
        </el-input>
      </el-form-item>
      </div>
</div>

<div class="car-picinfo">
  <div class="tab-info-stitle" style="padding:0 0 20px 150px"><span style="color: red">*</span><strong>上传车辆45°照片</strong></div>

      <el-form-item required style="padding-left: 50px" >
        <upload :limit="3" listtype="picture-card" :title="'身份证'" :showFileList="true" v-model="ruleForm.carFile" />

      </el-form-item>
</div>
<div class="car-submit">
  <!--<el-button type="info" @click="resetForm">重置</el-button>-->
  <el-button class="create-carinfo-btn" type="primary" @click="submitForm('ruleForm')">确认提交</el-button>
</div>


    </el-form>
  </div>
</template>
<script>
import selectType from '@/components/selectType/index'
import upload from '@/components/Upload/singleImage2'
import tmsmap from '@/components/map/index'
import { getSelectType } from '@/api/common'
import * as ReqApi from '@/api/carowner/index'
import vregion from '@/components/vregion/Region'

export default {
  components: {
    selectType,
    upload,
    vregion
  },
  mounted() {
    this.id = this.$route.query.id

    this.initLabel().then(() => {
      if (this.id) {
        this.initModify()
      } else {
        this.initNew()
        this.getDetails()
      }
    })
  },
  data() {
    return {
      id: '',
      title: '完善车辆信息',
      ifDisable: false,
      popVisible: false,
      labelArr: [],
      rules: {},
      current: '',
      ruleForm: {
        // 'beginTime': '', // 发车开始时间
        'belongDriver': '', // 车源所属车主
        // 'browseNumber': 0, // 浏览量
        'carFile': '', // 车辆45度照
        'carHeight': '', // 车高
        'carLength': '', // 车长
        'carLoad': '', // 车载重
        'carNumber': '', // 车牌号
        // 'carNum': '', // 车牌号
        'carSourceType': '', // 车源类型  "AF01801","回程车" "AF01802","本地车"
        'carSpec': '', // 车辆规格
        'carTag': '', // 车辆标签属性（用|分割）
        'carTagName': '', // 车辆标签属性（用|分割）
        'carType': '', // 车类型
        'carVolume': '', // 车辆体积
        'carWidth': '', // 车宽
        // 'createTime': '', // 创建时间
        // 'creater': '', // 创建人
        'driverId': '', // 车主id
        'endAddress': '', // 目的地
        'endAddressCoordinate': '', // 目的地坐标
        endProvince: '',
        endCity: '',
        endArea: '',
        // 'endAddressName': 'string', // 目的地地址名称
        // 'endTime': '2018-07-25T02:05:50.884Z', // 发车结束时间
        'expectPrice': '', // 期望运价
        // 'id': 'string', // 车源id 修改时要查
        // 'isCommonRoute': 'string', // 是否常用路线
        // 'isEnable': 'string', // 是否启用
        'isLongCar': '', // 即时/长期车源(0:长期车源，1：短期车源)
        // 'phone': 'string', // 车主电话
        'remark': '', // 备注
        'startTime': '', // 发车时间
        'strartAddress': '', // 出发地
        startProvince: '',
        startCity: '',
        startArea: '',
        'strartAddressCoordinate': '', // 出发地坐标
        // 'strartAddressName': 'string', // 出发地地址名称
        'title': '', // 标题
        // 'updateTime': '',
        // 'updater': 'string', // 更新人
        'usualPlace': '', // 车俩常驻地
        'usualPlaceCoordinate': '', // 常驻地坐标
        'viaAddress': '' // 途径地
        // 'viaAddressName': 'string'// 途径地地址名称
      }
    }
  },
  watch: {
    'ruleForm.carLength': {
      handler() {
        this.getCarVolum()
      }
    },
    'ruleForm.carWidth': {
      handler() {
        this.getCarVolum()
      }
    },
    'ruleForm.carHeight': {
      handler() {
        this.getCarVolum()
      }
    }
  },
  methods: {
    getDetails(){
      return ReqApi.postGetCarInfo().then(res=>{
        this.comDetail(res.data)
      })
    },
    comDetail(item){

      this.$set(this.ruleForm,'carFile',item.carFile)
      this.$set(this.ruleForm,'carHeight',item.carHeight)
      this.$set(this.ruleForm,'carLength',item.carLength)
      this.$set(this.ruleForm,'carWidth',item.carWidth)
      this.$set(this.ruleForm,'carLoad',item.carLoad)
      this.$set(this.ruleForm,'carNumber',item.carNumber)
      this.$set(this.ruleForm,'carSpec',item.carSpec)
      this.$set(this.ruleForm,'carType',item.carType)
      this.$set(this.ruleForm,'carVolume',item.carVolume)
      this.$set(this.ruleForm,'usualPlace',item.usualPlace)
      this.$set(this.ruleForm,'usualPlaceCoordinate',item.usualPlaceCoordinate)

    },
    setInputVal(val, item, name) {
      this.$set(item, name, val)
    },
    getValue(obj) {
      return obj ? obj.value : ''
    },
    regionChangeUsual(d) {
      this.ruleForm.usualPlace = (!d.province && !d.city && !d.area && !d.town) ? '' : `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim()
    },
    regionChangeStart(d) {
      if (!d.province && !d.city && !d.area && !d.town) {
        this.ruleForm.strartAddress = ''
      } else {
        this.ruleForm.strartAddress = `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim()
        this.ruleForm.startProvince = this.getValue(d.province)
        this.ruleForm.startCity = this.getValue(d.city)
        this.ruleForm.startArea = this.getValue(d.area)
      }
    },
    regionChangeEnd(d) {
      if (!d.province && !d.city && !d.area && !d.town) {
        this.ruleForm.endAddress = ''
      } else {
        this.ruleForm.endAddress = `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim()
        this.ruleForm.endProvince = this.getValue(d.province)
        this.ruleForm.endCity = this.getValue(d.city)
        this.ruleForm.endArea = this.getValue(d.area)
      }
    },
    ifProvice(type) {
      this.$message({
        type: 'info',
        message: '至少选择到市级范围'
      })
      if (type == 'usualPlace') {
        return this.ruleForm.usualPlace = ''
      } else if (type == 'strartAddress') {
        return this.ruleForm.strartAddress = ''
      } else {
        return this.ruleForm.endAddress = ''
      }
    },
    initModify() {
      ReqApi.getCarInfo(this.id).then(res => {
        const data = res.data
        for (const i in this.ruleForm) {
          this.ruleForm[i] = data[i]
        }
        var labels = data.carTag.split('|')
        this.labelArr = this.labelArr.map(el => {
          if (labels.indexOf(el.code) !== -1) {
            el.ischeck = true
          }
          return el
        })
        this.isModify = true
        this.title = '修改'
      })
    },
    initNew() {
      this.ruleForm.belongDriver = this.otherinfo.contactsName
      this.ruleForm.driverId = this.otherinfo.id
    },
    initLabel() {
      return getSelectType('AF042').then(data => {
        this.labelArr = data.map(el => {
          const obj = el
          obj.ischeck = false
          return obj
        })
      })
    },
    selectTag(label) {
      label.ischeck = !label.ischeck
    },
    getCarVolum() {
      this.ruleForm.carVolume = this.ruleForm.carLength * this.ruleForm.carWidth * this.ruleForm.carHeight
      this.ruleForm.carVolume = this.ruleForm.carVolume ? this.ruleForm.carVolume.toFixed(2) : 0
    },
    getInfo(pos, name, info) {
      // info.name  info.pos
      switch (this.current) {
        case 'strartAddress':
          this.ruleForm.strartAddress = name
          this.ruleForm.strartAddressCoordinate = pos
          break
        case 'endAddress':
          this.ruleForm.endAddress = name
          this.ruleForm.endAddressCoordinate = pos
          break
        case 'usualPlace':
          this.ruleForm.usualPlace = name
          this.ruleForm.usualPlaceCoordinate = pos
          break
      }
    },
    showMap(name) {
      this.popVisible = true
      this.current = name
    },
    resetForm() {
      this.ruleForm = this.$options.data().ruleForm
    },
    // 检测必填项
    checkValue(data) {
      if (!data.carNumber) {
        this.$message.error('请填写车牌号。')
        return false
      }
      if (!data.carType) {
        this.$message.error('请选择车辆类型。')
        return false
      }
      if (!data.carLength) {
        this.$message.error('请填写车辆长度。')
        return false
      }
      if (!data.carWidth) {
        this.$message.error('请填写车辆宽度。')
        return false
      }
      if (!data.carHeight) {
        this.$message.error('请填写车辆高度。')
        return false
      }
      if (!data.carLoad) {
        this.$message.error('请填写车辆载重。')
        return false
      }
      if (!data.usualPlace) {
        this.$message.error('请填写车辆常驻地。')
        return false
      }
      // if (!data.carSourceType) {
      //   this.$message.error('请选择车源类型。')
      //   return false
      // }
      // if (!data.strartAddress) {
      //   this.$message.error('请填写车辆出发地。')
      //   return false
      // }
      // if (!data.endAddress) {
      //   this.$message.error('请填写车辆到达地。')
      //   return false
      // }
      if (!data.carFile) {
        this.$message.error('请上传车辆45°照片。')
        return false
      }
      return true
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = Object.assign({}, this.ruleForm)
          if (this.checkValue(data) === false) {
            return false
          }
          this.loading = true
          data.title = data.strartAddress + '->' + data.endAddress
          data.carTag = this.labelArr.filter(el => el.ischeck).map(el => el.code).join('|')
          data.carTagName = this.labelArr.filter(el => el.ischeck).map(el => el.name).join('|')
          let promiseObj
          // const h = this.$createElement;
          // this.$msgbox({
          //   title: '提示',
          //   message: h('div', { style:"text-align:center" }, [
          //     h('span',  { style:"fontSize:15px" }, '提交成功 '),
          //     h('p', { style: 'color: #ccc' }, '您可以前往车源列表开启或发布车源信息，'),
          //     h('p', { style: 'color: #ccc' }, '让货主看到主动找上门啦')
          //   ]),
          //   confirmButtonText: '立即前往',
          //   beforeClose: (action, instance, done) => {
          //     if (action === 'confirm') {
          //       this.eventBus.$emit('replaceCurrentView', '/carinfo/create')
          //       done();
          //     } else {
          //       done();
          //     }
          //   }
          // }).then(action => {
          //   this.$message({
          //     type: 'info',
          //     message: 'action: ' + action
          //   });
          // });
          // 判断操作，调用对应的函数
          if (this.isModify) {
            data.id = this.id
            // promiseObj = ReqApi.putChangeCarInfo(data)
          } else {
            promiseObj = ReqApi.postCarInfo(data)
          }

          promiseObj.then(res => {
            // console.log(res,'resresresresresres');
            this.loading = false
            const h = this.$createElement;
            this.$msgbox({
              title: '提示',
              message: h('div', { style:"text-align:center" }, [
                h('span',  { style:"fontSize:15px" }, '提交成功 '),
                h('p', { style: 'color: #ccc' }, '您可以前往车源列表开启或发布车源信息，'),
                h('p', { style: 'color: #ccc' }, '让货主看到主动找上门啦')
              ]),
              confirmButtonText: '立即前往',
              beforeClose: (action, instance, done) => {
                if (action === 'confirm') {
                  this.eventBus.$emit('replaceCurrentView', '/carinfo/manage')
                  done();
                } else {
                  done();
                }
              }
            })
            //   .then(action => {
            //   this.$message({
            //     type: 'info',
            //     message: 'action: ' + action
            //   });
            // });'

            // this.$alert('操作成功', '提示', {
            //   confirmButtonText: '确定',
            //   callback: action => {
            //     this.$emit('success')
            //     this.eventBus.$emit('replaceCurrentView', '/carinfo/manage')
            //   }
            // })
          }).catch(err => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss">
.lll-carinfo{

  height: 100%;
  .car-base-info{
    .el-form-item{
      float: left;
      width: 50%;
      &.floatleft{
        clear: left;
      }
    }
    .el-form-item__content{
      .caller-container,.v-region{
        width: 100%;
      }
      .v-dropdown-container{
        top: 42px !important;
        left: 0 !important;
      }
    }
    .el-input{
      width: 100%;

    }
  }
  .carvinfo{
    .el-form-item__label{
      width: 78px !important;
    }
    .el-input,.nativeinput{
      width: 80px;
      margin: 0 5px;
    }
  }

  .car-baseinfo-wrapper{
    margin: 20px 0;
    background: #fff;
    padding: 18px 20px;
  }
  .car-base-info{
    padding: 30px 50px 0;
  }
  .car-picinfo{
    padding: 20px;
    background: #fff;
  }
  .carinfo-remark{
    padding: 0 50px;
    .el-textarea{
      display: block;
      width: 80%;
    }
  }
  .carinfo-expect{
    .el-input, .nativeinput{
      width: 40%;
    }
  }
  .car-submit{
    margin: 40px auto 100px;
    text-align: center;
  }
  .create-carinfo-btn{

  }
  .label-content{
    span{
      float: left;
      min-width: 120px;
      max-width: 200px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      margin-right: 10px;
      margin-bottom: 10px;
      background: #498fe1;
      color: #fff;
      border-radius: 2px;
      opacity: 0.5;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      cursor: pointer;
      font-size: 12px;

      &:nth-child(10n + 1){
        margin-left: 0;
      }

      &.active{
        opacity: 1;
        background: #498fe1;
        color: #fff;
      }
    }
  }
}
</style>
