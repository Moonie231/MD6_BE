declare class MerchantServices {
    private merchantRepository;
    private orderRepository;
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
    getMerchant: (idMerchant: any) => Promise<any>;
    setStatus: (id: any) => Promise<any>;
    statisticsByStatus: (id: any) => Promise<any>;
    statisticsByDay: (month: any, id: any) => Promise<any>;
    statisticsByMonth: (year: any, id: any) => Promise<any>;
    statisticsByYear: (id: any) => Promise<any>;
    statisticsByFood: (id: any) => Promise<any>;
    statisticsByUser: (id: any) => Promise<any>;
}
declare const _default: MerchantServices;
export default _default;
