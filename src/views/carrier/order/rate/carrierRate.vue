<template>
    <div class="orderRate identification">
        <el-form :model="logisticsForm" ref="ruleForm" label-width="110px" class="demo-ruleForm">
            <div class="searchInformation information">
                <el-form-item label="订单号：" prop="pointName">
                    <el-input v-model="logisticsForm.pointName">
                    </el-input>
                </el-form-item>
                <el-form-item label="货物类型：" prop="address" class="timechoose">
                    <el-date-picker
                        v-model="logisticsForm.address"
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
            <div class="information" style="height:82%">
                <div style="height:100%">
                    <el-table
                    :data="tableData"
                    ref="multipleTable"
                    stripe
                    border
                    height="100%"
                    style="width: 100%">
                        <el-table-column
                            fixed
                            label="序号"
                            type="index"
                            width="80">
                        </el-table-column>
                        <el-table-column
                            fixed
                            prop="pointName"
                            label="订单编号"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="我对货主的评价"
                            width="400">
                            <el-table-column
                            prop="name"
                            label="评价信用"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            label="评价内容"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            label="评价人"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            label="评价时间"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            label="回复人"
                            width="180">
                            </el-table-column>
                             <el-table-column
                            prop="name"
                            label="回复时间"
                            width="180">
                            </el-table-column>
                        </el-table-column>
                            <el-table-column
                            prop="address"
                            label="货主对我的评价"
                            width="400">
                            <el-table-column
                            prop="name"
                            label="评价信用"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            label="评价内容"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            label="评价人"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            label="评价时间"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            label="回复人"
                            width="180">
                            </el-table-column>
                             <el-table-column
                            prop="name"
                            label="回复时间"
                            width="180">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column 
                            fixed="right"
                            prop="address"
                            label="操作"
                            >
                                <template slot-scope="scope">
                                    <el-button-group>
                                        <el-button @click="handleEdit(scope.row)" type="primary" size="mini">修改</el-button>
                                        <el-button @click="handleDelete(scope.row)" type="danger" size="mini">删除</el-button>
                                        <el-button @click="handleStatus(scope.row)" :type="scope.row.pointStatus == 0 ? 'primary' : 'info'" size="mini">{{scope.row.pointStatus == 0 ? '启用' : '禁用'}}</el-button>
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
import { getPointNetwork,PointNetworkStatus,deletePointNetwork } from '@/api/carrier/index.js'
import Pager from '@/components/Pagination/index'

export default {
    components:{
        Pager
    },
    data() {
       
        return {
            totalCount:0,
            page:1,
            pagesize:20,
            logisticsForm: {
                pointName: '',//网点名称
                address: '',//网点详细地址
                name: '',//联系人
                mobile: '',//手机号
                telNum: '',//固定电话
            },
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
            getPointNetwork(this.page,this.pagesize,this.logisticsForm).then(res=>{
                console.log(res)
                this.tableData = res.data.list;
                this.totalCount = res.data.totalCount;
            })
        },
        clearSearch(){
            this.$refs.ruleForm.resetFields();
            this.firstblood();
        },
        //搜索
        handleSearch(){
            this.firstblood();
        },
        //修改
        handleEdit(row) {
            console.log(row);
            this.$router.push({name: '发布我的网点',params:{ data:row}});
        },
        //删除网点
        handleDelete(row) {
            this.$confirm('确定要删除'+ row.pointName +' 该网点名吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                deletePointNetwork(row.id).then(res => {
                    this.firstblood();
                }).catch(err => {
                    this.$message({
                        type: 'info',
                        message: '操作失败，原因：' + errorInfo ? errorInfo : err.text
                    })
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                })
            })
        },
        //更改状态
        handleStatus(row) {
            console.log(row);
            PointNetworkStatus(row.id).then(res => {
                console.log(res)
                this.firstblood();
            }).catch(err=>{
                this.$message({
                    type: 'info',
                    message: '操作失败，原因：' + err.text ? err.text : err
                })
            })
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
        }
    }
</style>
