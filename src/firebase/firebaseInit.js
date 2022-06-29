import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDtF5M0NSafmaTgAxuL2HRYkQDLY3Z-Gyg',
  authDomain: 'learnvue-firebase.firebaseapp.com',
  projectId: 'learnvue-firebase',
  storageBucket: 'learnvue-firebase.appspot.com',
  messagingSenderId: '558828491015',
  appId: '1:558828491015:web:6e077efe2f5f06b5a6b5a2',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp };
export default firebaseApp.firestore();
