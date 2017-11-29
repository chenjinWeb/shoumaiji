<template>
  <div class="content-modal">
    <y-header title="历史日报" router="-1"></y-header>
    <div class="content">
      <div class="scroll-content" style="margin-top:0.45rem;">
        <y-select-date @select="selectDate($event)" :futureDate="true" :time="query"></y-select-date>
        <!--销售情况-->
        <div class="by_device">
          <!--缺货明细-->
          <div class="sequencing" style="margin-top: 0;">
            <div class="outtinvent">
              <ul class="inventory_list salesdata_list" style="min-height: 0.8rem;">
                <li v-for="(p,$index) in productarr"  @click="checkorder(p.id,p.create_time)">
                  <a href="javascript:;" class="central_list flex">
                    <div class="list_lef" style="width: 90%;">
                      <p><span>{{p.create_time}}</span></p>
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

  import {mapActions,mapMutations} from "vuex"

  import {Toast} from "mint-ui"

  export default {
    name:"historyreport",
    data(){
      return {
        query:{
          times:Date.format(new Date(),"yyyy-MM-dd"),
          timee:Date.format(new Date(),"yyyy-MM-dd")
        },
        productarr:[]
      }
    },
    mounted(){
      this.productselllist();
    },
    methods:{
      ...mapActions([
        "historywork_",
        "historyworkdetail_"
      ]),
      ...mapMutations([

      ]),
      checkorder(id,title){
        this.$router.push({name:"historyreportdetail",query:{id:id,title:title}})
      },
      //按设备
      productselllist(){
        const data = {
          times:this.query.times,
          timee:this.query.timee
        }
        this.historywork_(data).then((res)=>{
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
