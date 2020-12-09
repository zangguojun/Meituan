<style lang='scss' scoped>
.gd-container{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    background-color: rgba(0,0,0,0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    .middle-box{
        width: 315px;
        height: 440px;
        position: relative;
        .gd-detail{
            overflow: hidden;
            border-radius: 10px;
            height: 348px;
            background-color: #fff;
            padding: 10px;
            .picture{
                width: 100%;
                height: 236px;
            }
            .month-sale{
                font-size: 14px;
                margin-top: 10px;
            }
            .intro{
                height: 30px;
                font-size: 13px;
                margin-top: 10px;
            }
            .price{
                margin-top: 20px;
                font-size: 18px;
                color: brown;
            }

        }
        .close-btn{
            width: 40px;
            height: 40px;
            background-image: url("http://s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:9096d347/df125964473c5a2c4edadb74d8a11995.png");
            background-size: 40px;
            background-position: center;
            border-radius: 50%;
            position: absolute;
            left: 50%;
            margin-left: -20px;
        }

    }
}
</style>
<template>
<div class="gd-container" v-show="show">
<div class="middle-box">
    <div class="gd-detail">
        <img :src="goods.picture" alt="" class="picture">
        <div class="month-sale">月售{{goods.category}}份</div>
        <div class="intro">{{goods.intro}}</div>
        <div class="price">￥{{goods.price}}</div>
    </div>
    <div class="close-btn" @click="closeClick()"></div>
</div>
</div>
</template>

<script>
export default {
    name: "goods-detail",
    props:{
        goods:{
            type:Object,
            default:function () {
                return{}
            }
        }
    },
    data(){
        return{
            show:false,
        }
    },
    components:{

    },
    watch:{
        goods(newValue,oldValue){
            console.log(newValue,oldValue)
            this.show = true;
        }
    },
    methods:{
        closeClick(){
            this.show = false;
        }
    }
}
</script>