<template>

  <div class="content-modal">
    <y-header :title="title" router="-1"></y-header>
    <div class="content">
        <div class="scroll-content" margin-header>
            <div class="management">
                <p class="tit clear"><span class="fl">基本信息</span><router-link :to="{name:'devicebasic',query:{vmId:query.vmId,times:query.times,timee:query.timee,title:title}}" class="edit fr">编辑</router-link></p>
                <ul class="devicedetails">
                    <li class="central_list clear">
                        <div class="list_lef fl">设备编号</div>
                        <div class="list_rig fr">
                            {{deviceData.number}}
                        </div>
                    </li>
                    <li class="central_list clear">
                        <div class="list_lef fl">设备别名</div>
                        <div class="list_rig fr">
                            {{deviceData.another}}
                        </div>
                    </li>
                    <li class="central_list clear">
                        <div class="list_lef fl">所属分组</div>
                        <div class="list_rig fr">
                            {{deviceData.vending_machine_group_name}}
                        </div>
                    </li>
                    <li class="central_list clear">
                        <div class="list_lef fl">详细地址</div>
                        <div class="list_rig fr">
                            {{deviceData.detail_address}}
                        </div>
                    </li>
                    <li class="central_list clear">
                        <div class="list_lef fl">信号强度</div>
                        <div class="list_rig fr">
                            <img src="../../assets/img/mange.png" alt="" class="mange">{{deviceData.sigalLevel }}
                        </div>
                    </li>
                    <li class="central_list clear">
                        <div class="list_lef fl">累计流量</div>
                        <div class="list_rig fr">
                            {{(deviceData.sigalTraffic || 0) | thoundnum}}M
                        </div>
                    </li>
                    <li class="central_list clear">
                        <div class="list_lef fl">启用状态</div>
                        <div class="list_rig fr">
                            <label class="mint-switch">
                              <input type="checkbox" class="mint-switch-input" disabled v-model="deviceData.state" @change="getchangeVmState()">
                              <span class="mint-switch-core"></span>
                            </label>
                        </div>
                    </li>
                    <li class="central_list clear">
                        <div class="list_lef fl">运行状态</div>
                        <div class="list_rig fr">
                            <span v-if="deviceData.running_state == 1">正常</span>
                            <span v-else>异常</span>
                        </div>
                    </li>
                    <li class="central_list clear">
                        <div class="list_lef fl">网络状态</div>
                        <div class="list_rig fr">
                            <span v-if="deviceData.is_on_line==0">离线</span>
                            <span v-else>在线</span>
                        </div>
                    </li>
                    <li class="central_list clear">
                        <div class="list_lef fl">售卖状态</div>
                        <div class="list_rig fr">
                            <span v-if="deviceData.is_sale==1">可售</span>
                            <span v-else>不可售</span>
                        </div>
                    </li>
                    <li class="central_list clear">
                        <div class="list_lef fl">机器状态</div>
                        <div class="list_rig details_list fr">
                          <span>开机</span>
                        </div>
                    </li>
                    <li class="central_list clear">
                        <div class="list_lef fl">签到状态</div>
                        <div class="list_rig details_list fr">
                            <router-link :to="{name:'signhistory',query:{vmId:query.vmId}}">签到历史</router-link><span>{{deviceData.signedTime}}</span>
                        </div>
                    </li>
                    <li class="central_list clear">
                        <div class="list_lef fl">空道</div>
                        <div class="list_rig details_list fr">
                            <a href="javascript:;" @click='showpopup()'>详情</a><span>{{deviceData.offaisles}}</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="management">
                <p class="tit clear"><span class="fl">销售数据</span></p>
                <y-select-date @select="selectDate($event)" :futureDate="true"></y-select-date>
                <div class="main">
                    <div class="sales_details flex">
                      <div class="sales_item"> <!--:to="{name:'deviceReport'}"-->
                        <p class="title">销售额</p>
                        <p class="amount">{{sellDataList.sellMoney || 0  | thoundnum}}</p>
                        <p class="raise" :class="{'green':findFirstString(sellDataList.percentageM,'+'),'red':findFirstString(sellDataList.percentageM,'-')}">{{sellDataList.percentageM || 0}}%</p>
                      </div>
                      <div class="sales_item">
                        <p class="title">销售量</p>
                        <p class="amount">{{sellDataList.sellNum || 0 | thoundnum}}</p>
                        <p class="raise" :class="{'green':findFirstString(sellDataList.percentageN,'+'),'red':findFirstString(sellDataList.percentageN,'-')}">{{sellDataList.percentageN || 0}}%</p>
                      </div>
                      <div class="sales_item">
                        <p class="title">现金</p>
                        <p class="amount">{{sellDataList.cash || 0 | thoundnum}}</p>
                        <p class="raise" :class="{'green':findFirstString(sellDataList.percentageC,'+'),'red':findFirstString(sellDataList.percentageC,'-')}">{{sellDataList.percentageC || 0}}%</p>
                      </div>
                    </div>
                </div>
                <ul class="creat_list">
                    <li>
                        <router-link :to="{name:'fault',query:{vmId:query.vmId}}" class="central_list clear">
                            <div class="list_lef fl"><img src="../../assets/img/guz.png" alt="" class="image">故障信息</div>
                            <div class="list_rig fr">
                                <i class="icon">&#xe600;</i>
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{name:'goods',query:{vmId:query.vmId}}" class="central_list clear">
                            <div class="list_lef fl"><img src="../../assets/img/hdgl.png" alt="" class="image">货道管理</div>
                            <div class="list_rig fr">
                                <i class="icon">&#xe600;</i>
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{name:'tradingorder',query:{vmId:query.vmId,times:query.times,timee:query.timee}}" class="central_list clear">
                            <div class="list_lef fl"><img src="../../assets/img/jydd.png" alt="" class="image">交易订单</div>
                            <div class="list_rig fr">
                                <i class="icon">&#xe600;</i>
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{name:'statistics',query:{vmId:query.vmId}}" class="central_list clear">
                            <div class="list_lef fl"><img src="../../assets/img/sptj.png" alt="" class="image">商品统计</div>
                            <div class="list_rig fr">
                                <i class="icon">&#xe600;</i>
                            </div>
                        </router-link>
                    </li>
                </ul>

            </div>


        </div>
        <mt-popup
            v-model="popupVisible"
            popup-transition="popup-fade" style="width: 80%; border-radius: 0.05rem;">
              <div style=" height: auto; background: #fff; padding: 0.1rem; border-radius: 0.05rem;">
                <div style="font-size: 0.16rem;">空道详情</div>
                <div class="close_btn bulecolr" @click="popupVisible=false">关闭</div>
                <ul style="margin-top: 0.2rem;max-height: 2.5rem;overflow: scroll;">
                  <li v-for="(a,$index) in offmonitorInfoList" style=" line-height: 0.4rem; text-align: left; text-indent: 0.1rem;">{{a.name}}(货道号：{{a.aisle}})</li>
                </ul>
              </div>
          </mt-popup>

        <transition name="custom-classes-transition" enter-active-class="animated nav-open" leave-active-class="animated nav-close">
            <router-view></router-view>
        </transition>
    </div>
  </div>

</template>

<script>

  import Vue from 'vue'

  import { Switch,MessageBox } from 'mint-ui';

  Vue.component(Switch.name, Switch);

  import {mapActions} from 'vuex'

  export default {
    name:"devicedetails",
    data(){
      return {
        title:this.$route.query.title,
        popupVisible:false,
        deviceData:{},
        offmonitorInfoList:[],
        sellDataList:{},
        changeVmStates:[],
        query:{
            times:Date.format(new Date,"yyyy-MM-dd"),
            timee:Date.format(new Date,"yyyy-MM-dd"),
        },

      }

    },
    mounted(){
        let query = this.$route.query;
        Object.assign(this.query,query);
        this.getData();
        this.getSellData(this.query);
    },
    methods:{
        ...mapActions([
            'deviceInfos_',
            'offMonitorInfo_',
            'sellData_',
            'changeVmState_'
        ]),
        showpopup(){
            this.popupVisible=true;
            //请求接口
            this.offMonitorInfo_({vmId:this.query.vmId}).then(res =>{
                if(res.success==200){
//                    console.info(res);
                    this.offmonitorInfoList = res.data;
                }
            })
        },
        getData(){
            this.deviceInfos_(this.query).then(res =>{
                if(res.success==200){
//                    console.info(res);
                    this.deviceData = res.data;
                }
            })
        },
        selectDate(e){
            console.info(e)
            Object.assign(this.query,{
                times:e.formats[0],
                timee:e.formats[1],
            });
            this.getSellData(this.query)
        },
        findFirstString(data1, str){
            if (!data1) return false;
            return String(data1).indexOf(str) == -1;
        },
        getSellData(data){
            this.sellData_(data).then(res =>{
                if(res.success == 200){
                    // console.info(res);
                    this.sellDataList=res.data;
                }
            })
        },
        getchangeVmState(){
          var str = "";
          if(this.deviceData.state){
            str = "开启"
          }else{
            str = "关闭"
          }
          MessageBox.confirm(`是否${str}此状态`,'').then(action=>{
            this.changeVmState_({vmId:this.query.vmId,state:this.deviceData.state?1:0}).then(res =>{
              if(res.success ==200){
                console.info(res);
                this.changeVmStates=res.data;
              }
            })
          },action=>{
            this.deviceData.state=!this.deviceData.state;
          })
        }
    },
  }

</script>

<style scoped>
.mint-switch{
  display:inline-block;
  height:0.28rem;
}
   .mint-switch-core::before{
    content: "OFF";
    top: 0;
    left: 0;
    position: absolute;
    -webkit-transition: -webkit-transform .3s;
    transition: -webkit-transform .3s;
    transition: transform .3s;
    transition: transform .3s, -webkit-transform .3s;
    border-radius:0.15rem;
    width:0.59rem;
    height: 0.23rem;
    line-height: 0.26rem;
    background-color: #fdfdfd;
    font-size:0.12rem;
    color:#e5e5e5;
    padding-right: 0.03rem;
    background: none;
}
.mint-switch-core {
    display: inline-block;
    position: relative;
    width:0.62rem;
    height:0.28rem;
    border: 1px solid #ccc;
    border-radius:0.15rem;
    box-sizing: border-box;
    background: #fff;
}

.mint-switch-core::after{
    content: "";
    top: 0.034rem;
    left: 0.03rem;
    position: absolute;
    -webkit-transition: -webkit-transform .3s;
    transition: -webkit-transform .3s;
    transition: transform .3s;
    transition: transform .3s, -webkit-transform .3s;
    border-radius:0.09rem;
    width: 0.26rem;
    height:0.2rem;
    background-color: #e6e6e6;
    box-shadow: none !important;
}
.mint-switch-input:checked + .mint-switch-core {
    border-color: #ccc;
    background-color: #fff;
}
.mint-switch-input:checked + .mint-switch-core::after {

    -webkit-transform: translateX(0.27rem);
    transform: translateX(0.27rem);
    background-color: #2d72ff;
}
.mint-switch-input:checked + .mint-switch-core::before{
    content: "ON";
    -webkit-transform: translateX(0);
    transform: translateX(0);
    text-align: left;
    padding-left: 0.03rem;
    background: none;
}
</style>
