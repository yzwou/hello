from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# 允许跨域的源（开发阶段可全部允许）
origins = [
    "*",  # 或 ["http://localhost:63342"]
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,      # 允许的前端源
    allow_credentials=True,
    allow_methods=["*"],        # GET, POST, PUT, DELETE...
    allow_headers=["*"],        # Content-Type, Authorization...
)

class Payload(BaseModel):
    name: str
    age: int

@app.post("/")
async def test_api(data: Payload):
    return {"msg": "ok", "data": data}
