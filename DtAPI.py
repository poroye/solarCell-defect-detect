import cv2 as cv
from fastapi import FastAPI, File, UploadFile , Response
from fastapi.middleware.cors import  CORSMiddleware
#from io import BytesIO
#import numpy as np
#import base64
from fastapi.responses import FileResponse
#from PIL import Image
import shutil , os

def detectbox(imgPath):
    net = cv.dnn_DetectionModel('C:/Users/pro/Desktop/project/custom-yolov4-detector.cfg', 'C:/Users/pro/Desktop/project/custom-yolov4-detector_best.weights')
    net.setInputSize(608, 608)
    net.setInputScale(1.0 / 255)
    net.setInputSwapRB(True)

    frame = cv.imread(imgPath)

    classes, confidences, boxes = net.detect(frame, confThreshold=0.1, nmsThreshold=0.4)
    return classes, confidences, boxes

def showDetect(img_Path):
    frame = cv.imread(img_Path)
    classes, confidences, boxes = detectbox(img_Path)
    with open('C:/Users/pro/Desktop/project/obj.names', 'rt') as f:
        name = f.read().rstrip('\n').split('\n')
    if len(classes) != 0:
        for classId, confidence, box in zip(classes.flatten(), confidences.flatten(), boxes):
            label = '%.2f' % confidence
            label = '%s: %s' % (name[classId], label)
            labelSize, baseLine = cv.getTextSize(label, cv.FONT_HERSHEY_SIMPLEX, 0.5, 1)
            left, top, width, height = box
            top = max(top, labelSize[1])
            cv.rectangle(frame, box, color=(0, 255, 0), thickness=1)
            cv.rectangle(frame, (left, top - labelSize[1]),(left + labelSize[0], top + baseLine), (255,255,255), cv.FILLED)
            cv.putText(frame, label, (left, top), cv.FONT_HERSHEY_SIMPLEX, 0.5, (0,0,0))
            #print(classId,box)
    return frame

app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"its"," WWWoooorrrkkk!!"}

@app.post("/test")
def test(name: str,gender:str):
    return {"nam":name }

@app.post("/uploadfile/") # upload display file name work
async def create_upload_file(file: UploadFile = File(...)):
    return {"filename": file.filename}

@app.post("/uploadAndDisplay") #upload image and return image work
async def image_endpoint(file: UploadFile = File(...)):
    contents = await file.read()
    return Response(content=contents, media_type="image/png")

@app.post("/detect")
async def detect(image: UploadFile = File(...)):
    with open("temp.png", "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)
    img_Path = "C:/Users/pro/Desktop/project/temp.png"
    image = cv.imread(img_Path)
    w , h = image.shape[:2]
    classes, confidences, boxes = detectbox(img_Path)
    listclass , listcon , listbox = classes.tolist() , confidences.tolist() , boxes.tolist()
    for i in range(len(listcon)):
        listcon[i][0] = float("{:.5f}".format(listcon[i][0]))
        print(type(listcon))
    for i in range(len(listbox)):
        listbox[i][0] , listbox[i][1] , listbox[i][2] , listbox[i][3] = float("{:.5f}".format(listbox[i][0]/w)) , float("{:.5f}".format(listbox[i][1]/h)) , float("{:.5f}".format(listbox[i][2]/w)) , float("{:.5f}".format(listbox[i][3]/h))
    foundlist = []
    while len(listclass) > 0:
        foundlist.append({"type":listclass.pop(),"confidence":listcon.pop(),"box":listbox.pop()})
    return foundlist