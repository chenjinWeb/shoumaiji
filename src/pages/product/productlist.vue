<template>

  <div class="tab-content">

    <y-header title="变更历史"></y-header>

    <div class="content" margin-header>

      <div class="scroll-content" style="margin-bottom: 0.45rem;">

        <!--出库管理-->
        <div class="management">
          <ul class="inventory_list creat_list_border salesdata_list" style="min-height: 0.8rem; margin-bottom: 0;">
            <li v-for="(o,$index) in outstoredata" @click="outopage(o.id)">
              <a href="javascript:;" class="central_list flex">
                <div class="list_lef" style="width: 90%;">
                  <p class="time flex">
                    <span style="flex: 5;" class="overnone">{{o.time | dates}}</span>
                    <span style="flex: 2" class="overnone">{{o.type=='in'? '+' : '-'}}{{o.count}}</span>
                    <span style="flex: 3" class="overnone bulecolr">{{o.user_name}}</span>
                  </p>
                </div>
              </a>
            </li>
            <div class="noData" v-if="outstoredata.length==0">
              <i class="icon">&#xe6bb;</i>
              <p>暂无数据</p>
            </div>
          </ul>

        </div>

      </div>

    </div>

  </div>

</template>

<script>

    import {mapActions} from "vuex"

    export default {
        name: "app",
        data() {
            return {
              p_w_id:this.$route.query.p_w_id,
              p_id:this.$route.query.id,
              outstoredata:[]
            }
        },
        computed: {},
        methods: {
          ...mapActions([
            "productlist_"
          ]),
          getData(){
            this.productlist_({p_w_id:this.p_w_id,p_id:this.p_id}).then((res)=>{
              if(res.success==200){
                this.outstoredata = res.data;
              }
            })
          }
        },
        mounted() {
          this.getData()
        }

    }

</script>

<style scoped>


</style>
