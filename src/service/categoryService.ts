import {Category} from "../models/Category";
import {AppDataSource} from "../data-source";

class CategoryService {
    private categoryRepository
    constructor() {
        this.categoryRepository = AppDataSource.getRepository(Category)
    }
    getAllCategory = async () => {
        let categories = await this.categoryRepository.find();
        return categories

    }

}
export default new CategoryService();