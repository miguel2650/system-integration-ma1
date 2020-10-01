from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from starlette.responses import RedirectResponse
from pydantic import BaseModel

import json
# Run command:
# uvicorn password_generator:app --host 127.0.0.1 --port 8089


class User(BaseModel):
    nemId: str
    cpr: str


app = FastAPI()


@app.get("/")
def main():
    return RedirectResponse(url="/docs/")


@app.post('/generate-password-nemID/')
async def create_nemId_password(user: User):
    """Send a JSON response (status 200) with first 2 digits of 'nemId' and last 2 digits of 'cpr'."""
    return JSONResponse(content={
        'nemIdPassword': user.nemId[:2] + user.cpr[-2:]
    })
