from pydantic import BaseModel
from typing import Optional
from datetime import date

class Interaction(BaseModel):
    hcp_name: str
    notes: str
    interaction_type: Optional[str] = None
    company: Optional[str] = None
    date: Optional["date"] = None
class User(BaseModel):
    username: str
    password: str


 
