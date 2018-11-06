<template>
    <div class="Complaint identification">
        <el-form :model="logisticsForm" ref="ruleForm" label-width="110px" class="demo-ruleForm">
            <div class="carrierTitle">
                <div class="realname">
                    <h2>投诉管理</h2>
                </div>
            </div>
            <div class="searchInformation information">
                <el-form-item label="订单号：" prop="orderSerial">
                    <el-input v-model="logisticsForm.orderSerial">
                    </el-input>
                </el-form-item>
                <el-form-item label="投诉编号：" prop="workSerial">
                    <el-input v-model="logisticsForm.workSerial">
                    </el-input>
                </el-form-item>
                <el-form-item label="投诉类型：" maxlength="18"  prop="complainType">
                    <el-select v-model="logisticsForm.complainType" clearable placeholder="请选择">
                        <el-option
                        v-for="item in OptionsComplainType"
                        :key="item.id"
                        :label="item.name"
                        :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="投诉状态：" maxlength="18"  prop="complainStatus">
                    <el-select v-model="logisticsForm.complainStatus" clearable placeholder="请选择">
                        <el-option
                        v-for="item in  OptionscomplainStatus"
                        :key="item.id"
                        :label="item.name"
                        :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="btnChoose" style="margin-left:0;">
                    <el-button type="primary" @click="handleSearch">搜索</el-button>
                    <el-button type="primary" @click="clearSearch">重置</el-button>
                </el-form-item>
            </div>
            <div class="information" style="height:75%">
                <div style="height:100%">
                    <el-table
                    :data="tableData"
                    ref="multipleTable"
                    stripe
                    border
                    style="width: 100%;height:100%;">
                        <el-table-column
                            fixed
                            label="序号"
                            type="index"
                            width="80">
                        </el-table-column>
                        <el-table-column
                            fixed
                            prop="orderSerial"
                            label="订单号"
                            width="300">
                        </el-table-column>
                        <el-table-column
                            fixed
                            prop="workSerial"
                            label="工单编号"
                            width="300">
                        </el-table-column>
                        <el-table-column
                            prop="complainTypeName"
                            label="投诉类型"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="complainTime"
                            label="投诉时间"
                            width="250">
                        </el-table-column>
                        <el-table-column
                            prop="complainStatusName"
                            label="投诉状态" 
                            width="200">
                        </el-table-column>
                        <el-table-column 
                            
                            prop="address"
                            label="操作"
                            >
                                <template slot-scope="scope">
                                    <el-button-group>
                                        <el-button @click="handleEdit(scope.row)" type="primary" size="mini">投诉详情</el-button>
                                    </el-button-group>
                                </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>  
            <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" /></div> </div>    
        </el-form>
    </div>
</template>

<script>

import '@/styles/identification.scss'
import { getDictionary,getLogisticsCompanyInfoByMobile, } from '@/api/common.js'
import { getPointNetwork,PointNetworkStatus,deletePointNetwork } from '@/api/carrier/index.js'
import { listShipperComplain } from '@/api/consignor/Complaint.js'


import Pager from '@/components/Pagination/index'

export default {
    components:{
        Pager
    },
    data() {
        return {
            complainType:"AF041",
            complainStatus:'AF040',
            totalCount:0,
            page:1,
            pagesize:20,
            logisticsForm: {
                orderSerial: '',//定单号
                workSerial: '',//投诉编号
                complainType: '',//投诉类型：
                complainStatus: '',//投诉状态
                platformOrderType:'1',
            },
            tableData: [],
            OptionsComplainType:[
                {
                    code:'',
                    name:'全部'
                }
            ],
            OptionscomplainStatus:[
                {
                    code:'',
                    name:'全部'
                }
            ],
        };
    },
    watch:{

    },
    mounted(){
        this.firstblood();
    },  
    methods: {
        handlePageChange(obj) {
            this.page = obj.pageNum
            this.pagesize = obj.pageSize
        },
        firstblood(){
            listShipperComplain(this.page,this.pagesize,this.logisticsForm).then(res=>{
                console.log(res)
                this.tableData = res.data.list;
                this.totalCount = res.data.totalCount;
            })
            getDictionary(this.complainType).then(res => {
                console.log(res)
                res.data.forEach(el => {
                    this.OptionsComplainType.push(el)
                })
            })
            getDictionary(this.complainStatus).then(res => {
                console.log(res)
                res.data.forEach(el => {
                    this.OptionscomplainStatus.push(el)
                })
            })

        },
        clearSearch(){
            this.$refs.ruleForm.resetFields();
            this.firstblood();
        },
        //搜索
        handleSearch(){
            this.firstblood()
        },
        //修改
        handleEdit(row) {
            console.log(row);
            this.$router.push({name: '投诉详情',query:{ orderSerial:row.orderSerial}});
        },
        
    },
  
}
</script>

<style type="text/css" lang="scss">
    .Complaint{
        
    }
</style>
