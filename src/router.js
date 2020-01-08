import Vue from "vue";
import Router from "vue-router";
import Login from "./components/Login.vue";
import Home from "./views/Home.vue";
import OsAdicionar from "./components/OsAdicionar.vue";

Vue.use(Router);

export default new Router({
	mode: "history",
	base: process.env.BASE_URL,
	routes: [ 
	{
		path: "/",
		name: "Login",
		component: Login
	},
	{
		path: "/home",
		name: "Home",
		component: Home
  },
  {
    path: "/adicionar",
    name: "OsAdicionar",
    component: OsAdicionar
  }
	]
})

/*const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "*",
    component: Login
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    }
];

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;*/