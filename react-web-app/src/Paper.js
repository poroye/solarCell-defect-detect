import React, { useState , useEffect , useRef } from "react";

function Paper({confi,counter,nowbox,dl,d0,d1,d2,d3,d4,d5,d6,d7,size}) {
    const canvas = useRef();
    let ctx = null;
    const [nowlist,setNowlist] = useState([]);
    useEffect(() => {
      const canvasEle = canvas.current;
      canvasEle.width = size;
      canvasEle.height = size;
      ctx = canvasEle.getContext("2d");
      nowlist.map(item => {drawRect(item[0],item[1]);});
      console.log("draw");
    });
    useEffect(() => {
      setNowlist([]);
      console.log("HandleChange:",d7);
      if (nowbox.length > 0){
        nowbox.map(item => {
          const rInfo = {x:item[3][0]*size, y:item[3][1]*size, w:item[3][2]*size, h:item[3][3]*size };
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
        <canvas ref={canvas} style={{border:'1px solid #999999',position:'absolute', zIndex:1 , marginTop:"5vh"}} ></canvas> 
    );
  }
export default Paper;