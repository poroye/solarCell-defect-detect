import React from "react";
import "./app.css";

export default function App(){
    return(
      <Edit {...editData} />
    );
}


class Edit extends React.Component {
  render() {
    const {
      projectName, //text 
      racks, // text
      shadow1,// เงา
      issues, // text
      vector, //arrow icon
      dowload,//text
      vector2, //arrow icon 
      vector3,
      vector4,// edit icon
      vector5,
      vector6,
      vector7,
    } = this.props;

    return (
      <div className="edit">
        <div className="overlap-group">
          <div className="rectangle-13"></div>
          <div className="rectangle-25 border-3px-blue-ribbon"></div>
          <div className="rectangle-1"></div>
          <h1 className="project-name roboto-normal-white-34px">{projectName}</h1>
          <div className="shadow1"></div>
          <div className="light1"></div>
          <div className="base1"></div>
          <div className="racks roboto-light-azure-radiance-24px">{racks}</div>
          <img className="shadow1-1" src={shadow1} />
          <div className="shadow"></div>
          <div className="light"></div>
          <div className="base"></div>
          <div className="group-80">
            <div className="overlap-group1">
              <div className="group-68">
                <div className="overlap-group2">
                  <div className="butt1">
                    <div className="overlap-group3">
                      <div className="base1-1"></div>
                    </div>
                  </div>                                                              
                  <div className="issues roboto-light-azure-radiance-24px">{issues}</div> 
                </div>
              </div>
              <img className="vector" src={vector} />
            </div>
          </div>
          <div className="shadow1-2"></div>
          <div className="light1-1"></div>
          <div className="base1-2"></div>
          <div className="dowload roboto-light-white-24px">{dowload}</div>
          <div className="shadow-1"></div>
          <div className="light-1"></div>
          <div className="base-2"></div>
          <img className="vector-3" src={vector2} />
          <img className="vector-4" src={vector3} />
          <div className="group-62">
            <div className="overlap-group-1">
              <div className="group-63">
                <div className="overlap-group1-1">
                  <div>
                    <a href="./"><button className="base-1"></button></a> {/*Button ย้อนกลับ*/}
                  </div>
                </div>
              </div>
              <div className="group-61">
                <div className="overlap-group2-1">
                  <img className="vector-1" src={vector4} />
                  <img className="vector-2" src={vector5} />
                </div>
              </div>
            </div>
          </div>
          <div className="group-63-1">
            <div className="overlap-group-1">
              <div className="group-63-2">
                <div className="overlap-group1-2">
                  <div className="base-1"></div>
                </div>
              </div>
              <div className="group-61">
                <div className="overlap-group2-1">
                  <img className="vector-1" src={vector6} />
                  <img className="vector-2" src={vector7} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const editData = {
    x231: "https://anima-uploads.s3.amazonaws.com/projects/6028dbaf6887d819c8dec3d4/releases/6028dbdf016102957107eae1/img/23-1@1x.svg",
    projectName: "Project Name",
    racks: "Racks",
    shadow1: "https://anima-uploads.s3.amazonaws.com/projects/6028dbaf6887d819c8dec3d4/releases/6028dbdf016102957107eae1/img/shadow1@2x.svg",
    line1: "https://anima-uploads.s3.amazonaws.com/projects/6028dbaf6887d819c8dec3d4/releases/6028dbdf016102957107eae1/img/line-1@2x.svg",
    line2: "https://anima-uploads.s3.amazonaws.com/projects/6028dbaf6887d819c8dec3d4/releases/6028dbdf016102957107eae1/img/line-2@2x.svg",
    polygon1: "https://anima-uploads.s3.amazonaws.com/projects/6028dbaf6887d819c8dec3d4/releases/6028dbdf016102957107eae1/img/polygon-1@2x.svg",
    polygon2: "https://anima-uploads.s3.amazonaws.com/projects/6028dbaf6887d819c8dec3d4/releases/6028dbdf016102957107eae1/img/polygon-2@2x.svg",
    issues: "Issues",
    vector: "https://anima-uploads.s3.amazonaws.com/projects/6028dbaf6887d819c8dec3d4/releases/6028dbdf016102957107eae1/img/vector@2x.svg",
    dowload: "Dowload",
    vector2: "https://anima-uploads.s3.amazonaws.com/projects/6028dbaf6887d819c8dec3d4/releases/6028dbdf016102957107eae1/img/vector-15@2x.svg",
    vector3: "https://anima-uploads.s3.amazonaws.com/projects/6028dbaf6887d819c8dec3d4/releases/6028dbdf016102957107eae1/img/vector-2@2x.svg",
    vector4: "https://anima-uploads.s3.amazonaws.com/projects/6028dbaf6887d819c8dec3d4/releases/6028dbdf016102957107eae1/img/vector-3@2x.svg",
    vector5: "https://anima-uploads.s3.amazonaws.com/projects/6028dbaf6887d819c8dec3d4/releases/6028dbdf016102957107eae1/img/vector-4@2x.svg",
    vector6: "https://anima-uploads.s3.amazonaws.com/projects/6028dbaf6887d819c8dec3d4/releases/6028dbdf016102957107eae1/img/vector-19@2x.svg",
    vector7: "https://anima-uploads.s3.amazonaws.com/projects/6028dbaf6887d819c8dec3d4/releases/6028dbdf016102957107eae1/img/vector-6@2x.svg",
};

