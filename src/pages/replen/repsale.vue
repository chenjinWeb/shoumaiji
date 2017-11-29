<template>
  <!-- 新增 -->
  <div class="content-modal">
    <y-header title="销量参考" router="-1"></y-header>
    <div class="content">
      <div class="scroll-content" style="margin-top:0.45rem;">
        <y-select-date @select="selectDate($event)" mode="single" :futureDate="true" :time="query.time" ></y-select-date>
        <div class="outtinvent" style="margin-bottom: 0.8rem;">
          <ul class="creat_list">
            <li v-for="(detail,$index) in detailArr">
              <a href="javascript:;" class="central_list clear">
                <div class="list_lef fl" v-if="detail.pName">{{detail.pName}}</div>
                <div class="list_lef fl" v-if="detail.createTime">{{detail.createTime | dates}}</div>
                <div class="list_rig fr">
                  销售数量：{{detail.count}}瓶
                </div>
              </a>
            </li>
          </ul>

          <div class="noData" v-if="detailArr.length==0">
            <i class="icon">&#xe6bb;</i>
            <p>暂无数据</p>
          </div>
        </div>
        <div class="foot_menu flex">
          <a href="javascript:;" class="cancel_but" @click="$router.go(-1)">取消</a>
          <a href="javascript:;" class="confirm_but boxflex" @click="generatelad()">生成提货单</a>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

  import {mapState,mapActions,mapMutations} from "vuex"

  import {Indicator,Toast,MessageBox} from "mint-ui"

  export default {
    name:"repsale",
    data(){
      return {
        query:{
          time:Date.format(new Date(),"yyyy-MM-dd")
        },
        detailArr:[]
      }
    },
    computed:{
      ...mapState({
        ispass:state=>state.ispass
      })
    },
    mounted(){
      this.getData(this.query)
    },
    methods:{
      ...mapActions([
        "repsaleref_"
      ]),
      ...mapMutations([
        "setLadList"
      ]),

      selectDate(data){
        this.detailArr=[];
        this.query.time = data.format;
        this.getData(this.query)
      },
      getData(query){
        return new Promise((resolved, rejected) => {
          this.repsaleref_(query).then((res) => {
            if (res.success == 200 && res.data && res.data.length > 0) {
              this.detailArr.push(...res.data);
              resolved();
            } else {
              rejected();
            }
          }, () => {
            rejected();
          })
        })
      },
      generatelad(){
        if(this.detailArr.length==0){
          Toast("暂无数据")
        }else{
         /* Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          });*/
          this.setLadList(this.detailArr);
          MessageBox.alert("生成提货单成功").then(action=>{
            this.$router.go(-1);
          })
          /*Indicator.close();*/
        }
      }
    }
  }

</script>

<style scoped>


</style>
