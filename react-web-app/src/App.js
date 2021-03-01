import React, { useState , useEffect , useRef } from "react";
import "./app.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Switch from 'react-switch';
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
    console.log("HandleChange:",d7);
    if (nowbox.length > 0){
      nowbox.map(item => {
        const rInfo = {x:item[3][0]*800, y:item[3][1]*800, w:item[3][2]*800, h:item[3][3]*800 };
        let rstyle = { borderColor: 'black', borderWidth: 0.1 };
        if(item[1] == 0 && d0 && dl && item[2] > confi)     {rstyle = { borderColor: 'blue',  borderWidth: 3 };}
        else if(item[1] == 1 && d1 && dl && item[2] > confi){rstyle = { borderColor: 'red',    borderWidth: 3 };}
        else if(item[1] == 2 && d2 && dl && item[2] > confi){rstyle = { borderColor: 'green',  borderWidth: 3 };}
        else if(item[1] == 3 && d3 && dl && item[2] > confi){rstyle = { borderColor: 'purple', borderWidth: 3 };}
        else if(item[1] == 4 && d4 && dl && item[2] > confi){rstyle = { borderColor: 'orange', borderWidth: 3 };}
        else if(item[1] == 5 && d5 && dl && item[2] > confi){rstyle = { borderColor: 'lightgreen',   borderWidth: 3 };}
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

  const [showname,setShowname] = useState("");
  
  ///toggle button//////////////////////
  const [sw,setSw] = useState(false);
  const swRef = useRef(false);
  useEffect(() =>{
    console.log("HandleChange:",sw);
  },[sw]);
  //////////////////////////////////////////

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
        setShowname(solarimg.filename);
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
    setShowname(solarimg.filename);
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

///Togle Button//////////////////////////////////////////////////////////////////////////
  function handleChange(checked){
    console.log("Checked:",checked);
    if(sw == false){
      setSw(true);
    }
    else{
      setSw(false)
    }
  }
/////////////////////////////////////////////////////////////////////////////////////////

  function Updateimg() {
    solarimg = {
      file: URL.createObjectURL(imgs[counter.current]),
      filename: imgs[counter.current].name,
    };
    console.log("update image = ",imgs[counter.current].name)
    document.title = imgs[counter.current].name;
    setShowname(imgs[counter.current].name);
    setSlide(counter.current);
    if (d0n > 0){setD0(true);}  if (d1n > 0){setD1(true);}
    if (d2n > 0){setD2(true);}  if (d3n > 0){setD3(true);}
    if (d4n > 0){setD4(true);}  if (d5n > 0){setD5(true);}
    if (d6n > 0){setD6(true);}  if (d7n > 0){setD7(true);}
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
    if(d0n > 0 && d0 == true){bypasssty.current = {background: "blue"};}
    else {bypasssty.current = {background: "#898989"};}

    if(d1n > 0 && d1 == true){hotspotsty.current = {background: "red"};}
    else {hotspotsty.current = {background: "#898989"};}

    if(d2n > 0 && d2 == true){vegetsty.current = {background: "green"};}
    else {vegetsty.current = {background: "#898989"};}

    if(d3n > 0 && d3 == true){pidsty.current = {background: "purple"};}
    else {pidsty.current = {background: "#898989"};}

    if(d4n > 0 && d4 == true){modulesty.current = {background: "orange"};}
    else {modulesty.current = {background: "#898989"};}

    if(d5n > 0 && d5 == true){sssty.current = {background: "lightgreen"};}
    else {sssty.current = {background: "#898989"};}

    if(d6n > 0 && d6 == true){srsty.current = {background: "pink"};}
    else {srsty.current = {background: "#898989"};}
  });


  const togglel = (checked) => {
    setDl(prev => !prev);
    if (d0n>0){setD0(prev => !prev);}
    if (d1n>0){setD1(prev => !prev);}
    if (d2n>0){setD2(prev => !prev);}
    if (d3n>0){setD3(prev => !prev);}
    if (d4n>0){setD4(prev => !prev);}
    if (d5n>0){setD5(prev => !prev);}
    if (d6n>0){setD6(prev => !prev);}
  }
  const toggle0 = (checked) => {if (d0n>0){setD0(prev => !prev);}}
  const toggle1 = (checked) => {if (d1n>0){setD1(prev => !prev);}}
  const toggle2 = (checked) => {if (d2n>0){setD2(prev => !prev);}}
  const toggle3 = (checked) => {if (d3n>0){setD3(prev => !prev);}}
  const toggle4 = (checked) => {if (d4n>0){setD4(prev => !prev);}}
  const toggle5 = (checked) => {if (d5n>0){setD5(prev => !prev);}}
  const toggle6 = (checked) => {if (d6n>0){setD6(prev => !prev);}}
  const toggle7 = (checked) => {if (d7n>0){setD7(prev => !prev);}}
  const something = () => {}

  const renderslider = () => {
    if (imgs.length>1){
      return (
      <div>
        <div onClick={() => Goleft()} className="left-but"></div>
        <div>
          <h1 className="range-txt" style={{color:"white"}} >{parseInt(counter.current)+1} / {imgs.length}</h1>
          <input type="range" min={0} max={imgs.length-1} value={slide} onChange={e => Changeid(e.target.value)} className="slider" ></input>
        </div>
        <div onClick={() => Goright()} className="right-but"></div>
      </div>);
    }
  }

  return (
      <Container fluid className="process1">
      <Row>
        <Col>
          <nav className="navbar">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a href="/" className="nav-link">
                  <div className="nav-logo1"></div>
                  <span className="link-text">Back</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <div className="ex-box"></div>
                  <div className="nav-logo2"></div>
                  <span className="link-text">Inspection</span>
                </a>
              </li>
              <li className="nav-item">
                <a onClick={backtohome} className="nav-link">
                  <div className="ex-box"></div>
                  <div className="nav-logo4"></div>
                  <span className="link-text">Upload Image</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <div className="ex-box"></div>
                  <div className="nav-logo3"></div>
                  <span className="link-text">Defect Information</span>
                </a>
              </li>
            </ul>
          </nav>
        </Col>
        <Col sm={4}>
          <div className="checkTab">
            <div className="file-name-bar">
              <span className="file-name-txt">{showname}</span>
            </div>
            <div className="over-flow-check">
              {/* <div className="check-tab" onClick={() => togglel()}>
                  <span className="defect-txt">All</span>
                  <div className="number">{d0n+d1n+d2n+d3n+d4n+d5n+d6n}</div>
              </div> */}
              <div className="check-tab" onClick={togglel}>
                  {dl ? <span className="defect-txt">All Defect</span> : <span className="defect-txt" style={{color:"#777"}}>All Defect</span>}
                  {dl ? <div className="number">{d0n+d1n+d2n+d3n+d4n+d5n+d6n}</div> : <div className="number" style={{color:"#777"}}>{d0n+d1n+d2n+d3n+d4n+d5n+d6n}</div>}
                  <Switch onColor="#0076FF"
                    onHandleColor="#FFFFFF" 
                    uncheckedIcon={false}
                    checkedIcon={false} 
                    // onClick={togglel} 
                    onChange={something}
                    checked={dl}
                    className="react-switch"
                    height={18}
                    width={36}
                  />
              </div>
              <div className="check-tab" onClick={toggle0}>
                  {d0n > 0 ? <span className="defect-txt">Bypass Diode</span> : <span className="defect-txt" style={{color:"#777"}}>Bypass Diode</span>}
                  {d0n > 0 ? <div className="number">{d0n}</div> : <div className="number" style={{color:"#777"}}>{d0n}</div>}
                  <Switch onColor="#0076FF"
                    onHandleColor="#FFFFFF" 
                    uncheckedIcon={false}
                    checkedIcon={false} 
                    onClick={toggle0} 
                    onChange={something}
                    checked={d0}
                    disabled = {d0n==0}
                    className="react-switch"
                    height={18}
                    width={36}
                  />
              </div>
              <div className="check-tab" onClick={toggle1}>
                  {d1n > 0 ? <span className="defect-txt">Hotspot</span> : <span className="defect-txt" style={{color:"#777"}}>Hotspot</span>}
                  {d1n > 0 ? <div className="number">{d1n}</div> : <div className="number" style={{color:"#777"}}>{d1n}</div>}
                  <Switch onColor="#FF0000"
                    onHandleColor="#FFFFFF" 
                    uncheckedIcon={false}
                    checkedIcon={false} 
                    onClick={toggle1} 
                    onChange={something}
                    checked={d1}
                    disabled = {d1n==0}
                    className="react-switch"
                    height={18}
                    width={36}
                  />
              </div>
              <div className="check-tab" onClick={toggle2}>
                  {d2n > 0 ? <span className="defect-txt">Vegetation</span> : <span className="defect-txt" style={{color:"#777"}}>Vegetation</span>}
                  {d2n > 0 ? <div className="number">{d2n}</div> : <div className="number" style={{color:"#777"}}>{d2n}</div>}
                  <Switch onColor="#059908"
                    onHandleColor="#FFFFFF" 
                    uncheckedIcon={false}
                    checkedIcon={false} 
                    onClick={toggle2} 
                    onChange={something}
                    checked={d2}
                    disabled = {d2n==0}
                    className="react-switch"
                    height={18}
                    width={36}
                  />
              </div>
              <div className="check-tab" onClick={toggle3}>
                  {d3n > 0 ? <span className="defect-txt">PID</span> : <span className="defect-txt" style={{color:"#777"}}>PID</span>}
                  {d3n > 0 ? <div className="number">{d3n}</div> : <div className="number" style={{color:"#777"}}>{d3n}</div>}
                  <Switch onColor="#8E0CFF"
                    onHandleColor="#FFFFFF" 
                    uncheckedIcon={false}
                    checkedIcon={false} 
                    onClick={toggle3} 
                    onChange={something}
                    checked={d3}
                    disabled = {d3n==0}
                    className="react-switch"
                    height={18}
                    width={36}
                  />
              </div>
              <div className="check-tab" onClick={toggle4}>
                  {d4n > 0 ? <span className="defect-txt">Module Hot</span> : <span className="defect-txt" style={{color:"#777"}}>Module Hot</span>}
                  {d4n > 0 ? <div className="number">{d4n}</div> : <div className="number" style={{color:"#777"}}>{d4n}</div>}         
                  <Switch onColor="#FF8B00"
                    onHandleColor="#FFFFFF" 
                    uncheckedIcon={false}
                    checkedIcon={false} 
                    onClick={toggle4} 
                    onChange={something}
                    checked={d4}
                    disabled = {d4n==0}
                    className="react-switch"
                    height={18}
                    width={36}
                  />
              </div>
              <div className="check-tab" onClick={toggle5}>
                  {d5n > 0 ? <span className="defect-txt">String Short</span> : <span className="defect-txt" style={{color:"#777"}}>String Short</span>}
                  {d5n > 0 ? <div className="number">{d5n}</div> : <div className="number" style={{color:"#777"}}>{d5n}</div>}    
                  <Switch onColor="#00FF76"
                    onHandleColor="#FFFFFF" 
                    uncheckedIcon={false}
                    checkedIcon={false} 
                    onClick={toggle5} 
                    onChange={something}
                    checked={d5}
                    disabled = {d5n==0}
                    className="react-switch"
                    height={18}
                    width={36}
                  />
              </div>
              <div className="check-tab" onClick={toggle6}>
                  {d6n > 0 ? <span className="defect-txt">String Reverse</span> : <span className="defect-txt" style={{color:"#777"}}>String Reverse</span>}
                  {d6n > 0 ? <div className="number">{d6n}</div> : <div className="number" style={{color:"#777"}}>{d6n}</div>}  
                  <Switch onColor="#FF66EC"
                    onHandleColor="#FFFFFF" 
                    uncheckedIcon={false}
                    checkedIcon={false} 
                    onClick={toggle6} 
                    onChange={something}
                    checked={d6}
                    disabled = {d6n==0}
                    className="react-switch"
                    height={18}
                    width={36}
                  />
              </div>
              <div className="check-tab" onClick={toggle7}>
                  {d7n > 0 ? <span className="defect-txt">Rack</span> : <span className="defect-txt" style={{color:"#777"}}>Rack</span>}
                  {d7n > 0 ? <div className="number">{d7n}</div> : <div className="number" style={{color:"#777"}}>{d7n}</div>}
                  <Switch onColor="#FFD800"
                    onHandleColor="#FFFFFF" 
                    uncheckedIcon={false}
                    checkedIcon={false} 
                    onClick={toggle7} 
                    onChange={something}
                    checked={d7}
                    disabled = {d7n==0}
                    className="react-switch"
                    height={18}
                    width={36}
                  />
              </div>
            </div>
            <button className="Dowload-btn">Download</button>
          </div>
        </Col>
        <Col sm={7}>
          {renderslider()}
          {Paper(confi,counter.current,nowbox,dl,d0,d1,d2,d3,d4,d5,d6,d7)}
          <img className="image-view" src={solarimg.file}></img>
        </Col>
      </Row>
      </Container>
  );
}

export default App;
