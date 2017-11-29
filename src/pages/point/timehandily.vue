<template>

  <div class="content-modal">
    <y-header title="时间特点" r_title="保存" @sured="sured()" router="-1"></y-header>
    <div class="content">
        <div class="scroll-content" margin-header>
          <ul class="basic_list">
              <li>
                  <div class="central_list clear">
                      <div class="list_lef fl">营业时间</div>
                      <div class="list_rig fr">
                        <el-time-select placeholder="起始时间" @change="getstart(starTime)" v-model="starTime" :picker-options="{
      start: '00:00',
      step: '00:15',
      end: '23:59'
    }">
                        </el-time-select>
                      </div>
                  </div>
              </li>
              <li>
                  <div class="central_list clear">
                      <div class="list_lef fl" style="display: none;">营业时间</div>
                      <div class="list_rig fr">
                        <el-time-select placeholder="结束时间" @change="getend(endTime)" v-model="endTime" :picker-options="{
      start: '00:00',
      step: '00:15',
      end: '23:59',
      minTime: starTime
    }">
                        </el-time-select>
                      </div>
                  </div>
              </li>
              <li>
                  <div class="central_list handily_list clear">
                      <div class="list_lef fl">高峰时段</div>
                      <div class="list_rig fr">
                          <textarea name="" id="" rows="3" placeholder="填写各时期人流聚集高峰 例如 高峰时段 12:00-14:30 高峰星期 周六、周日 高峰月份 七八月份" v-model="maxFlowRemark"></textarea>
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

  import {MessageBox} from "mint-ui"

  import {mapState,mapMutations} from "vuex"

  export default {
    name:"timehandily",
    data(){
      return {
        starTime:"",
        endTime:"",
        maxFlowRemark:""
      }
    },
    computed:{
      ...mapState({
        basicData:state=>state.basicData
      })
    },
    mounted(){
      this.starTime = this.basicData.starTime? this.basicData.starTime : "";
      this.endTime = this.basicData.endTime? this.basicData.endTime : "";
      this.maxFlowRemark = this.basicData.maxFlowRemark? this.basicData.maxFlowRemark : "";
    },
    methods:{
      ...mapMutations([
        "getPointData"
      ]),
      getstart(value){
        this.starTime = value;
      },
      getend(value){
        this.endTime = value;
      },
      sured(){
        this.getPointData(
          {
            starTime:this.starTime,
            endTime:this.endTime,
            maxFlowRemark:this.maxFlowRemark
          }
        )
        MessageBox.alert("保存成功").then(action=>{
          this.$router.go(-1)
        })
      }
    }
  }

</script>

<style>
  .picker-slot-wrapper .picker-item{ top: 1px;}

</style>
