<template>
  <!-- 新增 -->
  <div class="content-modal">
    <y-header title="提货申请" router="-1"></y-header>
    <div class="content">
      <div class="scroll-content" margin-header>
        <ul class="mewstor_list" v-for="(g,$index) in dataArr">
          <li class="central_list clear">
            <div class="list_lef fl">商品名称</div>
            <div class="search_input select_area">
              <el-select v-model="g.p_id" placeholder="请选择" @change="changeValue(g)">
                <el-option
                  v-for="item in g.options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
          </li>
          <li class="newstorage flex">
            <p>商品ID<span>{{g.p_id}}</span></p><p>规格<span class="ccc">{{g.weight}}{{g.unit}}</span></p>
          </li>
          <li class="central_list newstorage_list clear">
            <div class="list_lef fl">商品数量</div>
            <div class="list_rig fr">
              <input type="text" placeholder="请输入商品数量" class="txt" v-model="g.count">
            </div>
          </li>
          <li @click="deletelist($index)">
            <div class="delete_list" style="height: 0.3rem; width: 30%; line-height: 0.3rem; margin: 0 auto;">删除此商品</div>
          </li>
        </ul>
        <div class="add_rep_pro" @click="addgood()">
          新增商品+
        </div>
        <div class="foot_menu flex">
          <a href="javascript:;" class="cancel_but" @click.stop="$router.go(-1)">取消修改</a>
          <a href="javascript:;" class="confirm_but boxflex" @click="sureadd()">确认</a>
        </div>
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

  import {MessageBox,Toast} from "mint-ui"

  export default {
    name:"replenapply",
    data(){
      return {
        query:{
          type:0,
          id:this.$route.query.id
        },
        dataArr:[],
      }
    },
    computed:{
      ...mapState({
        productNameLists:state=>state.productNameLists
      })
    },
    mounted(){
      this.getlists();

    },
    methods:{
      ...mapActions([
        "pastate_",
        "goodslist_",
        "refuzewarehouse_"
      ]),
      ...mapMutations([
        "saveProductName"
      ]),
      //初始化数据
      getData(){
        this.pastate_(this.query).then((res)=>{
          if(res.success==200){
            this.dataArr = res.data;
            for(var i=0;i<this.dataArr.length;i++){
              this.dataArr[i].options = this.productNameLists
            }
          }
        })
      },
      addgood(){
        this.dataArr.push({
          options:this.productNameLists,
          p_id:"",
          weight:"",
          unit:"",
          count:""
        })
      },
      deletelist(index){
        this.dataArr.splice(index,1)
      },
      changeValue(data){
        for(var i=0;i<data.options.length;i++){
          if(data.id==data.options[i].p_id){
            Vue.set(data,'weight',data.options[i].weight)
            Vue.set(data,'unit',data.options[i].unit)
          }
        }
      },

      getlists(){
        this.goodslist_({page:1,pagesize:1000000}).then((res)=>{
          if(res.success==200 && res.data){
            this.saveProductName(res.data);
            this.getData();
          }
        })
      },

      sureadd(){
        const json={
          id:this.query.id*1
        }
        const data = [];
        for(var i = 0; i<this.dataArr.length;i++){
          if(!this.dataArr[i].p_id || this.dataArr[i].count==""){
            Toast(`请填写第${i+1}个商品的商品数量`)
            return
          }
          data.push({p_id:this.dataArr[i].p_id*1,count:this.dataArr[i].count? this.dataArr[i].count*1 : 0})
        }

        json.data = data;

        this.refuzewarehouse_({json:JSON.stringify(json)}).then((res)=>{
          if(res.success==200){
            MessageBox.alert("提货申请成功").then(action=>{
              this.$router.go(-1);
            })
          }else{
            Toast(res.message)
          }
        })
      }
    }
  }

</script>

<style scoped>
  .el-select-dropdown__item{ text-align: left;}

</style>
