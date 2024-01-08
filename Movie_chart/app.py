from flask import Flask, render_template, request
import requests

app = Flask(__name__)

@app.route("/answer")
def answer():
    if request.args.get('query'):
        query = request.args.get('query')
    else:
        query = '20230601'
    
    URL = f"http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=f5eef3421c602c6cb7ea224104795888&targetDt={query}"

    res = requests.get(URL)
    rjson = res.json()
    movie_rank = rjson['boxOfficeResult']['weeklyBoxOfficeList']
    return render_template("answer.html",data=movie_rank)

if __name__ == '__main__':  
    app.run(debug=True)