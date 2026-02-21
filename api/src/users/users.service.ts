import { Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class UsersService {
  private db: admin.firestore.Firestore;

  constructor(
    @Inject('FIREBASE_ADMIN') private firebaseAdmin: typeof admin,
  ) {
    this.db = this.firebaseAdmin.firestore();
  }

  private collection = 'users';

  async create(data: any) {
    const docRef = await this.db.collection(this.collection).add(data);
    return { id: docRef.id };
  }

  async findAll() {
    const snapshot = await this.db.collection(this.collection).get();
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  async findOne(id: string) {
    const doc = await this.db.collection(this.collection).doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  }

  async update(id: string, data: any) {
    await this.db.collection(this.collection).doc(id).update(data);
    return { success: true };
  }

  async remove(id: string) {
    await this.db.collection(this.collection).doc(id).delete();
    return { success: true };
  }
}