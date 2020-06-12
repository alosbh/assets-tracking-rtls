const connection = require('.././database/connection')

module.exports = {


    async create (request,response){

        const {ToolName, ToolDescription, BeaconID, SubCategoryID} = request.body;
        
        
        const id     = await connection('Tooling').insert({
            
            ToolName, 
            ToolDescription, 
            BeaconID, 
            SubCategoryID

        })
        

        return response.json(id);

        },

    async delete (request,response){
        const { id } = request.params;
        
        await connection('Tooling').where('id',id).delete();

        return response.status(204).send();

    } ,
    async clear(request,response){
        
        await connection('Tooling')
            .del();
            
        return response.status(204).send();
        
    },

    async index (request,response){

        const Tooling = await connection('Tooling')
        .join('SubCategory', 'SubCategory.id','=','Tooling.SubCategoryID')
        .join('Category', 'Category.id','=','SubCategory.CategoryID')
        .select('Tooling.id','ToolName','SubCategory.id as SubId','SubCategoryName','CategoryName','Category.id as CatId');

        return response.json(Tooling);
    },
    async update(request,response){

        const{id} = request.params;
        

        const {SubCategoryName} = request.body;
        
        
        
        await connection('SubCategory')
        .where('id',id)
        .update({SubCategoryName: SubCategoryName});

        const subcategory = await connection('SubCategory')
        .where('id',id)
        .select('*');

        return response.json(subcategory);

    }
}