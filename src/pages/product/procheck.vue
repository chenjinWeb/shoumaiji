<template>
  <!-- 新增 -->
  <div class="content-modal">
    <y-header title="审核" router="-1"></y-header>
    <div class="content">
      <div class="scroll-content" margin-header>
        <div class="management">
          <ul class="creat_list">
            <li v-for="(detail,$index) in detailArr">
              <div class="pro_title">{{detail.pName}}（{{detail.weight}}{{detail.unit}}）</div>
              <div class="pro_number">
                <div>
                  <span >成本价：</span>{{detail.costPrice}}
                </div>
                <div>
                  <span>申请：</span>{{detail.count}}
                </div>
              </div>
            </li>
          </ul>
          <div class="pro_money_check" v-if="detailArr.length!=0">
            预计成本价值：{{totalmoney | thoundnum}}元
          </div>
          <div class="noData" v-if="detailArr.length==0">
            <i class="icon">&#xe6bb;</i>
            <p>暂无数据</p>
          </div>
        </div>
        <div class="foot_menu flex" v-if="detailArr.length!=0">
          <a href="javascript:;" class="cancel_but" @click.stop="refuzereason()">拒绝</a>
          <a href="javascript:;" class="confirm_but boxflex" @click="sureadd()">确认</a>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

  import {mapActions} from "vuex"

  import {MessageBox} from "mint-ui"

  export default {
    name:"procheck",
    data(){
      return {
        id:this.$route.query.id,
        totalmoney:0,
        detailArr:[]
      }
    },
    mounted(){
      this.procureapply_({id:this.id}).then((res)=>{
        if(res.success==200 && res.data && res.data.length > 0){
          this.detailArr = res.data;
          this.detailArr.forEach((item,index)=>{
            this.totalmoney+=item.costPrice*item.count
          })
        }
      })
    },
    methods:{
      ...mapActions([
        "procureapply_",
        "auditiwh_",
        "refuzereason_"
      ]),
      //拒绝
      refuzereason(){
        this.refuzereason_({id:this.id}).then((res)=>{
          if(res.success==200){
            MessageBox.alert("拒绝成功!").then(action=>{
              this.$router.go(-1)
            })
          }
        })
      },
      sureadd(){
        const json = {
          id:this.id
        }
        const data = [];

        this.detailArr.forEach((item,index)=>{
          data.push({p_id:item.p_id,count:item.count})
        })

        json.data=data;

        this.auditiwh_({json:JSON.stringify(json)}).then((res)=>{
          if(res.success==200){
            MessageBox.alert("采购审核成功!").then(action=>{
              this.$router.go(-1)
            })
          }
        })
      }
    }
  }

</script>

<style scoped>


</style>
