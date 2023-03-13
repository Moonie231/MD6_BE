declare class MerchantServices {
    private merchantRepository;
    constructor();
    register: (merchant: any) => Promise<any>;
    checkMerchant: (merchant: any) => Promise<"Account not ready" | "Account locked" | "Wrong password" | "Merchant not found" | {
        idUser: any;
        nameMerchant: any;
        image: any;
        token: string;
    }>;
    edit: (id: any, newMerchant: any) => Promise<any>;
}
declare const _default: MerchantServices;
export default _default;
