<template>
  <div class="container">
    <div class="content is-small">
      <section class="section no-top-pad">
        <h1>マイページ</h1>
        <hr />
        <div class="is-centered is-mobile">
          <div class="box">
            <p>{{ user.name }}</p>
            <p>{{ user.email }}</p>
          </div>
          <p class="button is-outlined" @click="logOut">ログアウト</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      if (this.$store.getters.user) {
        return this.$store.getters.user
      }

      return {
        name: '',
        email: ''
      }
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('logOut')
      this.$router.push('/')
    }
  }
}
</script>
