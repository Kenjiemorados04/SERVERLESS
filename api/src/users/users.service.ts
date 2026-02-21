import { Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private db: admin.firestore.Firestore;

  constructor(
    @Inject('FIREBASE_ADMIN') private firebaseAdmin: typeof admin,
  ) {
    this.db = this.firebaseAdmin.firestore();
  }

  private collection = 'users';

  async create(createUserDto: CreateUserDto) {
    const docRef = await this.db
      .collection(this.collection)
      .add(createUserDto);

    return { id: docRef.id };
  }

  async findAll() {
    const snapshot = await this.db
      .collection(this.collection)
      .get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  async findOne(id: string) {
    const doc = await this.db
      .collection(this.collection)
      .doc(id)
      .get();

    if (!doc.exists) {
      return null;
    }

    return { id: doc.id, ...doc.data() };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.db
      .collection(this.collection)
      .doc(id)
      .update(updateUserDto);

    return { success: true };
  }

  async remove(id: string) {
    await this.db
      .collection(this.collection)
      .doc(id)
      .delete();

    return { success: true };
  }
}