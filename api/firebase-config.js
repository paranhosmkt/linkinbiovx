import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // First try environment variables (for Vercel/production)
  let config = {
    apiKey: process.env.VITE_FIREBASE_API_KEY || process.env.FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID || process.env.FIREBASE_APP_ID,
    firestoreDatabaseId: process.env.VITE_FIREBASE_DATABASE_ID || process.env.FIREBASE_DATABASE_ID
  };

  // If env vars are missing, fallback to local file (for AI Studio development)
  if (!config.apiKey || !config.projectId) {
    try {
      const configPath = path.join(process.cwd(), 'firebase-applet-config.json');
      if (fs.existsSync(configPath)) {
        const fileContent = fs.readFileSync(configPath, 'utf8');
        const localConfig = JSON.parse(fileContent);
        config = {
          apiKey: localConfig.apiKey,
          authDomain: localConfig.authDomain,
          projectId: localConfig.projectId,
          storageBucket: localConfig.storageBucket,
          messagingSenderId: localConfig.messagingSenderId,
          appId: localConfig.appId,
          firestoreDatabaseId: localConfig.firestoreDatabaseId || "(default)"
        };
      }
    } catch (e) {
      console.warn("Could not load local firebase-applet-config.json", e);
    }
  }

  // Ensure default database ID is set if undefined
  config.firestoreDatabaseId = config.firestoreDatabaseId || "(default)";

  res.status(200).json(config);
}
