import request from '@/utils/request'

// 查询
export function listorder(query) {
    return request({
        url: '/commodity/header/list',
        method: 'get',
        params: query
    })
}