<template>
  <!-- 新增 -->
  <div class="content-modal">
    <y-header title="详情" router="-1"></y-header>
    <div class="content">
      <div class="scroll-content" style="margin-top:0.45rem;">
        <div class="outtinvent">
          <ul class="creat_list">
            <li v-for="(detail,$index) in detailArr">
              <a href="javascript:;" class="central_list clear">
                <div class="list_lef fl" v-if="detail.pName">{{detail.pName}}（{{detail.weight}}{{detail.unit}}）</div>
                <div class="list_rig fr">
                  申请数量：{{detail.count}}瓶
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
    name:"repoutdetail",
    data(){
      return {
        query:{
          id:this.$route.query.id,
          type:0
        },
        detailArr:[]
      }
    },
    mounted(){
      this.getData(this.query)
    },
    methods:{
      ...mapActions([
        "pastate_"
      ]),
      searchdata(){
        this.detailArr=[];
        this.getData(this.query)
      },
      getData(query){
        var data = {
          id:query.id,
          type:query.type
        }
        return new Promise((resolved, rejected) => {
          this.pastate_(data).then((res) => {
            if (res.success == 200 && res.data && res.data.length > 0) {
              this.detailArr.push(...res.data);
              resolved();
            } else {
              rejected();
            }
          }, () => {
            rejected();
          })
        })
      }
    }
  }

</script>

<style scoped>


</style>
