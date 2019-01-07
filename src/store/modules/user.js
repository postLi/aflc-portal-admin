import { login, logout, getInfo, getAccessInfo } from '@/api/login'
import { getToken, setToken, removeToken, setUsername, setOrgId, getLogin, setLogin, setUserInfo, removeUserInfo, removeUsername, removeOrgId } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    username: '',
    company: '',
    avatar: '',
    roles: [],
    otherinfo: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_USERNAME: (state, username) => {
      state.username = username
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_COMPANY: (state, company) => {
      state.company = company
    },
    SET_OTHERINFO: (state, otherinfo) => {
      state.otherinfo = otherinfo
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password, userInfo.accNum).then(response => {
          const data = response
          setToken(data.access_token)
          setUsername(username)
          setOrgId(userInfo.accNum)
          setLogin(userInfo)
          commit('SET_TOKEN', data.access_token)
          commit('SET_USERNAME', username)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    FeLogin2({ commit }, tokenObject) {
      return new Promise((resolve, reject) => {
        setToken(tokenObject.access_token)
        commit('SET_TOKEN', tokenObject.access_token)
        // console.log('step0000', tokenObject)
        getAccessInfo().then(data => {
          // console.log('step1111')
          const mapObj = {
            'aflc-1': 'AF00102',
            'aflc-2': 'AF00101',
            'aflc-5': 'AF00107'
          }

          const userInfo = {
            'loginType': 'sso',
            'accNum': 'aflc-5',
            'username': data.mobile + '|aflc-5',
            'password': '',
            'memberType': 'AF00107',
            'mobile': data.mobile
          }
          setUsername(data.userName)
          setOrgId(userInfo.accNum)
          setLogin(userInfo)
          commit('SET_USERNAME', data.userName)

          data.rolesIdList = [userInfo.memberType]
          commit('SET_ROLES', data.rolesIdList)
          commit('SET_NAME', data.contactsName)
          setUsername(userInfo.username)
          commit('SET_COMPANY', data.companyName)
          // setOrgId(data.orgid)
          commit('SET_AVATAR', require('../../assets/role.png'))
          commit('SET_OTHERINFO', data)

          setUserInfo(data)
          // console.log(data,'step2222setUserInfosetUserInfosetUserInfo')

          resolve({ data })
        }).catch(err => {
          reject(err)
        })
        // console.log('feLogin:', tokenObject)
        /*
        const userInfo = {
          'accNum': tokenObject.login_type,
          'username': tokenObject.login_mobile + '|' + tokenObject.login_type,
          'password': '',
          'memberType': mapObj[tokenObject.login_type] || '',
          'mobile': tokenObject.login_mobile
        }
        setToken(tokenObject.access_token)
        setUsername(tokenObject.login_mobile)
        setOrgId(tokenObject.login_type)
        setLogin(userInfo)
        commit('SET_TOKEN', tokenObject.access_token)
        commit('SET_USERNAME', userInfo.username)
        resolve() */
      })
    },
    /**
     * 前端设置token信息
     * @param {*} param0 vue对象
     * @param {*} tokenObject
     * {
      login_type: to.query.login_type,
      access_token: to.query.access_token,
      login_mobile: to.query.login_mobile
    }
     */
    FeLogin({ commit }, tokenObject) {
      return new Promise((resolve, reject) => {
        // console.log('feLogin:', tokenObject)
        const mapObj = {
          'aflc-1': 'AF00102',
          'aflc-2': 'AF00101',
          'aflc-5': 'AF00107'
        }
        const userInfo = {
          'accNum': tokenObject.login_type,
          'username': tokenObject.login_mobile + '|' + tokenObject.login_type,
          'password': '',
          'memberType': mapObj[tokenObject.login_type] || '',
          'mobile': tokenObject.login_mobile
        }
        setToken(tokenObject.access_token)
        setUsername(tokenObject.login_mobile)
        setOrgId(tokenObject.login_type)
        setLogin(userInfo)
        commit('SET_TOKEN', tokenObject.access_token)
        commit('SET_USERNAME', userInfo.username)
        resolve()
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        const param = getLogin()
        // console.log(param,'paramparamparamparamparam',this.otherinfo);
// let ismobile = this.otherinfo
        getInfo(param.mobile, param.memberType).then(response => {
          const data = response.data
          // data.rolesIdList = data.rolesId.split(',')
          data.rolesIdList = [param.memberType]
          commit('SET_ROLES', data.rolesIdList)
          commit('SET_NAME', data.contactsName)
          commit('SET_USERNAME', param.username)
          setUsername(param.username)
          commit('SET_COMPANY', data.companyName)
          // setOrgId(data.orgid)
          commit('SET_AVATAR', require('../../assets/role.png'))
          commit('SET_OTHERINFO', data)
          setUserInfo(data)
          // console.log(data,'dataaaaaaaaaaaaaaaaaaaaa')
          resolve({ data })
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        removeUserInfo()
        removeOrgId()
        removeUsername()
        resolve()
      })
    }
  }
}

export default user
