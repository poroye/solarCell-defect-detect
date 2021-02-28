import React, { useState , useEffect , useRef } from "react";
import "./app.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function CheckTab() {
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

function Paper(confi,counter,nowbox,dl,d0,d1,d2,d3,d4,d5,d6,d7) {
  const canvas = useRef();
  let ctx = null;
  const [nowlist,setNowlist] = useState([]);
  useEffect(() => {
    const canvasEle = canvas.current;
    canvasEle.width = 800;
    canvasEle.height = 800;
    ctx = canvasEle.getContext("2d");
    nowlist.map(item => {drawRect(item[0],item[1]);});
    console.log("draw");
  });
  useEffect(() => {
    setNowlist([]);
    if (nowbox.length > 0){
      nowbox.map(item => {
        const rInfo = {x:item[3][0]*800, y:item[3][1]*800, w:item[3][2]*800, h:item[3][3]*800 };
        let rstyle = { borderColor: 'black', borderWidth: 0.1 };
        if(item[1] == 0 && d0 && dl && item[2] > confi)     {rstyle = { borderColor: 'white',  borderWidth: 3 };}
        else if(item[1] == 1 && d1 && dl && item[2] > confi){rstyle = { borderColor: 'red',    borderWidth: 3 };}
        else if(item[1] == 2 && d2 && dl && item[2] > confi){rstyle = { borderColor: 'green',  borderWidth: 3 };}
        else if(item[1] == 3 && d3 && dl && item[2] > confi){rstyle = { borderColor: 'purple', borderWidth: 3 };}
        else if(item[1] == 4 && d4 && dl && item[2] > confi){rstyle = { borderColor: 'orange', borderWidth: 3 };}
        else if(item[1] == 5 && d5 && dl && item[2] > confi){rstyle = { borderColor: 'blue',   borderWidth: 3 };}
        else if(item[1] == 6 && d6 && dl && item[2] > confi){rstyle = { borderColor: 'pink',   borderWidth: 3 };}
        else if(item[1] == 7 && d7 && item[2] > confi)      {rstyle = { borderColor: 'yellow', borderWidth: 3 };}
        setNowlist(prev => [...prev,[rInfo, rstyle]]);
      })
    }
  },[counter,nowbox,dl,d0,d1,d2,d3,d4,d5,d6,d7]);

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
    <div>
      <canvas ref={canvas} style={{border:'1px solid #999999',position:'absolute', zIndex:1 , marginTop:"5vh"}} ></canvas> 
    </div>
  );
}

function App({ boxes, changeboxes, changeshows, imgs, changeimgs }) {
/////////////////////////////para config///////////////////////////////////
  const confi = 0.4;
  const counter = useRef(0);
  const [indx, setIndx] = useState(0);
  const [slide,setSlide] = useState(counter.current);
  var solarimg = {
    file: URL.createObjectURL(imgs[counter.current]),
    filename: imgs[counter.current].name
  };
  // const [nowimg, setNowimg] = useState({
  //   file: URL.createObjectURL(imgs[counter.current]),
  //   filename: imgs[counter.current].name,
  // });
/////////////////////////////////////////start value////////////////////////
  let temp1box = []
  useEffect(() => {
    temp1box = boxes.map(item => {
      if (item[0] == solarimg.filename){
        document.title = solarimg.filename;
        console.log("match first = ",solarimg.filename)
        return item; 
      }
      else{
        return null;
      }
    }).filter(item => {
      return item != null
    })},[]);
//////////////////////////////////////////////////////////////////////////////
  const [nowbox,setNowbox] = useState(temp1box);
  const [dl,setDl] = useState(true);  const [d0,setD0] = useState(true);
  const [d1,setD1] = useState(true);  const [d2,setD2] = useState(true);
  const [d3,setD3] = useState(true);  const [d4,setD4] = useState(true);
  const [d5,setD5] = useState(true);  const [d6,setD6] = useState(true);
  const [d7,setD7] = useState(true);

  const [d0n,setD0n] = useState(0);   const [d1n,setD1n] = useState(0);
  const [d2n,setD2n] = useState(0);   const [d3n,setD3n] = useState(0);
  const [d4n,setD4n] = useState(0);   const [d5n,setD5n] = useState(0);
  const [d6n,setD6n] = useState(0);   const [d7n,setD7n] = useState(0);

///////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    const temp2box = boxes.map(item => {
      if (item[0] == solarimg.filename){
        document.title = solarimg.filename;
        console.log("match ",solarimg.filename)
        return item; 
      }
      else{
        return null;
      }
    }).filter(item => {
      return item != null
    })
    setNowbox(temp2box);
    setD0n(0);  setD1n(0);  setD2n(0);
    setD3n(0);  setD4n(0);  setD5n(0);
    setD6n(0);  setD7n(0);
    temp2box.map(item => {
      if(item[1]==0 && item[2] > confi){setD0n(prev => parseInt(prev)+1);}
      if(item[1]==1 && item[2] > confi){setD1n(prev => parseInt(prev)+1);}
      if(item[1]==2 && item[2] > confi){setD2n(prev => parseInt(prev)+1);}
      if(item[1]==3 && item[2] > confi){setD3n(prev => parseInt(prev)+1);}
      if(item[1]==4 && item[2] > confi){setD4n(prev => parseInt(prev)+1);}
      if(item[1]==5 && item[2] > confi){setD5n(prev => parseInt(prev)+1);}
      if(item[1]==6 && item[2] > confi){setD6n(prev => parseInt(prev)+1);}
      if(item[1]==7 && item[2] > confi){setD7n(prev => parseInt(prev)+1);}
    });
  },[counter.current]);

  function Updateimg() {
    solarimg = {
      file: URL.createObjectURL(imgs[counter.current]),
      filename: imgs[counter.current].name,
    };
    console.log("update image = ",imgs[counter.current].name)
    document.title = imgs[counter.current].name
    setSlide(counter.current);
    if (d0n > 0){setD0(true);}  if (d1n > 0){setD1(true);}
    if (d2n > 0){setD2(true);}  if (d3n > 0){setD3(true);}
    if (d4n > 0){setD4(true);}  if (d5n > 0){setD5(true);}
    if (d6n > 0){setD6(true);}
  }

  const Goleft = () => {
    if (counter.current == 0 && imgs.length > 1) {
      setIndx(imgs.length - 1);
      counter.current = imgs.length - 1;
    } else if (imgs.length > 1) {
      setIndx((prev) => parseInt(prev)-1);
      counter.current = counter.current - 1;
    }
    Updateimg();
  };

  const Goright = () => {
    if (counter.current == imgs.length - 1 && imgs.length > 1) {
      setIndx(0);
      counter.current = 0;
    } else if (counter.current < imgs.length-1) {
      setIndx((prev) => parseInt(prev)+1);
      counter.current = counter.current + 1;
    }
    Updateimg();
  };

  function backtohome() {changeshows(false);}

  const Changeid = (num) => {
    const value = parseInt(num);
    if (value >=0 && value < imgs.length){
      counter.current = value;
      Updateimg();
    }
  }

  const bypasssty = useRef({color: "black"});
  const hotspotsty = useRef({color: "black"});
  const vegetsty = useRef({color: "black"});
  const pidsty = useRef({color: "black"});
  const modulesty = useRef({color: "black"});
  const sssty = useRef({color: "black"});
  const srsty = useRef({color: "black"});

  useEffect(() => {
    if(d0n > 0 && d0 == true){bypasssty.current = {color: "white"};}
    else {bypasssty.current = {color: "black"};}

    if(d1n > 0 && d1 == true){hotspotsty.current = {color: "red"};}
    else {hotspotsty.current = {color: "black"};}

    if(d2n > 0 && d2 == true){vegetsty.current = {color: "green"};}
    else {vegetsty.current = {color: "black"};}

    if(d3n > 0 && d3 == true){pidsty.current = {color: "purple"};}
    else {pidsty.current = {color: "black"};}

    if(d4n > 0 && d4 == true){modulesty.current = {color: "orange"};}
    else {modulesty.current = {color: "black"};}

    if(d5n > 0 && d5 == true){sssty.current = {color: "blue"};}
    else {sssty.current = {color: "black"};}

    if(d6n > 0 && d6 == true){srsty.current = {color: "pink"};}
    else {srsty.current = {color: "black"};}
  });


  const togglel = () => {setDl(prev => !prev);}
  const toggle0 = () => {setD0(prev => !prev);}
  const toggle1 = () => {setD1(prev => !prev);}
  const toggle2 = () => {setD2(prev => !prev);}
  const toggle3 = () => {setD3(prev => !prev);}
  const toggle4 = () => {setD4(prev => !prev);}
  const toggle5 = () => {setD5(prev => !prev);}
  const toggle6 = () => {setD6(prev => !prev);}
  const toggle7 = () => {setD7(prev => !prev);}

  const renderslider = () => {
    if (imgs.length>1){
      return <input type="range" min={0} max={imgs.length-1} value={slide} onChange={e => Changeid(e.target.value)}></input>
    }
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
          {/* <CheckTab></CheckTab> */}
          <button onClick={() => Goleft()}>left</button>
          <button onClick={() => Goright()}>right</button>
          <button onClick={() => togglel()}>all {d0n+d1n+d2n+d3n+d4n+d5n+d6n+d7n}</button>
          <button onClick={() => toggle0()} style={bypasssty.current}>bypass {d0n}</button>
          <button onClick={() => toggle1()} style={hotspotsty.current}>hotspot {d1n}</button>
          <button onClick={() => toggle2()} style={vegetsty.current}>vegetation {d2n}</button>
          <button onClick={() => toggle3()} style={pidsty.current}>pid {d3n}</button>
          <button onClick={() => toggle4()} style={modulesty.current}>module hot {d4n}</button>
          <button onClick={() => toggle5()} style={sssty.current}>string short {d5n}</button>
          <button onClick={() => toggle6()} style={srsty.current}>string reverse {d6n}</button>
          <button onClick={() => toggle7()}>rack {d7n}</button>
          <br/>
          {renderslider}
        </Col>
        <Col sm={7}>
          {Paper(confi,counter.current,nowbox,dl,d0,d1,d2,d3,d4,d5,d6,d7)}
          <img className="image-view" src={solarimg.file}></img>
        </Col>
      </Row>
    </>
  );
}

export default App;
