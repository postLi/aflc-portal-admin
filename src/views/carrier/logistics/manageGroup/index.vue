<template>
    <div class="PointNetwork identification">
        <el-form :model="logisticsForm" ref="ruleForm" label-width="110px" class="demo-ruleForm">
            <div class="carrierTitle">
                <div class="realname">
                    <h2>管理我的网点</h2>
                </div>
            </div>
            <div class="searchInformation information">
                <el-form-item label="网点名称" prop="name">
                    <el-input v-model="logisticsForm.name">
                    </el-input>
                </el-form-item>
                <el-form-item label="网点地址：" prop="address">
                    <el-input v-model="logisticsForm.address">
                    </el-input>
                </el-form-item>
                <el-form-item label="联系人：" maxlength="18"  prop="name">
                    <el-input v-model="logisticsForm.name">
                    </el-input>
                </el-form-item>
                <el-form-item label="手机：" prop="mobile">
                    <el-input v-model="logisticsForm.mobile" maxlength="11">
                    </el-input>
                </el-form-item>
                <el-form-item class="btnChoose" style="margin-left:20px;">
                    <el-button type="primary" @click="handleSearch">搜索</el-button>
                    <el-button type="primary" @click="clearSearch">清空</el-button>
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
            <div class="information" style="height:72%">
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
                            label="网点名称"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="网点地址"
                            width="250">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="联系人"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="mobile"
                            label="手机"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="telNum"
                            label="固话" 
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="pointFile"
                            label="网点图片"
                            width="210">
                                <template  slot-scope="scope"> 
                                    <img  :src="scope.row.pointFile ? scope.row.pointFile : defaultImg" />
                                </template>
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            prop="address"
                            label="操作"
                            >
                                <template slot-scope="scope">
                                    <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
                                    <el-button @click="handleEdit(scope.row)" type="primary" size="mini">修改</el-button>
                                    <el-button @click="handleDelete(scope.row)" type="primary" size="mini">删除</el-button>
                                    <el-button @click="handleStatus(scope.row)" :type="scope.row.pointStatus == 0 ? 'primary' : 'info'" size="mini">{{scope.row.pointStatus == 0 ? '启用' : '禁用'}}</el-button>
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
import { REGEX } from '@/utils/validate.js'
import upload from '@/components/Upload/singleImage'
import Pager from '@/components/Pagination/index'

export default {
    components:{
        upload,
        Pager
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
        .info_tab_footer{
            padding-left: 20px;
            background: #eee;
            height: 40px;
            line-height: 40px;
            box-shadow: 0 -2px 2px rgba(0,0,0,.1);
            position: relative;
            z-index: 10;
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
        }

        .show_pager{
            float: right;
            line-height: 40px;
            height: 40px;
            overflow: hidden;
        }
    }
</style>
