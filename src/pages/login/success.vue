<template>
    <div class="content-modal">
        <y-header title="成功"></y-header>
        <div class="content">
            <div class="scroll-content">
                <div class="lost">
                    <img src="../../assets/img/xiaolian.png"/>
                    <p>微信授权成功，将自动跳转首页</p>
                </div>
                <div class="subbutton">
                    <router-link to="/" class="btn" style="color:#fff">返回</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        data() {
            return {}
        },
        created: function () {

        },
        mounted: function () {
            this.thirdpart_(this.$route.query).then((res) => {
                if (res.success == 200) {
                    this.$router.push({name: 'index'});
                }
            })
        },
        computed: {},
        methods: {
            ...mapActions([
                'thirdpart_'
            ]),
        }
    }
</script>
