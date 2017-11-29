<template>
  <div class="content-modal">
    <y-header title="销售数据" router="-1"></y-header>
    <div class="content">
      <div class="scroll-content" style="margin-top:0.45rem;">
        <y-select-date @select="selectDate($event)" mode="single" :futureDate="true"></y-select-date>
        <!--销售情况-->
        <div class="sequencing" style="margin-top:0;">
          <div class="title flex">
            <span>销售情况</span>
          </div>
          <div class="flex totl_top" style="border-bottom: 1px solid #ccc; margin: 0.05rem 0; ">
            <p class="salescont">销售额<span>{{(sellmoney || 0) | thoundnum}}</span></p><p class="salescont">销售量<span>{{sellnum | thoundnum}}</span></p>
          </div>
          <div id="echartsDiv"></div>
        </div>

        <div class="sequencing" style="margin-top:0.2rem;">
          <div class="title flex">
            <span>分时销售</span>
          </div>
          <div id="echartdata"></div>

        </div>

        <div class="by_device">
          <!--缺货明细-->
          <div class="sequencing">
            <div class="title flex">
              <span>数据明细</span>
            </div>
            <div class="date_table" v-if="deviceList.length!=0">
              <table width="100%" border="0" cellpadding="0" cellspacing="0">
                <thead>
                <tr>
                  <th>时间</th>
                  <th>销售量</th>
                  <th>销售额</th>
                  <th>现金</th>
                  <th>支付宝</th>
                  <th>微信</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="d in deviceList">
                  <td>{{d.time}}</td>
                  <td>{{d.sellnum}}</td>
                  <td class="clblue"> {{d.saleroom}} </td>
                  <td class="clblue">{{d.cash}}</td>
                  <td class="clblue">{{d.alipay}}</td>
                  <td class="clblue">{{d.weixin}}</td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="noData" style="position: static; padding: 0.3rem 0;" v-if="deviceList.length==0">
              <i class="icon">&#xe6bb;</i>
              <p>暂无数据</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="custom-classes-transition" enter-active-class="animated nav-open" leave-active-class="animated nav-close">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import Vue from "vue"

  import {mapState,mapActions,mapMutations} from "vuex"

  import {Toast} from "mint-ui"

  export default {
    name:"griddetail",
    data(){
      return {
        type:this.$route.query.type,
        vmId:this.$route.query.id,
        keyword:"",
        sellmoney:"0",
        sellnum:"0",
        day:Date.format(new Date,"yyyy-MM-dd"),
        deviceList:5
      }
    },
    watch:{
    },
    computed:{

    },
    mounted(){
      this.devicesell();
      this.getoneechart();
    },
    methods:{
      ...mapActions([
        "deviceindexsell_",
        "deviceoneechart_"
      ]),
      devicesell(){
        const data = {
          vmId:this.vmId,
          day:this.day,
          type:this.type,
          grid:1
        }

        this.deviceindexsell_(data).then((res)=>{
          if(res.success==200){
            this.sellmoney = res.data.sellMoney;
            this.sellnum = res.data.sellNum;
            this.initEchart(res.data.sellTypeM,res.data.sellTypeN);
          }
        })
      },
      getoneechart(){
        const data = {
          time:this.day,
          id:this.vmId,
          type:this.type,
          grid:1
        }
        this.deviceoneechart_(data).then((res)=>{
          if(res.success==200 && res.data){
            this.deviceList = res.data.list;
            this.oneEchart(res.data);
          }
        })
      },
      selectDate(data){
        this.day = data.format;
        this.devicesell();
        this.getoneechart();
      },
      oneEchart(data) {
        var xAxis = data.xaxis;
        var yesterday = data.saleroom;
        var today = data.sellnum;
        let mainEl = document.getElementById('echartdata');
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
            y: '5%',
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
            x:"10%",
            x2:"10%",
            y1:"5%",
            y2:"10%",
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
      initEchart(arr1,arr2) {
        let mainEl = document.getElementById('echartsDiv');
        let myChart = echarts.init(mainEl);
        let option = {
          color: ['#90d23c', '#ff5567', '#ffca13', '#416af4', '#3b9bff'],
          textStyle: {
            fontSize: 13
          },
          legend: {
            data: [

            ],
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
            y2:"10%",
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
              data:arr1,
              barWidth : 25,
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
            },
            {
              type:'bar',
              data:arr2,
              barWidth : 25,
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
      loadTop(){
        console.info(this.menuNum);
        let loadmore = this.$refs.loadmore;
        this.query.page = 1;
        this.loadmore.bottomPullText = "上拉加载更多...";
        this.loadmore.allLoaded = false;
        this.reportList.length = 0;
        this.getData(this.query).then( ()=> {
          loadmore.onTopLoaded();
        } )
      },
      loadBottom(){
        let loadmore = this.$refs.loadmore;
        if (this.loadmore.allLoaded) {
          loadmore.onBottomLoaded();
          return;
        }
        ++this.query.page;
        this.getData(this.query).then( ()=> {
          loadmore.onBottomLoaded();
        },() => {
          this.loadmore.allLoaded = true;
          this.loadmore.bottomPullText = "没有更多的数据！";
          loadmore.onBottomLoaded();
        })
      },
    }
  }

</script>

<style scoped>


</style>
