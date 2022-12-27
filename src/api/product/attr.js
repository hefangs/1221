import request from '@/utils/request'
// 获取一级分类数据
// GET /admin/product/getCategory1
export const reqCategory1List = () =>
  request({ url: `/admin/product/getCategory1`, method: 'GET' })
// 获取二级分类数据
// GET /admin/product/getCategory2/{category1Id}

export const reqCategory2List = (category1Id) =>
  request({ url: `admin/product/getCategory2/${category1Id}`, method: 'GET' })

// 获取三级分类数据
// GET /admin/product/getCategory3/{category2Id}
export const reqCategory3List = (category2Id) =>
  request({ url: `/admin/product/getCategory3/${category2Id}`, method: 'GET' })

// 获取平台属性接口
// GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrList = (category1Id, category2Id, category3Id) =>
  request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: 'GET'
  })
// 添加属性与属性值
// POST /admin/product/saveAttrInfo
export const reqAddOrUpdateAttr = (data) =>
  request({ url: `/admin/product/saveAttrInfo`, method: 'POST', data })

// 删除属性
// DELETE /admin/product/deleteAttr/{attrId}
export const reqDeleteAttr = (attrId) =>
  request({ url: `/admin/product/deleteAttr/${attrId}`, method: 'DELETE' })
