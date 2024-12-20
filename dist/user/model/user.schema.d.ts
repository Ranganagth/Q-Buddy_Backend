import { Schema, Document } from 'mongoose';
export declare const UserSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    name: string;
    email: string;
    password: string;
    contactNumber: string;
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    name: string;
    email: string;
    password: string;
    contactNumber: string;
}>> & import("mongoose").FlatRecord<{
    name: string;
    email: string;
    password: string;
    contactNumber: string;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export interface User extends Document {
    id: string;
    name: string;
    email: string;
    password: string;
    contactNumber: string;
}
