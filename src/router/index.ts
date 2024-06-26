import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

// 1. 配置路由
const routes: Array<RouteRecordRaw> = [
  {
    path: "/", // 默认路由
    redirect: "/search",    
  },
  {
    path: "/search", //  home页面
    component: () => import("../views/search/index.vue"),
  },
  {
    path: "/children", //  home页面
    component: () => import("../views/children/index.vue"),
  },
  {
    path: "/fenjie", //  home页面
    component: () => import("../views/fenjie/index.vue"),
  },

];
// 2.返回一个 router 实列，为函数，配置 history 模式
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 3.导出路由   去 main.ts 注册 router.ts
export default router