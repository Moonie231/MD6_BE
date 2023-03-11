declare class MerchantServices {
    private merchantRepository;
    constructor();
    register: (merchant: any) => Promise<any>;
    checkMerchant: (merchant: any) => Promise<"Merchant not found" | "Wrong password" | "Account not ready" | "Account locked" | {
        idUser: any;
        nameMerchant: any;
        image: any;
        token: string;
    }>;
}
declare const _default: MerchantServices;
export default _default;
