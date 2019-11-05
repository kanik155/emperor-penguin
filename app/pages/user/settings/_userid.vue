<template>
  <div class="container">
    <div class="content is-small">
      <section class="section no-top-pad">
        <h1>設定</h1>
        <hr />

        <div class="field">
          <input id="switch1" v-model="setting1" type="checkbox" name="switch1" class="switch" @change="onSwitch1" />
          <label for="switch1">設定1</label>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      setting1: this.$store.getters['settings/settingsAll'][0].settingValue
    }
  },
  async fetch({ app, route, store }) {
    const userId = route.params.userid
    await store.dispatch('settings/fetchSettingsAll', userId)
  },
  methods: {
    onSwitch1() {
      this.$store.dispatch('settings/storeSetting', {
        userId: this.$store.getters.user.id,
        settingName: 'setting1',
        settingValue: this.setting1
      })
    }
  }
}
</script>
