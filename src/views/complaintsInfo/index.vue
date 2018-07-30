<template>
    <div class="ComplaintInfo identification">
            <div class="carrierTitle">
                <div class="realname">
                    <h2>投诉跟踪</h2>
                </div>
            </div>
            <div :class="[stepname,step]">
            </div>
            <div class="ComplaintInfomation">
                <div class="complaint_content complaint_info">
                    <h2>投诉</h2>
                    <div>
                        <p>投诉原因</p>
                        <p><span>{{complaintForm.complainTypeName}}</span></p>
                        <p>控诉说明</p>
                        <p>{{complaintForm.complainDes}}</p>
                        <p>工单编号</p>
                        <p><span>{{complaintForm.workSerial}}</span></p>
                        <p>投诉时间</p>
                        <p>{{complaintForm.complainTime}}</p>
                    </div>
                </div>
                <div>
                    <el-form ref="ruleForm" :model="ruleForm"  label-width="80px">
                        <el-form-item label="活动名称">
                             <el-input @focus="()=>{showMap('endAddress')}" v-model="ruleForm.endLocation"></el-input>
                        </el-form-item>
                        <el-form-item label="活动区域">
                           
                        </el-form-item>
                    </el-form>
                </div>
                 <div class="complaint_content complaint_reply" v-if="stepname != 'step-one'">
                    <h2>{{UserInfo.companyName}}物流公司回复</h2>
                    <div v-if="stepname == 'step-tow'">
                        <el-input
                            type="textarea"
                            :autosize="{ minRows: 5, maxRows: 10}"
                            placeholder="请输入内容"
                            v-model="textarea" :maxlength="maxlength">
                        </el-input>
                        <p class="count">{{textarea.length}}/{{maxlength}}</p>
                        <el-button type="primary">回复</el-button>
                    </div>
                    <div class="complaint_replyinfo" v-else>
                        {{complaintForm.reply}}
                    </div>
                </div>
            </div>
        <tmsmap @success="getInfo" pos="" name="" :popVisible.sync="popVisible" />

    </div>
</template>

<script>

import '@/styles/identification.scss'
import '@/styles/complaint.scss'
import { getUserInfo } from '@/utils/auth.js'
import tmsmap from '@/components/map/index'

export default {
    components:{
        tmsmap,
    },
    data() {
        return {
            current:'',
            popVisible:false,
            maxlength:100,
            input10:'113245645',
            step:'step',
            stepname:'',
            active: 0,
            textarea:'',
            complaintForm:{},
            UserInfo:{},
            ruleForm:{
                endLocation:'',//出发地
            }
        };
    },  
    mounted(){
        this.firstblood();
        this.fuzhi();
    },  
    methods: {
        getInfo(pos, name, info) {
            // info.name  info.pos
            console.log(pos, name, info)
           
        },
        showMap(name) {
            this.popVisible = true ;
            this.current = name;
        },
        fuzhi(){
            if(this.$route.params.data.complainTypeName){
                this.complaintForm = this.$route.params.data;
            }
            this.stepname = this.$route.params.type;
        },
        handlePageChange(obj) {
            this.page = obj.pageNum
            this.pagesize = obj.pageSize
        },
        firstblood(){
            this.UserInfo = getUserInfo();
        },
    },
  
}
</script>

<style type="text/css" lang="scss">
   
</style>
