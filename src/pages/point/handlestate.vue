<template>

  <div class="content-modal">
    <y-header title="审批" router="-1"></y-header>
    <div class="content">
      <div class="scroll-content" margin-header>
        <ul class="basic_list">
          <li>
            <div class="central_list clear">
              <div class="list_lef fl">通过情况</div>
              <div class="list_rig fr flex rig_du">
                <label>
                  <span class="mint-radio">
                    <input type="radio" class="mint-radio-input" value="1" v-model="state">
                    <span class="mint-radio-core"></span>
                    <span class="mint-radio-label">同意</span>
                  </span>

                </label>
                <label>
                  <span class="mint-radio">
                    <input type="radio" class="mint-radio-input" value="2" v-model="state">
                    <span class="mint-radio-core"></span>
                    <span class="mint-radio-label">拒绝</span>
                  </span>

                </label>
              </div>
            </div>
          </li>
          <li v-if="state==2">
            <div class="central_list clear">
              <div class="list_lef fl">拒绝原因</div>
              <div class="list_rig fr">
                <input type="text" placeholder="请填写拒绝原因" class="txt" v-model="reason">
              </div>
            </div>
          </li>
          <li v-if="state==1">
            <div class="central_list clear">
              <div class="list_lef fl">机器数量</div>
              <div class="list_rig fr">
                <input type="text" placeholder="请填写机器数量" class="txt" v-model="vm_count" disabled>
              </div>
            </div>
          </li>
          <li v-if="state == 1">
            <div class="central_list clear">
              <div class="list_lef fl">分组名称</div>
              <div class="search_input select_area temp_div">
                <el-select v-model="group_id" placeholder="请选择" @change="changegroup(group_id)">
                  <el-option
                    v-for="item in groupList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>
          </li>
          <li v-if="state == 1">
            <div class="central_list clear">
              <div class="list_lef fl">机库</div>
              <div class="search_input select_area temp_div">
                <el-select v-model="vendor_id" placeholder="请选择" @change="changegroup(vendor_id)">
                  <el-option
                    v-for="item in vendorlist"
                    :key="item.id"
                    :label="item.name+'（库存：'+item.vm_count+'）'"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>
          </li>
          <li v-if="state == 1">
            <div class="central_list clear">
              <div class="list_lef fl">指派实施</div>
              <div class="search_input select_area temp_div">
                <el-select v-model="build_id" placeholder="请选择" @change="changegroup(build_id)">
                  <el-option
                    v-for="item in builduserList"
                    :key="item.id"
                    :label="item.userName"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>
          </li>
          <li v-if="state == 1">
            <div class="central_list clear">
              <div class="list_lef fl">指派补货</div>
              <div class="search_input select_area temp_div">
                <el-select v-model="replen_id" placeholder="请选择" @change="changegroup(replen_id)">
                  <el-option
                    v-for="item in replenishmentUserList"
                    :key="item.id"
                    :label="item.userName"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>
          </li>
          <li v-if="state==1">
            <div class="central_list clear">
              <div class="list_lef fl">施工说明</div>
              <div class="list_rig fr">
                <input type="text" placeholder="请输入实施人员提取机器的具体地址及其他说明，最多可输入100个字" class="txt" v-model="description">
              </div>
            </div>
          </li>
        </ul>
        <div class="form_btn">
          <a href="javascript:;" class="btn" @click="commitdata()">确定</a>
          <a href="javascript:;" class="cancel_btn" @click="$router.go(-1)">取消</a>
        </div>
      </div>
    </div>


  </div>

</template>

<script>

  import Vue from "vue"

  import { InfiniteScroll,Toast,Indicator,Radio,MessageBox  } from 'mint-ui';

  Vue.component(Radio.name, Radio);

  import {mapState,mapActions,mapMutations} from "vuex"

  import compressImg from "../../compress-img";

  Vue.use(InfiniteScroll)

  export default {
    name:"handlestate",
    data(){
      return {
        location_state_id:this.$route.query.state.split(","),
        state:1,
        vm_count:"",
        groupList:[],
        group_id:"",
        vendor_id:"",
        builduserList:[],
        build_id:"",
        replenishmentUserList:[],
        replen_id:"",
        reason:"",
        description:""
      }
    },
    mounted(){
      this.handlestate_(this.location_state_id).then((res)=>{
        if(res.success==200){
          this.getVendorList(res.extrasInfo.vendorList);
          this.vm_count=res.data;
          this.groupList = res.extrasInfo.groupList;
          this.builduserList = res.extrasInfo.builduserList;
          this.replenishmentUserList = res.extrasInfo.replenishmentUserList;
        }
      })
    },
    computed:{
      ...mapState({
        "vendorlist":state=>state.vendorlist
      })
    },
    methods:{
      ...mapActions([
        "handlestate_",
        "commitdata_",
        "getvendorlist_"
      ]),
      ...mapMutations([
        "getVendorList"
      ]),
      changepeople(value){
        console.info(value)
      },
      changegroup(data){
        console.info(data)
      },
      commitdata(){
        let data = {
          loaction_ids:this.location_state_id.join(","),
          state:this.state*1,
        }
        //验证
        if(this.vm_count==0 && this.state==1){
          MessageBox.alert("机器数量不能为0");
          return
        }

        if(this.group_id=="" && this.state==1){
          MessageBox.alert("分组名称不能为空!")
          return
        }

        if(this.vendor_id=="" && this.state==1){
          MessageBox.alert("机库不能为空!")
          return
        }

        if(this.build_id=="" && this.state==1){
          MessageBox.alert("指派实施不能为空!")
          return
        }

        if(this.replen_id=="" && this.state==1){
          MessageBox.alert("指派补货不能为空!")
          return
        }

        if(this.reason=="" && this.state==2){
          MessageBox.alert("拒绝原因不能为空!")
          return
        }

        if(this.description=="" && this.state==1){
          MessageBox.alert("施工说明不能为空!")
          return
        }

        if(this.state==1){
          data.vm_count = this.vm_count*1;
          data.group_id = this.group_id*1;
          data.vendor_id = this.vendor_id*1;
          data.builder_user_id = this.build_id*1;
          data.replenishment_user_id = this.replen_id*1;
          data.description = this.description;
        }else{
          //如果是拒绝的时候，提交原因
          data.reason = this.reason;
        }
        this.commitdata_(data).then((res)=>{
          if(res.success==200){
            MessageBox.alert("处理成功!").then(action=>{
              this.$router.go(-1)
            })
          }
        })
      }
    }
  }

</script>

<style>
  .el-select-dropdown__item{ text-align: left;}
  .picker-slot-wrapper .picker-item{ top: 1px;}
  .mint-radio-input:checked + .mint-radio-core {
    background-color: #fcfcfc;
    border-color: #cfcfcf;
  }
  .mint-radio-input:checked + .mint-radio-core::after {
    background-color: #2d72ff;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  .mint-radio-label{
    margin-right:0.4rem;
  }
  .mint-radio-core {
    width:0.18rem;
    height:0.18rem;
  }
  .mint-radio-core::after {
    top:0.035rem;
    left:0.035rem;
    position: absolute;
    width:0.09rem;
    height:0.09rem;
    border-radius: 100%;
  }
  .mint-radio-input:checked + .mint-radio-core + .mint-radio-label{
    color:#333333;
  }

</style>
