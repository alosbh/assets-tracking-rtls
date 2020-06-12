import React from 'react';

import {BsGeoAlt as ILocal,BsReverseLayoutTextSidebarReverse as IReports,BsPersonFill as IUser,BsServer as Idatabase} from 'react-icons/bs'
import "./styles.css";

import logo from '../../assets/img/logo.png'

const Header = ()=>{


    return(

        <header className="top-header">
            <div className="logo-box">
                <img src={logo} height={50} width={50} alt="Jabil Logo"/>
                <span>Assets Tracking</span>
            </div>
            <div className="top-bar">

                <div className="buttons-box">
                    <a className="navigate-button">
                        
                        <ILocal color="#9A9A9A" size={30}/>
                        <p>Localização</p>
                    </a>
                    <a className="navigate-button">
                        
                        <Idatabase color="#9A9A9A" size={30}/>
                        <p>Database</p>
                    </a>
                    <a className="navigate-button">
                        
                        <IReports color="#9A9A9A" size={30}/>
                        <p>Reports</p>
                    </a>
                    <a className="navigate-button">
                        
                        <IUser color="#9A9A9A" size={30}/>
                        <p>Admin</p>
                    </a>


                    
                </div>

                <div className="options-box">
                    <span>Nome</span>
                    <span>Foto</span>
                    
                    
                </div>

                
            </div>
        </header>
        
    );
}

export default Header;
