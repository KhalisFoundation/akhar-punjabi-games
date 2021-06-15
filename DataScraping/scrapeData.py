import csv
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
        f=open("./DataScraping/data.csv","a",newline="",encoding= "utf-8")
        writer=csv.writer(f)
        allWords=[i for i in allWords if len(i[0].split())==1]
        writer.writerows(allWords)
        f.close()

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
        f=open("./DataScraping/data.csv","a",newline="",encoding= "utf-8")
        writer=csv.writer(f)
        allWords=[i for i in allWords if len(i[0].split())==1]
        writer.writerows(allWords)
        f.close()


lst=[ByMatra(),ThousandMostCommonWords()]
[i.scrapeLink() for i in lst]

# f=open("./DataScraping/data.csv","a",newline="")
# tup=[("bpb",19),("hello",123),(21,32,43)]
# writer=csv.writer(f)
# writer.writerows(tup)
# f.close()