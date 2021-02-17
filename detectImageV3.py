import cv2 as cv
import numpy as np
print("start")
# cfg & weight MUST be in the same folder as python script! or it will be error
defectcfg = "C:/Users/pro/Desktop/project/solardefect.cfg"
defectweight = "C:/Users/pro/Desktop/project/7700_9984.weights"
defectnamelist = "C:/Users/pro/Desktop/project/objdefect.names"

rackcfg = "C:/Users/pro/Desktop/project/rack.cfg"
rackweight = "C:/Users/pro/Desktop/project/custom-yolov4-detector_best.weights"
racknamelist = "C:/Users/pro/Desktop/project/objrack.names"

image = 'C:/Users/pro/Desktop/project/test/0304EQU1521_V1521.jpg'


def detectbox(imgPath, CFG, WEIGHT):
    net = cv.dnn_DetectionModel(CFG, WEIGHT)
    net.setInputSize(608, 608)
    net.setInputScale(1.0 / 255)
    net.setInputSwapRB(True)

    frame = cv.imread(imgPath)

    classes, confidences, boxes = net.detect(
        frame, confThreshold=0.1, nmsThreshold=0.4)
    return classes, confidences, boxes


def drawbox(typelist, confi, box, img, nameobj):
    w, h = img.shape[:2]
    with open(nameobj, 'rt') as f:
        name = f.read().rstrip('\n').split('\n')
    if len(typelist) != 0:
        for classId, confidence, box in zip(typelist.flatten(), confi.flatten(), box):
            label = '%.2f' % confidence
            label = '%s: %s' % (name[classId], label)
            labelSize, baseLine = cv.getTextSize(
                label, cv.FONT_HERSHEY_SIMPLEX, 0.5, 1)
            left, top, width, height = box
            #print(left/w, top/w, width/w, height/w)
            top = max(top, labelSize[1])
            cv.rectangle(img, box, color=(0, 255, 0), thickness=1)
            cv.rectangle(
                img, (left, top - labelSize[1]), (left + labelSize[0], top + baseLine), (255, 255, 255), cv.FILLED)
            cv.putText(img, label, (left, top),
                       cv.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0))
    else:
        print("nothing detected")
    return img


def showDetect(img_Path):
    frame = cv.imread(img_Path)
    classes, confidences, boxes = detectbox(img_Path, defectcfg, defectweight)
    classes2, confidences2, boxes2 = detectbox(img_Path, rackcfg, rackweight)

    frame = drawbox(classes, confidences, boxes, frame, defectnamelist)
    frame3 = drawbox(classes2, confidences2, boxes2, frame, racknamelist)
    cv.imshow('result', frame3)
    cv.waitKey(0)


showDetect(image)
# result = detectbox(image)
# print(len(result[0]))
