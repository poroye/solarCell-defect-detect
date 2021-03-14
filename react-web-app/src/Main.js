import App from './App';
import Home from './Home';
import React, { useState } from 'react';

function Main() {
    const [box,setBox] = useState([]);
    const [show,setShow] = useState(1);
    const [img,setImg] = useState([])
    const [enableempty,setEnableempty] = useState(false);

    const changebox = (newvalue) => {setBox(newvalue)}
    const changeshow = (showvalue) => {setShow(showvalue)}
    const changeimg = (newimg) => {setImg(newimg)}
    const changeenable = (value) => {setEnableempty(value)}

    return(
        <div className="Main">
            {show == 0 && <App boxes={box} changeshows={changeshow} imgs={img} ></App> } 
            {show == 1 && <Home boxes={box} changeboxes={changebox} changeshows={changeshow} imgs={img} changeimgs={changeimg} enableemptys={enableempty} changeenable={changeenable}></Home>}
        </div>
    );
}

export default Main;