<template>
  <div class="tab-content">
    <y-header :title="title" router="-1"></y-header>
    <div class="content">
      <div style="overflow:auto;top: 0;bottom: 0;position: absolute;right: 0;left: 0;margin-top: 0.45rem;">
          <div class="menu_items">
            <div class="date_table">
              <table width="100%" border="0" cellpadding="0" cellspacing="0">
                <thead>
                <tr v-order-by="[orderBy,$refs,'number','is_on_line','offaisle','is_sale']">
                  <th ref="number" data-field="number" style="width: 0.8rem;">货道ID</th>
                  <th ref="is_on_line" data-field="is_on_line">商品名</th>
                  <th ref="is_sale" data-field="is_sale" style="width: 1.0rem;">已售数量</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="g in goodsList" @click="checkdetail(g.aisleId)">
                  <td>{{g.aisleId}}</td>
                  <td style="text-align: left;">{{g.productName}}</td>
                  <td>{{g.saledNum}}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions, mapMutations} from 'vuex';
  export default {
    data(){
      return {
        title:'详情',
        machineId:this.$route.query.id,
        goodsList:[]
      }
    },
    mounted(){
        this.getData(this.machineId)
    },
    activated(){

    },
    watch: {
    },
    computed: {},
    methods: {
      ...mapActions([
        'gooddetail_'
      ]),
      getData(id){
        this.gooddetail_({machineId:id}).then((res)=>{
          if(res.success==200){
            this.goodsList = res.data;
          }
        })
      },
      checkdetail(id){
        //console.info(id)
      }
    }
  }
</script>
