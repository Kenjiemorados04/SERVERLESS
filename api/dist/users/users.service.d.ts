import * as admin from 'firebase-admin';
export declare class UsersService {
    private firebaseAdmin;
    private db;
    constructor(firebaseAdmin: typeof admin);
    private collection;
    create(data: any): Promise<{
        id: string;
    }>;
    findAll(): Promise<{
        id: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
    } | null>;
    update(id: string, data: any): Promise<{
        success: boolean;
    }>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
