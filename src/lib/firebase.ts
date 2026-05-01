import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCwyA_JzE2WWxaW-t777upPJagR7ospLEM",
  authDomain: "pain-75bc9.firebaseapp.com",
  projectId: "pain-75bc9",
  storageBucket: "pain-75bc9.firebasestorage.app",
  messagingSenderId: "978755482384",
  appId: "1:978755482384:web:177f96eb358a9a1483eb95",
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
