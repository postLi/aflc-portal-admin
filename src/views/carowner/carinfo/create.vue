<template>
  <div class="create-carinfo page-main">
    <div class="tab-info-title">
      <h2><span>管理车源信息</span></h2>
    </div>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <h3>基本信息</h3>
      <div class="car-base-info clearfix">
      <el-form-item required  label="车牌号" prop="name">
        <el-input v-model="ruleForm.carNum"></el-input>
      </el-form-item>
      <el-form-item required label="车辆类型" prop="name">
        <selectType v-model="ruleForm.carType" type="AF018" clearable size="mini"></selectType>
      </el-form-item>
      <el-form-item class="carvinfo" required label="车长" prop="name">
        长 <el-input v-model="ruleForm.carLength"></el-input>
        宽 <el-input v-model="ruleForm.carWidth"></el-input>
        高 <el-input v-model="ruleForm.carHeight"></el-input>（米）
      </el-form-item>

      <el-form-item required label="车辆载重" prop="name">
        <el-input v-model="ruleForm.carLoad"></el-input>（吨）
      </el-form-item>
      <el-form-item required label="车辆体积" prop="name">
        <el-input v-model="ruleForm.carVolume"></el-input>（立方米）
      </el-form-item>
      <el-form-item label="车辆规格" prop="name">
        <selectType v-model="ruleForm.carSpec" type="AF009" clearable size="mini"></selectType>
      </el-form-item>
      <el-form-item required label="车辆常驻地" prop="name">
        <el-input v-model="ruleForm.usualPlace"></el-input>
      </el-form-item>
      <el-form-item label="车源类型" prop="name">
        <el-radio-group v-model="ruleForm.carSourceType">
          <el-radio label="AF01801">回程车</el-radio>
          <el-radio label="AF01802">本地车</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item required label="出发地" prop="name">
        <el-input v-model="ruleForm.strartAddress"></el-input>
      </el-form-item>
      <el-form-item required label="到达地" prop="name">
        <el-input v-model="ruleForm.endAddress"></el-input>
      </el-form-item>
      <el-form-item label="途径点" prop="name">
        <el-input v-model="ruleForm.viaAddress"></el-input>
      </el-form-item>
      <el-form-item label="发车时间" prop="name">
        <el-date-picker
            v-model="ruleForm.startTime"
            type="date"
            placeholder="选择日期"
            value-format="timestamp"
            >
          </el-date-picker>
      </el-form-item>
      
      <el-form-item label="期望运价" prop="name">
        <el-input v-model="ruleForm.expectPrice"></el-input>元/车<br>（运价不填自动为面议）
      </el-form-item>

      </div>

      <el-form-item label="即时/长期" prop="name">
        <el-radio-group v-model="ruleForm.isLongCar">
          <el-radio label="1">即时车源</el-radio>
          <el-radio label="0">长期车源</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注" prop="name">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="ruleForm.remark">
        </el-input>
        请填写备注（0-30字）。<span class="important-info">提供“原创”说明有利于提升线路效果</span>
      </el-form-item>


      <h3>车辆照片上传</h3>
      <el-form-item label="联系电话" prop="name">
        <span class="require">上传车辆45°招聘</span>
        <upload :limit="5" listtype="picture-card" :title="'身份证'" :showFileList="true" v-model="ruleForm.carFile" />
        
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即发布</el-button>
        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
      </el-form-item>
  
    </el-form>
    <tmsmap :popVisible.sync="popVisible" />
  </div>
</template>
<script>
import selectType from '@/components/selectType/index'
import upload from '@/components/Upload/singleImage2'
import tmsmap from '@/components/map/index'

export default {
  components: {
    selectType,
    upload,
    tmsmap
  },
  mounted() {
    this.ruleForm.belongDriver = this.otherinfo.contactsName
    this.ruleForm.driverId = this.otherinfo.id
  },
  data() {
    return {
      ifDisable: false,
      popVisible: true,
      rules: {},
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
  }
}
</script>
<style lang="scss">
.create-carinfo{
  padding: 10px;
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
}
</style>
