import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

let dbInstance: Firestore | null = null;

export async function getDb(): Promise<Firestore> {
  if (dbInstance) return dbInstance;
  
  try {
    const res = await fetch('/api/firebase-config');
    const config = await res.json();
    
    if (Object.keys(config).length > 0) {
      const app = getApps().length === 0 ? initializeApp(config) : getApps()[0];
      dbInstance = getFirestore(app, config.firestoreDatabaseId);
      return dbInstance;
    }
    throw new Error("Firebase config is empty");
  } catch (error) {
    console.error("Failed to initialize Firebase", error);
    throw error;
  }
}
