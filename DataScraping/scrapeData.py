import csv
from bs4 import BeautifulSoup
import requests
from requests.models import ContentDecodingError
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


lst=[GurbaniWords(),ByMatra(),GurbaniWordsSikhiWiki(),ThousandMostCommonWords()]
allWords=[]
for i in lst:
    words=i.scrapeLink()
    allWords+=words
allWords=[i for i in allWords if len(i[0].split())==1]

objs=[]
for word in allWords:
    ascii=[ord(letter)for letter in word[0]]
    objs.append({"text":word[0],"meaning":word[1],"ascii":ascii})

f=open("./DataScraping/newObj.txt","w",encoding= "utf-8")
f.write("export const words=[\n")
for i in objs:
    f.write(str(i)+",\n")
f.write("]")
f.close()