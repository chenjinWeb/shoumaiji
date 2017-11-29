<template>

  <div class="content-modal">
    <y-header title="市政规划" r_title="保存" @sured="sured()" router="-1"></y-header>
    <div class="content">
        <div class="scroll-content" margin-header>
          <ul class="basic_list">
            <li>
              <div class="central_list handily_list traff_list clear">
                <div class="list_rig fr" style="width: 100%;">
                  <textarea name="" rows="2" placeholder="请输入点位未来有何市政规划" v-model="plan"></textarea>
                </div>
              </div>
            </li>
          </ul>
        </div>

    </div>

  </div>

</template>

<script>

  import Vue from "vue"

  import {mapState,mapMutations} from "vuex"

  import { Toast,Indicator,MessageBox  } from 'mint-ui';

  export default {
    name:"municipalplann",
    data(){
      return {
        plan:''
      }
    },
    computed:{
      ...mapState({
        basicData:state=>state.basicData
      })
    },
    mounted(){
      this.plan = this.basicData.plan? this.basicData.plan : '';
    },
    methods:{
      ...mapMutations([
        "getPointData"
      ]),
      sured(){
        this.getPointData({
          plan:this.plan
        })
        MessageBox.alert("保存成功").then(action=>{
          this.$router.go(-1)
        })
      }
    }
  }

</script>

<style scoped>


</style>
