import React from "react";
import "./Home.css";
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom';
import {Button} from 'react-bootstrap';
import {Card} from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropzone from './Dropzone';
// export default function Home(){
//     return(
//         {/* <h1> Pond </h1>
//            <a href="./App">
//                <button>Click</button>
//         </a> */}
//         <variable/>

//     );
// }

// function variable(props) {
//     return
// };
function Home() {
  return <HomeVariable {...HomeImage} />;
}

export default Home;


function HomeVariable(props) {
  const {
    // overlapGroup,
    // kmitl,
    // text3,
    // gunkul,
    upload,
    // text1,
    // vector,
    // vector2,
    // vector3,
    // vector4,
    // spanText,
    // spanText2,
    // spanText3,
    // line3,
    // title,
    // addFile,
  } = props;

  return (
    <Container fluid className="landing1">
      <Row>
        <Col>
        </Col>
        <Col>
        <div class="card shadow">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal txt">Upload Image</h4>
          </div>
          {/* <div class="card-body d-flex flex-column"> */}
            <Dropzone/>
            {/* <div className="text-center">
            <h1 class="txt " id="uploadtxt">Accepted file type: JPEG only</h1>
              <a href="./App">
                <button type="button" class="mt-auto btn  btn-primary">Upload</button>
              </a>
            </div> */}
          {/* </div> */}
        </div>
        </Col>
        <Col>
        </Col>
      </Row>
    </Container>
  ); 
}
const HomeImage = {
    // overlapGroup: "https://anima-uploads.s3.amazonaws.com/projects/6028dbaf6887d819c8dec3d4/releases/6028dbdf016102957107eae1/img/rectangle-48@1x.svg",
    // kmitl: "KMITL",
    // text3: "&",
    // gunkul: "GUNKUL",
    upload: "Upload",
    // text1: "Accepted File Type: JPEG and JPEG2000 only",
    // vector: "https://anima-uploads.s3.amazonaws.com/projects/6028dbaf6887d819c8dec3d4/releases/602a402d41e1bc62eb2aaeca/img/vector@2x.svg",
    // vector2: "https://anima-uploads.s3.amazonaws.com/projects/6028dbaf6887d819c8dec3d4/releases/602a402d41e1bc62eb2aaeca/img/vector-1@2x.svg",
    // vector3: "https://anima-uploads.s3.amazonaws.com/projects/6028dbaf6887d819c8dec3d4/releases/6028dbdf016102957107eae1/img/vector-23@2x.svg",
    // vector4: "https://anima-uploads.s3.amazonaws.com/projects/6028dbaf6887d819c8dec3d4/releases/602a402d41e1bc62eb2aaeca/img/vector@2x.svg",
    // spanText: "Drag & Drop here",
    // spanText2: "or",
    // spanText3: "Browse file",
    // line3: "https://anima-uploads.s3.amazonaws.com/projects/6028dbaf6887d819c8dec3d4/releases/6028dbdf016102957107eae1/img/line-3@2x.svg",
    // title: "Title",
    // addFile: "Add file",
};

