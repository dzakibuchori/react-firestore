import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

const settings = {timestampInSnapshots: true};

const firebaseConfig  = {
    apiKey: "AIzaSyDt-9miyUiO_ZUmdf6Q0fTfnK3uv0y0czs",
    authDomain: "djamware-ab8b9.firebaseapp.com",
    projectId: "djamware-ab8b9",
    storageBucket: "djamware-ab8b9.appspot.com",
    messagingSenderId: "619450652369",
    appId: "1:619450652369:web:0b5f05e8213d74e78e57f0"
};

firebase.initializeApp(firebaseConfig);

firebase.firestore().settings(settings);

export default firebase;
