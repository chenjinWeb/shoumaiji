<template>
  <div class="tab-content">
    <y-header title="详情" r_icon="&#xe60b;" @go="goto"></y-header>
    <div class="content">
      <div class="scroll-content" margin-header>
        <div class="by_device">
            <div class="search_input search_latitud">
                  <label class="form">
                      <input type="search" placeholder="请输入设备组名称" class="search" v-model="name">
                  </label>
                  <div class="search_btn" @click="getData()">搜索</div>
              </div>
              <y-select-date @select="selectDate($event)" :futureDate="true" :time="query"></y-select-date>
            <!--销售情况-->
            <div class="sequencing" >
              <div class="title flex">
                  <span>销售情况</span>
              </div>
              <div class="flex totl_top">
                  <p class="salescont">销售额<span>34,561.00</span></p><p class="salescont">销售量<span>20758</span></p>
              </div>
              <div><!--echarts图形--></div>

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
                        0
                      </a>
                    </div>
                  </div>
                  <div  class="sales_item">
                    <p class="title">现金</p>
                    <div class="amount flex">
                      <a href="javascript:;" class="item">
                        0
                      </a>
                    </div>
                  </div>
                  <div class="sales_item">
                    <p class="title">退款笔数</p>
                    <div class="amount flex">
                      <a href="javascript:;" class="item">
                        0
                      </a>
                    </div>
                  </div>
                  <div class="sales_item">
                    <p class="title">退款总额</p>
                    <div class="amount flex">
                      <a href="javascript:;" class="item">
                        0
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
                        0
                      </a>
                    </div>
                  </div>
                  <div  class="sales_item">
                    <p class="title">现金</p>
                    <div class="amount flex">
                      <a href="javascript:;" class="item">
                        0
                      </a>
                    </div>
                  </div>
                  <div class="sales_item">
                    <p class="title">退款笔数</p>
                    <div class="amount flex">
                      <a href="javascript:;" class="item">
                        0
                      </a>
                    </div>
                  </div>
                  <div class="sales_item">
                    <p class="title">退款总额</p>
                    <div class="amount flex">
                      <a href="javascript:;" class="item">
                        0
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
                        0
                      </a>
                    </div>
                  </div>
                  <div  class="sales_item">
                    <p class="title">现金</p>
                    <div class="amount flex">
                      <a href="javascript:;" class="item">
                        0
                      </a>
                    </div>
                  </div>
                  <div class="sales_item">
                    <p class="title">退款笔数</p>
                    <div class="amount flex">
                      <a href="javascript:;" class="item">
                        0
                      </a>
                    </div>
                  </div>
                  <div class="sales_item">
                    <p class="title">退款总额</p>
                    <div class="amount flex">
                      <a href="javascript:;" class="item">
                        0
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

    import {maxArr} from "../../utils"

    import {Toast} from "mint-ui"

    import {Select} from "element-ui"

    Vue.use(Select);

    export default {
      name:"Totalsales",
      data(){
        return {
          menuNum:1,
          col:"blue",
          order_type:1,  //分时销售额，分时销售量
          product_order_type:1,  //商品销售排行销售额，销售量
          product_sort_type:1,  //商品排序
          product_page:1,  //商品排行页数
          product_num_page:1,  //商品排行页数
          product_pagesize:10,
          max_product_totalSaleRoom:0,   //最大商品销售额
          max_product_totalSaleNum:0,   //最大商品销售量
          device_order_type:1,  //设备销售排行销售额，销售量
          device_sort_type:1,  //设备组排序
          device_page:1,  //设备排行页数
          device_num_page:1,  //设备排行页数
          device_pagesize:10,
          max_device_totalSaleRoom:0,   //最大设备销售额
          max_device_totalSaleNum:0,   //最大设备销售量
          times: "1970-01-01",        //Date.format(new Date(), 'yyyy-MM-dd'),
          timee:Date.format(new Date(), 'yyyy-MM-dd'),
          homeData:{

          },
         /* options: [{
            value: '1',
            label: '黄金糕'
          }, {
            value: '2',
            label: '双皮奶'
          }, {
            value: '3',
            label: '蚵仔煎'
          }, {
            value: '4',
            label: '龙须面'
          }, {
            value: '5',
            label: '北京烤鸭'
          }],
          value4: '3'*/
        }
      },
      watch:{
        order_type:function (oldNum,newNum){
          this.getEchart(oldNum);
        },
        /*value4(oldNum,newNum){
          console.info(oldNum)
        }*/
      },
      computed:{
        ...mapState({
          date:state=>state.date,
          productSaleLists:state=>state.productSaleLists,
          productSaleNums:state=>state.productSaleNums,
          deviceSaleLists:state=>state.deviceSaleLists,
          deviceSaleNums:state=>state.deviceSaleNums
        }),
      },
      mounted(){
        this.checkProduct();
        this.checkDevice();
        this.timeData({time:this.date});
        this.getEchart(this.order_type);
      },
      methods:{
        ...mapActions([
          "indexsale_",
          "indexecharts_",
          "productrank_",
          "devicerank_"
        ]),
        ...mapMutations({
          getProductList: "getProductList",
          getDeviceList: "getDeviceList",
          getProductNumList:'getProductNumList',
          getDeviceNumList:"getDeviceNumList"
        }),
        timeData(date){
          //根据日期请求数据
          this.indexsale_(date).then((res)=>{
            if(res.success==200){
              this.homeData = res.data;
            }
          },(err)=>{
            Toast(err)
          });
        },
        getEchart(type){
          //根据切换得到图形数据
          this.indexecharts_({order_type:type}).then((res)=>{
            if(res.success==200){
              this.initEchart(res.data);
            }
          },(err)=>{
            Toast(err)
          })
        },
        selectDate(data){
          this.timeData({time:data.format})
        },
        findFirstString(data, str){
          if (!data) return false;
          return data.indexOf(str) !== -1;
        },
        goto(){
          this.$router.push({name:"user"})
        },
        initEchart(data) {
          var xAxis = data[0].xaxis;
          if(this.order_type==1){
            var yesterday = data[1].sellroom;
            var today = data[0].sellroom;
          }else{
            var yesterday = data[1].sellnum;
            var today = data[0].sellnum;
          }
          let mainEl = document.getElementById('echartsDiv');
          let myChart = echarts.init(mainEl);
          let option = {
            color: ['#90d23c', '#ff5567', '#ffca13', '#416af4', '#3b9bff'],
            textStyle: {
              fontSize: 13
            },
            legend: {
              data: [
                {
                  name: '昨日',
                  icon: 'rect'
                },
                {
                  name: '当天',
                  icon: 'rect'
                }
              ],
              top: '7%',
              itemGap: 15,
              left: '10%',
              itemWidth: 12,
              itemHeight: 12,
              inactiveColor: '#ccc',
              textStyle: {
                color: '#999'
              }
            },
            grid: {
              left: '2%',
              right: '4%',
              bottom: 0,
              containLabel: true,
            },
            xAxis: {
              type: 'category',
              position: 'bottom',
              boundaryGap: false,
              data:xAxis,
              axisLine: {
                lineStyle: {
                  color: '#e5e5e5',
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#999',
                }
              },
              axisTick: {
                show: false
              },
            },
            yAxis: {
              type: 'value',
              axisLine: {
                show: false,
              },
              axisLabel: {
                textStyle: {
                  color: '#999',
                }
              },
              splitLine: {
                lineStyle: {
                  color: '#e5e5e5'
                }
              },
              axisTick: {
                show: false
              },
            },
            series: [
              {
                name: '昨日',
                type: 'line',
//                            stack: '总量',
//                            symbolSize: 0,
                data: yesterday
              },
              {
                name: '当天',
                type: 'line',
//                            stack: '总量',
//                            symbolSize: 0,
                data: today
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
        //商品
        changeType(type){
          this.product_order_type=type;
          if(this.product_order_type==1 && this.productSaleLists.length==0){
            this.checkProduct()
          }
          if(this.product_order_type==2 && this.productSaleNums.length==0){
            this.checkProduct()
          }
        },
        checkProduct(){
          /*商品排行*/
          let query = {
            page:this.product_order_type==1? this.product_page : this.product_num_page,
            pagesize:this.product_pagesize,
            times:this.times,
            timee:this.timee,
            order_type:this.product_order_type,
            sort_order:this.product_sort_type
          }
          this.productrank_(query).then((res)=>{
            if(res.success==200 && res.data.data.length>0){
                this.getProductList(res.data.data);
                this.max_product_totalSaleRoom=maxArr(this.productSaleLists,"totalSaleRoom")*1.2;
                this.getProductNumList(res.data.data)
                this.max_product_totalSaleNum=maxArr(this.productSaleNums,"totalSaleNum")*1.2;
            }else{
              Toast("商品排行暂无数据")
            }
          })
        },
        //商品销售额加载更多
        productMore(){
          this.product_page++;
          this.checkProduct();
        },
        //商品销售量加载更多
        productNumMore(){
          this.product_num_page++;
          this.checkProduct();
        },
        //商品排序
        reverseArr(){
          this.product_sort_type=  this.product_sort_type==1? 2 : 1;
          this.productSaleLists.reverse();
          this.productSaleNums.reverse();
        },

        //设备组
        changeDeviceType(type){
          this.device_order_type=type;
          if(this.device_order_type==1 && this.deviceSaleLists.length==0){
            this.checkDevice()
          }
          if(this.device_order_type==2 && this.deviceSaleNums.length==0){
            this.checkDevice()
          }
        },
        //设备组
        checkDevice(){
          /*设备组排行*/
          let query = {
            page:this.device_order_type==1? this.device_page : this.device_num_page,
            pagesize:this.device_pagesize,
            times:this.times,
            timee:this.timee,
            order_type:this.device_order_type,
            sort_order:this.device_sort_type
          }
          this.devicerank_(query).then((res)=>{
            if(res.success==200 && res.data.data.length>0){
                this.getDeviceList(res.data.data);
                this.max_device_totalSaleRoom=maxArr(this.deviceSaleLists,"totalSaleRoom")*1.2;
                this.getDeviceNumList(res.data.data);
                this.max_device_totalSaleNum=maxArr(this.deviceSaleNums,"totalSaleNum")*1.2;
            }else{
              Toast("设备组排行暂无数据")
            }
          })

        },
        //设备组销售额加载更多
        deviceMore(){
          this.device_page++;
          this.checkDevice();
        },
        //设备组销售量加载更多
        deviceNumMore(){
          this.device_num_page++;
          this.checkDevice();
        },
        //设备组排序
        reverseArrDevice(){
          this.device_sort_type=  this.device_sort_type==1? 2 : 1;
          this.deviceSaleLists.reverse();
          this.deviceSaleNums.reverse();
        },
      }
    }

</script>

<style scoped>


</style>
