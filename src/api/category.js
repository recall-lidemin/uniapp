/***
 *  分类页面接口模块 
 * 
 */
import $http from '../utils/request'

/**
 * 获取所有分类
 */
export function getCategory(){
  return $http({
    url: 'categories',
    method: 'get'
  })
}