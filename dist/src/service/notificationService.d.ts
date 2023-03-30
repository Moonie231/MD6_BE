declare class CategoryService {
    private notificationRepository;
    constructor();
    getNotificationOfMerchant: (idMerchant: any) => Promise<any>;
    getNotificationOfUser: (idUser: any) => Promise<any>;
    saveNotification: (info: any) => Promise<any>;
    countMerchant: (idMerchant: any) => Promise<any>;
    countUser: (idUser: any) => Promise<any>;
    updateSeenUsers: (idUser: any) => Promise<any>;
    updateSeenMerchants: (idMerchant: any) => Promise<any>;
    updateSeenUser: (idNotification: any) => Promise<any>;
    updateSeenMerchant: (idNotification: any) => Promise<any>;
}
declare const _default: CategoryService;
export default _default;
