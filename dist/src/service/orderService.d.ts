declare class OrderService {
    private orderRepository;
    private orderDetailRepository;
    constructor();
    removeCart: (idOrder: any) => Promise<any>;
    getOrder: (idMerchant: any) => Promise<any>;
    showCart: (idOrder: any) => Promise<any>;
    save: (value: any) => Promise<any>;
    updateOrder: (idOrder: any, newOrder: any) => Promise<any>;
    findById: (idUser: any) => Promise<any>;
    findByStatusOrder: (idUser: any) => Promise<any>;
    saveCart: (values: any) => Promise<"Can not save cart" | "Saved cart">;
    countCart: (idOrder: any) => Promise<any>;
}
declare const _default: OrderService;
export default _default;
