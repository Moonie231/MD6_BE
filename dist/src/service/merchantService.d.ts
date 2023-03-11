declare class MerchantServices {
    private merchantRepository;
    constructor();
    register: (merchant: any) => Promise<any>;
    checkMerchant: (merchant: any) => Promise<"Merchant not found" | "Account not ready" | "Account locked" | "Wrong password" | {
        idUser: any;
        nameMerchant: any;
        image: any;
        token: string;
    }>;
}
declare const _default: MerchantServices;
export default _default;
