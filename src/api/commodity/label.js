import request from '@/utils/request'

// 查询公告列表
export function listlabel(query) {
    return request({
        url: '/commodity/label/list',
        method: 'get',
        params: query
    })
}

export function addlabel(data) {
    return request({
        url: '/commodity/label',
        method: 'post',
        data
    })
}

export function editlabel(data) {
    return request({
        url: '/commodity/label',
        method: 'put',
        data
    })
}

export function dellabel(data) {
    return request({
        url: `/commodity/label/` + data,
        method: 'delete',
    })
}