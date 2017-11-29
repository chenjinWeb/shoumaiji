<template>

  <div class="content-modal">
    <y-header title="交通状况" r_title="保存" @sured="sured()" router="-1"></y-header>
    <div class="content">
        <div class="scroll-content" margin-header>
          <ul class="basic_list">
                <li>
                    <div class="central_list traffic_list clear">
                        <div class="list_lef fl">超出物流保障范围</div>
                        <div class="list_rig fr flex rig_du">
                            <label>
                                <span class="mint-radio">
                                  <input type="radio" class="mint-radio-input" value="1" v-model="out_of_range">
                                  <span class="mint-radio-core"></span>
                                  <span class="mint-radio-label">是</span>
                                </span>

                            </label>
                            <label>
                                <span class="mint-radio">
                                  <input type="radio" class="mint-radio-input" value="2" v-model="out_of_range">
                                  <span class="mint-radio-core"></span>
                                  <span class="mint-radio-label">否</span>
                                </span>

                            </label>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="central_list handily_list traff_list clear">
                        <div class="list_lef fl">备注说明</div>
                        <div class="list_rig fr">
                            <textarea name="" id="" rows="2" placeholder="请填写备注" v-model="road_remark"></textarea>
                        </div>
                    </div>
                </li>
            </ul>
        </div>

    </div>

  </div>

</template>

<script>
  //
  import Vue from "vue"

  import {mapState,mapMutations} from "vuex"

  import { Toast,Indicator,Radio,MessageBox } from 'mint-ui';

  Vue.component(Radio.name, Radio);

  export default {
    name:"traffic",
    data(){
      return {
        out_of_range:'1',
        road_remark:""
      }
    },
    mounted(){
      this.out_of_range = this.basicData.trafficEnvironment? this.basicData.trafficEnvironment.out_of_range : "1";
      this.road_remark = this.basicData.trafficEnvironment? this.basicData.trafficEnvironment.road_remark : "";
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
        const trafficEnvironment={
          out_of_range:this.out_of_range,
          road_remark:this.road_remark
        }
        this.getPointData({
          trafficEnvironment: trafficEnvironment
        });
        MessageBox.alert("保存成功").then(action=>{
          this.$router.go(-1)
        })
      },
    }
  }

</script>

<style scoped>
  .mint-radio-input:checked + .mint-radio-core {
    background-color: #fcfcfc;
    border-color: #cfcfcf;
}
.mint-radio-input:checked + .mint-radio-core::after {
    background-color: #2d72ff;
    -webkit-transform: scale(1);
    transform: scale(1);
}
.mint-radio-label{
  margin-right:0.4rem;
}
.mint-radio-core {
    width:0.18rem;
    height:0.18rem;
}
.mint-radio-core::after {
    top:0.035rem;
    left:0.035rem;
    position: absolute;
    width:0.09rem;
    height:0.09rem;
    border-radius: 100%;
}
.mint-radio-input:checked + .mint-radio-core + .mint-radio-label{
  color:#333333;
}
</style>
