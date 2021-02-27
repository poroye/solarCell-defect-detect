import React, { useState , useEffect , useRef } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Switch,
} from "react-router-dom";
import "./app.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Tab } from "bootstrap";
import Canvas from "./Canvas";

function checkTab() {
  return <div className="card shadow Filter"></div>;
}

function Rack() {
  return (
    <div className="card Racktype">
      <span className="Rack txt">Rack</span>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider round"></span>
      </label>
    </div>
  );
}

function Paper(delayT,indx,nowbox,dl,d0,d1,d2,d3,d4,d5,d6,d7) {
  const canvas = useRef();
  let ctx = null;
  const [nowlist,setNowlist] = useState([]);
 
  // initialize the canvas context
  useEffect(() => {
    // dynamically assign the width and height to canvas
    const canvasEle = canvas.current;
    canvasEle.width = 800;
    canvasEle.height = 800;
    // console.log(nowbox);
 
    // get context of the canvas
    ctx = canvasEle.getContext("2d");
  });

  useEffect(() => {
    console.log("in paper => ",nowbox);
  },[delayT]);
 
  useEffect(() => {
    nowlist.map(item => {
      drawRect(item[0],item[1]);
    })
  },[nowlist]);
 

  useEffect(() => {
    setNowlist([]);
    // console.log("in paper => ",nowbox[0][0]);
    let tempbox = nowbox.map(item => {
      const rInfo = {x:item[3][0]*800, y:item[3][1]*800, w:item[3][2]*800, h:item[3][3]*800 };
      let rstyle = { borderColor: 'red', borderWidth: 0.1 };
      if(item[1] == 0 && d0 && dl){
        rstyle = { borderColor: 'white', borderWidth: 3 };}
      else if(item[1] == 1 && d1 && dl){
        rstyle = { borderColor: 'red', borderWidth: 3 };}
      else if(item[1] == 2 && d2 && dl){
        rstyle = { borderColor: 'green', borderWidth: 3 };}
      else if(item[1] == 3 && d3 && dl){
        rstyle = { borderColor: 'purple', borderWidth: 3 };}
      else if(item[1] == 4 && d4 && dl){
        rstyle = { borderColor: 'orange', borderWidth: 3 };}
      else if(item[1] == 5 && d5 && dl){
        rstyle = { borderColor: 'blue', borderWidth: 3 };}
      else if(item[1] == 6 && d6 && dl){
        rstyle = { borderColor: 'pink', borderWidth: 3 };}
      else if(item[1] == 7 && d7){
        rstyle = { borderColor: 'yellow', borderWidth: 3 };}
      setNowlist(prev => [...prev,[rInfo, rstyle]]);
    })
  },[indx]);
 
  // draw rectangle
  const drawRect = (info, style = {}) => {
    const { x, y, w, h } = info;
    const { borderColor = 'black', borderWidth = 1 } = style;
 
    ctx.beginPath();
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = borderWidth;
    ctx.rect(x, y, w, h);
    ctx.stroke();
  }
  return (
    <div className="App">
      <canvas ref={canvas} style={{border:'1px solid #999999',position:'absolute', zIndex:1 , marginTop:"5vh"}} ></canvas>
      {indx}
    </div>
  );
}


function App({ boxes, changeboxes, changeshows, imgs, changeimgs }) {
  // console.log("app = ",imgs)
  // console.log("0 =",imgs[0])
  const [indx, setIndx] = useState(0);
  const [nowimg, setNowimg] = useState({
    file: URL.createObjectURL(imgs[indx]),
    filename: imgs[indx].name,
  });
  const [nowbox,setNowbox] = useState([]);
  const [dl,setDl] = useState(true);
  const [d0,setD0] = useState(true);
  const [d1,setD1] = useState(true);
  const [d2,setD2] = useState(true);
  const [d3,setD3] = useState(true);
  const [d4,setD4] = useState(true);
  const [d5,setD5] = useState(true);
  const [d6,setD6] = useState(true);
  const [d7,setD7] = useState(true);
  const [delayT,setDelayT] = useState(0);

  // useEffect(() => {
  //   setDelayT(prev => parseInt(prev)+1)
  //   const temp2box = boxes.map(item => {
  //     if (item[0] == nowimg.filename){
  //       document.title = nowimg.filename;
  //       return item; 
  //     }
  //     else{
  //       return null;
  //     }
  //   }).filter(item => {
  //     return item != null
  //   })
  //   // console.log("temp2box",temp2box);
  //   setNowbox(temp2box);
  //   // console.log("in app => ",nowbox[0][0])
  //   Updateimg();
  // },[indx]);

  function Updateimg() {
    setNowimg({
      file: URL.createObjectURL(imgs[indx]),
      filename: imgs[indx].name,
    });
    console.log("image = ",imgs[indx].name)
  }

  const Goleft = async () => {
    if (indx == 0 && imgs.length > 1) {
      setIndx(imgs.length - 1);
      console.log("left1 index = ",indx);
    } else if (imgs.length > 1) {
      setIndx((prev) => parseInt(prev)-1);
      console.log("left2 index = ",indx);
    } else {
      console.log("bug");
    }
    console.log("indx = ",indx);

    setNowimg({
      file: URL.createObjectURL(imgs[indx]),
      filename: imgs[indx].name,
    });
    console.log("image = ",imgs[indx].name);

    const temp2box = boxes.map(item => {
      if (item[0] == nowimg.filename){
        document.title = nowimg.filename;
        return item; 
      }
      else{
        return null;
      }
    }).filter(item => {
      return item != null
    })
    // console.log("temp2box",temp2box);
    setNowbox(temp2box);
    // Updateimg();
    setDelayT(prev => parseInt(prev)+1)
  };

  const Goright = async () => {
    if (indx == imgs.length - 1 && imgs.length > 1) {
      setIndx(0);
      console.log("right1 index = ",indx);
    } else if (indx < imgs.length-1) {
      setIndx((prev) => parseInt(prev)+1);
      console.log("right2 index = ",indx);
    } else {
      console.log("bug");
    }
    console.log("indx = ",indx);
    // Updateimg();
    // console.log(boxes);
  };

  function backtohome() {
    changeshows(false);
  }

  const Changeid = (num) => {
    const value = parseInt(num);
    if (value >=0 && value < imgs.length){
      setIndx(value);
      console.log(value,indx);
      // Updateimg();
      console.log("imgs = ",imgs);
    }
  }

  const togglel = () => {setDl(prev => !prev);}
  const toggle0 = () => {setD0(prev => !prev);}
  const toggle1 = () => {setD1(prev => !prev);}
  const toggle2 = () => {setD2(prev => !prev);}
  const toggle3 = () => {setD3(prev => !prev);}
  const toggle4 = () => {setD4(prev => !prev);}
  const toggle5 = () => {setD5(prev => !prev);}
  const toggle6 = () => {setD6(prev => !prev);}
  const toggle7 = () => {setD7(prev => !prev);}

  return (
    <>
      <Container fluid></Container>
      <Row>
        <Col>
              <nav className="navbar">
            <ul className="navbar-nav">
              <hr className="line"></hr>
              <li className="nav-item">
                <a onClick={backtohome} className="nav-link">
                  <div className="nav-logo1"></div>
                  <span className="link-text">Back</span>
                </a>
              </li>
              <hr className="line"></hr>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <div className="nav-logo2"></div>
                  <span className="link-text">Inspection</span>
                </a>
              </li>
              <hr className="line"></hr>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <div className="nav-logo4"></div>
                  <span className="link-text">Upload Image</span>
                </a>
              </li>
              <hr className="line"></hr>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <div className="nav-logo3"></div>
                  <span className="link-text">Defect Information</span>
                </a>
              </li>
              <hr className="line"></hr>
            </ul>
          </nav>
        </Col>
        <Col sm={4}>
          <checkTab></checkTab>
          <button onClick={() => Goleft()}>left</button>
          <button onClick={() => Goright()}>right</button>
          <button onClick={() => togglel()}>all</button>
          <button onClick={() => toggle0()}>bypass</button>
          <button onClick={() => toggle1()}>hotspot</button>
          <button onClick={() => toggle2()}>vegetation</button>
          <button onClick={() => toggle3()}>pid</button>
          <button onClick={() => toggle4()}>module hot</button>
          <button onClick={() => toggle5()}>string short</button>
          <button onClick={() => toggle6()}>string reverse</button>
          <button onClick={() => toggle7()}>rack</button>
          {/* <button onClick={backtohome}>back</button> */}

          <input type="range" min={0} max={imgs.length-1} value={indx} onChange={e => Changeid(e.target.value)}></input>
          <h1>{indx}</h1>
        </Col>
        <Col sm={7}>
          {Paper(delayT,indx,nowbox,dl,d0,d1,d2,d3,d4,d5,d6,d7)}
          {/* <Canvas sty="border:1px solid" nowbox={nowbox} dl={dl} d0={d0} d1={d1} d2={d2} d3={d3} d4={d4} d5={d5} d6={d6} d7={d7} ></Canvas> */}
          <img className="image-view" src={nowimg.file}></img>
         
        </Col>
      </Row>
    </>
  );
}

export default App;
