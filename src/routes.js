import VueRouter from "vue-router"
import Vue from "vue";
import Home from "./components/Home"
import Order from "./components/Order"
import Mine from "./components/Mine"
import Merchant from "./components/Merchant/Merchant";
import SubmitOrder from "./components/SubmitOrder";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: Home,
        name: "home"
    }, {
        path: "/order",
        component: Order,
        name: "order",
    }, {
        path: "/mine",
        component: Mine,
        name: "mine",
    }, {
        path: "/merchant/:merchant_id",
        component: Merchant,
        name: "merchant",
    }, {
        path: '/submitorder',
        component: SubmitOrder,
        name: 'submit_order',
    }

];

const router = new VueRouter({
    routes
});

export default router

