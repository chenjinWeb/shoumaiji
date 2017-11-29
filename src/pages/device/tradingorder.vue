<template>
<!-- 新增 -->
  <div class="content-modal">
    <y-header title="交易订单" router="-1"></y-header>
    <div class="content">
        <y-select-date @select="selectDate($event)" :futureDate="true" :time="query" margin-header></y-select-date>
        <div class="scroll-content" style="margin-top:1rem;">

            <ul class="creat_list">
                <li class="trading_list" v-for="s in orderInfoList">
                    <h3 class="tit">订单号 {{s.order_number}}</h3>
                    <div class="deal flex">
                        <p class="lef">{{s.name}}<span>{{s.weight}}</span></p>
                        <p class="rig">
                        <span class="already" v-if="s.pay_state == 1">待支付</span>
                        <span class="already" v-else-if="s.pay_state == 2">支付成功</span>
                        <span class="already" v-else-if="s.pay_state == 3">支付失败</span>
                        <span v-if="s.deliver_state == -1">待出货</span>
                        <span v-else-if="s.deliver_state == 0">出货成功</span>
                        <span v-else-if="s.deliver_state == 2" class="red">货道售空</span>
                        <span v-else-if="s.deliver_state == 3" class="red">出货失败</span>
                        </p>
                    </div>
                    <div class="pay flex">
                        <p class="lef">
                            {{s.pay_time}}
                        </p>
                        <p class="rig">
                            <span v-if="s.transaction_type_id == 1">支付宝支付</span>
                            <span v-else-if="s.transaction_type_id == 2">微信支付</span>
                            <span v-else-if="s.transaction_type_id == 4">现金支付</span>
                            <span v-else-if="s.transaction_type_id == 8">余额支付</span>
                            <span v-else-if="s.transaction_type_id == 9">农行支付</span>
                            <span class="price">￥{{s.price}}</span></p>
                    </div>
                </li>
            </ul>

            <div class="noData" v-if="orderInfoList.length==0">
              <i class="icon">&#xe6bb;</i>
              <p>暂无数据</p>
            </div>
        </div>
    </div>
  </div>

</template>

<script>
  import Vue from 'vue'

  import {mapActions} from 'vuex'

  export default {
    name:"tradingorder",
    data(){
      return {
        query:this.$route.query,
        orderInfoList:[],
      }
    },
    mounted(){
      let query = this.$route.query
      Object.assign(this.query,query);
      console.info(this.query)
      this.getOrderInfo();
    },
    methods:{
      ...mapActions([
        'orderInfo_',

      ]),
      getOrderInfo(){
        this.orderInfo_(this.query).then(res =>{
          if(res.success == 200){
            console.info(res);
            this.orderInfoList=res.data;
          }
        })
      },
      selectDate(data){
        this.query.times = data.formats[0];
        this.query.timee = data.formats[1];
        this.getOrderInfo();
      }
    },
  }


</script>

<style scoped>


</style>
