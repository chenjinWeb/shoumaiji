<template>
<!-- 新增 -->
  <div class="content-modal">
    <y-header title="详情" router="-1"></y-header>
    <div class="content">
        <div class="scroll-content" margin-header>
            <div class="management">
                <ul class="creat_list">
                    <li v-for="(detail,$index) in detailArr">
                        <a href="javascript:;" class="central_list clear">
                            <div class="list_lef fl ">{{detail.pName}}</div>
                            <div class="list_rig fr">
                                 申请：{{detail.count}}
                            </div>
                        </a>
                    </li>
                </ul>
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
    name:"goodsdetails",
    data(){
      return {
        id:this.$route.query.id,
        detailArr:[]
      }
    },
    mounted(){
      this.procureapply_({id:this.id}).then((res)=>{
        if(res.success==200 && res.data && res.data.length > 0){
          this.detailArr = res.data;
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
