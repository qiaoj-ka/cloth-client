import request from '@/utils/request'
const api_name = 'cloth'
export default{
    getAllclothList(){
        return request({
            url:`/${api_name}/getallclothlist`,
            method:'get'
        })
    },
    getclothListByCondition(pojo){
        return request({
            url:`/${api_name}/getclothlistbycondition`,
            method:'post',
            data:pojo
        })
    },
    addcloth(pojo){
        return request({
            url:`/${api_name}/addcloth`,
            method:'post',
            data:pojo
        })
    },
    updatecloth(pojo){
        return request({
            url:`/${api_name}/updatecloth`,
            method:'post',
            data:pojo
        })
    },
    deletecloth(id){
        return request({
            url:`/${api_name}/deletecloth?clothId=`+id,
            method:'delete',
        })
    },
    
}







