import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCfS9z8nbKgH15kl2uFVcSiuaozze_ajvY",
    authDomain: "medium-344a2.firebaseapp.com",
    projectId: "medium-344a2",
    storageBucket: "medium-344a2.firebasestorage.app",
    messagingSenderId: "953562055048",
    appId: "1:953562055048:web:2bf6bd39e0b1a8e167fa3d",
    measurementId: "G-SH9V1PK61L",
};

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
