<template>
    <div class="rateplant identification">
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
                                        <td class="moreWidth">
                                            出发地：{{rangeForm.startLocation}}
                                        </td>
                                        <td rowspan="2" class="priceTimeOut">
                                            <p>运输时效：{{rangeForm.transportAging}} {{rangeForm.transportAgingUnit}}</p><br>
                                        </td>
                                         <td rowspan="2">
                                             <div v-for="item in rangeForm.weightcargo" :key="item.id" class="cargo">
                                                <p>{{item.startVolume}}-{{item.endVolume}}公斤</p>
                                                <p>原报价：<del>{{item.primeryPrice}}</del>元/公斤</p>
                                                <p>折后价：<span>{{item.discountPrice}}</span>元/公斤</p>
                                             </div>
                                        </td>
                                          <td rowspan="2">
                                            <div v-for="item in rangeForm.lightcargo" :key="item.id" class="cargo">
                                                <p>{{item.startVolume}}-{{item.endVolume}}公斤</p>
                                                <p>原报价：<del>{{item.primeryPrice}}</del>元/公斤</p>
                                                <p>折后价：<span>{{item.discountPrice}}</span>元/公斤</p>
                                             </div>
                                        </td>
                                    </tr>
                                     <tr>
                                         <td>
                                            到达地：{{rangeForm.endLocation}}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <h4>最低一票价格：<span>{{rangeForm.lowerPrice}}</span> 元  <span>专线类型：{{rangeForm.rangeTypeName}}</span> <span>发车时间：{{rangeForm.departureTime}}</span></h4>
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
                                            v-model="transportForm.serverPriceStarLevelScore"
                                             show-text
                                            :texts = "textsArr"
                                            disabled
                                            text-color="#ed001d"
                                            >   
                                            </el-rate>
                                            <!-- <span class="des">{{transportForm.serverPriceStarLevelDes}}</span> -->
                                        </p>
                                        <p>
                                            服务质量：
                                            <el-rate
                                            v-model="transportForm.serverQualityStarLevelScore"
                                            show-text
                                            :texts = "textsArr"
                                            disabled
                                            text-color="#ed001d"
                                            >
                                            </el-rate>
                                            <!-- <span class="des">{{transportForm.serverQualityStarLevelDes}}</span> -->
                                        </p>
                                        <p>
                                            运输时效：
                                            <el-rate
                                            v-model="transportForm.transportAgingStarLevelScore"
                                             show-text
                                            :texts = "textsArr"
                                            text-color="#ed001d"
                                            disabled
                                            >
                                            </el-rate>
                                            <!-- <span class="des">{{transportForm.transportAgingStarLevelDes}}</span> -->
                                        </p>
                                        <p>
                                            评价说明：<span> {{transportForm.evaluationDes}}</span>
                                        </p>
                                    </div>
                                </div>
                                <div class="rateReply">
                                    <h4>我对游客的回复</h4>
                                    <div class="rateReply_info">
                                        <p v-if="transportForm.replyDes">
                                           {{transportForm.replyDes}}<br>
                                            <span>{{transportForm.replyTime}}</span>
                                        </p>
                                        <div v-else>
                                            <div class="rateReply_input">
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

// import '@/styles/identification.scss'
import { getUserInfo } from '@/utils/auth.js'
import { TransportInfo,TransportEvaluation,updateRate } from '@/api/carrier/rate.js' 
 
export default {
    components:{
    },
    data() {
        return {
            textsArr:['1分  非常不满','2分  不满意','3分  一般','4分  满意','5分  非常满意'],
            retalength:100,//回复字数
            UserInfo:{},
            rangeForm:{

            },
            replyDes:'',
            transportForm:{},
            optionsReason:[],
        };
    },  
    mounted(){
        this.firstblood();
    },  
    methods: {
        firstblood(){
            let transportRangeId = this.$route.query.transportRangeId;
            let evaluationId = this.$route.query.evaluationId;
            TransportInfo(transportRangeId).then(res => {
                // console.log(res)
                this.rangeForm = res.data;
                this.rangeForm.weightcargo =[];
                this.rangeForm.lightcargo = [];
                this.rangeForm.rangePrices.forEach(item => {
                    switch(item.type){
                        case '0':
                            this.rangeForm.lightcargo.push(item);
                            break;
                        case '1':
                            this.rangeForm.weightcargo.push(item)
                            break;
                    }
                })

                this.rangeForm.lightcargo.sort(function(a,b){  
                    return a.startVolume - b.startVolume;  
                })  
                this.rangeForm.weightcargo.sort(function(a,b){  
                    return a.startVolume - b.startVolume;  
                })  
                // console.log('this.rangeForm',this.rangeForm)
            })

            TransportEvaluation(evaluationId).then(res=>{
                // console.log('evaluationId',res)
                this.transportForm = res.data;
            })

        },
        submitForm() {
            let rata = Object.assign({},{id:this.transportForm.id,replyDes:this.replyDes,replyId:this.UserInfo.id,replyName:this.UserInfo.contactsName});
            updateRate(rata).then(res => {
                this.firstblood();
            })
        },
    },
  
}
</script>

<style type="text/css" lang="scss">
    .rateplant{
        .rateInfomation{
                margin:0 20px;
            .rate_content{
                padding-bottom: 30px;
                background: #fff;
                margin-bottom: 20px;
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
                                    padding: 12px 40px;
                                }
                            }
                        }
                    }
                }
            }
            .rate_orderInfo{
                font-size: 14px;
                color: #333333;
                line-height: 20px;
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
                        border-collapse: collapse;/*边框会合并为一个单一的边框*/
                        margin-bottom: 10px;
                        th,td{
                            border: 1px solid #dcdfe5;
                            text-align: center;
                            padding: 1em 2em;
                        }
                        th{
                            background: #f5f5f5;
                        }
                        td{
                            p{
                                display: inline-block;
                            }
                            del,span{
                                color: #ed001d
                            }
                            white-space : nowrap ;
                            .cargo{
                                margin: 10px 0;
                                p{
                                    text-align: left;
                                }
                                p:first-child{
                                    width: 30%;
                                }
                                p:nth-child(2){
                                    width: 35%;
                                }
                                p:last-child{
                                    width: 35%;
                                }
                            }
                            .cargo:first-child{
                                margin: 0 0 10px 0;
                            }
                            .cargo:last-child{
                                margin: 10px 0 0  0;
                            }
                        }
                    }

                    h4{
                        span{
                            font-weight: normal;
                        }
                        span:first-child{
                        color: #ed001d;
                        font-weight: bold;
                        }
                        span:nth-child(2){
                            margin: 0 30px;
                        }
                    }
                }
            }
        }
    }
</style>
