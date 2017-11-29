<template>
  <div class="content-modal">
    <y-header title="财务明细" router="-1" r_title="新增" @sured="sured()"></y-header>
    <div class="content">
      <div class="scroll-content" style="margin-top:0.45rem;">
        <y-select-date @select="selectDate($event)" :futureDate="true" :time="query"></y-select-date>
        <!--销售情况-->
        <div class="by_device">
          <!--缺货明细-->
          <div class="sequencing" style="margin-top: 0;">
            <div class="outtinvent">
              <ul class="inventory_list salesdata_list" style="min-height: 0.8rem;">
                <li v-for="(p,$index) in productarr">
                  <a href="javascript:;" class="central_list flex">
                    <div class="list_lef index_financial">
                      <p style="flex: 2;"><span>{{p.time | date}}</span></p>
                      <p><span>{{p.type=='out'? '支出' : '收入'}}</span></p>
                      <p><span>{{p.costPrice || 0 | thoundnum}}</span></p>
                      <p><span>{{p.remark}}</span></p>
                    </div>
                  </a>
                </li>
                <div class="check_more" @click="getmoredata()" v-if="productarr.length!=0 && productarr.length%10 == 0 && isshow ">加载更多</div>
                <div class="noData" v-if="productarr.length==0">
                  <i class="icon">&#xe6bb;</i>
                  <p>暂无数据</p>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from "vue"

  import {mapActions} from "vuex"

  import {Toast} from "mint-ui"

  export default {
    name:"financialdetails",
    data(){
      return {
        query:{
          times:this.$route.query.times,
          timee:this.$route.query.timee
        },
        type:0,
        page:1,
        pagesize:10,
        isshow:false,
        productarr:[]
      }
    },
    mounted(){
      this.productselllist();
    },
    methods:{
      ...mapActions([
        "financedetail_"
      ]),
      sured(){
        this.$router.push({name:"addfinancial"})
      },
      //按设备
      productselllist(){
        const data = {
          times:this.query.times,
          timee:this.query.timee,
          page:this.page,
          pagesize:this.pagesize,
          type:this.type
        }
        this.financedetail_(data).then((res)=>{
          if(res.success==200 && res.data.data.length>0){
            this.isshow=true;
            this.productarr.push(...res.data.data);
          }else{
            this.isshow=false;
          }
        })
      },
      //分页
      getmoredata(){
        this.page++;
        this.productselllist();
      },
      selectDate(data){
        this.query.times = data.formats[0];
        this.query.timee = data.formats[1];
        this.type=1;
        this.page=1;
        this.productarr=[];
        this.productselllist();
      }
    }
  }

</script>

<style scoped>


</style>
