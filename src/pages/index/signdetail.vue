<template>
  <!-- 新增 -->
  <div class="content-modal">

    <y-header title="补货详情" router="-1"></y-header>

    <div class="content">
      <y-select-date @select="selectDate($event)" :futureDate="true" mode="single" style="margin-top: 0.45rem;"></y-select-date>
      <div class="search_input search_latitud">
        <label class="form">
          <input type="search" placeholder="请输入设备编号或别名" class="search" v-model="query.search">
        </label>
        <div class="search_btn" @click="getData(query,1)">搜索</div>
      </div>
      <div class="scroll-content" style="margin-top:1.5rem;">
        <div class="outtinvent">
          <ul class="inventory_list">
            <li v-for="(l,$index) in detailArr" @click="gopage(l.vending_machine_id)">
              <a class="central_list central_list_height flex" href="javascript:;">
                <div class="list_lef long_left" style="width: 90%;">
                  <p><span>{{l.vending_machine_another || ''}}</span></p>
                  <p class="time">
                    <span class="list_w_l">编号：{{l.vending_machine_number || ''}}</span>
                    <span class="list_w_l" style="width: 1.6rem;">{{l.create_time | dates}}</span>
                  </p>
                  <p class="time">
                    <span class="list_w_l">销售额：{{l.money || 0}}</span>
                    <span class="list_w_l">销售量：{{l.sales_count || 0}}</span>
                  </p>
                </div>
                <div class="list_rig clear" style="width: 10%">
                  <i class="icon fr">&#xe600;</i>
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
    name:"signdetail",
    data(){
      return {
        query:{
          search:"",
          type:1,
          time:Date.format(new Date(),'yyyy-MM-dd')
        },
        loadmore: {
          bottomPullText: '上拉加载更多...',
          allLoaded: false,
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
      selectDate(data){
        this.query.time = data.format;
        this.getData(this.query,1)
      },
      getData(query,type){
        if(type==1){
          this.detailArr=[];
        }
        const data = {
          type:1,
          vmId:this.$route.query.id,
          search:query.search,
          day:query.time
        }
        return new Promise((resolved, rejected) => {
          this.signlist_(data).then((res) => {
            if (res.success == 200) {
              this.detailArr.push(...res.data);
              resolved();
            } else {
              rejected();
            }
          }, () => {
            rejected();
          })
        })
      },
      gopage(id){
        this.$router.push({name:"signhis",query:{vmId:id}})
      }
    }
  }

</script>

<style scoped>


</style>
