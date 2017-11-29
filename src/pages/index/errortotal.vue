<template>

  <div class="content-modal">

    <y-header title="统计详情" router="-1"></y-header>

    <div class="content">
      <y-select-date @select="selectDate($event)" :futureDate="true" :time="query" style="margin-top: 0.45rem;"></y-select-date>
      <div class="scroll-content"  style="margin-top:0.83rem;">
        <div class="outtinvent">
          <div class="outsrock_top">
            <div class="outsrock clear" style="width: 80%; padding-left: 20%;">
              <a href="javascript:;" :class="{ 'active': activeNum == 1}" @click="activeNum=1">离线</a>
              <a href="javascript:;" :class="{ 'active': activeNum == 2}" @click="activeNum=2">出货失败</a>
            </div>
          </div>

          <ul class="inventory_list salesdata_list" v-if="activeNum == 1">
            <li v-for="(m,$index) in allarr">
              <a href="javascript:;" class="central_list flex">
                <div class="list_lef" style="width: 45%;">
                  <p><span>{{m.vending_machine_another}}</span></p>
                  <p class="time">编号：{{m.vending_machine_number}}</p>
                </div>
                <div class="list_lef" style="width: 50%; left: 53%;">
                  <p class="time">&nbsp;</p>
                  <p class="time">天数：{{m.countdays}}天</p>
                </div>
              </a>
            </li>
          </ul>

          <ul class="inventory_list salesdata_list" v-if="activeNum == 2">
            <li v-for="(m,$index) in offarr" @click="gopage(m.vending_machine_id)">
              <a href="javascript:;" class="central_list flex">
                <div class="list_lef" style="width: 50%;">
                  <p><span>{{m.vending_machine_another}}</span></p>
                  <p class="time">编号：{{m.vending_machine_number}}</p>
                </div>
                <div class="list_lef" style="width: 50%; left: 53%;">
                  <p class="time">&nbsp;</p>
                  <p class="time">次数：{{m.count}}次&nbsp;&nbsp;</p>
                </div>
                <div class="list_rig fr short_right">
                  <i class="icon">&#xe600;</i>
                </div>
              </a>
            </li>
          </ul>

          <div class="noData" style="position: static; padding: 0.3rem 0;" v-if="activeNum==1 && allarr.length==0">
            <i class="icon">&#xe6bb;</i>
            <p>暂无数据</p>
          </div>

          <div class="noData" style="position: static; padding: 0.3rem 0;" v-if="activeNum==2 && offarr.length==0">
            <i class="icon">&#xe6bb;</i>
            <p>暂无数据</p>
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

  import {mapActions} from "vuex"

  import {MessageBox} from "mint-ui"

  export default {
    name:"errortotal",
    data(){
      return {
        activeNum:1,
        allarr:[],
        offarr:[],
        query:{
          times:Date.format(new Date(),"yyyy-MM-dd"),
          timee:Date.format(new Date(),"yyyy-MM-dd")
        }
      }
    },
    watch:{
      activeNum:function (value){
        if(value == 1 && this.allarr.length>0){
          return
        }

        if(value == 2 && this.offarr.length>0){
          return
        }

        if(value == 1 && this.allarr.length==0){
          this.deviceerr('allarr',1);
        }

        if(value == 2 && this.offarr.length==0){
          this.deviceerr('offarr',2);
        }

      }
    },
    mounted(){
      this.deviceerr('allarr',1);
      this.deviceerr('offarr',2);
    },
    methods:{
      ...mapActions([
        "errordetail_"
      ]),
      selectDate(data){
        this.query.times = data.formats[0];
        this.query.timee = data.formats[1];
        var  name = this.activeNum==1? "allarr" : "offarr";
        this.deviceerr(name,this.activeNum)
      },
      deviceerr(name,type){
        const data = {
          type:1,
          by:type
        }
        Object.assign(data,this.query)
        this.errordetail_(data).then((res)=>{
          if(res.success==200){
            this[name] = res.data || [];
          }
        })
      },
      gopage(id){
        this.$router.push({name:"errororder",query:{vmId:id,times:this.query.times,timee:this.query.timee}})
      }
    }
  }

</script>

<style scoped>


</style>
