<template>

  <div class="content-modal">
    <y-header title="其他" r_title="保存" @sured="sured()" router="-1"></y-header>
    <div class="content">
      <div class="scroll-content" margin-header>
        <ul class="basic_list">
          <li>
            <div class="central_list handily_list traff_list clear">
              <div class="list_rig fr" style="width: 100%;">
                <textarea name="" rows="2" placeholder="请输入其他内容" v-model="other"></textarea>
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
    name:"other",
    data(){
      return {
        other:''
      }
    },
    computed:{
      ...mapState({
        basicData:state=>state.basicData
      })
    },
    mounted(){
      this.other = this.basicData.other? this.basicData.other : "";
    },
    methods:{
      ...mapMutations([
        "getPointData"
      ]),
      sured(){
        this.getPointData({
          other:this.other
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
