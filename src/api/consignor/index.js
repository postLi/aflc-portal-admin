import fetch from '@/utils/fetch'

const baseUrl = 'aflc-uc' ;


//认证货主
export function identifyShipper(data){
    return fetch.axios({
      url: '/'+baseUrl+'/usercenter/aflcShipper/v1/update',
      method: 'PUT',
      data:data
    })
  }


