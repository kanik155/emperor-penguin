import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

export default (context, inject) => {
  let fireApp
  if (!firebase.apps.length) {
    fireApp = firebase.initializeApp({
      apiKey: 'AIzaSyBa959MkaiHNe9qC5G-_gal0eeZTDt08Mw',
      authDomain: 'emperor-penguin-8920a.firebaseapp.com',
      databaseURL: 'https://emperor-penguin-8920a.firebaseio.com',
      projectId: 'emperor-penguin-8920a',
      storageBucket: 'emperor-penguin-8920a.appspot.com',
      messagingSenderId: '400155893349',
      appId: '1:400155893349:web:e2fabdf51f2c19668f308c',
      measurementId: 'G-B3BERY63L2'
    })
  } else {
    fireApp = firebase.app()
  }

  inject('fireApp', fireApp)
  inject('google_auth_provider', new firebase.auth.GoogleAuthProvider())
}
