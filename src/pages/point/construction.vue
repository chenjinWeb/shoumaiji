<template>
  <div class="content-modal">
    <y-header title="施工条件" r_title="保存" @sured="sured()" router="-1"></y-header>
    <div class="content">
        <div class="scroll-content" margin-header>
          <ul class="basic_list">
                <li>
                    <div class="central_list clear">
                        <div class="list_lef fl">电路情况</div>
                        <div class="list_rig fr flex rig_du">
                            <label>
                                <span class="mint-radio">
                                <input type="radio" class="mint-radio-input" value="1" v-model="circuit_state">
                                <span class="mint-radio-core"></span>
                                <span class="mint-radio-label">自行布线</span>
                                </span>

                            </label>
                            <label>
                                <span class="mint-radio">
                                <input type="radio" class="mint-radio-input" value="2" v-model="circuit_state">
                                <span class="mint-radio-core"></span>
                                <span class="mint-radio-label">已有线路</span>
                                </span>

                            </label>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="central_list handily_list traff_list clear">
                        <div class="list_lef fl">用电说明</div>
                        <div class="list_rig fr">
                            <textarea name="" rows="2" placeholder="请填写施工用电情况" v-model="electricity_use_remark"></textarea>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="central_list clear">
                        <div class="list_lef fl">电路情况</div>
                        <div class="list_rig fr flex rig_du">
                            <label>
                                <span class="mint-radio">
                                <input type="radio" class="mint-radio-input" value="1" v-model="network_state">
                                <span class="mint-radio-core"></span>
                                <span class="mint-radio-label">有WIFI</span>
                                </span>

                            </label>
                            <label>
                                <span class="mint-radio">
                                <input type="radio" class="mint-radio-input" value="2" v-model="network_state">
                                <span class="mint-radio-core"></span>
                                <span class="mint-radio-label">无WIFI</span>
                                </span>

                            </label>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="central_list handily_list traff_list clear">
                        <div class="list_lef fl">信号说明</div>
                        <div class="list_rig fr">
                            <textarea name="" rows="2" placeholder="请填写施工附近信号情况" v-model="signal_remark"></textarea>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="central_list  explain_list traff_list clear">
                        <div class="list_lef fl">备注说明<p>（选填）</p></div>
                        <div class="list_rig fr">
                            <textarea name="" rows="2" placeholder="请填写备注" v-model="remark"></textarea>
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

  import { Toast,Indicator,Radio,MessageBox  } from 'mint-ui';

  Vue.component(Radio.name,Radio)

  export default {
    name:"point",
    data(){
      return {
        circuit_state:'1',
        electricity_use_remark:'',
        network_state:'1',
        signal_remark:'',
        remark:''
      }
    },
    computed:{
      ...mapState({
        basicData:state=>state.basicData
      })
    },
    mounted(){
      this.circuit_state = this.basicData.buildEnvironment? this.basicData.buildEnvironment.circuit_state : '1';
      this.electricity_use_remark = this.basicData.buildEnvironment? this.basicData.buildEnvironment.electricity_use_remark : '';
      this.network_state = this.basicData.buildEnvironment? this.basicData.buildEnvironment.network_state : '1';
      this.signal_remark = this.basicData.buildEnvironment? this.basicData.buildEnvironment.signal_remark : '';
      this.remark = this.basicData.buildEnvironment? this.basicData.buildEnvironment.remark : '';
    },
    methods:{
      ...mapMutations([
        "getPointData"
      ]),
      sured(){
        const buildEnvironment={
          circuit_state:this.circuit_state,
          electricity_use_remark:this.electricity_use_remark,
          network_state:this.network_state,
          signal_remark:this.signal_remark,
          remark:this.remark
        }
        this.getPointData({
          buildEnvironment:buildEnvironment
        });
        MessageBox.alert("保存成功").then(action=>{
          this.$router.go(-1)
        })
      }
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
        width:0.18rem !important;
        height:0.18rem !important;
    }
    .mint-radio-core::after {
        top:0.035rem !important;
        left:0.035rem !important;
        position: absolute;
        width:0.09rem !important;
        height:0.09rem !important;
        border-radius: 100%;
    }
    .mint-radio-input:checked + .mint-radio-core + .mint-radio-label{
        color:#333333;
    }

</style>
