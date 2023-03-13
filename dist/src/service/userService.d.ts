declare class UserServices {
    private userRepository;
    constructor();
    register: (user: any) => Promise<any>;
}
declare const _default: UserServices;
export default _default;
