<template>
  <div class="content-modal">
    <y-header title="采购审核" router="-1"></y-header>
    <div class="content">
      <div class="scroll-content" style="margin-top:0.45rem;">
        <y-select-date @select="selectDate($event)" :futureDate="true" :time="query"></y-select-date>
        <!--销售情况-->
        <div class="by_device">
          <!--缺货明细-->
          <div class="sequencing" style="margin-top: 0;">
            <div class="outtinvent">
              <div class="search_input search_latitud">
                <label class="form">
                  <input type="search" placeholder="请输入申请人名字,单号,状态或仓库名" class="search" v-model="keyword">
                </label>
                <div class="search_btn" @click="getsaledetail()">搜索</div>
              </div>
              <ul class="inventory_list salesdata_list">
                <li v-for="(d,$index) in devicearr" @click="goPage(d.inState,d.id)">
                  <a href="javascript:;" class="central_list flex">
                    <div class="list_lef storescont" style="width: 45%; top: 24%;">
                      <p><span style="font-size: 0.14rem;">{{d.time | dates}}</span></p>
                    </div>
                    <div class="list_rig list_teleft" style="width: 55%; top: 8%; line-height: normal;">
                      <p class="time list_time_flex flex">
                        <span style="width: 50%;">{{d.user_name}}</span>
                        <span style="width: 50%;" :class="d.inState==2? '' : d.inState==1? 'redcolr' : 'bulecolr'">{{state(d.inState)}}</span>
                      </p>
                    </div>
                    <div class="list_rig" style="width: 5%;">
                      <i class="icon">&#xe600;</i>
                    </div>
                    <div style="position: absolute; top: 41%;">
                      采购单号：{{d.order_number}}
                    </div>
                    <div style="position: absolute; top: 69%;">
                      仓库：{{d.storehouse}}
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>
        <div class="noData" v-if="devicearr.length==0">
          <i class="icon">&#xe6bb;</i>
          <p>暂无数据</p>
        </div>

      </div>
    </div>
    <transition name="custom-classes-transition" enter-active-class="animated nav-open" leave-active-class="animated nav-close">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import Vue from "vue"

  import {mapState,mapActions,mapMutations} from "vuex"

  import ElementUI from 'element-ui'

  import {Toast,MessageBox} from "mint-ui"

  export default {
    name:"procurecheck",
    data(){
      return {
        p_w_id:this.$route.query.id,
        options: [],
        value: '',
        outOptions: [],
        outValue: '',
        query:{
          times:Date.format(new Date,'yyyy-MM-dd'),
          timee:Date.format(new Date,'yyyy-MM-dd'),
        },
        keyword:"",
        devicearr:[],
      }
    },
    watch:{

    },
    computed:{

    },
    mounted(){
      this.getsaledetail();
    },
    methods:{
      ...mapActions([
        "procureapply_"
      ]),
      //取消
      deleteli(index,id){
        MessageBox.confirm('是否取消该出库记录?').then(action => {
          this.cancelstore_({type:2,id:id}).then((res)=>{
            if(res.success==200){
              this.devicearr.splice(index,1)
            }
          })
        },action=>{

        });
      },
      //页面跳转
      goPage(state,id){
        //已同意和已拒绝
        if(state==2 || state==1){
          this.$router.push({name:"procheckdetail",query:{id:id}})
        }else if(state==0){
          this.$router.push({name:"procheck",query:{id:id}})
        }
      },
      //0(待审核)/1(拒绝)/2(待入库)/3(已入库)
      state(state){
        switch (state){
          case 0:
            return "待审核"
            break;
          case 1:
            return "已拒绝"
            break;
          case 2:
            return "已同意"
            break;
        }
      },
      //按指定时间段获取销售总额详情(现金、支付宝、微信)
      selectDate(data){
        this.query.times = data.formats[0];
        this.query.timee = data.formats[1];
        this.getsaledetail();
      },
      getsaledetail(){
        const data = {
          search:this.keyword,
          times:this.query.times,
          timee:this.query.timee,
          p_w_id:this.p_w_id
        }
        this.procureapply_(data).then((res)=>{
          if(res.success==200){
            this.devicearr= res.data;
          }
        })
      },
    }
  }

</script>

<style scoped>

  .el-select-dropdown__item{ text-align: left;}

</style>
