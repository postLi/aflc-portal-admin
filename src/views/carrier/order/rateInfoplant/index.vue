<template>
    <div class="rate identification">
            <div class="carrierTitle">
                <div class="realname">
                    <h2>评价详情</h2>
                </div>
            </div>
            <div class="rateInfomation">
                <div class="">
                    <div class="rate_content rate_orderInfo">
                        <h2>专线信息</h2>       
                        <div class="carrierInfo">
                            <table>
                                <thead>
                                    <th>基本信息</th>
                                    <th>价格时效</th>
                                    <th>重货价格</th>
                                    <th>轻货价格</th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>专线ID：AFZG201812240001</td>
                                        <td rowspan="3" class="priceTimeOut">
                                            <p>运输时效：3-5天</p><br>
                                            <p>运输时效：3-5天</p>
                                        </td>
                                         <td>
                                            <p>0-50公斤</p>
                                            <p>原报价：<del>500</del>元/公斤</p>
                                            <p>折后价：<span>500</span>元/公斤</p>
                                        </td>
                                          <td>
                                            <p>0-50公斤</p>
                                            <p>原报价：<del>500</del>元/公斤</p>
                                            <p>折后价：<span>500</span>元/公斤</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="moreWidth">
                                            出发地：广东省广州市白云区长安街道
                                        </td>
                                         <td>
                                            <p>0-50公斤</p>
                                            <p>原报价：<del>500</del>元/公斤</p>
                                            <p>折后价：<span>500</span>元/公斤</p>
                                        </td>
                                         <td>
                                            <p>0-50公斤</p>
                                            <p>原报价：<del>500</del>元/公斤</p>
                                            <p>折后价：<span>500</span>元/公斤</p>
                                        </td>
                                    </tr>
                                     <tr>
                                         <td>
                                            到达地：湖北省武汉市江夏区
                                        </td>
                                         <td>
                                            <p>0-50立方</p>
                                            <p>原报价：<del>500</del>元/立方</p>
                                            <p>折后价：<span>500</span>元/立方</p>
                                        </td>
                                         <td>
                                            <p>0-50立方</p>
                                            <p>原报价：<del>500</del>元/立方</p>
                                            <p>折后价：<span>500</span>元/立方</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>   
                    </div>
                    <div class="rate_content rate_info ">
                        <h2>游客对我的评价</h2>
                        <div class="clearfix rate_info_content">
                            <div class="clearfix rate_info_order ">
                                <div>
                                    <div class="rateStar">
                                        <p>
                                            服务价格：
                                            <el-rate
                                            show-score
                                            allow-half
                                            score-template="{value}"
                                            >   
                                            </el-rate>
                                        </p>
                                        <p>
                                            服务质量：
                                            <el-rate
                                            v-model="value3"
                                            show-score
                                            :texts="textsArr"
                                            allow-half
                                            >
                                            </el-rate>
                                        </p>
                                        <p>
                                            运输时效：
                                            <el-rate
                                            v-model="value3"
                                            show-score
                                            :texts="textsArr"
                                            allow-half
                                            >
                                            </el-rate>
                                        </p>
                                        <p>
                                            评价说明：<span>货物包装很好，付款真的很及时。</span>
                                        </p>
                                    </div>
                                </div>
                                <div class="rateReply">
                                    <h4>我对游客的回复</h4>
                                    <div class="rateReply_info">
                                        <p>
                                            感谢您对本公司的点评，我们会悉心接受你的意见，公司将会更加努力做好服务，期待您的再次下单。<br>
                                            <span>2018-12-25  12:25:45</span>
                                        </p>
                                        <div class="rateReply_input">
                                            <el-input
                                            type="textarea"
                                            :rows="2"
                                            :maxlength="retalength"
                                            placeholder="可在此输入回复内容，回复后不可修改"
                                            v-model="textarea">
                                            </el-input>
                                            <p><span>{{textarea.length}}</span> / {{retalength}}</p>
                                        </div>
                                        <el-button type="primary">回复</el-button>
                                    </div>
                                </div>
                            </div>
                             
                        </div>     
                    </div>
                </div>
            </div>
    </div>
</template>

<script>

// import '@/styles/identification.scss'
import { getUserInfo } from '@/utils/auth.js'
import {  getAflcOrderComplain,getDetails,addOrderComplain,getDetailsByOrderSerial } from '@/api/carrier/Complaint.js'
import { getDictionary, } from '@/api/common.js'
 
export default {
    components:{
    },
    data() {
        return {
            textsArr:['1分  非常不满','2分  不满意','3分  一般','4分  满意','5分  非常满意'],
            value3:'',
            complainType:"AF041",//投诉原因
            retalength:100,//回复字数
            step:'step',
            stepname:'',
            textarea:'',
            complaintForm:{},
            UserInfo:{},
            ruleForm:{
                complainType:'',//投诉类型
                complainDes:'',//投诉描述
                platformOrderType:'1'
            },
            orderForm:{

            },
            optionsReason:[],
        };
    },  
    mounted(){
        // this.firstblood();
    },  
    methods: {
        getValue(val){
            console.log(val)
        },
        firstblood(){
            this.stepname = this.$route.query.type;
            let orderSerial = this.$route.query.orderSerial;

            getDetailsByOrderSerial(orderSerial).then(res => {
                console.log(res)
                if(res.status == 200){
                    this.complaintForm = res.data ;
                    this.stepname = this.complaintForm.complainStatus == 'AF04002' ? 'step-three' : 'step-tow' ;
                }else{
                    this.stepname = 'step-one';
                    Promise.all([getDetails('24c0f4218e1d4bf099d185b3c6964441'), getDictionary(this.complainType)]).then(resArr => {
                        console.log(this.orderForm)
                        this.orderForm = resArr[0].data;
                        this.optionsReason = resArr[1].data;
                        this.UserInfo = getUserInfo();
                    })
                }
            })
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                console.log()
                if (valid) {
                    this.$confirm('确认要投诉该物流公司吗？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(()=>{
                        this.ruleForm.complainTypeName = this.optionsReason.find(item => item.code === this.ruleForm.complainType)['name'];
                        this.ruleForm.complainName = this.UserInfo.contactsName;
                        this.ruleForm.complainId = this.UserInfo.id;
                        this.ruleForm.orderSerial = '24c0f4218e1d4bf099d185b3c6964441';
                        // console.log(this.ruleForm)
                        addOrderComplain(this.ruleForm).then(res => {
                            console.log(res)
                            this.stepname = 'step-tow';
                        })
                        
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        })
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    },
  
}
</script>

<style type="text/css" lang="scss">
    .rate{
        .rateInfomation{
        margin:0 20px;
        .rate_content{
            padding-bottom: 30px;
            background: #fff;
            margin-bottom: 40px;
            h2{
                text-align: center;
                font-size: 16px;
                color: #333333;
                line-height: 22px;
                padding: 21px 0;
            }
            
        }
        .rate_info{
            min-height: 430px;
            h2{
                border-bottom: 2px solid #ccc;
                text-align: left;
                text-indent: 67px;
            }
            .rate_info_content{
                padding: 16px 67px;
                .rate_info_order{
                    box-sizing: border-box;
                    h4{
                        font-size: 16px;
                        line-height: 20px;
                        margin-bottom: 10px;
                    }
                    .rateStar{
                        font-size: 14px;
                        color: #666666;
                        padding-left: 20px;
                        p{
                            margin:10px 0;
                        }
                        .el-rate{
                            display: inline-block;
                            .el-rate__text{
                                margin-left: 10px;
                                color: #ed001d !important;
                            }
                        }
                        p:last-child{
                            margin-top: 20px;
                            font-weight: bold;
                            span{
                                font-weight: normal;
                            }
                        }
                    }
                    .rateReply{
                        margin-top: 40px;
                        .rateReply_info{
                            p{
                                padding-left: 20px;
                                font-size: 14px;
                                line-height: 20px;
                                color: #333333;
                                span{
                                    margin-top: 10px;
                                    font-size: 12px;
                                    color: #999999;
                                }
                            }

                            .rateReply_input{
                                position: relative;
                                .el-textarea__inner{
                                    padding-bottom: 18px;
                                    font-size: 12px;
                                }
                                p{
                                    font-size: 12px;
                                    color: #999999;
                                    position: absolute;
                                    right: 15px;
                                    bottom: 2px;
                                    span{
                                        color: #ed001d;
                                    }
                                }
                            }
                            .el-button{
                                display: block;
                                margin: 0 auto;
                                margin-top: 40px;
                                padding: 12px 40px;
                            }
                        }
                    }
                }
            }
        }
        .rate_orderInfo{
            h2{
                border-bottom: 1px solid #ccc;
                text-align: left;
                text-indent: 67px;
            }
            .carrierInfo{
                padding: 30px 66px;
                table{
                    border: 1px solid #dcdfe5;
                    width: 100%;
                    font-size: 14px;
                    border-collapse: collapse;/*边框会合并为一个单一的边框*/
                    th,td{
                        border: 1px solid #dcdfe5;
                        text-align: center;
                        padding: 1em 2em;
                        color: #333333;
                        line-height: 20px;
                    }
                    th{
                        background: #f5f5f5;
                    }
                    td{
                        p{
                            display: inline-block;
                        }
                        p:nth-child(2){
                            margin: 0 40px;
                        }
                        del,span{
                            color: #ed001d
                        }
                        white-space : nowrap ;
                    }
                    .priceTimeOut{
                        >p:first-child{
                            margin-bottom: 34px;
                        }
                    }
                }
            }
        }
    }
    }
</style>
