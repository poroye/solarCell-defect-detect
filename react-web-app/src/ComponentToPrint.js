import React from "react";
import Paper from './Paper';
import './ComponentToPrint.css';
import Col from 'react-bootstrap/Col';
import kmitl from './img/Logo_kmitl.png';
import { createEvent } from "@testing-library/dom";
import gunkul from './img/download.jfif';

export class ComponentToPrint extends React.PureComponent {
    
    weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday", "Friday","Saturday"]
    month = ["january","february","march","april","may","june","july","august","september","october","november","december"]

    d = new Date();
    day = this.weekday[this.d.getDay()];
    date = this.d.getDate();
    month = this.month[this.d.getMonth()];
    year = this.d.getFullYear();
    hour = this.d.getHours();
    min = this.d.getMinutes();
    second = this.d.getSeconds();

    imglist = this.props.imgs.map((item,p) => {
        var filterbox = this.props.boxes.filter(box =>{
            if (item.name == box[0] && box[1] != 7){
                return box
            }
        })

        var numrack = 0;
        for(var i = 0;i<this.props.boxes.length;i++){
            if(this.props.boxes[i][0] == item.name && this.props.boxes[i][1] == 7){
                 numrack = parseInt(numrack) + 1;
            }
        }

        var racklist = this.props.boxes.map( (box,i) => {
            if (item.name == box[0]){
                var cX = box[3][0]//+(box[3][2]/2);
                var cY = box[3][1]//+(box[3][3]/2); 
                if (box[1] == 7) {
                    cX = (cX*400)
                    cY = (cY*400)
                    return (
                        <span key={i} className="rack-des-tjxt" style={{top:cY , left:cX, position:'absolute', float:"left",width:'400px',color:"white"}}>{parseInt(box[4])+1}</span>
                    )
                }
            }
        })


        var tablerack = [];

        for(let j = 0;j<numrack+1;j++){
            let diote = 0;
            let hotsp = 0;
            let veget = 0;
            let pid   = 0;
            let modul = 0;
            let stsh  = 0;
            let strev = 0;

            for( let i = 0;i<this.props.boxes.length;i++){
                if(this.props.boxes[i][0] == item.name && this.props.boxes[i][1] != 7 && this.props.boxes[i][4][0] == j){
                    if (this.props.boxes[i][1] == 0){diote = parseInt(diote) + 1;}
                    else if (this.props.boxes[i][1] == 1){hotsp = parseInt(hotsp) + 1;}
                    else if (this.props.boxes[i][1] == 2){veget = parseInt(veget) + 1;}
                    else if (this.props.boxes[i][1] == 3){pid = parseInt(pid) + 1;}
                    else if (this.props.boxes[i][1] == 4){modul = parseInt(modul) + 1;}
                    else if (this.props.boxes[i][1] == 5){stsh = parseInt(stsh) + 1;}
                    else if (this.props.boxes[i][1] == 6){strev = parseInt(strev) + 1;}
                }
            }
            tablerack.push([j,diote,hotsp,veget,pid,modul,stsh,strev]);

        }

        for(var k = numrack; k >=0;k--){
            if(tablerack[k][1]==0 && tablerack[k][2]==0 && tablerack[k][3]==0 && tablerack[k][4]==0 && tablerack[k][4]==0 && tablerack[k][5]==0 && tablerack[k][6]==0 && tablerack[k][7]==0){
                tablerack.splice(k,1);
            }
        }

        var tablevalue = tablerack.map((value,i) =>{
            return(
                <tr key={i}>
                    <td style={{border:"1px solid black"}}>{value[0]+1}</td>
                    <td style={{border:"1px solid black"}}>{value[1]}</td>
                    <td style={{border:"1px solid black"}}>{value[2]}</td>
                    <td style={{border:"1px solid black"}}>{value[3]}</td>
                    <td style={{border:"1px solid black"}}>{value[4]}</td>
                    <td style={{border:"1px solid black"}}>{value[5]}</td>
                    <td style={{border:"1px solid black"}}>{value[6]}</td>
                    <td style={{border:"1px solid black"}}>{value[7]}</td>
                </tr>
            );
        });

        if (numrack == 0){
            return null
        }

        return <div style={{padding:50}} key={p}>
            <h1 style={{fontWeight:"bold",marginBottom:30,fontSize:24,textAlign:"center"}}>{item.name} have {numrack} rack</h1> 
            <>
                <Col sm={7}>
                    <div className="Display-container">
                        <img src={URL.createObjectURL(item)} className="display-img" style={{height:400}}></img>
                        <Paper className ="paper" confi={-5} counter={0} nowbox={filterbox} dl={true} d0={true} d1={true} d2={true} d3={true} d4={true} d5={true} d6={true} d7={true} size={400}></Paper>
                        <div className="racklist"> {racklist}</div>
                    </div>
                </Col>
                <Col sm={5}>
                    <div className="print-container">
                        <div className="by-circle"></div><div className="print-des-txt">Bypass Diode</div>
                        <div className="hot-circle"></div><div className="print-des-txt">Hotspots</div>
                        <div className="veg-circle"></div><div className="print-des-txt">Vegetation</div>
                        <div className='pid-circle'></div><div className="print-des-txt">PID</div>
                        <div className="mod-circle"></div><div className="print-des-txt">Module Hot</div>
                        <div className="ss-circle"></div><div className="print-des-txt">String Short</div>
                        <div className="sr-circle"></div><div className="print-des-txt">String Reverse</div> 
                    </div>
                </Col>
                {/* {filterbox} */}
            </>
            <table className="table-print" style={{border:"1px solid black"}}>
                <thead style={{border:"1px solid black"}}>
                    <tr>
                        <th style={{border:"1px solid black"}}>rack</th>
                        <th style={{border:"1px solid black"}}>bypass diote</th>
                        <th style={{border:"1px solid black"}}>hotspot</th>
                        <th style={{border:"1px solid black"}}>vegetation</th>
                        <th style={{border:"1px solid black"}}>PID</th>
                        <th style={{border:"1px solid black"}}>module hot</th>
                        <th style={{border:"1px solid black"}}>string short</th>
                        <th style={{border:"1px solid black"}}>string reverse</th>
                    </tr>
                </thead>
                <tbody style={{border:"1px solid black"}}>
                    {tablevalue}
                </tbody>
            </table>
            <div style={{pageBreakAfter:"always"}}></div>
        </div>
    })
    
    render() {
return (
        <div className="comToPrint">
            <img src={kmitl} style={{width:200,height:200, marginTop:"100px",position:"static",marginLeft:"310px"}}></img>
            <img src={gunkul} style={{width:400,height:200, marginTop:"30px",position:"static",marginLeft:"220px"}}></img>
            <div style={{fontSize:50,marginTop:"100px",position:"absolute",marginLeft:"200px"}}>Solar Defect Report</div>
            <div style={{fontSize:25,marginTop:"450px",position:"absolute",marginLeft:"220px"}}>Save on {this.day} {this.date} {this.month} {this.year},{String(this.hour).padStart(2,'0')}:{String(this.min).padStart(2,'0')}:{String(this.second).padStart(2,'0')}</div>
            <div style={{pageBreakAfter:"always"}}></div>
            {this.imglist}
        </div>
    );}
}