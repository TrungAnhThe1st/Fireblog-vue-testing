import firebase from "firebase/app"
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA88ZGCuieOH6uXJGgjrXJAWL4c2uce2Ck",
    authDomain: "fireblog-5a910.firebaseapp.com",
    projectId: "fireblog-5a910",
    storageBucket: "fireblog-5a910.appspot.com",
    messagingSenderId: "933556725291",
    appId: "1:933556725291:web:c0de7c02237f3f008c6c6e"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { timestamp }
export default firebaseApp.firestore()