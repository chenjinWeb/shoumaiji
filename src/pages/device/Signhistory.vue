<template>
<!-- 新增 -->
  <div class="content-modal">
    <y-header title="签到历史" router="-1"></y-header>
    <div class="content">
        <div class="scroll-content" margin-header>
                <ul class="creat_list stoty">
                    <li v-for="a in signedInfoList">
                        <a href="javascript:;" class="central_list clear">
                            <div class="list_lef fl flex">{{a.create_time}}</div>
                            <div class="list_rig fr">
                                持续时间：{{a.duration | formatSeconds}}
                            </div>
                        </a>
                    </li>
                </ul>
        </div>
    </div>
  </div>

</template>

<script>
import Vue from 'vue'

import {mapActions} from 'vuex'

  export default {
    name:"Signhistory",
    data(){
      return {
        signedInfoList:[],
        query:{},
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
                    console.info(res);
                    this.signedInfoList = res.data;
                }
            })
        }
    },
  }

</script>

<style scoped>


</style>
