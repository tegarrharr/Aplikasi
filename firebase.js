// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuratrion
const firebaseConfig = {
    apiKey: "AIzaSyBwDkE1o3cWsGLeoKIQcpfYwn2uSvjAggk",
    authDomain: "tegarapps-90fbb.firebaseapp.com",
    databaseURL: "https://tegarapps-90fbb-default-rtdb.firebaseio.com",
    projectId: "tegarapps-90fbb",
    storageBucket: "tegarapps-90fbb.appspot.com",
    messagingSenderId: "152501591656",
    appId: "1:152501591656:web:da36ecab0841ee1288e5dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const authentication = getAuth(app);
const firebaseDatabase = getDatabase(app);
const database = getDatabase(app);
const storage = getStorage(app);

export { authentication, firebaseDatabase, storage, database };