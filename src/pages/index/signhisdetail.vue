<template>
  <!-- 新增 -->
  <div class="content-modal">
    <y-header title="详情" router="-1"></y-header>

    <div class="content">
      <div class="scroll-content" margin-header>
        <ul class="statostoc_list">
          <li v-for="(i,$index) in soldInfoList">
            <div class="central_list clear">
              <div class="list_lef fl">{{i.pName}}({{i.weight}}{{i.unit}})</div>
              <div class="list_rig fr">{{i.count}}瓶</div>
            </div>
          </li>
        </ul>
        <div class="noData" v-if="soldInfoList.length==0">
          <i class="icon">&#xe6bb;</i>
          <p>暂无数据</p>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
  import Vue from 'vue'

  import {mapActions} from 'vuex'

  export default {
    name:"signhisdetail",
    data(){
      return {
        query:{
          type:3,
          vmId:this.$route.query.vmId,
          infoId:this.$route.query.id
        },
        soldInfoList:[],
      }
    },
    mounted(){
      this.getsoldInfo();
    },
    methods:{
      ...mapActions([
        'signedInfo_',
      ]),
      getsoldInfo(){
        this.signedInfo_(this.query).then(res =>{
          if(res.success == 200){
            this.soldInfoList=res.data;
          }
        })
      }
    },
  }

</script>

<style scoped>


</style>
