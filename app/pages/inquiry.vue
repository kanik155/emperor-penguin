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
                  <div class="control-material">
                    <validation-provider v-slot="{ errors }" rules="required|min:4" name="お名前">
                      <input v-model="displayName" class="material-input" type="text" required />
                      <span class="material-highlight"></span>
                      <span class="bar"></span>
                      <label>お名前</label>
                      <p v-show="errors.length" class="help is-danger">{{ errors[0] }}</p>
                    </validation-provider>
                  </div>
                </div>
                <div class="field">
                  <div class="control-material">
                    <validation-provider v-slot="{ errors }" rules="required|email" name="メールアドレス">
                      <input v-model="email" class="material-input" type="text" required />
                      <span class="material-highlight"></span>
                      <span class="bar"></span>
                      <label>メールアドレス</label>
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
                <div class="field is-grouped is-grouped-right">
                  <div class="control">
                    <button
                      class="button is-primary"
                      :class="{ 'is-loading': isSubmitting }"
                      :disabled="(isSubmitting, !valid)"
                    >
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
import firebase from 'firebase/app'
import 'firebase/functions'

export default {
  data() {
    return {
      displayName: '',
      email: '',
      message: '',
      isSubmitting: false
    }
  },
  methods: {
    onSubmmit() {
      const mailer = firebase.functions().httpsCallable('sendMail')

      this.isSubmitting = true
      mailer({ displayName: this.displayName, email: this.email, message: this.message }).then(() => {
        this.$router.replace('/thanks')
      })
      this.isSubmitting = false
    }
  }
}
</script>
