import csv,time
from bs4 import BeautifulSoup
import requests
from selenium import webdriver
options = webdriver.ChromeOptions()
options.headless = True


#take out sentences. only words
class ByMatra():
    def scrapeLink(self):
        br =  webdriver.Chrome('C:\\Users\\gians\\Desktop\\stuff\\chromedriver.exe',options=options)
        lst=["gurmukhi_word_list","Kanna_words","Sihari_words","Bihari_words","Aunkar_words","Dulainkar_words","Lava_words","Dulava_words","Hora_words","Kanaura_words"]
        allWords=[]
        for matra in lst:
            theLink=f"http://www.discoversikhism.com/punjabi/{matra}.html".lower()
            br.get(theLink)
            content=br.page_source.encode('utf-8').strip()# res=requests.get(link)
            soup=BeautifulSoup(content,"lxml")
            thePage=soup.find("div",id="content2")
            allTables=thePage.findAll("table")
            for table in range(len(allTables)):
                words=self.getDataFromTables(allTables[table])
                allWords+=words
        br.close()
        return allWords

    def getDataFromTables(self,table):
        rows=table.findAll("tr")
        allWords=[]
        for row in rows:
            tds=row.findAll("td")
            punjabiWords=[]
            englishWords=[]
            for i in range(1,len(tds),3):
                punjabiWords.append(tds[i-1].text)
                englishWords.append(tds[i].text)
                wordWithDef=(tds[i-1].text,tds[i].text)
                allWords.append(wordWithDef)
        return allWords

class ThousandMostCommonWords():
    def scrapeLink(self):
        link="https://1000mostcommonwords.com/1000-most-common-punjabi-words/"
        res=requests.get(link)
        soup=BeautifulSoup(res.text,"lxml")
        table=soup.find("table")
        trs=table.findAll("tr")[1:]
        allWords=[]
        for tr in trs:
            tds=tr.findAll("td")
            punjabiWord=tds[1].text
            englishWord=tds[2].text
            word=(punjabiWord,englishWord)
            allWords.append(word)  
        return allWords

class GurbaniWords():
    def scrapeLink(self):
        link="https://www.chardikalaa.com/?page_id=61"
        br =  webdriver.Chrome('C:\\Users\\gians\\Desktop\\stuff\\chromedriver.exe',options=options)
        br.get(link)
        content=br.page_source.encode('utf-8').strip()# res=requests.get(link)
        soup=BeautifulSoup(content,"lxml")
        table=soup.find("table")
        trs=table.findAll("tr")[1:]
        allWords=[]
        for tr in trs:
            tds=tr.findAll("td")
            punjabiWord=tds[0].text.strip()
            englishWord=tds[2].text.strip()
            if ""!=punjabiWord and " " not in punjabiWord:
                word=(punjabiWord,englishWord)
                allWords.append(word)
        br.close()
        return allWords

class GurbaniWordsSikhiWiki():
    def scrapeLink(self):
        link="https://www.sikhiwiki.org/index.php/Gurmukhi_to_English"
        #br =  webdriver.Chrome('C:\\Users\\gians\\Desktop\\stuff\\chromedriver.exe',options=options)
        #br.get(link)
        #content=br.page_source.encode('utf-8').strip()# res=requests.get(link)
        res=requests.get(link)
        content=res.text
        soup=BeautifulSoup(content,"lxml")
        tables=soup.findAll("table")[1:-1]
        allWords=[]
        for i in tables:
            words=self.tableScraper(i)
            allWords+=words
        return allWords
    def tableScraper(self,table):
        trs=table.findAll("tr")
        ths=trs[0].findAll("th")
        if ths==[]:
            ths=trs[0].findAll("td")
        ths=[i.text for i in ths]
        gurmukhiInd=ths.index("Gurmukhi")
        engInd=ths.index("Gurbani Translation")
        allWordsInTable=[]
        for i in trs[1:]:
            tds=i.findAll("td")
            punjabiWord=tds[gurmukhiInd].text.strip()[:-2]
            englishWord=tds[engInd].text.strip()
            if ""!=punjabiWord and " " not in punjabiWord and "\u0a5d" not in punjabiWord:
                word=(punjabiWord,englishWord)

                allWordsInTable.append(word)
        return allWordsInTable


# lst=[GurbaniWords(),ByMatra(),GurbaniWordsSikhiWiki(),ThousandMostCommonWords()]
# allWords=[]
# for i in range(len(lst)):
#     words=lst[i].scrapeLink()
#     theWords=[] #with punj or gurm
#     for word in words:
#         if i%2==0: #gurbani words are at even indexes in the lst
#             theWords.append(word+("Gurbani",))
#         else:
#             theWords.append(word+("Punjabi",))
#     allWords+=theWords
# allWords=[i for i in allWords if len(i[0].split())==1]

# f=open("./DataScraping/words.txt","w",encoding='utf-8')
# for wordLst in allWords:
#     for i in wordLst:
#         f.write(i+" , ")
#     f.write("\n")
#     #print(i)
# f.close()


#to read the words that were made into unicode by makeUnicode.js file
allWords=[]
f=open("./DataScraping/unicodeWords.txt","r",encoding='utf-8')
lines=f.readlines()
allWords=[]
for i in lines: 
    line=i[:-4]
    engText,punjabiText,meaning,theType=line.split(" , ")
    allWords.append((engText,punjabiText,meaning,theType))

def getLevel(word):
    if 'w' not in word and 'W' not in word and'i' not in word and 'I' not in word and'u' not in word and'U' not in word and 'y'not in word and'Y'not in word and  'o'not in word and'O' not in word and 'M' not in word:
        return 1,"mukta" #mukta
    elif 'W' not in word and'i' not in word and 'I' not in word and'u' not in word and'U' not in word and 'y'not in word and'Y'not in word and  'o'not in word and'O' not in word and 'M' not in word and 'W' not in word:
        return 2,"kanna" #kanna only
    elif 'w' not in word and 'W' not in word and 'I' not in word and'u' not in word and'U' not in word and 'y'not in word and'Y'not in word and  'o'not in word and'O' not in word and 'M' not in word:
        return 3,"sehari" #sehari only
    elif 'w' not in word and 'W' not in word and'i' not in word and'u' not in word and'U' not in word and 'y'not in word and'Y'not in word and  'o'not in word and'O' not in word and 'M' not in word:
        return 5,"behari" #behari only
    elif 'w' not in word and 'W' not in word and'i' not in word and 'I' not in word  and'U' not in word and 'y'not in word and'Y'not in word and  'o'not in word and'O' not in word and 'M' not in word:
        return 7,"onkar" #onkar only
    elif 'w' not in word and 'W' not in word and'i' not in word and 'I' not in word and'u' not in word and 'y'not in word and'Y'not in word and  'o'not in word and'O' not in word and 'M' not in word:
        return 9,"dulankar" #dulankar only
    elif 'w' not in word and 'W' not in word and'i' not in word and 'I' not in word and'u' not in word and'U' not in word  and'Y'not in word and  'o'not in word and'O' not in word and 'M' not in word:
        return 11,"lava" #lava only
    elif 'w' not in word and 'W' not in word and'i' not in word and 'I' not in word and'u' not in word and'U' not in word and 'y'not in word and  'o'not in word and'O' not in word and 'M' not in word:
        return 13,"dulava" #dulava only
    elif 'w' not in word and 'W' not in word and'i' not in word and 'I' not in word and'u' not in word and'U' not in word and 'y'not in word and'Y'not in word  and'O' not in word and 'M' not in word:
        return 15,"hora" #hora only
    elif 'w' not in word and 'W' not in word and'i' not in word and 'I' not in word and'u' not in word and'U' not in word and 'y'not in word and'Y'not in word and  'o'not in word and 'M' not in word:
        return 17,"kanora" #kanora only
    elif 'w' not in word and 'W' not in word and'i' not in word and 'I' not in word and'u' not in word and'U' not in word and 'y'not in word and'Y'not in word and  'o'not in word and'O' not in word :
        return 19,"tipi" #tipi only
    if 'w' not in word and'i' not in word and 'I' not in word and'u' not in word and'U' not in word and 'y'not in word and'Y'not in word and  'o'not in word and'O' not in word and 'M' not in word:
        return 21,"kannaBindi" #kanaBindi only



    elif 'I' not in word and'u' not in word and'U' not in word and 'y'not in word and'Y'not in word and  'o'not in word and'O' not in word and 'M' not in word and 'W' not in word:
        return 4,"sehari n above" #sehari and kanna
    elif 'u' not in word and'U' not in word and 'y'not in word and'Y'not in word and  'o'not in word and'O' not in word and 'M' not in word and 'W' not in word:
        return 6,"behari n above" #behari sehari kanna
    elif 'U' not in word and 'y'not in word and'Y'not in word and  'o'not in word and'O' not in word and 'M' not in word and 'W' not in word:
        return 8,"onkar n above" #onkar behari sehari kanna
    elif 'y'not in word and'Y'not in word and  'o'not in word and'O' not in word and 'M' not in word and 'W' not in word:
        return 10,"dulankar n above" #dulankar onkar behari sehari kanna
    elif 'Y'not in word and  'o'not in word and'O' not in word and 'M' not in word and 'W' not in word:
        return 12,"lava n above" #lava dulankar onkar behari sehari kanna
    elif 'o'not in word and'O' not in word and 'M' not in word and 'W' not in word:
        return 14,"dulava n above" #dulava lava onkar behari sehari kanna
    elif 'O' not in word and 'M' not in word and 'W' not in word:
        return 16,"hoora n above" #hora dulava lava onkar behari sehari kanna
    elif 'M' not in word and 'W' not in word:
        return 18,"kanora n above"
    elif 'W' not in word:
        return 20,"tipi n above"
    else:
        return 22,"KannaBindi n above"



obj=open("./DataScraping/obj.js","w",encoding="utf-8")
data=[]

obj.write("export const words=[")
for line in allWords:
    obj.write("{")
    engText=line[0]
    punjabiText=line[1]
    meaning=line[2]
    theType=line[3]
    theLevel=getLevel(engText)[0]
    if "\'" in meaning:
        meaning=meaning.replace("\'","\"")
    theLine=f"engText : \'{engText}\',punjabiText: \'{punjabiText}\',meaning:\'{meaning}\',type:{theType},level:{theLevel}"
    obj.write(theLine)
    obj.write("},\n")
    forCsv=(engText,punjabiText,meaning,theType,theLevel)
    data.append(forCsv)

obj.write("]")
obj.close()

f=open("./DataScraping/data.csv","w",newline="",encoding= "utf-8")
writer=csv.writer(f)
writer.writerows(data)
f.close()