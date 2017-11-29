<template>

  <div class="content-modal">
    <y-header title="竞争因素" r_title="保存" @sured="sured()" router="-1"></y-header>
    <div class="content">
        <div class="scroll-content" margin-header>
            <div class="competive" v-for="(c,$index) in competitionFactor">
              <ul class="basic_list">
                <li>
                    <div class="central_list clear">
                        <div class="list_lef fl">类型名称</div>
                        <div class="list_rig fr">
                            <input type="text" placeholder="如便利店、小卖部" class="txt" v-model="c.type">
                        </div>
                    </div>
                </li>
                <li>
                    <div class="central_list  explain_list traff_list clear">
                        <div class="list_lef fl">距离信息</div>
                        <div class="list_rig fr">
                            <textarea name="" rows="2" placeholder="填写具体位置信息、离该点位的距离等" v-model="c.distance_info"></textarea>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="central_list handily_list clear">
                        <div class="list_lef fl">产品价格</div>
                        <div class="list_rig fr">
                            <textarea name="" rows="3" placeholder="例如 农夫果园 ￥5.50 百事可乐 ￥3.50 景田百岁山矿泉水 ￥3.00" v-model="c.product_price"></textarea>
                        </div>
                    </div>
                </li>
                <li class="delect" @click="deleteLi($index)">
                    <a href="javascript:;" class="delete_list">删除此条信息</a>
                </li>
              </ul>
            </div>

            <div class="form_add" @click="addCom()">
                <a href="javascript:;">添加因素+</a>
            </div>
        </div>

    </div>


  </div>

</template>

<script>

  import Vue from "vue"

  import {mapState,mapMutations} from "vuex"

  import { Toast,Indicator,MessageBox } from 'mint-ui';

  export default {
    name:"competitive",
    data(){
      return {
        competitionFactor:[
          {
            type:"",
            distance_info:"",
            product_price:""
          }
        ]
      }
    },
    computed:{
      ...mapState({
        basicData:state=>state.basicData
      })
    },
    mounted(){
      this.competitionFactor = this.basicData.competitionFactor? this.basicData.competitionFactor : [{
        type:"",
        distance_info:"",
        product_price:""
      }];
    },
    methods:{
      ...mapMutations([
        "getPointData"
      ]),
      sured(){
        this.getPointData({
          competitionFactor:this.competitionFactor
        })
        MessageBox.alert("保存成功").then(action=>{
          this.$router.go(-1)
        })
      },
      addCom(){
        this.competitionFactor.push({
          type:"",
          distance_info:"",
          product_price:""
        }
      )
      },
      deleteLi(index){
        this.competitionFactor.splice(index,1)
      }
    }
  }

</script>

<style scoped>


</style>
