function APItoTree(data){
 
    var source=[];
    
  
    data.forEach(element => {
  
        let id = element['id']
        let ToolName = element['ToolName']
        let SubId = element['SubId']
        let SubCategoryName = element["SubCategoryName"];
        let CategoryName = element['CategoryName'];
        let CatId = element['CatId']
  
        CategoryName = CatId + "-" + CategoryName
        SubCategoryName = SubId + "-" + SubCategoryName
  
        if(!source[CategoryName]){
            source[CategoryName]={}
        }
        if(!source[CategoryName][SubCategoryName]){
            source[CategoryName][SubCategoryName]={}
  
        }
        source[CategoryName][SubCategoryName][id]=ToolName
  
    });
    let normalizado=[];
  
    Object.keys(source).forEach(function(k){
  
      let splitted = k.split("-")
      
      let newobj = {id:Number(splitted[0]),Category:splitted[1],Subcategories:[]}
  
  
      Object.keys(source[k]).forEach(function(j){
        let splitted2 = j.split("-")
        let subobj = {id:Number(splitted2[0]),Subcategory:splitted2[1],Tools:[]}
  
        Object.keys(source[k][j]).forEach(function(h){
  
          let subsubobj = {id:h,Name:source[k][j][h]}
          
          subobj.Tools.push(subsubobj);
          
        })
        newobj.Subcategories.push(subobj);
      })
  
      normalizado.push(newobj);
  
    })
  
    return normalizado;
    
  
  }
  export default APItoTree;