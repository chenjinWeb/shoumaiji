<template>
  <!-- 新增 -->
  <div class="content-modal">
    <y-header title="详情" router="-1"></y-header>
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
                  <span>入库：</span>{{detail.count}}
                </div>
              </div>
            </li>
          </ul>
          <div class="pro_money">
            成本价值：{{totalmoney | thoundnum}}元
          </div>
          <div class="noData" v-if="detailArr.length==0">
            <i class="icon">&#xe6bb;</i>
            <p>暂无数据</p>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

  import {mapActions} from "vuex"

  export default {
    name:"instoreddetail",
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
        "procureapply_"
      ]),
    }
  }

</script>

<style scoped>


</style>
