export declare enum roles {
    User = "User",
    Partner = "Partner"
}
export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    contactNumber: string;
    role: string;
}
export declare class LoginDto {
    email: string;
    password: string;
}
