<template>
  <!-- 新增 -->
  <div class="content-modal">
    <y-header title="补货记录" router="-1"></y-header>
    <div class="content">
      <div class="scroll-content" style="margin-top:0.45rem;">
        <div class="outtinvent">
          <div class="search_input search_latitud">
            <label class="form">
              <input type="search" placeholder="请输入设备组名" class="search" v-model="query.search">
            </label>
            <div class="search_btn" @click="getData(query,1)">搜索</div>
          </div>
          <ul class="inventory_list">
            <li v-for="(detail,$index) in detailArr" @click="signdetail(detail.vending_machine_group_id)">
              <a href="javascript:;" class="central_list central_list_height flex">
                <div class="list_lef long_left">
                  <p><span>{{detail.name}} （<em style="color: green;">已补货：{{detail.signedCount || 0}}台</em>)</span></p>
                  <p class="time">
                    <span class="list_w_l">机器总数：{{detail.count || 0}}</span>
                    <span class="list_w_l">待补货：{{detail.offnum || 0}}台</span>
                  </p>
                  <p class="time">
                    <span class="list_w_l">销售额：{{detail.money || 0}}</span>
                    <span class="list_w_l">销售量：{{detail.ordernum || 0}}</span>
                  </p>
                </div>
                <div class="list_rig fr short_right">
                  <i class="icon">&#xe600;</i>
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

    <transition name="custom-classes-transition" enter-active-class="animated nav-open" leave-active-class="animated nav-close">
      <router-view></router-view>
    </transition>

  </div>

</template>

<script>

  import {mapActions} from "vuex"

  export default {
    name:"signlist",
    data(){
      return {
        query:{
          search:"",
          type:1
        },
        detailArr:[]
      }
    },
    mounted(){
      this.getData(this.query);
    },
    methods:{
      ...mapActions([
        "signlist_"
      ]),
      signdetail(id){
        this.$router.push({name:"signdetail",query:{id:id}})
      },
      getData(query,type){
        if(type==1){
          this.detailArr=[];
        }
        return new Promise((resolved, rejected) => {
          this.signlist_(query).then((res) => {
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
