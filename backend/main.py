# FastAPI Backend - main.py
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from uuid import uuid4
import stripe
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dummy database
users = []

# Stripe setup
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

# Models
class User(BaseModel):
    id: str
    name: str
    email: str
    role: str  # 'startup' or 'partner'
    industry: str
    subscription_active: bool = False

class UserCreate(BaseModel):
    name: str
    email: str
    role: str
    industry: str

class Match(BaseModel):
    partner_id: str
    shared_interest: str

# Routes
@app.post("/signup", response_model=User)
def signup(user: UserCreate):
    new_user = User(id=str(uuid4()), **user.dict())
    users.append(new_user)
    return new_user

@app.get("/users", response_model=List[User])
def list_users(role: str = None):
    if role:
        return [u for u in users if u.role == role]
    return users

@app.get("/match/{user_id}", response_model=List[Match])
def match_user(user_id: str):
    user = next((u for u in users if u.id == user_id), None)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    # Dummy matching logic
    matches = [
        Match(partner_id=u.id, shared_interest=u.industry)
        for u in users if u.role != user.role and u.industry == user.industry
    ]
    return matches

@app.post("/create-checkout-session")
def create_checkout():
    session = stripe.checkout.Session.create(
        payment_method_types=["card"],
        line_items=[{
            'price': os.getenv("STRIPE_PRICE_ID"),
            'quantity': 1
        }],
        mode='subscription',
        success_url='http://localhost:5173/success',
        cancel_url='http://localhost:5173/cancel'
    )
    return {"url": session.url}
