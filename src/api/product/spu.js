import request from '@/utils/request'

// 获取Spu列表数据
// GET /admin/product/{page}/{limit}
export const reqSpuList = (page, limit, category3Id) =>
  request({
    url: `/admin/product/${page}/${limit}`,
    method: 'GET',
    params: { category3Id }
  })
