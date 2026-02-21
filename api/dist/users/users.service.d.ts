import * as admin from 'firebase-admin';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private firebaseAdmin;
    private db;
    constructor(firebaseAdmin: typeof admin);
    private collection;
    create(createUserDto: CreateUserDto): Promise<{
        id: string;
    }>;
    findAll(): Promise<{
        id: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
    } | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        success: boolean;
    }>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
