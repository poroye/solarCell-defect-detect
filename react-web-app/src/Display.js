import React from 'react';
import './Display.css';
import Paper from './Paper';

function Display({ boxes, changeshows, imgs }) {
    var imglist = imgs.map(item => {
        var filterbox = boxes.filter(box => {
            if (item.name == box[0] && box[1] != 7){
                return box
            }
        })
        var boxlist = boxes.map( box => {
            var output = ""
            if (item.name == box[0] && box[1] != 7){
                if (box[1] == 0) { output = "bypass diote";}
                else if (box[1] == 1) { output = "hotspot";}
                else if (box[1] == 2) { output = "vegetation";}
                else if (box[1] == 3) { output = "pid";}
                else if (box[1] == 4) { output = "module hot";}
                else if (box[1] == 5) { output = "string short";}
                else if (box[1] == 6) { output = "string reverse";}
                return <div className="def-des-txt">{output} on rack {box[4]}</div> //defect อันนี้
            }
        })//not use

        // let defectonrack = [];
        var testword = "";
        var numrack = 0;
        for(var i = 0;i<boxes.length;i++){
            if(boxes[i][0] == item.name && boxes[i][1] == 7 && boxes[i][4][0] > numrack){
                 numrack = parseInt(boxes[i][4][0])
            }
        }
        for(let j = 0;j<numrack+1;j++){
            let diote = 0;
            let hotsp = 0;
            let veget = 0;
            let pid   = 0;
            let modul = 0;
            let stsh  = 0;
            let strev = 0;
            console.log("rack = ",j)
            for( let i = 0;i<boxes.length;i++){
                if(boxes[i][0] == item.name && boxes[i][1] != 7 && boxes[i][4][0] == j){
                    if (boxes[i][1] == 0){diote = parseInt(diote) + 1;}
                    else if (boxes[i][1] == 1){hotsp = parseInt(hotsp) + 1;}
                    else if (boxes[i][1] == 2){veget = parseInt(veget) + 1;}
                    else if (boxes[i][1] == 3){pid = parseInt(pid) + 1;}
                    else if (boxes[i][1] == 4){modul = parseInt(modul) + 1;}
                    else if (boxes[i][1] == 5){stsh = parseInt(stsh) + 1;}
                    else if (boxes[i][1] == 6){strev = parseInt(strev) + 1;}
                }
            }
            console.log("diote = ",diote,"hotsp = ",hotsp,"veget = ",veget,"pid = ",pid,"modul = ",modul,"stsh = ",stsh,"strev = ",strev);
            if(diote > 0 || hotsp > 0 || veget > 0 || pid > 0 || modul > 0 || stsh > 0 || strev > 0 ){
                testword = testword + "rack " + j ;
                if (diote > 0){ testword = testword + " have " + diote + " bypass diote problem"}
                if(hotsp > 0){  testword = testword + " have " + hotsp + " hotspot problem"     }
                if (veget > 0){ testword = testword + " have " + veget + " vegetation problem"  }
                if (pid > 0){   testword = testword + " have " + pid + " PID problem"           }
                if (modul > 0){ testword = testword + " have " + modul + " modlue hot problem"  }
                if (stsh > 0){  testword = testword + " have " + stsh + " string short problem" }
                if (strev > 0){ testword = testword + " have " + strev + " string reverse problem"}
                testword = testword + "\n"
            }
            // defectonrack.push([diote,hotsp,veget,pid,modul,stsh,strev])
        }
        testword = testword + "."
        // console.log(defectonrack)

        let newText = testword.split('\n').map(i => {
            return <p>{i}</p>
        });

        var racklist = boxes.map( box => {
            if (item.name == box[0]){
                var cX = box[3][0]//+(box[3][2]/2);
                var cY = box[3][1]//+(box[3][3]/2); 
                if (box[1] == 7) {
                    cX = cX*500
                    cY = cY*500
                    return <span className="rack-des-tjxt" style={{top:cY , left:cX,position:'absolute'}}>{box[4]}</span> //rack อันนี้
                }
            }
        })
        return  (
        <div className="Display-container">
            <h1>{item.name}</h1>
            <h1>fix size รูปให้กูด้วย แล้วแก้ cX ,cY ตามไปด้วยขอแบบเลข rack อยู่บนรูป ให้ตรงตำแหน่ง</h1>
            <img src={URL.createObjectURL(item)} className="display-img"></img>
            <Paper className ="paper" confi={-5} counter={0} nowbox={filterbox} dl={true} d0={true} d1={true} d2={true} d3={true} d4={true} d5={true} d6={true} d7={true} size={500}></Paper>
            <div className="racklist"> {racklist}</div>   
            <div className="boxlist"> {newText}</div>          
        </div>);
    })

    const Change = () => { changeshows(0);}

    return ( <>
        <button className="back-btn" onClick={Change}>Back</button>
        {imglist}
    </> ) ;
}
export default Display;
