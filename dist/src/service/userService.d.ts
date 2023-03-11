declare class UserServices {
    private userRepository;
    constructor();
    register: (user: any) => Promise<any>;
    checkUser: (user: any) => Promise<"User not found" | "Account not ready" | "Account locked" | "Wrong password" | {
        idUser: any;
        username: any;
        role: any;
        avatar: any;
        token: string;
    }>;
}
declare const _default: UserServices;
export default _default;
