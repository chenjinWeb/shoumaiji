  <template>
    <div class="content-modal">
        <div class="content">
            <div class="scroll-content">
                <div class="login_body">
                    <div class="form">
                        <div class="ifrom clear">
                            <input type="text" name="name" placeholder="请输入登录名" class="name" v-model="user.username">
                        </div>
                        <div class="ifrom clear">
                            <input type="password" name="password" placeholder="请输入密码" v-model="user.password">
                        </div>

                        <div class="sublogin" @click="login()"><a href="javascript:;" class="btn">登录</a></div>
                        <div class="sublogin" @click="weiXinLogin()"><a href="javascript:;" class="btn" style="background-color: #63c73b">微信登录</a></div>
                    </div>
                    <!--<router-link :to="{name:'about'}" class="drop-down">
                        下拉情况介绍<br><i class="icon">&#xe60c;</i>
                    </router-link>-->
                </div>
            </div>
        </div>
        <transition name="custom-classes-transition" enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
            <router-view></router-view>
        </transition>
    </div>
</template>


<script>
    /*username: '594474102@qq.com', password: 'auto.vending'*/
    import {mapGetters, mapActions, mapState, mapMutations} from 'vuex';
    import {Toast} from 'mint-ui';
    import {MessageBox} from 'mint-ui';
    export default {
        data() {
            return {
                user: {
                    username: '',
                    password: ''
                }
            }
        },
        created: function () {

        },
        mounted: function () {

        },
        computed: {
          ...mapState({
            productlimit:state=>state.productlimit
          })
        },
        methods: {

            ...mapActions([
                'userlogin_',
                'wxbind_',
                'wxlogin_',
                "storehouse_"
            ]),
            ...mapMutations([
              "returnlimit"
            ]),
            login(){
                if(!this.user.username){
                    Toast("用户名不能为空");
                    return
                }
                if(!this.user.password){
                    Toast("密码不能为空");
                    return
                }
                this.userlogin_(this.user).then(
                    (res) => {
                        console.info(res)
                        if (res.success == 200) {
                            if (!res.openid) {
                                setTimeout(() => {
                                    this.goWxBind(res.userId);
                                }, 200)
                            }
                            this.getproductlimit();
                            this.$router.push({name: 'index'});
                        }
//                        Object.assign(this._user, res);//保存用户信息
//                        this.$router.push({name: 'user'})
                    }
                )
            },
            getproductlimit(){
              this.storehouse_({type:0}).then(res=>{
                if(res.success==200){
                  this.returnlimit(res.extrasInfo.button);
                }
              })
            },
            weiXinLogin(){
                this.wxlogin_().then((res) => {
                    if (res.success == 200) {
                        window.location.href = res.url;
                    }
                })
            },
            goWxBind(id){
                let config = {confirmButtonText: '跳过', cancelButtonText: '绑定', confirmButtonClass: 'cancel', cancelButtonClass: 'confirm'};
                MessageBox.confirm('您还未绑定微信帐号，绑定后，可直接用微信登录', config).then(
                    () => {

                    },
                    () => {
                        this.wxbind_({userId: id}).then((res) => {
                            if (res.success == 200) {
                                window.location.href = res.url;
                            }
                        })
                    }
                );
            }
        }
    }
</script>
