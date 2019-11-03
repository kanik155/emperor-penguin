<template>
  <div class="container">
    <div class="content is-small">
      <section class="section no-top-pad">
        <h1>お問合せ</h1>
        <hr />

        <div class="columns is-centered is-mobile">
          <div class="column is-half-desktop is-full-mobile is-full-tablet">
            <validation-observer v-slot="{ valid }">
              <form @submit.prevent="onSubmmit">
                <div class="field">
                  <label class="label">お名前</label>
                  <div class="control">
                    <validation-provider v-slot="{ errors }" rules="required|min:4" name="お名前">
                      <input v-model="displayName" class="input" type="text" placeholder="例）山田 太郎" />
                      <p v-show="errors.length" class="help is-danger">{{ errors[0] }}</p>
                    </validation-provider>
                  </div>
                </div>
                <div class="field">
                  <label class="label">メールアドレス</label>
                  <div class="control">
                    <validation-provider v-slot="{ errors }" rules="required|email" name="メールアドレス">
                      <input v-model="email" class="input" type="email" placeholder="例）aaa@example.com" />
                      <p v-show="errors.length" class="help is-danger">{{ errors[0] }}</p>
                    </validation-provider>
                  </div>
                </div>
                <div class="field">
                  <label class="label">お問合せ内容</label>
                  <div class="control">
                    <validation-provider v-slot="{ errors }" rules="required" name="お問合せ内容">
                      <textarea
                        v-model="message"
                        class="textarea"
                        placeholder="お問合せの内容をご入力ください。"
                        rows="6"
                      />
                      <p v-show="errors.length" class="help is-danger">{{ errors[0] }}</p>
                    </validation-provider>
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <button class="button is-primary" :class="{ 'is-loading': busy }" :disabled="(busy, !valid)">
                      送信
                    </button>
                  </div>
                </div>
              </form>
            </validation-observer>
          </div>
        </div>
      </section>
    </div>
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
      message: ''
    }
  },
  methods: {
    onSubmmit() {
      const submmitData = {
        displayName: this.displayName,
        email: this.email,
        message: this.message
      }
      this.$store.dispatch('inquiry', submmitData)
    },
    jobsDone() {
      // apiJobMixinで叩かれる
      this.removeErrors()
      // アカウント登録が完了したのでルートパスにリダイレクトします。
      this.$router.replace('/')
    }
  }
}
</script>
