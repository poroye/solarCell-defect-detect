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
    });
    useEffect(() => {
      setNowlist([]);
      let width = 3;
      if (nowbox.length > 0){
        nowbox.map(item => {
          const rInfo = {x:item[3][0]*size, y:item[3][1]*size, w:item[3][2]*size, h:item[3][3]*size };
          let rstyle = { borderColor: 'black', borderWidth: 0.1 };
          if(item[1] == 0 && d0 && dl && item[2] > confi)     {rstyle = { borderColor: 'blue',  borderWidth: width };}
          else if(item[1] == 1 && d1 && dl && item[2] > confi){rstyle = { borderColor: 'red',    borderWidth: width };}
          else if(item[1] == 2 && d2 && dl && item[2] > confi){rstyle = { borderColor: 'green',  borderWidth: width };}
          else if(item[1] == 3 && d3 && dl && item[2] > confi){rstyle = { borderColor: 'purple', borderWidth: width };}
          else if(item[1] == 4 && d4 && dl && item[2] > confi){rstyle = { borderColor: 'orange', borderWidth: width };}
          else if(item[1] == 5 && d5 && dl && item[2] > confi){rstyle = { borderColor: 'lightgreen',   borderWidth: width };}
          else if(item[1] == 6 && d6 && dl && item[2] > confi){rstyle = { borderColor: 'pink',   borderWidth: width };}
          else if(item[1] == 7 && d7 && item[2] > confi)      {rstyle = { borderColor: 'yellow', borderWidth: width };}
          setNowlist(prev => [...prev,[rInfo, rstyle]]);
        })
      }
    },[counter,nowbox,dl,d0,d1,d2,d3,d4,d5,d6,d7]);
  
    const drawRect = (info, style = {}) => {
      const { x, y, w, h } = info;
      const { borderColor = 'black', borderWidth = 50 } = style;
      ctx.beginPath();
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = borderWidth;
      ctx.rect(x, y, w, h);
      ctx.stroke();
    }
    if (confi == -5){
      return <canvas ref={canvas} style={{border:'1px solid #999999',position:'absolute',left:-50,marginLeft:50} } ></canvas> 
    }
    return (
        <canvas ref={canvas} style={{border:'1px solid #999999',position:'absolute', zIndex:1 , marginTop:"2vh", marginLeft:-150}} ></canvas> 
    );
  }
export default Paper;