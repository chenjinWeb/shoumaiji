<template>
  <!-- 新增 -->
  <div class="tab-content">
    <y-header title="详情" router="-1"></y-header>
    <div class="content">
      <div class="scroll-content" margin-header>
        <div class="management">
          <ul class="creat_list">
            <li v-for="(detail,$index) in detailArr">
              <a href="javascript:;" class="central_list clear">
                <div class="list_lef fl flex">{{detail.create_time}}</div>
                <div class="list_rig fr">
                  入库数量：{{detail.count}}瓶
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
    name:"waitdetail",
    data(){
      return {
        query:{
          page:1,
          pagesize:20
        },
        detailArr:[]
      }
    },
    mounted(){
      const data = this.$route.query;
      Object.assign(this.query,{ p_id:data.id, time:data.time});
      this.goodsdetail_(this.query).then((res)=>{
        if(res.success==200 && res.data && res.data.length > 0){
          this.detailArr = res.data;
        }
      })
    },
    methods:{
      ...mapActions([
        "goodsdetail_"
      ]),
    }
  }

</script>

<style scoped>


</style>
