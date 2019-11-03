import * as firebase from 'firebase'

export const state = () => ({
  user: null,
  error: null,
  busy: false,
  jobDone: false
})

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
  setError(state, payload) {
    state.error = payload
  },
  clearError(state) {
    state.error = null
  },
  setBusy(state, payload) {
    state.busy = payload
  },
  setJobDone(state, payload) {
    state.jobDone = payload
  }
}

export const actions = {
  loginUserWithGoogle({ commit }, payload) {
    commit('setBusy', true)
    commit('clearError')
    let newUser = null
    const db = this.$fireApp.firestore()
    this.$fireApp
      .auth()
      .signInWithPopup(this.$google_auth_provider)
      .then((data) => {
        newUser = data.user
        return newUser.updateProfile({ displayName: data.displayName }).then(() => {
          const authUser = {
            id: data.user.uid,
            email: data.user.email,
            name: data.user.displayName,
            photoURL: data.user.photoURL
          }
          commit('setUser', authUser)
          commit('setJobDone', true)
          commit('setBusy', false)
        })
      })
      .then(() => {
        const userRef = db.collection('users').doc(newUser.uid)
        return userRef.set({
          email: newUser.email,
          name: newUser.displayName,
          photoURL: newUser.photoURL,
          createdAt: new Date().toISOString()
        })
      })
      .catch((error) => {
        commit('setBusy', false)
        commit('setError', error)
      })
  },
  logOut({ commit }) {
    this.$fireApp.auth().signOut()
    commit('setUser', null)
  },
  inquiry({ commit }, payload) {
    commit('setBusy', true)

    const mailer = firebase.functions().httpsCallable('sendMail')

    mailer({ displayName: payload.displayName, email: payload.email, message: payload.message })
      .then(() => {
        commit('setBusy', false)
      })
      .catch((error) => {
        commit('setBusy', false)
        commit('setError', error)
      })
  }
}

export const getters = {
  user(state) {
    return state.user
  },
  loginStatus(state) {
    return state.user !== null && state.user !== undefined
  },
  error(state) {
    return state.error
  },
  busy(state) {
    return state.busy
  },
  jobDone(state) {
    return state.jobDone
  }
}
