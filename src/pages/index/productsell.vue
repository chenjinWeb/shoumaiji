<template>
  <div class="content-modal">

    <y-header :title="title" router="-1"></y-header>

    <div class="content">
      <ul class="tab_label flex" margin-header>
        <li class="label_list" @click="menuNum = 1" :class="{ 'on': menuNum == 1}">
          按设备
          <div class="triangle_first" v-show="menuNum==1"></div>
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
                  <div class="search_input search_latitud">
                    <label class="form">
                      <input type="search" placeholder="请输入设备号或别名" class="search" v-model="keyword">
                    </label>
                    <div class="search_btn" @click="productselllist()">搜索</div>
                  </div>
                  <ul class="inventory_list salesdata_list">
                    <li v-for="(p,$index) in productarr" @click="checkorder(p.vendingMachineId)">
                      <a href="javascript:;" class="central_list flex">
                        <div class="list_lef" style="width: 90%;">
                          <p><span>{{p.vmName}}</span></p>
                          <p class="time">
                            <span class="list_w">编号：{{p.number}}</span>
                            <span class="list_w">销售额：{{p.saleroom | thoundnum}}</span>
                            <span class="list_w">销售量：{{p.salenum | thoundnum}}</span>
                          </p>
                        </div>
                        <div class="list_rig">
                          <i class="icon">&#xe600;</i>
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
                  <input type="search" placeholder="请输入设备组名" class="search" v-model="group_name">
                </label>
                <div class="search_btn" @click="productgrouplist()">搜索</div>
              </div>
              <ul class="inventory_list salesdata_list regional">
                <li v-for="(po,$index) in productzuarr">
                  <a href="javascript:;" class="central_list flex">
                    <div class="list_lef storescont">
                      <p><span>{{po.groupName}}</span></p>
                    </div>
                    <div class="list_rig list_teleft">
                      <p class="time flex"><span>销售额：{{po.saleroom | thoundnum}}</span><span>销售量：{{po.salenum | thoundnum}}</span></p>
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
        <div class="by_device" v-if="menuNum==3">
          <div class="sequencing">
            <div class="title flex">
              <span>销售明细</span>
            </div>
            <div class="outtinvents">
              <div class="search_input search_latitud">
                <label class="form">
                  <input type="search" placeholder="请输入设备编号或设备组名" class="search" v-model="timekeyword">
                </label>
                <div class="search_btn" @click="producttimelist()">搜索</div>
              </div>
              <ul class="inventory_list salesdata_list regional">
                <li v-for="(pt,$index) in producttimearr">
                  <a href="javascript:;" class="central_list flex">
                    <div class="list_lef storescont">
                      <p><span>{{pt.currentDate}}</span></p>
                    </div>
                    <div class="list_rig list_teleft">
                      <p class="time flex"><span>销售额：{{pt.saleroom | thoundnum}}</span><span>销售量：{{pt.salenum | thoundnum}}</span></p>
                    </div>
                  </a>
                </li>
              </ul>
              <div class="noData" v-if="producttimearr.length==0">
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
      name:"productsell",
      data(){
        return {
          title:this.$route.query.title,
          menuNum:1,
          query:{
            times:this.$route.query.times,
            timee:this.$route.query.timee,
            product_id:this.$route.query.id
          },
          totalSaleNum:"",
          totalSaleRoom:"",
          keyword:"",
          group_name:"",
          timekeyword:"",
          product_name:"",
          productarr:[],
          productzuarr:[],
          producttimearr:[],
          productsArr:[]
        }
      },
      watch:{
        menuNum:function (value){
          //console.info(value)
          if(value==1 && this.productarr.length>0){
            return
          }
          if(value==2 && this.productzuarr.length>0){
            return
          }
          if(value==3 && this.producttimearr.length>0){
            return
          }
          if(value==4 && this.productsArr.length>0){
            return
          }

          if(value==1 && this.productarr.length==0){
            this.productselllist();
          }

          if(value==2 && this.productzuarr.length==0){
            this.productgrouplist();
          }

          if(value==3 && this.producttimearr.length==0){
            this.producttimelist();
          }

          if(value==4 && this.productsArr.length==0){
            this.productedlist();
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
          'productselldata_',
          'productselllist_',
          'productgrouplist_',
          'producttimelist_',
          'productedlist_'
        ]),
        checkorder(id){
          this.$router.push({name:"productorder",query:{vmId:id,times:this.query.times,timee:this.query.timee}})
        },
        getproductdetail(){
          this.productselldata_(this.query).then((res)=>{
            if(res.success==200 && res.data){
              this.totalSaleNum = res.data.totalSaleNum;
              this.totalSaleRoom = res.data.totalSaleRoom;
            }
          })
        },
        productselllist(){
          const data = {
            keyword:this.keyword,
            times:this.query.times,
            timee:this.query.timee,
            product_id:this.query.product_id,
          }
          this.productselllist_(data).then((res)=>{
            if(res.success==200){
              this.productarr = res.data;
            }
          })
        },
        productgrouplist(){
          const data = {
            group_name:this.group_name,
            times:this.query.times,
            timee:this.query.timee,
            product_id:this.query.product_id,
          }
          this.productgrouplist_(data).then((res)=>{
            if(res.success==200){
              this.productzuarr = res.data;
            }
          })
        },
        producttimelist(){
          const data = {
            keyword:this.timekeyword,
            times:this.query.times,
            timee:this.query.timee,
            product_id:this.query.product_id,
          }
          this.producttimelist_(data).then((res)=>{
            if(res.success==200){
              this.producttimearr = res.data;
            }
          })
        },
        productedlist(){
          const data = {
            product_name:this.product_name,
            times:this.query.times,
            timee:this.query.timee,
            product_id:this.query.product_id,
          }
          this.productedlist_(data).then((res)=>{
            if(res.success==200){
              this.productsArr = res.data;
            }
          })
        },
        selectDate(data){
          this.query.times = data.formats[0];
          this.query.timee = data.formats[1];
          this.getproductdetail();
          this.productselllist();
          this.productgrouplist();
          this.producttimelist();
        }
      }
    }

</script>

<style scoped>


</style>
