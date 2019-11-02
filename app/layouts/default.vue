<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img src="https://bulma.io/images/bulma-logo.png" />
        </a>

        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <nuxt-link class="navbar-item" to="/">Mypage</nuxt-link>
          <nuxt-link class="navbar-item" to="/">Settings</nuxt-link>
          <div class="navbar-item has-dropdown is-hoverable">
            <nuxt-link class="navbar-link" to="/">About</nuxt-link>
            <div class="navbar-dropdown">
              <nuxt-link class="navbar-item" to="/">利用規約</nuxt-link>
              <nuxt-link class="navbar-item" to="/">プライバシーポリシー</nuxt-link>
              <hr class="navbar-divider" />
              <nuxt-link class="navbar-item" to="/">お問い合わせ</nuxt-link>
            </div>
          </div>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <nuxt-link v-if="!isLogin" class="button is-light" to="/login">ログイン</nuxt-link>
              <nuxt-link v-else class="button is-light" to="/mypage">{{ userName }}さん</nuxt-link>
              <nuxt-link class="button is-primary" to="/signup">
                <strong>アカウント作成</strong>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="main-body">
      <nuxt />
    </div>
    <footer class="footer">
      <div>
        <div class="content has-text-centered">
          <p>&copy; emperor-penguin</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  computed: {
    isLogin() {
      // テンプレート側でログイン状態を判定したいのでcomputedを作成
      const loggedIn = this.$store.getters.loginStatus
      // eslint-disable-next-line no-console
      console.log(loggedIn)

      if (loggedIn) {
        return true
      } else {
        return false
      }
    },
    userName() {
      // storeからのユーザーネーム取得処理
      return this.$store.getters.user ? this.$store.getters.user.name : ''
    }
  },
  created() {
    // pluginsでinjectしたfirebaseは次のように呼び出せます
    // onAuthStateChangedでログイン状態を判定できます
    this.$fireApp.auth().onAuthStateChanged((user) => {
      if (user) {
        const authUser = {
          id: user.uid,
          email: user.email,
          name: user.displayName
        }
        this.setUser(authUser)
      }
    })
  },
  methods: {
    ...mapMutations({
      setUser: 'setUser'
    })
  }
}
</script>
