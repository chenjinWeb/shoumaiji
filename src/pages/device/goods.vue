<template>
  <div class="content-modal">
    <y-header title="货道管理" router="-1"></y-header>
    <div class="content">
      <ul class="tab_label tab_labels flex" margin-header backbg>
        <li class="label_list" @click.stop="goodsCancel()"><span>全部清零</span></li>
        <li class="label_list on" @click.stop="goodsFill()"><span>全部补满</span></li>
      </ul>
      <div class="scroll-content" style="margin-top:0.89rem;">


        <div class="aisle_list flex" v-for="i in monitorInfos">
          <div class="left">
            <img v-bind:src="i.cover_url" alt="">
          </div>
          <div class="right boxflex">
            <h3 class="aisle_tit flex"><span>货道{{i.aisle}}：{{i.name}}</span>
              <!--<router-link :to="{name:'changegoods',query:{vmId:query.vmId,pId:i.product_id,aisle:i.aisle}}" class="edit_finish">换货</router-link>-->
            </h3>
            <div class="aisle_data flex">
              <p>价格<span class="fr">
                                <em>{{i.price}}</em>
                            </span></p>
              <p class="capacity">容量<span class="fr">
                                <em>{{i.most}}</em>
                            </span></p>
              <p class="threshold">阀值<span class="fr">
                                <em>{{i.least}}</em>
                            </span></p>
            </div>
            <div class="aisle_stock flex">
              <p>库存<span class="fr">{{i.surplus_count}}</span></p>
              <p class="this_replenishment">本次补货数量<span class="fr">
                                <em>{{i.num}}</em>
                                <i @click.stop="editNum(i)" class="icon">&#xe60e;</i>
                            </span></p>
            </div>
          </div>
        </div>

      </div>

    </div>

    <div class="foot_menu flex">
      <a href="javascript:;" class="cancel_but" @click.stop="getmonitorInfo()">取消修改</a>
      <a href="javascript:;" class="confirm_but boxflex" @click.stop="pushEdit()" :class="state==0? 'confirm_btn' : ''">确认</a>
    </div>

    <transition name="custom-classes-transition" enter-active-class="animated nav-open" leave-active-class="animated nav-close">
      <router-view></router-view>
    </transition>


  </div>
</template>

<script>
  import {mapActions,mapState,mapMutations} from "vuex"
  import {Toast, MessageBox} from 'mint-ui';
  import Vue from 'vue'

  export default {
    name: "goods",
    data() {
      return {
        query: this.$route.query,
        monitorInfos: [],
//        updateAisles:[]
      }
    },
    computed:{
      ...mapState({
        goodsLists:state=>state.goodsLists
      })
    },
    mounted() {
      this.getmonitorInfo();
//      this.getupdateAisle();
    },
    methods: {
      ...mapActions([
        "monitorInfo_",
        "tasksubmit_"
      ]),
      ...mapMutations([
        "setGoodsList"
      ]),
      //获取数据列表
      getmonitorInfo() {
        this.monitorInfo_(this.query).then(res => {
          if (res.success == 200) {
            this.monitorInfos = res.data.map( d => { d.num = 0;return d } );
            this.setGoodsList(this.monitorInfos);
          }
        })
      },
      /*getupdateAisle() {
        this.updateAisle_({vmId: this.query.vmId, aisle: this.monitorInfos.aisle, num: this.monitorInfos.num}).then(res => {
          if (res.success == 200) {
            console.info(res);
//              this.updateAisles=res.data;
          }
        })
      },*/
      //修改
      editNum(data) {
        let n = data.most - +data.surplus_count;
        MessageBox.prompt(' ','请输入补货数量', {
          inputValue:n,
          inputPlaceholder: `最大补货${n}`
        }).then(
          ({value, action}) => {
            if (isNaN(+value)) {
              Toast('请输入有效数字！');
              return;
            }
            if (value > n) {
              Toast(`不能大于${n}`)
              return;
            }
            data.num = value
          },({action})=>{

          }
        )
      },
      //提交
      pushEdit(){
        Toast("功能暂未开放!");
        return
        let channels = [];
        let body = {
          vmId:this.query.vmId,
          json:channels
        };

        for(let i = 0; i < this.monitorInfos.length; i++){
          let a = this.monitorInfos[i];
          channels.push({
            aisle:a.aisle,
            num:a.num,
          })
        }
        this.tasksubmit_(body).then((res) => {
          if(res.success == 200){
            MessageBox.alert("补货成功!").then(ac)
          }
        })
      },
      //补满
      goodsFill(){
        this.monitorInfos.forEach(d => {
          let n = +d.most - +d.surplus_count;
          if(n > 0) d.num = n;
        })
      },
      //清空
      goodsCancel(){
        this.monitorInfos.forEach(d => {
          d.num = 0;
        })
      },
    }
  }
</script>
