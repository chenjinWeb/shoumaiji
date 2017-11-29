<template>
  <!-- 新增 -->
  <div class="content-modal">
    <y-header title="提货历史" router="-1"></y-header>
    <div class="content">
      <ul class="tab_label flex" margin-header>
        <li class="label_list" @click="menuNum = 1" :class="{ 'on': menuNum == 1}">
          按时间
          <div class="triangle_first" v-show="menuNum==1"></div>
        </li>
        <li class="label_list" @click="menuNum = 2" :class="{ 'on': menuNum == 2}">
          按商品
          <div class="triangle_first" v-show="menuNum==2"></div>
        </li>
      </ul>
      <div class="scroll-content" style="margin-top:0.9rem;">
        <y-select-date @select="selectDate($event)" :futureDate="true" :time="query.time" ></y-select-date>
        <div class="outtinvent">
          <div class="search_input search_latitud" v-if="menuNum==2">
            <label class="form">
              <input type="search" placeholder="请输入商品名称" class="search" v-model="search">
            </label>
            <div class="search_btn" @click="getData()">搜索</div>
          </div>
          <ul class="inventory_list">
            <li v-for="(p,$index) in productLists"  @click="checkproduct(p,p.outState)">
              <a href="javascript:;" class="central_list flex">
                <div class="list_lef">
                  <p v-if="menuNum==1"><span>{{p.time | dates}}</span></p>
                  <p v-if="menuNum==2"><span>{{p.pName}}</span></p>
                </div>
                <div class="list_rig">
                  <p class="fr line_state">
                    <span class="">
                      <em class="em_count" :class="p.outState==2? '' : 'bulecolr'" v-if="menuNum==1">{{p.outState==0? '待审核' : p.outState==1? '待提货' : p.outState==2? '已提货' : '已拒绝'}}</em>
                      <em class="em_count" v-if="menuNum==2">提货数量：{{p.count}}</em>
                    </span>
                    <i class="icon" v-if="menuNum==1">&#xe600;</i>
                  </p>
                </div>
              </a>
            </li>
          </ul>
          <div class="noData" v-if="productLists.length==0">
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
    name:"repout",
    data(){
      return {
        menuNum:1,
        search:"",
        productLists:[],
        outPerples:[],
        query:{
          times:Date.format(new Date,"yyyy-MM-dd"),
          timee:Date.format(new Date,"yyyy-MM-dd")
        }
      }
    },
    mounted(){
      this.getData();
    },
    watch:{
      menuNum(oldNum){
        this.getData();
      }
    },
    methods:{
      ...mapActions([
        "repapply_"
      ]),
      outreplen(){
        this.$router.push({name:"addrep"})
      },
      getData(){
        this.productLists=[];
        if(this.menuNum==1){
          this.repapply_({type:(this.menuNum-1),times:this.query.times,timee:this.query.timee}).then((res)=>{
            if(res.success==200 && res.data && res.data.length>0){
              this.productLists.push(...res.data);
            }
          })
        }else{
          this.repapply_({type:(this.menuNum-1),times:this.query.times,timee:this.query.timee,search:this.search}).then((res)=>{
            if(res.success==200 && res.data && res.data.length>0){
              this.productLists.push(...res.data);
            }
          })
        }

      },
      selectDate(data){
        this.query.times=data.formats[0];
        this.query.timee=data.formats[1];
        this.productLists=[];
        this.getData();
      },
      checkproduct(p,id){
        if(this.menuNum==2){
          return;
        }
        //待审核
        if(id==0){
          this.$router.push({name:"repoutdetail",query:{id:p.id}});
          return
        }
        //待提货
        if(id==1){
          this.$router.push({name:"waitstore",query:{id:p.id}});
          return
        }
        //已提货
        if(id==2){
          this.$router.push({name:"replened",query:{id:p.id}});
          return
        }
        //已拒绝
        if(id==3){
          this.$router.push({name:"replenapply",query:{id:p.id}});
          return
        }
      }
    }
  }

</script>

<style scoped>


</style>
