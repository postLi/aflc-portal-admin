<template>
    <div class="TransportRange identification">
        <el-form :model="logisticsForm" ref="ruleForm" label-width="110px" class="demo-ruleForm">
            <div class="carrierTitle">
                <div class="realname">
                    <h2>管理我的专线</h2>
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
                    <el-button type="primary" @click="handleNew">发布专线</el-button>  
                </div>
                <div class="tableStyle">
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
                            label="出发地"
                            width="180">
                            <template slot-scope="scope">
                               <span>{{scope.row.startLocation}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="endLocation"
                            label="到达地"
                            width="250">
                        </el-table-column>
                        <el-table-column
                            label="运输时效"
                            width="180">
                             <template slot-scope="scope">
                               {{scope.row.transportAging}}天
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="发车频率"
                            width="180">
                            <template slot-scope="scope">
                               <span>{{scope.row.departureHzData}}天/{{scope.row.departureHzTime}}次</span> 
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="重货价格" 
                            width="220">
                            <template slot-scope="scope">
                                <p v-if="scope.row.weightcargo.length == 0">
                                    <span class="interview">面谈</span>
                                </p>
                                <p class="cargo" v-for="(item,idx) in scope.row.weightcargo" :key="item.id" v-else>
                                    <span v-if="idx == 0">{{item.endVolume}}公斤以下,{{item.primeryPrice}}元/公斤</span>
                                    <span v-else-if="idx == scope.row.weightcargo.length-1">{{item.endVolume}}公斤以上,{{item.primeryPrice}}元/公斤</span>
                                    <span v-else>{{item.startVolume}}-{{item.endVolume}}公斤,{{item.primeryPrice}}元/公斤</span>
                                </p>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="轻货价格"
                            width="220">
                            <template slot-scope="scope">
                                <p v-if="scope.row.lightcargo.length == 0">
                                    <span class="interview">面谈</span>
                                </p>
                                <p class="cargo" v-for="(item,idx) in scope.row.lightcargo" :key="idx"  v-else>
                                    <span v-if="idx == 0">{{item.endVolume}}立方以下,{{item.primeryPrice}}元/立方</span>
                                    <span v-else-if="idx == scope.row.lightcargo.length-1">{{item.endVolume}}立方以上,{{item.primeryPrice}}元/立方</span>
                                    <span v-else>{{item.startVolume}}-{{item.endVolume}}立方,{{item.primeryPrice}}元/立方</span>
                                </p>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="lowerPrice"
                            label="最低一票价格（元）" 
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="publishName"
                            label="创建人" 
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="Time"
                            label="创建时间" 
                            width="220">
                        </el-table-column>
                        <el-table-column
                            label="专线类型" 
                            width="180">
                            <template slot-scope="scope">
                               <span class="rangeTypeName">{{scope.row.rangeTypeName}}</span> 
                            </template>
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            prop="address"
                            label="操作"
                            width="300"
                            >
                                <template slot-scope="scope">
                                    <el-button @click="handleEdit(scope.row)" type="primary" size="mini">修改</el-button>
                                    <el-button @click="handleDelete(scope.row)" type="primary" size="mini">删除</el-button>
                                    <el-button @click="handleStatus(scope.row)" :type="scope.row.rangeStatus == 0 ? 'primary' : 'info'" size="mini">{{scope.row.rangeStatus == 0 ? '启用' : '禁用'}}</el-button>
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
import { getTransportRangeList,TransportRangeStatus,deleteTransportRange } from '@/api/carrier/TransportRange.js'
import { parseTime } from '@/utils/index.js'

export default {
    components:{
        
    },
    data() {
       
        return {
            defaultImg:'/static/default.png',//默认加载失败图片
            totalCount:0,
            page:1,
            pagesize:20,
            logisticsForm: {
                startLocation: '',//出发地
                endLocation: '',//到达地
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
        firstblood(){
            getTransportRangeList(this.page,this.pagesize,this.logisticsForm).then(res=>{
                this.tableData = res.data.list;
                this.totalCount = res.data.totalCount;
                this.tableData.forEach(el=>{
                    el.Time = parseTime(el.createTime); 
                    el.weightcargo =[];
                    el.lightcargo = [];
                    el.rangePrices.forEach(item => {
                        switch(item.type){
                            case '0':
                                el.lightcargo.push(item);
                                break;
                            case '1':
                                el.weightcargo.push(item)
                                break;
                        }
                    })
                    el.lightcargo.sort(function(a,b){  
                        return a.startVolume - b.startVolume;  
                    })  
                    el.weightcargo.sort(function(a,b){  
                        return a.startVolume - b.startVolume;  
                    })  
                })
                
                console.log(this.tableData)
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
            this.$router.push({name: '发布物流专线',params:{data:row,ifrevise:'1'}});
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
            TransportRangeStatus(row.id).then(res => {
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
            .tableStyle{
                .cargo{
                    text-align: left;
                    text-indent: 20px;
                }
                .rangeTypeName{
                    padding: 5px 15px;
                    border-radius: 20%  / 50%;
                    background: #eca438;
                    color: #fff;
                }
                .interview{
                    padding: 5px 15px;
                    border-radius: 5px;
                    background: #eb0a0a;
                    color: #fff;
                }
            }
        }
    }
</style>
