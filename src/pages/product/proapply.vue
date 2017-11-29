<template>
  <div class="content-modal">
    <y-header title="采购申请" router="-1"></y-header>
    <div class="content">
      <div class="scroll-content" style="margin-top:0.45rem;">
        <y-select-date @select="selectDate($event)" :futureDate="true" :time="query"></y-select-date>
        <!--销售情况-->
        <div class="by_device">
          <!--缺货明细-->
          <div class="sequencing" style="margin-top: 0;">
            <div class="outtinvent">
              <ul class="inventory_list salesdata_list">
                <li v-for="(d,$index) in productarr" @click="goPage(d.inState,d.id)">
                  <a href="javascript:;" class="central_list flex">
                    <div class="list_lef" style="width: 90%;">
                      <p class="time flex">
                        <span style="flex: 4;" class="overnone">{{d.time | dates}}</span>
                        <span style="flex: 2" class="overnone" :class="d.inState==2? '' : d.inState==1? 'redcolr' : 'bulecolr'">{{d.inState==0? '待审核' : d.inState==1? '已拒绝' : '已同意'}}</span>
                      </p>
                      <p class="time">
                        <span>采购单号：{{d.order_number}}</span>
                      </p>
                    </div>
                    <div class="list_rig">
                      <i class="icon">&#xe600;</i>
                    </div>

                  </a>
                </li>
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
    name:"proapply",
    data(){
      return {
        p_w_id:this.$route.query.id,
        query:{
          times:Date.format(new Date,'yyyy-MM-dd'),
          timee:Date.format(new Date,'yyyy-MM-dd')
        },
        type:0,
        productarr:[]
      }
    },
    mounted(){
      this.getsaledetail()
    },
    methods:{
      ...mapActions([
        "procureapply_"
      ]),
      //页面跳转
      goPage(state,id){
        if(state==0){
          //待审核0
          this.$router.push({name:"prowait",query:{id:id}})
        }else if(state==1){
          //已拒绝
          this.$router.push({name:"prorefuze",query:{id:id}})
        }else{
          //已同意
          this.$router.push({name:"goodsdetails",query:{id:id}})
        }

      },
      getsaledetail(){
        const data = {
          times:this.query.times,
          timee:this.query.timee,
          p_w_id:this.p_w_id
        }
        this.procureapply_(data).then((res)=>{
          if(res.success==200){
            this.productarr= res.data;
          }
        })
      },
      //0(待审核)/1(拒绝)/2(待入库)/3(已入库)
      state(state){
        switch (state){
          case 0:
            return "待审核"
            break;
          case 1:
            return "已拒绝"
            break;
          case 2:
            return "已同意"
            break;
        }
      },
      selectDate(data){
        this.query.times = data.formats[0];
        this.query.timee = data.formats[1];
        this.getsaledetail();
      }
    }
  }

</script>

<style scoped>


</style>
