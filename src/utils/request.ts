import axios from 'axios'
// import Cookies from 'js-cookie'
// import { Message, Notification } from 'element-ui'
// import store from '@/store'
// import { getToken , removeToken} from '@/utils/auth'
// import router from '@/router'

// create an axios instance
const service = axios.create({
  baseURL: '/', // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 100000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // if (getToken()) {
    //   config.headers['token'] = getToken()
    // }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (!res.success && !response.config['responseType']) {
      // if (!res.success && !response.config['responseType']&& res.code !== '0043' && res.code !== '0044'&& res.code !== '0042') {
      // Message.closeAll()

      // if(res.code === '2002'){
      //   Message.error('此区域暂不支持标注')
      // }else{
      //   Message.error(res.msg || '网络错误，请稍后重试')
      // }
      // if(res.code == '401'){
      //   removeToken()
      //   router.push('/login')
      // }

      // Cookies.set('errorCode', res.code)
      return Promise.reject(res.msg || '') 
    }  else{
      // if(token)
    //  console.log('res',res);
    //  console.log('response',response);
    
    return res

    }
  },
  async error => {
    // console.log('err: ' + error.response.status, '===', error.response.status == 403) // for debug
    // let errorTest
    // if (error.response.status === 403) {
    //   Message.closeAll()
    //   errorTest = '登录过期，请重新登录'
    //   Message({
    //     message: '登录过期，请重新登录',
    //     type: 'error',
    //     duration: 3 * 1000
    //   })
    //   await store.dispatch('user/removeInfo')
    //   // await store.dispatch('permission/removeRoute')
    //   sessionStorage.removeItem('enterpriseInfo')
    //   router.push(`/login`)
    // } else if (error.response.status === 504) {
    //   errorTest = '系统繁忙，请稍后尝试'
    //   Message.closeAll()
    //   Notification.error({
    //     message: '系统繁忙，请稍后尝试',
    //     duration: 0
    //   })
    // } else if (error.response.status === 401) {
    //   errorTest = '没有操作权限'
    //   Message.closeAll()
    //   Notification.error({
    //     message: '没有操作权限',
    //     duration: 0
    //   })
    // }
    return Promise.reject( error)
  }
)

export default service
