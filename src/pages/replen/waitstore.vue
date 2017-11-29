<template>
  <!-- 新增 -->
  <div class="content-modal">
    <y-header title="详情" router="-1"></y-header>
    <div class="content">
      <div class="scroll-content" margin-header>
        <div class="management">
          <div style="text-align: left; background: #fff; border-bottom: 1px solid #ccc; font-size: 0.14rem;">
            <ul class="inventory_list" style="margin-bottom: 0;">
              <li v-for="(d,$index) in detailArr">
                <a href="javascript:;" class="central_list flex">
                  <div class="list_lef" style="width: 90%;">
                    <p style="display: flex;" class="stored_p">
                      <span style="flex: 4; font-size: 0.15rem;">{{d.pName}}（{{d.weight}}{{d.unit}}）</span>
                      <span style=" font-size: 0.15rem;">申请{{d.count}}</span>
                      <span style=" font-size: 0.15rem;">出库{{d.count_outbound}}</span>
                    </p>
                    <p class="time">
                      <span class="list_w" v-for="(s,$index) in d.storehouse">{{s.name}}:{{s.count}}</span>
                    </p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
          <div class="noData" v-if="detailArr.length==0">
            <i class="icon">&#xe6bb;</i>
            <p>暂无数据</p>
          </div>
        </div>
      </div>
      <div class="foot_menu flex">
        <a href="javascript:;" class="cancel_but" @click.stop="$router.go(-1)">取消</a>
        <a href="javascript:;" class="confirm_but boxflex" @click="sureadd()">确认</a>
      </div>
    </div>
  </div>

</template>

<script>

  import {mapActions} from "vuex"

  import {Toast,MessageBox} from "mint-ui"

  export default {
    name:"replened",
    data(){
      return {
        query:{
          type:1,
          id:this.$route.query.id
        },
        detailArr:[],
      }
    },
    mounted(){
      this.getData();
    },
    methods:{
      ...mapActions([
        "pastate_",
        "pgstatesubmit_"
      ]),
      getData(){
        this.pastate_(this.query).then((res)=>{
          if(res.success==200){
            this.detailArr = res.data;
          }
        })
      },
      sureadd(){
        let data={
          id:this.query.id,
          p_w_id:this.query.p_w_id,
          data:[]
        };
        if(this.detailArr.length==0){
          Toast("暂无商品！")
          return
        }
        for(var i=0;i<this.detailArr.length;i++){
          data.data.push({
            p_id:this.detailArr[i].p_id,
            count:this.detailArr[i].count_use
          })
        }
        this.pgstatesubmit_({json:JSON.stringify(data)}).then((res)=>{
          if(res.success==200){
            MessageBox.alert("提货成功!").then(action=>{
              this.$router.go(-1);
              setTimeout(()=>{
                location.reload();
              },500)
            },action=>{

            })
          }
        })
      }
    }
  }

</script>

<style scoped>


</style>
