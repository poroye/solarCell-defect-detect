import './App.css';
import axios from 'axios'
import React,{ useState } from 'react';

const App = () => {
  const [state,setState] = useState({selectedFile : null});
  const [data,setData] = useState({selectedFile:null , filename:null});
  
  const buttonClick = () => {
  console.log("click");
  axios.post("http://127.0.0.1:8000/test?name=gfd&gender=dfg").then(res => {console.log(res)});
  }

  const  fileSelectedHandler = event => {
    console.log(event.target.files[0]);
    setState({selectedFile: event.target.files[0]})
    setData({selectedFile: URL.createObjectURL(event.target.files[0]),filename: event.target.files[0].name})
    // console.log(state.data.filename)
  }

  const  fileUploadHandler = () => {
    const fd = new FormData();
    fd.append("image",state.selectedFile,state.selectedFile.name);
    axios.post("http://127.0.0.1:8000/detect",fd).then(res => {
      console.log(res.data);
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={data.selectedFile}/>
        <p>{data.filename}</p>
        <button onClick={buttonClick}>test API</button>
        <input type="file" onChange={fileSelectedHandler}></input>
        <button onClick={fileUploadHandler}>test upload</button>
      </header>
    </div>
  );
}

export default App;
