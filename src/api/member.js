import request from '@/utils/request'

export default {
    //获取会员列表数据
    getList() {
        return request({
            url: '/member/list',
            methods: 'get'
        })
    },

    //分页搜索方法
    search(page, size, searchMap) {
        return request({
            url: `/member/list/search/${page}/${size}`,
            method: 'post',
            data: searchMap
        })
    },

    //添加会员pojo方法
    add(pojo) {
        return request({
            url: `/member`,
            method: 'post',
            data: pojo
        })
    },

    //查询
    getById(id) {
        return request({
            url: `/member/${id}`,
            method: 'get'
        })
    },

    //更新
    updata(pojo) {
        return request({
            url: `/member/${pojo.id}`,
            method: 'put',
            data: pojo

        })
    },

    //删除数据
    deleteById(id){
        return request({
            url:`/member/${id}`,
            method:'delete'
        })
    }
}