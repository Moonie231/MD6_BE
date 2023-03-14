declare class FoodService {
    private FoodRepository;
    constructor();
    getAll: () => Promise<any>;
    getAllFood: () => Promise<any>;
    getMyFood: (idMerchant: any) => Promise<{
        homes: any;
    }>;
    save: (food: any) => Promise<any>;
    update: (idFood: any, newFood: any) => Promise<any>;
    deleteFood: (idFood: any) => Promise<any>;
    findById: (idFood: any) => Promise<any>;
    findFoodByNameFood: (value: any) => Promise<{
        foods: any;
    }>;
}
declare const _default: FoodService;
export default _default;
