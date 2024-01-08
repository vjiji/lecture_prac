from flask import Flask, render_template, request
import random
import requests

app = Flask(__name__)

@app.route('/')
def home():
    name = 'sungji'
    lotto = [16, 2, 29, 33, 23, 1]


    def recommend_lotto_numbers():
        numbers= random.sample(range(1, 46), 6)
        return sorted(numbers)

    lotto_numbers = recommend_lotto_numbers()
    
    def find_common_elements(list1, list2):
        common_elements = set(list1).intersection(set(list2))
        return len(common_elements)

    common_count = find_common_elements(lotto, lotto_numbers)
    context = {
        'name': name,
        'lotto': lotto,
        'random_lotto': lotto_numbers,
        'common_count' : common_count,
    }
    return render_template('index.html', data=context)

@app.route('/mypage')
def mypage():
    return 'This is Mypage!'

@app.route('/movie')
def movie():
    query = request.args.get('query')
    res = requests.get(
	f"http://kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=f5eef3421c602c6cb7ea224104795888&movieNm={query}"
)
    rjson = res.json()
    movie_list = rjson["movieListResult"]["movieList"]
    
    print(movie_list)
    return render_template('movie.html',data = movie_list)

if __name__ == '__main__':  
    app.run(debug=True)