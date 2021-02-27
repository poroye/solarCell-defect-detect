import React from "react";
import "./Home.css";
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropzone from './Dropzone';

function Home({boxes,changeboxes,changeshows,imgs,changeimgs,enableemptys,changeenable}) {

const clk = () => {
  changeboxes(7)
}

  return (<>
            {/* <button onClick={clk}></button> */}
            <Container fluid className="landing1">
      <Row>
        <Col>
          {/* <div className="SolFlat s0"></div>
          <div className="SolFlat s1"></div>
          <div className="SolFlat s2"></div> */}
        </Col>
        <Col>
        <div className="card">
          <div className="card-header">
            <h4 className="my-0 font-weight-normal txt">Upload Image</h4>
          </div>
          <div className="card-body">
            <Dropzone boxes={boxes} changeboxes={changeboxes} changeshows={changeshows} imgs={imgs} changeimgs={changeimgs} enableemptys={enableemptys} changeenable={changeenable}/>
          </div>
        </div>
        </Col>
        <Col>
            {/* <div className="engCha"></div> */}
        </Col>
      </Row>
    </Container>
          </>);
}

export default Home;
