<style lang="scss" scoped>
.header-group{
    background-color: #000000;
    padding: 46px 10px 10px;
    display: flex;
    margin-top: -46px;
    .logo{
        width: 85px;
        height: 64px;
    }
    .merchant-info{
        flex: 1;
        margin-left: 10px;
        color: #ffffff;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        overflow: hidden;
        .notice{
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
    }
}
.tab-group{
    .menu-group{
        display: flex;
        .category-group{
            width: 80px;
            text-align: center;
            overflow: hidden;
            .category-list{
                overflow: hidden;
                li{
                    height: 50px;
                    line-height: 50px;
                    &.active{
                        background-color: lightblue;
                    }
                }
            }
        }
        .goods-group{
            overflow: hidden;
            .goods-list{
                flex: 1;
                .goods-item{
                    display: flex;
                    /*margin-bottom: 10px;*/
                    padding-bottom: 10px;
                    .thumbnail{
                        width: 75px;
                        height: 75px;
                    }
                    .goods-info{
                        flex: 1;
                        margin-left: 10px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        .goods-name{
                            font-size: 16px;
                            font-weight: 700;
                        }
                        .goods-info-bottom{
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            .price{
                                color: brown;
                                font-size: 16px;
                                font-weight: 700;
                            }
                        }
                    }
                }
                .category-name{
                    font-size: 12px;
                    height: 32px;
                    line-height: 32px;
                }
            }
        }
    }
}
</style>
<template>
    <div class="merchant-container">
        <mt-nav-bar></mt-nav-bar>
        <div class="header-group">
            <img src="http://p1.meituan.net/xianfu/33c48a92a31a21e4bf32d3aa7c1c5c0d16649.jpg" alt="" class="logo">
            <div class="merchant-info">
                <div class="delivery-info">
                    <span>20分钟</span>|<span>1km</span>
                </div>
                <div class="notice">
                    公告：欢迎光临！欢迎光临！欢迎光临！欢迎光临！欢迎光临！欢迎光临！欢迎光临！欢迎光临！欢迎光临！欢迎光临！欢迎光临！
                </div>
            </div>
        </div>
        <van-tabs class="tab-group" v-model="active">
            <van-tab title="点菜">
                <div class="menu-group" :style="menuHeightStyle">
                    <div class="category-group" ref="category">
                        <ul class="category-list">
                            <li v-for="(category,index) in categories" :key="category.name"
                                @click="categoryClick(index)"
                                :class="index==currentIndex?'active':''">
                                {{category.name}}
                            </li>
                        </ul>
                    </div>
                    <div class="goods-group" ref="goods">
                        <div class="goods-list">
                            <dl v-for="(category,category_index) in categories" :key="category.name"
                                class="goods-dl">
                                <dt class="category-name">{{category.name}}</dt>
                                <dd class="goods-item" v-for="(goods,goods_index) in category.goods_list"
                                    :key="goods.id">
                                    <img :src="goods.picture" alt="" class="thumbnail"
                                         @click="goodsClick(category_index,goods_index)">
                                    <div class="goods-info">
                                        <div class="goods-name"
                                             @click="goodsClick(category_index,goods_index)">{{goods.name}}</div>
                                        <div class="month-sale">月售{{goods.category}}份</div>
                                        <div class="goods-info-bottom">
                                            <div class="price">￥{{goods.price}}</div>
                                            <stepper v-model="goods.count"></stepper>
                                        </div>
                                    </div>
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </van-tab>
            <van-tab title="评论">评论页面</van-tab>
            <van-tab title="商家">商家页面</van-tab>
        </van-tabs>
        <goods-detail :goods="detailGoods"></goods-detail>
        <cart :categories="categories"></cart>
    </div>

</template>

<script>
    import Vue from "vue";
    import BScroll from 'better-scroll'
    import kfc from '../../data/kfc.js'
    import GoodsDetail from "./GoodsDetail";
    import Stepper from "./Stepper";
    import Cart from "./Cart";
    import MTNavBar from "../Common/MTNavBar";

    import {Tab, Tabs} from "vant";
    Vue.use(Tab);
    Vue.use(Tabs);

    export default {
        name: "Merchant",
        components:{
            [GoodsDetail.name]:GoodsDetail,
            [Stepper.name]:Stepper,
            [Cart.name]:Cart,
            [MTNavBar.name]:MTNavBar,
        },
        data(){
            return{
                active:0,
                categories:[],
                positions:[],
                currentIndex:0,
                detailGoods:undefined,
            }
        },
        computed:{
            menuHeightStyle(){
                return {height:window.innerHeight-164+"px"}
            }
        },
        mounted() {
            const categories = kfc['categories'];
            for(let category of categories){
                for(let goods of category.goods_list){
                    goods.count = 0
                }
            }

            this.categories = categories;
            this.$nextTick(() => {
                var menuScroll = new BScroll(this.$refs.category,{
                    scrollY:true,
                    click:true
                });

                var goodsScroll = new BScroll(this.$refs.goods,{
                    scrollY:true,
                    click:true,
                    probeType:2
                });
                goodsScroll.on("scroll",(pos)=>{
                   const y = Math.abs(pos.y);
                   const positions = this.positions;
                   for(let index = positions.length-1;index>=0;index--){
                       const position = positions[index];
                       if(y >= position){
                           this.currentIndex = index;
                           break
                       }
                   }
                });
                this.menuScroll = menuScroll;
                this.goodsScroll = goodsScroll;

                const positions = [0];
                let offset = 0;
                const dlList = document.getElementsByClassName('goods-dl');
                for (let dl of dlList){
                    const height = dl.clientHeight;
                    offset += height;
                    positions.push(offset);
                }
                this.positions = positions;
            });
        },
        methods:{
            categoryClick(index){
                const position = this.positions[index];
                this.goodsScroll.scrollTo(0,-position,500);
                this.currentIndex = index;
            },
            goodsClick(category_index,goods_index){
                let category = this.categories[category_index];
                let goods = category.goods_list[goods_index];
                this.detailGoods = JSON.parse(JSON.stringify(goods));
            }
        }
    }
</script>