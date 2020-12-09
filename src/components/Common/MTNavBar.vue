<style scoped>
    .mt-nav-bar >>> .van-nav-bar {
        background-color: #000000;
    }
    .mt-nav-bar >>> .van-hairline--bottom::after {
        border: none;
    }
</style>

<template>
    <div class="mt-nav-bar">
        <van-nav-bar @click-left="$router.back()" :title="title">
            <van-icon name="arrow-left" slot="left" :color="leftArrowColor"></van-icon>
        </van-nav-bar>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {Icon, NavBar} from "vant";

    Vue.use(NavBar);
    Vue.use(Icon);

    export default {
        name: "mt-nav-bar",
        props: {
            leftArrowStyle: {
                type: String,
                default: "white"
            },
            title: {
                type: String,
                default: ''
            }
        },
        computed: {
            leftArrowColor() {
                return this.leftArrowStyle == 'white' ? '#fff' : '#000'
            },
        }
    }
</script>