declare class FoodService {
    private FoodRepository;
    private orderRepository;
    constructor();
    getAll: (limit: any, offset: any) => Promise<any>;
    count: () => Promise<any>;
    getAllFood: () => Promise<any>;
    getMyFood: (idMerchant: any) => Promise<any>;
    save: (food: any) => Promise<any>;
    update: (idFood: any, newFood: any) => Promise<any>;
    deleteFood: (idFood: any) => Promise<any>;
    findById: (idFood: any) => Promise<any>;
    findFoodByNameFood: (value: any) => Promise<any>;
    updateOneQuantity: (id: any, value: any) => Promise<any>;
    updateQuantity: (idOrder: any) => Promise<any>;
}
declare const _default: FoodService;
export default _default;
