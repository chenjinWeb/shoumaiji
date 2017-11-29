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
              <el-select v-model="g.value" filterable :disabled="g.disabled" placeholder="请选择" @change="changeValue(g)">
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
          <li @click="deletelist($index)">
            <div class="delete_list" style="height: 0.3rem; width: 30%; line-height: 0.3rem; margin: 0 auto;">删除此商品</div>
          </li>
        </ul>
        <div class="add_rep_pro" @click="addgood()">
          新增商品+
        </div>
        <div class="foot_menu flex">
          <a href="javascript:;" class="cancel_but" @click.stop="$router.go(-1)">取消</a>
          <a href="javascript:;" class="confirm_but boxflex" @click="sureadd()">确认</a>
        </div>
        <div class="rep_btn" style="bottom: 0.5rem;">
          <div class="rep_content">
            <label>
              <input type="checkbox" v-model="globalop"/>
              <span>全局操作</span>
            </label>
            <span class="rep_operate" v-if="globalop" @click="apply_number<1? 0 : apply_number--">-</span>
            <input readonly class="rep_number" v-model="apply_number"  v-if="globalop"/>
            <em v-if="globalop">&nbsp;%</em>
            <span class="rep_operate"  v-if="globalop" @click="apply_number++">+</span>
          </div>
          <p style=" float: right; line-height: 0.5rem; font-size: 0.14rem; color: #333; margin-right: 0.1rem; max-width: 1.3rem;" class="overnone">成本价：{{totalvalue | thoundnum}}元</p>
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
    name:"purchapp",
    data(){
      return {
        p_w_id:this.$route.query.id,
        type:this.$route.query.type,
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
      this.initLadArray();
      this.getlists();
    },
    methods:{
      ...mapActions([
        "goodslist_",
        "storeapply_",
        "storemoneynumber_"
      ]),
      ...mapMutations([
        "saveProductName",
        "initLadArray",
        "initLad",
        "addLad",
        "deleteLad",
        "setLadList"
      ]),
      addgood(){
        this.addLad();
      },
      deletelist(index){
        this.deleteLad(index)
      },
      changeValue(data){
        const value = data.value;
        const arr = data.options;
        const findarr = arr? arr.find( p => p.id == value) : [];
        data.goodsid = data.value;
        data.weight = findarr?  findarr.weight : "";
        data.price = findarr?  findarr.cost_price : "";
        data.unit = findarr?  findarr.unit : "";
        data.productName=findarr? findarr.name : "";
      },

      getlists(){
        this.goodslist_({page:1,pagesize:1000000}).then((res)=>{
          if(res.success==200 && res.data){
            this.saveProductName(res.data);
            this.initLad(res.data);
            if(this.type==1){
              this.storemoneynumber_({p_w_id:this.p_w_id,page:1,pagesize:10}).then((res)=>{
                if(res.success==200 && res.data){
                  this.setLadList(res.data.data);
                  this.ladArray.forEach((item,index)=>{
                    this.totalvalue+=item.number*item.price;
                  })
                }
              })
            }
          }
        })
      },
      //计算成本价值
      gettotal(){
        this.totalvalue=0;
        this.ladArray.forEach((item,index)=>{
          this.totalvalue+=item.price*(item.number || 0)
        })
      },
      sureadd(){
        const json={
          p_w_id:this.p_w_id
        };
        const data =[];
        for(var i = 0; i<this.ladArray.length;i++){
          if(!this.ladArray[i].goodsid || this.ladArray[i].number==""){
            Toast(`请填写商品${this.ladArray[i].productName}的商品数量`)
            return
          }
          if(this.globalop){
            data.push({p_id:this.ladArray[i].goodsid,count:this.apply_number})
          }else{
            data.push({p_id:this.ladArray[i].goodsid,count:this.ladArray[i].number? this.ladArray[i].number*1 : 0})
          }
        }
        json.data=data;
        this.storeapply_({json:JSON.stringify(json)}).then((res)=>{
          if(res.success==200){
            MessageBox.alert("采购申请成功").then(action=>{
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
  .el-input .el-input__inner{ height: 40px;}

</style>
