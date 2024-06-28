// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoznDmAnXwlwPbRohiN_6LBK_UWD3B-mA",
  authDomain: "midas-authen.firebaseapp.com",
  projectId: "midas-authen",
  storageBucket: "midas-authen.appspot.com",
  messagingSenderId: "394261621156",
  appId: "1:394261621156:web:730de436bd6ba445bbf931",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
