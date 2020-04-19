/****
 * 封装接口请求模块
 * 
 */

 const $http = async (option) => {
  const baseUrl = 'https://www.uinav.com/api/public/v1/'
  const res = await uni.request({
    url: baseUrl + option.url,
    data: option.data ? option.data : {},
    header: option.header ? option.header : {},
    method: option.method
  })
  return res[1].data
 }

 export default $http
 