const connection = require('.././database/connection')

module.exports = {


    async create (request,response){

        const {SubCategoryName, CategoryID} = request.body;
        
        
        const id = await connection('SubCategory').insert({
            
            SubCategoryName,
            CategoryID

        })
        

        return response.json(id);

        },

    async delete (request,response){
        const { id } = request.params;
        
        await connection('SubCategory').where('id',id).delete();

        return response.status(204).send();

    } ,
    async clear(request,response){
        
        await connection('SubCategory')
            .del();
            
        return response.status(204).send();
        
    },

    async index (request,response){

        const SubCategories = await connection('SubCategory')
        .join('Category', 'Category.id','=','SubCategory.CategoryID')
        .select('SubCategory.id','SubCategory.SubCategoryName', 'Category.CategoryName');

        return response.json(SubCategories);
    },
    async update(request,response){

        const{id} = request.params;
        

        const {SubCategoryName, CategoryID} = request.body;
        
        
        
        await connection('SubCategory')
        .where('id',id)
        .update({SubCategoryName: SubCategoryName, CategoryID: CategoryID});

        const subcategory = await connection('SubCategory')
        .where('id',id)
        .select('*');

        return response.json(subcategory);

    }
}