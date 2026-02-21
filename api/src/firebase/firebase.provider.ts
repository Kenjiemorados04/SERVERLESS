import * as admin from 'firebase-admin';
import { Provider } from '@nestjs/common';

export const FirebaseAdminProvider: Provider = {
  provide: 'FIREBASE_ADMIN',
  useFactory: () => {
    if (!admin.apps.length) {
      const base64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;

      if (!base64) {
        throw new Error('FIREBASE_SERVICE_ACCOUNT_BASE64 not set');
      }

      const decoded = Buffer.from(base64, 'base64').toString('utf-8');
      const serviceAccount = JSON.parse(decoded);

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }

    return admin;
  },
};