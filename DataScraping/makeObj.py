f=open("./DataScraping/data.csv","r",encoding= "utf-8")
lines=f.readlines()
f.close()

lines=[i.split(",") for i in lines]
lines=[(i[0],','.join(i[1:]).replace("\"", "").replace("\n","")) for i in lines]

lst=[{"text":i[0],"meaning":i[1]} for i in lines]


# print(lst)
f=open("./DataScraping/obj.txt","w",encoding= "utf-8")
f.write(str(lst))
f.close()