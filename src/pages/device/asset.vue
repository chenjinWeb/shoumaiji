<template>
  <div class="content-modal">

    <y-header title="资产管理" router="-1" r_title="新增" @sured="goPage()"></y-header>

    <div class="content">
      <div class="scroll-content" margin-header>

        <div class="management">
          <ul class="creat_list">
            <li>
              <router-link :to="{name:'machinelist'}" class="central_list central_list_menu clear">
                <div class="list_lef fl flex">机器列表</div>
                <div class="list_rig fr">
                  <i class="icon">&#xe600;</i>
                </div>
              </router-link>
            </li>
          </ul>
        </div>

        <div class="zichan">

          <div class="zichan_div">

            <div>
              合同数量：{{total.count || 0 | thoundnum}}
            </div>

            <div>
              设备总量：{{total.buy_vm_count || 0 | thoundnum}}
            </div>

          </div>

          <div class="zichan_div">

            <div>
              租赁数量：{{total.renter_vm_count || 0 | thoundnum}}
            </div>

            <div>
              库存数量：{{total.surplus_count || 0 | thoundnum}}
            </div>

          </div>


        </div>

        <div>

          <div class="asset_bg">

            <div class="asset_title" @click="selectdata()">
              <p>合同查询</p>
              <i class="icon asset_r" style="color: #999; font-size: 0.2rem;">&#xe618;</i>
            </div>

            <ul>
              <li class="asset_li" v-for="(l,$index) in list">
                <p style="font-weight: bold;">合同编号：{{l.contract_no}}</p>
                <p style="position: relative;">金额：{{l.money | thoundnum}}元<span class="posi_span">数量：{{l.vm_count}}台</span></p>
                <p style="position: relative;">厂家：{{l.name}}<span class="posi_span" v-if="l.r_name">租赁方：{{l.r_name}}</span></p>
                <p style="position: relative">存放地址：{{l.detail_address}}<span class="posi_span overnone" v-if="l.r_detail_address">租赁方地址：{{l.r_detail_address}}</span></p>
                <p>创建时间：{{l.create_time | dates}}</p>
                <i class="bulecolr asset_r" @click="editasset(l.id)">编辑</i>
              </li>
            </ul>

          </div>

        </div>

      </div>
      <mt-popup v-model="operator_show" popup-transition="popup-fade" style="width: 90%; border-radius: 0.05rem; min-height: 1.0rem;">

        <div style=" height: auto; background: #fff; padding: 0.1rem; border-radius: 0.05rem;">
          <y-select-date @select="selectDate($event)" :futureDate="true" :time="query"></y-select-date>
          <ul class="asset_ul">
            <li>
              <div class="central_list clear">
                <label class="forms">
                  <div class="list_lef fl">合同类型</div>
                  <div class="list_rig fr">
                    <div class="search_input select_area" style="line-height: 0.6rem;">
                      <el-select v-model="type_id" placeholder="请选择">
                        <el-option
                          v-for="p in contractType"
                          :key="p.id"
                          :label="p.name"
                          :value="p.id">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                </label>
              </div>
            </li>
            <li v-if="type_id==1">
              <div class="central_list clear">
                <label class="forms">
                  <div class="list_lef fl">出厂厂家</div>
                  <div class="list_rig fr">
                    <div class="search_input select_area" style="line-height: 0.6rem;">
                      <el-select v-model="vendor_id" placeholder="请选择">
                        <el-option
                          v-for="p in vendorlist"
                          :key="p.id"
                          :label="p.name"
                          :value="p.id">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                </label>
              </div>
            </li>
            <li v-if="type_id==2">
              <div class="central_list clear">
                <label class="forms">
                  <div class="list_lef fl">租赁方</div>
                  <div class="list_rig fr">
                    <div class="search_input select_area" style="line-height: 0.6rem;">
                      <el-select v-model="renter_id" placeholder="请选择">
                        <el-option
                          v-for="p in renterlist"
                          :key="p.id"
                          :label="p.name"
                          :value="p.id">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                </label>
              </div>
            </li>
            <li v-if="type_id==1">
              <div class="central_list clear">
                <label class="forms">
                  <div class="list_lef fl">省份</div>
                  <div class="list_rig fr">
                    <div class="search_input select_area" style="line-height: 0.6rem;">
                      <el-select v-model="province_id" placeholder="请选择" @change="changeProvince(province_id)">
                        <el-option
                          v-for="p in provincearr"
                          :key="p.id"
                          :label="p.name"
                          :value="p.id">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                </label>
              </div>
            </li>
            <li v-if="type_id==1">
              <div class="central_list clear">
                <label class="forms">
                  <div class="list_lef fl">城市</div>
                  <div class="list_rig fr">
                    <div class="search_input select_area" style="line-height: 0.6rem;">
                      <el-select v-model="city_id" placeholder="请选择" @change="changeCity(city_id)">
                        <el-option
                          v-for="c in cityarr"
                          :key="c.id"
                          :label="c.name"
                          :value="c.id">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                </label>
              </div>
            </li>
            <li>
              <div class="central_list clear">
                <div class="list_lef fl">合同编号</div>
                <div class="list_rig fr">
                  <input type="text" placeholder="请输合同编号" class="txt" v-model="contract_no">
                </div>
              </div>
            </li>
          </ul>
          <div class="mac_div" style="margin-top: 0.2rem;">
            <a class="btn" @click="canceloperate()">重置</a>
            <a class="btn" @click="sureoperate()">确定</a>
          </div>
        </div>

      </mt-popup>
    </div>

    <transition name="custom-classes-transition" enter-active-class="animated nav-open" leave-active-class="animated nav-close">
      <router-view></router-view>
    </transition>
  </div>

</template>

<script>

    import {mapState,mapActions,mapMutations} from "vuex"

    export default {
        name: "app",
        data() {
            return {
              query:{
                times:Date.format(new Date(),"yyyy-MM-dd"),
                timee:Date.format(new Date(),"yyyy-MM-dd")
              },
              times:"",
              timee:"",
              total:{
                count:0,
                buy_vm_count:0,
                renter_vm_count:0,
                surplus_count:0
              },
              list:[],
              operator_show:false,
              vendor_id:"",
              renter_id:"",
              province_id:"",
              provincearr:[],
              city_id:"",
              cityarr:[],
              contract_no:"",
              contractType:[
                {
                  id:1,
                  name:"采购合同"
                },
                {
                  id:2,
                  name:"租赁合同"
                }
              ],
              type_id:""
            }
        },
        computed: {
          ...mapState({
            "vendorlist":state=>state.vendorlist,
            "renterlist":state=>state.renterlist
          })
        },
        mounted() {
          this.getvendor();
          this.getrenter();
          this.getprinid();
          this.getData();
        },
        methods: {
          ...mapActions([
            "assetlist_",
            "getvendorlist_",
            "devicepccid_",
            "getrenterlist_"
          ]),
          ...mapMutations([
            "getVendorList",
            "getRenterList"
          ]),
          //筛选
          selectdata(){
            this.operator_show=true;
          },
          //重置
          canceloperate(){
            this.vendor_id="";
            this.renter_id="";
            this.type_id="";
            this.province_id="";
            this.city_id="";
            this.contract_no="";
          },
          //确认
          sureoperate(){
            this.getData();
          },
          //日历选择
          selectDate(data){
            this.query.times = data.formats[0];
            this.query.timee = data.formats[1];
            this.times = data.formats[0];
            this.timee = data.formats[1];
          },
          getData(){
            const data={
              dates:this.times,
              datee:this.timee,
              vendor_id:this.vendor_id,
              renter_id:this.renter_id,
              type:this.type_id,
              page:1,
              pagesize:20,
              province_id:this.province_id,
              city_id:this.city_id,
              contract_no:this.contract_no
            }
            this.assetlist_(data).then((res)=>{
              if(res.success==200){
                this.list = res.data.list;
                this.total.count = res.data.total.count;
                this.total.buy_vm_count = res.data.total.buy_vm_count;
                this.total.renter_vm_count = res.data.total.renter_vm_count;
                this.total.surplus_count = res.data.total.surplus_count;
                this.operator_show=false;
              }
            })
          },
          editasset(id){
            this.$router.push({name:"addedit",query:{id:id}})
          },
          goPage(){
            this.$router.push({name:"addedit"})
          },
          //获取厂家信息
          getvendor(){
            this.getvendorlist_().then((res)=>{
              if(res.success==200){
                this.getVendorList(res.data);
              }
            })
          },
          //获取租赁方列表
          getrenter(){
            this.getrenterlist_().then((res)=>{
              if(res.success==200){
                this.getRenterList(res.data);
              }
            })
          },
          //省份
          getprinid(){
            this.devicepccid_({province_id:this.province_id,city_id:this.city_id}).then((res)=>{
              if(res.success==200){
                this.provincearr = res.data;
              }
            })
          },
          changeProvince(id){
            this.province_id = id;
            this.getcityid(id)
          },
          //市区
          getcityid(id){
            this.devicepccid_({province_id:id,city_id:""}).then((res)=>{
              if(res.success==200){
                this.cityarr = res.data;
                this.city_id = this.cityarr[0].id;
              }
            })
          },
          changeCity(id){
            this.city_id = id;
          },
        },

    }

</script>

<style scoped>


</style>
