from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) '
                  'Chrome/91.0.4472.124 Safari/537.36'
}

chrome_options = Options()
chrome_options.add_argument('blink-settings=imagesEnabled=false')  # 不加载图片, 提升速度


# 定义爬虫函数
def get_cfm(mod_name, pages=1):
    url = f'https://www.curseforge.com/minecraft/search?page={pages}&pageSize=20&sortBy=relevancy&class=mc-mods&search={mod_name}'
    driver = webdriver.Chrome()  # 启动 Chrome 浏览器
    driver.get(url)  # 访问目标网页
    time.sleep(1)  # 等待 JavaScript 加载完成
    html = driver.page_source  # 获取网页源代码
    driver.quit()  # 关闭浏览器

    # 解析 HTML
    soup = BeautifulSoup(html, 'html.parser')
    div_tags = soup.find_all('div', class_='project-card')  # 查找所有符合条件的 div 标签
    href, name, loader, results = '', '', '', []
    for div in div_tags:
        a_tag = div.find('a', class_='name')  # 查找 div 内的 a 标签
        if a_tag:  # 如果 a 标签存在
            href = a_tag.get('href')  # 获取 href 属性
            span = a_tag.find('span', class_='ellipsis')  # 查找 a 标签中的 span
            name = span.text if span else "N/A"  # 如果 span 存在，获取文本，否则设置为 "N/A"
        version = div.find('li', class_='detail-game-version')
        loader = div.find('li', class_='detail-flavor')
        if loader:
            loader = loader.text.strip()
        if version:
            version = version.text.strip()
        results.append((name, href, loader, version))

    return results


def get_mrm(mod_name, pages=1):
    url = f'https://modrinth.com/mods?q={mod_name}&page={pages}'
    driver = webdriver.Chrome()  # 启动 Chrome 浏览器
    driver.get(url)  # 访问目标网页
    time.sleep(1.5)  # 等待 JavaScript 加载完成
    html = driver.page_source  # 获取网页源代码
    driver.quit()  # 关闭浏览器

    # 解析 HTML
    soup = BeautifulSoup(html, 'html.parser')
    article_tags = soup.find_all('article', class_='project-card base-card padding-bg')

    href, name, result = '', '', []
    for a in article_tags:
        a_tag = a.find('a', href=True)  # 获取 a 标签
        if a_tag:
            href = a_tag['href']  # 获取 href 属性
            name = a_tag['title']
        result.append((name, href))

    return result


print(get_mrm('fabric'))
