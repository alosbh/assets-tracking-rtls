import React from 'react';

import './App.css';

import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Moveable from './components/Moveable/Moveable'

function App() {
  return (
    <div className="content">
      
      <Header/>
      
      <div className="main-page">

        <Sidebar/>


        <div className="aplicação">
            <Moveable/>
        </div>

      </div>
       
     
    </div>
  );
}

export default App;
