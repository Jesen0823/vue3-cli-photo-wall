import { createStore } from 'vuex'
import { getUserIp } from '@/api/request'

export const useAppStore = () => {
  const store = createStore({
    state: {
      user: {}
    },
    getters: {
      getUserIp: (state) => state.user?.ip || '0'
    },
    mutations: {
      saveUser(state, user) {
        state.user = user
      }
    },
    actions: {
      async fetchUser({ commit }) {
        try {
          const result = await getUserIp()
          commit('saveUser', { ip: result.ip })
        } catch (error) {
          console.error('获取用户信息失败:', error)
          commit('saveUser', { ip: '0' })
        }
      }
    }
  })
  return store
}

export default useAppStore
