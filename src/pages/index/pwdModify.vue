<template>
    <div class="content-modal">
        <y-header title="修改密码" router="-1"></y-header>
        <div class="content">
            <div class="scroll-content" margin-tabbar margin-header>
                <div class="modify-group">
                    <label class="control-label"><input v-model="pass.oldpass" type="password" placeholder="请输入原密码"><i class="icon">&#xe64f;</i></label>
                    <label class="control-label"><input v-model="pass.newpass" type="password" placeholder="请输入新密码"><i class="icon">&#xe64f;</i></label>
                    <label class="control-label"><input v-model="checkpass" type="password" placeholder="请确认密码"><i class="icon">&#xe64f;</i></label>
                </div>
                <div class="subbutton sublogin">
                    <button class="btn" @click="submit()" >确认修改</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Toast} from 'mint-ui';
    import {mapActions} from 'vuex';
    export default {
        data(){
            return {
                pass: {
                    oldpass: '',
                    newpass: '',
                },
                checkpass: ''
            }
        },
        mounted(){

        },
        methods: {
            ...mapActions([
                'changepass_'
            ]),

            submit() {
                if(this.pass.oldpass == '' || this.pass.newpass == '' || this.checkpass == '') {
                    Toast('每一项都必须填写');
                    return false;
                }
                if (this.pass.newpass != this.checkpass) {
                    Toast('请检查您的新密码是否一致');
                    return false;
                }else {
                    let email = this.$route.query.email;
                    this.changepass_({...this.pass,email}).then(
                        (res) => {
                            if(res.success == 200){
                                Toast('恭喜你，密码修改成功！');
                                this.$router.push({name:'user'})
                            }
                        }
                    )
                }
            }
        }
    }
</script>
