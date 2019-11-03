// ssr
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

// sendMail
const nodemailer = require('nodemailer')
const gmailEmail = functions.config().gmail.email
const gmailPassword = functions.config().gmail.password
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
})

const adminContents = (data) => {
  return `以下内容でホームページよりお問い合わせを受けました。

--------------------
お名前：
${data.displayName}

メールアドレス：
${data.email}

お問合せ内容：
${data.message}
--------------------
`
}

exports.sendMail = functions.https.onCall((data, context) => {
  const email = {
    from: gmailEmail,
    to: data.email,
    subject: 'お問合わせ',
    text: adminContents(data)
  }
  mailTransport.sendMail(email, (err, info) => {
    if (err) {
      // eslint-disable-next-line no-console
      return console.log(err)
    }
    // eslint-disable-next-line no-console
    return console.log('success')
  })
})
