<template>

  <div class="content-modal">
    <y-header :title="title" r_title="保存" @sured="sured()" router="-1"></y-header>
    <div class="content">
      <div class="scroll-content" margin-header>

        <ul class="basic_list">
          <li>
            <div class="central_list clear">
              <div class="list_lef fl">时间</div>
              <div class="list_rig fr" style="margin-top: 0.11rem;">
                <y-select-date @select="selectDate($event)" :futureDate="true" :time="query" mode="single" :nextbool="false" :prebool="false"></y-select-date>
              </div>
            </div>
          </li>

          <li>
            <div class="central_list clear">
              <div class="list_lef fl">类型</div>
              <div class="list_rig fr">
                <template>
                  <el-select v-model="type_id" placeholder="请选择类型" style="width: 70%;" @change="changestype(type_id)">
                    <el-option
                      v-for="item in contractType"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </template>
              </div>
            </div>
          </li>

          <li>
            <div class="central_list clear">
              <div class="list_lef fl">金额</div>
              <div class="list_rig fr">
                <input type="text" placeholder="请输入金额" class="txt" v-model="money">
              </div>
            </div>
          </li>
          <li>
            <div class="central_list handily_list traff_list clear">
              <div class="list_lef fl">说明</div>
              <div class="list_rig fr">
                <textarea name="" id="" rows="2" placeholder="最多输入8个字" v-model="remark" maxlength="8"></textarea>
              </div>
            </div>
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

  import {mapState,mapActions,mapMutations} from "vuex"

  import {MessageBox} from "mint-ui"

  export default {
    name: "addfinancial",
    data() {
      return {
        money:"",
        remark:"",
        query:{
          times:Date.format(new Date,'yyyy-MM-dd')
        },
        type_id:"",
        contractType:[],
        time:""
      }
    },
    computed: {
      ...mapState({

      })
    },
    methods: {
      ...mapActions([
        "gettypes_",
        "addfinancial_"
      ]),
      ...mapMutations([

      ]),
      //如果是编辑的话，初始化
      initData(){

      },

      selectDate(data){
        this.query.times = data.format;
      },

      //保存
      sured(){

        if(this.type_id == ""){
          MessageBox.alert("请输入选择类型!");
          return
        }

        if(this.money==""){
          MessageBox.alert("请输入金额!");
          return
        }

        if(this.remark == ""){
          MessageBox.alert("请输入说明!");
          return
        }

        const json = {
          time:this.query.times,
          type:this.type_id,
          money:this.money,
          remark:this.remark
        }

        this.addfinancial_(json).then((res)=>{
          if(res.success==200){
            MessageBox.alert("新增成功！").then(action=>{
              this.$router.go(-1)
            })
          }
        })
        },
      //获取类型
      gettypes(){
        this.gettypes_().then((res)=>{
          if(res.success==200){
            this.contractType = res.data;
          }
        })
      },
      //合同类型
      changestype(value){
        this.type_id = value;
      }
    },
    mounted() {
      this.gettypes();
    }
  }

</script>

<style scoped>
  .basic_list li .central_list .list_rig{ text-align: left;}

</style>
