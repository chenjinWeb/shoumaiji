<template>
  <div class="content-modal">
    <y-header title="入库管理" router="-1"></y-header>
    <div class="content">
      <ul class="tab_label flex" margin-header>
        <li class="label_list" @click="menuNum = 1" :class="{ 'on': menuNum == 1}">
          按时间
          <div v-show="menuNum==1" class="triangle_first"></div>
        </li>
        <li class="label_list" @click="menuNum = 2" :class="{ 'on': menuNum == 2}">
          按商品
          <div v-show="menuNum==2" class="triangle_first"></div>
        </li>
      </ul>
      <div class="scroll-content" style="margin-top:0.9rem;">
        <y-select-date @select="selectDate($event)" :futureDate="true" :time="query"></y-select-date>
        <!--销售情况-->
        <div class="by_device" v-show="menuNum==1">
          <!--缺货明细-->
          <div class="sequencing" style="margin-top: 0;">
            <div class="outtinvent">
              <ul class="inventory_list salesdata_list">
                <li v-for="(d,$index) in devicearr" @click="goPage(d.inState,d.id)">
                  <a href="javascript:;" class="central_list flex">
                    <div class="list_lef storescont" style="width: 45%; top: 32%;">
                      <p><span style="font-size: 0.14rem;">{{d.time | dates}}</span></p>
                    </div>
                    <div class="list_rig list_teleft" style="width: 55%; top: 18%; line-height: normal;">
                      <p class="time list_time_flex flex">
                        <span>{{d.user_name}}</span>
                        <span :class="d.inState==3? '' : 'bulecolr'">{{state(d.inState)}}</span>
                      </p>
                    </div>
                    <div class="list_rig" style="width: 5%;">
                      <i class="icon">&#xe600;</i>
                    </div>
                    <div style="position: absolute; top: 57%;">
                      入库单号：{{d.order_number}}
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
                        <span class="over_span">入库数量：{{de.count}}</span>
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
    name:"inventory",
    data(){
      return {
        p_w_id:this.$route.query.id,
        query:{
          times:Date.format(new Date,'yyyy-MM-dd'),
          timee:Date.format(new Date,'yyyy-MM-dd'),
        },
        menuNum:1,
        group_name:"",
        devicearr:[],
        devicezuarr:[]
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

        if(oldNum == 1 && this.devicearr.length==0){
          this.getsaledetail();
        }
        if(oldNum == 2 && this.devicezuarr.length==0){
          this.getsalezudetail();
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
        'inwarehouse_'
      ]),
      //页面跳转
      goPage(state,id){
        if(state==2){
          this.$router.push({name:"incheck",query:{id:id}})
        }else{
          this.$router.push({name:"instoreddetail",query:{id:id}})
        }
      },
      //2(待入库)/3(已入库)
      state(state){
        switch (state){
          case 2:
            return "待入库"
            break;
          case 3:
            return "已入库"
            break;
        }
      },
      //按指定时间段获取销售总额详情(现金、支付宝、微信)
      selectDate(data){
        this.query.times = data.formats[0];
        this.query.timee = data.formats[1];
        this.getsaledetail();
        this.getsalezudetail();
      },
      getsaledetail(){
        const data = {
          type:0,
          times:this.query.times,
          timee:this.query.timee,
          p_w_id:this.p_w_id
        }
        this.inwarehouse_(data).then((res)=>{
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
        this.inwarehouse_(data).then((res)=>{
          if(res.success==200){
            this.devicezuarr = res.data || [];
          }
        })
      },
    }
  }

</script>

<style scoped>

  .el-select-dropdown__item{ text-align: left;}

</style>
