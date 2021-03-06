import cv2 as cv
from fastapi import FastAPI, File, UploadFile, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import shutil
import os

import PyPDF2
import aiofiles
from math import sqrt

defectcfg = r"C:\Users\PON\Desktop\API\solardefect.cfg"
defectweight = r"C:\Users\PON\Desktop\API\7700_9984.weights"
defectnamelist = r"C:\Users\PON\Desktop\API\objdefect.names"

rackcfg = r"C:\Users\PON\Desktop\API\rack.cfg"
rackweight = r"C:\Users\PON\Desktop\API\custom-yolov4-detector_best.weights"
racknamelist = r"C:\Users\PON\Desktop\API\objrack.names"

fakedb = []

def detectbox(imgPath, CFG, WEIGHT):
    net = cv.dnn_DetectionModel(CFG, WEIGHT)
    net.setInputSize(608, 608)
    net.setInputScale(1.0 / 255)
    net.setInputSwapRB(True)

    frame = cv.imread(imgPath)

    classes, confidences, boxes = net.detect(
        frame, confThreshold=0.1, nmsThreshold=0.4)
    return classes, confidences, boxes


def addracks(foundlist, classlist, confidentlist, boxlist, w, h, name):
    racklist = []
    minXY = []
    for i in range(len(confidentlist)):
        confidentlist[i][0] = float("{:.5f}".format(confidentlist[i][0]))
        boxlist[i][0], boxlist[i][1], boxlist[i][2], boxlist[i][3] = float("{:.5f}".format(boxlist[i][0]/w)), float(
            "{:.5f}".format(boxlist[i][1]/h)), float("{:.5f}".format(boxlist[i][2]/w)), float("{:.5f}".format(boxlist[i][3]/h))
        minXY.append(boxlist[i][0]+boxlist[i][1])
        racklist.append([-1])

    indxmin = minXY.index(min(minXY))

    racklist[indxmin] = [0]

    for j in range(len(confidentlist)-1):
        nowX,nowY = boxlist[indxmin][0],boxlist[indxmin][1]
        mindis = 9000
        indxmin = 0
        for i in range(len(confidentlist)):
            if racklist[i] == [-1]:
                temp_min = sqrt( abs(nowX-boxlist[i][0])**2 + abs(nowY-boxlist[i][1])**2 )
                if temp_min < mindis:
                    mindis = temp_min
                    indxmin = i
        
        racklist[indxmin] = [j+1]

    while len(classlist) > 0:
        foundlist.append([name,classlist.pop(),confidentlist.pop(),boxlist.pop(),racklist.pop()])
    for i in foundlist:
        fakedb.append(i)
    return foundlist

def adddefects(foundlist, classlist, confidentlist, boxlist, w, h, name):
    racklist = []
    for i in range(len(confidentlist)):
        confidentlist[i][0] = float("{:.5f}".format(confidentlist[i][0]))
        boxlist[i][0], boxlist[i][1], boxlist[i][2], boxlist[i][3] = float("{:.5f}".format(boxlist[i][0]/w)), float(
            "{:.5f}".format(boxlist[i][1]/h)), float("{:.5f}".format(boxlist[i][2]/w)), float("{:.5f}".format(boxlist[i][3]/h))
        mindis = 500000
        minindx = 0
        for j in range(len(foundlist)):
            rackX, rackY = foundlist[j][3][0]+(foundlist[j][3][2]/2) , foundlist[j][3][1]+(foundlist[j][3][3]/2)
            rackindx = foundlist[j][4][0]
            defectX, defectY = boxlist[i][0] + (boxlist[i][2]/2) , boxlist[i][1] + (boxlist[i][3]/2)
            temp_min = sqrt( abs(rackX-defectX)**2 + abs(rackY-defectY)**2 )
            if temp_min < mindis:
                minindx = rackindx
                mindis = temp_min
        racklist.append([minindx])
    while len(classlist) > 0:
        foundlist.append([name,classlist.pop(),confidentlist.pop(),boxlist.pop(),racklist.pop()])
    for i in foundlist:
        fakedb.append(i)
    return foundlist


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
    return {"its", " WWWoooorrrkkk!!"}


@app.post("/test")
def test(name: str, gender: str):
    return {"nam": name}

@app.post("/word")
def test(name: str):
    file_Path = "C:/Users/PON/Desktop/API/test.doc"
    pdfFileObj = open(file_Path, 'rb') 
    return Response(content=pdfFileObj, media_type="application/msword")

@app.get("/download")
def downlaod_file():
    file_path = "C:/Users/PON/Desktop/API/readme.txt"
    return FileResponse(file_path)

@app.post("/uploadfile/")  # upload display file name work
async def create_upload_file(file: UploadFile = File(...)):
    return {"filename": file.filename}

@app.get("/getall")
def datab():
    return fakedb

@app.post("/uploadAndDisplay")  # upload image and return image work
async def image_endpoint(file: UploadFile = File(...)):
    contents = await file.read()
    return Response(content=contents, media_type="image/png")


@app.post("/detect")
async def detect(image: UploadFile = File(...)):
    with open(image.filename, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)
    # with open("temp.png", "wb") as buffer:
    #     shutil.copyfileobj(image.file, buffer)
    # img_Path = "C:/Users/pro/Desktop/project/temp.png"
    # img_Path = r"C:\Users\PON\Desktop\API\temp.png"
 
    img_Path = "C:/Users/PON/Desktop/API/" + image.filename
    imageSize = cv.imread(img_Path)
    w, h = imageSize.shape[:2]
    name = image.filename
    foundlist = []
    classes, confidences, boxes = detectbox(img_Path, rackcfg, rackweight)
    if len(classes) == 0:
        return "not found rack"

    listclass, listcon, listbox = classes.tolist(), confidences.tolist(), boxes.tolist()
    for i in range(len(listclass)):
        listclass[i][0] = listclass[i][0]+7
    foundlist = addracks(foundlist, listclass, listcon, listbox, w, h, name)
    classes, confidences, boxes = detectbox(img_Path, defectcfg, defectweight)
    if len(classes) == 0:

        return foundlist 
    listclass, listcon, listbox = classes.tolist(), confidences.tolist(), boxes.tolist()
    foundlist = adddefects(foundlist, listclass, listcon, listbox, w, h, name)
    # print(foundlist)
    return foundlist
