from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime

from .auth import create_token, get_current_user
from .langgraph_agent import agent


# --------------------------------------------------
# APP SETUP
# --------------------------------------------------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------------------------------
# MODELS
# --------------------------------------------------
class User(BaseModel):
    username: str
    password: str

class AIRequest(BaseModel):
    message: str

class InteractionCreate(BaseModel):
    hcp_name: str
    interaction_type: str
    date: str
    time: str
    attendees: str
    topics_discussed: str
    materials_shared: str
    summary: str
    sentiment: str
    follow_up: str

# --------------------------------------------------
# AUTH
# --------------------------------------------------
@app.post("/login")
def login(user: User):
    if user.username == "admin" and user.password == "admin":
        return {
            "access_token": create_token(user.username),
            "token_type": "bearer"
        }
    raise HTTPException(status_code=401, detail="Invalid credentials")

# --------------------------------------------------
# AI INTERACTION (WORKING)
# --------------------------------------------------
@app.post("/interactions/ai")
def ai_interaction(req: AIRequest, user=Depends(get_current_user)):
    ai_data = agent(req.message)
    now = datetime.now()

    return {
        "hcp_name": "Detected HCP",
        "interaction_type": "Meeting",
        "date": now.strftime("%Y-%m-%d"),
        "time": now.strftime("%H:%M"),
        "attendees": ai_data.get("attendees", ""),
        "topics_discussed": ai_data.get("topics_discussed", ""),
        "materials_shared": ai_data.get("materials_shared", ""),
        "summary": ai_data.get("summary", ""),
        "sentiment": ai_data.get("sentiment", "Neutral")
    }


# --------------------------------------------------
# DATABASE ROUTES (TEMP DISABLED FOR DEMO)
# --------------------------------------------------
@app.post("/interactions")
def save_interaction(user=Depends(get_current_user)):
    return {"message": "Database disabled for demo"}

@app.get("/interactions")
def get_interactions(user=Depends(get_current_user)):
    return []

@app.put("/interactions/{id}")
def update_interaction(id: int, user=Depends(get_current_user)):
    return {"message": "Database disabled for demo"}

@app.get("/hcps")
def get_hcps(user=Depends(get_current_user)):
    return []
