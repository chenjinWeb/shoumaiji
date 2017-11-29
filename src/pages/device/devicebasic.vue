<template>

  <div class="content-modal">
    <y-header :title="query.title" router="-1" r_title="保存" @r_callback="save()"></y-header>
    <div class="content">
      <div class="scroll-content" margin-header>
        <div class="management">
          <p class="tit"><span>基本信息</span></p>
          <ul class="basic_list">

            <li>
              <div class="central_list clear">
                <div class="list_lef fl">Mac地址</div>
                <div class="list_rig fr">
                  <input type="text" class="txt" readonly v-model="deviceData.mac">
                </div>
              </div>
            </li>

            <li>
              <div class="central_list clear">
                <div class="list_lef fl">所属区域</div>
                <div class="list_rig fr">
                  <input type="text" class="txt" readonly v-model="deviceData.number_prefix_name">
                </div>
              </div>
            </li>

            <li>
              <div class="central_list clear">
                <label class="forms">
                  <div class="list_lef fl">所属组</div>
                  <div class="list_rig fr">
                    <div class="search_input select_area">
                      <el-select v-model="vmGroup" placeholder="请选择" @change="changeValue(vmGroup,'vmGroup')">
                        <el-option
                          v-for="j in vmGroupList"
                          :key="j.vending_machine_group_id"
                          :label="j.name"
                          :value="j.vending_machine_group_id">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                </label>
              </div>
            </li>

            <li>
              <div class="central_list clear">
                <div class="list_lef fl">机器编号</div>
                <div class="list_rig fr">
                  <input type="text" placeholder="请填写编号" class="txt" v-model="deviceData.number" readonly>
                </div>
              </div>
            </li>

            <li>
              <div class="central_list clear">
                <div class="list_lef fl">别名</div>
                <div class="list_rig fr">
                  <input type="text" placeholder="请填写别名" class="txt" v-model="deviceData.another">
                </div>
              </div>
            </li>

            <li>
              <div class="central_list clear">
                <label class="forms">
                  <div class="list_lef fl">省</div>
                  <div class="list_rig fr">
                    <div class="search_input select_area">
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

            <li>
              <div class="central_list clear">
                <label class="forms">
                  <div class="list_lef fl">市</div>
                  <div class="list_rig fr">
                    <div class="search_input select_area">
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
                <label class="forms">
                  <div class="list_lef fl">区县</div>
                  <div class="list_rig fr">
                    <div class="search_input select_area">
                      <el-select v-model="county_id" placeholder="请选择" @change="changeCount(county_id)">
                        <el-option
                          v-for="c in countyarr"
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
                <div class="list_lef fl">详细地址</div>
                <div class="list_rig fr">
                  <input type="text" placeholder="请填写详细地址" class="txt" v-model="deviceData.detail_address">
                </div>
              </div>
            </li>

            <li>
              <div class="central_list clear">
                <label class="forms">
                  <div class="list_lef fl">运营商</div>
                  <div class="list_rig fr">
                    <div class="search_input select_area">
                      <el-select v-model="fourth_user_id" placeholder="请选择运营商">
                        <el-option
                          v-for="item in companyarr"
                          :key="item.id"
                          :label="item.user_name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                </label>
              </div>
            </li>

            <li>
              <div class="central_list clear">
                <label class="forms">
                  <div class="list_lef fl">分公司</div>
                  <div class="list_rig fr">
                    <div class="search_input select_area">
                      <el-select v-model="fifth_user_id" placeholder="请选择分公司">
                        <el-option
                          v-for="item in companyinfo"
                          :key="item.id"
                          :label="item.user_name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                </label>
              </div>
            </li>

            <li>
              <div class="central_list clear">
                <label class="forms">
                  <div class="list_lef fl">设备类型</div>
                  <div class="list_rig fr">
                    <div class="search_input select_area">
                      <el-select v-model="vmtype" placeholder="请选择" @change="changeValue(vmtype,'vmtype')">
                        <el-option
                          v-for="item in vmTypeList"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                </label>
              </div>
            </li>

            <li>
              <div class="central_list clear">
                <label class="forms">
                  <div class="list_lef fl">设备模板</div>
                  <div class="list_rig fr">
                    <div class="search_input select_area">

                      <el-select v-model="vmTemp" filterable placeholder="请选择" @change="changeValue(vmTemp,'vmTemp')">
                        <el-option
                          v-for="i in vmTempList"
                          :key="i.id"
                          :label="i.name"
                          :value="i.id">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                </label>
              </div>
            </li>

            <li class="double_line">
              <div class="flex">
                <div class="left">经纬度</div>
                <div class="right"><p>{{devicelo}}，{{devicela}}</p>
                  <p><router-link :to="{name:'devicelong'}" class="btn" style="color: #fff;">重新选择</router-link></p></div>
              </div>
            </li>

            <li>
              <div class="central_list  explain_list traff_list clear">
                <div class="list_lef fl">备注说明</div>
                <div class="list_rig fr">
                  <textarea name="" id="" rows="2" placeholder="请填写备注" v-model="deviceData.remark"></textarea>
                </div>
              </div>
            </li>

          </ul>

        </div>

        <div class="management">
          <p class="tit"><span>开关机时间</span></p>
          <ul class="basic_list">
            <li>
              <div class="central_list clear">
                <label class="forms">
                  <div class="list_lef fl">开机时间</div>
                  <div class="list_rig fr">
                    <div class="search_input select_area">
                      <el-time-picker v-model="deviceData.shutdown_time" placeholder="任意时间点" :picker-options="{format:'HH:mm:ss'}" disabled></el-time-picker>
                    </div>
                  </div>
                </label>
              </div>
            </li>
            <li>
              <div class="central_list clear">
                <label class="forms">
                  <div class="list_lef fl">关机时间</div>
                  <div class="list_rig fr">
                    <div class="search_input select_area">
                      <el-time-picker v-model="deviceData.starting_time" placeholder="任意时间点" :picker-options="{format:'HH:mm:ss'}" disabled></el-time-picker>
                    </div>
                  </div>
                </label>
              </div>
            </li>
          </ul>
        </div>

      </div>
    </div>
    <transition name="custom-classes-transition" enter-active-class="animated nav-open" leave-active-class="animated nav-close">
      <router-view></router-view>
    </transition>
  </div>

</template>

<script>

  import {mapState,mapActions,mapMutations} from "vuex"

  import Vue from 'vue'

  import {MessageBox} from "mint-ui"


  export default {
    name: "devicebasic",
    data() {
      return {
        deviceData: {
          starting_time: new Date(),
          shutdown_time: new Date(),
        },
        query: this.$route.query,
        vmtype: "",
        vmTypeList: [],
        vmTemp: "",
        vmTempList: [],
        vmGroup: "",
        vmGroupList: [],
        updateInfos: {},
        starting_time: "",
        shutdown_time: "",
        province_id:"",
        provincearr:[],
        city_id:"",
        cityarr:[],
        county_id:"",
        countyarr:[],
        companyarr:[], //运营商
        fourth_user_id:"",
        companyinfo:[],  //分公司
        fifth_user_id:"",
      }

    },
    computed:{
      ...mapState({
        devicelo:state=>state.devicelo,
        devicela:state=>state.devicela
      })
    },
    mounted() {
      this.getData();
      this.getvmType();
      this.getvmTemp();
      this.getvmGroup();
      this.companytype(0);
      this.companytypes(1);
      this.getprinid();
    },
    methods: {
      ...mapActions([
        "deviceInfos_",
        "vmType_",
        "vmTemp_",
        "vmGroup_",
        "updateInfo_",
        "devicepccid_",
        "getcompany_"
      ]),
      ...mapMutations([
        "setDevicePoint"
      ]),
      changeValue(data, key) {
        this[key] = data;
      },
      //省份
      getprinid(){
        this.devicepccid_({province_id:this.province_id,city_id:this.city_id}).then((res)=>{
          if(res.success==200){
            this.provincearr = res.data;
            if(this.city_id){
              this.getcityid(this.province_id)
            }
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
            this.city_id = (this.deviceData.city_id && this.province_id == this.deviceData.province_id)? this.deviceData.city_id : this.cityarr[0].id;
            if(this.county_id){
              this.getcountid(this.city_id)
            }
          }
        })
      },
      changeCity(id){
        this.city_id = id;
        this.getcountid(id);
      },
      //街道
      getcountid(id){
        this.devicepccid_({province_id:"",city_id:id}).then((res)=>{
          if(res.success==200){
            this.countyarr = res.data;
            this.county_id = (this.deviceData.county_id && this.city_id == this.deviceData.city_id)? this.deviceData.county_id : this.countyarr[0].id;
          }
        })
      },

      changeCount(id){
        this.county_id = id;
      },

      getData() {
        this.deviceInfos_(this.query).then(res => {
          if (res.success == 200) {
            var d = new Date();
            this.deviceData = res.data;
            this.setDevicePoint(this.deviceData);
            if (res.data.starting_time) {
              res.data.starting_time = new Date(d.getFullYear(), d.getMonth() + 1, d.getDay(), this.deviceData.starting_time.split(":")[0], this.deviceData.starting_time.split(":")[1], this.deviceData.starting_time.split(":")[2]);
            }
            if (res.data.shutdown_time) {
              res.data.shutdown_time = new Date(d.getFullYear(), d.getMonth() + 1, d.getDay(), this.deviceData.shutdown_time.split(":")[0], this.deviceData.shutdown_time.split(":")[1], this.deviceData.shutdown_time.split(":")[2]);
            }
            if(this.deviceData.province_id){
              this.province_id = this.deviceData.province_id;
            }
            this.county_id = this.deviceData.county_id? this.deviceData.county_id : "";
            if(this.deviceData.city_id){
              this.city_id = this.deviceData.city_id;
            }
            this.fifth_user_id = this.deviceData.fifth_user_id? this.deviceData.fifth_user_id : "";
            this.fourth_user_id = this.deviceData.fourth_user_id? this.deviceData.fourth_user_id : "";
            this.vmtype = this.deviceData.vending_machine_type_id? this.deviceData.vending_machine_type_id : '';
            this.vmGroup = this.deviceData.vending_machine_group_id*1? this.deviceData.vending_machine_group_id*1 : '';
            this.vmTemp = this.deviceData.vending_machine_template_aisle_id? this.deviceData.vending_machine_template_aisle_id : "";
          }
        })
      },

      getvmType() {
        this.vmType_(this.query).then(res => {
          if (res.success == 200) {
            this.vmTypeList = res.data;
          }
        })
      },
      getvmTemp() {
        this.vmTemp_(this.query).then(res => {
          if (res.success == 200) {
            // console.info(res);
            this.vmTempList = res.data;
          }
        })
      },
      getvmGroup() {
        this.vmGroup_(this.query).then(res => {
          if (res.success == 200) {
            // console.info(res);
            this.vmGroupList = res.data;
          }
        })
      },
      //公司分类运营商
      companytype(type){
        this.getcompany_({type:type}).then((res)=>{
          if(res.success==200){
            this.companyarr = res.data;
          }
        })
      },
      //公司分类分公司
      companytypes(type){
        this.getcompany_({type:type}).then((res)=>{
          if(res.success==200){
            this.companyinfo = res.data;
          }
        })
      },
      save() {
        const json = {
          vending_machine_group_id: this.vmGroup,
          another: this.deviceData.another,
          detail_address: this.deviceData.detail_address,
          vending_machine_type_id: this.vmtype,
          vending_machine_template_aisle_id: this.vmTemp,
          gps_lng: this.devicelo,
          gps_lat: this.devicela,
          province_id:this.province_id,
          city_id:this.city_id,
          county_id:this.county_id,
          remark: this.deviceData.remark,
          fifth_user_id: this.fifth_user_id	,
          fourth_user_id: this.fourth_user_id,
          times: this.deviceData.starting_time?  Date.format(this.deviceData.starting_time,'HH:mm:ss') : "",
          timee: this.deviceData.shutdown_time?  Date.format(this.deviceData.shutdown_time,'HH:mm:ss') : ""
        }
        this.updateInfo_({vmId:this.query.vmId,json:json}).then(res => {
          if (res.success == 200) {
            MessageBox.alert("更新成功!").then(action=>{
              this.$router.go(-1);
            })
          }
        })
      }
    }
  }

</script>

<style scoped>
  .el-select-dropdown__item {
    text-align: left;
  }

</style>
