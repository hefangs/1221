import request from '@/utils/request'
// 获取品牌列表
// GET /admin/product/baseTrademark/{page}/{limit}
export const reqTradeMarkList = (page, limit) =>
  request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: 'GET'
  })
