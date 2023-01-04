import request from '@/utils/request'

// GET /admin/product/list/{page}/{limit}
export const reqSkuList = (page, limit) =>
  request({ url: `/admin/product/list/${page}/${limit}`, method: 'GET' })
