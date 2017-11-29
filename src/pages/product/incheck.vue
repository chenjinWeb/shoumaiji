<template>
  <!-- 新增 -->
  <div class="content-modal">
    <y-header title="入库确认" router="-1"></y-header>
    <div class="content">
      <div class="scroll-content" margin-header>
        <div class="management">
          <ul class="creat_list">
            <li v-for="(detail,$index) in detailArr">
              <div class="pro_title">{{detail.pName}}（{{detail.weight}}{{detail.unit}}）</div>
              <div class="pro_number">
                <div>
                  <span >成本价：</span><input type="text" v-model="detail.costPrice" class="incheck_input" @keyup="getMoney()"/>
                </div>
                <div>
                  <span>入库：</span><input type="text" v-model="detail.count" class="incheck_input" @keyup="getMoney()"/>
                </div>
              </div>
            </li>
          </ul>
          <div class="pro_money_check" v-if="detailArr.length!=0">
            成本价值：{{totalmoney | thoundnum}}元
          </div>
          <div class="noData" v-if="detailArr.length==0">
            <i class="icon">&#xe6bb;</i>
            <p>暂无数据</p>
          </div>
        </div>
        <div class="foot_menu flex" v-if="detailArr.length!=0">
          <a href="javascript:;" class="cancel_but" @click.stop="$router.go(-1)">取消</a>
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
    name:"incheck",
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
        "instorecommit_"
      ]),
      //得到成本价值
      getMoney(){
        this.totalmoney=0;
        this.detailArr.forEach((item,index)=>{
          this.totalmoney+=item.costPrice*item.count
        })
      },
      sureadd(){
        const json = {
          id:this.id
        }
        const data = [];

        this.detailArr.forEach((item,index)=>{
          data.push({p_id:item.p_id,count:item.count,cost_price:item.costPrice})
        })

        json.data=data;

        this.instorecommit_({json:JSON.stringify(json)}).then((res)=>{
          if(res.success==200){
            MessageBox.alert("入库确认成功!").then(action=>{
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
