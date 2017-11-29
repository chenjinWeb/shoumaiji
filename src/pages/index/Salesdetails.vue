<template>
  <div class="content-modal">
    <y-header title="详情" router="-1"></y-header>
    <div class="content">
      <div class="scroll-content" margin-header>
        <div class="by_device">
            <!--销售情况-->
            <div class="sequencing" style="margin-top:0;">
              <div class="title flex">
                  <span>销售情况</span>
              </div>
              <p class="salescont">总销售额<span>{{data.saleroom | thoundnum}}</span></p>
              <div id="charts"><!--echarts图形--></div>

            </div>

            <!--现金-->
            <div class="sales_details stocks_details">
              <div class="sales_details_title flex">
                <span>现金</span>
              </div>
              <div class="stocks_list flex">

                  <div class="sales_item">
                    <p class="title">交易笔数</p>
                    <div class="amount flex">
                      <a href="javascript:;" class="item">
                        {{data.cashDealCount || 0}}
                      </a>
                    </div>
                  </div>

                  <div  class="sales_item">
                    <p class="title">交易总额</p>
                    <div class="amount flex">
                      <a href="javascript:;" class="item">
                        {{data.cashDealMoney || 0}}
                      </a>
                    </div>
                  </div>

                  <div class="sales_item">
                    <p class="title">退款笔数</p>
                    <div class="amount flex">
                      <a href="javascript:;" class="item">
                        {{data.cashRefundCount || 0}}
                      </a>
                    </div>
                  </div>

                  <div class="sales_item">
                    <p class="title">退款总额</p>
                    <div class="amount flex">
                      <a href="javascript:;" class="item">
                        {{data.cashRefundMoney || 0}}
                      </a>
                    </div>
                  </div>
                </div>
            </div>

            <!--支付宝-->
            <div class="sales_details stocks_details">
              <div class="sales_details_title flex">
                <span>支付宝</span>
              </div>
              <div class="stocks_list flex">

                  <div class="sales_item">
                    <p class="title">交易笔数</p>
                    <div class="amount flex">
                      <a href="javascript:;" class="item">
                        {{data.alipayDealCount || 0}}
                      </a>
                    </div>
                  </div>

                  <div  class="sales_item">
                    <p class="title">交易总额</p>
                    <div class="amount flex">
                      <a href="javascript:;" class="item">
                        {{data.alipayDealMoney || 0}}
                      </a>
                    </div>
                  </div>

                  <div class="sales_item">
                    <p class="title">退款笔数</p>
                    <div class="amount flex">
                      <a href="javascript:;" class="item">
                        {{data.alipayRefundCount || 0}}
                      </a>
                    </div>
                  </div>

                  <div class="sales_item">
                    <p class="title">退款总额</p>
                    <div class="amount flex">
                      <a href="javascript:;" class="item">
                        {{data.alipayRefundMoney || 0}}
                      </a>
                    </div>
                  </div>

                </div>
            </div>

            <!--微信-->
            <div class="sales_details stocks_details">
              <div class="sales_details_title flex">
                <span>微信</span>
              </div>
              <div class="stocks_list flex">

                  <div class="sales_item">
                    <p class="title">交易笔数</p>
                    <div class="amount flex">
                      <a href="javascript:;" class="item">
                        {{data.weixinDealCount || 0}}
                      </a>
                    </div>
                  </div>

                  <div  class="sales_item">
                    <p class="title">交易总额</p>
                    <div class="amount flex">
                      <a href="javascript:;" class="item">
                        {{data.weixinDealMoney || 0}}
                      </a>
                    </div>
                  </div>

                  <div class="sales_item">
                    <p class="title">退款笔数</p>
                    <div class="amount flex">
                      <a href="javascript:;" class="item">
                        {{data.weixinRefundCount || 0}}
                      </a>
                    </div>
                  </div>

                  <div class="sales_item">
                    <p class="title">退款总额</p>
                    <div class="amount flex">
                      <a href="javascript:;" class="item">
                        {{data.weixinRefundMoney || 0}}
                      </a>
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
    import Vue from "vue"

    import {mapState,mapActions,mapMutations} from "vuex"

    import {Toast} from "mint-ui"

    export default {
      name:"Salesdetails",
      data(){
        return {
          query:{
            param :this.$route.query.id,
            type:this.$route.query.type,
            times:this.$route.query.times,
            timee:this.$route.query.timee
          },
          cash:"",
          alipay:"",
          weixin:"",
          data:{}
        }
      },
      watch:{

      },
      computed:{

      },
      mounted(){
        this.getdetail();
      },
      methods:{
        ...mapActions([
          'selltypedetail_'
        ]),
        //获取对应的设备详情
        getdetail(){
          this.selltypedetail_(this.query).then((res)=>{
            if(res.success==200 && res.data && res.data.length>0){
              this.data = res.data[0];
              this.initEchart();
            }
          })
        },
        initEchart() {
          let mainEl = document.getElementById('charts');
          let myChart = echarts.init(mainEl);
          let option = {
            color: ['#90d23c', '#ff5567', '#ffca13', '#416af4', '#3b9bff'],
            textStyle: {
              fontSize: 13
            },
            legend: {
              data: [

              ],
              top: '7%',
              itemGap: 15,
              left: '5%',
              itemWidth: 12,
              itemHeight: 12,
              inactiveColor: '#ccc',
              textStyle: {
                color: '#999'
              }
            },
            grid: {
              x:'15%',
              y:10,
              x2:50,
              y2:"15%",
              containLabel: true,
            },
            xAxis : [
              {
                type : 'category',
                data : ['现金','微信','支付宝'],
                splitLine:{
                  show:false,  //显示分割线
                },
                axisLine:{
                  show:false,
                },
              }
            ],
            yAxis: {
              type: 'value',
              // y 轴线
              axisLine:{
                show:false,
              },
              // 分割线设置
              splitLine:{
                show:true,  //显示分割线
              },
            },
            series: [
              {
                type:'bar',
                data:[this.data.cash,this.data.weixin,this.data.alipay],
                barWidth : 30,
                itemStyle: {
                  //通常情况下：
                  normal:{
                    //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                    color: function (params){
                      var colorList = ['#ffd647','#50cd2b','#47bcff'];
                      return colorList[params.dataIndex];
                    }
                  },
                },
              }
            ],
            backgroundColor: '#fff'
          };
          myChart.setOption(option);
          setTimeout(() => {
            myChart.resize()
          })
          window.onresize = function(){
            myChart.resize();
          }
        },
      }
    }

</script>

<style scoped>


</style>
