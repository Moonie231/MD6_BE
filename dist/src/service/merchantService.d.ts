declare class MerchantServices {
    private merchantRepository;
    constructor();
    register: (merchant: any) => Promise<any>;
    checkMerchant: (merchant: any) => Promise<"Account not ready" | "Account locked" | "Wrong password" | "Merchant not found" | {
        idMerchant: any;
        nameMerchant: any;
        image: any;
        token: string;
    }>;
    getMyProfile: (idMerchant: any) => Promise<any>;
    edit: (id: any, newMerchant: any) => Promise<any>;
    getMerchantActive: () => Promise<any>;
    getMerchantPending: () => Promise<any>;
    setStatus: (id: any) => Promise<any>;
}
declare const _default: MerchantServices;
export default _default;
