from flask import Flask, jsonify, render_template
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)  # 允许跨域

# 定义爬虫函数
def get_weather():
    sf = 'fujian'
    cs = 'xiamen'

    head = {
        'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; it; rv:1.8.1.11) Gecko/20071127 Firefox/2.0.0.11'
    }
    url = f'https://tianqi.moji.com/weather/china/{sf}/{cs}'
    res = requests.get(url, headers=head)
    res.encoding = res.apparent_encoding

    soup = BeautifulSoup(res.text, 'lxml')
    # 解析天气信息
    tags = soup.find_all('div', class_='wea_weather clearfix')
    tags2 = soup.find_all('div', class_='wea_about clearfix')
    tags3 = soup.find_all('div', class_='wea_tips clearfix')
    tags4 = soup.find_all('div', class_='search_default')

    # 提取并组合信息
    for t in tags:
        tex = t.text.strip()
    for t in tags2:
        tex2 = t.text.strip()
    for t in tags3:
        tex3 = t.text.strip()
    for t in tags4:
        tex4 = t.text.strip()

    result = f"{tex4[0:3]}今日温度 {tex} 摄氏度，{tex2}。天气提示：{tex3[8:-1]}"
    return result

# 定义 API 路由，返回天气数据
@app.route('/api/weather', methods=['GET'])
def weather_api():
    weather_info = get_weather()
    return jsonify({"weather": weather_info})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True, ssl_context=('server-cert.pem', 'server-key.pem'))
