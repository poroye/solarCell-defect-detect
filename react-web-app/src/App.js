import React, { useState , useEffect , useRef } from "react";
import "./app.css";
import Paper from './Paper';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Switch from 'react-switch';
import  Alert  from "react-bootstrap/Alert";
import bypassInfor from './img/Bypass-infor.jpg';
import hotspotInfor from './img/Hotspots-info.jpg';
import vegInfor from './img/veg.jpg';
import pidInfor from './img/pid.jpg';
import moduleInfor from './img/module.jpg';
import ssInfor from './img/ss.jpg';
import srInfor from './img/sr.jpg';

function App({ boxes, changeshows, imgs }) {
/////////////////////////////para config///////////////////////////////////
  // let tapmode = 0;
  const [tapmode,setTapmode] = useState(0);
  const confi = 0.4;
  const counter = useRef(0);
  const [indx, setIndx] = useState(0);
  const [slide,setSlide] = useState(counter.current);

  const [showname,setShowname] = useState("");

  const informationRef = useRef();
  
  ///toggle button//////////////////////


  const [sw,setSw] = useState(false);
  const swRef = useRef(false);
  
  useEffect(() =>{
    console.log("HandleChange:",sw);
  },[sw]);

  useEffect(()=>{informationRef.current.style.display = "block";},[])

  var solarimg = {
    file: URL.createObjectURL(imgs[counter.current]),
    filename: imgs[counter.current].name
  };

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

  useEffect(() => {
    const temp2box = boxes.map(item => {
      if (item[0] == solarimg.filename){
        document.title = solarimg.filename;
        return item; }
      else{return null;}
    }).filter(item => {
      return item != null})

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
    if(sw == false){setSw(true);}
    else{setSw(false)}}

////////////infoButton/////////////////////////////////////////////////////////////////////////////

  const [showInformation, setShowInformation] = useState(false);
  const [showInformationVar, setShowInformationVar] = useState(0);
	
  const infoClick = (num) => {
    console.log("click on ",num,showInformation,showInformationVar);
    if (showInformation ){
      if (showInformationVar != num){setShowInformationVar(parseInt(num));}
      else{setShowInformation(false);}
    }
    else{
      setShowInformation(true);
      setShowInformationVar(parseInt(num));
    }
}

    // const infoClick=()=>{
    //   console.log("bug");
    // }
  ////////////I/////////////////////////////////////////////////////////////
  function Updateimg() {
    solarimg = {file: URL.createObjectURL(imgs[counter.current]),filename: imgs[counter.current].name};
    document.title = imgs[counter.current].name;
    setShowname(imgs[counter.current].name);
    setSlide(counter.current);
    if (d0n > 0){setD0(true);}  if (d1n > 0){setD1(true);} if (d2n > 0){setD2(true);}  if (d3n > 0){setD3(true);}
    if (d4n > 0){setD4(true);}  if (d5n > 0){setD5(true);} if (d6n > 0){setD6(true);}  if (d7n > 0){setD7(true);} }

  const Goleft = () => {
    if (counter.current == 0 && imgs.length > 1) {
      setIndx(imgs.length - 1);
      counter.current = imgs.length - 1;
    } else if (imgs.length > 1) {
      setIndx((prev) => parseInt(prev)-1);
      counter.current = counter.current - 1;}
    Updateimg();
  };

  const Goright = () => {
    if (counter.current == imgs.length - 1 && imgs.length > 1) {
      setIndx(0);
      counter.current = 0;
    } else if (counter.current < imgs.length-1) {
      setIndx((prev) => parseInt(prev)+1);
      counter.current = counter.current + 1;}
    Updateimg();
  };

  function backtohome() {changeshows(1);}

  const Changeid = (num) => {
    const value = parseInt(num);
    if (value >=0 && value < imgs.length){
      counter.current = value;
      Updateimg();}}

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
    if(d0n>0 || d1n>0 || d2n>0 || d3n>0 || d4n>0 || d5n>0 || d6n>0){
      setDl(prev => !prev);
      if (d0n>0 && d0){setD0(prev => !prev);} if (d1n>0 && d1){setD1(prev => !prev);}
      if (d2n>0 && d2){setD2(prev => !prev);} if (d3n>0 && d3){setD3(prev => !prev);}
      if (d4n>0 && d4){setD4(prev => !prev);} if (d5n>0 && d5){setD5(prev => !prev);}
      if (d6n>0 && d6){setD6(prev => !prev);}
    }
  }
  const toggle0 = (checked) => {if (d0n>0 && dl){setD0(prev => !prev);}}
  const toggle1 = (checked) => {if (d1n>0 && dl){setD1(prev => !prev);}}
  const toggle2 = (checked) => {if (d2n>0 && dl){setD2(prev => !prev);}}
  const toggle3 = (checked) => {if (d3n>0 && dl){setD3(prev => !prev);}}
  const toggle4 = (checked) => {if (d4n>0 && dl){setD4(prev => !prev);}}
  const toggle5 = (checked) => {if (d5n>0 && dl){setD5(prev => !prev);}}
  const toggle6 = (checked) => {if (d6n>0 && dl){setD6(prev => !prev);}}
  const toggle7 = (checked) => {if (d7n>0){setD7(prev => !prev);}}
  const something = () => {}

  const renderslider = () => {
    if (imgs.length>1){
      return (
      <div className="slider-all">
        <div onClick={() => Goleft()} className="left-but"></div>
        <div>
          <h1 className="range-txt" style={{color:"white"}} >{parseInt(counter.current)+1} / {imgs.length}</h1>
          <input type="range" min={0} max={imgs.length-1} value={slide} onChange={e => Changeid(e.target.value)} className="slider" ></input>
        </div>
        <div onClick={() => Goright()} className="right-but"></div>
      </div>);}
  }

  const display = () => { changeshows(2);}

  const inform = () => {
    informationRef.current.display="block";
    alert('A');
  }
  return (
      <Container fluid className="process1">
      <Row>
        <Col sm={5}>
          <div className="checkTab">
            <div className="file-name-bar">
              <a href="/">
                  <div className="nav-logo1"></div>
              </a>
              <span className="file-name-txt">{showname}</span>
            </div>
            <div className="over-flow-check">
              <div className="check-tab" onClick={togglel}>
                  {dl ? <span className="defect-txt">All Defect enable</span> : <span className="defect-txt" style={{color:"#777"}}>All Defect disable</span>}
                  {dl ? <div className="number">{d0n+d1n+d2n+d3n+d4n+d5n+d6n}</div> : <div className="number" style={{color:"#777"}}>{d0n+d1n+d2n+d3n+d4n+d5n+d6n}</div>}
                  <Switch onColor="#E8398A" onHandleColor="#FFFFFF" uncheckedIcon={false} checkedIcon={false} onChange={something} checked={dl} className="react-switch" height={18} width={36}/>
              </div>
              <div className="check-tab" onClick={toggle0}>
                  {d0n > 0 ? <span className="defect-txt">Bypass Diode</span> : <span className="defect-txt" style={{color:"#777"}}>Bypass Diode</span>}
                  {d0n > 0 ? <div className="number">{d0n}</div> : <div className="number" style={{color:"#777"}}>{d0n}</div>}
                  <Switch onColor="#0F01C6" onHandleColor="#FFFFFF"  uncheckedIcon={false} checkedIcon={false} onChange={something} checked={d0} disabled = {d0n==0} className="react-switch" height={18} width={36}/>
              </div>

              <div className="information-btn1" ref={informationRef}>
                  <div className="inform-icon" onClick={() => infoClick(1)}>
                  </div>
              </div>

              <div className="check-tab" onClick={toggle1}>
                  {d1n > 0 ? <span className="defect-txt">Hotspot</span> : <span className="defect-txt" style={{color:"#777"}}>Hotspot</span>}
                  {d1n > 0 ? <div className="number">{d1n}</div> : <div className="number" style={{color:"#777"}}>{d1n}</div>}
                  <Switch onColor="#FF0000" onHandleColor="#FFFFFF"  uncheckedIcon={false} checkedIcon={false} onChange={something} checked={d1} disabled = {d1n==0} className="react-switch" height={18} width={36}/>
              </div>

              <div className="information-btn2" ref={informationRef}>
                  <div className="inform-icon" onClick={() => infoClick(2)}>
                  </div>
              </div>

              <div className="check-tab" onClick={toggle2}>
                  {d2n > 0 ? <span className="defect-txt">Vegetation</span> : <span className="defect-txt" style={{color:"#777"}}>Vegetation</span>}
                  {d2n > 0 ? <div className="number">{d2n}</div> : <div className="number" style={{color:"#777"}}>{d2n}</div>}
                  <Switch onColor="#059908" onHandleColor="#FFFFFF" uncheckedIcon={false} checkedIcon={false} onChange={something} checked={d2} disabled = {d2n==0} className="react-switch" height={18} width={36}/>
              </div>

              <div className="information-btn3" ref={informationRef}>
                  <div className="inform-icon" onClick={() => infoClick(3)}>
                  </div>
              </div>

              <div className="check-tab" onClick={toggle3}>
                  {d3n > 0 ? <span className="defect-txt">PID</span> : <span className="defect-txt" style={{color:"#777"}}>PID</span>}
                  {d3n > 0 ? <div className="number">{d3n}</div> : <div className="number" style={{color:"#777"}}>{d3n}</div>}
                  <Switch onColor="#8E0CFF" onHandleColor="#FFFFFF" uncheckedIcon={false} checkedIcon={false} onChange={something} checked={d3} disabled = {d3n==0} className="react-switch" height={18} width={36}/>
              </div>

              <div className="information-btn4" ref={informationRef}>
                  <div className="inform-icon" onClick={() => infoClick(4)}>
                  </div>
              </div>

              <div className="check-tab" onClick={toggle4}>
                  {d4n > 0 ? <span className="defect-txt">Module Hot</span> : <span className="defect-txt" style={{color:"#777"}}>Module Hot</span>}
                  {d4n > 0 ? <div className="number">{d4n}</div> : <div className="number" style={{color:"#777"}}>{d4n}</div>}         
                  <Switch onColor="#FF8B00" onHandleColor="#FFFFFF"  uncheckedIcon={false} checkedIcon={false} onChange={something} checked={d4} disabled = {d4n==0} className="react-switch" height={18} width={36}/>
              </div>

              <div className="information-btn5" ref={informationRef}>
                  <div className="inform-icon" onClick={() => infoClick(5)}>
                  </div>
              </div>

              <div className="check-tab" onClick={toggle5}>
                  {d5n > 0 ? <span className="defect-txt">String Short</span> : <span className="defect-txt" style={{color:"#777"}}>String Short</span>}
                  {d5n > 0 ? <div className="number">{d5n}</div> : <div className="number" style={{color:"#777"}}>{d5n}</div>}    
                  <Switch onColor="#00FF76" onHandleColor="#FFFFFF" uncheckedIcon={false} checkedIcon={false} onChange={something} checked={d5} disabled = {d5n==0} className="react-switch" height={18} width={36}/>
              </div>

              <div className="information-btn6" ref={informationRef}>
                  <div className="inform-icon" onClick={() => infoClick(6)}>
                  </div>
              </div>

              <div className="check-tab" onClick={toggle6}>
                  {d6n > 0 ? <span className="defect-txt">String Reverse</span> : <span className="defect-txt" style={{color:"#777"}}>String Reverse</span>}
                  {d6n > 0 ? <div className="number">{d6n}</div> : <div className="number" style={{color:"#777"}}>{d6n}</div>}  
                  <Switch onColor="#FF66EC" onHandleColor="#FFFFFF" uncheckedIcon={false} checkedIcon={false} onChange={something} checked={d6} disabled = {d6n==0} className="react-switch" height={18} width={36}/>
              </div>

              <div className="information-btn7" ref={informationRef}>
                  <div className="inform-icon" onClick={() => infoClick(7)}>
                  </div>
              </div>

              <div className="check-tab" onClick={toggle7}>
                  {d7n > 0 ? <span className="defect-txt">Rack</span> : <span className="defect-txt" style={{color:"#777"}}>Rack</span>}
                  {d7n > 0 ? <div className="number">{d7n}</div> : <div className="number" style={{color:"#777"}}>{d7n}</div>}
                  <Switch onColor="#FFD800" onHandleColor="#FFFFFF" uncheckedIcon={false} checkedIcon={false} onChange={something} checked={d7} disabled = {d7n==0} className="react-switch" height={18} width={36}/>
              </div>
            </div>
            <button className="Dowload-btn" onClick={display}>Download</button>
          </div> 
        </Col>
        <Col sm={7}>
          <div className="slider-tab">
            {showInformation && showInformationVar == 1 && <div className="info-content1">
                <img className="bypass-img" src={bypassInfor}></img>
                <div className="info-head">Bypass Diode</div>
                <div className="info-txt">By-pass diode is caused by defective cell that leads 
                to voltage drop, diode is activated to prevent power loss of the whole panel. 
                When it is activated, it means that at least 1/3 of the power is reduced.</div>
              </div>}
            {showInformation && showInformationVar == 2 && <div className="info-content1">
              <img className="hotspot-img" src={hotspotInfor}></img>
              <div className="info-head">Hotspots</div>
              <div className="info-txt">Hot spot is mostly caused by a defective cell 
              inside the PV module (micro crack, poor manufacturing, etc.) and can also be caused 
              by temporary shadowing.</div>
            </div>}
            {showInformation && showInformationVar == 3 && <div className="info-content1">
              <img className="veget-img" src={vegInfor}></img>
              <div className="info-head">Vegetation</div>
              <div className="info-txt"> This is an indication of a PV modules having plants or vegetation 
              covering the module. The vegetation should be gotten rid as soon as possible before it causes 
              a permanent hotspots</div>
            </div>}
            {showInformation && showInformationVar == 4 && <div className="info-content1">
              <img className="pid-img" src={pidInfor}></img>
              <div className="info-head">PID</div>
              <div className="info-txt">This is caused by the electricity property of the panel itself. 
              This case is frequently found in the old technology panels. Recent panel models have Anti-PID technology.</div>
            </div>}
            {showInformation && showInformationVar == 5 && <div className="info-content1">
              <img className="module-img" src={moduleInfor}></img>
              <div className="info-head">Module Hot</div>
              <div className="info-txt">This is when the whole module is malfunction either from the manufacturer 
              or problem happens after the installation</div>
            </div>}
            {showInformation && showInformationVar == 6 && <div className="info-content1">
              <img className="ss-img" src={ssInfor}></img>
              <div className="info-head">String Short</div>
              <div className="info-txt">This is due to wiring of the string which might be shorted, loosen or ground fault.</div>
            </div>}
            {showInformation && showInformationVar == 7 && <div className="info-content1">
              <img className="sr-img" src={srInfor}></img>
              <div className="info-head">String Reverse</div>
              <div className="info-txt">This is due to a reverse polarity connection which is likely a human error during installation at array box or DC Panel.</div>
            </div>}
            <div onClick={backtohome} className="upload-btn">
              <div className="upload-logo"></div>
            </div>
            {renderslider()}
          </div>
          <Paper confi={confi} counter={counter.current} nowbox={nowbox} dl={dl} d0={d0} d1={d1} d2={d2} d3={d3} d4={d4} d5={d5} d6={d6} d7={d7} size={800}></Paper>
          <img className="image-view" src={solarimg.file}></img>
        </Col>
      </Row>
      </Container>
  );
}

export default App;
