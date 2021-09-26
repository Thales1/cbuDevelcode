// Import the functions you need from the SDKs you need
import firebase from "@react-native-firebase/app";

export default function conexao() {

    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyBfc7kBFN92ip4AqJA4RtUa9w4MZg6fg4s",
        authDomain: "cbudevelcode.firebaseapp.com",
        projectId: "cbudevelcode",
        storageBucket: "cbudevelcode.appspot.com",
        messagingSenderId: "940111367031",
        appId: "1:940111367031:web:655a444845b1cc38fe2f72",
        databaseURL: "https://cbudevelcode-default-rtdb.firebaseio.com"
    };

    // Initialize Firebase
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app();
    }
}