import React, {useEffect,useState} from 'react';

import {BsSearch} from 'react-icons/bs'
import "./styles.css";

import api from '../../services/api';
import APItoTree from '../../scripts/APItoTree.js';
import {TreeItem,TreeView as Tree} from '@material-ui/lab'
import {BsFillCaretDownFill as Ibaixo,BsFillCaretRightFill as Idireita, BsFillCircleFill as Ipreenchido, BsCircle as Inaopreenchido} from 'react-icons/bs'
import { type } from 'os';
import { parse } from 'path';

interface Tool{
    id:number;
    ToolName:string;
    SubId: number;
    SubCategoryName: string;
    Category: string;
    CatId: number;
    Subcategories:Sub[];
        
    
}

interface Sub{
    id: number;
    Tools: [];
    Subcategory:string;
}




const TreeView = ()=>{

    const [tools,setTools]=useState<Tool[]>([]);

    const [parsedTools,setParsedTools]=useState([]);

    useEffect(()=>{

        api.get('tooling').then(response=>{

            
            const Tools = APItoTree(response.data);
            
            setTools(Tools);

        })

    },[])

    useEffect(()=>{
        const jig = new Array();
        
        
    },[tools])

    return(

        <div className="content-tree">
            <div className="search-box">
                <input className="search-input" placeholder="Search"/>
                <a>
                    <BsSearch className="icone-search"  size={24}/>
                </a>
            </div>
            <div className="tree-view">

                <Tree
                    defaultCollapseIcon={< Ibaixo />}
                    defaultExpandIcon={<Idireita />}
                >
                    {tools.map(({id,Category,Subcategories},i)=>(
                        
                        <TreeItem key={id} nodeId={"1."+id} label={Category}>

                            {Subcategories.map(({id,Subcategory,Tools},j)=>(


                                <TreeItem
                                key={id}
                                
                                
                                 nodeId={"2."+id} label={Subcategory}>
                                
                                {Tools.map(({id,Name},j)=>(

                                    <p key={id}
                                    className="node-beacon">
                                    
                                    {Name}
                                    
                                    <Ipreenchido style={{fontSize:'small'}}/>
                                    
                                    </p>
                                    


                                ))}
                                </TreeItem>
                            ))}
                        
                            

                        
                        </TreeItem>
                        )
                        

                        
                    )}
                    
                
                </Tree>

            </div>
            
        </div>
        
    );
}

export default TreeView;
