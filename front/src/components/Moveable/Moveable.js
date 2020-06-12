import React, { useState,useEffect } from "react";
import Moveable from "react-moveable";
import SubArea from '../SubArea';
// import Beacon from '../Beacon/Beacon'
import { ref } from "framework-utils";
import { Frame } from "scenejs";
import "./styles.css";
import Box from "../../assets/img/INGBOXBUILD.jpg"
import ToolCrib from "../../assets/img/ToolCrib.jpg"
import AutRoom from "../../assets/img/AutRoom.jpg"
import api from "../../services/api";



function App(){

  const [target,setTarget] = useState(null);
  
  const [container,setContainer] = useState(null);
  const [scalable,setScalable] = useState(null);
  const [draggable,setdraggable] = useState(null);
  const [Areas,setArea] = useState([]);
  const [Frames, setFrame] = useState(null);
  const [subAreas,setSubAreas] = useState([]);

  const [root,setRoot] = useState(null);

  
  
  function newFrame(){
    
    let frame = new Frame({
    
      left: "0px",
      top: "0px",
      transform: {
        rotate: "0deg",
        scaleX: 1,
        scaleY: 1,
        matrix3d: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
      },
      position:'relative',
      backgroundImage: `url(${Box})`
      
    });

    return frame;
  }
  function setFocus(element){

    console.log(element.target)
    const tg = getClosest(element.target,'.subarea-container')
    
    setTarget(tg);
   
  };

  var getClosest = function (elem, selector) {
    for ( ; elem && elem !== document; elem = elem.parentNode ) {
      console.log(elem);
      if ( elem.matches( selector ) ) return elem;
    }
    return null;
  };

  function onDrag ({ target, top, left })  {

    const style=getStyles(target)
    const tLeft = style.left
    const tTop = style.top
    const transform = style.transform
    
    
    if(tLeft === undefined || tTop===undefined){

      Frames.set("left", `0px`);
      Frames.set("top", `0px`);

    }
    else{
      Frames.set("left", `${tLeft}`);
      Frames.set("top", `${tTop}`);

    }
    if(transform ===undefined){
 
      Frames.set("transform", "rotate", '0deg');
      Frames.set("transform", "scaleX", 1);
      Frames.set("transform", "scaleY", 1);
    }
    else{
      
      
      Frames.set("transform", "rotate", transform.split(' ')[0].match(/\(([^)]+)\)/)[1]);
      Frames.set("transform", "scaleX", transform.split(' ')[1].match(/\(([^)]+)\)/)[1]);
      Frames.set("transform", "scaleY", transform.split(' ')[2].match(/\(([^)]+)\)/)[1]);

    }
    
      
      Frames.set("left", `${left}px`);
      Frames.set("top", `${top}px`);

    
    
    setTransform(target);
  };

  function onScale ({ target, delta },frame)  {
    
    

    const style=getStyles(target)
    const tLeft = style.left
    const tTop = style.top
    const transform = style.transform
    
    
    if(tLeft === undefined || tTop===undefined){

      Frames.set("left", `0px`);
      Frames.set("top", `0px`);
      

    }
    else{
      Frames.set("left", `${tLeft}`);
      Frames.set("top", `${tTop}`);
      
    }
    if(transform ===undefined){
 
      Frames.set("transform", "rotate", '0deg');
      Frames.set("transform", "scaleX", 1);
      Frames.set("transform", "scaleY", 1);
      
    }
    else{
      
      
      Frames.set("transform", "rotate", transform.split(' ')[0].match(/\(([^)]+)\)/)[1]);
      Frames.set("transform", "scaleX", transform.split(' ')[1].match(/\(([^)]+)\)/)[1]);
      Frames.set("transform", "scaleY", transform.split(' ')[2].match(/\(([^)]+)\)/)[1]);

    }
    
      
      const scaleX = Frames.get("transform", "scaleX") * delta[0];
      const scaleY = Frames.get("transform", "scaleY") * delta[1];
      Frames.set("transform", "scaleX", scaleX);
      Frames.set("transform", "scaleY", scaleY);
      
    
    setTransform(target);
  };

    function getStyles(el) {
      let element = el
      
      var output = {};
      
      if (!el || !el.style || !el.style.cssText) {
        return output;
      }

      var camelize = function camelize(str) {
        return str.replace (/(?:^|[-])(\w)/g, function (a, c) {
          c = a.substr(0, 1) === '-' ? c.toUpperCase () : c;
          return c ? c : '';
        });
      }

      var style = element.style.cssText.split(';');

      for (var i = 0; i < style.length; ++i) {
          var rule = style[i].trim();
          
          
          if (rule) {
            var ruleParts = rule.split(':');
            var key = camelize(ruleParts[0].trim());
            output[key] = ruleParts[1].trim();
          }
      }
      
      return output;
  }
  function setTransform(target) {
    
    // const items = document.querySelectorAll('.subarea-container')
    // const str = "z-index:1;"
    // console.log(items);
    // items.forEach((e)=>{
      
    //   console.log(e.style.cssText+str)
    // })

    
    
      let persistentCSS = "display: inline-table;"
       target.style.cssText = persistentCSS +  Frames.toCSS();

  };
 

  


  useEffect(()=>{
    const offsetParent = document.querySelector('#root')
    setRoot(offsetParent);
    setScalable(true);
    setdraggable(true);
    
    setFrame(newFrame());
    api.get('/subarea').then((response)=>{

      setSubAreas(response.data);
    
    })
  
  },[]);

  useEffect(() => {
    
    subAreas.forEach((e)=>{

    })
  }, [subAreas]);

  useEffect(() => {
    
    
  }, [target]);

  function onMousemove(e){

    const rect = e.target.getBoundingClientRect()

    
    const offsetLeft = rect.left;
    const offsetTop = rect.top;

    let texto = document.querySelector('span')
    
    var m_posx = 0, m_posy = 0, e_posx = 0, e_posy = 0,
           obj = this;
    //get mouse position on document crossbrowser
    if (!e){e = window.event;}
    if (e.pageX || e.pageY){
        m_posx = e.pageX;
        m_posy = e.pageY;
    } else if (e.clientX || e.clientY){
        m_posx = e.clientX + document.body.scrollLeft
                 + document.documentElement.scrollLeft;
        m_posy = e.clientY + document.body.scrollTop
                 + document.documentElement.scrollTop;
    }
    
    //get parent element position in document
    if (root){
        // do{ 
        //     e_posx += offsetLeft;
        //     e_posy += offsetTop;
        // } while (obj = root);
    }
    // mouse position minus elm position is mouseposition relative to element:
    
    // texto.innerHTML = ' X Position: ' + (m_posx-e_posx-offsetLeft) 
    //               + ' Y Position: ' + (m_posy-e_posy-offsetTop);
    
    
         
}

  return (
    <div className="page-main" onClick={(e)=>setFocus(e)} style={{display:'flex',flexDirection:'row', minHeight:'900px'}} >
      <Moveable
      
       
        target={target}
        id="movref"
        
        draggable={draggable}
        scalable={scalable}
        
        keepRatio={true}
        origin={false}
        throttleDrag={1}          
        throttleScale={0}
        onDrag={onDrag}          
        onScale={onScale}
        
      />
      

      
        {
         subAreas.map((e)=>
            (


              <SubArea className="area" key={e.id} id={e.id} SubAreaName={e.SubAreaName} Width={e.Width} Height={e.Height} setFocus={setFocus} onMousemove={onMousemove}></SubArea>

            )
              
          )
             
        
        }
        
      </div>
    
  );
}

export default App;