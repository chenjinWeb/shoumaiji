<template>

  <div class="content-modal">
    <y-header title="工作日报" router="-1" r_title="历史日报" @sured="sured()"></y-header>
    <div class="content">
      <div class="scroll-content"  margin-header>

        <div class="store_data" style="margin-top: 0;">
          <div class="store_data_parent date_report">

            <div>
              销售额：<input type="text" v-model="sale_money"/>元
            </div>

            <div>
              销售量：<input type="text" v-model="sale_count"/>笔
            </div>

          </div>

          <div class="store_data_parent date_report">

            <div>
              补货数量：<input type="text" v-model="replenishment_count"/>瓶
            </div>

            <div>
              缺品类次数：<input type="text" v-model="lack_goods_count"/>次
            </div>

          </div>

        </div>

        <!--故障-->
        <div class="management">
          <ul class="creat_list">
            <li>
              <a class="central_list central_list_menu clear">
                <div class="list_lef fl flex">故障（{{errorData.length}}次）</div>
              </a>
            </li>
          </ul>

          <ul class="inventory_list creat_list_border salesdata_list" style="min-height: 0.8rem; margin-bottom: 0;">
            <li v-for="(eor,$index) in errorData">
              <a href="javascript:;" class="central_list flex">
                <div class="list_lef" style="width: 90%;">
                  <p class="time flex">
                    <span style="flex: 1;" class="overnone">{{eor.gname}}</span>
                    <span style="flex: 1" class="overnone">{{eor.content}}</span>
                  </p>
                  <p class="time flex">
                    <span style="flex: 1;" class="overnone">设备单号：{{eor.number}}</span>
                    <span style="flex: 1" class="overnone">{{eor.create_time}}</span>
                  </p>
                </div>
              </a>
            </li>
            <div class="noData" v-if="errorData.length==0">
              <i class="icon">&#xe6bb;</i>
              <p>暂无数据</p>
            </div>
          </ul>

        </div>

        <!--投诉-->
        <div class="sales_details stocks_details">
            <div class="sales_details_title flex">
              <span style="color: #333;border-left: none; padding-left: 0;">投诉：{{complaintInfo.length}}</span>
            </div>
            <div class="stocks_list add_border" v-for="(c,$index) in complaintInfo">
              <div style="font-size: 0.14rem; color: #7e7c7d; text-align: left;">
                <p style="margin-bottom: 0.1rem;">时间：
                  <em>{{c.create_time | dates}}</em>
                  <span style=" float: right;" class="bulecolr">{{c.state==0? '未解决' : '已解决'}}</span>
                </p>

                <p style="margin-bottom: 0.1rem;">订单号：
                  <em>{{c.order_number}}</em>
                </p>
                <p style="margin-bottom: 0.1rem;">投诉类型：
                  <em>{{c.type}}</em>
                </p>
                <p style="margin-bottom: 0.1rem;">解决方式：
                  <em>{{c.dispose}}</em>
                </p>
              </div>
            </div>
            <div class="noData" v-if="complaintInfo.length==0" style="top: 70%;">
              <i class="icon">&#xe6bb;</i>
              <p>暂无数据</p>
            </div>
          </div>

        <!--现金上交-->
        <div class="cash_commit">
          <div>
            现金上交：<input type="text" v-model="money"/>元
          </div>
        </div>

        <!--备注-->
        <div class="date_mark">
          <div>
            <span>备注：</span>
            <textarea v-model="remark"></textarea>
          </div>
        </div>

        <!--提交-->
        <div class="date_submit">
          <div @click="commitdata()">确认提交</div>
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

    import {MessageBox} from "mint-ui"

    import {isEmptyObject} from "../../utils"

    export default {
        name: "reportday",
        data() {
            return {
              sale_money:"",
              sale_count:"",
              replenishment_count:"",
              lack_goods_count:"",
              money:"",
              remark:"",
              complaintInfo:[],
              errorData:[]
            }
        },
        computed:{

        },
        methods: {
          ...mapActions([
            "userwork_",
            "commitreprot_"
          ]),
          //请求故障次数
          getdatereport(){
            this.userwork_().then((res)=>{
              if(res.success==200){
                this.complaintInfo = res.data.complaint_info;
                this.errorData=[];
                if(!isEmptyObject(res.data)) {
                  if(res.data.vm_error_info.length>0){
                    res.data.vm_error_info.forEach((item, index)=>{
                      if(index<10){
                        this.errorData.push(item)
                      }
                    })
                  }else{
                    this.errorData = res.data.vm_error_info;
                  }
                }
                this.sale_money = res.data.sale_money || 0;
                this.sale_count = res.data.sale_count || 0;
                this.replenishment_count = res.data.replenishment_count || 0;
                this.lack_goods_count = res.data.lack_goods_count || 0;
              }
            })
          },
          //跳到历史日报
          sured(){
            this.$router.push({name:"historyreport"})
          },
          //提交数据
          commitdata(){
            const data = {
              sale_money:this.sale_money,
              sale_count:this.sale_count,
              replenishment_count:this.replenishment_count,
              lack_goods_count:this.lack_goods_count,
              money:this.money,
              remark:this.remark
            }
            this.commitreprot_(data).then((res)=>{
              if(res.success==200){
                MessageBox.alert("提交成功！").then(action=>{
                  this.$router.go(-1)
                })
              }
            })
          }
        },
        mounted() {
          this.getdatereport();
        }
    }

</script>

<style scoped>


</style>
