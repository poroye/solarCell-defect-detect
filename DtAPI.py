import cv2 as cv
from fastapi import FastAPI, File, UploadFile, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import shutil
import os

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
    for i in range(len(confidentlist)):
        confidentlist[i][0] = float("{:.5f}".format(confidentlist[i][0]))
        boxlist[i][0], boxlist[i][1], boxlist[i][2], boxlist[i][3] = float("{:.5f}".format(boxlist[i][0]/w)), float(
            "{:.5f}".format(boxlist[i][1]/h)), float("{:.5f}".format(boxlist[i][2]/w)), float("{:.5f}".format(boxlist[i][3]/h))
    while len(classlist) > 0:
        foundlist.append(
            {"filename": name, "type": classlist.pop(), "confidence": confidentlist.pop(), "box": boxlist.pop()})
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


@app.post("/uploadfile/")  # upload display file name work
async def create_upload_file(file: UploadFile = File(...)):
    return {"filename": file.filename}


@app.post("/uploadAndDisplay")  # upload image and return image work
async def image_endpoint(file: UploadFile = File(...)):
    contents = await file.read()
    return Response(content=contents, media_type="image/png")


@app.post("/detect")
async def detect(image: UploadFile = File(...)):
    with open("temp.png", "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)
    img_Path = r"C:\Users\PON\Desktop\API\temp.png"
    imageSize = cv.imread(img_Path)
    w, h = imageSize.shape[:2]
    name = image.filename
    foundlist = []
    classes, confidences, boxes = detectbox(img_Path, rackcfg, rackweight)
    if len(classes) == 0:
        return "not found defect"

    listclass, listcon, listbox = classes.tolist(), confidences.tolist(), boxes.tolist()
    for i in range(len(listclass)):
        listclass[i][0] = listclass[i][0]+7
    foundlist = addlist(foundlist, listclass, listcon, listbox, w, h, name)

    classes, confidences, boxes = detectbox(img_Path, defectcfg, defectweight)
    if len(classes) == 0:
        return foundlist 
    listclass, listcon, listbox = classes.tolist(), confidences.tolist(), boxes.tolist()
    foundlist = addlist(foundlist, listclass, listcon, listbox, w, h, name)

    return foundlist
