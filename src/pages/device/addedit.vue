<template>

  <div class="content-modal">
    <y-header :title="title" r_title="保存" @sured="sured()" router="-1"></y-header>
    <div class="content">
      <div class="scroll-content" margin-header>
        <ul class="basic_list">

          <li>
            <div class="central_list clear">
              <div class="list_lef fl">合同类型</div>
              <div class="list_rig fr">
                <template>
                  <el-select v-model="type_id" placeholder="请选择合同类型" style="width: 70%;" @change="changestype(type_id)">
                    <el-option
                      v-for="item in contractType"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </template>
              </div>
            </div>
          </li>

          <li>
            <div class="central_list clear">
              <div class="list_lef fl">合同编号</div>
              <div class="list_rig fr">
                <input type="text" placeholder="请输入合同编号" class="txt" v-model="contract_no">
              </div>
            </div>
          </li>
          <li>
            <div class="central_list clear">
              <div class="list_lef fl">机器数量</div>
              <div class="list_rig fr">
                <input type="text" placeholder="请输入机器数量" class="txt" v-model="vm_count">
              </div>
            </div>
          </li>
          <li v-if="type_id==1">
            <div class="central_list clear">
              <div class="list_lef fl">机器金额</div>
              <div class="list_rig fr">
                <input type="text" placeholder="请输入机器金额" class="txt" v-model="money">
              </div>
            </div>
          </li>
          <li v-if="type_id==2">
            <div class="central_list clear">
              <div class="list_lef fl">租赁金额</div>
              <div class="list_rig fr">
                <input type="text" placeholder="请输入租赁金额" class="txt" v-model="renter_money">
              </div>
            </div>
          </li>
          <li>
            <div class="central_list clear">
              <div class="list_lef fl">出厂厂家</div>
              <div class="list_rig fr">
                <template>
                  <el-select v-model="vendor_id" placeholder="请选择" style="width: 70%;" @change="changestore(vendor_id)">
                    <el-option
                      v-for="item in vendorlist"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </template>
              </div>
              <div class="list_rig rig_du fr" style=" left:80%;" v-if="type_id==1">
                <a href="javascript:;" class="btn" style="width: 0.6rem;" @click="gopage()">添加</a>
              </div>
            </div>
          </li>
          <li v-if="type_id==2">
            <div class="central_list clear">
              <div class="list_lef fl">租赁方</div>
              <div class="list_rig fr">
                <template>
                  <el-select v-model="renter_id" placeholder="请选择" style="width: 70%;" @change="changerenter(renter_id)">
                    <el-option
                      v-for="item in renterlist"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </template>
              </div>
              <div class="list_rig rig_du fr" style=" left:80%;">
                <a href="javascript:;" class="btn" style="width: 0.6rem;" @click="gorenter()">添加</a>
              </div>
            </div>
          </li>

          <li>
            <div class="central_list handily_list traff_list clear">
              <div class="list_lef fl">备注说明</div>
              <div class="list_rig fr">
                <textarea name="" id="" rows="2" placeholder="请填写备注" v-model="remark"></textarea>
              </div>
            </div>
          </li>
        </ul>
      </div>

    </div>

    <transition name="custom-classes-transition" enter-active-class="animated nav-open" leave-active-class="animated nav-close">
      <router-view></router-view>
    </transition>


  </div>

</template>

<script>

    import {mapState,mapActions,mapMutations} from "vuex"

    import {MessageBox} from "mint-ui"

    export default {
        name: "addedit",
        data() {
            return {
              id:this.$route.query.id,
              title:this.$route.query.id? "编辑" : "新增",
              contract_no:"",
              vm_count:"",
              money:"",
              renter_money:"",
              vendor_id:"",
              renter_id:"",
              remark:"",
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
              type_id:1
            }
        },
        computed: {
          ...mapState({
            "vendorlist":state=>state.vendorlist,
            "renterlist":state=>state.renterlist
          })
        },
        methods: {
          ...mapActions([
            "getvendorlist_",
            "addeditasset_",
            "initassetinfo_",
            "getrenterlist_"
          ]),
          ...mapMutations([
            "getVendorList",
            "getRenterList"
          ]),
          //如果是编辑的话，初始化
          initData(){
            this.initassetinfo_({id:this.id}).then((res)=>{
              if(res.success==200){
                this.type_id = res.data.type;
                this.contract_no = res.data.contractNo;
                this.remark = res.data.remark;
                this.money = res.data.money;
                this.renter_money = res.data.money;
                this.vendor_id = res.data.vendorId;
                this.renter_id = res.data.renterId;
                this.vm_count = res.data.vmCount;
              }
            })
          },
          //添加跳转出厂厂家
          gopage(){
            this.$router.push({name:"addfactory"})
          },
          //添加跳转租赁方
          gorenter(){
            this.$router.push({name:"addrenter"})
          },
          //保存
          sured(){
            if(this.contract_no==""){
              MessageBox.alert("请输入合同编号!");
              return
            }
            if(this.vm_count==""){
              MessageBox.alert("请输入机器数量!");
              return
            }
            if(this.money=="" && this.type_id==1){
              MessageBox.alert("请输入机器金额!");
              return
            }
            if(this.vendor_id==""){
              MessageBox.alert("请选择出厂厂家!");
              return
            }

            if(this.renter_money=="" && this.type_id==2){
              MessageBox.alert("请输入租赁金额!");
              return
            }

            if(this.renter_id=="" && this.type_id==2){
              MessageBox.alert("请选择租赁方!");
              return
            }

            if(this.type_id==1){
              var data={
                type:this.type_id,
                id:this.id? this.id : 0,
                contract_no:this.contract_no,
                vm_count:this.vm_count*1,
                money:this.money,
                vendor_id:this.vendor_id,
                remark:this.remark
              }
            }else if(this.type_id==2){
              var data={
                type:this.type_id,
                id:this.id? this.id : 0,
                contract_no:this.contract_no,
                vm_count:this.vm_count*1,
                money:this.renter_money,
                vendor_id:this.vendor_id,
                renter_id:this.renter_id,
                remark:this.remark
              }
            }

            this.addeditasset_(data).then((res)=>{
              if(res.success==200){
                if(this.id){
                  MessageBox.alert("修改成功！").then(action=>{
                    this.$router.go(-1);
                  })
                }else{
                  MessageBox.alert("保存成功！").then(action=>{
                    this.$router.go(-1);
                  })
                }
              }
            })
          },
          //获取厂家列表
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

          //下拉选择出厂厂家
          changestore(value){
            this.vendor_id = value;
          },
          //下拉选择租赁方
          changerenter(value){
            this.renter_id = value;
          },
          //合同类型
          changestype(value){
            this.type_id = value;
          }
        },
        mounted() {
          this.getvendor();
          this.getrenter();
          if(this.id){
            this.initData();
          }
        }
    }

</script>

<style scoped>

  .basic_list li .central_list .list_rig{ text-align: left;}

</style>
