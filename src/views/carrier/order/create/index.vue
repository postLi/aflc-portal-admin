<template>
  <div class="create-orderinfo identification page-main">
    <!-- <div class="tab-info-title">
      <h2><span>{{ title }}</span></h2>
    </div> -->
    <div class="carrierTitle">
        <div class="realname">
            <h2>{{ title }}</h2>
        </div>
        <div class="prompt">
            <p><span class="tishi"><i class="el-icon-warning"></i>小提示： </span>(打<span class="star">*</span>号为必填项)</p>
        </div>
    </div>

    <el-form :model="ruleForm" :rules="rules" size="mini" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <!-- 线路信息 -->
      <div class="order-base-info tab-info-panel clearfix">
        <div class="tab-info-stitle"><strong>线路信息</strong></div>
        <el-form-item required :rules="[{required: true,validator: validateIsEmpty(aflcOrderAddressWebDtoList[0].provinceCityArea), message: '请选择出发地'}]" label="出发地：">
          <el-input   @focus="()=>{showMap('strartAddress')}" v-model="aflcOrderAddressWebDtoList[0].provinceCityArea"></el-input>
        </el-form-item>
        <el-form-item required label="街道/门牌号：">
          <el-input  @focus="()=>{showMap('strartAddress')}" v-model="aflcOrderAddressWebDtoList[0].viaAddress"></el-input>
          <!-- <selectType v-model="ruleForm.carType" type="AF018" clearable size="mini"></selectType> -->
        </el-form-item>
        <el-form-item  required label="到达地：">
          <el-input   @focus="()=>{showMap('endAddress')}" v-model="aflcOrderAddressWebDtoList[1].provinceCityArea"></el-input>
        </el-form-item>
        <el-form-item required label="街道/门牌号：">
          <el-input  @focus="()=>{showMap('endAddress')}" v-model="aflcOrderAddressWebDtoList[1].viaAddress"></el-input>
        </el-form-item>
      </div>
      <!-- 货物信息 -->
      <div class="cargo-info tab-info-panel">
        <div class="tab-info-stitle"><strong>货物信息</strong></div> 
        <ul class="clearfix">
           <li :key="index" v-for="(item, index) in cargoList">
             <el-form-item required label="货物名称：">
               <el-popover
                  :visible-arrow="false"
                  placement="bottom"
                  width="400"
                  v-model="item.isget"
                  trigger="manual"
                  >
                  <ul class="preCaogoList clearfix">
                    <li @click="setCargoName(index, item.name,item)" :key="inx" v-for="(item, inx) in cargoListPre">{{ item.name }}</li>
                  </ul>
                  <el-input @focus="item.isget = true"  @blur="calcTotalFee(item)" slot="reference" v-model="item.goodsName"></el-input>
                </el-popover>
                
              </el-form-item>
              <el-form-item label="总件数：">
                <el-input :maxlength="7" v-numberOnly v-model="item.goodsNum"><template slot="append">件</template></el-input>
              </el-form-item>
              <el-form-item required label="预估重量：">
                <el-input :maxlength="7" v-numberOnly  @blur="calcTotalFee" v-model="item.goodsWeight"><template slot="append">公斤</template></el-input>
              </el-form-item>
              <el-form-item required label="预估体积：">
                <el-input :maxlength="7" v-numberOnly @blur="calcTotalFee" v-model="item.goodsVolume"><template slot="append">立方米</template></el-input>
              </el-form-item>
              <el-form-item  class="cargo-button">
                <el-button size="mini" type="primary" v-if="index === (cargoList.length-1)" @click="resetCargo">重置</el-button>
                <el-button size="mini" type="primary" v-if="index === (cargoList.length-1) && cargoList.length < maxCargoLength" @click="addCargo(index)">＋</el-button>
                <el-button size="mini" type="danger" v-if="index > 0 " @click="removeCargo(index)">-</el-button>
              </el-form-item>
           </li>
        </ul>
        
      </div>
      <!-- 选择物流公司 -->
      <div class="select-line tab-info-panel" v-if="!isCargo">
        <div class="tab-info-stitle"><strong>选择物流公司：</strong>（<span class="important">选择出发地跟到达地之后，为您精准匹配物流承运商</span>）</div>
        <div class="select-line-list">
          <el-table
            ref="multipleTable"
            :data="usersArr"
            stripe
            border
            tooltip-effect="dark"
            :default-sort = "{prop: 'id', order: 'ascending'}"
            style="width: 100%">
            <el-table-column
              class="select-line-1-clumn"
              label="承运商">
              <template slot-scope="scope">
                <el-popover
                 :visible-arrow="false"
                 @show="getNet(scope.row.companyId,scope.$index)"
                  placement="bottom"
                  popper-class="wlname-info-pop"
                  width="300"
                  trigger="hover"
                  >
                  <div class="wlname-info">
                    <div class="wlname-title">最佳网点</div>
                    <ul>
                      <li :key="index" v-for="(item, index) in wlbestlist[scope.$index]">
                        <span class="wlnamev">{{ index === 0 ? '出发地' : '目的地'}}网点：<span>{{item.pointName}}</span></span><span class="wlnameh">距{{ index === 0 ? '发' : '收'}}货地：<span>{{item.distance}}km</span></span>
                        <p>{{item.address}}</p>
                        <p>联系人：{{item.name}}</p>
                        <p>联系电话：{{item.telNum}}</p>
                      </li>
                    </ul>
                    <div @click="showSlectNet(scope.row.companyId, scope.$index)" class="select-other-net">重新选择网点</div>
                  </div>
                  <!-- <span slot="reference" class="wlname"><el-radio v-model="wlindex" @click.native="calcTotalFee(scope)" :label="scope.row.id" >{{scope.row.publishName}}</el-radio></span> -->
                  <span slot="reference" class="wlname"><el-radio v-model="wlindex" :label="scope.row.id" >{{scope.row.publishName}}</el-radio></span>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              prop="lowerPrice"
              width="120"
              label="起步价">
            </el-table-column>
            <el-table-column
              prop="carTypeName"
              width="200"
              label="重货">
              <template slot-scope="scope">
                <span class="important">{{findLowestPrice(scope.row.rangePrices,'1')}}</span>元/公斤 
                <el-popover
                  :visible-arrow="false"
                  placement="bottom"
                  popper-class="showjieti-info-pop"
                  width="300"
                  trigger="hover"
                  >
                  <div class="showjieti-info">
                    <div class="jieti-title">最低一票价格：{{scope.row.lowerPrice}}元</div>
                    <ul>
                      <li :key="index" v-if="item.type==='1'" v-for="(item, index) in scope.row.rangePrices">
                        <span class="jietiv">{{ item.startVolume }}公斤{{ item.endVolume ? '~'+item.endVolume+'公斤' : '以上' }}</span>
                        <span class="jietih">{{ item.primeryPrice }}元/公斤</span>
                        <span class="jietid">折后价{{ item.discountPrice }}元/公斤</span>
                      </li>
                    </ul>
                  </div>
                  <span slot="reference" class="showjieti">阶梯价格</span>
                </el-popover>
              </template>
            </el-table-column>
            
            <el-table-column
              prop="carSourceTypeName"
              width="200"
              label="轻货">
              <template slot-scope="scope">
                <span class="important">{{findLowestPrice(scope.row.rangePrices,'0')}}</span>元/立方 <el-popover
                  placement="bottom"
                  :visible-arrow="false"
                  popper-class="showjieti-info-pop"
                  width="300"
                  trigger="hover"
                  >
                  <div class="showjieti-info">
                    <div class="jieti-title">最低一票价格：{{scope.row.lowerPrice}}元</div>
                    <ul>
                      <li :key="index" v-if="item.type==='0'" v-for="(item, index) in scope.row.rangePrices">
                        <span class="jietiv">{{ item.startVolume }}立方{{ item.endVolume ? '~'+item.endVolume+'立方' : '以上' }}</span>
                        <span class="jietih">{{ item.primeryPrice }}元/立方</span>
                        <span class="jietid">折后价{{ item.discountPrice }}元/立方</span>
                      </li>
                    </ul>
                  </div>
                  <span slot="reference" class="showjieti">阶梯价格</span>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              label="时效"
              >
              <template slot-scope="scope">
                  <span class="important">{{scope.row.transportAging}}</span>{{scope.row.transportAgingUnit}}达
              </template>
            </el-table-column>
            <el-table-column
              width="120"
              label="发车频率"
              >
              <template slot-scope="scope">
                  <span class="important">{{scope.row.departureHzData}}天{{scope.row.departureHzTime}}次</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="prePrice">
          预估运费总金额：{{theTotalPrice}}
        </div>
      </div>
      <!-- 货源类型 -->
      <div class="cargo-class tab-info-panel" v-if="isCargo">
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
                <el-input :maxlength="11" v-model="aflcOrderAddressWebDtoList[0].contactsPhone"></el-input>
              </el-form-item>
              <el-form-item >
                <el-button type="primary" @click="showContactPop(0)">选择常用发货人</el-button>
                <el-checkbox v-model="aflcOrderAddressWebDtoList[0].isSave">保存到常用发货人</el-checkbox>
              </el-form-item>
            </li>
            <li>
              <el-form-item label="收货人：">
                <el-input v-model="aflcOrderAddressWebDtoList[1].contacts"></el-input>
              </el-form-item>
              <el-form-item label="收货人手机">
                <el-input :maxlength="11" v-model="aflcOrderAddressWebDtoList[1].contactsPhone"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="showContactPop(1)">选择常用收货人</el-button>
                <el-checkbox v-model="aflcOrderAddressWebDtoList[1].isSave">保存到常用收货人</el-checkbox>
              </el-form-item>
            </li>
          </ul>
        </div>


      <el-form-item>
          <div class="tab-create-btn" style="width:30%;">
            <el-button  size="middle" type="info" @click="resetForm('ruleForm')">重置</el-button>
            <el-button  size="middle" type="primary" @click="submitForm('ruleForm')">立即发布</el-button>
          </div>
        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
      </el-form-item>

      
  
    </el-form>
    <!-- 地图 -->
    <tmsmap @success="getInfo" :pos="thepos" :name="thename" :popVisible.sync="popVisible" />

    <!-- 查看常用收发货人 -->
    <el-dialog :title="contactTitle" custom-class="ususalContactList" :visible.sync="contactPopVisible">
        <el-input placeholder="请输入姓名、手机号或地址搜索" size="small" class="search-input" v-model="popContactListSearch" auto-complete="off">
          <el-button size="small" slot="append" >搜索</el-button>
        </el-input>
        <el-button class="addNewContact" size="mini" @click="showNewContactPop">添加常用发货人</el-button>

        <ul class="contactPopList">
          <li @click="selectContact(item)" class="clearfix" :key="index" v-for="(item, index) in searchPopContactList">
            <span class="contactName">{{item.contacts}}</span>
            <span class="contactMobile">{{item.contactsPhone}}</span>
            <span class="contactAddres">{{item.address}}</span>
            <span class="contactManage" @click.prevent.stop="showModifyContact(item)">修改</span>
          </li>
        </ul>
    </el-dialog>
    <!-- 修改/新建收发货人 -->
    <el-dialog :title="popContactTitle + contactTitle" custom-class="ususalContactList ususalContacModify" :visible.sync="dialogFormVisible">
      <el-form size="mini" label-width="70px" :model="contactform">
        <el-form-item label="姓名：" >
          <el-input v-model="contactform.contacts" auto-complete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="电话：" >
          <el-input v-model="contactform.contactsPhone" auto-complete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="地址：" >
          <el-input @focus="()=>{showMap('contactAddress')}" v-model="contactform.address" auto-complete="off">
          </el-input>
        </el-form-item>
        <el-form-item  >
          <el-checkbox true-label="1" false-label="0" v-model="contactform.isDefault">
            设置为默认地址
          </el-checkbox>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitContactForm">保 存</el-button>
      </div>
    </el-dialog>
    <!-- 网点选择 -->
    <el-dialog title="网点选择" custom-class="ususalContactList netListContent" :visible.sync="showPopNet">
        <div class="popnet-title">请选择距您最近的出发地和到达地网点：</div>

        <div class="selectNetListPanel clearfix">
          <ul class="netPopChoiceList">
            <li class="start-net-icon"><span class="start-icon"></span>出发地:{{ startSelect }}</li>
            <li @click="selectNet(item, true)" class="clearfix" :key="index" v-for="(item, index) in popPointList.startPoints">
              <span class="wlListName"><el-radio v-model="startSelectIndex" @click.native="startSelect = item.pointName" :label="item.id" >{{item.pointName}}</el-radio></span><span class="wlListMobile">距离：{{item.distance}}km</span>
              <span class="wlListAddres">{{item.address}}</span>
            </li>
          </ul>
          <ul class="netPopChoiceList">
            <li class="end-net-icon"><span class="end-icon"></span>目的地:{{ endSelect }}</li>
            <li @click="selectNet(item)" class="clearfix" :key="index" v-for="(item, index) in popPointList.endPoints">
              <span class="wlListName"><el-radio v-model="endSelectIndex" :label="item.id"  @click.native="endSelect = item.pointName" >{{item.pointName}}</el-radio></span><span class="wlListMobile">距离：{{item.distance}}km</span>
              <span class="wlListAddres">{{item.address}}</span>
            </li>
          </ul>
        </div>
        
        <div slot="footer" class="dialog-footer">
          <el-button @click="showPopNet = false">取 消</el-button>
          <el-button type="primary" @click="submitNetForm">确 定</el-button>
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
import * as ReqApiManage from '@/api/carrier/manage'

export default {
  components: {
    selectType,
    upload,
    tmsmap
  },
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.logisticsForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    return {
      // 用来初始化地图位置信息
      thepos: '',
      thename: '',

      title: '创建订单',
      maxCargoLength: 5,
      cargoInfo: {
        'goodsName': '', // 货物名称
        'goodsNum': '', // 总件数
        'goodsVolume': '', // 货物体积（方）
        'goodsWeight': '' // 货物重量（吨）
        // "title": "string" // 标题
      },
      // 常用地址、收发货人信息
      'aflcOrderAddressWebDtoList': [
        {
          'contacts': '', // 联系人
          'contactsPhone': '', // 联系电话
          'isSave': false, // 是否保存常用收发货人
          'type': '0', // 类型（0：发货人，1：收货人）

          'provinceCityArea': '', // 省市区
          viaAddress: '', // 途径地
          'viaAddressCoordinate': '', // 途径地坐标
          // "viaAddressName": "string", // 途径名地址名称
          'viaOrder': 0 // 途径地顺序（0：出发地；1：目的地）
        },
        {
          'contacts': '', // 联系人
          'contactsPhone': '', // 联系电话
          'isSave': false, // 是否保存常用收发货人
          'type': '1', // 类型（0：发货人，1：收货人）

          'provinceCityArea': '', // 省市区
          viaAddress: '', // 途径地
          'viaAddressCoordinate': '', // 途径地坐标
          // "viaAddressName": "string", // 途径名地址名称
          'viaOrder': 1 // 途径地顺序（0：出发地；1：目的地）
        }
      ],
      cargoList: [],
      ifDisable: false,
      popVisible: false,
      cargoListPre: [],
      rules: {
        startP: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      current: '',
      currentShowNetIndex: 0,
      // 选中的是第几个物流商
      showPopNet: false, // 控制选择网点的弹窗显示
      startSelectIndex: 0,
      startSelect: '',
      endSelectIndex: 0,
      endSelect: '',
      wlbestlist: [],
      wlbestlistObj: {}, // 用来标记是否已经加载过
      wlindex: '',
      ruleForm: {
        'clientIp': '', // 终端ip
        'memberType': '', // 会员类型(货主:AF00101,车主:AF00102,物流公司:AF00107)
        'shipperId': '', // 货主id 用户id
        'orderClass': '', // 货源类型(0单次急发货源1长期稳定货源)
        'title': '', // 标题
        'totalAmount': 0, // 总价格
        transportRangePublishId: '',
        'wlId': '', // 专线id
        'wlName': '', // 物流公司名称
        'orderFrom': 'AF0040002', // 订单来源(APP端:AF0040001;WEB端:AF0040002;微信公众号:AF0040003;小程序:AF004004)
        startPointId: '', // 最佳出发网点
        endPointId: '', // 最佳结束网点
        goodsType: 0, // 价格状态
        forecastPrice: 0 // 获取到总价格
      },
      usersArr: [],
      netQuery: {},
      // netQuery: { endLatitude: '22.524114', endLocation: '广东省-江门市-新会区', endLongitude: '113.03524', startLatitude: '23.124017', startLocation: '广东省-广州市-天河区', startLongitude: '113.3682' },
      // 收发货人
      currentType: 0, // 当前操作的联系类型
      contactTitle: '常用发货人',
      popContactTitle: '添加',
      popContactList: [],
      popContactListSearch: '',
      isCargo: false,
      popPointList: {
        startPoints: [],
        endPoints: []
      },
      contactPopVisible: false,
      dialogFormVisible: false,
      contactform: {
        'address': '', // 详细地址
        'contacts': '', // 联系人
        'contactsPhone': '', // 联系电话
        'coordinate': '', // 发货地坐标
        // "createTime": "2018-07-27T06:28:38.733Z", //创建时间
        // "creater": "string", //创建人
        // "delFlag": "string", //删除状态
        'floorHousenum': '', // 楼层及门牌号 跟地址保持一致
        // "id": "string", //编号
        'isDefault': '0', // 是否默默常用联系人（0：否；1：是）
        'shipperId': '', // 货主ID userid
        // "summary": "string", //简称
        'type': '0' // 类型（0：常用发货人，1：常用收货人）
        // "updateTime": "2018-07-27T06:28:38.733Z", //更新时间
        // "updater": "string", //修改人
        // "version": "string" //版本
      }

    }
  },
  computed: {
    theTotalPrice() {
      return this.ruleForm.forecastPrice === '' ? '面议' : this.ruleForm.forecastPrice + '元'
    },
    noCanSubmit() {
      // 判断是否能提交
      return false
    },
    searchPopContactList() {
      return this.popContactList.filter(el => {
        return el.contacts.indexOf(this.popContactListSearch) !== -1 || el.contactsPhone.indexOf(this.popContactListSearch) !== -1 || el.address.indexOf(this.popContactListSearch) !== -1
      })
    }
  },
  watch: {
    wlindex(newVal) {
      if (newVal) {
        this.calcTotalFee()
      }
    }
  },
  mounted() {
    this.id = this.$route.query.cid
    this.cid = this.$route.query.id
    this.isCargo = this.$route.path.indexOf('cargoInfo') !== -1
    if (this.isCargo) {
      this.title = '发布货源'
    } else {
      this.title = '创建订单'
    }
    this.initCargo()
    if (this.id) {
      this.initModify()
    } else if (this.cid) {
      // 如果是从专线过来
      this.initZX()
    } else if (this.$route.query.start) {
      this.initSY()
    } else {
      this.initNew()
    }
    // this.getCompany()
  },
  methods: {
    // 公用工具类
    validateIsEmpty(prop, checkrule) {
      return (rule, value, callback) => {
        const msg = rule.message
        console.log('check', rule, value)
        if (checkrule) {
          if (checkrule.test(value)) {
            callback()
          } else {
            callback(new Error(msg))
          }
        } else if (!value) {
          // this.showMessage(msg)
          callback(new Error(msg))
        } else {
          callback()
        }
      }
    },
    showMessage(msg) {
      this.$message.error(msg)
    },
    // 从专线页面下单
    initZX() {
      // 获取网点相关的信息
      this.getCompany({
        id: this.cid
      }).then(res => {
        this.wlindex = this.cid
        this.getNet(this.wlindex, 0)
      })

      this.cargoList = [Object.assign({ isget: false }, this.cargoInfo)]
      this.ruleForm.shipperId = this.otherinfo.id
      this.ruleForm.memberType = this.otherinfo.rolesIdList[0]
      this.aflcOrderAddressWebDtoList[0].contacts = this.otherinfo.contactsName
      this.aflcOrderAddressWebDtoList[0].contactsPhone = this.otherinfo.mobile
      ReqApiManage.getLineInfo(this.cid).then(data => {
        // 设置各个参数
        this.aflcOrderAddressWebDtoList[0].provinceCityArea = data.startLocation
        this.aflcOrderAddressWebDtoList[1].provinceCityArea = data.endLocation
        /* this.aflcOrderAddressWebDtoList[0].contacts = data.startLocationContacts
        this.aflcOrderAddressWebDtoList[0].contactsPhone = data.startLocationContactsMobile
        this.aflcOrderAddressWebDtoList[1].contacts = data.endLocationContacts
        this.aflcOrderAddressWebDtoList[1].contactsPhone = data.endLocationContactsMobile */
      }).catch(err => {
        this.$message.error('查询出错：' + (err.errorInfo || err.text || '未知错误'))
      })
    },
    // 从首页下单
    initSY() {
      const query = this.$route.query
      this.cargoList = [Object.assign({ isget: false }, this.cargoInfo)]
      this.ruleForm.shipperId = this.otherinfo.id
      this.ruleForm.memberType = this.otherinfo.rolesIdList[0]
      // 设置各个参数
      this.aflcOrderAddressWebDtoList[0].provinceCityArea = query.start
      this.aflcOrderAddressWebDtoList[1].provinceCityArea = query.end
      this.aflcOrderAddressWebDtoList[0].viaAddress = query.startstreet
      this.aflcOrderAddressWebDtoList[1].viaAddress = query.endstreet

      this.aflcOrderAddressWebDtoList[0].viaAddressCoordinate = query.startj + ',' + query.startw
      this.aflcOrderAddressWebDtoList[1].viaAddressCoordinate = query.endj + ',' + query.endw

      this.netQuery = {
        endLatitude: query.endw,
        endLocation: query.end,
        endLongitude: query.endj,
        startLatitude: query.startw,
        startLocation: query.start,
        startLongitude: query.startj,
        startProvince: query.startp,
        startCity: query.startc,
        startArea: query.starta,
        endProvince: query.endp,
        endCity: query.endc,
        endArea: query.enda
      }

      this.getCompany()
    },
    initNew() {
      this.cargoList = [Object.assign({ isget: false }, this.cargoInfo)]
      this.ruleForm.shipperId = this.otherinfo.id
      this.ruleForm.memberType = this.otherinfo.rolesIdList[0]
      this.aflcOrderAddressWebDtoList[0].contacts = this.otherinfo.contactsName
      this.aflcOrderAddressWebDtoList[0].contactsPhone = this.otherinfo.mobile
    },
    initModify() {
      ReqApiManage.getOrderDesc(this.id).then(data => {
        if (data.aflcOrderAddressWebDtoList) {
          this.aflcOrderAddressWebDtoList = this.aflcOrderAddressWebDtoList.map((el, index) => {
            const type = el.type
            el = data.aflcOrderAddressWebDtoList[index]
            el.type = type
            el.isSave = !!el.isSave
            return el
          })
        }
        if (data.aflcFCLOrderGoodsDtoList) {
          this.cargoList = data.aflcFCLOrderGoodsDtoList
        }
        for (const i in this.ruleForm) {
          this.ruleForm[i] = data[i]
        }
        this.ruleForm.id = data.id
        this.isModify = true
      }).catch(err => {
        this.$confirm('查询出错：' + JSON.stringify(err), '提示', {
          confirmButtonText: '重新创建',
          cancelButtonText: '返回列表页',
          type: 'warning'
        }).then(() => {
          this.initNew()
        }).catch(() => {
          this.goList()
        })
      })
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
    goList() {
      if (this.isCargo) {
        this.eventBus.$emit('replaceCurrentView', '/cargoInfo/manage')
      } else {
        this.eventBus.$emit('replaceCurrentView', '/order/manage')
      }
    },
    selectTag(label) {
      label.ischeck = !label.ischeck
    },
    getInfo(pos, name, info) {
      console.log('map info: ', info)
      const obj = info.addressComponent
      const str = obj.province + '' + obj.city + '' + obj.district
      const str2 = obj.township + obj.street + obj.streetNumber + obj.building
      // 如果是从专线过来创建的，需要判断是否选择到当前城市位置
      if (this.cid) {
        if (str.indexOf(this.aflcOrderAddressWebDtoList[0].provinceCityArea) === -1 && this.current === 'strartAddress') {
          this.$message.info('需要选择当前专线所在位置~')
          return false
        }
        if (str.indexOf(this.aflcOrderAddressWebDtoList[1].provinceCityArea) === -1 && this.current === 'endAddress') {
          this.$message.info('需要选择当前专线所在位置~')
          return false
        }
      }

      // info.name  info.pos
      switch (this.current) {
        case 'contactAddress':
          this.contactform.address = name
          this.contactform.floorHousenum = name
          this.contactform.coordinate = pos

        case 'strartAddress':

          this.aflcOrderAddressWebDtoList[0].provinceCityArea = str
          this.aflcOrderAddressWebDtoList[0].viaAddress = str2
          this.aflcOrderAddressWebDtoList[0].viaAddressCoordinate = pos
          this.aflcOrderAddressWebDtoList[0].province = obj.province
          this.aflcOrderAddressWebDtoList[0].city = obj.city
          this.aflcOrderAddressWebDtoList[0].area = obj.district
          this.findNetList()
          break
        case 'endAddress':
          this.aflcOrderAddressWebDtoList[1].provinceCityArea = str
          this.aflcOrderAddressWebDtoList[1].viaAddress = str2
          this.aflcOrderAddressWebDtoList[1].viaAddressCoordinate = pos
          this.aflcOrderAddressWebDtoList[1].province = obj.province
          this.aflcOrderAddressWebDtoList[1].city = obj.city
          this.aflcOrderAddressWebDtoList[1].area = obj.district
          this.findNetList()
          break
      }
    },
    showMap(name) {
      switch (name) {
        case 'contactAddress':
          this.thename = this.contactform.address || ''
          this.thepos = this.contactform.coordinate || ''

        case 'strartAddress':
          this.thename = (this.aflcOrderAddressWebDtoList[0].provinceCityArea || '') + (this.aflcOrderAddressWebDtoList[0].viaAddress || '') || ''
          this.thepos = this.aflcOrderAddressWebDtoList[0].viaAddressCoordinate || ''

          break
        case 'endAddress':
          this.thename = (this.aflcOrderAddressWebDtoList[1].provinceCityArea || '') + (this.aflcOrderAddressWebDtoList[1].viaAddress || '') || ''
          this.thepos = this.aflcOrderAddressWebDtoList[1].viaAddressCoordinate || ''
          break
      }

      this.popVisible = true
      this.current = name
    },
    // 货物信息
    resetCargo() {
      const index = this.cargoList.length
      this.$set(this.cargoList, index - 1, {})
      // this.cargoList = [{}]
    },
    removeCargo(index) {
      this.cargoList.splice(index, 1)
    },
    addCargo(index) {
      this.cargoList.push(Object.assign({ isget: false }, this.cargoInfo))
    },
    setCargoName(index, name, item) {
      this.$set(this.cargoList, index, Object.assign(this.cargoList[index], {
        goodsName: name
      }))
      item.isget = false
      // this.cargoList[index]
    },
    /** ***  选择物流公司   */
    findLowestPrice(list, type) {
      list = list || []
      const find = list.filter(el => el.type === type)[0]
      return !find ? 0 : find.discountPrice
    },
    findNetList() {
      // 判断必要参数是否存在
      const obj = this.aflcOrderAddressWebDtoList
      const pos0 = obj[0].viaAddressCoordinate.split(',')
      const pos1 = obj[1].viaAddressCoordinate.split(',')
      console.log('find data:', obj[0].viaAddressCoordinate, obj[1].viaAddressCoordinate, pos0, pos1)
      // 当有俩个的坐标信息时，表示已经填写相关信息
      if (pos0.length === 2 && pos1.length === 2) {
        const data = {
          endLatitude: pos1[1], // 到达地上传坐标纬度
          endLocation: obj[1].provinceCityArea, // 目的地
          endLongitude: pos1[0], // 到达地上传坐标经度
          startLatitude: pos0[1], // 出发地上传坐标纬度
          startLocation: obj[0].provinceCityArea, // 出发地
          startLongitude: pos0[0], // 出发地上传坐标经度
          startProvince: obj[0].province,
          startCity: obj[0].city,
          startArea: obj[0].area,
          endProvince: obj[1].province,
          endCity: obj[1].city,
          endArea: obj[1].area
        }
        console.log('find data:', data)
        this.netQuery = data
        // 如果不是从专线页面过来，则请求相关专线信息
        if (!this.cid) {
          this.getCompany()
        }
      }
    },
    // 计算总价
    calcTotalFee(item) {
      if (item && typeof item.goodsName !== 'undefined') {
        item.isget = false
      }
      // 必须要有货物信息跟物流公司信息
      // 重量跟体积必须要有一个值
      const transportRangeId = this.wlindex
      // 必须要有名称的才能参与计算
      const cargolist = this.cargoList.filter(el => el.goodsName)

      // 获取价格前初始化下数据
      this.ruleForm.wlId = ''
      this.ruleForm.transportRangePublishId = ''
      this.ruleForm.wlName = ''
      this.ruleForm.forecastPrice = 0
      this.ruleForm.goodsType = ''
      this.ruleForm.totalAmount = 0
      if (transportRangeId) {
        let $index = 0
        const obj = this.usersArr.filter((el, index) => {
          if (el.id === transportRangeId) {
            $index = index
            return true
          } else {
            return false
          }
        })
        this.ruleForm.wlName = obj[0] ? obj[0].publishName : ''
        const data = this.wlbestlist[$index] || []
        console.log('calcTotalFee:', transportRangeId, cargolist, data)
        this.ruleForm.startPointId = data[0] ? data[0].id : ''
        this.ruleForm.endPointId = data[1] ? data[1].id : ''
        this.ruleForm.transportRangePublishId = obj[0] ? obj[0].companyId : ''
      }

      if (cargolist.length && transportRangeId) {
        let weight = cargolist.reduce((pre, item) => {
          return pre + parseFloat(item.goodsWeight, 10)
        }, 0)
        let volume = cargolist.reduce((pre, item) => {
          return pre + parseFloat(item.goodsVolume, 10)
        }, 0)
        const amount = cargolist.reduce((pre, item) => {
          return pre + parseFloat(item.goodsNum, 10)
        }, 0)
        weight = weight || 0
        volume = volume || 0
        if (weight > 0 || volume > 0) {
          this.ruleForm.wlId = transportRangeId
          ReqApi.getTotalPrice({
            transportRangeId, // 物流公司专线id
            weight, // 货物重量
            volume// 货物体积
          }).then(res => {
            const data = res.data

            if (data) {
              this.ruleForm.forecastPrice = data.forecastPrice
              this.ruleForm.goodsType = data.goodsType
              this.ruleForm.totalAmount = data.forecastPrice
            } else {
              this.ruleForm.forecastPrice = ''
              this.ruleForm.goodsType = ''
              this.ruleForm.totalAmount = ''
            }
          }).catch(err => {
            this.ruleForm.forecastPrice = ''
            this.ruleForm.goodsType = ''
            this.ruleForm.totalAmount = ''
            // this.$message.error('获取价格失败： ' + JSON.stringify(err))
          })
        }
      }
    },
    getCompany(vo) {
      if (this.isCargo) {
        return false
      }
      vo = vo || {
        'startLocation': this.netQuery.startLocation,
        'endLocation': this.netQuery.endLocation,
        startProvince: this.netQuery.startProvince,
        startCity: this.netQuery.startCity,
        startArea: this.netQuery.startArea,
        endProvince: this.netQuery.endProvince,
        endCity: this.netQuery.endCity,
        endArea: this.netQuery.endArea
      }
      return ReqApi.getCompany({
        currentPage: 1,
        'pageSize': 100,
        vo
      }).then(res => {
        // this.usersArr = res.data.list || []
        // 每次搜索出专线列表，重置部分参数
        this.wlbestlistObj = {}
        this.wlindex = ''
        this.startSelectIndex = ''
        this.endSelectIndex = ''
        this.startSelect = ''
        this.endSelect = ''
        this.currentShowNetIndex = 0
        this.wlbestlist = []

        this.usersArr = res.data.list || []
        if (!this.usersArr.length) {
          this.$message.info('查不到相关专线~')
        }
        /* this.usersArr = res.data.list ? res.data.list.concat(res.data.list.map(el=>{
          let ell = Object.assign({},el)
          ell.companyId = '1234243'
          ell.id = '112324'
          ell.publishName = 'abcdded'
          return ell
        })) : [] */
      })
    },
    getNet(id, index) {
      console.log('getNet:', id, index, this.wlbestlistObj[index], this.netQuery)
      // 重新搜索后，要重置部分参数
      if (!this.wlbestlistObj[index] && this.netQuery.startLongitude) {
        ReqApi.getBestNet(id, this.netQuery).then(res => {
          this.$set(this.wlbestlist, index, res.data)
          this.wlbestlistObj[index] = true
        })
      } else {
        // this.$message.warning('请先选择具体的出发地跟目的地信息~')
      }
    },
    getAllNet(id) {
      ReqApi.getAllNet(id, this.netQuery).then(res => {
        /* res.data.startPoints = res.data.startPoints.concat(res.data.startPoints.map(el=>{
          let ell = Object.assign({},el)
          ell.id = '111'
          ell.pointName = "1111"
          return ell
        }))
        res.data.endPoints = res.data.endPoints.concat(res.data.endPoints.map(el=>{
          let ell = Object.assign({},el)
          ell.id = '222'
          ell.pointName = "222222"
          return ell
        })) */

        this.startSelectIndex = ''
        this.endSelectIndex = ''
        const obj = this.wlbestlist[this.currentShowNetIndex]

        this.popPointList.startPoints = res.data.startPoints.map(el => {
          el.ischecked = false
          if (el.id === obj[0].id) {
            this.startSelectIndex = obj[0].id
          }
          return el
        })
        this.popPointList.endPoints = res.data.endPoints.map(el => {
          el.ischecked = false
          if (el.id === obj[1].id) {
            this.endSelectIndex = obj[1].id
          }
          return el
        })
      })
    },
    /** 重新选择网点 */
    showSlectNet(id, index) {
      this.showPopNet = true
      this.currentShowNetIndex = index
      this.getAllNet(id)
    },
    selectNet(item, isStart) {
      if (isStart) {
        this.startSelectIndex = item.id
        this.startSelect = item.pointName
      } else {
        this.endSelectIndex = item.id
        this.endSelect = item.pointName
      }
    },
    submitNetForm() {
      // 判断是否有选择网点
      let ischeck = true
      if (this.popPointList.startPoints.length) {
        if (!this.startSelectIndex) {
          ischeck = false
        }
      }
      if (this.popPointList.endPoints.length) {
        if (!this.endSelectIndex) {
          ischeck = false
        }
      }
      if (ischeck) {
        this.showPopNet = false
        // 返回给最佳网点那里显示
        if (this.startSelectIndex) {
          this.$set(this.wlbestlist[this.currentShowNetIndex], 0, this.popPointList.startPoints.filter(el => {
            return el.id === this.startSelectIndex
          })[0])
        }
        if (this.endSelectIndex) {
          this.$set(this.wlbestlist[this.currentShowNetIndex], 1, this.popPointList.endPoints.filter(el => {
            return el.id === this.endSelectIndex
          })[0])
        }
      } else {
        this.$message.info('请选择一个网点~')
      }
    },
    // 收发货人
    showContactPop(type) {
      this.currentType = type
      ReqApi.getContactList({
        currentPage: 1,
        pageSize: 100,
        vo: {
          type
        }
      }).then(data => {
        this.contactPopVisible = true
        this.popContactList = data.list
      }).catch(() => {
        this.$message.error('加载数据失败~')
      })
    },
    // 点击选择
    selectContact(item) {
      const obj = this.aflcOrderAddressWebDtoList[this.currentType]
      obj.contacts = item.contacts
      obj.contactsPhone = item.contactsPhone
      // 关闭弹窗
      this.contactPopVisible = false
    },
    showNewContactPop() {
      for (const i in this.contactform) {
        this.contactform[i] = ''
      }
      delete this.contactform.id
      this.dialogFormVisible = true
    },
    // 修改
    showModifyContact(item) {
      for (const i in this.contactform) {
        this.contactform[i] = item[i]
      }
      this.contactform.id = item.id
      this.dialogFormVisible = true
    },
    // 新建/修改提交
    submitContactForm() {
      this.contactform.shipperId = this.otherinfo.id
      this.contactform.type = this.currentType
      let prom
      if (this.contactform.id) {
        prom = ReqApi.putChangeContact(this.contactform)
      } else {
        prom = ReqApi.postAddContact(this.contactform)
      }

      prom.then(res => {
        this.$message.success('保存成功~')
        this.dialogFormVisible = false
        this.showContactPop(this.currentType)
      }).catch(err => {
        this.$message.error('保存失败：' + JSON.stringify(err))
      })
    },
    // 重置
    resetForm(formName) {
      this.aflcOrderAddressWebDtoList = this.$options.data().aflcOrderAddressWebDtoList
      this.ruleForm = this.$options.data().ruleForm
      this.cargoList = []
      // this.cargoListPre = []
      this.wlbestlist = []
      this.wlbestlistObj = {}
      this.usersArr = []
      this.netQuery = {}
      this.popPointList = this.$options.data().popPointList
      this.contactform = this.$options.data().contactform
      this.initNew()
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          const data = Object.assign({}, this.ruleForm)
          data.aflcOrderAddressWebDtoList = this.aflcOrderAddressWebDtoList
          data.aflcFCLOrderGoodsDtoList = this.cargoList

          // 做提交判断
          if (data.aflcOrderAddressWebDtoList[0].provinceCityArea === '') {
            this.$message.error('请选择出发地~')
            return false
          }
          if (data.aflcOrderAddressWebDtoList[1].provinceCityArea === '') {
            this.$message.error('请选择到达地~')
            return false
          }
          const errorCargo = data.aflcFCLOrderGoodsDtoList.filter(el => (el.goodsName && (!el.goodsWeight || !el.goodsVolume)))
          if (errorCargo.length > 0) {
            this.$message.error('请填写有效的货物信息~')
            return false
          }
          // 只提交填写了名称的货物信息
          data.aflcFCLOrderGoodsDtoList = data.aflcFCLOrderGoodsDtoList.filter(el => el.goodsName)
          if (data.wlId === '' && !this.isCargo) {
            this.$message.error('需要选择物流公司~')
            return false
          }
          if (data.aflcOrderAddressWebDtoList[0].contacts === '') {
            this.$message.error('请填写发货人~')
            return false
          }
          if (data.aflcOrderAddressWebDtoList[0].contactsPhone === '') {
            this.$message.error('请填写发货人手机~')
            return false
          }

          let promiseObj
          // 判断操作，调用对应的函数
          if (this.isModify) {
            promiseObj = ReqApi.putChangeOrder(this.otherinfo.userToken, data)
          } else {
            promiseObj = ReqApi.postCreateOrder(this.otherinfo.userToken, data)
          }

          promiseObj.then(res => {
            this.loading = false
            this.$alert('保存成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.$emit('success')
                this.goList()
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
.showjieti-info-pop,.wlname-info-pop{
  padding: 0;
  background: transparent;
  .popper__arrow{
    display: none;
  }
}
.wlname-info,.showjieti-info{
   color: #666;
  width: 300px;
  padding: 5px;
  border: 1px solid #969696;
  background: #fff6d2;
  font-size: 12px;
}
.wlname-info{
  width: 380px;
  background: #fff5d2;
  .wlname-title{
    font-size: 14px;
    line-height: 29px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 5px;
  }
  li{
    margin-bottom: 15px;
    p{
      color: #666;
    }
  }
  .wlnamev,.wlnameh{
    display: inline-block;
    width: 50%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #333;

    span{
      color: #ff300d;
    }
  }
  .select-other-net{
    width: 98px;
    height: 24px;
    background-color: #23c3f5;
    display: block;
    margin: 10px auto;
    text-align: center;
    line-height: 24px;
    font-size: 12px;
    color: #fff;
    cursor: pointer;

    &:hover{
      background: #23c1f5;
    }
  }
}
.showjieti-info{
  li{
    clear: both;
    height: 30px;
    line-height: 30px;
    span{
      float: left;
      white-space:nowrap;
    }
    .jietiv{
      width: 33%;
    }
    .jietih{
      width: 25%;
    }
    .jietid{
      width: 42%;
    }
  }
}
.netListContent{
  width: 486px;
  height: 418px;
  background: #fff;
  border: 1px solid #19aaef;
  font-size: 12px;
  color: #343639;

  .el-dialog__body{
    padding: 5px 0;
    font-size: 12px;
  }

  .popnet-title{
    text-align: center;
    margin: 10px 0 20px;
  }
  .netPopChoiceList{
    float: left;
    margin-left: 11px;
    width: 225px;
    height: 274px;
    border: 1px solid #ccc;
  }
  .start-net-icon,.end-net-icon{
    line-height: 28px;
    background: #19acef;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    
  }
  li{
    padding: 5px 0;
    border-bottom: 1px solid #ccc;
    .wlListMobile,.wlListName{
      display: inline-block;
      width: 50%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .wlListMobile{
      text-align: right;
    }
    .wlListAddres{
      display: block;
      color: #999;
      padding-left: 25px;
    }
  }
  
}
.create-orderinfo{
  padding: 0;
  height: 100%;
  .tab-info-stitle{
    margin-bottom: 10px;
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
    margin-top: 10px;
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
  // 阶梯价格
  .showjieti{
    color: #0e91e9;
    text-decoration: underline;
    font-size: 12px;
    margin-left: 10px;
  }
  .wlname{
    display: block;
    padding: 0 10px;
    text-align: left;
  }
  // 弹窗
  .ususalContactList{
    width: 486px;

    .search-input{
      width: 266px;
      .el-input-group__append{
        background-color: #1aadef;
        color: #fff;
      }
    }
    .addNewContact{
      width: 105px;
      height: 28px;
      background-color: #23c3f5;
      border-radius: 4px;
      color: #fff;
      margin-left: 60px;
    }
    .el-dialog__header{
      height: 28px;
      line-height: 28px;
      padding: 0 23px;
      
      background-image: linear-gradient(180deg, 
		#0d91e9 0%, 
    #22c3f5 100%);
    
      .el-dialog__title{
        font-size: 12px;
        color: #fff;
      }
      .el-dialog__headerbtn{
        top: 5px;
        right: 10px;
      }
      .el-dialog__close{
        color: #fff;
      }
    }
    .el-dialog__body{
      padding-top: 5px;
    }
  }
  .contactPopList{
    max-height: 300px;
    overflow: auto;
    margin-top: 5px;
    font-size: 12px;

    li{
      clear: both;
      border-bottom: dashed 1px #cccccc;
      padding: 10px 0;
      cursor: pointer;

      &:hover{
        background: rgba(0,0,0,.05);
      }
    }
    span{
      float: left;
      width: 25%;
      height: 28px;
    }
    .contactManage{
      color: #ef0000;
      text-align: center;
      cursor: pointer;
    }
  }

  .ususalContacModify{
    .el-form-item--mini.el-form-item{
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
  .concat-list{
    .el-form-item{
      width: 33%;
      float: left;
    }
    li{
      clear: both;
    }
  }
  .tab-info-panel{
    margin: 10px auto;
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
