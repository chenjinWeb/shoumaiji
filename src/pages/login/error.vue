<template>
    <div class="content-modal">
        <y-header title="错误"></y-header>
        <div class="content">
            <div class="scroll-content">
                <div class="lost">
                    <img src="../../assets/img/kulian.png" />
                    <p>您还未绑定微信号，请用用户名密码方式登录</p>
                </div>
                <div class="subbutton">
                    <router-link to="/" class="btn" style="color:#fff">返回首页</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return { }
        },
        created: function () {

        },
        mounted: function () {

        },
        computed: {},
        methods: {

        }
    }
</script>
