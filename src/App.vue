<template>
  <div id="app">
    <router-view></router-view>
    <van-tabbar v-model="active" v-if="showTabbar">
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="orders-o" to="/order">订单</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/mine">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import Vue from "vue";
import {Tabbar, TabbarItem} from "vant";
Vue.use(Tabbar);
Vue.use(TabbarItem);
export default {
  name: 'App',
  components: {
      },
  data(){
    return {
      active: 0
    }
  },
  computed:{
    showTabbar(){
      const name = this.$route.name
      if(name=='home' || name=='order' || name=='mine'){
        return true
      }else {
        return false
      }
    }


  }
}
</script>

<style lang="scss">
@import "styles/init.css";
.van-search{
  padding: 0;
}

</style>
