<template>
    <div class="ComplaintInfo identification">
        <el-form :model="logisticsForm" ref="ruleForm" label-width="110px" class="demo-ruleForm">
            <div class="carrierTitle">
                <div class="realname">
                    <h2>投诉跟踪</h2>
                </div>
            </div>
            <div class="step step-one">
            </div>
            <div class="ComplaintInfomation">
                <div class="complaint_content">
                    <h2>投诉</h2>
                    <div>
                        <p>投诉原因</p>
                        <p>投诉原因</p>
                        <p>控诉说明</p>
                        <p>投诉原因</p>
                        <p>工单编号</p>
                        <p>投诉原因</p>
                        <p>投诉时间</p>
                        <p>投诉原因</p>
                    </div>
                </div>
            </div>
        </el-form>
    </div>
</template>

<script>

import '@/styles/identification.scss'
import { getDictionary,getLogisticsCompanyInfoByMobile, } from '@/api/common.js'
import { getPointNetwork,PointNetworkStatus,deletePointNetwork } from '@/api/carrier/index.js'
import { listShipperComplain } from '@/api/consignor/Complaint.js'



export default {
    components:{
    },
    data() {
        return {
            active: 0,
            logisticsForm:{

            }
        };
    },
    watch:{

    },
    mounted(){
        // this.firstblood();
    },  
    methods: {
         next() {
        if (this.active++ > 2) this.active = 0;
      },
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
            this.$router.push({name: '投诉详情'});
        },
        //修改
        handleEdit(row) {
            console.log(row);
            this.$router.push({name: '投诉详情',params:{ data:row}});
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
    $stepWith : 884px;
    $stepLength : 54px;

    .ComplaintInfo{
        .step{
            width:  $stepWith ;
            height:  $stepLength ;
            margin: 22px auto;
        }
        .step-one{
            background: url('../../../../assets/tousu_01.png') no-repeat center;
        }
        .step-tow{
            background: url('../../../../assets/tousu_02.png') no-repeat center;
        }
        .step-three{
            background: url('../../../../assets/tousu_01.png') no-repeat center;
        }
        .ComplaintInfomation{
            margin:0 20px;

            .complaint_content{
                padding-bottom: 30px;
                background: #fff;
                h2{
                    text-align: center;
                    font-size: 16px;
                    color: #333333;
                    line-height: 22px;
                    padding: 21px 0;
                }
                &>div{
                    width: 1309px;
                    margin: 0 auto;
                    border-top:1px solid #ccc;
                    border-left:1px solid #ccc;
                    box-sizing: border-box;
                    font-size:0;
                    p{
                        display: inline-block;
                        font-size: 14px;
                        line-height: 20px;
                        border-right:1px solid #ccc;
                        border-bottom:1px solid #ccc;
                        padding: 14px 20px;
                    }
                    p:nth-child(2n-1){
                        width: 252px;
                        text-align: right;
                    }
                    p:nth-child(2n){
                        width: 1056px;
                    }
                }
            }
        }
    }
</style>
