<template>
  <div class="create-orderinfo page-main">
    <div class="tab-info-title">
      <h2><span>管理车源信息</span></h2>
    </div>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <!-- 线路信息 -->
      <div class="order-base-info clearfix">
        <div class="tab-info-stitle"><strong>线路信息</strong><span class="important">提示：带*为必填项</span></div>
        <el-form-item required  label="出发地：">
          <el-input v-model="ruleForm.carNum"></el-input>
        </el-form-item>
        <el-form-item required label="街道/门牌号：">
          <el-input v-model="ruleForm.carNum"></el-input>
          <!-- <selectType v-model="ruleForm.carType" type="AF018" clearable size="mini"></selectType> -->
        </el-form-item>
        <el-form-item  required label="到达地：">
          <el-input v-numberOnly v-model="ruleForm.carLength"></el-input>
        </el-form-item>
        <el-form-item required label="街道/门牌号：">
          <el-input v-model="ruleForm.carLoad"></el-input>
        </el-form-item>
      </div>
      <!-- 货物信息 -->
      <div class="cargo-info">
        <div class="tab-info-stitle"><strong>货物信息</strong></div> 
        <ul>
           <li :key="index" v-for="(item, index) in cargoList">
             <el-form-item required label="货物名称：">
                <el-input v-model="ruleForm.carVolume"></el-input>（立方米）
              </el-form-item>
              <el-form-item required label="总件数：">
                <el-input v-model="ruleForm.carVolume"></el-input>件
              </el-form-item>
              <el-form-item required label="预估重量：">
                <el-input v-model="ruleForm.carVolume"></el-input>公斤
              </el-form-item>
              <el-form-item required label="预估体积：">
                <el-input v-model="ruleForm.carVolume"></el-input>立方
              </el-form-item>
              <el-form-item  class="cargo-button">
                <el-button type="primary" v-if="index === (cargoList.length-1)" @click="submitForm('ruleForm')">重置</el-button>
                <el-button type="primary" v-if="index === (cargoList.length-1) && cargoList.length < 6" @click="submitForm('ruleForm')">+</el-button>
              </el-form-item>
           </li>
        </ul>
      </div>
      <!-- 选择物流公司 -->
      <div class="select-line">
        <div class="tab-info-stitle"><strong>选择物流公司：</strong>（选择出发地跟到达地之后，为您精准匹配物流承运商）<span class="important">选择承运商，直接下单；不选择承运商，发布货源</span></div>
        
      </div>
      <!-- 货源类型 -->
      <div class="cargo-class">
        <el-form-item label="货源类型">
          <el-radio-group v-model="ruleForm.isLongCar">
            <el-radio label="1">单次急发货源</el-radio>
            <el-radio label="0">长期稳定货源</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
      <!-- 联系方式 -->
      <div class="select-contact">
          <h3>联系方式</h3>
          <ul class="concat-list">
            <li>
              <el-form-item required label="发货人：">
                <el-input v-model="ruleForm.expectPrice"></el-input>
              </el-form-item>
              <el-form-item required label="发货人手机">
                <el-input v-model="ruleForm.expectPrice"></el-input>
              </el-form-item>
              <el-form-item >
                <el-button type="primary" @click="submitForm('ruleForm')">选择常用发货人</el-button>
                <el-checkbox v-model="checked">保存到常用发货人</el-checkbox>
              </el-form-item>
            </li>
            <li>
              <el-form-item label="收货人：">
                <el-input v-model="ruleForm.expectPrice"></el-input>
              </el-form-item>
              <el-form-item label="收货人手机">
                <el-input v-model="ruleForm.expectPrice"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">选择常用收货人</el-button>
                <el-checkbox v-model="checked">保存到常用收货人</el-checkbox>
              </el-form-item>
            </li>
          </ul>
        </div>


      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即发布</el-button>
        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
      </el-form-item>
  
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
    this.ruleForm.belongDriver = this.otherinfo.contactsName
    this.ruleForm.driverId = this.otherinfo.id
    this.initLabel()
  },
  data() {
    return {
      cargoList: [{}],
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
        'viaAddress': '', // 途径地
        'viaAddressCoordinate': '' // 途径地坐标
        // 'viaAddressName': 'string'// 途径地地址名称
      }
    }
  },
  methods: {
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
        case 'viaAddress':
          this.ruleForm.viaAddress = name
          this.ruleForm.viaAddressCoordinate = pos
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
            // promiseObj = putCarrier(data)
          } else {
            promiseObj = ReqApi.postCarInfo(data)
          }

          promiseObj.then(res => {
            this.loading = false
            this.$alert('操作成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.$emit('success')
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
.create-orderinfo{
  padding: 10px;
  height: 100%;
  .order-base-info{
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
      background: #fff;
      border: 1px solid #ccc;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      cursor: pointer;
      font-size: 12px;

      &:nth-child(10n + 1){
        margin-left: 0;
      }

      &.active{
        background: #00c1de;
        color: #fff;
      }
    }
  }
}
</style>
