<template>
<!-- 新增 -->
  <div class="content-modal">
    <y-header title="商品统计" router="-1"></y-header>
    <div class="content">
        <div class="scroll-content" margin-header>
            <ul class="statostoc_list">
                <li v-for="(i,$index) in soldInfoList">
                    <div class="central_list clear">
                        <div class="list_lef fl">{{$index+1}}. {{i.name}}</div>
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
    name:"statistics",
    data(){
      return {
        query:{},
        soldInfoList:[],
      }
    },
    mounted(){
        let query = this.$route.query;
        this.query.vmId = query.vmId;
        this.getsoldInfo();
    },
    methods:{
        ...mapActions([
            'soldInfo_',
        ]),
        getsoldInfo(){
            this.soldInfo_(this.query).then(res =>{
                if(res.success == 200){
                    console.info(res);
                    this.soldInfoList=res.data;
                }
            })
        }
    },
  }

</script>

<style scoped>


</style>
