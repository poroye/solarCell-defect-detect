import React , {useEffect} from "react";
import "./Home.css";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropzone from './Dropzone';
import axios from 'axios';

function Home({boxes,changeboxes,changeshows,imgs,changeimgs,enableemptys,changeenable}) {

  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/checkDb').then((res)=>{
      changeboxes(res.data);
      console.log("get database");
    })
  },[imgs])

  return (<>
    <Container fluid className="landing1">
      <Row>
        <Col></Col>
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
        <Col></Col>
      </Row>
    </Container>
  </>);
}

export default Home;
