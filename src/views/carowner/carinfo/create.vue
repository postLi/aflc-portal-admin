<template>
  <div class="create-carinfo page-main">
    <div class="tab-info-title">
      <h2><span>{{title}}车辆信息</span></h2>
    </div>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <div class="car-baseinfo-wrapper">
      <div class="tab-info-stitle"><strong>基本信息：</strong>(打<span class="important">*</span>为必填项)</div>
      <div class="car-base-info clearfix">
      <el-form-item required  label="车牌号">
        <el-input maxlength="15" v-model="ruleForm.carNum"></el-input>
      </el-form-item>
      <el-form-item required label="车辆类型">
        <selectType v-model="ruleForm.carType" type="AF018" clearable size="mini"></selectType>
      </el-form-item>
      <el-form-item class="carvinfo" required label="车长">
        长 <el-input maxlength="5" v-numberOnly:point1 v-model="ruleForm.carLength"></el-input>
        宽 <el-input maxlength="5" v-numberOnly:point1 v-model="ruleForm.carWidth"></el-input>
        高 <el-input maxlength="5" v-numberOnly:point1 v-model="ruleForm.carHeight"></el-input>（米）
      </el-form-item>

      <el-form-item required label="车辆载重">
        <el-input v-model="ruleForm.carLoad"></el-input>（吨）
      </el-form-item>
      <el-form-item required label="车辆体积">
        <el-input disabled v-model="ruleForm.carVolume"></el-input>（立方米）
      </el-form-item>
      <el-form-item label="车辆规格">
        <selectType v-model="ruleForm.carSpec" type="AF009" clearable size="mini"></selectType>
      </el-form-item>
      <el-form-item required label="车辆常驻地">
        <el-input  @focus="()=>{showMap('usualPlace')}" v-model="ruleForm.usualPlace" ></el-input>
      </el-form-item>
      <el-form-item label="车源类型">
        <el-radio-group v-model="ruleForm.carSourceType">
          <el-radio label="AF01801">回程车</el-radio>
          <el-radio label="AF01802">本地车</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item required label="出发地">
        <el-input @focus="()=>{showMap('strartAddress')}" v-model="ruleForm.strartAddress"></el-input>
      </el-form-item>
      <el-form-item required label="到达地">
        <el-input @focus="()=>{showMap('endAddress')}" v-model="ruleForm.endAddress"></el-input>
      </el-form-item>
      <el-form-item label="途径点">
        <el-input v-model="ruleForm.viaAddress"></el-input>
      </el-form-item>
      <el-form-item label="发车时间">
        <el-date-picker
            v-model="ruleForm.startTime"
            type="date"
            placeholder="选择日期"
            value-format="timestamp"
            >
          </el-date-picker>
      </el-form-item>
      
      <el-form-item class="carinfo-expect" label="期望运价">
        <el-input v-model="ruleForm.expectPrice"></el-input>元/车  （运价不填自动为面议）
      </el-form-item>
      <el-form-item label="即时/长期">
        <el-radio-group v-model="ruleForm.isLongCar">
          <el-radio label="1">即时车源</el-radio>
          <el-radio label="0">长期车源</el-radio>
        </el-radio-group>
      </el-form-item>
      </div>

      <div class="carinfo-remark">
      <el-form-item label="备注">
        <div class="label-content clearfix">
          <span :key="index" v-for="(label, index) in labelArr" @click="selectTag(label)" :class="{'active': label.ischeck}">{{label.name}}</span>
        </div>
        <el-input
          type="textarea"
          :rows="2"
          maxlength="30"
          placeholder="请输入备注"
          v-model="ruleForm.remark">
        </el-input>
        请填写备注（{{ruleForm.remark.length}}-30字）。<span class="important-info">提供“原创”说明有利于提升线路效果</span>
      </el-form-item>
      </div>
</div>

<div class="car-picinfo">
      <div class="tab-info-stitle"><strong>车主认证照片：</strong><span class="important">（上传的图片不超过5M，并且为JPG/PNG/JPEG中的一种格式）</span></div>
      <el-form-item required  >
        <span class="info-require">上传车辆45°照片</span>
        <upload :limit="5" listtype="picture-card" :title="'身份证'" :showFileList="true" v-model="ruleForm.carFile" />
      </el-form-item>
</div>
        <el-button class="create-carinfo-btn" type="primary" @click="submitForm('ruleForm')">立即发布</el-button>
        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
  
    </el-form>
    <tmsmap @success="getInfo" pos="" name="" :popVisible.sync="popVisible" />
  </div>
</template>
<script>
import selectType from '@/components/selectType/index'
import upload from '@/components/Upload/singleImage2'
import tmsmap from '@/components/map/index'
import { getSelectType } from '@/api/common'
import * as ReqApi from '@/api/carowner/index'

export default {
  components: {
    selectType,
    upload,
    tmsmap
  },
  mounted() {
    this.id = this.$route.query.id

    this.initLabel().then(() => {
      if (this.id) {
        this.initModify()
      } else {
        this.initNew()
      }
    })
  },
  data() {
    return {
      id: '',
      title: '发布',
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
        'carHeight': 0, // 车高
        'carLength': 0, // 车长
        'carLoad': 0, // 车载重
        'carNum': '', // 车牌号
        'carSourceType': '', // 车源类型  "AF01801","回程车" "AF01802","本地车"
        'carSpec': '', // 车辆规格
        'carTag': '', // 车辆标签属性（用|分割）
        'carTagName': '', // 车辆标签属性（用|分割）
        'carType': '', // 车类型
        'carVolume': 0, // 车辆体积
        'carWidth': 0, // 车宽
        // 'createTime': '', // 创建时间
        // 'creater': '', // 创建人
        'driverId': '', // 车主id
        'endAddress': '', // 目的地
        'endAddressCoordinate': '', // 目的地坐标
        // 'endAddressName': 'string', // 目的地地址名称
        // 'endTime': '2018-07-25T02:05:50.884Z', // 发车结束时间
        'expectPrice': 0, // 期望运价
        // 'id': 'string', // 车源id 修改时要查
        // 'isCommonRoute': 'string', // 是否常用路线
        // 'isEnable': 'string', // 是否启用
        'isLongCar': '', // 即时/长期车源(0:长期车源，1：短期车源)
        // 'phone': 'string', // 车主电话
        'remark': '', // 备注
        'startTime': '', // 发车时间
        'strartAddress': '', // 出发地
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
    initModify() {
      ReqApi.getCarInfo(this.id).then(res => {
        const data = res.data
        for (const i in this.ruleForm) {
          this.ruleForm[i] = data[i]
        }
        var labels = data.carTag.split('|')
        console.log(labels, this.labelArr)
        this.labelArr = this.labelArr.map(el => {
          if (labels.indexOf(el.code) !== -1) {
            el.ischeck = true
          }
          return el
        })
        this.isModify = true
        this.title = '修改'
      }).catch(() => {
        // 如果拿不到信息
        this.$message.error('查找不到相关信息~')
        this.initNew()
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          const data = Object.assign({}, this.ruleForm)
          data.title = data.strartAddress + '->' + data.endAddress
          data.carTag = this.labelArr.filter(el => el.ischeck).map(el => el.code).join('|')
          data.carTagName = this.labelArr.filter(el => el.ischeck).map(el => el.name).join('|')
          let promiseObj
          // 判断操作，调用对应的函数
          if (this.isModify) {
            data.id = this.id
            promiseObj = ReqApi.putChangeCarInfo(data)
          } else {
            promiseObj = ReqApi.postCarInfo(data)
          }

          promiseObj.then(res => {
            this.loading = false
            this.$alert('操作成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.$emit('success')
                this.eventBus.$emit('replaceCurrentView', '/carowner/carinfo/manage')
              }
            })
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
.create-carinfo{
  padding:20px;
  height: 100%;
  .car-base-info{
    .el-form-item{
      float: left;
      width: 50%;
    }
    .el-input{
      width: 80%;
    }
  }
  .carvinfo{
    .el-input{
      width: 50px;
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
    .el-input{
      width: 40%;
    }
  }
  .create-carinfo-btn{
    margin: 40px auto 100px;
    display: block;
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
