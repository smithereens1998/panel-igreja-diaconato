import { initializeApp } from 'firebase/app';
import { getStorage , ref } from 'firebase/storage';

  const firebaseConfig = {
    apiKey: "AIzaSyB-GUYlCKxpGsRbdiuKLdOnUbqDUkAAo7A",
    authDomain: "ad-betesda.firebaseapp.com",
    projectId: "ad-betesda",
    storageBucket: "ad-betesda.appspot.com",
    messagingSenderId: "132819106501",
    appId: "1:132819106501:web:e49b9716fa642784ef8eac",
    measurementId: "G-LML6VQLN65"
  };
  
  // Initialize Firebase
// Inicialize o Firebase
const app = initializeApp(firebaseConfig);
const storage= getStorage(app);
const storageRef = ref(storage);  

  export { storage , storageRef };  