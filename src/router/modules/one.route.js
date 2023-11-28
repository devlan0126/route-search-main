/*
 * @Author: your name
 * @Date: 2021-08-16 09:29:14
 * @LastEditTime: 2021-08-20 10:28:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /gitee-block-chain/src/router/modules/ContractCustom.js
 */
/*
 * @Author: your name
 * @Date: 2021-07-02 10:41:54
 * @LastEditTime: 2021-08-16 09:29:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /gitee-ChainEwaytek/src/router/modules/H5Payment.js
 */

import layout from '@/layout/index.vue'

const orderTest = {
  path: '/business',
  redirect: 'business',
  component: () => layout,
  name: 'business',
  meta: {
    title: '',
    icon: 'pay'
  },
  children: [
    {
      path: '/oneRoute',
      name: 'oneRoute',
      component: () => import('@/views/demo-view/index'),
      meta: { title: '数据分析报告管理', icon: 'mondipinfo', keepAlive: true }
    },
    {
      path: '/oneRoute2',
      name: 'oneRoute2',
      component: () => import('@/views/demo-view/index'),
      meta: { title: 'oneRoute', icon: 'mondipinfo', keepAlive: true }
    },
  ]
}
export default orderTest
