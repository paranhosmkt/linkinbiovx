/// <reference types="vite/client" />
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

let dbInstance: Firestore | null = null;

export async function getDb(): Promise<Firestore> {
  if (dbInstance) return dbInstance;
  
  // Try environment variables first (for Vercel/production)
  const envConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    firestoreDatabaseId: import.meta.env.VITE_FIREBASE_DATABASE_ID || "(default)"
  };

  if (envConfig.apiKey && envConfig.projectId) {
    const app = getApps().length === 0 ? initializeApp(envConfig) : getApps()[0];
    dbInstance = getFirestore(app, envConfig.firestoreDatabaseId);
    return dbInstance;
  }

  // Fallback to API route (for AI Studio development)
  try {
    const res = await fetch('/api/firebase-config');
    // If it's HTML (e.g. Vercel fallback), this will throw
    const text = await res.text();
    let config;
    try {
      config = JSON.parse(text);
    } catch (e) {
      throw new Error("Invalid Firebase config response from server.");
    }
    
    if (config && Object.keys(config).length > 0) {
      const app = getApps().length === 0 ? initializeApp(config) : getApps()[0];
      dbInstance = getFirestore(app, config.firestoreDatabaseId || "(default)");
      return dbInstance;
    }
    throw new Error("Firebase config is empty");
  } catch (error) {
    console.error("Failed to initialize Firebase", error);
    throw error;
  }
}
