<template>
  <div class="carrierIdentification identification" v-loading="loading">
    <el-form :model="logisticsForm" :rules="rules" ref="ruleForm" label-width="250px" class="demo-ruleForm">
      <div class="carrierTitle">
        <div class="realname">
          <h2>完善实名认证 <span
            :class="{certified:logisticsForm.authStatusName == '待认证' ,certify:logisticsForm.authStatusName == '已认证'}">( {{logisticsForm.authStatusName}} )</span>
          </h2>
        </div>
        <div class="prompt">
          <p><span class="tishi"><i class="el-icon-warning"></i>小提示： </span>(打<span class="star">*</span>号为必填项)</p>
          <p>修改完善公司基本信息后，我们将在24小时内进行人工审核，审核通过后，免费赠送您一个<span class="site">企业网站</span></p>
        </div>
      </div>
      <div class="companyInformation information">
        <h2>公司信息</h2>
        <el-form-item label="物流公司名称：" prop="companyName">
          <el-input v-model="logisticsForm.companyName" :disabled="ifDisable == false" :maxlength='25'>
            <p slot="append">请填写企业在工商局注册的全称，完整的信息让客户更加信赖您。</p>
          </el-input>
        </el-form-item>
        <el-form-item label="品牌：">
          <el-input v-model="logisticsForm.belongBrand" disabled v-if="ifDisable == false">
          </el-input>
          <el-select v-model="logisticsForm.belongBrandCode" placeholder="请选择" v-else>
            <el-option
              v-for="item in optionsBelongBrand"
              :key="item.id"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公司成立时间：">
          <el-date-picker
            v-model="logisticsForm.foundTime"
            align="right"
            type="date"
            placeholder="选择日期"
            :disabled="ifDisable === false"
            value-format="timestamp"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="法人/负责人：" prop="corporation">
          <el-input v-model="logisticsForm.corporation" :disabled="ifDisable === false" :maxlength='15'>
            <p slot="append">与营业执照上法定代表人姓名保持一致。</p>
          </el-input>
        </el-form-item>
        <el-form-item label="统一社会信用代码（营业执照）：" maxlength="18" prop="creditCode">
          <el-input v-model="logisticsForm.creditCode" :disabled="ifDisable === false">
          </el-input>
        </el-form-item>
        <el-form-item label="代收货款：" prop="isCollection">
          <el-radio-group v-model="logisticsForm.isCollection">
            <el-radio label="1" :disabled="ifDisable === false">是</el-radio>
            <el-radio label="0" :disabled="ifDisable === false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="企业LOGO：">
          <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="logisticsForm.companyFile"
                  v-if=" ifDisable == true"/>
          <img class="showPicture" :src="logisticsForm.companyFile ? logisticsForm.companyFile: defaultImg" alt=""
               v-else>
          <el-button class="preview" type="primary" plain v-show="logisticsForm.companyFile ? true : false"
                     v-showPicture :imgurl="logisticsForm.companyFile">点击预览
          </el-button>
        </el-form-item>
        <el-form-item label="公司简介：" class="textarea" prop="companyDes">
          <div v-if="ifDisable == false">
            <p
              style="text-indent:2em;white-space:pre-wrap; word-wrap: break-word;word-break: break-all;font-size:14px;color:#333;">
              {{logisticsForm.companyDes}}</p>
          </div>
          <div v-else>
            <el-input
              type="textarea"
              :maxlength="maxlengthNum"
              :autosize="{ minRows: 5, maxRows: 10}"
              placeholder="企业自成立以来，秉承“诚信为本，信誉第一”的经营理念，以“安全、快捷、准确、方便”为宗旨,以市场为导向，企业竭诚为客户提供优质满意的服务，企业 努力打造物流行业一流品牌，企业 欢迎您光临指导。"
              v-model="logisticsForm.companyDes">
            </el-input>
            <span>{{totalNumber}} / {{maxlengthNum}}</span>
            <p>建议您详细的介绍公司的物流服务，有什么服务优势，能被发货客户搜索到</p>
            <p>内容请根据您的公司情况进行相应调整哦</p>
          </div>
        </el-form-item>
        <el-form-item label="服务类型：" class="moreWidth" prop="serviceTypeArr">
          <el-checkbox-group v-model="serviceTypeArr">
            <el-checkbox v-for="server in serverClassify" :label="server.code" :disabled="ifDisable === false"
                         :key="server.id">{{server.name}}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="产品与服务：" class="moreWidth" prop="productServiceCodeArr">
          <el-checkbox-group v-model="productServiceCodeArr">
            <el-checkbox v-for="server in optionsProductService" :label="server.code" :disabled="ifDisable === false"
                         :key="server.id">{{server.name}}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="增值服务：" class="moreWidth">
          <el-checkbox-group v-model="otherServiceCodeArr">
            <el-checkbox v-for="server in optionsOtherService" :label="server.code" :disabled="ifDisable === false"
                         :key="server.id">{{server.name}}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>
      <!-- 联系方式 -->
      <div class="contactInformation information">
        <h2>联系方式</h2>
        <el-form-item label="联系人：" prop="contactsName">
          <el-input v-model="logisticsForm.contactsName" :disabled="ifDisable === false">
          </el-input>
        </el-form-item>
        <el-form-item label="手机：" prop="mobile">
          <!--<el-input v-model="logisticsForm.mobile" maxlength="11"  v-numberOnly   :disabled="ifDisable === false"></el-input>-->
          <el-input v-model="logisticsForm.mobile" maxlength="11" v-numberOnly disabled>
          </el-input>
        </el-form-item>
        <br>
        <el-form-item label="公司所在地：" prop="belongCityName">

          <vregion :ui="true" @values="regionChange" class="form-control">
            <el-input v-model="logisticsForm.belongCityName" :disabled="ifDisable === false"
                      placeholder="请选择出发地"></el-input>
          </vregion>
          <!-- <el-input @focus="()=>{showMap(logisticsForm.belongCityName)}" v-model="logisticsForm.belongCityName" :disabled="ifDisable === false"></el-input> -->
        </el-form-item>
        <el-form-item label="详细地址：" class="moreWidth" prop="address">
          <el-input @focus="()=>{showMap('endAddress')}" v-model="logisticsForm.address"
                    :disabled="ifDisable === false"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="联系电话：" prop="contactsTel">
          <el-input v-model="logisticsForm.contactsTel" maxlength="11" :disabled="ifDisable === false">
          </el-input>
        </el-form-item>
        <el-form-item label="QQ：">
          <el-input v-model="logisticsForm.qq" v-numberOnly :disabled="ifDisable === false">
          </el-input>
        </el-form-item>
        <br>
        <el-form-item label="微信二维码上传：">
          <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="logisticsForm.wechatCode"
                  v-if=" ifDisable == true"/>
          <img class="showPicture" :src="logisticsForm.wechatCode ? logisticsForm.wechatCode: defaultImg" alt="" v-else>
          <el-button class="preview" type="primary" plain v-show="logisticsForm.wechatCode ? true : false" v-showPicture
                     :imgurl="logisticsForm.wechatCode">点击预览
          </el-button>
        </el-form-item>
      </div>
      <!-- 物流公司认证照片 -->
      <div class="picInformation information">
        <h2>物流公司认证照片</h2>
        <el-form-item prop="businessLicenceFile">
          <p><span>*</span>上传营业执照照片：</p>
          <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="logisticsForm.businessLicenceFile"
                  v-if=" ifDisable == true"/>
          <img class="showPicture"
               :src="logisticsForm.businessLicenceFile ? logisticsForm.businessLicenceFile: defaultImg" alt="" v-else>
          <el-button class="preview" type="primary" plain v-show="logisticsForm.businessLicenceFile ? true : false"
                     v-showPicture :imgurl="logisticsForm.businessLicenceFile">点击预览
          </el-button>
        </el-form-item>
        <el-form-item prop="takeIdCardFile">
          <p><span>*</span>负责人手持身份证正面照片：</p>
          <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="logisticsForm.takeIdCardFile"
                  v-if=" ifDisable == true"/>
          <img class="showPicture" :src="logisticsForm.takeIdCardFile? logisticsForm.takeIdCardFile: defaultImg" alt=""
               v-else>

          <el-button class="preview" type="primary" plain v-show="logisticsForm.takeIdCardFile ? true : false"
                     v-showPicture :imgurl="logisticsForm.takeIdCardFile">点击预览
          </el-button>
        </el-form-item>
        <el-form-item prop="companyFacadeFile">
          <p><span>*</span>上传公司或者档口照片：</p>
          <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="logisticsForm.companyFacadeFile"
                  v-if=" ifDisable == true"/>
          <img class="showPicture" :src="logisticsForm.companyFacadeFile ? logisticsForm.companyFacadeFile: defaultImg"
               alt="" v-else>
          <el-button class="preview" type="primary" plain v-show="logisticsForm.companyFacadeFile ? true : false"
                     v-showPicture :imgurl="logisticsForm.companyFacadeFile">点击预览
          </el-button>
        </el-form-item>
      </div>
      <el-form-item class="fromfooter">
        <el-button size="medium" @click="resetForm('ruleForm')" v-show="ifDisable">取消</el-button>
        <el-button size="medium" type="primary" @click="submitForm('ruleForm')" v-show="ifDisable">确认提交</el-button>
      </el-form-item>
    </el-form>
    <tmsmap @success="getInfo" pos="" :name="logisticsForm.belongCityName" :popVisible.sync="popVisible"/>

  </div>
</template>

<script>

  import '@/styles/identification.scss'
  import upload from '@/components/Upload/singleImage'
  import {identifyCarrier} from '@/api/carrier/index.js'
  import {getDictionary, getLogisticsCompanyInfoByMobile} from '@/api/common.js'
  import {REGEX} from '@/utils/validate.js'
  import {parseTime, pickerOptions2} from '@/utils/index.js'

  import {getUserInfo} from '@/utils/auth.js'
  import tmsmap from '@/components/map/index'
  import vregion from '@/components/vregion/Region.vue'

  export default {
    components: {
      upload,
      tmsmap,
      vregion
    },
    data() {
      var checkCreditCode = (rule, value, callback) => {
        if (value && !REGEX.ENGLISH_AND_NUMBER.test(value)) {
          return callback(new Error('仅可输入数字或者英文字母'))
        } else {
          callback()
        }
      }
      var checkServiceTypeArr = (rule, value, callback) => {
        if (this.serviceTypeArr.length === 0) {
          return callback(new Error('请至少选择一项'))
        } else {
          callback()
        }
      }
      var checkProductServiceCodeArr = (rule, value, callback) => {
        if (this.productServiceCodeArr.length === 0) {
          return callback(new Error('请至少选择一项'))
        } else {
          callback()
        }
      }
      return {
        loading: true,
        popVisible: false,
        defaultImg: '/static/default.png', // 默认加载失败图片
        ifDisable: false,
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now()
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }]
        },
        totalNumber: 0, // 當前字數
        maxlengthNum: 2000,
        serviceType: 'AF028', // 服务类型
        belongBrand: 'AF029', // 品牌code
        productServiceCode: 'AF027', // 产品与服务code
        otherServiceCode: 'AF025', // 增值服务code
        // belongBrand:'AF028',//品牌code
        optionsBelongBrand: [], // 品牌
        optionsProductService: [], // 产品与服务
        optionsOtherService: [], // 增值服务
        otherServiceCodeArr: [],
        productServiceCodeArr: [],
        serviceTypeArr: [],
        serverClassify: [],
        logisticsForm: {
          companyName: '', // 物流公司名称
          belongBrand: '', // 品牌
          foundTime: '', // 成立时间
          corporation: '', // 法人
          creditCode: '', // 营业执照
          isCollection: '1', // 代收货款
          companyFile: '', // 企业LOGO
          companyDes: '', // 公司简介
          serviceType: '', // 服务类型
          productServiceCode: '', // 产品与服务
          otherServiceCode: '', // 增值服务
          contactsName: '', // 联系人
          mobile: '', // 手机
          belongCityName: '', // 所在地
          address: '', // 详细地址
          contactsTel: '', // 电话
          qq: '',
          wechatCode: '', // 微信二维码
          businessLicenceFile: '', // 营业执照
          takeIdCardFile: '', // 身份证
          companyFacadeFile: '', // 档口
          longitude: '', // 经度
          latitude: '', // 纬度
          provinceCode: '', // 省code
          cityCode: '', // 市code
          areaCode: '' // 区code
        },
        sendData: {
          "provinceCode": "",
          "cityCode": "",
          "areaCode": "",
        },
        rules: {
          companyName: [
            {required: true, message: '请输入公司名称', trigger: 'blur'},
            {pattern: REGEX.CHINESE_AND_ENGLISH, message: '只能输入中文和字母~'}
          ],
          corporation: [
            {required: true, message: '请输入法人/负责人信息', trigger: 'blur'},
            {pattern: REGEX.CHINESE_AND_ENGLISH, message: '只能输入中文和字母~'}
          ],
          creditCode: [
            {validator: checkCreditCode, trigger: 'blur'}
          ],
          isCollection: [
            {required: true, message: '请选择是否代收货款', trigger: 'blur'}
          ],
          companyFile: [
            {required: true, message: '请上传公司LOGO', trigger: 'blur'}
          ],
          companyDes: [
            {required: true, message: '请完善公司简介内容', trigger: 'blur'},
            {min: 30, message: '公司简介，不能少于30个字', trigger: 'blur'}
          ],
          serviceTypeArr: [
            {required: true, validator: checkServiceTypeArr, trigger: 'blur'}
          ],
          productServiceCodeArr: [
            {required: true, validator: checkProductServiceCodeArr, trigger: 'change'}
          ],
          contactsName: [
            {required: true, message: '请输入联系人', trigger: 'change'}
          ],
          mobile: [
            {required: true, message: '请填写手机号码', trigger: 'blur'}
          ],
          contactsTel: [
            {pattern: /^\d{11}$/, message: '请填写正确的联系电话', trigger: 'blur'}],
          belongCityName: [
            {required: true, message: '请输入公司所在地', trigger: 'change'}
          ],
          address: [
            {required: true, message: '请输入详细地址', trigger: 'change'}
          ],
          businessLicenceFile: [
            {required: true, message: '请上传上传营业执照照片', trigger: 'blur'}
          ],
          takeIdCardFile: [
            {required: true, message: '负责人手持身份证正面照片', trigger: 'blur'}
          ],
          companyFacadeFile: [
            {required: true, message: '上传公司或者档口照片', trigger: 'blur'}
          ]
        }
      }
    },
    computed: {
      totalNum() {
        return this.logisticsForm.companyDes
      },
      disabled() {
        return this.logisticsForm.authStatusName
      }
    },
    watch: {
      totalNum: {
        handler(val, oldVal) {
          //    console.log(val.length)
          if (val) {
            this.totalNumber = val.length
          }
        },
        deep: true
      },
      disabled: {
        handler(newVal) {
          if (newVal === '待认证' || newVal === '已认证') {
            this.ifDisable = false
          } else {
            this.ifDisable = true
          }
        },
        deep: true
      }
    },
    mounted() {
      this.getMoreInformation()
    },
    methods: {
      regionChange(d) {
        console.log('data:', d)

        this.logisticsForm.address = ''
        this.logisticsForm.belongCityName = (!d.province && !d.city && !d.area && !d.town) ? '' : `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim()
        this.logisticsForm.provinceCode = d.province ? d.province.code : ''
        this.logisticsForm.cityCode = d.city ? d.city.code : ''
        this.logisticsForm.areaCode = d.area ? d.area.code : ''
        // this.sendData.provinceCode = d.province? d.province.name:''
        // this.sendData.cityCode = d.province? d.province.cityCode:''
        // this.sendData.areaCode = d.province? d.province.areaCode:''
        console.log(this.logisticsForm.provinceCode,this.logisticsForm.cityCode,this.logisticsForm.areaCode)
      },
      getValue(obj) {
        return obj ? obj.value : ''
      },
      getInfo(pos, name, info) {
        // info.name  info.pos
        console.log(pos, name, info)
        // this.logisticsForm.belongCityName = info.addressComponent.province +info.addressComponent.city+info.addressComponent.district;
        this.logisticsForm.address = name
        this.logisticsForm.longitude = pos.split(',')[0]
        this.logisticsForm.latitude = pos.split(',')[1]
        console.log(this.logisticsForm.address, this.logisticsForm.belongCityName)
        const name2 = this.logisticsForm.belongCityName
        if (this.logisticsForm.address.indexOf(name2.replace(/((北京|天津|重庆|上海)城区|市辖区|重庆郊县|省直辖县级行政区划)/, '')) === -1) {
          this.$message({
            type: 'info',
            message: '检测到详细地址中未包含公司所在地，请填写正确详细地址！'
          })
          this.logisticsForm.address = ''
          return
        }
      },
      showMap(name) {
        this.popVisible = true
        console.log(name)
      },
      getMoreInformation() {
        const res = getUserInfo()
        Promise.all([getDictionary(this.belongBrand), getDictionary(this.productServiceCode), getDictionary(this.otherServiceCode), getDictionary(this.serviceType), getLogisticsCompanyInfoByMobile(res.mobile)]).then(resArr => {
          this.loading = false
          console.log('resArr', resArr)
          this.optionsBelongBrand = resArr[0].data
          this.optionsProductService = resArr[1].data
          this.optionsOtherService = resArr[2].data
          this.serverClassify = resArr[3].data
          const data = resArr[4].data
          for (const i in data) {
            if (data[i] === null) {
              data[i] = ''
            }
          }
          this.logisticsForm = Object.assign({}, resArr[4].data, {isCollection: '1'})
          if (this.logisticsForm.authStatusName === '未认证' || this.logisticsForm.authStatusName === '认证不通过') {
            const text = '是一家业内领先的现代物流运输企业，我们致力于为国内的制造业客户和商贸流通业务提供专业且有价格竞争力的运输、仓储、包装、配送、代收代付等相关物流服务。我们目前处在迅猛发展阶段，以快速的增长速度在大力扩张货物运输业务范围，公司的专线运输范围基本覆盖华中，华东和华北三个大区的各省市县，承揽广州到湖南，湖北，上海，江苏，河南，北京，山东，天津全境的整车及零担业务，公司通过引入先进的供应链物流管理系统，已经建立起帮助客户贯穿生产、物流、仓储、代理商、销售商之间信息流、物流、商流、资金流的金色桥梁。\n\r        经过多年的发展，本公司目前拥有一支30多人的专业化的物流管理和从业人员队伍。公司管理层成员有大学专科以上学历、物流管理及相关专业本科及以上学历的优秀人才，公司全资拥有18辆斯堪尼亚、沃尔沃高端重卡，长期协议合作的干线和城配运输车辆超过890辆，车源丰富。公司自成立以来就一直秉承服务为先的宗旨，不断致力于物流运输网络的建设和社会资源的整合，现拥有广州至上海，河南，北京，湖北，山东，天津全境的往返成熟物流线路46条，单一线路基本可以实现一天发车2车以上，部分强势路线（比如广州-长沙，广州-北京等）可以一天发车4车以上。在专线运输时效和货物无损签收方面一直居于同业领先地位。\n\r        本公司在大力发展KA物流业务的同时，公司于陆续引入先进的28TMS物流管理系统、OA系统和CRM系统，运用多种物流智能硬件和现代物联网技术手段不断提升管理效率和降低运输成本。\n\r        随着公司的不断发展和长期积累的经验，公司优秀的物流服务深得广大客户的好评。本公司将以“高效快捷、客户至上、信誉第一”为经营理念，以“适价经营、质量保证”求发展以及经验丰富的管理人员和专业高素质的员工队伍，竭诚为客户持续提供优质满意的运输服务。\r\n\r\n        我们的承诺 ：给我们一份信任，还您百分百满意！'
            this.logisticsForm.companyDes = res.companyName + text
            // this.logisticsForm.companyDes.replaceAll('','&nbsp;')
          } else {
            if (this.logisticsForm.serviceType !== '') {
              this.serviceTypeArr = JSON.parse(this.logisticsForm.serviceType)
            } else {
              this.serviceTypeArr = []
            }

            if (this.logisticsForm.productServiceCode !== '') {
              this.productServiceCodeArr = JSON.parse(this.logisticsForm.productServiceCode)
            } else {
              this.productServiceCodeArr = []
            }

            if (this.logisticsForm.otherServiceCode !== '') {
              this.otherServiceCodeArr = JSON.parse(this.logisticsForm.otherServiceCode)
            } else {
              this.otherServiceCodeArr = []
            }
          }
          // this.loading = false;
        }).catch(err => {
          console.log(err)
          this.$message({
            type: 'info',
            message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err.text
          })
        })
      },
      // 完善信息
      completeInfo() {
        if (this.logisticsForm.belongBrandCode) {
          this.logisticsForm.belongBrand = this.optionsBelongBrand.find(item => item.code === this.logisticsForm.belongBrandCode)['name']
        }

        const serviceTypeName = []
        const productServiceName = []
        const otherServiceName = []

        this.serviceTypeArr.forEach(el => {
          this.serverClassify.forEach(item => {
            if (el === item.code) {
              serviceTypeName.push(item.name)
            }
          })
        })

        this.productServiceCodeArr.forEach(el => {
          this.optionsProductService.forEach(item => {
            if (el === item.code) {
              productServiceName.push(item.name)
            }
          })
        })

        this.otherServiceCodeArr.forEach(el => {
          this.optionsOtherService.forEach(item => {
            if (el === item.code) {
              otherServiceName.push(item.name)
            }
          })
        })

        // 服务类型
        this.logisticsForm.serviceType = JSON.stringify(this.serviceTypeArr)
        this.logisticsForm.serviceTypeName = JSON.stringify(serviceTypeName)
        // 产品与服务
        this.logisticsForm.productServiceCode = JSON.stringify(this.productServiceCodeArr)
        this.logisticsForm.productService = JSON.stringify(productServiceName)
        // 增值服务
        this.logisticsForm.otherServiceCode = JSON.stringify(this.otherServiceCodeArr)
        this.logisticsForm.otherService = JSON.stringify(otherServiceName)
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          this.completeInfo()
          const form = Object.assign({}, this.logisticsForm, {authStatus: 'AF0010402', authStatusName: '待认证'})
          console.log(form,'submitForm')
          if (valid) {
            identifyCarrier(form).then(res => {
              console.log(res)
              this.getMoreInformation()
              this.clear()
            }).catch(err => {
              this.$message({
                type: 'info',
                message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err.text
              })
            })
          } else {
            this.$message({
              type: 'info',
              message: '请填写完整信息'
            })
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      clear() {
        this.optionsBelongBrand = []// 品牌
        this.optionsProductService = []// 产品与服务
        this.optionsOtherService = []// 增值服务
        this.otherServiceCodeArr = []
        this.productServiceCodeArr = []
        this.serviceTypeArr = []
        this.serverClassify = []
      }

    }

  }
</script>

<style type="text/css" lang="scss">

  .carrierIdentification {

  }

  .carrierIdentification .el-form .information .textarea .el-form-item__content {
    .el-textarea {
      .el-textarea__inner {
        padding-bottom: 15px;
      }
    }
  }

  .carrierIdentification .el-form .information .textarea .el-form-item__content span {
    bottom: 22px;
  }

  .carrierIdentification .el-form-item .el-form-item__content .v-region .v-dropdown-container {
    top: 35px !important;
    left: 0px !important;
  }

  .carrierIdentification .el-form-item .el-form-item__content .v-region .caller-container, .carrierIdentification .el-form-item .el-form-item__content .v-region {
    width: 100%;
  }

</style>
