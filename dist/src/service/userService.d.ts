declare class UserServices {
    private userRepository;
    constructor();
    generateTokenFromString: (email: any) => string;
    register: (user: any) => Promise<any>;
    verifyEmail: (tokenEmail: any) => Promise<any>;
    sendEmailVerificationRequest: (email: any) => Promise<void>;
    checkUser: (user: any) => Promise<"User not found" | "Account not ready" | "Account locked" | "Wrong password" | {
        idUser: any;
        username: any;
        role: any;
        avatar: any;
        status: any;
        token: string;
    }>;
}
declare const _default: UserServices;
export default _default;
