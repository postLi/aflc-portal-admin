<template>
  <div class="create-orderinfo page-main">
    <div class="tab-info-title">
      <h2><span>创建订单</span></h2>
    </div>

    <el-form :model="ruleForm" :rules="rules" size="mini" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <!-- 线路信息 -->
      <div class="order-base-info tab-info-panel clearfix">
        <div class="tab-info-stitle"><strong>线路信息</strong><span class="important">提示：带*为必填项</span></div>
        <el-form-item required  label="出发地：">
          <el-input v-model="aflcOrderAddressWebDtoList[0].provinceCityArea"></el-input>
        </el-form-item>
        <el-form-item required label="街道/门牌号：">
          <el-input v-model="aflcOrderAddressWebDtoList[0].viaAddress"></el-input>
          <!-- <selectType v-model="ruleForm.carType" type="AF018" clearable size="mini"></selectType> -->
        </el-form-item>
        <el-form-item  required label="到达地：">
          <el-input  v-model="aflcOrderAddressWebDtoList[1].provinceCityArea"></el-input>
        </el-form-item>
        <el-form-item required label="街道/门牌号：">
          <el-input v-model="aflcOrderAddressWebDtoList[1].viaAddress"></el-input>
        </el-form-item>
      </div>
      <!-- 货物信息 -->
      <div class="cargo-info tab-info-panel">
        <div class="tab-info-stitle"><strong>货物信息</strong></div> 
        <ul class="clearfix">
           <li :key="index" v-for="(item, index) in cargoList">
             <el-form-item required label="货物名称：">
               <el-popover
                  placement="bottom"
                  width="400"
                  trigger="focus"
                  >
                  <ul class="preCaogoList clearfix">
                    <li @click="setCargoName(index, item.name)" :key="inx" v-for="(item, inx) in cargoListPre">{{ item.name }}</li>
                  </ul>
                  <el-input slot="reference" v-model="item.goodsName"></el-input>
                </el-popover>
                
              </el-form-item>
              <el-form-item label="总件数：">
                <el-input v-model="item.goodsNum"><template slot="append">件</template></el-input>
              </el-form-item>
              <el-form-item required label="预估重量：">
                <el-input @blur="calcTotalFee" v-model="item.goodsWeight"><template slot="append">公斤</template></el-input>
              </el-form-item>
              <el-form-item required label="预估体积：">
                <el-input @blur="calcTotalFee" v-model="item.goodsVolume"><template slot="append">立方米</template></el-input>
              </el-form-item>
              <el-form-item  class="cargo-button">
                <el-button size="mini" type="primary" v-if="index === (cargoList.length-1)" @click="resetCargo">重置</el-button>
                <el-button size="mini" type="primary" v-if="index === (cargoList.length-1) && cargoList.length < maxCargoLength" @click="addCargo(index)">+</el-button>
                <el-button size="mini" type="danger" v-if="index > 0 " @click="removeCargo(index)">-</el-button>
              </el-form-item>
           </li>
        </ul>
        
      </div>
      <!-- 选择物流公司 -->
      <div class="select-line tab-info-panel">
        <div class="tab-info-stitle"><strong>选择物流公司：</strong>（选择出发地跟到达地之后，为您精准匹配物流承运商）<span class="important">选择承运商，直接下单；不选择承运商，发布货源</span></div>
        <div class="select-line-list">
          <el-table
            ref="multipleTable"
            :data="usersArr"
            stripe
            border
            height="100%"
            tooltip-effect="dark"
            :default-sort = "{prop: 'id', order: 'ascending'}"
            style="width: 100%">
            <el-table-column
              fixed
              sortable
              type="selection"
              width="50">
            </el-table-column>
            <el-table-column
              fixed
              label="承运商">
              <template slot-scope="scope">
                <span class="vipline" v-if="scope.row.isCommonRoute === '1'"></span>
                {{ scope.row.strartAddress + '->' + scope.row.endAddress }}
              </template>
            </el-table-column>
            <el-table-column
              prop="carNum"
              width="120"
              label="起步价">
            </el-table-column>
            <el-table-column
              prop="carTypeName"
              width="120"
              label="重货">
            </el-table-column>
            
            <el-table-column
              prop="carSourceTypeName"
              width="120"
              label="轻货">
            </el-table-column>
            <el-table-column
              label="时效"
              >
              <template slot-scope="scope">
                  <el-button size="mini" type="info" v-if="scope.row.isCommonRoute === '1'" @click="setRemote(scope.row.id, '0')">取消常跑</el-button>
                  <el-button size="mini" type="primary" v-if="scope.row.isCommonRoute === '0'" @click="setRemote(scope.row.id, '1')">设置常跑</el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="createrName"
              width="120"
              label="发车频率"
              >
            </el-table-column>
          </el-table>
        </div>
        <div class="prePrice">
          预估运费总金额：{{ruleForm.totalAmount}}元
        </div>
      </div>
      <!-- 货源类型 -->
      <div class="cargo-class tab-info-panel">
        <h3>货源类型</h3>
        <el-form-item >
          <el-radio-group v-model="ruleForm.orderClass">
            <el-radio label="0">单次急发货源</el-radio>
            <el-radio label="1">长期稳定货源</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
      <!-- 联系方式 -->
      <div class="select-contact tab-info-panel">
          <h3>联系方式</h3>
          <ul class="concat-list clearfix">
            <li>
              <el-form-item required label="发货人：">
                <el-input v-model="aflcOrderAddressWebDtoList[0].contacts"></el-input>
              </el-form-item>
              <el-form-item required label="发货人手机">
                <el-input v-model="aflcOrderAddressWebDtoList[0].contactsPhone"></el-input>
              </el-form-item>
              <el-form-item >
                <el-button type="primary" @click="showContactPop(1)">选择常用发货人</el-button>
                <el-checkbox v-model="aflcOrderAddressWebDtoList[0].isSave">保存到常用发货人</el-checkbox>
              </el-form-item>
            </li>
            <li>
              <el-form-item label="收货人：">
                <el-input v-model="aflcOrderAddressWebDtoList[1].contacts"></el-input>
              </el-form-item>
              <el-form-item label="收货人手机">
                <el-input v-model="aflcOrderAddressWebDtoList[1].contactsPhone"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="showContactPop(0)">选择常用收货人</el-button>
                <el-checkbox v-model="aflcOrderAddressWebDtoList[1].isSave">保存到常用收货人</el-checkbox>
              </el-form-item>
            </li>
          </ul>
        </div>


      <el-form-item>
        <el-button class="tab-create-btn" type="primary" @click="submitForm('ruleForm')">立即发布</el-button>
        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
      </el-form-item>

      
  
    </el-form>
    <tmsmap @success="getInfo" pos="" name="" :popVisible.sync="popVisible" />

    <!-- 查看常用收发货人 -->
    <el-dialog :title="contactTitle" :visible.sync="contactPopVisible">
        <el-input v-model="ruleForm.name" auto-complete="off">
          <el-button slot="append" >搜索</el-button>
        </el-input>
        <el-button @click="showNewContactPop">添加常用发货人</el-button>

        <ul>
          <li :key="index" v-for="(item, index) in popContactList">
            <span class="contactName">{{item.contacts}}</span>
            <span class="contactMobile">{{item.contactsPhone}}</span>
            <span class="contactAddres">{{item.address}}</span>
            <span class="contactManage" @click="showModifyContact(item)">修改</span>
          </li>
        </ul>
    </el-dialog>
    <!-- 修改/新建收发货人 -->
    <el-dialog :title="popContactTitle + contactTitle" :visible.sync="dialogFormVisible">
      <el-form :label-width="100" :model="contactform">
        <el-form-item label="姓名：" >
          <el-input v-model="contactform.contacts" auto-complete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="电话：" >
          <el-input v-model="contactform.contactsPhone" auto-complete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="地址：" >
          <el-input v-model="contactform.address" auto-complete="off">
          </el-input>
        </el-form-item>
        <el-form-item  >
          <el-check true-label="1" false-label="0" v-model="contactform.isDefault">
            设置为默认地址
          </el-check>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitContactForm">保 存</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import selectType from '@/components/selectType/index'
import upload from '@/components/Upload/singleImage2'
import tmsmap from '@/components/map/index'
import { getSelectType } from '@/api/common'
import * as ReqApi from '@/api/carrier/create'

export default {
  components: {
    selectType,
    upload,
    tmsmap
  },
  data() {
    return {
      maxCargoLength: 5,
      cargoInfo: {
        "goodsName": "", // 货物名称
        "goodsNum": 0, // 总件数
        "goodsVolume": "0", // 货物体积（方）
        "goodsWeight": "0" // 货物重量（吨）
        // "title": "string" // 标题
      },
      // 常用地址、收发货人信息
      "aflcOrderAddressWebDtoList": [
        {
          "contacts": "", // 联系人
          "contactsPhone": "", // 联系电话
          "isSave": false, // 是否保存常用收发货人
          "type": "0", // 类型（0：发货人，1：收货人）

          "provinceCityArea": "", // 省市区
          viaAddress: "", // 途径地
          "viaAddressCoordinate": "", // 途径地坐标
          //"viaAddressName": "string", // 途径名地址名称
          "viaOrder": 0 // 途径地顺序（0：出发地；1：目的地）
        },
        {
          "contacts": "", // 联系人
          "contactsPhone": "", // 联系电话
          "isSave": false, // 是否保存常用收发货人
          "type": "1", // 类型（0：发货人，1：收货人）

          "provinceCityArea": "", // 省市区
          viaAddress: "", // 途径地
          "viaAddressCoordinate": "", // 途径地坐标
          //"viaAddressName": "string", // 途径名地址名称
          "viaOrder": 1 // 途径地顺序（0：出发地；1：目的地）
        }
      ],
      cargoList: [],
      ifDisable: false,
      popVisible: false,
      cargoListPre: [],
      rules: {},
      current: '',
      ruleForm: {
        "clientIp": "", // 终端ip
        "memberType": "", // 会员类型(货主:AF00101,车主:AF00102,物流公司:AF00107)
        "shipperId": "", // 货主id 用户id
        "orderClass": "", // 货源类型(0单次急发货源1长期稳定货源)
        "title": "", // 标题
        "totalAmount": 0, // 订单总金额
        "wlId": "", // 物流公司id
        "wlName": "", // 物流公司名称
        "orderFrom": "AF0040002" // 订单来源(APP端:AF0040001;WEB端:AF0040002;微信公众号:AF0040003;小程序:AF004004)
      },
      usersArr: [],
      // 收发货人
      contactTitle:'常用发货人',
      popContactTitle: '添加',
      popContactList:[],
      contactPopVisible: false,
      dialogFormVisible: false,
      contactform:{
        "address": "string", //详细地址
        "contacts": "string", //联系人
        "contactsPhone": "string", //联系电话
        "coordinate": "string", //发货地坐标
        //"createTime": "2018-07-27T06:28:38.733Z", //创建时间
        //"creater": "string", //创建人
        //"delFlag": "string", //删除状态
        "floorHousenum": "string", //楼层及门牌号 跟地址保持一致
        //"id": "string", //编号
        "isDefault": "string", //是否默默常用联系人（0：否；1：是）
        "shipperId": "string", //货主ID userid
        //"summary": "string", //简称
        "type": "string" //类型（0：常用发货人，1：常用收货人）
        //"updateTime": "2018-07-27T06:28:38.733Z", //更新时间
        //"updater": "string", //修改人
        // "version": "string" //版本
      }

    }
  },
  mounted() {
    this.id = this.$route.query.id
    this.initCargo()
    if(this.id){
      this.initModify()
    } else {
      this.initNew()
    }
  },
  methods: {
    initNew(){
      this.cargoList = [Object.assign({},this.cargoInfo)]
      this.ruleForm.shipperId = this.otherinfo.id
      this.ruleForm.memberType = this.otherinfo.rolesIdList[0]
    },
    initModify(){

    },
    initCargo() {
      return getSelectType('AF034').then(data => {
      // return getSelectType('AF03501').then(data => {
        this.cargoListPre = data.map(el => {
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
    // 货物信息
    resetCargo(){
      this.cargoList = [{}]
    },
    removeCargo(index){
      this.cargoList.splice(index,1)
    },
    addCargo(index){
      this.cargoList.push(Object.assign({},this.cargoInfo))
    },
    setCargoName(index, name){
      this.$set(this.cargoList,index,Object.assign(this.cargoList[index], {
        goodsName: name
      }))
      // this.cargoList[index]
    },
    //计算总价
    calcTotalFee(){

    },
    // 收发货人
    showContactPop(type){
      ReqApi.getContactList({
        currentPage: 1,
        pageSize: 100,
        vo: {
          type
        }
      }).then(data => {
        this.contactPopVisible = true
        this.popContactList = data.list
      }).catch(()=>{
        this.$message.error("加载数据失败~")
      })
      
    },
    showNewContactPop(){
      this.dialogFormVisible = true
    },
    // 修改
    showModifyContact(item){
      this.dialogFormVisible = true
    },
    // 新建/修改提交
    submitContactForm(){
      this.dialogFormVisible = false
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          const data = Object.assign({}, this.ruleForm)
          data.title = data.strartAddress + '->' + data.endAddress
          data.carTag = this.cargoListPre.filter(el => el.ischeck).map(el => el.code).join('|')
          data.carTagName = this.cargoListPre.filter(el => el.ischeck).map(el => el.name).join('|')
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
.preCaogoList{
  li{
    float: left;
    width: 33%;
    text-align: center;
    cursor: pointer;
    margin-bottom: 5px;

    &:hover{
      background: #ffe;
      font-weight: bold;
    }
  }
}

.create-orderinfo{
  padding: 20px;
  height: 100%;
  .tab-info-stitle{
    margin-bottom: 20px;
  }
  
  .order-base-info{
    
    .el-form-item{
      float: left;
      width: 50%;
      margin-bottom: 20px;
    }
    .el-input{
      width: 80%;
    }
  }
  .prePrice{
    margin-top: 20px;
  }
  .cargo-info{
    .el-form-item{
      width: 20%;
      float: left;
    }
    li{
      clear: both;
    }
    .cargo-button{
      padding-left: 10px;
      .el-form-item__content{
        margin-left: 10px !important;
      }
    }
  }
  .concat-list{
    .el-form-item{
      width: 33%;
      float: left;
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
