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


def detectbox(imgPath, CFG, WEIGHT):
    net = cv.dnn_DetectionModel(CFG, WEIGHT)
    net.setInputSize(608, 608)
    net.setInputScale(1.0 / 255)
    net.setInputSwapRB(True)

    frame = cv.imread(imgPath)

    classes, confidences, boxes = net.detect(
        frame, confThreshold=0.1, nmsThreshold=0.4)
    return classes, confidences, boxes


def addlist(foundlist, classlist, confidentlist, boxlist, w, h, name):
    racklist = []
    for i in range(len(confidentlist)):
        confidentlist[i][0] = float("{:.5f}".format(confidentlist[i][0]))
        boxlist[i][0], boxlist[i][1], boxlist[i][2], boxlist[i][3] = float("{:.5f}".format(boxlist[i][0]/w)), float(
            "{:.5f}".format(boxlist[i][1]/h)), float("{:.5f}".format(boxlist[i][2]/w)), float("{:.5f}".format(boxlist[i][3]/h))
        racklist.append([i])
    while len(classlist) > 0:
        foundlist.append(
            [name, classlist.pop(), confidentlist.pop(), boxlist.pop(), racklist.pop()])
    return foundlist


def addlist2(foundlist, classlist, confidentlist, boxlist, w, h, name):
    racklist = []
    for i in range(len(confidentlist)):
        confidentlist[i][0] = float("{:.5f}".format(confidentlist[i][0]))
        boxlist[i][0], boxlist[i][1], boxlist[i][2], boxlist[i][3] = float("{:.5f}".format(boxlist[i][0]/w)), float(
            "{:.5f}".format(boxlist[i][1]/h)), float("{:.5f}".format(boxlist[i][2]/w)), float("{:.5f}".format(boxlist[i][3]/h))
        print(boxlist)
        mindis = 500000
        minindx = 0
        for j in range(len(foundlist)):
            rackX, rackY = foundlist[j][3][0] + \
                (foundlist[j][3][2]/2), foundlist[j][3][1] + \
                (foundlist[j][3][3]/2)
            defectX, defectY = boxlist[i][0] + \
                (boxlist[i][2]/2), boxlist[i][1] + (boxlist[i][3]/2)
            temp_min = sqrt(abs(rackX-defectX)**2 + abs(rackY-defectY)**2)
            print(rackX, rackY, defectX, defectY, temp_min)
            if temp_min < mindis:
                minindx = j
                mindis = temp_min
                print("new min = ", mindis)
        racklist.append([minindx])
    while len(classlist) > 0:
        foundlist.append(
            [name, classlist.pop(), confidentlist.pop(), boxlist.pop(), racklist.pop()])
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


@app.post("/uploadAndDisplay")  # upload image and return image work
async def image_endpoint(file: UploadFile = File(...)):
    contents = await file.read()
    return Response(content=contents, media_type="image/png")


@app.post("/detect")
async def detect(image: UploadFile = File(...)):
    with open(image.filename, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)
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
    foundlist = addlist(foundlist, listclass, listcon, listbox, w, h, name)
    # print(foundlist)
    classes, confidences, boxes = detectbox(img_Path, defectcfg, defectweight)
    if len(classes) == 0:
        return foundlist
    listclass, listcon, listbox = classes.tolist(), confidences.tolist(), boxes.tolist()
    foundlist = addlist2(foundlist, listclass, listcon, listbox, w, h, name)
    # print(foundlist)
    return foundlist
