from flask import Flask, render_template
from bs4 import BeautifulSoup
import requests

app = Flask(__name__)

def crawlingResult():
    url = "https://www.melon.com/chart/index.htm"
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
    data = requests.get(url, headers=headers)
    soup = BeautifulSoup(data.text, 'html.parser')

    trs = soup.select('table > tbody > tr')

    music_list = []
    for tr in trs:
        rank = tr.select_one('.rank').text
        title = tr.select_one('.rank01 > span > a').text
        image = tr.select_one('img')['src']
        musician = tr.select_one('.rank02 > span > a').text

        music_list.append({
            'rank':rank,
            'title':title,
            'image':image,
            'musician':musician,
        })
    return music_list
    

@app.route('/')
def index():

    data = crawlingResult()
    return render_template('index.html', music_list=data)

if __name__ == '__main__':
    app.run()