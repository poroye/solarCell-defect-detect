import cv2 as cv
print("start")

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
    w , h = frame.shape[:2]############################################################################################################
    classes, confidences, boxes = detectbox(img_Path)
    with open('C:/Users/pro/Desktop/project/obj.names', 'rt') as f:
        name = f.read().rstrip('\n').split('\n')
    if len(classes) != 0:
        for classId, confidence, box in zip(classes.flatten(), confidences.flatten(), boxes):
            label = '%.2f' % confidence
            label = '%s: %s' % (name[classId], label)
            labelSize, baseLine = cv.getTextSize(label, cv.FONT_HERSHEY_SIMPLEX, 0.5, 1)
            left, top, width, height = box
            print(left/w,top/w,width/w,height/w)#######################################################################################
            top = max(top, labelSize[1])
            cv.rectangle(frame, box, color=(0, 255, 0), thickness=1)
            cv.rectangle(frame, (left, top - labelSize[1]),(left + labelSize[0], top + baseLine), (255,255,255), cv.FILLED)
            cv.putText(frame, label, (left, top), cv.FONT_HERSHEY_SIMPLEX, 0.5, (0,0,0))
    cv.imshow('result',frame)
    cv.waitKey(0)

image = 'C:/Users/pro/Desktop/project/test/0625SCLL7_L12.jpg'
showDetect(image)
#result = detectbox(image)
#print(len(result[0]))
