<template>

  <div class="tab-content">
    <y-header title="缺货设备" router="-1"></y-header>
    <div class="content">
        <ul class="tab_label flex" margin-header>
            <li class="label_list" @click="menuNum = 1" :class="{ 'on': menuNum == 1}">
              按设备
              <div class="triangle_first" v-show="menuNum==1"></div>
            </li>
            <li class="label_list" @click="menuNum = 2" :class="{ 'on': menuNum == 2}">
              按设备组
              <div class="triangle_first" v-show="menuNum==2"></div>
            </li>
        </ul>
        <div class="scroll-content"  style="margin-top:0.9rem;">
            <div class="outsrock_top">
              <div class="outsrock clear error_a">
                <a href="javascript:;" :class="{ 'active': activeNum == 1}" @click="activeNum=1">空道</a>
                <a href="javascript:;" :class="{ 'active': activeNum == 2}" @click="activeNum=2">缺货</a>
                <a href="javascript:;" :class="{ 'active': activeNum == 3}" @click="activeNum=3">缺品类</a>
                <a href="javascript:;" :class="{ 'active': activeNum == 4}" @click="activeNum=4">缺品相</a>
              </div>
            </div>
            <div class="outtinvent" v-if="menuNum==1">

                <ul class="inventory_list salesdata_list" v-if="activeNum == 1">
                    <li v-for="(m,$index) in monitorarr">
                        <a href="javascript:;" class="central_list flex">
                            <div class="list_lef storescont">
                              <p><span>{{m.another}}</span></p>
                              <p class="time">编号：{{m.number}}</p>
                            </div>
                            <div class="list_rig">
                              <p class="fr line_state" @click="checkdetail(m.id,m.offaisle)">
                                <span class="empty_path">
                                  <em>{{m.offaisle}}</em>空道</span>
                              </p>
                            </div>
                        </a>
                    </li>
                </ul>

                <div class="sequencing" v-if="activeNum == 2 && offarr.length>0" style="margin-top: 0;">
                  <div class="title flex">
                    <span>缺货商品</span>
                  </div>
                  <ul class="list">
                    <li class="flex" v-for="(n,$index) in offarr">
                      <em :class="{ 'on': $index == 0}">{{$index<9? "0"+($index+1) : $index+1}}</em>
                      <div class="amount">
                        <span class="product_name">{{n.name}}</span>
                        <p class="number" :style="{width:(n.count/max_product_totalSaleRoom)*100 + '%'}"></p>
                      </div>
                      <span class="showNum">{{n.count}}瓶</span>
                    </li>
                  </ul>
                </div>

                <div class="sequencing" v-if="activeNum == 2 && offarr.length>0">
                  <div class="title flex">
                    <span>缺货明细</span>
                  </div>
                  <ul class="inventory_list salesdata_list" v-if="activeNum == 2">
                    <li v-for="(o,$index) in offarrvim">
                      <a href="javascript:;" class="central_list flex">
                        <div class="list_lef storescont">
                          <p><span>{{o.another}}</span></p>
                          <p class="time">编号：{{o.number}}</p>
                        </div>
                        <div class="list_rig">
                          <p class="fr line_state" @click="checkgroup(o.id,o.count)">
                            <span class="empty_path"><em>{{o.count}}</em>瓶</span>
                          </p>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>


                <ul class="inventory_list salesdata_list" v-if="activeNum == 3">
                  <li v-for="g in groupoffarr">
                    <a href="javascript:;" class="central_list flex">
                      <div class="list_lef storescont">
                        <p><span>{{g.another}}</span></p>
                        <p class="time">编号：{{g.number}}</p>
                      </div>
                      <div class="list_rig">
                        <p class="fr line_state" @click="checkque(g.vmId,g.lCount)">
                          <span class="empty_path"><em>{{g.lCount}}</em>品类</span>
                        </p>
                      </div>
                    </a>
                  </li>
                </ul>

                <ul class="inventory_list salesdata_list" v-if="activeNum == 4">
                  <li v-for="g in outxiang">
                    <a href="javascript:;" class="central_list flex">
                      <div class="list_lef storescont">
                        <p><span>{{g.gname}}</span></p>
                        <p class="time">编号：{{g.number}}</p>
                      </div>
                      <div class="list_rig">
                        <p class="fr line_state" @click="checkqpx(g.qpx_list)">
                          <span class="empty_path"><em>{{g.qpx_count}}</em>品相</span>
                        </p>
                      </div>
                    </a>
                  </li>
                </ul>

                <div class="noData" style="position: static; padding: 0.3rem 0;" v-if="activeNum==1 && monitorarr.length==0">
                  <i class="icon">&#xe6bb;</i>
                  <p>暂无数据</p>
                </div>

                <div class="noData" style="position: static; padding: 0.3rem 0;" v-if="activeNum==2 && offarr.length==0">
                  <i class="icon">&#xe6bb;</i>
                  <p>暂无数据</p>
                </div>

                <div class="noData" style="position: static; padding: 0.3rem 0;" v-if="activeNum==3 && groupoffarr.length==0">
                  <i class="icon">&#xe6bb;</i>
                  <p>暂无数据</p>
                </div>

                <div class="noData" style="position: static; padding: 0.3rem 0;" v-if="activeNum==4 && outxiang.length==0">
                  <i class="icon">&#xe6bb;</i>
                  <p>暂无数据</p>
                </div>

            </div>

            <div class="outtinvent" v-if="menuNum==2">

              <ul class="inventory_list salesdata_list" v-if="activeNum == 1">
                <li v-for="(m,$index) in monitorarr" @click="searchid(m.id)">
                  <a href="javascript:;" class="central_list flex">
                    <div class="list_lef long_left">
                      <p style="width: 100%;">
                        <span>{{m.vending_machine_group_name}}</span>({{m.offaisle}}空道)
                      </p>
                    </div>
                    <div class="list_rig clear">
                      <i class="icon fr">&#xe600;</i>
                    </div>
                  </a>
                </li>
              </ul>

              <!--<div class="sequencing" v-if="activeNum == 2 && offarr.length>0">
                <div class="title flex">
                  <span>缺货商品</span>
                </div>
                <ul class="list">
                  <li class="flex" v-for="(n,$index) in offarr">
                    <em :class="{ 'on': $index == 0}">{{$index<9? "0"+($index+1) : $index+1}}</em>
                    <div class="amount">
                      <span class="product_name">{{n.name}}</span>
                      <p class="number" :style="{width:(n.count/max_product_totalSaleRoom)*100 + '%'}"></p>
                    </div>
                    <span class="showNum">{{n.count}}瓶</span>
                  </li>
                </ul>
              </div>-->

              <div class="inventory_list salesdata_list" v-if="activeNum == 2 && offarr.length>0" style="margin-top: 0;">
                <ul class="inventory_list salesdata_list" v-if="activeNum == 2">
                  <li v-for="(o,$index) in offarrvim" @click="searchqueid(o.id)">
                    <a href="javascript:;" class="central_list flex">
                      <div class="list_lef long_left">
                        <p><span>{{o.vending_machine_group_name}}</span>({{o.count}}瓶)</p>
                      </div>
                      <div class="list_rig clear">
                        <i class="icon fr">&#xe600;</i>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>

              <ul class="inventory_list salesdata_list" v-if="activeNum == 3">
                <li v-for="g in groupoffarr" @click="searchgid(g.gId)">
                  <a href="javascript:;" class="central_list flex">
                    <div class="list_lef long_left">
                      <p><span>{{g.gName}}</span>({{g.lCount}}品类)</p>
                    </div>
                    <div class="list_rig clear">
                      <i class="icon fr">&#xe600;</i>
                    </div>
                  </a>
                </li>
              </ul>

              <ul class="inventory_list salesdata_list" v-if="activeNum == 4">
                <li v-for="g in outxiang" @click="searchqpx(g.g_id)">
                  <a href="javascript:;" class="central_list flex">
                    <div class="list_lef long_left">
                      <p><span>{{g.gname}}</span>({{g.qpx_count}}品相)</p>
                    </div>
                    <div class="list_rig clear">
                      <i class="icon fr">&#xe600;</i>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
        </div>
        <!--空道-->
        <mt-popup
          v-model="popupVisible"
          popup-transition="popup-fade" style="width: 80%; border-radius: 0.05rem;">
          <div style=" height: auto; background: #fff; padding: 0.1rem; border-radius: 0.05rem;">
            <div style="font-size: 0.16rem;">空道详情</div>
            <div class="close_btn bulecolr" @click="popupVisible=false">关闭</div>
            <ul style="margin-top: 0.2rem;max-height: 2.5rem;overflow: scroll;">
              <li v-for="(a,$index) in arr" style=" line-height: 0.4rem; text-align: left; text-indent: 0.1rem;">{{a.name}}   （货道：{{a.aisle}}） </li>
            </ul>
          </div>
        </mt-popup>

        <!--缺货-->
        <mt-popup
          v-model="groupVisible"
          popup-transition="popup-fade" style="width: 80%; border-radius: 0.05rem;">
          <div style=" height: auto; background: #fff; padding: 0.1rem; border-radius: 0.05rem;">
            <div style="font-size: 0.16rem;">缺货数</div>
            <div class="close_btn bulecolr" @click="groupVisible=false">关闭</div>
            <ul style="margin-top: 0.2rem;  max-height: 2.5rem; overflow-y: scroll;">
              <li v-for="(a,$index) in grouparr" style=" line-height: 0.4rem; text-align: left; text-indent: 0.1rem;">{{a.name}}（{{a.count}}瓶）</li>
            </ul>
          </div>
        </mt-popup>

        <!--缺品类-->
        <mt-popup
          v-model="lackVisible"
          popup-transition="popup-fade" style="width: 80%; border-radius: 0.05rem;">
          <div style=" height: auto; background: #fff; padding: 0.1rem; border-radius: 0.05rem;">
            <div style="font-size: 0.16rem;">缺品类数</div>
            <div class="close_btn bulecolr" @click="lackVisible=false">关闭</div>
            <ul style="margin-top: 0.2rem; max-height: 2.5rem; overflow-y: scroll;">
              <li v-for="(a,$index) in lackarr" style=" line-height: 0.4rem; text-align: left; text-indent: 0.1rem;">{{a.pName}} &nbsp;（货道：{{a.aisle}}）</li>
            </ul>
          </div>
        </mt-popup>

        <!--缺品相-->
        <mt-popup
        v-model="qpxVisible"
        popup-transition="popup-fade" style="width: 80%; border-radius: 0.05rem;">
        <div style=" height: auto; background: #fff; padding: 0.1rem; border-radius: 0.05rem;">
          <div style="font-size: 0.16rem;">缺品相数</div>
          <div class="close_btn bulecolr" @click="qpxVisible=false">关闭</div>
          <ul style="margin-top: 0.2rem; max-height: 2.5rem; overflow-y: scroll;">
            <li v-for="(a,$index) in qpxarr" style=" line-height: 0.4rem; text-align: left; text-indent: 0.1rem;">{{a.name}}</li>
          </ul>
        </div>
      </mt-popup>

    </div>
  </div>

</template>

<script>

  import Vue from "vue"

  import {mapActions} from "vuex"

  import { Popup,MessageBox } from 'mint-ui';

  Vue.component(Popup.name, Popup);

  import {maxArr} from "../../utils"

  export default {
    name:"outofstock",
    data(){
      return {
        id:"",
        queid:"",
        gId:"",
        g_id:"",
        popupVisible:false,
        arr:[],
        groupVisible:false,
        grouparr:[],
        lackVisible:false,
        lackarr:[],
        qpxVisible:false,
        qpxarr:[],
        menuNum:1,
        activeNum:1,
        monitorarr:[],
        offarr:[],
        offarrvim:[],
        offproarr:[],
        groupoffarr:[],
        outxiang:[],
        max_product_totalSaleRoom:0
      }
    },
    watch:{
      menuNum:function (value,oldvalue){
        if(value==2){
          this.id="";
          this.queid="";
          this.gId="";
          this.g_id="";
        }
        //空道
        this.homemonitor(this.menuNum);
        //缺货
        this.homeoff(this.menuNum)
        //缺品类
        this.homelack(this.menuNum)

        //缺品相
        this.homexiang(this.menuNum)
      }
    },
    mounted(){
      //空道
      this.homemonitor(this.menuNum);
      //缺货
      this.homeoff(this.menuNum)
      //缺品类
      this.homelack(this.menuNum)
      //缺品相
      this.homexiang(this.menuNum)
    },
    methods:{
      ...mapActions([
        "homemonitor_",
        "homeoff_",
        "homelack_",
        "homegroup_",
        "offMonitorInfo_",
        "lackdetail_",
        "homegroupdetail_",
        "homexiang_"
      ]),
      //点击设备组查看设备情况
      searchid(id){
        this.id=id;
        this.menuNum=1;
      },
      //点击设备组查看缺货情况
      searchqueid(id){
        this.queid=id;
        this.menuNum=1;
      },
      //点击设备组的缺品类查看情况
      searchgid(id){
        //console.info(id)
        this.gId=id;
        this.menuNum=1;
      },
      //点击设备组的缺品相查看情况
      searchqpx(id){
        this.g_id=id;
        this.menuNum=1;
      },

      //空道
      homemonitor(type){
        this.monitorarr=[];
        this.homemonitor_({type:type-1,id:this.id}).then((res)=>{
          if(res.success==200){
            this.monitorarr = res.data;
          }
        })
      },
      //查看空道
      checkdetail(id,num){
        if(num>0){
          this.popupVisible=true;
          this.arr=[];
          this.offMonitorInfo_({vmId:id}).then((res)=>{
            if(res.success==200 && res.data.length>0){
              this.arr = res.data;
            }
          })
        }else{
          MessageBox.alert("暂无数据");
        }
      },
      //缺货
      homeoff(type){
        this.homeoff_({type:type-1,id:this.queid}).then((res)=>{
          if(res.success==200){
            this.offarr = res.data.product;
            if(type==1){
              this.offarrvim = res.data.vm;
            }else{
              this.offarrvim = res.data.vmGroup;
            }
            this.max_product_totalSaleRoom=maxArr(this.offarr,"count")*1.1;
          }
        })
      },
      //缺货详情
      checkgroup(id,num){
        if(num>0){
          this.groupVisible=true;
          this.grouparr=[];
          this.homegroupdetail_({id:id,type:this.menuNum-1}).then((res)=>{
            if(res.success==200 && res.data.length>0){
              this.grouparr = res.data;
            }
          })
        }else{
          MessageBox.alert("暂无数据");
        }
      },
      //缺品类
      homelack(type){
        this.homelack_({type:type-1,gId:this.gId}).then((res)=>{
          if(res.success==200){
            this.groupoffarr = res.data;
          }
        })
      },
      //缺品类详情
      checkque(id,num){
        if(num>0){
          this.lackVisible=true;
          this.lackarr=[];
          this.lackdetail_({vmId:id}).then((res)=>{
            if(res.success==200 && res.data.length>0){
              this.lackarr = res.data;
            }
          })
        }else{
          MessageBox.alert("暂无数据");
        }
      },
      //缺品相
      homexiang(type){
        this.homexiang_({type:type-1,g_id:this.g_id}).then((res)=>{
          if(res.success==200){
            this.outxiang = res.data;
          }
        })
      },
      checkqpx(arr){
        if(arr.length>0){
          this.qpxVisible=true;
          this.qpxarr = arr;
        }else{
          MessageBox.alert("暂无数据");
        }
      }
      /*//按设备缺货
      homegroup(type){
        this.homegroup_({type:type-1}).then((res)=>{
          if(res.success==200){
            this.groupoffarr = res.data.vmGroup;
          }
        })
      }*/
    }
  }

</script>

<style scoped>


</style>
