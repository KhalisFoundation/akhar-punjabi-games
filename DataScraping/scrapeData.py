import csv
from bs4 import BeautifulSoup
import requests
from selenium import webdriver
options = webdriver.ChromeOptions()
options.headless = True

class ByMatra():
    def getAllLinks(self):
        
        linksLst=[f"http://www.discoversikhism.com/punjabi/{i}.html".lower() for i in lst]
        return linksLst

    def scrapeLink(self):
        br =  webdriver.Chrome('C:\\Users\\gians\\Desktop\\stuff\\chromedriver.exe',options=options)
        allLinks=self.getAllLinks()
        lst=["gurmukhi_word_list","Kanna_words","Sihari_words","Bihari_words","Aunkar_words","Dulainkar_words","Lava_words","Dulava_words","Hora_words","Kanaura_words"]
        for matra in lst:
            theLink=f"http://www.discoversikhism.com/punjabi/{matra}.html".lower()
            br.get(theLink)
            content=br.page_source.encode('utf-8').strip()# res=requests.get(link)
            soup=BeautifulSoup(content,"lxml")
            thePage=soup.find("div",id="content2")
            allTables=thePage.findAll("table")
            for table in range(len(allTables)):
                print(f"Table {table}:")
                words=self.getDataFromTables(allTables[table])

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
    


link1="http://www.discoversikhism.com/punjabi/gurmukhi_word_list.html"
link2="https://1000mostcommonwords.com/1000-most-common-punjabi-words/"

a=ByMatra()
a.scrapeLink()

# f=open("./DataScraping/data.csv","a",newline="")
# tupa=[("bpb",19),("hello",123),(21,32,43)]
# writer=csv.writer(f)
# writer.writerows(tupa)
# f.close()