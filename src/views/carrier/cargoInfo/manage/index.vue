<template>
    <div class="TransportRange identification">
        <el-form :model="logisticsForm" ref="ruleForm" label-width="110px" class="demo-ruleForm">
            <div class="carrierTitle">
                <div class="realname">
                    <h2>管理我的货源</h2>
                </div>
            </div>
            <div class="searchInformation information">
                <el-form-item label="出发地：" >
                    <el-input v-model="logisticsForm.startAddress">
                    </el-input>
                </el-form-item>
                <el-form-item label="到达地：">
                    <el-input v-model="logisticsForm.endAddress">
                    </el-input>
                </el-form-item>
                 <el-form-item label="商品名称：">
                    <el-input v-model="logisticsForm.goodsName">
                    </el-input>
                </el-form-item>
                <el-form-item class="btnChoose" style="margin-left:20px;">
                    <el-button type="primary" @click="handleSearch">搜索</el-button>
                    <el-button type="primary" @click="clearSearch">清空</el-button>
                </el-form-item>
            </div>
            <!-- <div class="information">
            </div> -->
            <div class="information informationTable">
                <div class="tableStyle">
                    <el-table
                    :data="tableData"
                    ref="multipleTable"
                    stripe
                    border
                    height="100%"
                    style="width: 100% ;">
                        <el-table-column
                            fixed
                            label="序号"
                            type="index"
                            width="80">
                        </el-table-column>
                        <el-table-column
                            fixed
                            label="出发地"
                            width="250">
                            <template slot-scope="scope">
                               <span>{{scope.row.startAddress}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="endAddress"
                            label="到达地"
                            width="250">
                        </el-table-column>
                        <el-table-column
                            prop="goodsName"
                            label="商品名称"
                            width="200">
                        </el-table-column>
                        <el-table-column
                            prop="goodsNum"
                            label="货品总数量（件）"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="goodsWeight"
                            label="预估总重量（公斤）" 
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="goodsVolume"
                            label="预估总体积（方）"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="consignor"
                            label="发货人" 
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="time"
                            label="发布时间" 
                            width="180">
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            prop="address"
                            label="操作" 
                            width="200"
                            >
                                <template slot-scope="scope">
                                    <!-- <el-button-group> -->
                                         <el-button @click="handleEdit(scope.row)" type="primary" size="mini">修改</el-button>
                                        <!-- <el-button @click="handleDelete(scope.row)" type="primary" size="mini">删除</el-button> -->
                                        <el-button @click="handleStatus(scope.row)" :type="scope.row.isEnable == 0 ? 'primary' : 'info'" size="mini">{{scope.row.isEnable == 0 ? '启用' : '禁用'}}</el-button>
                                    <!-- </el-button-group> -->
                                </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>  
            <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" :sizes="sizes"/></div> </div>    

        </el-form>
    </div>
</template>

<script>

import '@/styles/identification.scss'
import { parseTime } from '@/utils/index.js'
import { getGoodsSourceList,GoodsSourceStatus } from '@/api/carrier/goodssource.js'
import Pager from '@/components/Pagination/index'
 
export default {
    components:{
        Pager
    },
    data() {
       
        return {
            defaultImg:'/static/default.png',//默认加载失败图片
            totalCount:0,
            page:1,
            sizes:[20,50,100],
            pagesize:20,
            logisticsForm: {
                queryType:'2',
                startAddress: '',//出发地
                endAddress: '',//到达地
                goodsName:'',//商品名称
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
        handlePageChange(obj) {
            console.log(obj)
            this.page = obj.pageNum;
            this.pagesize = obj.pageSize;
            this.firstblood();
        },
        firstblood(){
            getGoodsSourceList(this.page,this.pagesize,this.logisticsForm).then(res=>{
                console.log(res)
                this.tableData = res.data.list;
                this.totalCount = res.data.totalCount;
                this.tableData.forEach(el => {
                    el.time = parseTime(el.createTime)
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
        //新增网点
        handleNew(){
            this.$router.push({name: '发布物流专线'});
        },
        //修改
        handleEdit(row) {
            this.$router.push('/cargoInfo/create?id='+row.id)
            //this.$router.push({name: '发布物流专线',params:{ data:row}});
        },
        //删除网点
        handleDelete(row) {
            this.$confirm('确定要删除 '+ row.startLocation +'-'+ row.endLocation +' 该条专线吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                deleteTransportRange(row.id).then(res => {
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
            let type = row.isEnable == '0' ? '1' : '0';
            GoodsSourceStatus(row.id,type).then(res => {
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
    .TransportRange{
        .el-form{
           
        }
    }
</style>
