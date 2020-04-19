/****
 * 首页接口请求模块
 * 
 */

import $http from '../utils/request'

/**
 * 获取轮播图数据接口
 */
export function getSwiperData() {
  return $http({
    url: 'home/swiperdata'
  })
}

/**
 * 获取导航菜单数据接口
 */
export function getNavsData() {
  return $http({
    url: 'home/catitems'
  })
}

/** 
 * 获取楼层数据接口
 */
export function getFloorData() {
  return $http({
    url: 'home/floordata'
  })
}