import request from '@/utils/request'

// 查询公告列表
export function listclassify(query) {
    return request({
        url: '/commodity/classify/list',
        method: 'get',
        params: query
    })
}

export function addclassify(data) {
    return request({
        url: '/commodity/classify',
        method: 'post',
        data
    })
}

export function editclassify(data) {
    return request({
        url: '/commodity/classify',
        method: 'put',
        data
    })
}

export function delclassify(data) {
    return request({
        url: `/commodity/classify/` + data,
        method: 'delete',
    })
}