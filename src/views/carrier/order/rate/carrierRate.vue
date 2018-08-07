<template>
    <div class="orderRate identification">
        <el-form :model="logisticsForm" ref="ruleForm" label-width="110px" class="demo-ruleForm">
            <div class="searchInformation information">
                <el-form-item label="订单号：" prop="orderSerial">
                    <el-input v-model="logisticsForm.orderSerial">
                    </el-input>
                </el-form-item>
                <el-form-item label="评价时间：" prop="address" class="timechoose">
                    <el-date-picker
                        v-model="time"
                        type="datetimerange"
                        :picker-options="pickerOptions2"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="right"
                        :default-time="['00:00:00', '23:59:59']"
                        value-format="timestamp">
                    </el-date-picker>
                </el-form-item>
                <el-form-item class="btnChoose" style="margin-left:0;">
                    <el-button type="primary" @click="handleSearch">搜索</el-button>
                    <el-button type="primary" @click="clearSearch">清空</el-button>
                </el-form-item>
            </div>
            <div class="information" style="height:100%">
                <div style="height:100%">
                    <el-table
                    :data="tableData"
                    ref="multipleTable"
                    stripe
                    border
                    style="width: 100%;">
                        <el-table-column
                            fixed
                            label="序号"
                            type="index"
                            width="80">
                        </el-table-column>
                        <el-table-column
                            fixed
                            label="订单编号"
                            width="250">
                                <template slot-scope="scope">
                                        {{scope.row.ateOrderSerial ? scope.row.ateOrderSerial : scope.row.aseOrderSerial}}
                                </template>
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="我对货主的评价"
                            >
                            <el-table-column
                            prop="name"
                            label="评价信用"
                            width="250">
                                 <template slot-scope="scope">
                                     <div v-if="scope.row.aseOrderSerial">
                                        <p>货物包装：{{scope.row.aseGoodsStarLevel}}</p>
                                        <p>付款及时：{{scope.row.asePayStarLevel}}</p>
                                        <p>装卸安排：{{scope.row.aseDockStarLevel}}</p>
                                     </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="aseEvaluationDes"
                            label="评价内容"
                            width="300">
                            </el-table-column>
                            <el-table-column
                            prop="aseEvaluationName"
                            label="评价人"
                            width="150">
                            </el-table-column>
                            <el-table-column
                            prop="aseEvaluationTime"
                            label="评价时间"
                            width="200">
                            </el-table-column>
                            <el-table-column
                            prop="aseReplyName"
                            label="回复人"
                            width="150">
                            </el-table-column>
                             <el-table-column
                            prop="aseReplyTime"
                            label="回复时间"
                            width="200">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column
                            label="货主对我的评价"
                            >
                            <el-table-column
                            label="评价信用"
                            width="250">
                                <template slot-scope="scope">
                                    <div v-if="scope.row.ateOrderSerial">
                                        <p>服务价格：{{scope.row.ateServerPriceStarLevel}}</p>
                                        <p>服务质量：{{scope.row.ateServerQualityStarLevel}}</p>
                                        <p>运输时效：{{scope.row.ateTransportAgingStarLevel}}</p>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="ateEvaluationDes"
                            label="评价内容"
                            width="300">
                            </el-table-column>
                            <el-table-column
                            prop="ateEvaluationName"
                            label="评价人"
                            width="150">
                            </el-table-column>
                            <el-table-column
                            prop="ateEvaluationTime"
                            label="评价时间"
                            width="200">
                            </el-table-column>
                            <el-table-column
                            prop="ateReplyName"
                            label="回复人"
                            width="150">
                            </el-table-column>
                             <el-table-column
                            prop="ateReplyTime"
                            label="回复时间"
                            width="200 ">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column 
                            fixed="right"
                            label="操作"
                            width="120"
                            >
                                <template slot-scope="scope">
                                    <!-- <el-button-group> -->
                                        <el-button @click="handleEdit(scope.row)" v-if="scope.row.ateEvaluationName && !scope.row.ateReplyName" type="primary" size="mini">评价回复</el-button>
                                        <el-button @click="handleEdit(scope.row)" v-else type="primary" size="mini">评价详情</el-button>
                                    <!-- </el-button-group> -->
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
import { CarrierOrderRate } from '@/api/carrier/rate.js'
import Pager from '@/components/Pagination/index'

export default {
    props: {
		isvisible: {
			type: Boolean,
			default: false
		}
	},
    components:{
        Pager
    },
    data() {
        return {
            totalCount:0,
            page:1,
            pagesize:20,
            logisticsForm: {
                orderSerial:'',//订单流水号
                endTime:'',
                startTime:''
            },
            time:[],
            tableData: [],
            pickerOptions2: {
                shortcuts: [{
                    text: '最近三天',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
                    picker.$emit('pick', [start, end]);
                    }
                },{
                    text: '最近一周',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                    }
                }]
            },
        };
    },
    watch: {
        isvisible: {
            handler(newVal, oldVal) {
                if(newVal){
                    this.firstblood();
                }
            },
            // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
            immediate: true
        }
    },
    mounted(){
        //this.firstblood();
    },  
    methods: {
        handlePageChange(obj) {
            this.page = obj.pageNum
            this.pagesize = obj.pageSize
        },
        firstblood(){
            CarrierOrderRate(this.page,this.pagesize,this.logisticsForm).then(res=>{
                console.log(res)
                this.tableData = res.data.list;
                this.totalCount = res.data.totalCount;
            })
        },
        clearSearch(){
            this.logisticsForm.startTime = '';
            this.logisticsForm.endTime = '';
            this.time = [];
            this.$refs.ruleForm.resetFields();
            this.firstblood();
        },
        //搜索
        handleSearch(){
            if(this.time.length != 0){
                this.logisticsForm.startTime = this.time[0];
                this.logisticsForm.endTime = this.time[1];
            }
            this.firstblood();
            // console.log(this.time)
        },
        //修改
        handleEdit(row) {
            console.log(row);
            this.$router.push({name: '评价详情',query:{ orderSerial:row.ateOrderSerial ? row.ateOrderSerial : row.aseOrderSerial}});
        },

    },
  
}
</script>

<style type="text/css" lang="scss">
    .orderRate{
        .el-form{
            .searchInformation{
                .timechoose .el-form-item__content{
                    width: 350px;
                    .el-date-editor{
                        height: 28px;
                        line-height: 28px;
                        padding: 5px;
                        .el-range-separator{
                            width: 8%;
                            line-height: 18px;
                        }
                        .el-input__icon {
                            line-height: 10px;
                        }
                    }
                }

            }

            .el-table{
                td{
                    .cell{
                        p{
                            margin: 5px 0;
                        }
                    }
                }
            }
        }
    }
</style>
