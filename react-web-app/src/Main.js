import App from './App';
import Home from './Home';
import Display from './Display';
import React, { useRef, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom';

function Main() {
    const [box,setBox] = useState([]);
    const [show,setShow] = useState(1);
    const [img,setImg] = useState([])
    const [enableempty,setEnableempty] = useState(false);

    const changebox = (newvalue) => {
        setBox(newvalue)
    }

    const changeshow = (showvalue) => {
        setShow(showvalue)
    }

    const changeimg = (newimg) => {
        setImg(newimg)
        // console.log("img changee",img)
    }

    const changeenable = (value) => {
        setEnableempty(value)
    }

    // return(
    //     <Router>
    //         <div className="Main">
    //             <switch>
    //                 <Route exact path="/:boxId" component={Home} boxes={box} changeboxes={changebox}/>
    //                 <Route  path="/App" component={App}/>
    //             </switch>
    //         </div>
    //     </Router>
    // )
    return(
        <div className="Main">
            {show == 0 && <App boxes={box} changeshows={changeshow} imgs={img} ></App> } 
            {show == 1 && <Home boxes={box} changeboxes={changebox} changeshows={changeshow} imgs={img} changeimgs={changeimg} 
                enableemptys={enableempty} changeenable={changeenable}></Home>}
            {show == 2 && <Display boxes={box} changeshows={changeshow} imgs={img} ></Display> }
        </div>
    );
}

export default Main;