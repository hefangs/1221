import request from '@/utils/request'

// GET /admin/product/list/{page}/{limit}
export const reqSkuList = (page, limit) =>
  request({ url: `/admin/product/list/${page}/${limit}`, method: 'GET' })

// 上架
// GET /admin/product/onSale/{skuId}
export const reqOnSale = (skuId) =>
  request({ url: `/admin/product/onSale/${skuId}`, method: 'GET' })
// 下架
// GET /admin/product/cancelSale/{skuId}
export const reqCancelSale = (skuId) =>
  request({ url: `/admin/product/cancelSale/${skuId}`, method: 'GET' })

// // POST /admin/product/updateSkuInfo
// export const reqUpdateSkuInfo = (data) =>
//   request({ url: `/admin/product/updateSkuInfo`, method: 'GET', data })

// 获取sku详情
// GET /admin/product/getSkuById/{skuId}
export const reqSkuInfo = (skuId) =>
  request({ url: `/admin/product/getSkuById/${skuId}`, method: 'GET' })

// 删除sku
// DELETE /admin/product/deleteSku/{skuId}
export const reqDeleteSku = (skuId) =>
  request({ url: `/admin/product/deleteSku/${skuId}`, method: 'DELETE' })
