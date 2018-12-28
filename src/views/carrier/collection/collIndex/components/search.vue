<template>
  <el-form label-width="140px" :inline="true" size="mini" label-position="right" :model="searchForm"
           class="orderlist-search staff_searchinfo clearfix lll-search">
    <div class="search_warrper searchInformation" v-if="isAllSupplyl">
      <el-form-item label="出发地：">
        <vregion :ui="true" @values="orderStartAddressChange" class="form-control">
          <el-input v-model="searchForm.isAllSupplyl.orderStartAddress" placeholder="请选择出发地" clearable></el-input>
        </vregion>
      </el-form-item>
      <el-form-item label="到达地：">
        <vregion :ui="true" @values="orderEndAddressChange" class="form-control">
          <el-input v-model="searchForm.isAllSupplyl.orderEndAddress" placeholder="请选择到达地"></el-input>
        </vregion>
      </el-form-item>
      <el-form-item label="货源类型：">
        <el-select v-model="searchForm.isAllSupplyl.orderClass" clearable>
          <el-option label="全部" value=''></el-option>
          <el-option label="单次急发货源" value='0'></el-option>
          <el-option label="长期稳定货源" value='1'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="货物名称：">
        <el-input v-model="searchForm.isAllSupplyl.goodsName" clearable auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="公司名：">
        <el-input v-model="searchForm.isAllSupplyl.companyName" clearable auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="发货人：">
        <el-input v-model="searchForm.isAllSupplyl.orderContacts" clearable auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="发货人手机：">
        <el-input v-model="searchForm.isAllSupplyl.orderMobile" clearable auto-complete="off"></el-input>
      </el-form-item>
    </div>
    <div class="search_warrper searchInformation" v-if="isSpacialLine">
      <el-form-item label="出发地：">
        <!--<el-input v-model="searchForm.isSpacialLine.rangeStartLocation" :maxlength="50" auto-complete="off"></el-input>-->
        <vregion :ui="true" @values="rangeStartLocationChange" class="form-control">
          <el-input v-model="searchForm.isSpacialLine.rangeStartLocation" placeholder="请选择出发地"></el-input>
        </vregion>
      </el-form-item>
      <el-form-item label="到达地：">
        <vregion :ui="true" @values="rangeEndLocationChange" class="form-control">
          <el-input v-model="searchForm.isSpacialLine.rangeEndLocation" placeholder="请选择到达地"></el-input>
        </vregion>
      </el-form-item>
      <el-form-item label="公司名：">
        <el-input v-model="searchForm.isSpacialLine.companyName" clearable auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="联系人：">
        <el-input v-model="searchForm.isSpacialLine.rangeContacts" clearable auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号：">
        <el-input v-model="searchForm.isSpacialLine.rangeMobile" clearable auto-complete="off"></el-input>
      </el-form-item>
    </div>
    <div class="search_warrper searchInformation" v-if="isPhysicalDis" style="margin-right: 250px;">
      <el-form-item label="公司名：">
        <el-input v-model="searchForm.isPhysicalDis.companyName" clearable auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="所在地：">
        <!--<el-input v-model="searchForm.isPhysicalDis.belongCityName" :maxlength="50" auto-complete="off"></el-input>-->
        <vregion :ui="true" @values="belongCityNameChange" class="form-control">
          <el-input v-model="searchForm.isPhysicalDis.belongCityName" placeholder="请选择出发地"></el-input>
        </vregion>
      </el-form-item>
      <el-form-item label="联系人：">
        <el-input v-model="searchForm.isPhysicalDis.contactsName" clearable auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号：">
        <el-input v-model="searchForm.isPhysicalDis.mobile" clearable auto-complete="off"></el-input>
      </el-form-item>
    </div>
    <div class="search_warrper searchInformation" v-if="isCarSoure">
      <el-form-item label="出发地：">
        <vregion :ui="true" @values="carStrartAddressChange" class="form-control">
          <el-input v-model="searchForm.isCarSoure.carStrartAddress" placeholder="请选择出发地"></el-input>
        </vregion>
      </el-form-item>
      <el-form-item label="到达地：">
        <vregion :ui="true" @values="carEndAddressChange" class="form-control">
          <el-input v-model="searchForm.isCarSoure.carEndAddress" placeholder="请选择到达地"></el-input>
        </vregion>
      </el-form-item>
      <el-form-item label="车辆类型：">
        <selectType v-model="searchForm.isCarSoure.carType" type="AF018" clearable size="mini"></selectType>
      </el-form-item>
      <el-form-item label="车源类型：">
        <el-select v-model="searchForm.isCarSoure.carSourceType">
          <el-option label="全部" value=''></el-option>
          <el-option label="本地车" value='AF01802'></el-option>
          <el-option label="回程车" value='AF01801'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系人：">
        <el-input v-model="searchForm.isCarSoure.carBelongDriver" clearable auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号：">
        <el-input v-model="searchForm.isCarSoure.carPhone" :maxlength="50" auto-complete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="常驻地：">
        <vregion :ui="true" @values="usualPlaceChange" class="form-control">
          <el-input v-model="searchForm.isCarSoure.usualPlace" placeholder="请选择常驻地"></el-input>
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
        searchObj:{},
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
            "isLongCar": "",
            provinceCode: '',
            cityCode: '',
            areaCode: '',
          }
        }
      }
    },
    methods: {
      onSubmit() {
        // let searchObj
        if (this.isAllSupplyl) {
          this.searchObj = Object.assign({}, this.searchForm.isAllSupplyl)
        }
        if (this.isSpacialLine) {
          this.searchObj = Object.assign({}, this.searchForm.isSpacialLine)
        }
        if (this.isPhysicalDis) {
          this.searchObj = Object.assign({}, this.searchForm.isPhysicalDis)
        }
        if (this.isCarSoure) {
          this.searchObj = Object.assign({}, this.searchForm.isCarSoure)
        }
        // console.log('this.searchForm2:', this.searchForm, JSON.stringify(searchObj))
        this.$emit('change', this.searchObj)
      },
      changeVal(type) {
        console.log(type);
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
        this.onSubmit()
      },
      orderStartAddressChange(d) {
        this.searchForm.isAllSupplyl.orderStartAddress = (!d.province && !d.city && !d.area && !d.town) ? '' : `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim()
      },
      orderEndAddressChange(d) {
        this.searchForm.isAllSupplyl.orderEndAddress = (!d.province && !d.city && !d.area && !d.town) ? '' : `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim()
      },
      rangeStartLocationChange(d) {
        this.searchForm.isSpacialLine.rangeStartLocation = (!d.province && !d.city && !d.area && !d.town) ? '' : `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim()
      },
      rangeEndLocationChange(d) {
        this.searchForm.isSpacialLine.rangeEndLocation = (!d.province && !d.city && !d.area && !d.town) ? '' : `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim()
      },
      belongCityNameChange(d) {
        this.searchForm.isPhysicalDis.belongCityName = (!d.province && !d.city && !d.area && !d.town) ? '' : `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim()
      },
      carEndAddressChange(d) {
        this.searchForm.isCarSoure.carEndAddress = (!d.province && !d.city && !d.area && !d.town) ? '' : `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim()
      },
      carStrartAddressChange(d) {
        this.searchForm.isCarSoure.carStrartAddress = (!d.province && !d.city && !d.area && !d.town) ? '' : `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim()
      },
      usualPlaceChange(d) {
        this.searchForm.isCarSoure.usualPlace = (!d.province && !d.city && !d.area && !d.town) ? '' : `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim()
      },
      getValue(obj) {
        return obj ? obj.value : ''
      },
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

  .lll-search {
    > .searchInformation {
      .el-form-item {
        margin-bottom: 20px;
        .el-form-item__content {
          .v-region {
            width: 100%;
            .caller-container {
              width: 100%;
            }
            .v-dropdown-container {
              top: 35px !important;
              left: 0px !important;
            }
          }
        }
      }

    }

  }
</style>
