<style lang='scss' scoped>

</style>
<template>
    <mt-nav-bar leftArrowStyle="black" :title="sssss"></mt-nav-bar>
</template>

<script>
    import MTNavBar from "./Common/MTNavBar";
    export default {
        name: "SubmitOrder",
        data() {
            return {
                goodsList: [],
            }
        },
        components:{
            [MTNavBar.name]:MTNavBar,
        },
        mounted() {
            this.goodsList = this.$store.state.cart
        },
    }
</script>