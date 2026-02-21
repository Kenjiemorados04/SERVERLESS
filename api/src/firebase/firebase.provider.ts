import * as admin from 'firebase-admin';
import { Provider } from '@nestjs/common';
import * as serviceAccount from '../../firebase-service-account.json';

export const FirebaseAdminProvider: Provider = {
  provide: 'FIREBASE_ADMIN',
  useFactory: () => {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as any),
      });
    }
    return admin;
  },
};