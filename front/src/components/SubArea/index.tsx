import React,{useState,useEffect} from 'react';

import api from '../../services/api';
import "./styles.css";
import Gateway from '../Gateway'

interface Props{
    id:number;
    setFocus:(event: React.MouseEvent<HTMLDivElement,MouseEvent>)=>void;
    SubAreaName: string;
    Height: number;
    Width:number;
    frame: object;
    onMousemove:(event: React.MouseEvent<HTMLDivElement,MouseEvent>)=>void;
    
    

}

interface Gateway{
  GatewayName: string;
  workstation:string;
  y: number;
  x: number;
  uptime: number;
  SubAreaID: number;
}
const SubArea:React.FC<Props> = ({id,setFocus,SubAreaName,Height,Width,frame,onMousemove})=>{

  const [gateways, setGateways]=useState<Gateway[]>([])

  useEffect(()=>{

    api.get('gateway').then(response=>{

        
        const gatewaysObj = response.data;
        setGateways(gatewaysObj);
        console.log(gatewaysObj);
        

    })

},[])
    
    return(

        <div id={String(id)}  key={id} className="subarea-container" style={{}} onClick={(e)=>setFocus(e)} onMouseMove={(e)=>onMousemove(e)} >
                <h4 className="no-click" style={{}}>{SubAreaName}</h4>
                <div className="no-click canvas-container" style={{width:Width,height:Height}}>
                  <canvas  className="no-click" height={Height} width={Width}  style={{backgroundImage: `url(http://localhost:3015/images/subarea/${id})`}}></canvas>  
              
                    {gateways.map((e)=>
                    {
                    return id==e.SubAreaID ? 
                    
                      
                      
                          <Gateway gatewayName={e.GatewayName}    workstationName="INGBOXDIS001"    y={e.y}    x={e.x}    Uptime={20}></Gateway>
    
                      : <></>
                    
                      
                    }
                      
                    )}
                    
              
                </div>
              </div>   
        
    );
}

export default SubArea;
