<template>
    <div class="TransportRange identification">
        <el-form :model="logisticsForm" ref="ruleForm" label-width="110px" class="demo-ruleForm">
            <div class="carrierTitle">
                <div class="realname">
                    <h2>管理我的网点</h2>
                </div>
            </div>
            <div class="searchInformation information">
                <el-form-item label="出发地：" prop="name">
                    <el-input v-model="logisticsForm.name">
                    </el-input>
                </el-form-item>
                <el-form-item label="到达地：" prop="address">
                    <el-input v-model="logisticsForm.address">
                    </el-input>
                </el-form-item>
                <el-form-item class="btnChoose" style="margin-left:20px;">
                    <el-button type="primary" @click="handleSearch">搜索</el-button>
                    <el-button type="primary" @click="clearSearch">清空</el-button>
                </el-form-item>
            </div>
            <!-- <div class="information">
            </div> -->
            <div class="information">
                <div class="created">
                    <el-button type="primary" @click="handleNew">发布网点</el-button>  
                </div>
                <div>
                    <el-table
                    :data="tableData"
                    ref="multipleTable"
                    stripe
                    border
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
                            label="出发地"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="目的地"
                            width="250">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="运输时效"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="mobile"
                            label="发车频率"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="telNum"
                            label="重货价格" 
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="pointFile"
                            label="轻货价格"
                            width="210">
                                <template  slot-scope="scope"> 
                                    <img  :src="scope.row.pointFile ? scope.row.pointFile : defaultImg" />
                                </template>
                        </el-table-column>
                        <el-table-column
                            prop="telNum"
                            label="最低一票价格（元）" 
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="telNum"
                            label="创建人" 
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="telNum"
                            label="创建时间" 
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="telNum"
                            label="专线类型" 
                            width="180">
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            prop="address"
                            label="操作"
                            >
                                <template slot-scope="scope">
                                    <el-button @click="handleEdit(scope.row)" type="primary" size="mini">修改</el-button>
                                    <el-button @click="handleDelete(scope.row)" type="primary" size="mini">删除</el-button>
                                    <el-button @click="handleStatus(scope.row)" :type="scope.row.pointStatus == 1 ? 'primary' : 'info'" size="mini">{{scope.row.pointStatus == 1 ? '启用' : '禁用'}}</el-button>
                                </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>  
        </el-form>
    </div>
</template>

<script>

import '@/styles/identification.scss'
import { getDictionary,getLogisticsCompanyInfoByMobile, } from '@/api/common.js'
import { getPointNetwork,PointNetworkStatus,deletePointNetwork } from '@/api/carrier/index.js'
import { REGEX } from '@/utils/validate.js'
import upload from '@/components/Upload/singleImage'

export default {
    components:{
        upload
    },
    data() {
       
        return {
            defaultImg:'/static/default.png',//默认加载失败图片
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
        };
    },
    watch:{

    },
    mounted(){
        this.firstblood();
    },  
    methods: {
        //完善信息
        completeInfo(){

            
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
            this.firstblood()
        },
        //新增网点
        handleNew(){
            this.$router.push({name: '发布我的网点'});
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
        handleClickMore(){
            this.$refs['topSearch'].$el.classList.add('longSearchBox')
        },
        setShort(){
            this.$refs['topSearch'].$el.classList.remove('longSearchBox')

        }

    },
  
}
</script>

<style type="text/css" lang="scss">
    .TransportRange{
        .el-form{
            .btnChoose{
                width: 200px;
                float: right;
                .el-form-item__content{
                    margin-left: 0 !important;
                    width: 155px !important;
                }
            }
            .searchInformation{
                .el-form-item{
                    display: inline-block;
                }
            }
            .created{
                margin-bottom: 20px;
            }
        }
    }
</style>
