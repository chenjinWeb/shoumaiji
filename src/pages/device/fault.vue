<template>

  <div class="content-modal">
    <y-header title="故障信息" router="-1"></y-header>
    <div class="content">
        <div class="scroll-content" margin-header>
            <div class="outtinvent">
                <ul class="inventory_list">
                    <li v-for="b in vmErrorList">
                        <a href="javascript:;" class="central_list flex">
                            <div class="list_lef storescont">
                                <p>
                                <span v-if="b.type == 1">系统故障</span>
                                <span v-else-if="b.type == 2">纸币器故障</span>
                                <span v-else-if="b.type == 3">硬币器故障</span>
                                <span v-else-if="b.type == 4">通讯故障</span>
                                <span v-else-if="b.type == 5">网络异常</span>
                                <span v-else-if="b.type == 6">空道</span>
                                </p>
                                <p class="time">
                                    {{b.update_time}}
                                </p>
                            </div>
                            <!--<div class="list_rig">
                                <span v-if="b.state == 1" class="clblue" @click="recovery()">恢复</span>
                                <span v-else>已恢复</span>
                            </div>-->
                        </a>
                    </li>
                </ul>
                <div class="noData" v-if="vmErrorList.length==0">
                  <i class="icon">&#xe6bb;</i>
                  <p>暂无数据</p>
                </div>
            </div>
        </div>
    </div>
  </div>

</template>

<script>

import Vue from 'vue'

import { MessageBox,Toast } from 'mint-ui';
import {mapActions} from 'vuex'

  export default {
    name:"fault",
    data(){
      return {
        menuNum:1,
        query:{
            type:0
        },
        vmErrorList:[]
      }
    },
    mounted(){
        let query = this.$route.query
        Object.assign(this.query,query);
        this.getData();
    },
    methods:{
        ...mapActions([
            'vmError_',
            'updateVmError_',
        ]),
        getData(){
            this.vmError_(this.query).then(res=>{
                if(res.success==200){
                    console.info(res);
                    this.vmErrorList=res.data;
                }
            })
        },
        recovery(){
            MessageBox.confirm('您确定要恢复该设备吗？', '').then( res => {
                this.updateVmError_({vmId:this.query.vmId}).then(res => {
                    if(res.success == 200){
                        Toast('恢复成功！')
                    }
                })
            } ).catch( (e)=>{
                console.info(e)
            } );
        }
    }
  }

</script>

<style scoped>


</style>
