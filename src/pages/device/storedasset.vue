<template>

  <div class="content-modal">
    <y-header :title="title" router="-1"></y-header>
    <div class="content">
      <div class="scroll-content"  style="margin-top:0.45rem;">
        <div class="outtinvent">

          <div>
            <div style="text-align: right; padding: 0.15rem;">
              <template>
                <el-select v-model="value" placeholder="请选择" style="width: 50%;" @change="changestore(value)">
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </template>
            </div>
          </div>

          <ul class="inventory_list" style="background: none;">
            <template v-for="l in deviceList">
              <li class="asset_li" style="border-top: none; background: #fff; margin-bottom: 0.1rem;" @click="goPage(l.vendor_id)">
                <p>MAC地址:{{l.mac || '--'}}</p>
                <p>设备编号：{{l.number || '--'}}</p>
                <p>存放地址：{{l.store_address || '--'}}</p>
                <p>落点地址：{{l.detail_address || '--'}}</p>
                <p>审核时间：{{l.check_time || '--'}}</p>
                <p>施工完成：{{l.build_end_time || '--'}}</p>
              </li>
            </template>
          </ul>
          <div class="noData" v-if="deviceList.length==0">
            <i class="icon">&#xe6bb;</i>
            <p>暂无数据</p>
          </div>

        </div>
      </div>
    </div>
  </div>



</template>

<script>

  import {mapActions} from "vuex"

  export default {
    name: "storedasset",
    data() {
      return {
        value:0,
        options:[
          {
            name:"全部",
            id:0
          },
          {
            name:"已实施",
            id:1
          },
          {
            name:"未实施",
            id:2
          }
        ],
        title:this.$route.query.name,
        deviceList:[],
        group_Id:this.$route.query.id
      }
    },
    computed: {},
    methods: {
      ...mapActions([
        "assetvmdetail_"
      ]),
      getData(state){
        this.assetvmdetail_({type:2,group_Id:this.group_Id,state:state}).then((res)=>{
          if(res.success==200){
            this.deviceList = res.data;
          }
        })
      },
      changestore(value){
        this.getData(value)
      }
    },
    mounted() {
      this.getData(this.value);
    }
  }

</script>

<style scoped>


</style>
