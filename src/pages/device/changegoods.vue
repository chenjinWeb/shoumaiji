<template>
  <div class="content-modal">
    <y-header title="货道管理" router="-1"></y-header>
    <div class="content">
      <div class="scroll-content" margin-header>
        <div class="search_input search_latitud">
          <label class="form">
            <input type="search" placeholder="请输入商品名称" class="search" v-model="name">
          </label>
          <div class="search_btn" @click="getName()">搜索</div>
        </div>
        <ul class="goods_select clear">
          <li class="list fl" v-for="i in productInfolist">
            <a href="javascript:;">
              <p class="tip"><span>{{i.weight}}ml</span></p>
              <div class="goods_img">
                <img v-bind:src="i.cover_url">
              </div>
              <p class="goods_name"><span class="name">{{i.name}}</span></p>
              <p class="goods_price">￥{{i.price}}</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions} from "vuex"
  import Vue from 'vue'
  export default {
    name:"changegoods",
    data(){
      return {
        productInfolist:[],
        name:"",
        query:{},

      }
    },
    mounted(){
      this.query = this.$route.query
      this.getchangeAisle();
      this.getName();
//      this.getproductInfo();
    },
    methods: {
      ...mapActions([
        "changeAisle_",
        "productInfo_"
      ]),
        getchangeAisle(){
            this.changeAisle_(this.query).then(res =>{
              if(res.success ==200){
//                console.info(res);
              }
            })
        },

      getName(){

          this.productInfo_({name:this.name}).then(res =>{
            if(res.success ==200){
              console.info(res);
              this.productInfolist=res.data;
            }
          })
      }

    }
  }
</script>
