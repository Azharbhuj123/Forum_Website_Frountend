import React from 'react'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSWhz0YLf4XtjW7FqA4I2uTCX-Tsr2qW4",
  authDomain: "tenantschat-4f1c0.firebaseapp.com",
  projectId: "tenantschat-4f1c0",
  storageBucket: "tenantschat-4f1c0.firebasestorage.app",
  messagingSenderId: "261878966418",
  appId: "1:261878966418:web:dad4de2821eb43044c1e4b",
  measurementId: "G-6SPN00HF3C"
};

export const app = initializeApp(firebaseConfig);
// Initialize Firebase
export const analytics = getAnalytics(app);


export const auth = getAuth();

export const storage = getStorage();

export const db = getFirestore(app);

export const GOOGLE_CLIENT_ID = "261878966418-f727go863d66ui9j5dvkoo769u4ro4sa.apps.googleusercontent.com";