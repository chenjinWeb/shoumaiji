<style>
    .help-text{
        color: #666;
        margin-top: 0.2rem;
        padding: 0.125rem 0;
        font-size: .16rem;
    }
    .sublogin .help-text a{
        text-decoration:underline;
        color: #3c3c3c;
    }
</style>
<template>
    <div class="content-modal">
        <y-header title="问题反馈" router="-1"></y-header>
        <div class="content">
            <div class="scroll-content" margin-header>
                <div class="problem_feedback">
                    <a class="feedback clear">
                        <div class="lef fl flex" v-model="info.type" @click="choose()" :style="{'opacity':info.type?1:0.5}">{{info.typename}}</div>
                        <y-sheet v-model="sheetVisible" :data="actions" @select="select($event)"></y-sheet>
                    </a>

                    <div class="telephone">
                        <label class="control-label"><input v-model="info.phonenumber" type="text" placeholder="请输入您的联系方式"></label>
                    </div>

                    <div v-if="info.type == 1 || info.type == 2">
                        <div class="telephone">
                            <label class="control-label"><input v-model="info.machineid" type="text" placeholder="机器编号"></label>
                        </div>
                        <div class="telephone">
                            <label class="control-label"><input v-model="info.ordernumber" type="text" placeholder="订单号"></label>
                        </div>
                        <textarea v-if="info.type == 1" v-model="info.content" class="opinion" placeholder="请反馈您的宝贵意见。
退款问题需要输入您的交易单号（微信用户：[微信支付]凭证点击详情复制交易单号）">
                        </textarea>
                        <textarea v-if="info.type == 2" v-model="info.content" class="opinion" placeholder="请反馈您的宝贵意见。
退款问题需要输入您的交易单号（支付宝用户：[朋友]-[支付助手]，查看详情，复制交易号）">
                        </textarea>
                    </div>

                    <div v-if="info.type == 3">
                        <div class="telephone">
                            <label class="control-label"><input v-model="info.machineid" type="text" placeholder="机器编号"></label>
                        </div>
                        <div class="telephone">
                            <label class="control-label"><input v-model="info.goodsname" type="text" placeholder="购买的商品"></label>
                        </div>
                        <div class="telephone">
                            <label class="control-label"><input v-model="info.price" type="number" placeholder="价格"></label>
                        </div>
                    </div>

                    <textarea v-if="info.type != 1 && info.type != 2" v-model="info.content" class="opinion" placeholder="请反馈您的宝贵意见。">
                    </textarea>

                    <div class="telephone" v-if="info.type == 1 || info.type == 2">
                        <label class="control-label">
                            上传图片
                            <input style="display: none" @change="photoAlbum" ref="album" type="file" accept="image/*" />
                        </label>
                        <div class="cacheImg" v-show="blobUrl">
                            <img ref="cacheImg" src="">
                        </div>
                    </div>

                </div>

                <div class="subbutton sublogin" style="margin-bottom: 0.2rem;">
                    <p class="help-text">客服电话：<a href="tel:400-820-3697">400-820-3697</a></p>
                    <button class="btn" @click="submit()" :disabled="disabled">确认提交 {{disabled? time: ''}}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {mapActions} from 'vuex';
    import {Toast} from 'mint-ui';
    export default {
        data(){
            return {
                actions:[
                    {name: '全部投诉类型',value:0},
                    {name: '微信支付后未出货',value:1},
                    {name: '支付宝支付后未出货',value:2},
                    {name: '现金支付后未出货',value:3},
                    {name: '操作无反应',value:4},
                    {name: '不能投纸币',value:5},
                    {name: '不能投硬币',value:6},
                    {name: '无法微信支付',value:7},
                    {name: '无法支付宝支付',value:8},
                    {name: '出错货',value:9},
                    {name: '未退币',value:10},
                    {name: '退错币',value:11},
                    {name: '如何操作',value:12},
                    {name: '产品质量问题',value:13},
                    {name: '其他问题',value:14},
                ],
                info: {
                    type: null,
                    typename: '请选择问题类型',
                },
                sheetVisible: false,
                disabled:false,
                time:10,
                blobUrl:null,
                blobData:null
            }
        },
        mounted(){

        },
        watch:{
            'info.type'(val){
                this.info = {
                    type:val,
                    typename:this.info.typename
                };
                this.blobUrl = null;
                this.blobData = null;
                console.info(this.info);
            }
        },
        methods: {
            ...mapActions([
                'feedback_'
            ]),
            choose(){
                this.sheetVisible = !this.sheetVisible
            },
            select(e){
                if(e){
                    this.info.type = e.value;
                    this.info.typename = e.name;
                }
            },
            photoAlbum(){
                console.info(this.$refs.album);
                let blob = this.blobData = this.$refs.album.files[0];
                let cacheImg = this.$refs.cacheImg;
                cacheImg.src = this.blobUrl = URL.createObjectURL(blob);
            },
            submit(){
                let formData = new FormData();
                this.info.phonenumber && formData.append('phonenumber', this.info.phonenumber);
                this.info.content && formData.append('content', this.info.content);
                formData.append('type', this.info.type);
                formData.append('machineid', this.info.machineid);

                if(this.info.type == 1 || this.info.type == 2){
                    if (!this.info.machineid) {
                        alert('请填写机器编号');
                        return false;
                    }
                    if (!this.info.ordernumber) {
                        alert('请填写订单号');
                        return false;
                    }
//                    if(!this.blobUrl || !this.blobData){
//                        alert('请上传图片凭证');
//                        return false;
//                    }
                    formData.append('ordernumber', this.info.ordernumber);
                }

                if(this.blobUrl && this.blobData){
                    formData.append('file', this.blobData, this.blobData.name);
                }

                if(this.info.type == 3){
                    if (!this.info.machineid) {
                        alert('请填写机器编号');
                        return false;
                    }
                    if (!this.info.goodsname) {
                        alert('请填写购买的商品');
                        return false;
                    }
                    if (!this.info.price) {
                        alert('请填写价格');
                        return false;
                    }
                    formData.append('goodsname', this.info.goodsname);
                    formData.append('price', this.info.price);
                }

                this.disabled = !this.disabled;
                this.time = 10;
                let timeNum = setInterval(() => {
                    if(this.time === 0){
                        clearInterval(timeNum);
                        this.disabled = false;
                    }
                    --this.time
                },1000);
                //<!--phonenumber machineid ordernumber content goodsname price-->


                this.feedback_(formData).then(
                    (res) => {
                        if (res.success == 200) {
                            Toast('恭喜你，提交成功！')
                        }else{
                            Toast('对不起，提交出现问题了！')
                        }
                    }
                )
            }
        }
    }
</script>
