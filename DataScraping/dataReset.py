import csv

f=open("./new.csv",encoding= "utf-8")
csvreader = csv.reader(f)
header = next(csvreader)
obj=open("./obj.js","w",encoding="utf-8")

obj.write("export const allWords=[")
for line in csvreader:
    obj.write("{")
    engText=line[0]
    punjabiText=line[1]
    meaning=line[2]
    theLevel=line[3]
    if "\'" in meaning:
        meaning=meaning.replace("\'","\"")
    theLine=f"engText : \'{engText}\',punjabiText: \'{punjabiText}\',meaning:\'{meaning}\',level:{theLevel}"
    obj.write(theLine)
    obj.write("},\n")

obj.write("]")
obj.close()
f.close()