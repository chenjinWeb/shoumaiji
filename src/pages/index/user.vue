<template>
    <div class="tab-content">
        <y-header title="用户" router="-1"></y-header>
        <div class="content">
            <div class="scroll-content" margin-tabbar margin-header>
                <div href="javascript:;" class="user_account flex">
                    <div class="head_lef"><img src="../../assets/img/toux.png" alt="" class="head_img"></div>
                    <div class="head_rig">
                        <router-link :to="{name:'userInfo'}" class="user_head clear">
                            <div class="head_nickname fl">
                                <p class="nickname">{{info.userEmail}}</p>
                                <p class="phone_number"><i class="icon">&#xe648;</i>{{info.userPhone}}</p>
                            </div>
                            <div class="goin fr"><i class="icon">&#xe600;</i></div>
                        </router-link>
                    </div>
                </div>

                <ul class="center_list">
                    <li v-auth-btn="jurisdiction" auth-id="3010">
                        <router-link :to="{name:'pwdModify',query:{email:info.userEmail}}" class="central_list clear">
                            <div class="list_lef fl"><img src="../../assets/img/xgma.png" alt="">修改密码</div>
                            <div class="list_rig fr">
                                <i class="icon">&#xe600;</i>
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{name:'question'}" class="central_list clear">
                            <div class="list_lef fl"><img src="../../assets/img/wtfk.png" alt="">问题反馈</div>
                            <div class="list_rig fr">
                                <i class="icon">&#xe600;</i>
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{name:'help'}" class="central_list clear">
                            <div class="list_lef fl"><img src="../../assets/img/kefdh.png" alt="">客服电话</div>
                            <div class="list_rig fr">
                                <i class="icon">&#xe600;</i>
                            </div>
                        </router-link>
                    </li>
                    <!--<li>
                        <div class="central_list clear" @click="goWxBind()">
                            <div class="list_lef fl"><img src="../../assets/img/bdwx.png" alt="">绑定微信</div>
                            <div class="list_rig fr">
                                <i class="icon">&#xe600;</i>
                            </div>
                        </div>
                    </li>-->
                </ul>
                <ul class="center_list">
                    <li v-if="!info.bindWx">
                        <div class="central_list clear" @click="goWxBind()">
                            <div class="list_lef fl"><img src="../../assets/img/bdwx.png" alt="">绑定微信</div>
                            <div class="list_rig fr">
                                <i class="icon">&#xe600;</i>
                            </div>
                        </div>
                    </li>
                    <li v-if="info.bindWx">
                      <div class="central_list clear" @click="goWxUnbind()">
                        <div class="list_lef fl"><img src="../../assets/img/bdwx.png" alt="">解绑微信</div>
                        <div class="list_rig fr">
                          <i class="icon">&#xe600;</i>
                        </div>
                      </div>
                    </li>
                </ul>
                <div class="subbutton sublogin out">
                    <button @click="logout()" class="btn">退出登录</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {mapState, mapActions, mapMutations} from 'vuex';
    import {Toast,MessageBox} from 'mint-ui';
    export default {
        data(){
            return {
                info: {},
                jurisdiction:null,
            }
        },
        created() {

        },
        mounted(){
            this.get_userinfo();
            this.current_({pid: 3009}).then((res) => {
                if (res.success == 200) {
                    this.jurisdiction = res.jurisdiction;
                }
            });
        },
        methods: {
            ...mapActions([
                'current_',
                'userinfo_',
                'logout_',
                'wxbind_',
                'wxunbind_'
            ]),

            get_userinfo() {
                this.userinfo_().then(
                    (res) => {
                        if(res.success == 200){
                            this.info = res.data;
                        }
                    }
                )
            },
            logout() {
                this.logout_().then(
                    (res) => {
                        if (res.success == 200) {
                            this.$router.push('/')
                        }
                    }
                )
            },
            goWxBind(){
                if(!this.info.userId){
                    Toast('请稍后'); return;
                }
                this.wxbind_({userId: this.info.userId}).then((res) => {
                    if (res.success == 200) {
                      window.location.href = res.url;
                    }
                })
            },
            goWxUnbind(){
              MessageBox.confirm('确定解绑微信？').then(action => {
                this.wxunbind_({userId: this.info.userId}).then((res) => {
                  if (res.success == 200) {
                    location.reload();
                  }
                })
              },action=>{

              });
            }
        }
    }
</script>
