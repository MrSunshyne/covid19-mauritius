import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import SingleCountry from "../views/SingleCountry.vue";
import CovidFree from "../views/CovidFree.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "home",
		component: Home,
	},
	{
		path: "/country/:country",
		name: "singleCountry",
		component: SingleCountry,
	},
	{
		path: "/free/",
		name: "CovidFree",
		component: CovidFree,
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
