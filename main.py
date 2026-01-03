from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Payload(BaseModel):
    name: str
    age: int

@app.post("/")
async def test_api(data: Payload):
    return {
        "ok": True,
        "data": data
    }
