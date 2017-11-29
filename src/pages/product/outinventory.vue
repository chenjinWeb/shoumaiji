<template>
  <div class="content-modal">
    <y-header title="出库管理" router="-1" r_title="直接出库" @sured="sured()"></y-header>
    <div class="content">
      <ul class="tab_label flex" margin-header>
        <li class="label_list" @click="menuNum = 1" :class="{ 'on': menuNum == 1}">
          按时间
          <div v-show="menuNum==1" class="triangle_first"></div>
        </li>
        <li class="label_list" @click="menuNum = 2" :class="{ 'on': menuNum == 2}">
          待出库
          <div v-show="menuNum==2" class="triangle_first"></div>
        </li>
        <li class="label_list" @click="menuNum = 3" :class="{ 'on': menuNum == 3}">
          已出库
          <div v-show="menuNum==3" class="triangle_first"></div>
        </li>
      </ul>
      <div class="scroll-content" style="margin-top:0.9rem;">
        <y-select-date @select="selectDate($event)" :futureDate="true" :time="query"></y-select-date>
        <!--销售情况-->
        <div class="by_device" v-show="menuNum==1">
          <!--缺货明细-->
          <div class="sequencing" style="margin-top: 0;">
            <div class="outtinvent">
              <div class="search_input search_latitud">
                <label class="form">
                  <input type="search" placeholder="请输入申请人名字,单号或状态" class="search" v-model="keyword">
                </label>
                <div class="search_btn" @click="getsaledetail()">搜索</div>
              </div>
              <ul class="inventory_list salesdata_list">
                <li v-for="(d,$index) in devicearr" @click="goPage(d.outState,d.id)">
                  <a href="javascript:;" class="central_list flex">
                    <div class="list_lef storescont" style="width: 45%; top: 32%;">
                      <p><span style="font-size: 0.14rem;">{{d.time | dates}}</span></p>
                    </div>
                    <div class="list_rig list_teleft" style="width: 55%; top: 18%; line-height: normal;">
                      <p class="time list_time_flex flex">
                        <span>{{d.user_name}}</span>
                        <span :class="d.outState==2? '' : 'bulecolr'">{{state(d.outState)}}</span>
                        <span v-if="d.outState == 1 && timelimit" class="bulecolr" @click.stop="deleteli($index,d.id)">取消</span>
                      </p>
                    </div>
                    <div class="list_rig" style="width: 5%;">
                      <i class="icon">&#xe600;</i>
                    </div>
                    <div style="position: absolute; top: 57%;">
                      提货单号：{{d.order_number}}
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>
        <div class="noData" v-if="devicearr.length==0 && menuNum==1">
          <i class="icon">&#xe6bb;</i>
          <p>暂无数据</p>
        </div>

        <div class="by_device" v-show="menuNum==2">
          <div class="sequencing" style="margin-top: 0;">
            <div class="outtinvent">
              <div class="search_input search_latitud">
                <label class="form">
                  <input type="search" placeholder="请输入商品名称" class="search" v-model="group_name">
                </label>
                <div class="search_btn" @click="getsalezudetail()">搜索</div>
              </div>
              <!--<div style="text-align: right; padding: 0.15rem;">
                <template>
                  <el-select v-model="value" placeholder="请选择" style="width: 50%;" @change="changestore(value)">
                    <el-option
                      v-for="item in options"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </template>
              </div>-->
              <ul class="inventory_list salesdata_list">
                <li v-for="(de,$index) in devicezuarr">
                  <a href="javascript:;" class="central_list flex">
                    <div class="list_lef storescont" style="width: 65%;">
                      <p><span>{{de.pName}}({{de.weight}}{{de.unit}})</span></p>
                    </div>
                    <div class="list_rig list_teleft" style="width: 30%;">
                      <p class="time flex">
                        <span class="over_span">出库数量：{{de.count}}</span>
                      </p>
                    </div>
                  </a>
                </li>

              </ul>
            </div>
          </div>
        </div>
        <div class="noData" v-if="devicezuarr.length==0 && menuNum==2">
          <i class="icon">&#xe6bb;</i>
          <p>暂无数据</p>
        </div>

        <div class="by_device" v-show="menuNum==3">
          <div class="sequencing" style="margin-top: 0;">
            <div class="outtinvent">
              <div class="search_input search_latitud">
                <label class="form">
                  <input type="search" placeholder="请输入商品名称" class="search" v-model="timekeyword">
                </label>
                <div class="search_btn" @click="getsaletimedetail()">搜索</div>
              </div>
              <!--<div style="text-align: right; padding: 0.15rem;">
                <template>
                  <el-select v-model="outValue" placeholder="请选择" style="width: 50%;" @change="changeOut(outValue)">
                    <el-option
                      v-for="item in outOptions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </template>
              </div>-->
              <ul class="inventory_list salesdata_list">
                <li v-for="(dev,$index) in devicetimearr">
                  <a href="javascript:;" class="central_list flex">
                    <div class="list_lef storescont" style="width: 65%;">
                      <p><span>{{dev.pName}}({{dev.weight}}{{dev.unit}})</span></p>
                    </div>
                    <div class="list_rig list_teleft" style="width: 30%;">
                      <p class="time flex">
                        <span class="over_span">出库数量：{{dev.count}}</span>
                      </p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="noData" v-if="devicetimearr.length==0 && menuNum==3">
          <i class="icon">&#xe6bb;</i>
          <p>暂无数据</p>
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

  import ElementUI from 'element-ui'

  import {Toast,MessageBox} from "mint-ui"

  export default {
    name:"outinventory",
    data(){
      return {
        p_w_id:this.$route.query.id,
        options: [],
        value: '',
        outOptions: [],
        outValue: '',
        query:{
          times:Date.format(new Date,'yyyy-MM-dd'),
          timee:Date.format(new Date,'yyyy-MM-dd'),
        },
        menuNum:1,
        outingId:0,
        outed:0,
        keyword:"",
        group_name:"",
        timekeyword:"",
        devicearr:[],
        devicezuarr:[],
        devicetimearr:[],
        timelimit:true,
        outlimit:true,
        inlimit:true
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
      this.getsaledetail();
    },
    methods:{
      ...mapActions([
        "storehouse_",
        "cancelstore_",
        "totalsaledetail_",
        'outstoredata_',
        "sellzudetail_",
        "selltimedetail_"
      ]),
      //直接出库
      sured(){
        this.$router.push({name:"lineout",query:{id:this.p_w_id}})
      },
      //取消
      deleteli(index,id){
        MessageBox.confirm('是否取消该出库记录?').then(action => {
          this.cancelstore_({id:id,cancel:true}).then((res)=>{
            if(res.success==200){
              if(res.data==1){
                MessageBox.alert("取消成功").then(action=>{
                  this.devicearr.splice(index,1)
                })
              }else{
                MessageBox.alert("取消失败").then(action=>{

                })
              }
            }
          })
        },action=>{

        });
      },
      //页面跳转
      goPage(state,id){
        if(state==2 || state==1){
          this.$router.push({name:"storeddetail",query:{id:id}})
        }else if(state==0){
          this.$router.push({name:"outcheck",query:{id:id}})
        }
      },
      changestore(value){
        this.outingId = value;
        this.getsalezudetail();
      },
      changeOut(value){
        this.outed = value;
        this.getsaletimedetail();
      },
      state(state){
        switch (state){
          case 0:
            return "待审核"
            break;
          case 1:
            return "待出库"
            break;
          case 2:
            return "已出库"
            break;
        }
      },
      //按指定时间段获取销售总额详情(现金、支付宝、微信)
      selectDate(data){
        this.query.times = data.formats[0];
        this.query.timee = data.formats[1];
        this.getsaledetail();
        this.getsalezudetail();
        this.getsaletimedetail();
      },
      getsaledetail(){
        const data = {
          type:0,
          search:this.keyword,
          times:this.query.times,
          timee:this.query.timee,
          p_w_id:this.p_w_id
        }
        this.outstoredata_(data).then((res)=>{
          if(res.success==200){
            this.devicearr = res.data;
            //this.timelimit = res.extrasInfo.show_asset_button;
          }
        })
      },
      //待出库
      getsalezudetail(){
        const data = {
          type:1,
          p_w_id:this.p_w_id,
          search:this.group_name,
          times:this.query.times,
          timee:this.query.timee
        }
        this.outstoredata_(data).then((res)=>{
          if(res.success==200){
            this.devicezuarr = res.data || [];
          }
        })
      },
      //已出库
      getsaletimedetail(){
        const data = {
          type:2,
          p_w_id:this.p_w_id,
          search:this.timekeyword,
          times:this.query.times,
          timee:this.query.timee
        }
        this.outstoredata_(data).then((res)=>{
          if(res.success==200){
            this.devicetimearr = res.data || [];
          }
        })
      }
    }
  }

</script>

<style scoped>

  .el-select-dropdown__item{ text-align: left;}

</style>
