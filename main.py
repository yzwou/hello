# main.py
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# 允许前端跨域访问（测试阶段用 *，正式换成你的前端域名）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/")
async def test_api(request: Request):
    data = await request.json()
    return {
        "from_frontend": data,
        "hello": "hi"
    }
