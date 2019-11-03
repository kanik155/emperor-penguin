<template>
  <div>
    <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img src="https://bulma.io/images/bulma-logo-white.png" />
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
          <nuxt-link class="navbar-item" to="/settings">Settings</nuxt-link>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">About</a>
            <div class="navbar-dropdown">
              <nuxt-link class="navbar-item" to="/tos">利用規約</nuxt-link>
              <nuxt-link class="navbar-item" to="/privacy-policy">プライバシーポリシー</nuxt-link>
              <hr class="navbar-divider" />
              <nuxt-link class="navbar-item" to="/contact">お問い合わせ</nuxt-link>
            </div>
          </div>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <form v-if="!isLogin" @submit.prevent="onLoginWithGoogle">
              <div class="field">
                <div class="control">
                  <button class="button is-light" :class="{ 'is-loading': busy }" :disabled="busy">
                    <span class="icon">
                      <font-awesome-icon :icon="['fab', 'google']" />
                    </span>
                    <span>Login With Google</span>
                  </button>
                </div>
              </div>
            </form>
            <nuxt-link v-else to="/mypage">
              <figure class="image is-32x32">
                <img id="login-user-icon" class="is-rounded" :src="photoURL" />
              </figure>
            </nuxt-link>
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
import apiJobMixin from '@/mixins/apiJobMixin'

export default {
  mixins: [apiJobMixin],
  computed: {
    isLogin() {
      const loggedIn = this.$store.getters.loginStatus

      if (loggedIn) {
        return true
      } else {
        return false
      }
    },
    userName() {
      return this.$store.getters.user ? this.$store.getters.user.name : ''
    },
    photoURL() {
      return this.$store.getters.user ? this.$store.getters.user.photoURL : ''
    }
  },
  created() {
    this.$fireApp.auth().onAuthStateChanged((user) => {
      if (user) {
        const authUser = {
          id: user.uid,
          email: user.email,
          name: user.displayName,
          photoURL: user.photoURL
        }
        this.setUser(authUser)
      }
    })
  },
  methods: {
    ...mapMutations({
      setUser: 'setUser'
    }),
    onLoginWithGoogle() {
      this.$store.dispatch('loginUserWithGoogle')
    },
    jobsDone() {
      this.removeErrors()
      this.$router.replace('/')
    }
  }
}
</script>

<style lang="scss" scoped>
#login-user-icon {
  max-height: none !important;
}
</style>
