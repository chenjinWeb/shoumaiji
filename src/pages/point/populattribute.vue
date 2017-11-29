<template>

  <div class="content-modal">
    <y-header title="人群属性特点" r_title="保存" @sured="sured()" router="-1"></y-header>
    <div class="content">
        <div class="scroll-content" margin-header>
          <ul class="basic_list">
                    <li>
                        <div class="central_list clear">
                            <div class="list_lef fl">人流量</div>
                            <div class="list_rig fr">
                                <input type="text" placeholder="请填写人群流量" class="txt" v-model="visitors_flow">
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="central_list clear">
                            <div class="list_lef fl">群体类型</div>
                            <div class="list_rig fr">
                                <input type="text" placeholder="请填写人群群体类型" class="txt" v-model="group_type">
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="central_list clear">
                            <div class="list_lef fl">年龄段</div>
                            <div class="list_rig fr">
                                <input type="text" placeholder="请填写人群年龄段" class="txt" v-model="age_bracket">
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="central_list clear">
                            <div class="list_lef fl">聚集点</div>
                            <div class="list_rig fr">
                                <input type="text" placeholder="请填写人群聚集点" class="txt" v-model="import_point">
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="central_list clear">
                            <div class="list_lef fl">平均停留</div>
                            <div class="list_rig fr">
                                <input type="text" placeholder="请填写人群平均停留时长" class="txt" v-model="stay_time">
                            </div>
                        </div>
                    </li>
                    <li>
                      <div class="central_list traffic_list clear">
                        <div class="list_lef fl">支付方式</div>
                        <div class="list_rig fr flex rig_du">
                          <label>
                                <span class="mint-radio">
                                  <input type="radio" class="mint-radio-input" value="1" v-model="pay_style">
                                  <span class="mint-radio-core"></span>
                                  <span class="mint-radio-label">支付宝</span>
                                </span>

                          </label>
                          <label>
                                <span class="mint-radio">
                                  <input type="radio" class="mint-radio-input" value="2" v-model="pay_style">
                                  <span class="mint-radio-core"></span>
                                  <span class="mint-radio-label">微信</span>
                                </span>

                          </label>
                          <label>
                                <span class="mint-radio">
                                  <input type="radio" class="mint-radio-input" value="3" v-model="pay_style">
                                  <span class="mint-radio-core"></span>
                                  <span class="mint-radio-label">现金</span>
                                </span>

                          </label>
                        </div>
                      </div>
                    </li>
                    <li>
                        <div class="central_list clear">
                            <div class="list_lef fl">特殊习惯</div>
                            <div class="list_rig fr">
                                <input type="text" placeholder="请填写人群特殊习惯" class="txt" v-model="habit">
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="central_list clear">
                            <div class="list_lef fl">教育水平</div>
                            <div class="list_rig fr">
                                <input type="text" placeholder="请填写人群教育水平" class="txt" v-model="edu_background">
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="central_list clear">
                            <div class="list_lef fl">收入水平</div>
                            <div class="list_rig fr">
                                <input type="text" placeholder="请填写人群收入水平" class="txt" v-model="income">
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="central_list explain_list traff_list clear">
                            <div class="list_lef fl">备注说明<p>（选填）</p></div>
                            <div class="list_rig fr">
                                <textarea name="" id="" rows="2" placeholder="请填写备注" v-model="property_remark"></textarea>
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

  import { Toast,Indicator,Radio,MessageBox } from 'mint-ui';

  Vue.component(Radio.name, Radio);

  export default {
    name:"populattribute",
    data(){
      return {
        visitors_flow:'',
        group_type:'',
        age_bracket:'',
        import_point:'',
        stay_time:'',
        pay_name:"",
        pay_style:'1',
        habit:'',
        edu_background:'',
        income:'',
        property_remark:'',
      }
    },
    mounted(){
      this.visitors_flow = this.basicData.crowdTrait? this.basicData.crowdTrait.visitors_flow : '';
      this.group_type = this.basicData.crowdTrait? this.basicData.crowdTrait.group_type : '';
      this.age_bracket = this.basicData.crowdTrait? this.basicData.crowdTrait.age_bracket : '';
      this.import_point = this.basicData.crowdTrait? this.basicData.crowdTrait.import_point : '';
      this.stay_time = this.basicData.crowdTrait? this.basicData.crowdTrait.stay_time : '';
      this.pay_style = this.basicData.crowdTrait? this.basicData.crowdTrait.pay_style : '1';
      this.habit = this.basicData.crowdTrait? this.basicData.crowdTrait.habit : '';
      this.edu_background = this.basicData.crowdTrait? this.basicData.crowdTrait.edu_background : '';
      this.income = this.basicData.crowdTrait? this.basicData.crowdTrait.income : '';
      this.property_remark = this.basicData.crowdTrait? this.basicData.crowdTrait.property_remark : '';
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
        const crowdTrait={
          visitors_flow:this.visitors_flow,
          group_type:this.group_type,
          age_bracket:this.age_bracket,
          import_point:this.import_point,
          stay_time:this.stay_time,
          pay_style:this.pay_style,
          habit:this.habit,
          edu_background:this.edu_background,
          income:this.income,
          property_remark:this.property_remark
        };
        this.getPointData({
          crowdTrait:crowdTrait
        })
        MessageBox.alert("保存成功").then(action=>{
          this.$router.go(-1)
        })
      },
    }
  }

</script>

<style scoped>
  .traffic_list .list_rig{ width: 75% !important;}
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
