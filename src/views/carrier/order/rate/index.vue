<template>
  <div class="rate identification">
    <el-tabs v-model="rateName"  @tab-click="handleClick" >
            <el-tab-pane label="订单评价" name="orderRate">
                <carrierRate :isvisible="rateName === 'orderRate'"></carrierRate>
            </el-tab-pane>
        
            <el-tab-pane label="专线评价" name="consignorRate">
                <consignorRate :isvisible="rateName === 'consignorRate'"></consignorRate>
            </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script type="text/javascript">

import carrierRate from './carrierRate'
import consignorRate from './consignorRate'

    
    export default {
        name:'rate',
        components:{
            carrierRate,
            consignorRate,
        },
        data() {
            return {
                rateName:'orderRate',
            };
        },
        watch:{
            rateName(newVal,oldVal){
                // console.log('newVal,oldVal',newVal,oldVal)
                if(newVal){
                    this.rateName = newVal;
                }else{
                    this.rateName = oldVal;
                }
            }
        },
        created() {
            this.rateName = localStorage.getItem('rateName') || 'orderRate';
        },

        beforeUpdate () {
            localStorage.setItem('rateName', this.rateName);
        },

        beforeDestroy () {
            localStorage.setItem('rateName', 'orderRate');
        },
        methods: {

            handleClick(tab, event) {
                // console.log(tab, event);
                this.rateName = tab.name;
            }
        }
    }
</script>

<style type="text/css" lang="scss">
    .rate{
        .el-tabs{
            height: 100%;
            .el-tabs__header{
                background: #fff;
                padding: 0 20px;
                .el-tabs__item{
                    // padding: 0 40px;
                    font-size: 18px;
                    margin-top:16px;
                    margin-bottom:16px;
                    height: 100%;
                    border-right: 1px solid #cccccc;
                }
                .el-tabs__item.is-top:nth-child(2) {
                    padding-left: 0;
                }
                .el-tabs__item.is-top:last-child {
                    padding-right: 0;
                    border-right: 0 none;
                }
            }
            .el-tabs__content{
                height: 90%;
                .el-tab-pane{
                    height: 100%;
                    .el-form-item{
                        margin-bottom: 0px;
                    }
                }
            }
        }
    }
</style>