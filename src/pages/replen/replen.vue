<template>
  <div class="tab-content">
    <y-header title="补货" isgo="true"></y-header>
    <div class="content">
      <div margin-header class="rep_menu">
        <div style="flex: 1;  " v-if="userLevel==6">
          <router-link :to="{name:'addrep'}">
            <i class="icon">&#xe66a;</i>
            提货申请
          </router-link>
        </div>
        <div style="flex: 1; border-left: 1px solid #ccc;">
          <router-link :to="{name:'reportday'}">
            <i class="icon">&#xe66a;</i>
            工作日报
          </router-link>
        </div>
      </div>
      <div class="search_input search_latitud">
        <label class="form">
          <input type="search" placeholder="请输入设备编号、别名" class="search" v-model="search">
        </label>
        <div class="search_btn" @click="deviceSearch(search)">搜索</div>
      </div>

      <div ref="adminScroll" style="overflow:auto;top: 0;bottom: 0;position: absolute;right: 0;left: 0;margin-bottom: 0.5rem;margin-top: 1.41rem;-webkit-overflow-scrolling:touch">
          <ul class="condition">
            <li class="list" v-for="l in list">
              <router-link :to="{name:'repgoods',query:{vmId:l.id}}" class="working flex">
                <div class="left" v-if="l.state === 1">
                  <img src="../../assets/images/gongz.png" alt="">
                </div>
                <div class="left" v-if="l.state === 0">
                  <img src="../../assets/images/lix.png" alt="">
                </div>
                <div class="left"  v-if="l.state === 3">
                  <img src="../../assets/images/yic.png" alt="">
                </div>
                <div class="right boxflex">
                  <p class="model_p" v-if="l.state === 1">
                    NO.{{l.number}}
                    <span>正常工作</span>
                  </p>
                  <p class="model_p" v-if="l.state === 0">
                    NO.{{l.number}}
                    <span>离线</span>
                  </p>
                  <p class="model_p" v-if="l.state === 3">
                    NO.{{l.number}}
                    <span>异常</span>
                  </p>
                  <!--<p class="model_p bulecolr" @click.prevent="checkd(l.id)">空道：[{{l.offaisles.join(',')}}]</p>-->
                  <p class="place_p">{{l.detail_address}}</p>
                </div>
              </router-link>
              <div class="onefull" @click="onekeyfull(l.id)">一键补满</div>
              <router-link :to="{name:'repdetail',query:{id:l.id}}" class="check_detail check_detail_more">
                查看详情
              </router-link>

              <!--<div class="down_i" @click="getDetail(l)">
                <i class="icon" v-html="l.icon"></i>
              </div>-->

              <!--<div v-if="l.arrList.length>0">
                <div margin-tabbar margin-select style=" margin-bottom: 0px; margin-top: 0px;">
                  <mt-loadmore>
                    <div class="date_table" style=" padding-top: 0.1rem;">
                      <table width="100%" border="0" cellpadding="0" cellspacing="0">
                        <thead>
                        <tr>
                          <th data-field="number" style="width: 0.8rem;">货道ID</th>
                          <th>商品名</th>
                          <th data-field="ordernum" style="width: 0.8rem;">已售数量</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="r in l.arrList">
                          <td>{{r.aisleId}}</td>
                          <td>{{r.productName}}</td>
                          <td>{{r.saledNum}} </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </mt-loadmore>
                </div>
              </div>-->
            </li>
          </ul>

        <mt-popup
          v-model="popupVisible"
          popup-transition="popup-fade" style="width: 80%; border-radius: 0.05rem; ">
          <div style=" height: auto; background: #fff; padding: 0.1rem; border-radius: 0.05rem;">
            <div style="font-size: 0.16rem;">空道详情</div>
            <div class="close_btn bulecolr" @click="popupVisible=false">关闭</div>
            <ul style="margin-top: 0.2rem; max-height: 2.5rem; overflow-y: scroll;">
              <li v-for="(a,$index) in arr" style=" line-height: 0.4rem; text-align: left; text-indent: 0.1rem;">{{a.name}}(货道号：{{a.aisle}})</li>
            </ul>
          </div>
        </mt-popup>

      </div>

    </div>
  </div>
</template>

<script>
  import {mapState, mapActions, mapMutations} from 'vuex';
  import {MessageBox} from "mint-ui"
  export default {
    data() {
      return {
        query:{
          page:1
        },
        search:"",
        list:[],
        popupVisible:false,
        arr:[],
        userLevel:""
      }
    },
    mounted: function () {
      this.$refs.adminScroll && this.ScrollBar.init('admin-scroll', this.$refs.adminScroll);
      this.current2_({pid: 3033}).then((res) => {
        if (res.success == 200) {
          console.info(res)
        }
      });
      this.getData(this.search)
    },
    computed: {
      ...mapState({
        ScrollBar: state => state.ScrollBar,
      })
    },
    methods: {
      ...mapActions([
        'current2_',
        'ophome_',
        'gooddetail_',
        'offMonitorInfo_',
        "onekeyfull_"
      ]),
      //一键补满
      onekeyfull(id){
        MessageBox.confirm('确定一键补满该设备吗？','补货确认').then(action=>{
          this.onekeyfull_({vmId:id}).then((res)=>{
            if(res.success==200){
              MessageBox.alert("一键补满成功！")
            }
          })
        },action=>{

        })
      },
      checkd(id){
        this.popupVisible=true;
        //请求接口
        this.offMonitorInfo_({vmId:id}).then(res =>{
          if(res.success==200){
            this.arr = res.data;
          }
        })
      },
      getData(value){
        return new Promise((resolved, rejected) => {
          this.ophome_({search:value}).then((res) => {
            if(res.success == 200 && res.data.length > 0){
              for(var i=0;i<res.data.length;i++){
                res.data[i].icon="&#xe60c;";
                res.data[i].arrList=[];
              }
              this.userLevel = res.extrasInfo.userLevel
              this.list.push(...res.data);
              resolved && resolved();
            }else{
              rejected && rejected('ok');
            }
          },() => {
            rejected && rejected();
          })
        })
      },
      deviceSearch(value){
        this.list = [];
        this.getData(value)
      },
      getDetail(l){
        if(l.icon=="&#xe60c;"){
          for(var i=0;i<this.list.length;i++){
            this.list[i].arrList=[];
            this.list[i].icon="&#xe60c;"
          }
          l.icon="&#xe6a1;";
          const data={
            machineId:l.id
          }
          return new Promise((resolved, rejected) => {
            this.gooddetail_(data).then((res) => {
              if (res.success == 200 && res.data && res.data.length > 0) {
                this.$set(l, 'arrList', res.data);
                resolved();
              } else {
                rejected();
              }
            }, () => {
              rejected();
            })
          })
        }else{
          l.icon="&#xe60c;";
          this.$set(l, 'arrList', []);
        }
      }
    }
  }
</script>
