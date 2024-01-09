from flask import Flask, render_template
from bs4 import BeautifulSoup
import requests

app = Flask(__name__)

def get_music():
    url = "https://www.melon.com/chart/index.htm"
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
    data = requests.get(url, headers=headers)
    soup = BeautifulSoup(data.text, 'html.parser')

    chart_table = soup.select('#lst50')
    music_list = []
    for music in chart_table:
        src = music.select_one('a.image_typeAll > img')['src']
        music_list.append({
            'img': src 
        })

    return music_list

@app.route('/')
def index():
    music_list = get_music()
    return render_template('index.html', data=music_list)

if __name__ == '__main__':
    app.run()