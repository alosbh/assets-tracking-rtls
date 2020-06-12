import React, {useEffect,useState} from 'react';


import "./styles.css";

interface Props{
    
    gatewayName: string;
    workstationName:string;
    y: number;
    x:number;
    Uptime: number;
    
}

const Gateway:React.FC<Props> = ({gatewayName,workstationName,y,x,Uptime})=>{
    const [Name, setName]= useState('');
    const [workstation, setWorkstation]= useState('');
    const [top, setTop]= useState(0);
    const [left, setLeft]= useState(0);
    const [uptime, setUptime]= useState(0);

    useEffect(()=>{
        
        setName(gatewayName);
        setWorkstation(workstationName);
        setTop(y);
        setLeft(x);
        setUptime(Uptime);
    },[]);

    return(
        
        <div className="beacon-container" style={{left:(left-15),top:(top-23)}}>
              
            
            
            <span className="beacon-dot">
            <img  className="" src="http://localhost:3015/images/rpi" alt=""/>
            <span className="blob"></span>
                <div>
                    <span></span>
                    <p className="beacon-label">{Name} 
                    <br/>{workstation}
                    <br/>Uptime: <strong>{uptime}</strong>
                    </p>
                </div>
                
            </span>
        </div>

        );
}


export default Gateway;
