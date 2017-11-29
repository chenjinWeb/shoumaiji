<template>
  <div class="content-modal">
    <y-header :title="title" router="-1"></y-header>
    <div class="content">
      <div class="scroll-content" style="margin-top:0.45rem;">
        <!--销售情况-->
        <div class="by_device">
          <!--缺货明细-->
          <div class="sequencing" style="margin-top: 0;">
            <div class="outtinvent">
              <ul class="inventory_list salesdata_list" style="min-height: 0.8rem;">
                <li v-for="(p,$index) in productarr">
                  <a href="javascript:;" class="central_list flex">
                    <div class="list_lef" style="width: 90%;">
                      <p><span>{{p.vmTime | dates}}</span></p>
                      <p class="time">
                        <span class="list_w_l">{{p.name}}</span>
                        <span class="list_w" style="margin-left: 25%;">货道【{{p.offaisles}}】</span>
                      </p>
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
    name:"lacksell",
    data(){
      return {
        title:this.$route.query.title,
        query:{
          times:this.$route.query.times,
          timee:this.$route.query.timee,
          id:this.$route.query.id
        },
        productarr:[]
      }
    },
    mounted(){
      this.productselllist();
    },
    methods:{
      ...mapActions([
        "lackselllist_"
      ]),
      //按设备
      productselllist(){
        const data = {
          times:this.query.times,
          timee:this.query.timee,
          type:1,
          id:this.query.id,
        }
        this.lackselllist_(data).then((res)=>{
          if(res.success==200){
            this.productarr = res.data;
          }
        })
      }
    }
  }

</script>

<style scoped>


</style>
