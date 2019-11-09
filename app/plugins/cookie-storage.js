import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
import cookie from 'cookie'

export default ({ store, req, isDev }) => {
  createPersistedState({
    key: '__session',
    paths: ['user'],
    storage: {
      getItem: (key) => cookie.parse(req.headers.cookie || '')[key],
      setItem: (key, value) =>
        Cookies.set(key, value, {
          expires: 365,
          secure: !isDev,
          sameSite: 'lax'
        }),
      removeItem: (key) => Cookies.remove(key)
    }
  })(store)
}
