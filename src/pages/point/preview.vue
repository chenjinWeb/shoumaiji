<template>
<!-- 新增 -->
  <div class="tab-content">
    <y-header title="点位预览" router="-1"></y-header>
    <div class="content">
        <div class="scroll-content" margin-header>
            <div class="management">
                <p class="tit"><span>点位名称</span></p>
                <div class="preview">
                    <p>{{data.detailAddress}}</p>
                </div>

            </div>
            <div class="management">
                <p class="tit"><span>设备信息</span></p>
                <div class="preview">
                    <p>点位类型：{{data.locationType}}</p>
                    <p class="clear"><span>详情说明：</span><span>{{data.remark}}</span></p>
                    <p class="clear"><span>详细地址：</span><span>{{data.detailAddress}}</span></p>
                    <p>装水时间：{{data.putWaterTime | date}}</p>
                    <p>开售时间：{{data.sellTime | date}}</p>
                    <p>环境是否封闭：{{data.environmentState==1? '是' : '否'}}</p>
                    <p>是否是重要出入口：{{data.entranceState==1? '是' : '否'}}</p>
                    <p>点位图片：</p>
                    <p class="img">
                      <img :src="i" alt="" v-for="(i,$index) in imgArr">
                    </p>
                </div>
            </div>
            <div class="management">
                <p class="tit"><span>时间特点</span></p>
                <div class="preview">
                    <p class="clear"><span>营业时间：</span><span>{{data.starTime}} - {{data.endTime}}</span></p>
                    <p class="clear"><span>高峰时段：</span><span>{{data.maxFlowRemark}}</span></p>
                </div>
            </div>
            <div class="management" v-if="data.competitionFactor">
              <p class="tit"><span>竞争因素</span></p>
              <div class="preview" v-for="(c,$index) in data.competitionFactor">
                <p class="clear"><span>类型名称：</span><span>{{c.type}}</span></p>
                <p class="clear"><span>距离信息：</span><span>{{c.distance_info}}</span></p>
                <p class="clear"><span>产品价格：</span><span>{{c.product_price}}</span></p>
              </div>
            </div>
            <div class="management" v-if="data.crowdTrait">
              <p class="tit"><span>人群属性特点</span></p>
              <div class="preview">
                <p class="clear"><span>人流量：</span><span>{{data.crowdTrait.visitors_flow}}</span></p>
                <p class="clear"><span>群体类型：</span><span>{{data.crowdTrait.group_type}}</span></p>
                <p class="clear"><span>年龄段：</span><span>{{data.crowdTrait.age_bracket}}</span></p>
                <p class="clear"><span>聚集点：</span><span>{{data.crowdTrait.import_point}}</span></p>
                <p class="clear"><span>平均停留：</span><span>{{data.crowdTrait.stay_time}}</span></p>
                <p class="clear"><span>支付方式：</span><span>{{data.crowdTrait.pay_style==1? "支付宝" : data.crowdTrait.pay_style==2? "微信" : "现金"}}</span></p>
                <p class="clear"><span>特殊习惯：</span><span>{{data.crowdTrait.habit}}</span></p>
                <p class="clear"><span>教育水平：</span><span>{{data.crowdTrait.edu_background}}</span></p>
                <p class="clear"><span>收入水平：</span><span>{{data.crowdTrait.income}}</span></p>
                <p class="clear"><span>备注说明：</span><span>{{data.crowdTrait.property_remark}}</span></p>
              </div>
            </div>
            <div class="management" v-if="data.natureEnvironment">
              <p class="tit"><span>自然环境</span></p>
              <div class="preview">
                <p class="clear"><span>温度：</span><span>{{data.natureEnvironment.temperature}}</span></p>
                <p class="clear"><span>湿度：</span><span>{{data.natureEnvironment.humidity}}</span></p>
                <p class="clear"><span>季节特点：</span><span>{{data.natureEnvironment.season}}</span></p>
                <p class="clear"><span>备注说明：</span><span>{{data.natureEnvironment.remark}}</span></p>
              </div>
            </div>
            <div class="management" v-if="data.trafficEnvironment">
              <p class="tit"><span>交通状况</span></p>
              <div class="preview">
                <p class="clear"><span>超出物流保障：</span><span>{{data.trafficEnvironment.out_of_range==1? '是' : '否'}}</span></p>
                <p class="clear"><span>范围：</span><span>{{data.trafficEnvironment.road_remark}}</span></p>
              </div>
            </div>
            <div class="management" v-if="data.buildEnvironment">
              <p class="tit"><span>施工条件</span></p>
              <div class="preview">
                <p class="clear"><span>电路情况：</span><span>{{data.buildEnvironment.circuit_state==1? '自行布线' : '已有路线'}}</span></p>
                <p class="clear"><span>用电说明：</span><span>{{data.buildEnvironment.electricity_use_remark}}</span></p>
                <p class="clear"><span>有无WIFI：</span><span>{{data.buildEnvironment.network_state==1? '有wifi' : '无wifi'}}</span></p>
                <p class="clear"><span>信号说明：</span><span>{{data.buildEnvironment.signal_remark}}</span></p>
                <p class="clear"><span>备注说明：</span><span>{{data.buildEnvironment.signal_remark}}</span></p>
              </div>
            </div>
            <!--<div class="management">
              <p class="tit"><span>市政规划情况</span></p>
              <div class="preview">
                <p class="clear"><span>备注说明：</span><span></span></p>
              </div>
            </div>
            <div class="management">
              <p class="tit"><span>其他</span></p>
              <div class="preview">
                <p class="clear"><span>备注说明：</span><span></span></p>
              </div>
            </div>-->

        </div>

    </div>
  </div>

</template>

<script>

  import {mapActions} from "vuex"

  export default {
    name:"product",
    data(){
      return {
        id:this.$route.query.id,
        imgArr:[],
        data:{}
      }
    },
    mounted(){
      this.previewdata()
    },
    methods:{
      ...mapActions([
        "previewpoint_",
      ]),
      previewdata(){
        this.previewpoint_({id:this.id}).then((res)=>{
          if(res.success==200 && res.data){
            this.imgArr = res.data.url? res.data.url.split(",") : [];
            this.data = res.data;
          }
        })
      }
    }
  }

</script>

<style scoped>


</style>
