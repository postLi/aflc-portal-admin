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
                        <h2>订单信息</h2>       
                        <div class="orderInfo">
                            <ul>
                                <li>订单号：{{orderForm.orderSerial}}</li>
                                <li>货品名称：{{orderForm.goodsName}}</li>
                                <li>货品预估总体积（方）：{{orderForm.goodsVolume}}</li>
                                <li>出发地：{{orderForm.startAddress}}</li>
                                <li>发货人：{{orderForm.consignor}}</li>
                                <li>收货人：{{orderForm.consignee}}</li>
                            </ul>
                            <ul>
                                <li>下单时间：{{parseTimeFunctions(orderForm.useTime)}} 
                                    <el-popover
                                    width="100%"
                                    trigger="hover"
                                    >
                                    <p style="margin:5px;">提货时间：{{parseTimeFunctions(orderForm.pickUpGoodsTime)}}</p>
                                    <p style="margin:5px;">发货时间：{{parseTimeFunctions(orderForm.deliveryTime)}}</p>
                                    <p style="margin:5px;">收货时间：{{parseTimeFunctions(orderForm.receiveTime)}}</p>
                                    <span slot="reference" class="reference" icon="el-icon-caret-bottom">更多<i icon="el-icon-caret-bottom"></i></span>
                                    </el-popover>
                                </li>
                                <li>货品总数量（件）：{{orderForm.goodsNum}}</li>
                                <li>货物类型：{{orderForm.goodsTypeName}}</li>
                                <li>到达地：{{orderForm.endAddress}}</li>
                                <li>发货人手机：{{orderForm.consignorPhone}}</li>
                                <li>收货人手机：{{orderForm.consigneePhone}}</li>
                            </ul>
                            <ul>
                                <li>物流公司：{{orderForm.wlName}}</li>
                                <li>货品预估总重量（公斤）：{{orderForm.goodsWeight}}</li>
                                <li>预估总费用（元）：{{orderForm.totalAmount}}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="rate_content rate_info fl" style="margin-right:6%;">
                        <h2>我对货主的评价</h2>
                        <div class="clearfix rate_info_content">
                            <div class="clearfix rate_info_order ">
                                <div>
                                    <div class="rateStar">
                                        <p>
                                            货物包装：
                                            <el-rate
                                            v-model="consignorSerial.goodsStarLevelScore"
                                            show-score
                                            disabled
                                            text-color="#ed001d"

                                            >   
                                            </el-rate>
                                            <span class="des">{{consignorSerial.goodsStarLevelDes}}</span>
                                        </p>
                                        <p>
                                            付款及时：
                                            <el-rate
                                            v-model="consignorSerial.payStarLevelScore"
                                            show-score
                                            text-color="#ed001d"
                                            disabled
                                            >
                                            </el-rate>
                                            <span class="des">{{consignorSerial.payStarLevelDes}}</span>
                                        </p>
                                        <p>
                                            装卸安排：
                                            <el-rate
                                            v-model="consignorSerial.dockStarLevelScore"
                                            text-color="#ed001d"
                                            show-score
                                            disabled
                                            >
                                            </el-rate>
                                            <span class="des">{{consignorSerial.dockStarLevelDes}}</span>

                                        </p>
                                        <p>
                                            评价说明：<span>{{consignorSerial.evaluationDes}}</span>
                                        </p>
                                    </div>
                                </div>
                                <div class="rateReply" v-if="consignorSerial.replyDes">
                                    <h4>货主对我的回复</h4>
                                    <div class="rateReply_info" v-if="consignorSerial.replyDes">
                                        <p>
                                           {{consignorSerial.replyDes}}<br>
                                            <span>{{consignorSerial.replyTime}}</span>
                                        </p>
                                    </div>
                                    <div class="rateReply_info" v-else>
                                        <p>货主暂未回复</p>
                                    </div>
                                </div>
                            </div>
                             
                        </div>     
                    </div>
                    <div class="rate_content rate_info fl">
                        <h2>货主对我的评价</h2>
                        <div class="clearfix rate_info_content">
                             <div class="clearfix rate_info_order ">
                                <div>
                                    <div class="rateStar">
                                        <p>
                                            服务价格：
                                            <el-rate
                                            v-model="carrierSerial.serverPriceStarLevelScore"
                                            show-score
                                            text-color="#ed001d"
                                            disabled
                                            >   
                                            </el-rate>
                                            <span class="des">{{carrierSerial.serverPriceStarLevelDes}}</span>
                                        </p>
                                        <p>
                                            服务质量：
                                            <el-rate
                                            v-model="carrierSerial.serverQualityStarLevelScore"
                                            text-color="#ed001d"
                                            show-score
                                            disabled
                                            >
                                            </el-rate>
                                            <span class="des">{{carrierSerial.serverQualityStarLevelDes}}</span>
                                        </p>
                                        <p>
                                            运输时效：
                                            <el-rate
                                            v-model="carrierSerial.transportAgingStarLevelScore"
                                            text-color="#ed001d"
                                            show-score
                                            disabled
                                            >
                                            </el-rate>
                                            <span class="des">{{carrierSerial.transportAgingStarLevelDes}}</span>
                                        </p>
                                        <p v-if="carrierSerial.evaluationDes">
                                            评价说明：<span>{{carrierSerial.evaluationDes}}</span>
                                        </p>
                                    </div>
                                </div>
                                <div class="rateReply" >
                                    <h4>我对货主的回复</h4>
                                    <div class="rateReply_info">
                                        <p v-if="carrierSerial.replyDes">
                                            {{carrierSerial.replyDes}}<br>
                                            <span>{{carrierSerial.replyTime}}</span>
                                        </p>
                                        <div v-else>
                                            <div class="rateReply_input" >
                                                <el-input
                                                type="textarea"
                                                :rows="2"
                                                :maxlength="retalength"
                                                placeholder="可在此输入回复内容，回复后不可修改"
                                                v-model="replyDes">
                                                </el-input>
                                                <p><span>{{replyDes.length}}</span> / {{retalength}}</p>
                                            </div>
                                            <el-button type="primary" :disabled="!replyDes" @click="submitForm">回复</el-button>
                                        </div>
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

import '@/styles/identification.scss'
import { getUserInfo } from '@/utils/auth.js'
import { getDictionary,getDetailsByOrderSerial} from '@/api/common.js'
import { carrierSerial,consignorSerial,updateRate } from '@/api/carrier/rate.js'
import { parseTime } from '@/utils/index.js'
 
export default {
    components:{
    },
    data() {
        return {
            textsArr:['1分  非常不满','2分  不满意','3分  一般','4分  满意','5分  非常满意'],
            retalength:200,//回复字数
            replyDes:'',
            UserInfo:{},
            //货主对我的评价
            carrierSerial:{

            },
            //我对货主的评价
            consignorSerial:{

            },
            orderForm:{},
            optionsReason:[],
            parseTimeFunctions:null,
        };
    },  
    mounted(){
        this.firstblood();
    },  
    methods: {
        firstblood(){
            let orderSerial = this.$route.query.orderSerial;
            this.UserInfo = getUserInfo();
            this.parseTimeFunctions = parseTime;
            Promise.all([carrierSerial(orderSerial),consignorSerial(orderSerial),getDetailsByOrderSerial(orderSerial)]).then(resArr=> {
                console.log('resArr',resArr)
                this.carrierSerial = resArr[0].data || {};
                this.consignorSerial = resArr[1].data || {};
                this.orderForm = resArr[2].data || {};
            })            
        },
        submitForm() {
            let rata = Object.assign({},{id:this.carrierSerial.id,replyDes:this.replyDes,replyId:this.UserInfo.id,replyName:this.UserInfo.contactsName});
            updateRate(rata).then(res => {
                this.firstblood();
            })
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
            width:47%;
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
                            .des{
                                display: inline-block;
                                margin-left: 10px;
                                color: #ed001d;
                            }
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
                        margin-top: 20px;
                        .rateReply_info{
                            padding-left: 20px;
                            p{
                                font-size: 14px;
                                line-height: 20px;
                                color: #333333;
                                span{
                                    display: inline-block;
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
            .orderInfo{
                display: flex;
                justify-content:space-between;
                padding: 20px 234px 60px;
                ul{
                    li{
                        font-size: 14px;
                        line-height: 20px;
                        color: #333333;
                        margin-bottom: 10px;
                        .reference{
                            margin-left: 22px;
                            color:#0e91e9;
                            i{
                                margin-left: 3px;
                                display: inline-block;
                                width: 9px;
                                height: 9px;
                                background: url('../../../../assets/png/arrar.png') no-repeat center;
                            }
                        }
                    }
                }
            }
        }
    }
    }
</style>
