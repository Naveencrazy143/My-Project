import { initializeApp } from "firebase/app"
import { getMessaging } from "firebase/messaging"


const firebaseConfig = {
    apiKey: "AIzaSyB_RGm04D4f9QkS3_nYwjWQE2nRvzKEaWU",
    authDomain: "quanta-edat.firebaseapp.com",
    projectId: "quanta-edat",
    storageBucket: "quanta-edat.appspot.com",
    messagingSenderId: "117603810186",
    appId: "1:117603810186:web:352bc6904ce880fddf2673"
};


export const config = initializeApp(firebaseConfig)

export const messaging = getMessaging(config)