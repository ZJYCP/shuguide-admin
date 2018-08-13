import Reg from '@/components/backEnd/Reg';
import Login from '@/components/backEnd/Login';

import Admin from '@/components/backEnd/Admin';
import PlaceCreate from '@/components/backEnd/PlaceCreate'
import PlaceList from '@/components/backEnd/PlaceList'
import PlaceEdit from '@/components/backEnd/PlaceEdit'
import ClassList from '@/components/backEnd/ClassList'
import NewsList from '@/components/backEnd/NewsList'
import Board from '@/components/backEnd/Board'

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
    path: '/',
    component: Admin,
    children: [
      {
        path: '',
        redirect: 'board'
      },
      {
        path: 'placeList',
        component: PlaceList,
        name: '地点管理'
      },
      {
        path: 'placeCreate',
        component: PlaceCreate,
        name: '创建地点'
      },
      {
        path: 'placeEdit/:placeId',
        component: PlaceEdit,
        name: "编辑地点"
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
      },
      {
        path: 'board',
        component: Board,
        name: '主页面板'
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
