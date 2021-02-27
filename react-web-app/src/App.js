import React, { useState , useEffect } from "react";
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
  const [d0n,setD0n] = useState(0);
  const [d1n,setD1n] = useState(0);
  const [d2n,setD2n] = useState(0);
  const [d3n,setD3n] = useState(0);
  const [d4n,setD4n] = useState(0);
  const [d5n,setD5n] = useState(0);
  const [d6n,setD6n] = useState(0);
  const [d7n,setD7n] = useState(0);

  useEffect(() => {
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
    console.log("in app => ",nowbox)
    setD0n(0);
    setD1n(0);
    setD2n(0);
    setD3n(0);
    setD4n(0);
    setD5n(0);
    setD6n(0);
    setD7n(0);
    nowbox.map(item => {
      if(item[1]==0){
        setD0n(prev => parseInt(prev)+1);
      }
      if(item[1]==1){
        setD1n(prev => parseInt(prev)+1);
      }
      if(item[1]==2){
        setD2n(prev => parseInt(prev)+1);
      }
      if(item[1]==3){
        setD3n(prev => parseInt(prev)+1);
      }
      if(item[1]==4){
        setD4n(prev => parseInt(prev)+1);
      }
      if(item[1]==5){
        setD5n(prev => parseInt(prev)+1);
      }
      if(item[1]==6){
        setD6n(prev => parseInt(prev)+1);
      }
      if(item[1]==7){
        setD7n(prev => parseInt(prev)+1);
      }



    })
    // Updateimg();
  },[indx]);

  function Updateimg() {
    setNowimg({
      file: URL.createObjectURL(imgs[indx]),
      filename: imgs[indx].name,
    });
    console.log("image = ",imgs[indx].name);
  }

  const Goleft = async () => {
    if (indx == 0 && imgs.length > 1) {
      console.log("left1");
      setIndx(imgs.length - 1);
    } else if (imgs.length > 1) {
      console.log("left2");
      setIndx((prev) => parseInt(prev)-1);
    } else {
      console.log("bug");
    }
    Updateimg();
  };

  const Goright = async () => {
    if (indx == imgs.length - 1 && imgs.length > 1) {
      console.log("right1");
      setIndx(0);
    } else if (indx < imgs.length-1) {
      console.log("right2",indx);
      setIndx((prev) => parseInt(prev)+1);
    } else {
      console.log("bug");
    }
    Updateimg();
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
      Updateimg();
      console.log("imgs = ",imgs);
    }
  }

  const togglel = () => {
    setDl(prev => !prev);
  }
  const toggle0 = () => {
    setD0(prev => !prev);
  }
  const toggle1 = () => {
    setD1(prev => !prev);
  }
  const toggle2 = () => {
    setD2(prev => !prev);
  }
  const toggle3 = () => {
    setD3(prev => !prev);
  }
  const toggle4 = () => {
    setD4(prev => !prev);
  }
  const toggle5 = () => {
    setD5(prev => !prev);
  }
  const toggle6 = () => {
    setD6(prev => !prev);
  }
  const toggle7 = () => {
    setD7(prev => !prev);
  }

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
          <button onClick={() => toggle0()}>bypass {d0n}</button>
          <button onClick={() => toggle1()}>hotspot {d1n}</button>
          <button onClick={() => toggle2()}>vegetation {d2n}</button>
          <button onClick={() => toggle3()}>pid {d3n}</button>
          <button onClick={() => toggle4()}>module hot {d4n}</button>
          <button onClick={() => toggle5()}>string short {d5n}</button>
          <button onClick={() => toggle6()}>string reverse {d6n}</button>
          <button onClick={() => toggle7()}>rack {d7n}</button>
          {/* <button onClick={backtohome}>back</button> */}

          {/* <input type="range" min={0} max={imgs.length-1} value={indx} onChange={e => Changeid(e.target.value)}></input> */}
          <h1>{indx}</h1>
        </Col>
        <Col sm={7}>
          <Canvas sty="border:1px solid" nowbox={nowbox} dl={dl} d0={d0} d1={d1} d2={d2} d3={d3} d4={d4} d5={d5} d6={d6} d7={d7} ></Canvas>
          <img className="image-view" src={nowimg.file}></img>
         
        </Col>
      </Row>
    </>
  );
}

export default App;
