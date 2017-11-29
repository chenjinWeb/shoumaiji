<template>

  <div class="content-modal">
      <y-header title="点位信息" r_title="提交" @sured="sured()" isshow="true" @goback="goback()"></y-header>
      <div class="content">
          <div class="scroll-content" margin-header>
              <ul class="creat_list">
                  <li @click="toPage('basicinformat')">
                      <a href="javascript:;" class="central_list clear">
                          <div class="list_lef fl flex">基本信息（必填）</div>
                          <div class="list_rig fr">
                              <span class="tips wait">修改</span>
                              <!--<span class="tips">已填写</span>-->
                              <i class="icon">&#xe600;</i>
                          </div>
                      </a>
                  </li>
                  <li @click="toPage('timehandily')">
                      <a href="javascript:;" class="central_list clear">
                          <div class="list_lef fl flex">时间特点</div>
                          <div class="list_rig fr">
                              <span class="tips wait">修改</span>
                              <!--<span class="tips">已填写</span>-->
                              <i class="icon">&#xe600;</i>
                          </div>
                      </a>
                  </li>
                  <li @click="toPage('competitive')">
                      <a href="javascript:;" class="central_list clear">
                          <div class="list_lef fl flex">竞争因素</div>
                          <div class="list_rig fr">
                              <span class="tips wait">修改</span>
                              <i class="icon">&#xe600;</i>
                          </div>
                      </a>
                  </li>
                  <li @click="toPage('populattribute')">
                      <a href="javascript:;" class="central_list clear">
                          <div class="list_lef fl flex">人群属性特点</div>
                          <div class="list_rig fr">
                              <span class="tips wait">修改</span>
                              <!--<span class="tips error">填写错误</span>-->
                              <i class="icon">&#xe600;</i>
                          </div>
                      </a>
                  </li>
                  <li @click="toPage('naturalenviront')">
                      <a href="javascript:;" class="central_list clear">
                          <div class="list_lef fl flex">自然环境</div>
                          <div class="list_rig fr">
                              <span class="tips wait">修改</span>
                              <i class="icon">&#xe600;</i>
                          </div>
                      </a>
                  </li>
                  <li @click="toPage('traffic')">
                      <a href="javascript:;" class="central_list clear">
                          <div class="list_lef fl flex">交通状况</div>
                          <div class="list_rig fr">
                              <span class="tips wait">修改</span>
                              <i class="icon">&#xe600;</i>
                          </div>
                      </a>
                  </li>
                  <li @click="toPage('construction')">
                      <a href="javascript:;" class="central_list clear">
                          <div class="list_lef fl flex">施工条件</div>
                          <div class="list_rig fr">
                              <span class="tips wait">修改</span>
                              <i class="icon">&#xe600;</i>
                          </div>
                      </a>
                  </li>
                  <li @click="toPage('municipalplann')">
                      <a href="javascript:;" class="central_list clear">
                          <div class="list_lef fl flex">市政规划情况</div>
                          <div class="list_rig fr">
                              <span class="tips wait">修改</span>
                              <i class="icon">&#xe600;</i>
                          </div>
                      </a>
                  </li>
                  <li @click="toPage('other')">
                      <a href="javascript:;" class="central_list clear">
                          <div class="list_lef fl flex">其他</div>
                          <div class="list_rig fr">
                              <span class="tips wait">修改</span>
                              <i class="icon">&#xe600;</i>
                          </div>
                      </a>
                  </li>
              </ul>
          </div>

      </div>
      <transition name="custom-classes-transition" enter-active-class="animated nav-open" leave-active-class="animated nav-close">
        <router-view></router-view>
      </transition>
  </div>

</template>

<script>

  import Vue from "vue"

  import {mapState,mapActions,mapMutations} from "vuex"

  import { InfiniteScroll,Toast,Indicator,MessageBox  } from 'mint-ui';

  Vue.use(InfiniteScroll)

  export default {
    name:"createpoint",
    data(){
      return {
        area_id:this.$route.query.id,
        dataId:this.$route.query.dataId,
        machinenum:1
      }
    },
    watch:{

    },
    computed:{
      ...mapState({
        basicData:state=>state.basicData
      })
    },
    mounted(){
      this.getData(this.areaId);
    },
    methods:{
      ...mapActions([
        "addareapoint_",
        "previewpoint_",
        "applyvm_"
      ]),
      ...mapMutations([
        "getPointData"
      ]),
      goback(){
        MessageBox.confirm("请确认所填写的内容已提交").then(action=>{
          this.$router.go(-1)
        },action=>{

        })
      },
      getData(id){
        this.previewpoint_({id:this.dataId}).then((res)=>{
          if(res.success==200 && res.data){
            this.getPointData(res.data);
            this.getPointData({areaId:this.area_id});
            //console.info(this.basicData);
          }
        })
      },
      toPage(page){
        this.$router.push({name:page});
      },
      sured(){
        this.submitData();
      },
      submitData(){
        this.addareapoint_(this.basicData).then((res)=>{
          if(res.success==200){
            MessageBox.confirm('添加成功，是否直接申请？<br>机器数量：<span style="display: inline-block; width: 0.3rem; height: 0.2rem; line-height: 0.15rem; vertical-align: middle;" onclick="this.nextSibling.value<2? 1 : this.nextSibling.value--">-</span><input id="machineNum" min="0" value="1" readonly style="margin: 0 0.1rem; width: 0.3rem; height: 0.2rem; text-align: center; border: 1px solid #ccc;"/><span style="display: inline-block; width: 0.3rem; height: 0.2rem; line-height: 0.15rem; vertical-align: middle;" onclick="this.previousSibling.value++">+</span>台','提示',{
              cancelButtonText:"只保存，不申请",
              confirmButtonText:"直接申请"
            }).then(action => {
              const data =[{
                id:res.data,
                vmCount:document.querySelector("#machineNum").value
              }]
              this.applyvm_(data).then((res)=>{
                if(res.success==200){
                  MessageBox.alert("申请机器成功！").then(action => {
                    this.$router.go(-1)
                  });
                }
              })
            },action=>{
              this.$router.push({name:"pointlist",query:{id:this.area_id}})
            });
          }
        })
      }
    }
  }

</script>

<style scoped>


</style>
