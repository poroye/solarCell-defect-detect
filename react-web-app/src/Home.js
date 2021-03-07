import React , {useEffect} from "react";
import "./Home.css";
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropzone from './Dropzone';
import axios from 'axios';

function Home({boxes,changeboxes,changeshows,imgs,changeimgs,enableemptys,changeenable}) {
  const clk = () => {
    changeboxes(7)
  }

  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/getall').then((res)=>{
      changeboxes(res.data);
      console.log("get data");
    })
  },[imgs])

  return (<>
            {/* <button onClick={clk}></button> */}
            <Container fluid className="landing1">
      <Row>
        <Col>
          {/* <div className="SolFlat s0"></div>
          <div className="SolFlat s1"></div>
          <div className="SolFlat s2"></div> */}
        </Col>
        <div className="head-tab"></div>
        <Col>
        <div className="card">
          <div className="card-header">
            <h4 className="upload-txt">Upload Image</h4>
          </div>
          <div className="card-body">
            <Dropzone boxes={boxes} changeboxes={changeboxes} changeshows={changeshows} imgs={imgs} changeimgs={changeimgs} enableemptys={enableemptys} changeenable={changeenable}/>
          </div>
        </div>
        </Col>
        <Col>
            {/* <div className="history-card">
                <div className="card-header">
                  <h4 className="history-txt">History Images</h4>
                </div>
                <span className="recent-txt">Recent</span>
                <hr style={{border:'0.5px solid #FFFFFF', width:350,marginLeft:30,background:'white',marginTop:-280}}></hr>
                <div className="history-display-container">
                    <div className="historyCard">
                      <span className="history-file-name"></span>
                      <span className="history-file-size"></span>
                      <span className="history-date"></span>
                    </div>
                </div>
            </div> */}
            {/* <div className="engCha"></div> */}
        </Col>
      </Row>
    </Container>
          </>);
}

export default Home;
