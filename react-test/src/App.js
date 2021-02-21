import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import React,{ Component ,useState } from 'react';

class App extends Component {
  state = {
    selectedFile: null
  }
  data = []


  buttonClick = () => {
  console.log("click");
  axios.post("http://127.0.0.1:8000/test?name=gfd&gender=dfg").then(res => {console.log(res)});
  }

  fileSelectedHandler = event => {
    console.log(event.target.files[0]);
    this.setState({selectedFile: event.target.files[0]})
  }

  fileUploadHandler = () => {
    const fd = new FormData();
    fd.append("image",this.state.selectedFile,this.state.selectedFile.name);
    axios.post("http://127.0.0.1:8000/detect",fd).then(res => {console.log(res.data)});
  }

  render() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>{this.data}</p>
        <button onClick={this.buttonClick}>test API</button>
        <input type="file" onChange={this.fileSelectedHandler}></input>
        <button onClick={this.fileUploadHandler}>test upload</button>
      </header>
    </div>
  );
  }
}

export default App;
