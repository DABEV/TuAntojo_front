import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import {getStorage} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAaOQ_DJrIlrJSUiDDug1hYrETshtFqhqY",
  authDomain: "brianutez.firebaseapp.com",
  databaseURL: "https://brianutez-default-rtdb.firebaseio.com",
  projectId: "brianutez",
  storageBucket: "brianutez.appspot.com",
  messagingSenderId: "766512623476",
  appId: "1:766512623476:web:0b4a8f1cd54051b5c5c621",
  measurementId: "G-REBQCWE5T2",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export{app, storage};