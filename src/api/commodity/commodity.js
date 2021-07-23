import request from '@/utils/request'

// 查询公告列表
export function listcommodity(query) {
    return request({
        url: '/commodity/plaftorm/commodity/list',
        method: 'get',
        params: query
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

// 复制
export function copycommodity(data) {
    return request({
        url: '/system/notice',
        method: 'post',
        data: data
    })
}