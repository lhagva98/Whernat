import firebase from 'react-native-firebase';

export function loginApi({ email, password }) {
    firebase.auth().signInWithEmailAndPassword(email, password)
}

export function subscribeToAuthChanges(authStateChanged) {
  firebase.auth().onAuthStateChanged((user) => {
    authStateChanged(user);
  })
}