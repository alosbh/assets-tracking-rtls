const connection = require('../database/connection')

module.exports = {


    async create (request,response){

            console.log(request.body)
        const {
                SubAreaName, 
                AreaID,
                Width,
                Height} = request.body;
        
        
        const id = await connection('SubArea').insert({
            
            SubAreaName,
            AreaID,
            Width,
            Height,

        })
        

        return response.json(id);

        },

    async delete (request,response){
        const { id } = request.params;
        
        await connection('SubArea').where('id',id).delete();

        return response.status(204).send();

    } ,
    async clear(request,response){
        
        await connection('SubArea')
            .del();
            
        return response.status(204).send();
        
    },

    async index (request,response){

        const SubAreas = await connection('SubArea')
        .join('Area', 'Area.id','=','SubArea.AreaID')
        .select('SubArea.id',
                'SubArea.SubAreaName',
                'SubArea.Width',
                'SubArea.Height',
                 'Area.AreaName');

        return response.json(SubAreas);
    },
    async update(request,response){

        const{id} = request.params;
        

        const {SubAreaName, AreaID, Width, Height} = request.body;
        
        
        
        await connection('SubArea')
        .where('id',id)
        .update({SubAreaName: SubAreaName,
                 AreaID: AreaID,
                Width: Width,
                Height: Height
                    });

        const subArea = await connection('SubArea')
        .where('id',id)
        .select('*');

        return response.json(subArea);

    }
}