import request from '@/utils/request'


// 查询
export function listwarehouse(query) {
    return request({
        url: '/commodity/warehouseapi/list',
        method: 'get',
        params: query
    })
}

//新增
export function addwarehouse(data) {
    return request({
        url: '/commodity/warehouseapi',
        method: 'post',
        data
    })
}

//修改
export function editwarehouse(data) {
    return request({
        url: '/commodity/warehouseapi',
        method: 'put',
        data
    })
}

//删除
export function delwarehouse(data) {
    return request({
        url: '/commodity/warehouseapi/' + data,
        method: 'delete',
    })
}