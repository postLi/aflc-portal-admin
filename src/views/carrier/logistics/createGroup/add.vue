<template>
  <div  class="wzlReg" v-if="isMatreg">
    <el-dialog
      :title='popTitle'
      :visible.sync="isShow"
      width="30%"
      center
      @close="closeMe"
      :close-on-click-modal="false" 
      :before-close="closeMe">
      <el-form :model="formAllData" :rules="rules"  ref="ruleForm" :inline="true"  label-position="right" label-width="100px" class="demo-ruleForm">
        <el-form-item label="" prop="belongCityName">
                    
          <vregion :ui="true" @values="regionChange" class="form-control" >
              <el-input v-model="formAllData.belongCityName" placeholder="请选择园区所在地"></el-input>
          </vregion>
            <!-- <el-input @focus="()=>{showMap(formAllData.belongCityName)}" v-model="formAllData.belongCityName" :disabled="ifDisable === false"></el-input> -->
        </el-form-item>
        <el-form-item label="" prop="recommendFee">
          <el-input v-model.trim="formAllData.parkName" :maxlength="20" placeholder="请输入园区名称" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item class="staff_searchinfo--btn">
          <el-button size="mini" icon="el-icon-search" type="primary" @click="handleSearch('searchForm')">搜索</el-button>
          <el-button size="mini" icon="el-icon-close" type="info" @click="handleSearch('clearForm')" plain>重置</el-button>
        </el-form-item>
        <div class="classify_info">
          <ul class="addlist">
            <!-- :class="{active: active == item}" -->
            <li v-for="(item, index) in dataset" :key="index" @click="selectList(item)">
              <h4>{{item.parkName}}</h4>
              <span>{{item.locationProvince + item.locationCity + item.locationArea + item.parkAddress}}</span>
            </li>
           
          </ul>
          
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        <el-button @click="closeMe">取 消</el-button> -->
        <div class="info_tab_footer">共计:{{ dataTotal }}
        <div class="show_pager">
          <Pager :total="dataTotal" @change="handlePageChange" :sizes="sizes"/>
        </div>
      </div>  
      </div>
      
    </el-dialog>
    
  </div>
  
</template>
<script>
// import { parseTime, pickerOptions2 } from '@/utils/index.js'
// import Pager from '@/components/Pagination/index'
// import Upload from '@/components/Upload/multImage'
// import { postAmend } from '@/api/web/recommend.js'
// import { objectMerge2 } from '@/utils/index'
import { postList } from '@/api/carrier/garden'
import Pager from '@/components/Pagination/index'
import vregion from '@/components/vregion/Region.vue'
export default {
  computed: {
    isShow: {
      get() {
        return this.centerDialogVisible
      },
      set() {}
    }
  },
  components: {
    Pager,
    vregion
    // Upload
  },
  props: {
    centerDialogVisible: {
      type: Boolean,
      default: false
    },
    isMatreg: {
      type: Boolean,
      default: false
    },
    isComreg: {
      type: Boolean,
      default: false
    },
    selectInfo: {
      type: [Array, Object],
      default: () => {
      }
    },
    belongCity: {
      type: [Number, String]
    }
  },
  data() {
    return {
      popTitle: '',
      btnsize: 'mini',
      sizes: [20, 50, 100],
      dataset: [],
      dataTotal: 0,
      pagesize: 20, // 初始化加载数量
      page: 1, // 初始化页码
      totalCount: null,
      value: '',

      // pickerOptions2: {
      //   shortcuts: pickerOptions2
      // },
      checked: false,
      optionsclaimType: [],
      optionsComplainatusType: [],
      searchCreatTime: [],
      // defaultTime: [parseTime(+new Date() - 60 * 24 * 60 * 60 * 1000, '{y}-{m}-{d}'), parseTime(new Date(), '{y}-{m}-{d}')],
      value3: true,
      value4: true,
      options: [{
        value: '首页',
        label: '首页'
      }, {
        value: '物流专线栏目',
        label: '物流专线栏目'
      }, {
        value: '专线详情页',
        label: '专线详情页'
      }],
      options1: [{
        value: '找物流专线',
        label: '找物流专线'
      }, {
        value: '物流专线列表',
        label: '物流专线列表'
      }, {
        value: '右侧专线列表',
        label: '右侧专线列表'
      }, {
        value: '此路线其他专线',
        label: '此路线其他专线'
      }],
      form: {

      },
      rules: {
        recommendColumn: [
          { required: true, message: '请选择推荐栏目' }
        ],
        // recommendPosition: [
        //    { required: true, message: '请选择推荐位置' }
        // ],
        claimPic1: [
          { required: true, message: '至少上传一张图片' }
        ]
      },
      formAllData: {
        belongCityName:'',
        parkName: '',
        locationProvince: '',
        locationCity: '',
        locationArea: '',
        // parkName: '',
        // openStatus: '',
        // parkMobile: '',
        // disableStatus: ''
      }
    }
  },
  watch: {

    isMatreg: {
      handler(n) {
        if (this.$refs['ruleForm']) {
          this.$refs['ruleForm'].resetFields()
        }
        if (this.isMatreg) {
          this.popTitle = '选择所在园区'
          this.fetchInfo()
          console.log(this.info, 'info')
          // this.searchCreatTime = this.defaultTime
        }
      }
    }
    // selectInfo: {
    //   handler(n) {
    //     if (this.$refs['ruleForm']) {
    //       this.$refs['ruleForm'].resetFields()
    //     }
    //     if (this.isMatreg) {
    //       this.popTitle = '推荐设置'
    //       this.getSelectInfo(this.selectInfo)
    //       console.log(this.info, 'info')
    //       this.searchCreatTime = this.defaultTime
    //     }
    //   }
    // }
  },
  mounted() {
    //  this.fetchInfo()
  },
  methods: {
    regionChange(d) {
      console.log('data:', d)
      // this.formAllData.address = ''
      this.formAllData.belongCityName = (!d.province && !d.city && !d.area && !d.town) ? '' : `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim()
      this.formAllData.locationProvince = d.province ? d.province.name : ''
      this.formAllData.locationCity = d.city ? d.city.name : ''
      this.formAllData.locationArea = d.area ? d.area.name : ''
            console.log(d.province.name)
    },
    getValue(obj) {
      return obj ? obj.value : ''
    },
    selectList(item) {
      this.$emit('success', item)
      this.$emit('close')
    },
    reset() {
      this.$refs['ruleForm'].resetFields()
    },
    closeMe(done) {
      this.$emit('close')
      this.reset()
      if (typeof done === 'function') {
        done()
      }
    },
    handleSearch(type) {
      switch (type) {
        case 'searchForm':
          this.fetchInfo()
          break
        case 'clearForm':
          this.formAllData = {
            // locationProvince: '',
            // locationCity: '',
            // locationArea: '',
            parkName: ''
            // openStatus: '',
            // parkMobile: '',
            // disableStatus: ''
          }
          console.log(6666)
          // this.$refs.area.clearData()
          this.fetchInfo()
          break
        case 'add':
          this.isVisibleDialog = true
          this.isModify = false
          this.selectedInfo = {}
          break
      }
    },
    fetchInfo() {
      return postList(this.page, this.pagesize, this.formAllData).then(res => {
        console.log('res', res)
        this.dataset = res.list
        this.dataTotal = res.total
      }).catch(err => {
        this.$message.warning(err.text || err.errorInfo || '无法获取服务端数据~')
      })
    },
    handlePageChange(obj) {
      this.page = obj.pageNum
      this.pagesize = obj.pageSize
        // this.firstblood()
    },
    // changeColumn(obj) {
    //   this.formAllData.recommendColumn = obj
    //   console.log('sdfsdfs', obj)
    // },
    // changePosition(obj) {
    //   this.formAllData.recommendPosition = obj
    // },
    // getSelectInfo(selectInfo) {
    //   console.log(selectInfo)
    //   this.formAllData.recommendColumn = selectInfo.recommendColumn
    //   this.formAllData.recommendPosition = selectInfo.recommendPosition
    //   this.formAllData.recommendStarttime = selectInfo.recommendStarttime
    //   if (selectInfo.settopStatus === 1) {
    //     this.formAllData.settopStatus = true
    //   } else {
    //     this.formAllData.settopStatus = false
    //   }
    //   this.formAllData.recommendFee = selectInfo.recommendFee
    //   this.formAllData.remarks = selectInfo.remarks
    // },
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          // if (this.formAllData.settopStatus === true) {
          //   this.formAllData.settopStatus = 1
          // } else {
          //   this.formAllData.settopStatus = 0
          // }
          // this.formAllData.recommendStarttime = Date.parse(this.searchCreatTime[0] + ' 00:00:00')
          // this.formAllData.recommendEndtime = Date.parse(this.searchCreatTime[1] + ' 23:59:59')
          // this.formAllData.associatedId = this.selectInfo.id
          // const data1 = objectMerge2({}, this.formAllData)
          // let promiseObj
          if (this.isMatreg) {
            // promiseObj = postAmend(this.selectInfo.id, data1)
          } else {
            // promiseObj = postReportComplain(data2)
          }
          promiseObj.then(res => {
            this.$message({
              message: '修改成功~',
              type: 'success'
            })
            this.closeMe()
            this.$emit('success')
          }).catch(err => {
            this.$message({
              type: 'error',
              message: err.errorInfo || err.text || '未知错误，请重试~'
            })
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
.wzlReg{
  .classify_info{
    padding-bottom:0 !important;
  }
  .el-message-box .showPictureWrapper .el-message-box--center{
          overflow: hidden !important;
        }
  .el-dialog{
    max-width: 100%;
    min-width: 35%;
    margin-top: 18vh !important;
    .el-dialog__header{
      background:#0b4b7c;
      text-align: center;
      height: 40px;
      line-height: 40px;
      // padding-left: 20px;
      padding:0 20px;
      .el-dialog__headerbtn {
        position: absolute;
        top: 13px;
        right: 20px;
        padding: 0;
        background: 0 0;
        border: none;
        outline: 0;
        cursor: pointer;
        font-size: 16px;
      }
      .el-dialog__headerbtn :hover{
        color:#fff !important;
        transform:scale(1.5)
      }
      span{
        color:#fff;
      }
    }
    .el-dialog__footer{
      // padding-bottom: 6%;
      padding: 0px !important;
      text-align: left;
      .el-button{
        padding: 8px 35px;
      }
    }
    .el-input__inner{
      height:35px;
      line-height: 35px;
    }
    .picklist{
      width: 217px;
    }
    .goodsclaimDes{
      width:100%;
      .el-form-item__content{
        width:80%;
        
      }
    }
    .el-textarea__inner{
      height:100px;
    }
    .el-range-editor.el-input__inner{
      width: 217px;
    }
    .uploadcard{
      width:500px;
    }
    .el-upload-list--picture .el-upload-list__item{
      width:48%;
      float:left;
      margin-right:2%;
    }
  }
  .addlist{
  
    li{
      // padding-left:20px;
    }
    // .active{
    //   background:#eeeff1;
    // }
    h4,span{
      height: 30px;
      line-height: 30px;
    }
  }
  // .addlist:hover li{
  //   background:#eeeff1;
  // }
  .info_tab_footer {
      padding-left: 20px;
      background: #eee;
      height: 40px;
      line-height: 40px;
      box-shadow: 0 -2px 2px rgba(0, 0, 0, 0.1);
      position: relative;
      z-index: 10;
      bottom: 0;
      left: 0;
      width: 100%;
  }
  .show_pager {
    float: right;
    line-height: 40px;
    height: 40px;
    overflow: hidden;
  }
  .v-region{
    position: relative;
  }
  .form-control{
    position:absolute;
    top:38px;
    left:0px;
  }
}
</style>

