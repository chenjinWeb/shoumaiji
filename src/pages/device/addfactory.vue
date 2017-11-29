<template>

  <div class="content-modal">
    <y-header title="添加厂家" router="-1"></y-header>
    <div class="content">
      <div class="scroll-content" margin-header>
        <ul class="basic_list">
          <li>
            <div class="central_list clear">
              <div class="list_lef fl">厂家名称</div>
              <div class="list_rig fr">
                <input type="text" placeholder="请输厂家名称" class="txt" v-model="name">
              </div>
            </div>
          </li>
          <li>
            <div class="central_list clear">
              <label class="forms">
                <div class="list_lef fl">省份</div>
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
                <div class="list_lef fl">城市</div>
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
              <div class="list_lef fl">详细地址</div>
              <div class="list_rig fr">
                <input type="text" placeholder="请输详细地址" class="txt" v-model="detail_address">
              </div>
            </div>
          </li>
        </ul>
        <div class="foot_menu flex">
          <a href="javascript:;" class="cancel_but" @click="reset()">重置</a>
          <a href="javascript:;" class="confirm_but boxflex" @click="sureadd()">确认</a>
        </div>
      </div>

    </div>

  </div>

</template>

<script>

  import {mapState,mapActions,mapMutations} from "vuex"

  import {MessageBox} from "mint-ui"

  export default {
    name: "addfactory",
    data() {
      return {
        name:"",
        detail_address:"",
        provincearr:[],
        province_id:"",
        cityarr:[],
        city_id:""
      }
    },
    computed: {
      ...mapState({
        "vendorlist":state=>state.vendorlist
      })
    },
    methods: {
      ...mapActions([
        "devicepccid_",
        "addvendordata_"
      ]),
      ...mapMutations([
        "addVendorList"
      ]),
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
      //确认提交
      sureadd(){
        if(this.name==""){
          MessageBox.alert("请输入厂家名称");
          return
        }
        if(this.province_id==""){
          MessageBox.alert("请选择省份");
          return
        }
        if(this.city_id==""){
          MessageBox.alert("请选择城市");
          return
        }
        if(this.detail_address==""){
          MessageBox.alert("请输入详细地址");
          return
        }
        const data = {
          name:this.name,
          province_id:this.province_id,
          city_id:this.city_id,
          detail_address:this.detail_address
        }
        this.addvendordata_(data).then((res)=>{
          if(res.success==200){
            this.addVendorList(res.data);
            this.$router.go(-1);
          }
        })
      },
      reset(){
        this.name="";
        this.province_id="";
        this.city_id="";
        this.detail_address="";
      }
    },
    mounted() {
      this.getprinid();
    }
  }

</script>

<style scoped>

  .basic_list li .central_list .list_rig{ text-align: left;}

</style>
