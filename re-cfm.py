# from flask import Flask, jsonify, render_template
# from flask_cors import CORS
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time
import requests

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

# app = Flask(__name__)
# CORS(app)  # 允许跨域

chrome_options = Options()
chrome_options.add_argument('blink-settings=imagesEnabled=false')  # 不加载图片, 提升速度


# 定义爬虫函数
def get_cfm(mod_name, pages=1):
    url = f'https://www.curseforge.com/minecraft/search?page={pages}&pageSize=20&sortBy=relevancy&class=mc-mods&search={mod_name}'
    driver = webdriver.Chrome()  # 启动 Chrome 浏览器
    driver.get(url)  # 访问目标网页
    time.sleep(5)  # 等待 JavaScript 加载完成
    html = driver.page_source  # 获取网页源代码
    # print(html)
    driver.quit()  # 关闭浏览器

    # response = requests.get(url, headers=headers)
    # soup = BeautifulSoup(response.text, 'html.parser')
    # print(soup.prettify())

    soup = BeautifulSoup(html, 'html.parser')  # 解析
    span_ellipsis = soup.find_all('span', class_='ellipsis')

    for span in span_ellipsis:
        return span.text


print(get_cfm('lris'))
# 定义 API 路由，返回天气数据
# @app.route('/api/weather', methods=['GET'])
# def weather_api():
#     weather_info = get_weather()
#     return jsonify({"weather": weather_info})
#
#
# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5000, debug=True, ssl_context=('server-cert.pem', 'server-key.pem'))
