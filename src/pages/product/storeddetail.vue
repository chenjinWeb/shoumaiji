<template>
  <!-- 新增 -->
  <div class="content-modal">
    <y-header title="详情" router="-1"></y-header>
    <div class="content">
      <div class="scroll-content" margin-header>
        <div class="management">
          <ul class="inventory_list salesdata_list">
            <li v-for="(d,$index) in detailArr">
              <a href="javascript:;" class="central_list flex">
                <div class="list_lef" style="width: 90%;">
                  <p style="display: flex;" class="stored_p">
                    <span style="flex: 3;font-size: 0.15rem;">{{d.pName}}</span>
                    <span style="font-size: 0.15rem;">申请{{d.count}}</span>
                    <span style="font-size: 0.15rem;">出库{{d.count_outbound}}</span>
                  </p>
                  <p class="time">
                    <span class="list_w" v-for="(s,$index) in d.storehouse">{{s.name}}:{{s.count}}</span>
                  </p>
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
    name:"storeddetail",
    data(){
      return {
        query:{
          id:this.$route.query.id
        },
        detailArr:[]
      }
    },
    mounted(){
      this.storeddetails_(this.query).then((res)=>{
        if(res.success==200 && res.data && res.data.length > 0){
          this.detailArr = res.data;
        }
      })
    },
    methods:{
      ...mapActions([
        "storeddetails_"
      ]),
    }
  }

</script>

<style scoped>


</style>
