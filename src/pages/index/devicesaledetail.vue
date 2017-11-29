<template>
  <div class="content-modal">

    <y-header :title="title" router="-1"></y-header>

    <div class="content">
      <ul class="tab_label flex" margin-header>
        <li class="label_list" @click="menuNum = 1" :class="{ 'on': menuNum == 1}">
          按时间
          <div class="triangle_first" v-show="menuNum==1"></div>
        </li>
        <li class="label_list" @click="menuNum = 2" :class="{ 'on': menuNum == 2}">
          按商品
          <div v-show="menuNum==2" class="triangle_first"></div>
        </li>
      </ul>
      <div class="scroll-content" style="margin-top:0.9rem;">
        <y-select-date @select="selectDate($event)" :futureDate="true" :time="query"></y-select-date>
        <!--销售情况-->
        <div class="sequencing" style="margin-top:0;">
          <div class="title flex">
            <span>销售情况</span>
          </div>
          <div class="flex totl_top">
            <p class="salescont">销售额<span>{{totalSaleRoom | thoundnum}}</span></p><p class="salescont">销售量<span>{{totalSaleNum | thoundnum}}</span></p>
          </div>
        </div>
        <div class="by_device" v-if="menuNum==1">
          <!--缺货明细-->
          <div class="sequencing">
            <div class="title flex">
              <span>销售明细</span>
            </div>
            <div class="outtinvents">
              <ul class="inventory_list salesdata_list regional">
                <li v-for="(pt,$index) in productarr">
                  <a href="javascript:;" class="central_list flex">
                    <div class="list_lef storescont">
                      <p><span>{{pt._current_date}}</span></p>
                    </div>
                    <div class="list_rig list_teleft">
                      <p class="time flex"><span>销售额：{{pt.money | thoundnum}}</span><span>销售量：{{pt.sales_count | thoundnum}}</span></p>
                    </div>
                  </a>
                </li>
              </ul>
              <div class="noData" v-if="productarr.length==0">
                <i class="icon">&#xe6bb;</i>
                <p>未找到您搜索的内容</p>
              </div>
            </div>
          </div>
        </div>
        <div class="by_device" v-if="menuNum==2">
          <div class="sequencing">
            <div class="title flex">
              <span>销售明细</span>
            </div>
            <div class="outtinvents">
              <div class="search_input search_latitud">
                <label class="form">
                  <input type="search" placeholder="请输入商品名称" class="search" v-model="group_name">
                </label>
                <div class="search_btn" @click="productselllist()">搜索</div>
              </div>
              <ul class="inventory_list salesdata_list regional">
                <li v-for="(po,$index) in productzuarr">
                  <a href="javascript:;" class="central_list flex">
                    <div class="list_lef storescont">
                      <p><span>{{po.pName}}</span></p>
                    </div>
                    <div class="list_rig list_teleft">
                      <p class="time flex"><span>销售额：{{po.money | thoundnum}}</span><span>销售量：{{po.sales_count | thoundnum}}</span></p>
                    </div>
                  </a>
                </li>
              </ul>
              <div class="noData" v-if="productzuarr.length==0">
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

  import {mapActions} from "vuex"

  import {Toast} from "mint-ui"

  export default {
    name:"devicesaledetail",
    data(){
      return {
        title:this.$route.query.title,
        menuNum:1,
        query:{
          times:this.$route.query.times,
          timee:this.$route.query.timee,
          vm_id:this.$route.query.id
        },
        totalSaleNum:"",
        totalSaleRoom:"",
        keyword:"",
        group_name:"",
        productarr:[],
        productzuarr:[],
        productsArr:[]
      }
    },
    watch:{
      menuNum:function (value){
        this.getproductdetail()
        if(value==1 && this.productarr.length>0){
          return
        }
        if(value==2 && this.productzuarr.length>0){
          return
        }
        if(value==1 && this.productarr.length==0){
          this.productselllist();
        }

        if(value==2 && this.productzuarr.length==0){
          this.productselllist();
        }
      }
    },
    computed:{

    },
    mounted(){
      this.getproductdetail();
      this.productselllist();
    },
    methods:{
      ...mapActions([
        'productdevicedata_',
        'productdevicelist_'
      ]),
      checkorder(id){
        this.$router.push({name:"productorder",query:{vmId:id,times:this.query.times,timee:this.query.timee}})
      },
      getproductdetail(){
        Object.assign(this.query,{search_type:this.menuNum})
        this.productdevicedata_(this.query).then((res)=>{
          if(res.success==200 && res.data){
            this.totalSaleNum = res.data.sales_count;
            this.totalSaleRoom = res.data.money;
          }
        })
      },
      productselllist(){
        const data = {
          search_name:this.menuNum==1? this.keyword : this.group_name,
          times:this.query.times,
          timee:this.query.timee,
          vm_id:this.query.vm_id,
          search_type:this.menuNum
        }
        this.productdevicelist_(data).then((res)=>{
          if(res.success==200){
            if(this.menuNum==1){
              this.productarr = res.data;
            }else{
              this.productzuarr = res.data;
            }
          }
        })
      },
      selectDate(data){
        this.query.times = data.formats[0];
        this.query.timee = data.formats[1];
        this.getproductdetail();
        this.productselllist();
      }
    }
  }

</script>

<style scoped>


</style>
