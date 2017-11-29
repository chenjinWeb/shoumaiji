<template>
  <!-- 新增 -->
  <div class="content-modal">
    <y-header title="采购申请" router="-1"></y-header>
    <div class="content">
      <div class="scroll-content" margin-header>
        <ul class="mewstor_list" v-for="(g,$index) in ladArray">
          <li class="central_list clear">
            <div class="list_lef fl">商品名称</div>
            <div class="search_input select_area">
              <el-select v-model="g.value" filterable disabled="" placeholder="请选择" @change="changeValue(g)">
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
            <p>成本价<span>{{g.price}}</span></p><p>规格<span class="ccc">{{g.weight}}{{g.unit}}</span></p>
          </li>
          <li class="central_list newstorage_list clear">
            <div class="list_lef fl">商品数量</div>
            <div class="list_rig fr">
              <input type="text" placeholder="请输入商品数量" class="txt" v-model="g.number" @keyup="gettotal()">
            </div>
          </li>
        </ul>

        <div class="rep_btn" style="text-align: right; height: 0.8rem">
          <p style="  line-height: 0.4rem; font-size: 0.14rem; color: #333; margin-right: 0.1rem;" class="overnone">成本价：{{totalvalue | thoundnum}}元</p>
          <p style=" line-height: 0.4rem; font-size: 0.14rem; color: #333; margin-right: 0.1rem;" class="overnone">采购申请已提交，审核中...</p>
        </div>
      </div>
    </div>
    <transition name="custom-classes-transition" enter-active-class="animated nav-open" leave-active-class="animated nav-close">
      <router-view></router-view>
    </transition>
  </div>

</template>

<script>

  import {mapState,mapActions,mapMutations} from "vuex"

  import {MessageBox,Toast} from "mint-ui"

  export default {
    name:"prowait",
    data(){
      return {
        id:this.$route.query.id,
        globalop:false,
        apply_number:0,
        totalvalue:0
      }
    },
    computed:{
      ...mapState({
        productNameLists:state=>state.productNameLists,
        ladArray:state=>state.ladArray,
        ispass:state=>state.ispass
      })
    },
    mounted(){
      this.getData();
      this.initLadArray();
      this.getlists();
    },
    methods:{
      ...mapActions([
        "goodslist_",
        "procureapply_"
      ]),
      ...mapMutations([
        "saveProductName",
        "initLadArray",
        "initLad",
        "setLadList"
      ]),
      getData(){
        this.procureapply_({id:this.id}).then((res)=>{
          if(res.success==200){
            this.setLadList(res.data);
            this.ladArray.forEach((item,index)=>{
              this.totalvalue+=item.price*(item.number || 0)
            })
          }
        })
      },
      getlists(){
        this.goodslist_({page:1,pagesize:1000000}).then((res)=>{
          if(res.success==200 && res.data){
            this.saveProductName(res.data);
            this.initLad(res.data);
          }
        })
      },
      //计算成本价值
      gettotal(){
        this.totalvalue=0;
        this.ladArray.forEach((item,index)=>{
          this.totalvalue+=item.price*(item.number || 0)
        })
      }
    }
  }

</script>

<style scoped>
  .el-select-dropdown__item{ text-align: left;}

</style>
