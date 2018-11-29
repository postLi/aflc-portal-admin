<template>
  <el-form label-width="140px" :inline="true" size="mini" label-position="right" :model="searchForm"
           class="orderlist-search staff_searchinfo clearfix">
    <div class="search_warrper" v-if="isAllSupplyl">
      <el-form-item label="出发地：">
        <el-input v-model="searchForm.isAllSupplyl.orderStartAddress" :maxlength="50" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="到达地：">
        <el-input v-model="searchForm.isAllSupplyl.orderEndAddress" :maxlength="50" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="货源类型：">
        <el-select v-model="searchForm.isAllSupplyl.orderClass">
          <el-option label="全部" value=''></el-option>
          <el-option label="单次急发货源" value='0'></el-option>
          <el-option label="长期稳定货源" value='1'></el-option>
        </el-select>
        <!--<el-input v-model="searchForm.orderSerialOrGoodsName" :maxlength="50" auto-complete="off"></el-input>-->
      </el-form-item>
      <el-form-item label="货物名称：">
        <el-input v-model="searchForm.isAllSupplyl.goodsName" :maxlength="50" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="公司名：">
        <el-input v-model="searchForm.isAllSupplyl.companyName" :maxlength="50" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="发货人：">
        <el-input v-model="searchForm.isAllSupplyl.orderContacts" :maxlength="50" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="发货人手机：">
        <el-input v-model="searchForm.isAllSupplyl.orderMobile" :maxlength="50" auto-complete="off"></el-input>
      </el-form-item>
    </div>
    <div class="search_warrper" v-if="isSpacialLine">
      <el-form-item label="出发地：">
        <el-input v-model="searchForm.isSpacialLine.rangeStartLocation" :maxlength="50" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="到达地：">
        <el-input v-model="searchForm.isSpacialLine.rangeEndLocation" :maxlength="50" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="公司名：">
        <el-input v-model="searchForm.isSpacialLine.companyName" :maxlength="50" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="联系人：">
        <el-input v-model="searchForm.isSpacialLine.rangeContacts" :maxlength="50" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号：">
        <el-input v-model="searchForm.isSpacialLine.rangeMobile" :maxlength="50" auto-complete="off"></el-input>
      </el-form-item>
    </div>
    <div class="search_warrper" v-if="isPhysicalDis" style="margin-right: 250px;">
      <el-form-item label="公司名：">
        <el-input v-model="searchForm.isPhysicalDis.companyName" :maxlength="50" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="所在地：">
        <el-input v-model="searchForm.isPhysicalDis.belongCityName" :maxlength="50" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="联系人：">
        <el-input v-model="searchForm.isPhysicalDis.contactsName" :maxlength="50" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号：">
        <el-input v-model="searchForm.isPhysicalDis.mobile" :maxlength="50" auto-complete="off"></el-input>
      </el-form-item>
    </div>
    <div class="search_warrper" v-if="isCarSoure">
      <el-form-item label="出发地：">
        <el-input v-model="searchForm.isCarSoure.carStrartAddress" :maxlength="50" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="到达地：">
        <el-input v-model="searchForm.isCarSoure.carEndAddress" :maxlength="50" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="车辆类型：">
        <selectType v-model="searchForm.isCarSoure.carType" type="AF018" clearable size="mini"></selectType>
        <!--<el-select v-model="searchForm.isCarSoure.carType">-->
          <!--<el-option label="全部" value=''></el-option>-->
          <!--<el-option label="单次急发货源" value='0'></el-option>-->
          <!--<el-option label="长期稳定货源" value='1'></el-option>-->
        <!--</el-select>-->
        <!--<el-input v-model="searchForm.isCarSoure.carType" :maxlength="50" auto-complete="off"></el-input>-->
      </el-form-item>
      <el-form-item label="车源类型：">
        <el-select v-model="searchForm.isCarSoure.carSourceType">
          <el-option label="全部" value=''></el-option>
          <el-option label="本地车" value='AF01802'></el-option>
          <el-option label="回程车" value='AF01801'></el-option>
        </el-select>
        <!--<el-input v-model="searchForm.isCarSoure.orderSerialOrGoodsName" :maxlength="50" auto-complete="off"></el-input>-->
      </el-form-item>
      <el-form-item label="联系人：">
        <el-input v-model="searchForm.isCarSoure.carBelongDriver" :maxlength="50" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号：">
        <el-input v-model="searchForm.isCarSoure.carPhone" :maxlength="50" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="常驻地：">
        <!--<vregion></vregion>-->
        <!--<el-input v-model="searchForm.isCarSoure.usualPlace" :maxlength="50" auto-complete="off" v-if="unable"></el-input>-->


        <!--<el-input v-model="searchForm.isCarSoure.usualPlace" v-if="unable" :disabled="unable"></el-input>-->

        <!--<vregion :ui="true" @values="regionChangeStart" :ifAera = 'true' class="form-control" >-->
          <!--<el-input v-model="searchForm.isCarSoure.usualPlace" placeholder="请选择出发地" ></el-input>-->
        <!--</vregion>-->
        <vregion :ui="true" @values="regionChange" class="form-control">
          <el-input v-model="searchForm.isCarSoure.usualPlace"  placeholder="请选择出发地"></el-input>
        </vregion>


      </el-form-item>
      <el-form-item label="即时/长期：">
        <el-select v-model="searchForm.isCarSoure.isLongCar">
          <el-option label="全部" value=''></el-option>
          <el-option label="即时车源" value='1'></el-option>
          <el-option label="长期车源" value='0'></el-option>
        </el-select>

      </el-form-item>
    </div>
    <el-form-item class="staff_searchinfo--btn">
      <el-button size="mini" icon="el-icon-search" type="primary" @click="onSubmit">搜索</el-button>
      <el-button size="mini" icon="el-icon-close" type="info" @click="clearForm" plain>重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import vregion from '@/components/vregion/Region.vue'
  // import vregion from '@/components/vregion/Region'
  import selectType from '@/components/selectType/index'
  export default {
    name: "search",
    components: {
      vregion,
      selectType
    },
    props: {
      isall: {
        type: Boolean,
        default: false
      },
      isAllSupplyl: {
        type: Boolean,
        default: false
      },
      isSpacialLine: {
        type: Boolean,
        default: false
      },
      isPhysicalDis: {
        type: Boolean,
        default: false
      },
      isCarSoure: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        unable: false,
        searchForm: {
          isAllSupplyl: {
            "orderStartAddress": "",//货源
            "orderEndAddress": "",
            "orderClass": "",
            // "orderClassName": "",
            "goodsName": "",
            "companyName": "",
            "orderContacts": "",
            "orderMobile": ""//货源
          },
          isSpacialLine: {
            "rangeStartLocation": "",
            "rangeEndLocation": "",
            "companyName": "",
            "rangeContacts": "",
            "rangeMobile": ""
          },
          isPhysicalDis: {
            "companyName": "",
            "belongCityName": "",
            "contactsName": "",
            "mobile": ""
          },
          isCarSoure: {
            "carStrartAddress": "",
            "carEndAddress": "",
            "carType": "",
            "carTypeName": "",
            "carSourceType": "",
            "carSourceTypeName": "",
            "carBelongDriver": "",
            "carPhone": "",
            "usualPlace": "",
            "isLongCar": ""
          }
        }
      }
    },
    methods: {
      ifProvice(type) {
        console.log('ifProvice', type)
        // this.$message({
        //   type: 'info',
        //   message: '至少选择到市级范围'
        // })
        // if (type === 'startLocation') {
        //   this.ruleForm.startLocation = ''
        //   return
        // } else {
        //   this.ruleForm.endLocation = ''
        //   return
        // }
      },
      regionChange(d) {
        console.log('data:', d)
        // this.logisticsForm.address = ''
        this.searchForm.isCarSoure.usualPlace = (!d.province && !d.city && !d.area && !d.town) ? '' : `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim()
        this.searchForm.isCarSoure.provinceCode = d.province ? d.province.code : ''
        this.searchForm.isCarSoure.cityCode = d.city ? d.city.code : ''
        this.searchForm.isCarSoure.areaCode = d.area ? d.area.code : ''
        // console.log(this.logisticsForm.provinceCode,this.logisticsForm.cityCode,this.logisticsForm.areaCode)
      },
      // regionChangeStart(d) {
      //   console.log('data:',d)
      //   this.searchForm.isCarSoure.usualPlace = (!d.province && !d.city && !d.area && !d.town) ? '' : `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim()
      //   // startLocationCode
      //   // console.log('regionChangeStart', d, this.ruleForm.startLocation)
      //   this.searchForm.isCarSoure.usualPlace = d.province ? d.province.name : ''
      //   // this.ruleForm.startCity = d.city ? d.city.name : ''
      //   // this.ruleForm.startArea = d.area ? d.area.name : ''
      //   // const obj = d.area || d.city || d.province
      //   // this.ruleForm.startLocationCode = obj.code
      // },
      onSubmit() {
        let searchObj
        if (this.isAllSupplyl) {
          searchObj = Object.assign({}, this.searchForm.isAllSupplyl)
        }
        if (this.isSpacialLine) {
          searchObj = Object.assign({}, this.searchForm.isSpacialLine)
        }
        if (this.isPhysicalDis) {
          searchObj = Object.assign({}, this.searchForm.isPhysicalDis)
        }
        if (this.isCarSoure) {
          searchObj = Object.assign({}, this.searchForm.isCarSoure)
        }
        // console.log('this.searchForm2:', this.searchForm, JSON.stringify(searchObj))
        this.$emit('change', searchObj)
      },
      clearForm() {
        this.searchForm = {
          isAllSupplyl: {
            "orderStartAddress": "",//货源
            "orderEndAddress": "",
            "orderClass": "",
            // "orderClassName": "",
            "goodsName": "",
            "companyName": "",
            "orderContacts": "",
            "orderMobile": ""//货源
          },
          isSpacialLine: {
            "rangeStartLocation": "",
            "rangeEndLocation": "",
            "companyName": "",
            "rangeContacts": "",
            "rangeMobile": ""
          },
          isPhysicalDis: {
            "companyName": "",
            "belongCityName": "",
            "contactsName": "",
            "mobile": ""
          },
          isCarSoure: {
            "carStrartAddress": "",
            "carEndAddress": "",
            "carType": "",
            "carTypeName": "",
            "carSourceType": "",
            "carSourceTypeName": "",
            "carBelongDriver": "",
            "carPhone": "",
            "usualPlace": "",
            "isLongCar": ""
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  .orderlist-search {
    display: flex;

    .staff_searchinfo--btn {
      flex: 0 0 170px;
      align-self: flex-end;
      display: flex;

    }

    .el-form-item {
      margin-right: 0;
      margin-bottom: 10px;
    }

    .el-input--suffix .el-input__inner {
      padding-right: 15px;
    }
  }
</style>
