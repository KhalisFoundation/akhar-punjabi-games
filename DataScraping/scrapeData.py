import csv
from bs4 import BeautifulSoup
import requests
from selenium import webdriver
options = webdriver.ChromeOptions()
options.headless = True

class ByMatra():
    def getAllLinks(self):
        lst=["gurmukhi_word_list","Kanna_words","Sihari_words","Bihari_words","Aunkar_words","Dulainkar_words","Lava_words","Dulava_words","Hora_words","Kanaura_words"]
        linksLst=[f"http://www.discoversikhism.com/punjabi/{i}.html".lower() for i in lst]
        print(linksLst)
        return linksLst
    def scrapeLink1(self,link):
        br =  webdriver.Chrome('C:\\Users\\gians\\Desktop\\stuff\\chromedriver.exe',options=options)
        br.get(link)
        content=br.page_source.encode('utf-8').strip()
        # res=requests.get(link)
        soup=BeautifulSoup(content,"lxml")
        thePage=soup.find("div",id="content2")
        allTables=thePage.findAll("table")
        for table in range(len(allTables)):
            print(f"Table {table}:")
            self.getDataFromTables(allTables[table])

    def getDataFromTables(self,table):
        rows=table.findAll("tr")
        
        for row in rows:
            tds=row.findAll("td")
            punjabiWords=[]
            englishWords=[]
            for i in range(1,len(tds),3):
                punjabiWords.append(tds[i-1])
                englishWords.append(tds[i])
            print(f"{[i.text for i in punjabiWords]}: {[i.text for i in englishWords]}")
    






link1="http://www.discoversikhism.com/punjabi/gurmukhi_word_list.html"
link2="https://1000mostcommonwords.com/1000-most-common-punjabi-words/"

a=ByMatra()
a.getAllLinks()