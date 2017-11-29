<template>

  <div class="tab-content">
    <y-header title="点位管理" isgo="true" :r_title="extrasInfo.add_edit_able? '新增' : ''" @sured="sured()"></y-header>
    <div class="content">
        <ul class="tab_label flex" margin-header>
            <li class="label_list" @click="finish_state = 1" :class="{ 'on': finish_state == 1}">
              进行中
              <div class="triangle_first" v-show="finish_state==1"></div>
            </li>
            <li class="label_list" @click="finish_state = 2" :class="{ 'on': finish_state == 2}">
              已完成
              <div class="triangle_first" v-show="finish_state==2"></div>
            </li>
        </ul>

        <div style="overflow:auto;top: 0;bottom: 0;position: absolute;right: 0;left: 0;margin-top: 0.89rem;" margin-tabbar>
          <ul class="manage_list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="20" v-if="finish_state==1">
            <li class="flex item" v-for="(d,$index) in device1">
              <div class="left" @click="checkOut(d.id)">{{d.name}}（{{d.lCount || 0}}个）</div> 
              <div class="right">
                <p class="tips">{{d.build_end_vm_count || 0}}/{{d.vm_count || 0}}</p>
                <p class="operation">
                  <a href="javascript:;" @click="editLi(d.id)"  v-if="extrasInfo.add_edit_able && (d.lCount==0)">编辑</a>
                  <a href="javascript:;" @click="deleteLi(d.id)" v-if="extrasInfo.del_able && (d.lCount==0)">删除</a>
                </p>
              </div>
            </li>
          </ul>

          <ul class="manage_list" v-if="finish_state==2" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="20">
            <li class="flex item" v-for="item in device2">
              <div class="left" @click="checkOut(item.id)">{{item.name}}（{{item.lCount}}个）</div> 
            </li>
          </ul>

          <div class="noData" v-if="finish_state==1 && device1.length==0">
            <i class="icon">&#xe6bb;</i>
            <p>恭喜您，点位已全部完成</p>
          </div>

          <div class="noData" v-if="finish_state==2 && device2.length==0">
            <i class="icon">&#xe6bb;</i>
            <p>暂无已完成点位</p>
          </div>

        </div>
    </div>


  </div>

</template>

<script>

  import Vue from "vue"

  import {mapState,mapGetters,mapActions,mapMutations} from "vuex"

  import { InfiniteScroll,Toast,Indicator,MessageBox  } from 'mint-ui';

  Vue.use(InfiniteScroll)

  export default {
    name:"point",
    data(){
      return {
        finish_state:1,
        loading:false,
        device1:[],
        device2:[],
        extrasInfo:{}
      }
    },
    watch:{
      finish_state(oldNum,newNum){
        if(oldNum==1 && this.device1.length>0){
          return
        }
        if(oldNum==2 && this.device2.length>0){
          return
        }
        this.loadMore()
      }
    },
    methods:{
      ...mapActions([
        "pointindex_",
        'deletepoint_'
      ]),
      getstate(state){
        switch (state.toString()){
          case "0":
            return "新建"
          break;
          case "1":
            return "待审核"
            break;
          case "2":
            return "审核通过"
            break;
          case "3":
            return "审核失败"
            break;
          case "4":
            return "待实施"
            break;
          case "5":
            return "实施中"
            break;
          case "6":
            return "实施完成"
            break;
          case "7":
            return "待补货"
            break;
          case "8":
            return ""
            break;
          case "9":
            return ""
            break;

        }
      },
      loadMore() {
        this.loading = true;
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        const query = {
          page:1,
          pagesize:20,
          finish_state:this.finish_state
        }
        this.pointindex_(query).then((res)=>{
          if(res.success==200){
            this.extrasInfo=res.extrasInfo;
            console.info(this.extrasInfo)
            for(var i=0;i<res.data.length;i++){
              this["device"+this.finish_state].push({
                name:res.data[i].name,
                build_end_vm_count:res.data[i].build_end_vm_count,
                vm_count:res.data[i].vm_count,
                lCount:res.data[i].lCount,
                flowState:res.data[i].flowState,
                cityId:res.data[i].cityId,
                count:res.data[i].count,
                id:res.data[i].id,
                numberPrefix:res.data[i].numberPrefix,
                provinceId:res.data[i].provinceId
              })
            }
          }
        })
      },
      sured(){
        this.$router.push({name:"addPoint"})
      },
      editLi(id){
        this.$router.push({name:"addPoint",query:{id:id}})
      },
      deleteLi(id){
        MessageBox.confirm("确认删除此点位？").then((action)=>{
          this.deletepoint_({id:id}).then((res)=>{
            if(res.success==200){
              const arr = this["device"+this.finish_state];
              for(var i=0;i<arr.length;i++){
                if(arr[i].id === id){
                  console.info(i)
                  arr.splice(i,1)
                }
              }
              MessageBox.alert("删除成功");
            }
          })
        },action=>{

        })

      },
      checkOut(id){
        this.$router.push({name:"pointlist",query:{id:id}})
      }
    }
  }

</script>

<style scoped>


</style>
