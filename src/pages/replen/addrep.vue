<template>
  <!-- 新增 -->
  <div class="content-modal">
    <y-header title="提货申请" router="-1" r_title="提货历史" @sured="sured()"></y-header>
    <div class="content">
      <div class="scroll-content" margin-header>

        <div class="rep_header">

          <div class="flex" @click="settemplate(0)">

            <div>
              按货道模板
            </div>

          </div>
          <div class="flex" @click="settemplate(1)">

            <div>
              按前一天销量
            </div>

          </div>
          <div class="flex" @click="settemplate(2)">

            <div>
              按上次提货
            </div>

          </div>

        </div>

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
            <p>商品ID<span>{{g.goodsid}}</span></p><p>规格<span class="ccc">{{g.weight}}{{g.unit}}</span></p>
          </li>
          <li class="central_list newstorage_list clear">
            <div class="list_lef fl">商品数量</div>
            <div class="list_rig fr">
              <input type="text" placeholder="请输入商品数量" class="txt" v-model="g.number">
            </div>
          </li>
          <li @click="deletelist($index)">
            <div class="delete_list" style="height: 0.3rem; width: 30%; line-height: 0.3rem; margin: 0 auto;">删除此商品</div>
          </li>
        </ul>
        <div class="add_rep_pro" @click="addgood()">
          新增商品+
        </div>
        <div class="rep_btn">
          <div class="rep_content">
            <label>
              <input type="checkbox" v-model="globalop"/>
              <span>全局操作</span>
            </label>
            <span class="rep_operate" v-if="globalop" @click="apply_number<1? 0 : apply_number--">-</span>
            <input readonly class="rep_number" v-model="apply_number"  v-if="globalop"/>
            <em v-if="globalop">%</em>
            <span class="rep_operate"  v-if="globalop" @click="apply_number++">+</span>
          </div>
          <a href="javascript:;" class="btn" @click="sureadd()">确定</a>
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
    name:"newstorage",
    data(){
      return {
        globalop:false,
        apply_number:0,
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
        "getwhgoods_",
        "addapply_",
        "settemplate_"
      ]),
      ...mapMutations([
        "saveProductName",
        "initLadArray",
        "initLad",
        "addLad",
        "deleteLad",
        "changepass",
        "changepasstrue",
        "setLadList"
      ]),
      //设置模板
      settemplate(type){
        this.initLadArray();
        this.settemplate_({type:type}).then((res)=>{
          this.setLadList(res.data)
        })
      },
      //提货历史
      sured(){
        this.$router.push({name:"repout"})
      },
      addgood(){
        this.changepasstrue();
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
        data.unit = findarr?  findarr.unit : "";
        data.productName=findarr? findarr.name : "";
      },

      getlists(){
        this.getwhgoods_().then((res)=>{
          if(res.success==200 && res.data){
            this.saveProductName(res.data);
            this.initLad(res.data);
          }
        })
      },

      sureadd(){
        const data = [];
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
        this.addapply_({json:JSON.stringify(data)}).then((res)=>{
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
