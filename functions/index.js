const functions = require('firebase-functions')
const express = require('express')
const { Nuxt } = require('nuxt')

const app = express()
const config = {
  dev: false,
  buildDir: 'nuxt',
  publicPath: '/assets/'
}
const nuxt = new Nuxt(config)
app.use(nuxt.render)
exports.ssr = functions.https.onRequest(app)
