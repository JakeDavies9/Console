import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};
firebase.initializeApp(config);
const Timestamp = firebase.firestore.FieldValue.serverTimestamp()
firebase.firestore().settings({ timestampsInSnapshots: true });

export { firebase, Timestamp } 