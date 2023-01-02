import request from '@/utils/request'

// 获取Spu列表数据
// GET /admin/product/{page}/{limit}
export const reqSpuList = (page, limit, category3Id) =>
  request({
    url: `/admin/product/${page}/${limit}`,
    method: 'GET',
    params: { category3Id }
  })

// 获取spu基本信息
// GET /admin/product/getSpuById/{spuId}
export const reqSpu = (spuId) =>
  request({ url: `/admin/product/getSpuById/${spuId}`, method: 'GET' })

// 获取品牌信息
// GET /admin/product/baseTrademark/getTrademarkList
export const reqTrademarkList = () =>
  request({
    url: `/admin/product/baseTrademark/getTrademarkList`,
    method: 'GET'
  })

// 获取spu图片
// GET /admin/product/spuImageList/{spuId}
export const reqImageList = (spuId) =>
  request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: 'GET'
  })
// 获取平台全部销售属性
// /admin/product/baseSaleAttrList
export const reqBaseSaleAttrList = () =>
  request({ url: `/admin/product/baseSaleAttrList`, method: 'GET' })

// 保存spu信息
// POST  /admin/product/saveSpuInfo
// 更改spu信息
// POST /admin/product/updateSpuInfo
export const reqAddOrUpdateSpu = (spuInfo) => {
  if (spuInfo.id) {
    return request({
      url: `/admin/product/updateSpuInfo`,
      method: 'POST',
      data: spuInfo
    })
  } else {
    return request({
      url: `/admin/product/saveSpuInfo`,
      method: 'POST',
      data: spuInfo
    })
  }
}

// 删除spu
// DELETE /admin/product/deleteSpu/{spuId}
export const reqDeleteSpu = (spuId) =>
  request({ url: `/admin/product/deleteSpu/${spuId}`, method: 'DELETE' })

// 获取销售属性
// GET /admin/product/spuSaleAttrList/{spuId}
export const reqSpuSaleAttrList = (spuId) =>
  request({ url: `/admin/product/spuSaleAttrList/${spuId}`, method: 'GET' })

// POST / admin / product / saveSkuInfo
