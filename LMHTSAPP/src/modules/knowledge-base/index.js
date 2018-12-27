const knowledgeBase = {
    namespaced: true,
    name:"knowledge-base",
    state() {
      return {
        count: 0
      }
    },
    getters: {
      getCount: (state, getters, rootSate) => {
        return state.count
      }
    },
    mutations: {
      setCount(state, number) {
        state.count = number
      }
    }
  }
  export default knowledgeBase
