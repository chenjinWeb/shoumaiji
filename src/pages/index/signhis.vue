<template>
  <!-- 新增 -->
  <div class="content-modal">
    <y-header title="补货历史" router="-1"></y-header>
    <div class="content">
      <div class="scroll-content" margin-header>
        <ul class="creat_list stoty">
          <li v-for="a in signedInfoList" @click="gopage(a.id)">
            <a href="javascript:;" class="central_list clear">
              <div class="list_lef fl flex">{{a.time | dates}}</div>
              <div class="list_rig fr short_right">
                <i class="icon">&#xe600;</i>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <transition name="custom-classes-transition" enter-active-class="animated nav-open" leave-active-class="animated nav-close">
      <router-view></router-view>
    </transition>

  </div>

</template>

<script>
  import Vue from 'vue'

  import {mapActions} from 'vuex'

  export default {
    name:"signhis",
    data(){
      return {
        signedInfoList:[],
        query:{
          type:3
        },
      }
    },
    mounted(){
      let query = this.$route.query;
      this.query.vmId = query.vmId;
      this.getDataInfo();
    },
    methods:{
      ...mapActions([
        'signedInfo_',
      ]),
      getDataInfo(){
        this.signedInfo_(this.query).then(res=>{
          if(res.success==200){
            this.signedInfoList = res.data;
          }
        })
      },
      gopage(id){
        this.$router.push({name:"signhisdetail",query:{id:id,vmId:this.query.vmId}})
      }
    },
  }

</script>

<style scoped>


</style>
