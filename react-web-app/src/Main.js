import App from './App';
import Home from './Home';
import React, { useRef, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom';

function Main() {
    const [box,setBox] = useState([]);
    const [show,setShow] = useState(false);
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
            {show ? <App boxes={box} changeboxes={changebox} changeshows={changeshow} imgs={img} changeimgs={changeimg}></App> : 
            <Home boxes={box} changeboxes={changebox} changeshows={changeshow} imgs={img} changeimgs={changeimg} 
                enableemptys={enableempty} changeenable={changeenable}></Home>}
        </div>
    );
}

export default Main;