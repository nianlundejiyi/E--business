import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/login" },
  {
    path: "/login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../view/login.vue"),
  },
  {
    path: "/home",
    component: () => import(/* webpackChunkName: "home" */ "../view/home.vue"),
    children: [
      { path: "/", redirect: "/home/welcome" },
      {
        path: "welcome",
        component: () =>
          import(
            /* webpackChunkNa"welcome" */ "../components/home/welcome.vue"
          ),
      },
      {
        path: "users",
        component: () =>
          import(/* webpackChunkNa"users" */ "../components/home/users.vue"),
      },
      {
        path: "roles",
        component: () =>
          import(/* webpackChunkNa"roles" */ "../components/home/roles.vue"),
      },
      {
        path: "rights",
        component: () =>
          import(/* webpackChunkNa"rights */ "../components/home/rights.vue"),
      },
      {
        path: "goods",
        component: () =>
          import(/* webpackChunkNa"goods" */ "../components/home/goods.vue"),
      },
      {
        path: "/goods/add",
        component: () =>
          import(/* webpackChunkNa"add" */ "../components/home/add.vue"),
      },
      {
        path: "params",
        component: () =>
          import(/* webpackChunkNa"params" */ "../components/home/params.vue"),
      },
      {
        path: "categories",
        component: () =>
          import(
            /* webpackChunkNa"categories" */ "../components/home/categories.vue"
          ),
      },
      {
        path: "orders",
        component: () =>
          import(/* webpackChunkNa"orders" */ "../components/home/orders.vue"),
      },
      {
        path: "reports",
        component: () =>
          import(
            /* webpackChunkNa"reports" */ "../components/home/reports.vue"
          ),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});
// 路由守卫
router.beforeEach((to, from, next) => {
  //to 将要访问的路径
  // from 代表从那个路径跳转而来
  // next 是一个函数 表示放行 next() 方行 next(/login) 强制跳转

  if (to.path == "/login") return next();
  // 获取token
  if (!localStorage.getItem("token")) return next("/login");
  next();
});
export default router;
