import request from '@/utils/request'

// 查询公告列表
export function listcommodity(query) {
    return request({
        url: '/commodity/plaftorm/commodity/list',
        method: 'get',
        params: query
    })
}
//渠道
export function distributor(data) {
    return request({
        url: '/commodity/plaftorm/distributor/list',
        method: 'post',
        data
    })
}


// 查询公告详细
export function getcommodity(noticeId) {
    return request({
        url: '/system/notice/' + noticeId,
        method: 'get'
    })
}

// 新增公告
export function addcommodity(data) {
    return request({
        url: '/commodity/plaftorm/commodity',
        method: 'post',
        data: data
    })
}

// 修改公告
export function editcommodity(data) {
    return request({
        url: '/commodity/plaftorm/commodity/details',
        method: 'put',
        data: data
    })
}



// 修改公告
export function updatecommodity(data) {
    return request({
        url: '/system/notice',
        method: 'put',
        data: data
    })
}



// 删除公告
export function delcommodity(noticeId) {
    return request({
        url: '/system/notice/' + noticeId,
        method: 'delete'
    })
}

// 修改公告
export function approvalcommodity(data) {
    return request({
        url: '/commodity/plaftorm/commodity/audit',
        method: 'put',
        data: data
    })
}

export function approvalcommoditytwo(data) {
    return request({
        url: '/plaftorm/distributor/edit',
        method: 'put',
        data: data
    })
}



// 复制
export function copycommodity(data) {
    return request({
        url: '/system/notice',
        method: 'post',
        data: data
    })
}

// 所属仓库
export function warehouseapi(query) {
    return request({
        url: '/commodity/warehouseapi/list',
        method: 'get',
        params: query
    })
}

// 所属供应商
export function supplierbase(query) {
    return request({
        url: '/commodity/supplierbase/list',
        method: 'get',
        params: query
    })
}

//补全
export function completioncommodity(query) {
    return request({
        url: '/commodity/plaftorm/commodity/details',
        method: 'put',
        data: query
    })
}

export function completioncommoditytwo(query) {
    return request({
        url: '/plaftorm/distributor/audit',
        method: 'put',
        data: query
    })
}

//选品
export function chooseproduct(query) {
    return request({
        url: '/commodity/plaftorm/distributor/add',
        method: 'post',
        data: query
    })
}
//分配库存
export function allocation(query) {
    return request({
        url: '/commodity/plaftorm/commodity/allocation',
        method: 'post',
        data: query
    })
}
//渠道
export function getchannel(query) {
    return request({
        url: '/commodity/distributorbase/list',
        method: 'get',
        data: query
    })
}

//渠道端

export function putShelf(query) {
    return request({
        url: '/commodity/plaftorm/commodity/allocation',
        method: 'post',
        data: query
    })
}

export function offShelf(query) {
    return request({
        url: '/commodity/plaftorm/commodity/allocation',
        method: 'post',
        data: query
    })
}

//商品标签
export function getcommoditytype(params) {
    return request({
        url: '/commodity/label/list',
        method: 'get',
        params
    })
}
//商品分类
export function getcommodityclassify(params) {
    return request({
        url: '/commodity/classify/list ',
        method: 'get',
        params
    })
}