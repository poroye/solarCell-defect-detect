import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import {Button} from 'react-bootstrap';
import {Card} from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


import './Dropzone.css';

///  Object ในการ Uploadต่าง  //////////////////////////////////////////////////////////////
const Dropzone = ({boxes,changeboxes,changeshows,imgs,changeimgs,enableemptys,changeenable}) => {
    const fileInputRef = useRef();
    const modalImageRef = useRef();
    const modalRef = useRef();
    const progressRef = useRef();
    const uploadRef = useRef();
    const uploadModalRef = useRef();
    // const [selectedFiles, setSelectedFiles] = useState([]);
    const [validFiles, setValidFiles] = useState([]);
    const [unsupportedFiles, setUnsupportedFiles] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    // const [enableempty,setEnableempty] = useState(false);
//////////////////////////////////////////////////////////////////////////////////////////////
    
/////   funtion การทำงาน  ///////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        let filteredArr = imgs.reduce((acc, current) => {
            const x = acc.find(item => item.name === current.name);

            let y = true; 
            for (let j = 0 ; j < boxes.length ; j++){
                if (current.name == boxes[j][0]){
                    y = false;
                    break
                }
            }
            
            console.log("current = ",current.name);
            // if (!x){
            if (!x && y) { //add
                // console.log("if",acc.concat([current]));
                return acc.concat([current]);
            } else { //not add
                // console.log("else",acc);
              return acc;
            }
        }, []);
        setValidFiles([...filteredArr]);
        
    }, [imgs]);

    const setshows = (valueshow) => {
        changeshows(valueshow);
    }

    const preventDefault = (e) => {
        e.preventDefault();
        // e.stopPropagation();
    }

    const dragOver = (e) => {preventDefault(e);}
    const dragEnter = (e) => {preventDefault(e);}
    const dragLeave = (e) => {preventDefault(e);}
    const fileDrop = (e) => {
        preventDefault(e);
        const files = e.dataTransfer.files;
        if (files.length) {
            handleFiles(files);
            console.log(files);
        }
    }

    const filesSelected = () => {
        if (fileInputRef.current.files.length) {handleFiles(fileInputRef.current.files);}
    }

    const fileInputClicked = () => {
        fileInputRef.current.click();
    }

    const handleFiles = (files) => {
        changeenable(true);
        for(let i = 0; i < files.length; i++) {
            
                if (validateFile(files[i])) {
                    let dub = false;
                    for (let j = 0 ; j < imgs.length ; j++){
                        if (files[i].name == imgs[j].name){
                            dub = true
                        } 
                    }
                    if (!dub){
                        changeimgs(prevArray => [...prevArray, files[i]]);
                    }
                    //changeimgs(prevArray => [...prevArray, files[i]]);
                } else {
                    files[i]['invalid'] = true;
                    changeimgs(prevArray => [...prevArray, files[i]]);
                    setErrorMessage('File type not permitted');
                    setUnsupportedFiles(prevArray => [...prevArray, files[i]]);
                }
            
            





            // if (validateFile(files[i])) {
            //     changeimgs(prevArray => [...prevArray, files[i]]);
            // } else {
            //     files[i]['invalid'] = true;
            //     changeimgs(prevArray => [...prevArray, files[i]]);
            //     setErrorMessage('File type not permitted');
            //     setUnsupportedFiles(prevArray => [...prevArray, files[i]]);
            // }
        }
    }

    const validateFile = (file) => {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (validTypes.indexOf(file.type) === -1) {
            return false;
        }

        return true;
    }

    const fileSize = (size) => {
        if (size === 0) {
          return '0 Bytes';
        }
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(size) / Math.log(k));
        return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    const fileType = (fileName) => {
        return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) || fileName;
    }

    const removeFile = (name) => {
        const index = validFiles.findIndex(e => e.name === name);
        const index2 = imgs.findIndex(e => e.name === name);
        const index3 = unsupportedFiles.findIndex(e => e.name === name);
        validFiles.splice(index, 1);
        imgs.splice(index2, 1);
        setValidFiles([...validFiles]);
        changeimgs([...imgs]);
        if (index3 !== -1) {
            unsupportedFiles.splice(index3, 1);
            setUnsupportedFiles([...unsupportedFiles]);
        }
    }

    const openImageModal = (file) => {
        const reader = new FileReader();
        modalRef.current.style.display = "block";
        reader.readAsDataURL(file);
        reader.onload = function(e) {
            modalImageRef.current.style.backgroundImage = `url(${e.target.result})`;
        }
    }

    const closeModal = () => {
        console.log(imgs.length,enableemptys)
        modalRef.current.style.display = "none";
        modalImageRef.current.style.backgroundImage = 'white';
    }

    const uploadFiles = async () => {
        uploadModalRef.current.style.display = 'block';
        uploadRef.current.innerHTML = 'loading';
        let count = 0;
        let max = validFiles.length;
        console.log("count = ",count,"boxes = ",boxes,"valid = ",validFiles,"select = ",imgs);
        // for (let i = 0 ; i<validFiles.length ; i++){
        //     for (let j = 0 ; j < boxes.length ; j++){
        //         if (validFiles[i].name == boxes[j][0]){
        //             console.log("dup",validFiles[i].name);
        //             let temparr = validFiles.filter(item => item.name != boxes[j][0]);
        //             console.log("filter",temparr);
        //             // console.log("splice",temparr.splice(i,1));
        //             // temparr.splice(i,1);
        //             setValidFiles([...temparr])
        //             // i = i - 1
        //             break
        //         }

        //     }
        // }
        console.log("valid size",validFiles.length)
        if (validFiles.length > 0){
        // filfile = imgs.filter(img => !boxes.)
        // 
        // if not process
        // 
        for (let i = 0; i < validFiles.length; i++) {
            const formData = new FormData();
            formData.append('image', validFiles[i]);
            axios.post('http://127.0.0.1:8000/detect', formData)
            .catch(() => {
                uploadRef.current.innerHTML = `<span class="error">Error Uploading File(s)</span>`;
                progressRef.current.style.backgroundColor = 'red';
            }).then(res => {
                // console.log(res.data);
                ////////////////
                // changeboxes(prevArray => [...prevArray,res.data[0]]);
                
                res.data.map((defect) =>{
                    if(boxes == []){
                        changeboxes(defect)
                    }
                    else{
                        changeboxes(prevArray => [...prevArray,defect])
                    }
                    // console.log(defect)//, 
                    // changeboxes(prevArray => [...prevArray,...defect])
                    }
                );

                //////////////////
                count = count + 1;
                const uploadPercentage = Math.floor((count * 100) / max);
                progressRef.current.innerHTML = `${uploadPercentage}%`;
                progressRef.current.style.width = `${uploadPercentage}%`;

                if (uploadPercentage === 100) {
                    uploadRef.current.innerHTML = 'File(s) Processing';
                    // validFiles.length = 0;
                    // setValidFiles([...validFiles]);
                    // changeimgs([...validFiles]);
                    console.log(imgs)
                    setUnsupportedFiles([...validFiles]);
                    setshows(true)
                }
              })
        }


        }
        else{
            setshows(true)
        }


        // console.log(imgs)
        // imgs.map( i => {console.log(i.name);} )
        }

    const closeUploadModal = () => {
        uploadModalRef.current.style.display = 'none';
    }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <>
            {/* <h1>test {boxes}</h1> */}
            <div className="container">
                <Row>
                    <Col sm={5}>
                        <div className="drop-container"  /// ช่องวาง file ///////////////////////////
                            onDragOver={dragOver}
                            onDragEnter={dragEnter}
                            onDragLeave={dragLeave}
                            onDrop={fileDrop}
                            onClick={fileInputClicked}
                        >
                            <div className="drop-message"> 
                                <div className="upload-icon" /*Cloud icon*/></div> 
                                <div className="DragMessage txt">Drag & Drop here<br/>or Browse file(s)</div>
                                <br/>max resolution <br/>1000 px X 1000 px
                            </div>
                            <input
                                ref={fileInputRef}
                                className="file-input"
                                type="file"
                                multiple
                                onChange={filesSelected}
                                // upload file function ///////
                            />
                        </div>
                        <div className="updes">Upload only JPEG and PNG file</div>
                        <button className="file-upload-pre-btn" disabled>Process</button>
                        {unsupportedFiles.length === 0 && imgs.length && enableemptys ? //Button Upload// 
                        <button className="file-upload-btn" onClick={() => uploadFiles()}>Process</button> : ''} 
                        {unsupportedFiles.length ? <p>Please remove all unsupported files.</p> : ''}
                    </Col>
                    <Col sm={6}>
                            <span className="Present txt">Your Image</span>
                            <hr style={{border:'1px solid #FFFFFF'}} /* line สีดำ */></hr> 
                            <div className="file-display-container" /*แสดงชื่อ ขนาดภาพ*/>
                            {
                                imgs.map((data, i) =>
                                <div className="fileCard" style={{width: '440px',height:'90px'}} /*กรอบคลุม */> 
                                    <div className="file-status-bar" key={i}>
                                            <div className="file-status" onClick={!data.invalid ? () => openImageModal(data) : () => removeFile(data.name)} /* Click แล้วแสดงภาพตัวอย่าง */>
                                                <div className="file-type-logo" /* logo ภาพ */></div>

                                                {/* <div className="file-type">{fileType(data.name)}</div> */}

                                                <span className={`file-name txt ${data.invalid ? 'file-error' : ''}`}/*ชื่อไฟล์ */>{data.name}</span>
                                                <span className="file-size txt" /* ขนาดไฟล์ */>({fileSize(data.size)})</span> {data.invalid && <span className='file-error-message'>({errorMessage})</span>}
                                            </div>
                                            <div className="file-remove " onClick={() => removeFile(data.name)}></div>
                                    </div>
                                </div> 
                                )
                            }
                        </div>
                    </Col>
                </Row>
            </div>

            {/* ภาพตัวอย่างเวลา Click */}
            <div className="modal" ref={modalRef}>
                <div className="overlay"></div>
                <div className="close" onClick={(() => closeModal())}></div>
                <div className="modal-image" ref={modalImageRef}></div>
            </div>

            <div className="upload-modal" ref={uploadModalRef}>
                <div className="overlay"></div>
                {/* <div className="close" onClick={(() => closeUploadModal())}></div> */}
                <div className="progress-container">
                    <span className="txt" ref={uploadRef}></span>
                    <div className="progress">
                        <div className="progress-bar" ref={progressRef}></div>
                    </div>
                    {/* <div className="loading-txt">loading</div> */}
                </div>
            </div>
        </>
    );
}

export default Dropzone;