<template>

  <div class="content-modal">
    <y-header title="自然坏境" r_title="保存" @sured="sured()" router="-1"></y-header>
    <div class="content">
        <div class="scroll-content" margin-header>
          <ul class="basic_list">
                <li>
                    <div class="central_list clear">
                        <div class="list_lef fl">温度</div>
                        <div class="list_rig fr">
                            <input type="text" placeholder="请填写环境温度" class="txt" v-model="temperature">
                        </div>
                    </div>
                </li>
                <li>
                    <div class="central_list clear">
                        <div class="list_lef fl">湿度</div>
                        <div class="list_rig fr">
                            <input type="text" placeholder="请填写环境湿度" class="txt" v-model="humidity">
                        </div>
                    </div>
                </li>
                <li>
                    <div class="central_list clear">
                        <div class="list_lef fl">季节特点</div>
                        <div class="list_rig fr">
                            <input type="text" placeholder="请填写季节环境季节特点" class="txt" v-model="season">
                        </div>
                    </div>
                </li>
                <li>
                    <div class="central_list handily_list traff_list clear">
                        <div class="list_lef fl">备注说明</div>
                        <div class="list_rig fr">
                            <textarea name="" id="" rows="2" placeholder="请填写备注" v-model="remark"></textarea>
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

  import { Toast,Indicator,MessageBox } from 'mint-ui';

  export default {
    name:"naturalenviront",
    data(){
      return {
        temperature:'',
        humidity:'',
        season:'',
        remark:'',
      }
    },
    mounted(){
      this.temperature = this.basicData.natureEnvironment? this.basicData.natureEnvironment.temperature : "";
      this.humidity = this.basicData.natureEnvironment? this.basicData.natureEnvironment.humidity : "";
      this.season = this.basicData.natureEnvironment? this.basicData.natureEnvironment.season : "";
      this.remark = this.basicData.natureEnvironment? this.basicData.natureEnvironment.remark : "";
    },
    computed:{
      ...mapState({
        basicData:state=>state.basicData
      })
    },
    methods:{
      ...mapMutations([
        "getPointData"
      ]),
      sured(){
        const natureEnvironment={
          temperature:this.temperature,
          humidity:this.humidity,
          season:this.season,
          remark:this.remark,
        }
        this.getPointData({
          natureEnvironment: natureEnvironment
        })
        MessageBox.alert("保存成功").then(action=>{
          this.$router.go(-1)
        })
      },
    }
  }

</script>

<style scoped>


</style>
