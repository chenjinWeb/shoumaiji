<template>
    <div class="content-modal">
        <y-header title="个人信息" router="-1"></y-header>
        <div class="content">
            <div class="scroll-content" margin-tabbar margin-header>
                <div class="info-group">
                    <label class="control-label"><span>姓名</span><input type="text" readonly="readonly" :value='info.userName'></label>
                    <label class="control-label"><span>邮箱</span><input type="text" readonly="readonly" :value='info.userEmail'></label>
                    <label class="control-label"><span>电话</span><input type="text" readonly="readonly" :value='info.userPhone'></label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {mapActions} from 'vuex';
    export default {
        data(){
            return {
                info: {}
            }
        },
        created() {

        },
        mounted(){
            this.get_userinfo();
        },
        methods: {
            ...mapActions([
                'userinfo_'
            ]),

            get_userinfo() {
                this.userinfo_().then(
                    (res) => {
                        if(res.success == 200){
                            this.info = res.data;
                        }
                    }
                )
            }
        }
    }
</script>
