import Reg from '@/components/backEnd/Reg';
import Login from '@/components/backEnd/Login';

import Admin from '@/components/backEnd/Admin';
import PlaceCreate from '@/components/backEnd/PlaceCreate'
import PlaceList from '@/components/backEnd/PlaceList'
import PlaceEdit from '@/components/backEnd/PlaceEdit'
import ClassList from '@/components/backEnd/ClassList'
import NewsList from '@/components/backEnd/NewsList'

import NotFound from '@/components/NotFound'

export default [
  {
    path: '/reg',
    component: Reg,
    meta: { auth: false }
  },

  {
    path: '/login',
    component: Login,
    meta: { auth: false }
  },


  {
    // 后台路由
    path: '/admin',
    component: Admin,
    children: [
      {
        path: '',
        redirect: 'placeList'
      },
      {
        path: 'placeList',
        component: PlaceList,
        name: '文章管理'
      },
      {
        path: 'placeCreate',
        component: PlaceCreate,
        name: '创建文章'
      },
      {
        path: 'placeEdit/:placeId',
        component: PlaceEdit,
        name: "编辑文章"
      },
      {
        path: 'classList',
        component: ClassList,
        name: '分类管理'
      },
      {
        path: 'newsList',
        component: NewsList,
        name: '新闻管理'
      }
    ]
  },
  {
    path: '*',
    component: NotFound
  }
  //

  // {path:'/404',component:NotFound}
]
