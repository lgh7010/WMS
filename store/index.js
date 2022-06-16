import vuex from 'vuex'

const store = {
  state: {
    jsonFileData: []
  },
  getters: {
    jsonFileData: state => {
      return state.jsonFileData
    }
  },
  mutations: {
    jsonFileData (state, jsonFileData) {
      state.jsonFileData = jsonFileData
    }
  }
}

export default function() {
  return new vuex.Store(store)
}
