import cv2 as cv
import os
import json
entries = os.listdir(r'C:\Users\pro\Desktop\project\weightterm1\rack')
with open(r'C:\Users\pro\Desktop\project\weightterm1\GT_Solar_Panel_Rack.json') as f:
    datalis = json.load(f)
f.close()
"""
for jsonname in datalis:
    print(type(jsonname['filename']))
    #break
for filename in entries:
    print(type(filename))
    #break
"""
print("start")
for fil in entries:  # file in folder (this folder only content image)
    for jsonname in datalis:
        if fil == jsonname['filename']:  # pic name compare with json name list
            if len(jsonname['obj_array']) == 0:
                print(jsonname['filename'], "no defect!")
            else:  # fil picture have defect in json so we create yolo gt
                frame = cv.imread(
                    'C:/Users/pro/Desktop/project/weightterm1/rack/'+fil)
                height = frame.shape[0]
                txtcontent = ""
                # i stand for each defect
                for i in range(len(jsonname['obj_array'])):
                    picname, label = jsonname['filename'], " "
                    defectType = jsonname['obj_array'][i]['label']
                    bbox = jsonname['obj_array'][i]['bbox'].split(',')
                    bboxW, bboxH = int(bbox[2]), int(bbox[3])
                    center = jsonname['obj_array'][i]['center'].split(',')
                    X, Y = int(center[0]), int(center[1])
                    if defectType == "SOLAR_PANEL_RACK":
                        label = "0"
                    else:
                        print("unclass get it off")
                    posX, posY, boxW, boxH = X/height, Y/height, bboxW/height, bboxH/height
                    txtcontent = txtcontent + label + " " + \
                        str(posX) + " " + str(posY) + " " + \
                        str(boxW) + " " + str(boxH) + "\n"
                txtname = fil.split('.')
                name = txtname[0] + ".txt"
                print(name)
                f = open(
                    "C:/Users/pro/Desktop/project/weightterm1/rack/"+name, "w")
                f.write(txtcontent)
