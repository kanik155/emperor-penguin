import Vue from 'vue'
import { ValidationProvider, ValidationObserver, localize, extend } from 'vee-validate'
import ja from 'vee-validate/dist/locale/ja.json'
import { required, min, email } from 'vee-validate/dist/rules'

extend('required', required)
extend('email', email)
extend('min', min)

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
localize('ja', ja)
