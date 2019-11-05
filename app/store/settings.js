export const state = () => ({
  settings: []
})

export const actions = {
  storeSetting({ commi, state, dispatch }, payload) {
    const db = this.$fireApp.firestore()
    const settingRef = db.collection('settings').doc(payload.userId)
    const pushData = {}
    pushData[payload.settingName] = {
      settingName: payload.settingName,
      settingValue: payload.settingValue
    }

    settingRef
      .set({ settings: pushData }, { merge: true })
      .then(() => {})
      // eslint-disable-next-line no-console
      .catch((error) => console.log(error))
  },
  async fetchSettingsAll({ commit, state }, userId) {
    const db = this.$fireApp.firestore()

    const settings = []
    await db
      .collection('settings')
      .doc(userId)
      .get()
      .then((doc) => {
        if (doc.data() && doc.data().settings) {
          const settingObj = doc.data().settings
          for (const key of Object.keys(settingObj)) {
            settings.push(settingObj[key])
          }
        }
      })

    const storeData = []
    for (let i = 0; i < settings.length; i++) {
      const setting = settings[i]
      storeData.push({
        settingName: setting && setting.settingName,
        settingValue: setting && setting.settingValue
      })
    }
    commit('setSettingsAll', storeData)
  }
}

export const mutations = {
  setSettingsAll(state, payload) {
    state.settings = payload
  }
}

export const getters = {
  settingsAll(state) {
    return state.settings
  }
}
