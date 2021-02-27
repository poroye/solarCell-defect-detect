import React, { useRef, useEffect, useState } from 'react';
 
function Paper({nowbox,dl,d0,d1,d2,d3,d4,d5,d6,d7}) {
  const canvas = useRef();
  let ctx = null;
 
  // initialize the canvas context
  useEffect(() => {
    // dynamically assign the width and height to canvas
    const canvasEle = canvas.current;
    canvasEle.width = 800;
    canvasEle.height = 800;
    // console.log(nowbox);
 
    // get context of the canvas
    ctx = canvasEle.getContext("2d");
  });

  useEffect(() => {
    console.log("in can => ",nowbox);
  },[nowbox]);
 
  useEffect(() => {
    let tempbox = nowbox.map(item => {
      const rInfo = {x:item[3][0]*800, y:item[3][1]*800, w:item[3][2]*800, h:item[3][3]*800 };
      let rstyle = { borderColor: 'red', borderWidth: 0.1 };
      if(item[1] == 0 && d0 && dl){
        rstyle = { borderColor: 'white', borderWidth: 3 };}
      else if(item[1] == 1 && d1 && dl){
        rstyle = { borderColor: 'red', borderWidth: 3 };}
      else if(item[1] == 2 && d2 && dl){
        rstyle = { borderColor: 'green', borderWidth: 3 };}
      else if(item[1] == 3 && d3 && dl){
        rstyle = { borderColor: 'purple', borderWidth: 3 };}
      else if(item[1] == 4 && d4 && dl){
        rstyle = { borderColor: 'orange', borderWidth: 3 };}
      else if(item[1] == 5 && d5 && dl){
        rstyle = { borderColor: 'blue', borderWidth: 3 };}
      else if(item[1] == 6 && d6 && dl){
        rstyle = { borderColor: 'pink', borderWidth: 3 };}
      else if(item[1] == 7 && d7){
        rstyle = { borderColor: 'yellow', borderWidth: 3 };}
      drawRect(rInfo, rstyle);
    })
  });
 
  // draw rectangle
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
    <div className="App">
      <canvas ref={canvas} style={{border:'1px solid #999999',position:'absolute', zIndex:1 , marginTop:"5vh"}} ></canvas>
    </div>
  );
}
 
export default Paper;