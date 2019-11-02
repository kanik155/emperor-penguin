<template>
  <div>
    <section class="section no-top-pad">
      <h5 class="title is-5">ログイン</h5>
      <hr />

      <div class="columns is-centered is-mobile">
        <div class="column is-half-desktop is-full-mobile is-full-tablet">
          <form @submit.prevent="onLoginWithGoogle">
            <div class="field">
              <div class="control">
                <button class="button is-info" :class="{ 'is-loading': busy }" :disabled="busy">
                  Login With Google
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import apiJobMixin from '@/mixins/apiJobMixin'

export default {
  mixins: [apiJobMixin],
  data() {
    return {
      displayName: '',
      email: '',
      password: ''
    }
  },
  methods: {
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
