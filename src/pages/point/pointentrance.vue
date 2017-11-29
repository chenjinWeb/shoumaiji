<template>

  <div class="tab-content">
    <y-header title="点位管理" router="-1"></y-header>
    <div class="content">
      <div class="point_create">
        恭喜您，点位组创建成功~
        <div @click="createNow()" class="point_create_btn">请创建具体点位</div>
      </div>
    </div>
  </div>

</template>

<script>

    export default {
        name: "pointentrance",
        data() {
            return {
              area_id:this.$route.query.id? this.$route.query.id : 0,
            }
        },
        computed: {},
        methods: {
          createNow(){
            this.$router.push({name:"createpoint",query:{id:this.area_id,dataId:0}})
          }
        },
        mounted() {

        }

    }

</script>

<style scoped>


</style>
