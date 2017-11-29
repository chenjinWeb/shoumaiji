<template>
  <div class="tab-content">

    <y-header title="售货机后台系统" isgo="true" r_icon="&#xe60b;" @go="goto()"></y-header>

    <div class="content" margin-header>
      <y-select-date @select="selectDate($event)" :futureDate="true" :time="timedur" :col='col'></y-select-date>
      <div class="scroll-content" style="margin-top: 0.37rem;" margin-tabbar ref="indexScroll">
        <mt-loadmore ref="loadmore" :bottomPullText="loadmore.bottomPullText" :autoFill="false" :top-method="loadTop" :bottom-method="loadBottom">
          <!--销售额数据展现-->
          <div class="main">
            <div class="sales_volume" @click="goPage('salesdatadetail')">
                <h1>￥{{homeData.saleroom || 0 | thoundnum}}
                  <div style="display: inline-block; line-height: 0.14rem;">
                    <span v-if="timedur.times === timedur.timee" style="display: block;">销售额</span>
                    <span v-if="timedur.times === timedur.timee">{{homeData.moneyrate || '0%'}}</span>
                  </div>
                </h1>
            </div>
            <ul class="items clear">
              <li>
                  <p class="title">饮料销售额</p>
                  <h2>{{homeData.drinksSaleroom || 0 | thoundnum}}
                    <span v-if="timedur.times === timedur.timee">{{homeData.drinksMoneyRate || '0%'}}</span>
                  </h2>
              </li>
              <li>
                  <p class="title">饮料销售量</p>
                  <h2>{{homeData.drinksSalenum || 0 | thoundnum}}
                    <span v-if="timedur.times === timedur.timee">{{homeData.drinksNumRate || '0%'}}</span>
                  </h2>
              </li>
              <li>
                  <p class="title">食品销售额</p>
                  <h2>{{homeData.foodsSaleroom || 0 | thoundnum}}
                    <span v-if="timedur.times === timedur.timee">{{homeData.foodsMoneyRate || '0%'}}</span>
                  </h2>
              </li>
              <li>
                  <p class="title">食品销售量</p>
                  <h2>{{homeData.foodsSalenum || 0 | thoundnum}}
                    <span v-if="timedur.times === timedur.timee">{{homeData.foodsNumRate || '0%'}}</span>
                  </h2>
              </li>
              <li @click="gofinancial()" v-if="userLevel == 1 || userLevel ==4">
                <p class="title">累计盈亏</p>
                <h2>{{homeData.totalMoney || 0 | thoundnum}}</h2>
              </li>
              <li v-if="userLevel == 1 || userLevel ==4">
                <p class="title">商品存货</p>
                <h2>{{homeData.totalCount || 0 | thoundnum}}</h2>
              </li>
            </ul>
          </div>

          <!--echarts图形-->
          <div class="chart_content">
            <div class="echart_btn">
              <a href="javascript:;" :class="{'active':order_type == 1}" @click="order_type=1">
                <i class="icon">&#xe63a;</i>
                销售额
              </a>
              <a href="javascript:;" :class="{'active':order_type == 2}" @click="order_type=2">
                <i class="icon">&#xe64a;</i>
                销售量
              </a>
            </div>
            <div id="echartsDiv"></div>
          </div>

          <!--设备信息-->
          <div class="sales_details stocks_details">
            <div class="sales_details_title flex">
              <span>设备信息</span>
              <em class="bulecolr" style=" position: absolute; right: 1.6rem; font-size: 0.13rem;" @click="goPage('workreport')">工作日报</em>
              <em class="bulecolr" style=" position: absolute; right: 0.8rem; font-size: 0.13rem;" @click="signIn()">补货记录</em>
              <em class="bulecolr" style=" position: absolute; right: 0; font-size: 0.13rem;" @click="errorIn()">异常统计</em>
            </div>
            <div class="stocks_list flex">
              <div class="sales_item">
                <p class="title">设备总数</p>
                <div class="amount flex">
                  <router-link :to="{name:'devicetotal',query:{type:1}}" class="item">
                    {{vmdata.VmCount || 0}}
                  </router-link>
                </div>
              </div>
              <div class="sales_item">
                <p class="title">格子柜数</p>
                <div class="amount flex">
                  <router-link :to="{name:'devicegrid',query:{type:1}}" class="item">
                    {{vmdata.VmGridCount || 0}}
                  </router-link>
                </div>
              </div>
              <div  class="sales_item">
                <p class="title">在线设备</p>
                <div class="amount flex">
                  <router-link :to="{name:'devicetotal',query:{type:2}}" class="item">
                    {{vmdata.VmIs_on_lineCount || 0}}
                  </router-link>
                </div>
              </div>
              <div class="sales_item">
                <p class="title">缺货设备</p>
                <div class="amount flex">
                  <router-link :to="{name:'outofstock'}" class="item">
                    {{vmdata.VmOffCount || 0}}
                  </router-link>
                </div>
              </div>
              <div class="sales_item">
                <p class="title">故障设备</p>
                <div class="amount flex">
                  <router-link :to="{name:'deviceerror'}" class="item">
                    {{vmdata.VmErrCount || 0}}
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <div class="sequencing">
            <div class="title flex">
              <span>运营人员缺品统计</span>
              <p>
                <a href="javascript:;" @click="reverseArrLack()">
                  <img src="../../assets/img/zhuanh.png" alt="">
                </a>
              </p>
            </div>
            <ul class="inventory_list salesdata_list" style="margin-bottom: 0;">
              <li v-for="l in lackRank" @click="getlackdata(l.id,l.name)">
                <a href="javascript:;" class="central_list flex">
                  <div class="list_lef" style="width: 60%; ">
                    <p><span style="font-size: 0.14rem;">{{l.name}}(补货{{l.replenishmentCount}}次/{{l.vmCount}}台)</span></p>
                    <p class="time">销售额：{{l.sellMoneyCount || 0 | thoundnum}}</p>
                  </div>
                  <div class="list_lef" style="width: 30%; left: 63%;">
                    <p class="time">缺品类：{{l.count}}次</p>
                    <p class="time">销售量：{{l.sellNumberCount || 0 | thoundnum}}</p>
                  </div>
                  <div class="list_rig err_rig" style="width: 17%;">
                    <p class="fr line_state">
                    <span class="empty_path">
                      <i class="icon">&#xe600;</i>
                    </span>
                    </p>
                  </div>
                </a>
              </li>
            </ul>
            <div class="check_more" @click="getmorelack()" v-if="(lackRank.length)%10 ==0 && lackRank.length>0">加载更多</div>
            <div class="check_more" v-if="lackRank.length==0">暂无数据</div>
          </div>

          <!--分公司销售排行-->
          <div class="sequencing">
            <div class="title flex">
              <span>区域销售排行</span>
              <p>
                <a href="javascript:;" @click="reverseArrCompany()">
                  <img src="../../assets/img/zhuanh.png" alt="">
                </a>
                <a href="javascript:;" :class="{'active':company_order_type == 1}" @click="changeCompanyType(1)">
                  <i class="icon">&#xe63a;</i>
                  销售额
                </a>
                <a href="javascript:;" :class="{'active':company_order_type == 2}" @click="changeCompanyType(2)">
                  <i class="icon">&#xe64a;</i>
                  销售量
                </a>
              </p>
            </div>
            <ul class="list" v-if="company_order_type==1">
              <li class="flex" v-for="(n,$index) in companySaleLists" @click="getcompanydata(n.id,n.name)">
                <em :class="{ 'on': $index == 0}">{{$index<9? "0"+($index+1) : $index+1}}</em>
                <div class="amount" v-if="company_order_type==1">
                  <span class="product_name" :class="{'active' : $index>2}">{{n.name}}</span>
                  <p class="number" :style="{width:(n.totalSaleRoom/max_company_totalSaleRoom)*100 + '%'}" :class="{'active' : $index>2}"></p>
                </div>
                <span class="showNum">{{n.totalSaleRoom}}元</span>
              </li>
            </ul>
            <div class="check_more" @click="companyMore()" v-if="(companySaleLists.length)%10 ==0 && companySaleLists.length>0 && company_order_type==1">加载更多</div>
            <div class="check_more" v-if="companySaleLists.length ==0 && company_order_type==1">暂无数据</div>

            <ul class="list" v-if="company_order_type==2">
              <li class="flex" v-for="(n,$index) in companySaleNums" @click="getcompanydata(n.id,n.name)">
                <em :class="{ 'on': $index == 0}">{{$index<9? "0"+($index+1) : $index+1}}</em>
                <div class="amount" v-if="company_order_type==2">
                  <span class="product_name" :class="{'active' : $index>2}">{{n.name}}</span>
                  <p class="number" :style="{width:(n.totalSaleNum/max_company_totalSaleNum)*100 + '%'}" :class="{'active' : $index>2}"></p>
                </div>
                <span class="showNum">{{n.totalSaleNum}}件</span>
              </li>
            </ul>
            <div class="check_more" @click="companyNumMore()" v-if="(companySaleNums.length)%10 ==0 && company_order_type==2">加载更多</div>
            <div class="check_more" v-if="companySaleNums.length ==0 && company_order_type==2">暂无数据</div>
          </div>

          <!--设备组销售排行-->
          <div class="sequencing">
            <div class="title flex">
              <span>设备组销售排行</span>
              <p>
                <a href="javascript:;" @click="reverseArrDevice()">
                  <img src="../../assets/img/zhuanh.png" alt="">
                </a>
                <a href="javascript:;" :class="{'active':device_order_type == 1}" @click="changeDeviceType(1)">
                  <i class="icon">&#xe63a;</i>
                  销售额
                </a>
                <a href="javascript:;" :class="{'active':device_order_type == 2}" @click="changeDeviceType(2)">
                  <i class="icon">&#xe64a;</i>
                  销售量
                </a>
              </p>
            </div>
            <ul class="list" v-if="device_order_type==1">
              <li class="flex" v-for="(n,$index) in deviceSaleLists" @click="getdevicedata(n.vendingMachineGroupId,n.name)">
                <em :class="{ 'on': $index == 0}">{{$index<9? "0"+($index+1) : $index+1}}</em>
                <div class="amount" v-if="device_order_type==1">
                  <span class="product_name" :class="{'active' : $index>2}">{{n.name}}</span>
                  <p class="number" :style="{width:(n.totalSaleRoom/max_device_totalSaleRoom)*100 + '%'}" :class="{'active' : $index>2}"></p>
                </div>
                <span class="showNum">{{n.totalSaleRoom}}元</span>
              </li>
            </ul>
            <div class="check_more" @click="deviceMore()" v-if="(deviceSaleLists.length)%10 ==0 && deviceSaleLists.length>0 && device_order_type==1">加载更多</div>
            <div class="check_more" v-if="deviceSaleLists.length ==0 && device_order_type==1">暂无数据</div>


            <ul class="list" v-if="device_order_type==2">
              <li class="flex" v-for="(n,$index) in deviceSaleNums" @click="getdevicedata(n.vendingMachineGroupId,n.name)">
                <em :class="{ 'on': $index == 0}">{{$index<9? "0"+($index+1) : $index+1}}</em>
                <div class="amount" v-if="device_order_type==2">
                  <span class="product_name" :class="{'active' : $index>2}">{{n.name}}</span>
                  <p class="number" :style="{width:(n.totalSaleNum/max_device_totalSaleNum)*100 + '%'}" :class="{'active' : $index>2}"></p>
                </div>
                <span class="showNum">{{n.totalSaleNum}}笔</span>
              </li>
            </ul>
            <div class="check_more" @click="deviceNumMore()" v-if="(deviceSaleNums.length)%10 ==0 && device_order_type==2">加载更多</div>
            <div class="check_more" v-if="deviceSaleNums.length ==0 && device_order_type==2">暂无数据</div>
          </div>

          <!--设备销售排行-->
          <div class="sequencing">
            <div class="title flex">
              <span>设备销售排行</span>
              <p>
                <a href="javascript:;" @click="reverseSale()">
                  <img src="../../assets/img/zhuanh.png" alt="">
                </a>
                <a href="javascript:;" :class="{'active':sale_order_type == 1}" @click="changeSaleType(1)">
                  <i class="icon">&#xe63a;</i>
                  销售额
                </a>
                <a href="javascript:;" :class="{'active':sale_order_type == 2}" @click="changeSaleType(2)">
                  <i class="icon">&#xe64a;</i>
                  销售量
                </a>
              </p>
            </div>

            <ul class="list" v-if="sale_order_type==1">
              <li class="flex" v-for="(n,$index) in saleSaleLists" @click="getsaledata(n.id,n.number)">
                <em :class="{ 'on': $index == 0}">{{$index<9? "0"+($index+1) : $index+1}}</em>
                <div class="amount" v-if="sale_order_type==1">
                  <span class="product_name" :class="{'active' : $index>2}">{{n.gname}}({{n.number}})</span>
                  <p class="number" :style="{width:(n.totalSaleRoom/max_sale_totalSaleRoom)*100 + '%'}" :class="{'active' : $index>2}"></p>
                </div>
                <span v-if="sale_order_type==1" class="showNum">{{n.totalSaleRoom}}元</span>
              </li>
            </ul>
            <div class="check_more" @click="saleMore()" v-if="(saleSaleLists.length)%10 ==0 && saleSaleLists.length>0 && sale_order_type==1">加载更多</div>
            <div class="check_more" v-if="saleSaleLists.length ==0 && sale_order_type==1">暂无数据</div>

            <ul class="list" v-if="sale_order_type==2">
              <li class="flex" v-for="(p,$index) in saleSaleNums" @click="getsaledata(p.id,p.number)">
                <em :class="{ 'on': $index == 0}">{{$index<9? "0"+($index+1) : $index+1}}</em>
                <div class="amount" v-if="sale_order_type==2">
                  <span class="product_name" :class="{'active' : $index>2}">{{p.gname}}({{p.number}})</span>
                  <p class="number" :style="{width:(p.totalSaleNum/max_sale_totalSaleNum)*100 + '%'}" :class="{'active' : $index>2}"></p>
                </div>
                <span v-if="sale_order_type==2" class="showNum">{{p.totalSaleNum}}件</span>
              </li>
            </ul>
            <div class="check_more" @click="saleNumMore()" v-if="(saleSaleNums.length)%10 ==0 && saleSaleNums.length>0  && sale_order_type==2">加载更多</div>

            <div class="check_more" v-if="saleSaleNums.length ==0 && sale_order_type==2">暂无数据</div>

          </div>

          <!--饮料销售排行-->
          <div class="sequencing">
            <div class="title flex">
                <span>饮料销售排行</span>
                <p>
                    <a href="javascript:;" @click="reverseArr()">
                      <img src="../../assets/img/zhuanh.png" alt="">
                    </a>
                    <a href="javascript:;" :class="{'active':product_order_type == 1}" @click="changeType(1)">
                      <i class="icon">&#xe63a;</i>
                      销售额
                    </a>
                    <a href="javascript:;" :class="{'active':product_order_type == 2}" @click="changeType(2)">
                      <i class="icon">&#xe64a;</i>
                      销售量
                    </a>
                </p>
            </div>

            <ul class="list" v-if="product_order_type==1">
              <li class="flex" v-for="(n,$index) in productSaleLists" @click="getproductdata(n.productId,n.name)">
                <em :class="{ 'on': $index == 0}">{{$index<9? "0"+($index+1) : $index+1}}</em>
                <div class="amount" v-if="product_order_type==1">
                  <span class="product_name" :class="{'active' : $index>2}">{{n.name}}</span>
                  <p class="number" :style="{width:(n.totalSaleRoom/max_product_totalSaleRoom)*100 + '%'}" :class="{'active' : $index>2}"></p>
                </div>
                <span v-if="product_order_type==1" class="showNum">{{n.totalSaleRoom}}元</span>
              </li>
            </ul>
            <div class="check_more" @click="productMore()" v-if="(productSaleLists.length)%10 ==0 && productSaleLists.length>0 && product_order_type==1">加载更多</div>
            <div class="check_more" v-if="productSaleLists.length ==0 && product_order_type==1">暂无数据</div>

            <ul class="list" v-if="product_order_type==2">
              <li class="flex" v-for="(p,$index) in productSaleNums" @click="getproductdata(p.productId,p.name)">
                <em :class="{ 'on': $index == 0}">{{$index<9? "0"+($index+1) : $index+1}}</em>
                <div class="amount" v-if="product_order_type==2">
                  <span class="product_name" :class="{'active' : $index>2}">{{p.name}}</span>
                  <p class="number" :style="{width:(p.totalSaleNum/max_product_totalSaleNum)*100 + '%'}" :class="{'active' : $index>2}"></p>
                </div>
                <span v-if="product_order_type==2" class="showNum">{{p.totalSaleNum}}瓶</span>
              </li>
            </ul>
            <div class="check_more" @click="productNumMore()" v-if="(productSaleNums.length)%10 ==0 && productSaleNums.length>0  && product_order_type==2">加载更多</div>

            <div class="check_more" v-if="productSaleNums.length ==0 && product_order_type==2">暂无数据</div>

          </div>

          <!--食品销售排行-->
          <div class="sequencing">
            <div class="title flex">
              <span>食品销售排行</span>
              <p>
                <a href="javascript:;" @click="reverseFood()">
                  <img src="../../assets/img/zhuanh.png" alt="">
                </a>
                <a href="javascript:;" :class="{'active':food_order_type == 1}" @click="changeFoodType(1)">
                  <i class="icon">&#xe63a;</i>
                  销售额
                </a>
                <a href="javascript:;" :class="{'active':food_order_type == 2}" @click="changeFoodType(2)">
                  <i class="icon">&#xe64a;</i>
                  销售量
                </a>
              </p>
            </div>

            <ul class="list" v-if="food_order_type==1">
              <li class="flex" v-for="(n,$index) in foodSaleLists" @click="getfooddata(n.productId,n.name)">
                <em :class="{ 'on': $index == 0}">{{$index<9? "0"+($index+1) : $index+1}}</em>
                <div class="amount" v-if="food_order_type==1">
                  <span class="product_name" :class="{'active' : $index>2}">{{n.name}}</span>
                  <p class="number" :style="{width:(n.totalSaleRoom/max_food_totalSaleRoom)*100 + '%'}" :class="{'active' : $index>2}"></p>
                </div>
                <span v-if="food_order_type==1" class="showNum">{{n.totalSaleRoom}}元</span>
              </li>
            </ul>
            <div class="check_more" @click="foodMore()" v-if="(foodSaleLists.length)%10 ==0 && foodSaleLists.length>0 && food_order_type==1">加载更多</div>
            <div class="check_more" v-if="foodSaleLists.length ==0 && food_order_type==1">暂无数据</div>

            <ul class="list" v-if="food_order_type==2">
              <li class="flex" v-for="(p,$index) in foodSaleNums" @click="getfooddata(p.productId,p.name)">
                <em :class="{ 'on': $index == 0}">{{$index<9? "0"+($index+1) : $index+1}}</em>
                <div class="amount" v-if="food_order_type==2">
                  <span class="product_name" :class="{'active' : $index>2}">{{p.name}}</span>
                  <p class="number" :style="{width:(p.totalSaleNum/max_food_totalSaleNum)*100 + '%'}" :class="{'active' : $index>2}"></p>
                </div>
                <span v-if="food_order_type==2" class="showNum">{{p.totalSaleNum}}件</span>
              </li>
            </ul>
            <div class="check_more" @click="foodNumMore()" v-if="(foodSaleNums.length)%10 ==0 && foodSaleNums.length>0  && food_order_type==2">加载更多</div>

            <div class="check_more" v-if="foodSaleNums.length ==0 && food_order_type==2">暂无数据</div>

          </div>

        </mt-loadmore>

      </div>
    </div>

    <transition name="custom-classes-transition" enter-active-class="animated nav-open" leave-active-class="animated nav-close">
      <router-view></router-view>
    </transition>

  </div>
</template>

<script>
    import Vue from "vue"

    import {mapState,mapActions,mapMutations} from "vuex"

    import {maxArr,getBeforeDate,comparearr,comparearrdes} from "../../utils"

    import {Toast,Loadmore} from "mint-ui"

    Vue.component(Loadmore.name, Loadmore);

    export default {
      name:"index",
      data(){
        return {
          userLevel:"",
          loadmore: {
            bottomPullText: '上拉加载更多...',
            allLoaded: false,
          },
          vmdata:{},
          col:"blue",
          order_type:1,  //分时销售额，分时销售量
          /*缺品类排行*/
          lackRank:[],
          lack_sort_type:0,  //排序0.正序 1.倒叙
          lack_page:1,
          lack_pagesize:10,


          /*分公司*/
          company_order_type:1,  //设备销售排行销售额，销售量
          company_sort_type:2,  //设备组排序
          company_page:1,  //设备排行页数
          company_num_page:1,  //设备排行页数
          company_pagesize:10,
          max_company_totalSaleRoom:0,   //最大设备销售额
          max_company_totalSaleNum:0,   //最大设备销售量

          /*设备*/
          device_order_type:1,  //设备销售排行销售额，销售量
          device_sort_type:2,  //设备组排序
          device_page:1,  //设备排行页数
          device_num_page:1,  //设备排行页数
          device_pagesize:10,
          max_device_totalSaleRoom:0,   //最大设备销售额
          max_device_totalSaleNum:0,   //最大设备销售量

          /*饮料*/
          product_order_type:1,  //商品销售排行销售额，销售量
          product_sort_type:2,  //商品排序
          product_page:1,  //商品排行页数
          product_num_page:1,  //商品排行页数
          product_pagesize:10,
          max_product_totalSaleRoom:0,   //最大商品销售额
          max_product_totalSaleNum:0,   //最大商品销售量

          /*食品*/
          food_order_type:1,  //商品销售排行销售额，销售量
          food_sort_type:2,  //商品排序
          food_page:1,  //商品排行页数
          food_num_page:1,  //商品排行页数
          food_pagesize:10,
          max_food_totalSaleRoom:0,   //最大商品销售额
          max_food_totalSaleNum:0,   //最大商品销售量

          /*设备组销售*/
          sale_order_type:1,  //商品销售排行销售额，销售量
          sale_sort_type:2,  //商品排序
          sale_page:1,  //商品排行页数
          sale_num_page:1,  //商品排行页数
          sale_pagesize:10,
          max_sale_totalSaleRoom:0,   //最大商品销售额
          max_sale_totalSaleNum:0,   //最大商品销售量

          homeData:{

          },
        }
      },
      watch:{
        order_type:function (oldNum){
          this.getEchart(oldNum);
        },
        /*value4(oldNum,newNum){
          console.info(oldNum)
        }*/
      },
      computed:{
        ...mapState({
          timedur:state=>state.timedur,
          date:state=>state.date,
          companySaleLists:state=>state.companySaleLists,
          companySaleNums:state=>state.companySaleNums,
          deviceSaleLists:state=>state.deviceSaleLists,
          deviceSaleNums:state=>state.deviceSaleNums,
          productSaleLists:state=>state.productSaleLists,
          productSaleNums:state=>state.productSaleNums,
          foodSaleLists:state=>state.foodSaleLists,
          foodSaleNums:state=>state.foodSaleNums,
          saleSaleLists:state=>state.saleSaleLists,
          saleSaleNums:state=>state.saleSaleNums,
          ScrollBar: state => state.ScrollBar,
        }),
      },
      mounted(){
        this.$refs.indexScroll && this.ScrollBar.init('index-scroll', this.$refs.indexScroll);
        this.initData();
        this.deviceData();
        this.checkProduct(this.product_page);
        this.checkFood(this.food_page);
        this.checkSale(this.sale_page);
        this.checkLack();
        this.checkDevice(this.device_page);
        this.checkCompany(this.company_page);
        this.timeData(this.timedur);
        this.getEchart(this.order_type);
      },
      methods:{
        ...mapActions([
          "indexsale_",
          "indexecharts_",
          "productrank_",
          "lackrank_",
          "shebeirank_",
          "devicerank_",
          "companyrank_",
          "deviceinfo_",
          "productselldata_"
        ]),
        ...mapMutations({
          getCompanyList: "getCompanyList",
          getCompanyNumList:"getCompanyNumList",
          getDeviceList: "getDeviceList",
          getDeviceNumList:"getDeviceNumList",
          getProductList: "getProductList",
          getProductNumList:'getProductNumList',
          getFoodList: "getFoodList",
          getFoodNumList:'getFoodNumList',
          getSaleList: "getSaleList",
          getSaleNumList:'getSaleNumList',
          initData:"initData",
          setTime:"setTime",
          deviceSaleListsInit:"deviceSaleListsInit",
          deviceSaleNumsInit:"deviceSaleNumsInit",
          companySaleListsInit:"companySaleListsInit",
          companySaleNumsInit:"companySaleNumsInit",
          productSaleListsInit:"productSaleListsInit",
          productSaleNumsInit:"productSaleNumsInit",
          foodSaleListsInit:"foodSaleListsInit",
          foodSaleNumsInit:"foodSaleNumsInit",
          saleSaleListsInit:"saleSaleListsInit",
          saleSaleNumsInit:"saleSaleNumsInit",
        }),
        //下拉刷新
        loadTop(){
          /*公司*/
          this.company_order_type=1;
          this.company_sort_type=2;
          this.company_page=1;
          this.company_num_page=1;

          /*设备组*/
          this.device_order_type=1;
          this.device_sort_type=2;
          this.device_page=1;
          this.device_num_page=1;

          /*饮料*/
          this.product_order_type=1;
          this.product_sort_type=2;
          this.product_page=1;
          this.product_num_page=1;

          /*食品*/
          this.food_order_type=1;
          this.food_sort_type=2;
          this.food_page=1;
          this.food_num_page=1;

          /*设备*/
          this.sale_order_type=1;
          this.sale_sort_type=2;
          this.sale_page=1;
          this.sale_num_page=1;

          let loadmore = this.$refs.loadmore;
          this.loadmore.bottomPullText = "上拉加载更多...";
          this.loadmore.allLoaded = false;
          this.initData();
          this.deviceData();
          this.checkProduct(this.product_page);
          this.checkFood(this.food_page);
          this.checkSale(this.sale_page);
          this.checkDevice(this.device_page);
          this.checkCompany(this.company_page);
          this.timeData(this.timedur);
          this.getEchart(this.order_type);
          loadmore.onTopLoaded();
        },
        //财务明细
        gofinancial(){
          this.$router.push({name:"financialdetails",query:{times:this.timedur.times,timee:this.timedur.timee}})
        },
        //签到记录
        signIn(){
          this.$router.push({name:"signlist"})
        },
        errorIn(){
          this.$router.push({name:"errortotal"})
        },
        deviceData(){
          this.deviceinfo_().then((res)=>{
            if(res.success==200){
              this.vmdata = res.data;
            }
          })
        },
        goPage(name){
          this.$router.push({name:name,query:{times:this.timedur.times,timee:this.timedur.timee}})
        },
        timeData(date){
          //根据日期请求数据
          this.indexsale_(date).then((res)=>{
            if(res.success==200){
              this.homeData = res.data;
              this.userLevel = res.extrasInfo.userLevel
            }
          },(err)=>{
            Toast(err)
          });
        },
        getEchart(type){
          //根据切换得到图形数据
          this.indexecharts_({order_type:type,times:this.timedur.times,timee:this.timedur.timee}).then((res)=>{
            if(res.success==200){
              this.initEchart(res.data);
            }
          },(err)=>{
            Toast(err)
          })
        },
        selectDate(data){
          this.setTime({times:data.formats[0],timee:data.formats[1]})
          this.initData();
          this.lackRank=[];
          this.lack_page=1;
          this.timeData({times:data.formats[0],timee:data.formats[1]});
          this.checkLack();
          this.product_order_type==1? this.checkProduct(this.product_page) : this.checkProduct(this.product_num_page);
          this.food_order_type==1? this.checkFood(this.food_page) : this.checkFood(this.food_num_page);
          this.sale_order_type==1? this.checkSale(this.sale_page) : this.checkSale(this.sale_num_page);
          this.device_order_type==1? this.checkDevice(this.device_page) : this.checkDevice(this.device_num_page);
          this.company_order_type==1?  this.checkCompany(this.company_page) : this.checkCompany(this.company_num_page);
          this.deviceData();
          this.getEchart(this.order_type);
        },
        findFirstString(data, str){
          if (!data) return false;
          return data.indexOf(str) !== -1;
        },
        goto(){
          this.$router.push({name:"user"})
        },
        initEchart(data) {
          var titlearr=[];
          var xAxis = data.length>0? data[0].xaxis : [];
          var xAxis2 = data.length>1? data[1].xaxis : [];
          if(data.length==1){
            if(this.order_type==1){
              var today = data[0].sellroom;
            }else{
              var today = data[0].sellnum;
            }
            var series=[
              {
                type: 'line',
                symbol:"emptyCircle",
                data: today
              }
            ]
          }else{
            if(this.order_type==1){
              var yesterday = data.length>1?  data[1].sellroom : [0];
              var today = data.length>0? data[0].sellroom : [0];
            }else{
              var yesterday = data.length>1?  data[1].sellnum : [0];
              var today = data.length>0?  data[0].sellnum : [0];
            }
            if(xAxis2.length<xAxis.length){
              for(var i=0;i<xAxis2.length;i++){
                if((xAxis2[i+1]*1)-(xAxis2[i]*1)!=1 && xAxis2[i+1]){
                  xAxis2.splice(i+1,0,(i+1)+"");
                  yesterday.splice(i+1,0,0)
                }
              }
            }else if(xAxis2.length>xAxis.length){
              for(var i=0;i<xAxis.length;i++){
                if((xAxis[i+1]*1)-(xAxis[i]*1)!=1 && xAxis[i+1]){
                  xAxis.splice(i+1,0,(i+1)+"");
                  today.splice(i+1,0,0)
                }
              }
            }
            var series=[
              {
                name: '昨日',
                type: 'line',
                symbol:"emptyCircle",
                data: yesterday
              },
              {
                name: '当天',
                type: 'line',
                symbol:"emptyCircle",
                data: today
              }
            ]
          }

          if(this.timedur.times == this.timedur.timee){
            titlearr=[
              {
                name: '昨日',
                icon: 'rect'
              },
              {
                name: '当天',
                icon: 'rect'
              }
            ]
          }

          let mainEl = document.getElementById('echartsDiv');
          let myChart = echarts.init(mainEl);
          let option = {
            color: ['#58a7ff','#2d72ff'],
            textStyle: {
              fontSize: 13
            },
            legend: {
              data: titlearr,
              x: '7%',
              itemGap: 15,
              left: '10%',
              itemWidth: 12,
              itemHeight: 12,
              inactiveColor: '#ccc',
              textStyle: {
                color: '#999'
              }
            },
            grid: {
              x:"15%",
              x2:"10%",
              y:"12%",
              y2:"10%",
              containLabel: true,
            },
            xAxis: {
              type: 'category',
              position: 'bottom',
              boundaryGap: false,
              data:xAxis,
              axisLine: {
                lineStyle: {
                  color: '#e5e5e5',
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#999',
                }
              },
              axisTick: {
                show: false
              },
            },
            yAxis: {
              type: 'value',
              axisLine: {
                show: false,
              },
              axisLabel: {
                textStyle: {
                  color: '#999',
                }
              },
              splitLine: {
                lineStyle: {
                  color: '#e5e5e5'
                }
              },
              axisTick: {
                show: false
              },
            },
            series: series,
            backgroundColor: '#fff'
          };
          myChart.setOption(option);
          setTimeout(() => {
            myChart.resize()
          })
          window.onresize = function(){
            myChart.resize();
          }
        },

        /*食品*/
        changeFoodType(type){
          this.food_order_type=type;
          if(this.food_order_type==1){
            this.foodSaleListsInit();
            for(var i=0;i<this.food_page; i++){
              this.checkFood(i+1)
            }
          }
          if(this.food_order_type==2){
            this.foodSaleNumsInit();
            for(var i=0;i<this.food_num_page; i++){
              this.checkFood(i+1)
            }
          }
        },

        checkFood(page){
          /*商品排行*/
          let query = {
            //page:this.food_order_type==1? this.food_page : this.food_num_page,
            page:page,
            pagesize:this.food_pagesize,
            times:this.timedur.times,
            timee:this.timedur.timee,
            order_type:this.food_order_type,
            sort_order:this.food_sort_type,
            product_category_type:2
          }
          this.productrank_(query).then((res)=>{
            if(res.success==200 && res.data.data.length>0){
              if(this.food_order_type==1){
                this.getFoodList(res.data.data);
                if(this.food_sort_type==2){
                  this.foodSaleLists = this.foodSaleLists.sort(comparearrdes("totalSaleRoom"));
                }else{
                  this.foodSaleLists = this.foodSaleLists.sort(comparearr("totalSaleRoom"));
                }
                this.max_food_totalSaleRoom=maxArr(this.foodSaleLists,"totalSaleRoom")*1.2;
              }else{
                this.getFoodNumList(res.data.data);
                if(this.food_sort_type==2){
                  this.foodSaleNums = this.foodSaleNums.sort(comparearrdes("totalSaleNum"));
                }else{
                  this.foodSaleNums = this.foodSaleNums.sort(comparearr("totalSaleNum"));
                }
                this.max_food_totalSaleNum=maxArr(this.foodSaleNums,"totalSaleNum")*1.2;
              }
            }else{
              //Toast("商品排行暂无数据")
            }
          })
        },

        //食品销售额加载更多
        foodMore(){
          this.food_page++;
          this.checkFood(this.food_page);
        },

        //食品销售量加载更多
        foodNumMore(){
          this.food_num_page++;
          this.checkFood(this.food_num_page);
        },

        //食品排序
        reverseFood(){
          this.food_sort_type=  this.food_sort_type==1? 2 : 1;
          if(this.food_order_type == 1){
            this.foodSaleListsInit();
            for(var i=0;i<this.food_page; i++){
              this.checkFood(i+1)
            }
          }else{
            this.foodSaleNumsInit();
            for(var i=0;i<this.food_num_page; i++){
              this.checkFood(i+1)
            }
          }
        },

        getfooddata(id,title){
          this.$router.push({name:"productsell",query:{id:id,times:this.timedur.times,timee:this.timedur.timee,title:title}})
        },

        /*缺品类*/
        checkLack(){
          let query = {
            times:this.timedur.times,
            timee:this.timedur.timee,
            sort:this.lack_sort_type,
            page:this.lack_page,
            pageSize:this.lack_pagesize
          }

          this.lackrank_(query).then((res)=>{
            if(res.success==200){
              this.lackRank.push(...res.data.rows);
            }
          })
        },

        /*缺品类排序*/
        reverseArrLack(){
          this.lack_sort_type = this.lack_sort_type? 0 : 1;
          this.lack_page=1;
          this.lackRank=[];
          this.checkLack();
        },

        getmorelack(){
          this.lack_page++;
          this.checkLack();
        },

        getlackdata(id,title){
          this.$router.push({name:"lacksell",query:{id:id,times:this.timedur.times,timee:this.timedur.timee,title:title}})
        },


        /*设备销售*/
        changeSaleType(type){
          this.sale_order_type=type;
          if(this.sale_order_type==1){
            this.saleSaleListsInit();
            for(var i=0;i<this.sale_page; i++){
              this.checkSale(i+1)
            }
          }
          if(this.sale_order_type==2){
            this.saleSaleNumsInit();
            for(var i=0;i<this.sale_num_page; i++){
              this.checkSale(i+1)
            }
          }
        },

        checkSale(page){
          /*销售排行*/
          let query = {
            page:page,
            pagesize:this.sale_pagesize,
            times:this.timedur.times,
            timee:this.timedur.timee,
            order_type:this.sale_order_type,
            sort_order:this.sale_sort_type
          }
          this.shebeirank_(query).then((res)=>{
            if(res.success==200 && res.data.data.length>0){
              if(this.sale_order_type==1){
                this.getSaleList(res.data.data);
                if(this.sale_sort_type==2){
                  this.saleSaleLists = this.saleSaleLists.sort(comparearrdes("totalSaleRoom"));
                }else{
                  this.saleSaleLists = this.saleSaleLists.sort(comparearr("totalSaleRoom"));
                }
                this.max_sale_totalSaleRoom=maxArr(this.saleSaleLists,"totalSaleRoom")*1.2;
              }else{
                this.getSaleNumList(res.data.data);
                if(this.sale_sort_type==2){
                  this.saleSaleNums = this.saleSaleNums.sort(comparearrdes("totalSaleNum"));
                }else{
                  this.saleSaleNums = this.saleSaleNums.sort(comparearr("totalSaleNum"));
                }
                this.max_sale_totalSaleNum=maxArr(this.saleSaleNums,"totalSaleNum")*1.2;
              }
            }else{
              //Toast("商品排行暂无数据")
            }
          })
        },

        //设备销售额加载更多
        saleMore(){
          this.sale_page++;
          this.checkSale(this.sale_page);
        },

        //设备销售量加载更多
        saleNumMore(){
          this.sale_num_page++;
          this.checkSale(this.sale_num_page);
        },

        //设备排序
        reverseSale(){
          this.sale_sort_type=  this.sale_sort_type==1? 2 : 1;
          if(this.sale_order_type == 1){
            this.saleSaleListsInit();
            for(var i=0;i<this.sale_page; i++){
              this.checkSale(i+1)
            }
          }else{
            this.saleSaleNumsInit();
            for(var i=0;i<this.sale_num_page; i++){
              this.checkSale(i+1)
            }
          }
        },

        //设备跳转
        getsaledata(id,title){
          this.$router.push({name:"devicesaledetail",query:{id:id,times:this.timedur.times,timee:this.timedur.timee,title:title}})
        },

        //商品
        changeType(type){
          this.product_order_type=type;
          if(this.product_order_type==1){
            this.productSaleListsInit();
            for(var i=0;i<this.product_page; i++){
              this.checkProduct(i+1)
            }
          }
          if(this.product_order_type==2){
            this.productSaleNumsInit();
            for(var i=0;i<this.product_num_page; i++){
              this.checkProduct(i+1)
            }
          }
        },

        checkProduct(page){
          /*商品排行*/
          let query = {
            //page:this.product_order_type==1? this.product_page : this.product_num_page,
            page:page,
            pagesize:this.product_pagesize,
            times:this.timedur.times,
            timee:this.timedur.timee,
            order_type:this.product_order_type,
            sort_order:this.product_sort_type,
            product_category_type:1
          }
          this.productrank_(query).then((res)=>{
            if(res.success==200 && res.data.data.length>0){
                if(this.product_order_type==1){
                  this.getProductList(res.data.data);
                  if(this.product_sort_type==2){
                    this.productSaleLists = this.productSaleLists.sort(comparearrdes("totalSaleRoom"));
                  }else{
                    this.productSaleLists = this.productSaleLists.sort(comparearr("totalSaleRoom"));
                  }
                  this.max_product_totalSaleRoom=maxArr(this.productSaleLists,"totalSaleRoom")*1.2;
                }else{
                  this.getProductNumList(res.data.data);
                  if(this.product_sort_type==2){
                    this.productSaleNums = this.productSaleNums.sort(comparearrdes("totalSaleNum"));
                  }else{
                    this.productSaleNums = this.productSaleNums.sort(comparearr("totalSaleNum"));
                  }
                  this.max_product_totalSaleNum=maxArr(this.productSaleNums,"totalSaleNum")*1.2;
                }
            }else{
              //Toast("商品排行暂无数据")
            }
          })
        },

        //商品销售额加载更多
        productMore(){
          this.product_page++;
          this.checkProduct(this.product_page);
        },

        //商品销售量加载更多
        productNumMore(){
          this.product_num_page++;
          this.checkProduct(this.product_num_page);
        },

        //商品排序
        reverseArr(){
          this.product_sort_type=  this.product_sort_type==1? 2 : 1;
          if(this.product_order_type == 1){
            this.productSaleListsInit();
            for(var i=0;i<this.product_page; i++){
              this.checkProduct(i+1)
            }
          }else{
            this.productSaleNumsInit();
            for(var i=0;i<this.product_num_page; i++){
              this.checkProduct(i+1)
            }
          }
          this.productSaleLists.reverse();
          this.productSaleNums.reverse();
        },

        getproductdata(id,title){
          this.$router.push({name:"productsell",query:{id:id,times:this.timedur.times,timee:this.timedur.timee,title:title}})
        },


        //设备组
        changeDeviceType(type){
          this.device_order_type=type;
          if(this.device_order_type==1){
            this.deviceSaleListsInit();
            for(var i=0;i<this.device_page; i++){
              this.checkDevice(i+1)
            }
          }
          if(this.device_order_type==2){
            this.deviceSaleNumsInit();
            for(var i=0;i<this.device_num_page; i++){
              this.checkDevice(i+1)
            }
          }
        },

        //设备组
        checkDevice(page){
          /*设备组排行*/
          let query = {
            //page:this.device_order_type==1? this.device_page : this.device_num_page,
            page:page,
            pagesize:this.device_pagesize,
            times:this.timedur.times,
            timee:this.timedur.timee,
            order_type:this.device_order_type,
            sort_order:this.device_sort_type
          }
          this.devicerank_(query).then((res)=>{
            if(res.success==200 && res.data.data.length>0){
              if(this.device_order_type==1){
                this.getDeviceList(res.data.data);
                if(this.device_sort_type==2){
                  this.deviceSaleLists = this.deviceSaleLists.sort(comparearrdes("totalSaleRoom"));
                }else{
                  this.deviceSaleLists = this.deviceSaleLists.sort(comparearr("totalSaleRoom"));
                }
                this.max_device_totalSaleRoom=maxArr(this.deviceSaleLists,"totalSaleRoom")*1.2;
              }else{
                this.getDeviceNumList(res.data.data);
                if(this.device_sort_type==2){
                  this.deviceSaleNums = this.deviceSaleNums.sort(comparearrdes("totalSaleNum"));
                }else{
                  this.deviceSaleNums = this.deviceSaleNums.sort(comparearr("totalSaleNum"));
                }
                this.max_device_totalSaleNum=maxArr(this.deviceSaleNums,"totalSaleNum")*1.2;
              }
            }else{
              //Toast("设备组排行暂无数据")
            }
          })

        },

        //设备组销售额加载更多
        deviceMore(){
          this.device_page++;
          this.checkDevice(this.device_page);
        },

        //设备组销售量加载更多
        deviceNumMore(){
          this.device_num_page++;
          this.checkDevice(this.device_num_page);
        },

        //设备组排序
        reverseArrDevice(){
          this.device_sort_type=  this.device_sort_type==1? 2 : 1;
          if(this.device_order_type == 1){
            this.deviceSaleListsInit();
            for(var i=0;i<this.device_page; i++){
              this.checkDevice(i+1)
            }
          }else{
            this.deviceSaleNumsInit();
            for(var i=0;i<this.device_num_page; i++){
              this.checkDevice(i+1)
            }
          }
        },

        getdevicedata(id,title){
          this.$router.push({name:"devicesell",query:{id:id,times:this.timedur.times,timee:this.timedur.timee,title:title}})
        },

        /*分公司*/
        changeCompanyType(type){
          this.company_order_type=type;
          if(this.company_order_type==1){
            this.companySaleListsInit();
            for(var i=0;i<this.company_page; i++){
              this.checkCompany(i+1)
            }
          }
          if(this.company_order_type==2){
            this.companySaleNumsInit();
            for(var i=0;i<this.company_num_page; i++){
              this.checkCompany(i+1)
            }
          }
        },

        checkCompany(page){
          /*设备组排行*/
          let query = {
            //page:this.company_order_type==1? this.company_page : this.company_num_page,
            page:page,
            pagesize:this.company_pagesize,
            times:this.timedur.times,
            timee:this.timedur.timee,
            order_type:this.company_order_type,
            sort_order:this.company_sort_type
          }
          this.companyrank_(query).then((res)=>{
            if(res.success==200 && res.data.data.length>0){
              if(this.company_order_type==1){
                this.getCompanyList(res.data.data);
                if(this.company_sort_type==2){
                  this.companySaleLists = this.companySaleLists.sort(comparearrdes("totalSaleRoom"));
                }else{
                  this.companySaleLists = this.companySaleLists.sort(comparearr("totalSaleRoom"));
                }
                this.max_company_totalSaleRoom=maxArr(this.companySaleLists,"totalSaleRoom")*1.2;
              }else{
                this.getCompanyNumList(res.data.data);
                if(this.company_sort_type==2){
                  this.companySaleNums = this.companySaleNums.sort(comparearrdes("totalSaleNum"));
                }else{
                  this.companySaleNums = this.companySaleNums.sort(comparearr("totalSaleNum"));
                }
                this.max_company_totalSaleNum=maxArr(this.companySaleNums,"totalSaleNum")*1.2;
              }
            }else{
              //Toast("设备组排行暂无数据")
            }
          })

        },

        //分公司销售额加载更多
        companyMore(){
          this.company_page++;
          this.checkCompany(this.company_page);
        },

        companyNumMore(){
          this.company_num_page++;
          this.checkCompany(this.company_num_page);
        },

        //分公司排序
        reverseArrCompany(){
          this.company_sort_type=  this.company_sort_type==1? 2 : 1;
          if(this.company_order_type == 1){
            this.companySaleListsInit();
            for(var i=0;i<this.company_page; i++){
              this.checkCompany(i+1)
            }
          }else{
            this.companySaleNumsInit();
            for(var i=0;i<this.company_num_page; i++){
              this.checkCompany(i+1)
            }
          }
        },

        getcompanydata(id,title){
          this.$router.push({name:"companysell",query:{id:id,times:this.timedur.times,timee:this.timedur.timee,title:title}})
        },

      }
    }

</script>

<style scoped>


</style>
