declare class MerchantServices {
    private merchantRepository;
    constructor();
    register: (merchant: any) => Promise<any>;
    checkMerchant: (merchant: any) => Promise<"Merchant not found" | "Wrong password" | "Account not ready" | "Account locked" | {
        idMerchant: any;
        nameMerchant: any;
        image: any;
        token: string;
    }>;
    getMyProfile: (idMerchant: any) => Promise<any>;
    edit: (id: any, newMerchant: any) => Promise<any>;
    getMerchantActive: () => Promise<any>;
    getMerchantPending: () => Promise<any>;
    lockMerchant: (id: any) => Promise<any>;
}
declare const _default: MerchantServices;
export default _default;
