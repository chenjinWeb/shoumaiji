<template>
  <div class="content-modal">
    <y-header title="销售数据详情" router="-1"></y-header>
    <div class="content">
      <ul class="tab_label flex" margin-header>
        <li class="label_list" @click="menuNum = 1" :class="{ 'on': menuNum == 1}">
          按设备
          <div v-show="menuNum==1" class="triangle_first"></div>
        </li>
        <li class="label_list" @click="menuNum = 2" :class="{ 'on': menuNum == 2}">
          按设备组
          <div v-show="menuNum==2" class="triangle_first"></div>
        </li>
        <li class="label_list" @click="menuNum = 3" :class="{ 'on': menuNum == 3}">
          按时间
          <div v-show="menuNum==3" class="triangle_first"></div>
        </li>
      </ul>
      <div class="scroll-content" style="margin-top:0.9rem;">
        <y-select-date @select="selectDate($event)" :futureDate="true" :time="query"></y-select-date>
        <!--销售情况-->
        <div class="sequencing" style="margin-top:0;">
          <div class="title flex">
            <span>销售情况</span>
          </div>
          <p class="salescont">总销售额<span>{{saleroom | thoundnum}}</span></p>
          <div id="echartdata"><!--echarts图形--></div>
        </div>

        <div class="by_device" v-show="menuNum==1">
            <!--缺货明细-->
            <div class="sequencing">
              <div class="title flex">
                <span>数据明细</span>
              </div>
              <div class="outtinvents">
                <div class="search_input search_latitud">
                    <label class="form">
                        <input type="search" placeholder="请输入设备编号或别名" class="search" v-model="keyword">
                    </label>
                    <div class="search_btn" @click="getsaledetail()">搜索</div>
                </div>
                <ul class="inventory_list salesdata_list">
                  <li v-for="(d,$index) in devicearr" @click="checkdetail(d.vendingMachineId)">
                    <a href="javascript:;" class="central_list flex">
                      <div class="list_lef" style="width: 90%;">
                        <p><span>{{d.vmName}}</span></p>
                        <p class="time">
                          <span class="list_w">编号：{{d.number}}</span>
                          <span class="list_w">销售额：{{d.saleroom || 0}}</span>
                          <span class="list_w">销售量：{{d.salenum || 0}}</span>
                        </p>
                      </div>
                      <div class="list_rig">
                        <i class="icon">&#xe600;</i>
                      </div>
                    </a>
                  </li>
                </ul>
                <div class="noData" v-if="devicearr.length==0">
                  <i class="icon">&#xe6bb;</i>
                  <p>未找到您搜索的内容</p>
                </div>
              </div>
            </div>
        </div>


        <div class="by_device" v-show="menuNum==2">
          <div class="sequencing">
            <div class="title flex">
              <span>数据明细</span>
            </div>
            <div class="outtinvents">
              <div class="search_input search_latitud">
                <label class="form">
                  <input type="search" placeholder="请输入设备组名称" class="search" v-model="group_name">
                </label>
                <div class="search_btn" @click="getsalezudetail()">搜索</div>
              </div>
              <ul class="inventory_list salesdata_list">
                <li v-for="(de,$index) in devicezuarr" @click="checkdetail(de.vendingMachineGroupId)">
                  <a href="javascript:;" class="central_list flex">
                    <div class="list_lef long_left">
                      <p><span>{{de.groupName}}({{de.vmGroupCount}}台)</span></p>
                      <p class="time">
                        <span class="list_w_l">销售额：{{de.saleroom || 0}}</span>
                        <span class="list_w_l">销售量：{{de.salenum || 0}}</span>
                      </p>
                    </div>
                    <div class="list_rig">
                      <i class="icon">&#xe600;</i>
                    </div>
                  </a>
                </li>
              </ul>
              <div class="noData" v-if="devicezuarr.length==0">
                <i class="icon">&#xe6bb;</i>
                <p>未找到您搜索的内容</p>
              </div>
            </div>
          </div>
        </div>


        <div class="by_device" v-show="menuNum==3">
          <div class="sequencing">
            <div class="title flex">
              <span>数据明细</span>
            </div>
            <div class="outtinvents">
              <div class="search_input search_latitud">
                <label class="form">
                  <input type="search" placeholder="请输入设备组名" class="search" v-model="timekeyword">
                </label>
                <div class="search_btn" @click="getsaletimedetail()">搜索</div>
              </div>
              <ul class="inventory_list salesdata_list">
                <li v-for="(dev,$index) in devicetimearr" @click="checkdetail(dev.currentDate)">
                  <a href="javascript:;" class="central_list flex">
                    <div class="list_lef long_left">
                      <p><span>{{dev.currentDate}}</span></p>
                      <p class="time">
                        <span class="list_w_l">销售额：{{dev.saleroom || 0}}</span>
                        <span class="list_w_l">销售量：{{dev.salenum || 0}}</span>
                      </p>
                    </div>
                    <div class="list_rig">
                      <i class="icon">&#xe600;</i>
                    </div>
                  </a>
                </li>
              </ul>
              <div class="noData" v-if="devicetimearr.length==0">
                <i class="icon">&#xe6bb;</i>
                <p>未找到您搜索的内容</p>
              </div>
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
      name:"salesdatadetail",
      data(){
        return {
          query:{
            times:this.$route.query.times,
            timee:this.$route.query.timee,
          },
          menuNum:1,
          times:this.$route.query.times,
          timee:this.$route.query.timee,
          saleroom:"",
          cash:"",
          alipay:"",
          weixin:"",
          keyword:"",
          group_name:"",
          timekeyword:"",
          devicearr:[],
          devicezuarr:[],
          devicetimearr:[]
        }
      },
      watch:{
        menuNum:function (oldNum,newNum){
          if(oldNum == 1 && this.devicearr.length>0){
            return
          }
          if(oldNum == 2 && this.devicezuarr.length>0){
            return
          }
          if(oldNum == 3 && this.devicetimearr.length>0){
            return
          }
          if(oldNum == 1 && this.devicearr.length==0){
            this.getsaledetail();
          }
          if(oldNum == 2 && this.devicezuarr.length==0){
            this.getsalezudetail();
          }
          if(oldNum == 3 && this.devicetimearr.length==0){
            this.getsaletimedetail()
          }
        }
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
        this.getsaletotal();
        this.getsaledetail();
      },
      methods:{
        ...mapActions([
          "totalsaledetail_",
          'selldatadetail_',
          "sellzudetail_",
          "selltimedetail_"
        ]),
        //按指定时间段获取销售总额详情(现金、支付宝、微信)
        selectDate(data){
          this.times = data.formats[0];
          this.timee = data.formats[1];
          this.getsaletotal();
          this.getsaledetail();
          this.getsalezudetail();
          this.getsaletimedetail();
        },
        getsaletotal(){
          const data={
            times:this.times,
            timee:this.timee
          }
          this.totalsaledetail_(data).then((res)=>{
            if(res.success==200){
              this.saleroom = res.data.saleroom;
              this.cash = res.data.cash || 0;
              this.alipay = res.data.alipay || 0;
              this.weixin = res.data.weixin || 0;
              this.initEchart()
            }
          })
        },
        getsaledetail(){
          const data = {
            keyword:this.keyword,
            times:this.times,
            timee:this.timee
          }
          this.selldatadetail_(data).then((res)=>{
            if(res.success==200){
              this.devicearr = res.data;
            }
          })
        },
        getsalezudetail(){
          const data = {
            group_name:this.group_name,
            times:this.times,
            timee:this.timee
          }
          this.sellzudetail_(data).then((res)=>{
            if(res.success==200){
              this.devicezuarr = res.data;
            }
          })
        },
        getsaletimedetail(){
          const data = {
            keyword:this.timekeyword,
            times:this.times,
            timee:this.timee
          }
          this.selltimedetail_(data).then((res)=>{
            if(res.success==200){
              this.devicetimearr = res.data;
            }
          })
        },
        checkdetail(id){
          this.$router.push({name:"Salesdetails",query:{id:id,type:this.menuNum,times:this.times,timee:this.timee}})
        },
        initEchart() {
          let mainEl = document.getElementById('echartdata');
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
              y2:'15%',
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
                data:[this.cash,this.weixin,this.alipay],
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
        //商品
      }
    }

</script>

<style scoped>


</style>
