import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// Replace this with your own config details

var config = {
    apiKey: "AIzaSyAqDaRJbbdO8CsmtJqrnoN4LqaQdI0x1Z0",
    authDomain: "blog-lesn.firebaseapp.com",
    databaseURL: "https://blog-lesn.firebaseio.com",
    projectId: "blog-lesn",
    storageBucket: "blog-lesn.appspot.com",
    messagingSenderId: "41693666933"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });
const storage = firebase.storage();

export {
    storage,
    firebase as default
}