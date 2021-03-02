import React, { useRef, useState, useEffect } from 'react';

function Display({ boxes, changeshows, imgs }) {
    var imglist = imgs.map(item => {
        console.log(item.name);
        var boxlist = boxes.map( box => {
            var output = ""
            if (item.name == box[0]){
                console.log(box);
                var cX = box[3][0]//+(box[3][2]/2);
                var cY = box[3][1]//+(box[3][3]/2); 
                if (box[1] == 0) { output = output + "bypass diote";
                }
                else if (box[1] == 1) { output = output + "hotspot";
                }
                else if (box[1] == 2) { output = output + "vegetation";
                }
                else if (box[1] == 3) { output = output + "pid";
                }
                else if (box[1] == 4) { output = output + "module hot";
                }
                else if (box[1] == 5) { output = output + "string short";
                }
                else if (box[1] == 6) { output = output + "string reverse";
                }
                if (box[1] == 7) {  
                    output = output + "rack";
                    // cX = cX*800
                    // cY = cY*800
                    return <p>rack {box[4]} on {cX.toFixed(2)}  {cY.toFixed(2)}</p> //rack อันนี้
                }
                return <p>{output} on rack {box[4]}</p> //defect อันนี้
            }
        })
        return  (<>
            <h1>{item.name}</h1>
            <>
                <h1>fix size รูปให้กูด้วย แล้วแก้ cX ,cY ตามไปด้วยขอแบบเลข rack อยู่บนรูป ให้ตรงตำแหน่ง</h1>
                <img src={URL.createObjectURL(item)}></img>
                {boxlist}
            </>
            <h1>.<br/>.</h1>        
        </>);
    })

    const Change = () => { changeshows(0);}

    return ( <>
        <button className="Dowload-btn" onClick={Change}>Back</button>
        {imglist}
    </> ) ;
}

export default Display;