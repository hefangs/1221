import request from '@/utils/request'
// 获取品牌列表
// GET /admin/product/baseTrademark/{page}/{limit}
export const reqTradeMarkList = (page, limit) =>
  request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: 'GET'
  })
// 新增品牌和修改品牌
// POST /admin/product/baseTrademark/save
// PUT /admin/product/baseTrademark/update

export const reqAddOrUpdateTradeMark = (tradeMark) => {
  if (tradeMark.id) {
    return request({
      url: `/admin/product/baseTrademark/update`,
      method: 'PUT',
      data: tradeMark
    })
  } else {
    return request({
      url: `/admin/product/baseTrademark/save`,
      method: 'POST',
      data: tradeMark
    })
  }
}
// 删除品牌
// DELETE /admin/product/baseTrademark/remove/{id}
export const reqDeleteTradeMark = (id) =>
  request({
    url: `/admin/product/baseTrademark/remove/${id}`,
    method: 'DELETE'
  })
