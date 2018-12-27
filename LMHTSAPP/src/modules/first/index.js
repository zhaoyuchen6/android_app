const First = {
  namespaced: true,
  name:"first",
  state() {
      return {
          userName: '',
          idType: '',
          idNO: '',
          count:0
      }
  },
  getters: {
      getValue: (state, getters, rootState) => {
          return {
             userName: state.userName,idType:state.idType,idNO:state.idNO
          }
      },
      getCount: (state, getters, rootState) => {
        return state.count
    }
  },
  mutations: {
      setValue(state, tradeInfo) {
          state.userName = tradeInfo.userName;
          state.idType = tradeInfo.idType;
          state.idNO = tradeInfo.idNO;
      },
      setCount(state, num) {
        state.count = num;
    }
  }
}
export default First
