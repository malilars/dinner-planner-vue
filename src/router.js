import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import SelectDish from '@/components/SelectDish'
import DishDetail from '@/components/DishDetail'
import DinnerOverview from '@/components/DinnerOverview'
import DinnerPrintout from '@/components/DinnerPrintout'
import { modelInstance } from "@/data/DinnerModel";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/search',
      name: 'SelectDish',
      component: SelectDish,
      props: { model: modelInstance }
    },
    {
      path: '/dish-detail/:id',
      name: 'DishDetail',
      component: DishDetail,
      props: { model: modelInstance }
    },
    {
      path: '/dinner-overview',
      name: 'DinnerOverview',
      component: DinnerOverview,
      props: { model: modelInstance }
    },
    {
      path: '/dinner-printout',
      name: 'DinnerPrintout',
      component: DinnerPrintout,
      props: { model: modelInstance }
    }
  ]
})
