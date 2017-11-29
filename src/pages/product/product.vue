<template>
  <div class="tab-content">
    <y-header title="仓库管理" isgo="true" r_title="采购申请" @sured="sured()"></y-header>
    <div class="content" margin-header>
      <div class="scroll-content" style="margin-bottom: 0.45rem;">

        <div style="background: #fff; padding: 0.1rem 0; font-size: 0.14rem;">
          <span style="color: #7e7c7d;">仓库：</span>
          <el-select v-model="storeId" filterable style="width: 70%;" placeholder="请选择" @change="changeValue(storeId)">
            <el-option
              v-for="item in storeArr"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>

        <div class="store_data">
          <div class="store_data_parent">

            <div>
              昨日出库量：{{storemoneydata? storemoneydata.yCount : 0 | thoundnum}}笔
            </div>

            <div>
              今日出库量：{{storemoneydata? storemoneydata.nCount : 0 | thoundnum}}笔
            </div>

          </div>

          <div class="store_data_parent">

            <div>
              库存金额：{{storemoneydata? storemoneydata.totalMoney : 0 | thoundnum}}元
            </div>

            <div>
              库存数量：{{storemoneydata? storemoneydata.totalCount : 0 | thoundnum}}瓶
            </div>

          </div>

        </div>

        <!--库存商品清单-->
        <div class="management">
          <ul class="creat_list">
            <li>
              <a class="central_list central_list_menu clear">
                <div class="list_lef fl flex">库存商品清单<!--<em v-if="count">（待审核：{{count}}）</em>--></div>
                <div class="list_rig fr">
                  <span class="bulecolr" @click="oneprocure()">一键采购</span>
                  <!--<i class="icon">&#xe600;</i>-->
                </div>
              </a>
            </li>
          </ul>

          <ul class="creat_list creat_list_border" v-for="(p,$index) in productlist" @click="golist(p.p_id)">
            <li>
              <a class="central_list central_list_menu clear">
                <div class="list_lef long_middle_left fl">
                  {{p.pName}}
                  <i style="position: absolute; left: 50%; color: #7e7c7d;">库存：{{p.count}}</i>
                </div>
                <div class="list_rig fr">
                  <i class="icon">&#xe600;</i>
                </div>
              </a>
              <div class="store_data_li">
                <div class="store_data_parent">
                  <div>
                    待出库：{{p.count_outbound}}
                  </div>
                  <div>
                    可用：{{p.count_use}}
                  </div>
                </div>
                <div class="store_data_parent">
                  <div>
                    待审批：{{p.approvalCount}}
                  </div>
                  <div>
                    缺货：{{p.offCount}}
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div class="check_more" style="background: #fff;" @click="getmoreproduct()" v-if="(productlist.length)%5 ==0 && productlist.length>0">加载更多</div>
          <div class="check_more" style="background: #fff;" v-if="productlist.length==0">没有更多数据</div>
        </div>

        <!--出库管理-->
        <div class="management">
          <ul class="creat_list">
            <li>
              <router-link :to="{name:'outinventory',query:{id:storeId}}" class="central_list central_list_menu clear">
                <div class="list_lef fl flex">出库管理<em v-if="outstoredata.length!=0">（待审核：{{outstoredata.length}}）</em></div>
                <div class="list_rig fr">
                  <i class="icon">&#xe600;</i>
                </div>
              </router-link>
            </li>
          </ul>

          <ul class="inventory_list creat_list_border salesdata_list" style="min-height: 0.8rem; margin-bottom: 0;">
            <li v-for="(o,$index) in outstoredata" @click="outopage(o.id)">
              <a href="javascript:;" class="central_list flex">
                <div class="list_lef" style="width: 90%;">
                  <p class="time flex">
                    <span style="flex: 5;" class="overnone">{{o.time | dates}}</span>
                    <span style="flex: 3" class="overnone">{{o.user_name}}</span>
                    <span style="flex: 2" class="overnone bulecolr">{{o.outState==0? '待审核' : o.outState==1? '待出库' : '已出库'}}</span>
                  </p>
                  <p class="time">
                    <span>提货单号：{{o.order_number}}</span>
                  </p>
                </div>
                <div class="list_rig">
                  <i class="icon">&#xe600;</i>
                </div>
              </a>
            </li>
            <div class="noData" v-if="outstoredata.length==0">
              <i class="icon">&#xe6bb;</i>
              <p>暂无数据</p>
            </div>
          </ul>

        </div>

        <!--采购申请-->
        <div class="management">
          <ul class="creat_list">
            <li @click="gotoapply()">
              <a class="central_list central_list_menu clear">
                <div class="list_lef fl flex">采购申请</div>
                <div class="list_rig fr">
                  <i class="icon">&#xe600;</i>
                </div>
              </a>
            </li>
          </ul>

          <ul class="inventory_list creat_list_border salesdata_list" style="min-height: 0.8rem; margin-bottom: 0;">
            <li v-for="(w,$index) in warecheck" v-if="w.inState==0" @click="applygopage(w.inState,w.id)">
              <a href="javascript:;" class="central_list flex">
                <div class="list_lef" style="width: 90%;">
                  <p class="time flex">
                    <span style="flex: 4;" class="overnone">{{w.create_time | dates}}</span>
                    <span style="flex: 2" class="overnone bulecolr">待审核</span>
                  </p>
                  <p class="time">
                    <span>采购单号：{{w.order_number}}</span>
                  </p>
                </div>
                <div class="list_rig">
                  <i class="icon">&#xe600;</i>
                </div>
              </a>
            </li>
            <div class="noData" v-if="warecheck.length==0">
              <i class="icon">&#xe6bb;</i>
              <p>暂无数据</p>
            </div>
          </ul>

        </div>

        <!--采购审核-->
        <div class="management">
          <ul class="creat_list">
            <li @click="goprocure()">
              <a class="central_list central_list_menu clear">
                <div class="list_lef fl flex">采购审核<em v-if="warecheck.length!=0">（待审核：{{warecheck.length}}）</em></div>
                <div class="list_rig fr">
                  <i class="icon">&#xe600;</i>
                </div>
              </a>
            </li>
          </ul>

          <ul class="inventory_list creat_list_border salesdata_list" style="min-height: 0.8rem; margin-bottom: 0;">
            <li v-for="(w,$index) in warecheck" @click="progopage(w.inState,w.id)"  v-if="w.inState==0">
              <a href="javascript:;" class="central_list product_list flex">
                <div class="list_lef" style="width: 90%;">
                  <p class="time flex">
                    <span style="flex: 4;" class="overnone">{{w.create_time | dates}}</span>
                    <span style="flex: 2" class="overnone">{{w.user_name}}</span>
                    <span style="flex: 2" class="overnone bulecolr">待审核</span>
                  </p>
                  <p class="time">
                    <span>采购单号：{{w.order_number}}</span>
                  </p>
                  <p class="time">
                    <span>仓库：{{w.storehouse}}</span>
                  </p>
                </div>
                <div class="list_rig">
                  <i class="icon">&#xe600;</i>
                </div>
              </a>
            </li>
            <div class="noData" v-if="warecheck.length==0">
              <i class="icon">&#xe6bb;</i>
              <p>暂无数据</p>
            </div>
          </ul>

        </div>

        <!--入库管理-->
        <div class="management">
          <ul class="creat_list">
            <li @click="gostore()">
              <a class="central_list central_list_menu clear">
                <div class="list_lef fl flex">入库管理</div>
                <div class="list_rig fr">
                  <i class="icon">&#xe600;</i>
                </div>
              </a>
            </li>
          </ul>

          <ul class="inventory_list creat_list_border salesdata_list" style="min-height: 0.8rem; margin-bottom: 0;">
            <li v-for="(i,$index) in instoredata" @click="gotopage(i.id)">
              <a href="javascript:;" class="central_list flex">
                <div class="list_lef" style="width: 90%;">
                  <p class="time flex">
                    <span style="flex: 4;" class="overnone">{{i.create_time | dates}}</span>
                    <span style="flex: 2" class="overnone bulecolr">{{i.inState==0? '审核中' : i.inState==1? '拒绝' : i.inState==2? '待入库' : '已经入库'}}</span>
                  </p>
                  <p class="time">
                    <span>入库单号：{{i.order_number}}</span>
                  </p>
                </div>
                <div class="list_rig">
                  <i class="icon">&#xe600;</i>
                </div>
              </a>
            </li>
            <div class="noData" v-if="instoredata.length==0">
              <i class="icon">&#xe6bb;</i>
              <p>暂无数据</p>
            </div>
          </ul>

        </div>

      </div>
    </div>
  </div>

</template>

<script>

  import {mapActions} from "vuex"

  export default {
    name:"product",
    data(){
      return {
        storeArr:[],
        storeId:"",
        userLevel:"",
        count:[],
        msg:"aaa",
        outwareklimit:true,
        storemoneydata:{},
        pagenum:1,
        productlist:[],
        outstoredata:[], //出库管理
        warecheck:[], //采购审核
        instoredata:[] //入库管理
      }
    },
    mounted(){
      this.getData();
    },
    methods:{
      ...mapActions([
        "storehouse_",
        "outstoredata_",
        "storemoneynumber_"
      ]),
      //一键采购
      oneprocure(){
        this.$router.push({name:"purchapp",query:{id:this.storeId,type:1}})
      },
      //库存商品清单
      golist(id){
        this.$router.push({name:"productlist",query:{id:id,p_w_id:this.storeId}})
      },
      //入库管理
      gostore(){
        this.$router.push({name:"inventory",query:{id:this.storeId}})
      },
      //采购申请
      sured(){
        this.$router.push({name:"purchapp",query:{id:this.storeId}})
      },
      //跳转到采购申请
      gotoapply(){
        this.$router.push({name:"proapply",query:{id:this.storeId}})
      },
      //跳转到采购审核
      goprocure(){
        this.$router.push({name:"procurecheck",query:{id:this.storeId}})
      },
      //下拉
      changeValue(id){
        this.storeId = id;
        this.productlist=[];
        this.pagenum=1;
        this.getstoremoneynumber(id);
        this.storeproductlist(id);
        this.gettypedata(1,'outstoredata');
        this.gettypedata(2,'warecheck');
        this.gettypedata(3,'instoredata');
      },
      getData(){
        this.storehouse_({type:0}).then(res=>{
          if(res.success==200){
            this.storeArr = res.data;
            this.storeId = res.data.length==0? '' : res.data[0].id;
            this.getstoremoneynumber(this.storeId);
            this.storeproductlist(this.storeId);
            this.gettypedata(1,'outstoredata');
            this.gettypedata(2,'warecheck');
            this.gettypedata(3,'instoredata');
          }
        })
      },
      //仓库金额和数量
      getstoremoneynumber(id){
        this.storemoneynumber_({p_w_id:id}).then((res)=>{
          if(res.success==200){
            this.storemoneydata = res.data;
            this.userLevel = res.extrasInfo.userLevel; //
          }
        })
      },
      //库存商品清单
      storeproductlist(id){
        this.storemoneynumber_({p_w_id:id,page:this.pagenum,pagesize:5}).then((res)=>{
          if(res.success==200 && res.data){
            this.productlist.push(...res.data.data);
          }
        })
      },
      //加载更多库存商品清单
      getmoreproduct(){
        this.pagenum++;
        this.storeproductlist(this.storeId);
      },

      //出库管理1，采购申请2,采购审核3，入库管理4，
      gettypedata(type,key){
        this.storemoneynumber_({p_w_id:this.storeId,type:type}).then((res)=>{
          if(res.success==200){
            this[key]= res.data;
          }
        })
      },

      //出库页面跳转
      outopage(id){
        this.$router.push({name:"outcheck",query:{id:id}})
      },

      //采购申请
      applygopage(state,id){
        //采购申请跳转页面
        if(state==0){
          //待审核0
          this.$router.push({name:"prowait",query:{id:id}})
        }else if(state==1){
          //已拒绝
          this.$router.push({name:"prorefuze",query:{id:id}})
        }else{
          //已同意
          this.$router.push({name:"goodsdetails",query:{id:id}})
        }
      },

      //采购审核
      progopage(state,id){
        //采购审核跳转页面
        //已同意和已拒绝
        if(state==2 || state==1){
          this.$router.push({name:"procheckdetail",query:{id:id}})
        }else if(state==0){
          this.$router.push({name:"procheck",query:{id:id}})
        }
      },

      //入库管理页面跳转
      gotopage(id){
        this.$router.push({name:"incheck",query:{id:id}})
      }

    }
  }

</script>

<style scoped>
  .el-select-dropdown__item{ text-align: left;}
</style>
