<template>
  <div class="content-modal">
    <y-header title="出库审批" router="-1"></y-header>
    <div class="content">
      <div style="margin-top: 0.45rem; margin-bottom: 0.5rem;" class="scroll-content">
        <div v-for="(d,$index) in dataArr" style=" margin-bottom: 0.2rem; background: #fff;">
          <div class="store_title" style="border-bottom: 1px solid #e9e9e9;">
            <div class="store_header">{{d.pName}}({{d.weight}}{{d.unit}})</div>
            <div class="store_number">申请{{d.count}}</div>
            <a v-for="a in d.selectdata">asdasd</a>
          </div>
          <div>
            <div class="store_title">
              <div style="flex: 1; margin-left: 0.1rem;" class="store_color">审批数量：
                <input type="number" class="store_input" v-model="d.number" placeholder="请输入允许出库的数量" />
                <span>（库存：{{d.count_use}}）</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="foot_menu flex">
        <a href="javascript:;" class="cancel_but" @click.stop="refuze()">拒绝</a>
        <a href="javascript:;" class="confirm_but boxflex" @click="sureadd()">确认</a>
      </div>

    </div>
  </div>
</template>

<script>

    import Vue from "vue"

    import {mapState,mapActions,mapMutations} from "vuex"

    import {Toast,MessageBox} from "mint-ui"

    import {isRepeat} from "./../../utils"

    export default {
        name: "outcheck",
        data() {
            return {
              query:{
                type:0,
                id:this.$route.query.id
              }
            }
        },
        computed: {
          ...mapState({
            storeLists:state=>state.storeLists,
            dataArr:state=>state.dataArr
          })
        },
        methods: {
          ...mapActions([
            'storeddetails_',
            'storehouse_',
            "refuseOutWarehouse_",
            "auditcheck_"
          ]),
          ...mapMutations([
            "saveStore",
            "saveDataArr",
            "initStore",
            "selectDown",
            "addNumData"
          ]),
          getData(){
            this.storeddetails_(this.query).then((res)=>{
              if(res.success==200){
                this.saveDataArr(res.data.map((d,index) => {
                  d.selectArr = [
                    {
                      options:this.storeLists,
                      value:this.storeLists[0].id,
                      number:''
                    }
                  ]
                  return d;
                }));
              }
            })
          },
          getSelectData(){
            this.storehouse_({type:0}).then(res=>{
              if(res.success==200){
                this.saveStore(res.data);
                this.getData();
              }
            })
          },
          submitdata(){
            let data=[];
            let json = {
              id:this.query.id
            };
            for(var i=0;i<this.dataArr.length;i++) {
              data.push({
                p_id: this.dataArr[i].p_id,
                count:this.dataArr[i].number*1
              })
            }

            json.data = data;

            this.auditcheck_({json:JSON.stringify(json)}).then((res)=>{
              if(res.success==200){
                MessageBox.alert("出库审批成功").then(action=>{
                  this.$router.go(-1);
                })
              }
            })
          },
          //确认提交
          sureadd(){
            let ispass=true;
            let pass = true;
            for(var i=0;i<this.dataArr.length;i++) {
              if((this.dataArr[i].number*1)>this.dataArr[i].count_use){
                pass=false;
              }
            }

            for(var i=0;i<this.dataArr.length;i++) {
              if((this.dataArr[i].number*1)>this.dataArr[i].count){
                ispass=false;
              }
            }

            if(!pass){
              MessageBox.confirm("部分商品申请数量不能大于存库，请重新输入！").then(action=>{
                return
              },action=>{

              })
            }

            if(ispass){
              this.submitdata();
            }else{
              MessageBox.confirm("部分商品出库数量和申请数量不一致，是否确定出库？").then(action=>{
                this.submitdata();
              },action=>{

              })
            }
          },
          refuze(){
            this.refuseOutWarehouse_({id:this.query.id}).then((res)=>{
              if(res.success==200){
                this.$router.go(-1);
                setTimeout(()=>{
                  location.reload();
                },500)
              }
            })
          }
        },
        mounted() {
          this.initStore();
          this.getSelectData();
        }
    }

</script>

<style>
  .el-input .el-input__inner{ height: 0.25rem;}
</style>
