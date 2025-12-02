import admin from 'firebase-admin';

let app: admin.app.App;

if (!admin.apps.length) {
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (!serviceAccountJson) {
    throw new Error(
      'FIREBASE_SERVICE_ACCOUNT_KEY env var is not set. It should contain the JSON for the service account.'
    );
  }

  const serviceAccount = JSON.parse(serviceAccountJson);

  app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
  });
} else {
  app = admin.app();
}

export const db = admin.firestore();
export { admin, app };
