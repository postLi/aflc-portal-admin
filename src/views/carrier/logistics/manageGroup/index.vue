<template>
    <div class="PointNetwork identification">
        <el-form :model="logisticsForm" ref="ruleForm" label-width="90px" class="demo-ruleForm">
            <div class="carrierTitle">
                <div class="realname">
                    <h2>管理我的网点</h2>
                </div>
            </div>
            <div class="searchInformation information">
                <el-form-item label="网点名称">
                    <el-input v-model="logisticsForm.pointName">
                    </el-input>
                </el-form-item>
                <el-form-item label="网点地址：">
                    <el-input v-model="logisticsForm.address">
                    </el-input>
                </el-form-item>
                <el-form-item label="联系人：" maxlength="18" >
                    <el-input v-model="logisticsForm.name">
                    </el-input>
                </el-form-item>
                <el-form-item label="手机：">
                    <el-input v-model="logisticsForm.mobile" maxlength="11">
                    </el-input>
                </el-form-item>
                <el-form-item label="固话：">
                     <el-input v-model="logisticsForm.telNum" maxlength="11">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSearch">搜索</el-button>
                    <el-button type="primary">清空</el-button>
                </el-form-item>
            </div>
            <!-- <div class="information">
                <div class="click_and_search">
                    <el-button type="primary" @click="handleNew">发布网点</el-button>  
                    <el-input placeholder="请输入内容" ref="topSearch" class="input-with-select" @focus="handleClickMore"  @blur="setShort">
                        <el-button slot="append" icon="el-icon-search" type="info"></el-button>
                    </el-input>
                </div>
            </div> -->
            <div class="information">
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
                            width="50">
                        </el-table-column>
                        <el-table-column
                            fixed
                            prop="pointName"
                            label="网点名称"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="网点地址"
                            width="250">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="联系人"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="mobile"
                            label="手机"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="telNum"
                            label="固话" 
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="pointFile"
                            label="网点图片"
                            width="150">
                                <template  slot-scope="scope"> 
                                    <img  :src="scope.row.pointFile ? scope.row.pointFile : defaultImg" />
                                </template>
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            prop="address"
                            label="操作"
                            width="220">
                                <template slot-scope="scope">
                                    <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
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
        resetForm(formName) {
            this.$refs[formName].resetFields();
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
    .PointNetwork{
        .el-form{
            .searchInformation{
                .el-form-item{
                    display: inline-block;
                }
            }
            .el-table{
                .cell{
                    img{
                        display: inline-block;
                        width: 128px;
                        height: 60px;
                    }
                }
            }
            .information{
                .click_and_search{
                    >.el-input-group{
                        float: right;
                        width: 300px;
                    }
                    .el-input-group__append:hover{
                        background: #3a8ee6;
                        color: #fff
                    }
                }
            }
        }
        .longSearchBox{
            .el-input__inner{
                width: 400px;
            }
        }
    }
</style>
