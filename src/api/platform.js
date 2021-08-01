import request from '@/utils/request';

// 查询
export function distributorbaselist(query) {
    return request({
        url: '/commodity/distributorbase/list',
        method: 'get',
        params: query
    })
}

export function adddistributor(data) {
    return request({
        url: '/commodity/distributorbase',
        method: 'post',
        data
    })
}

export function editdistributor(data) {
    return request({
        url: '/commodity/distributorbase',
        method: 'put',
        data
    })
}

export function deldistributor(data) {
    return request({
        url: `/commodity/distributorbase/` + data,
        method: 'delete',
    })
}