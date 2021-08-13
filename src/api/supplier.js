import request from '@/utils/request'


// 查询
export function listsupplier(query) {
    return request({
        url: '/commodity/supplierbase/list',
        method: 'get',
        params: query
    })
}

//新增
export function addsupplier(data) {
    return request({
        url: '/commodity/supplierbase',
        method: 'post',
        data
    })
}

//修改
export function editsupplier(data) {
    return request({
        url: '/commodity/supplierbase',
        method: 'put',
        data
    })
}

//删除
export function delsupplier(data) {
    return request({
        url: '/commodity/supplierbase/' + data,
        method: 'delete',
    })
}