<template>
  <div class="content-modal">
    <y-header title="工作日报" router="-1"></y-header>
    <div class="content">
      <div class="scroll-content" style="margin-top:0.45rem;">
        <y-select-date @select="selectDate($event)" :futureDate="true" :time="query"></y-select-date>
        <!--销售情况-->
        <div class="by_device">
          <!--缺货明细-->
          <div class="sequencing" style="margin-top: 0;">
            <div class="outtinvent">
              <div class="search_input search_latitud">
                <label class="form">
                  <input type="search" placeholder="请输入补货员名字" class="search" v-model="search">
                </label>
                <div class="search_btn" @click="productselllist()">搜索</div>
              </div>
              <ul class="inventory_list salesdata_list" style="min-height: 0.8rem;">
                <li v-for="(p,$index) in productarr"  @click="checkorder(p.id,p.create_time)">
                  <a href="javascript:;" class="central_list flex">
                    <div class="list_lef" style="width: 90%;">
                      <p class="time flex">
                        <span style="flex: 1">{{p.create_time}}</span>
                        <span style="flex: 1">{{p.user_name}}</span>
                      </p>
                    </div>
                    <div class="list_rig">
                      <i class="icon">&#xe600;</i>
                    </div>
                  </a>
                </li>
                <div class="noData" v-if="productarr.length==0">
                  <i class="icon">&#xe6bb;</i>
                  <p>暂无数据</p>
                </div>
              </ul>
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
    name:"workreport",
    data(){
      return {
        query:{
          times:this.$route.query.times,
          timee:this.$route.query.timee
        },
        search:"",
        type:0,
        productarr:[]
      }
    },
    mounted(){
      this.productselllist();
    },
    methods:{
      ...mapActions([
        "homeworkreport_"
      ]),
      checkorder(id,title){
        this.$router.push({name:"workdetail",query:{id:id,times:this.query.times,timee:this.query.timee,title:title}})
      },
      //按设备
      productselllist(){
        const data = {
          search:this.search,
          times:this.query.times,
          timee:this.query.timee
        }
        this.homeworkreport_(data).then((res)=>{
          if(res.success==200){
            this.productarr = res.data;
          }
        })
      },
      selectDate(data){
        this.query.times = data.formats[0];
        this.query.timee = data.formats[1];
        this.productselllist();
      }
    }
  }

</script>

<style scoped>


</style>
