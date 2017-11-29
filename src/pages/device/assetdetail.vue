<template>

  <div class="content-modal">
    <y-header title="采购明细" router="-1"></y-header>
    <div class="content">
      <div class="scroll-content"  style="margin-top:0.45rem;">
        <div class="outtinvent">
          <ul class="inventory_list" style="background: none;">
            <template v-for="l in deviceList">
              <li class="asset_li" style="border-top: none; background: #fff; margin-bottom: 0.1rem;" @click="goPage(l.vendor_id)">
                <p style="font-weight: bold;">合同编号:{{l.contract_no}}</p>
                <p style="position: relative;">金额：{{l.money | thoundnum}}元<span class="posi_span">数量：{{l.vm_count}}台</span></p>
                <p>创建时间：{{l.create_time | dates}}</p>
              </li>
            </template>
          </ul>
          <div class="noData" v-if="deviceList.length==0">
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
        name: "assetdetail",
        data() {
            return {
              deviceList:[],
              vendor_id:this.$route.query.id
            }
        },
        computed: {},
        methods: {
          ...mapActions([
            "assetvmdetail_"
          ]),
          getData(){
            this.assetvmdetail_({type:1,vendor_id:this.vendor_id}).then((res)=>{
              if(res.success==200){
                this.deviceList = res.data;
              }
            })
          }
        },
        mounted() {
          this.getData();
        }

    }

</script>

<style scoped>


</style>
