import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyDWYmSLMJO4LdOqPJqhtx4d50yGD5aX6pk",
  authDomain: "simple-chat-app-35bfb.firebaseapp.com",
  projectId: "simple-chat-app-35bfb",
  storageBucket: "simple-chat-app-35bfb.appspot.com",
  messagingSenderId: "539935026327",
  appId: "1:539935026327:web:cc83260b1f8e2680260dd2",
};

const app: FirebaseApp = initializeApp(config);

const firestore = getFirestore(app);

export { firestore };
