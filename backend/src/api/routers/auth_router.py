from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from src.services.auth_service import authenticate_user
from src.database.database import get_db

router = APIRouter()


class LoginRequest(BaseModel):
    username: str
    password: str


@router.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = authenticate_user(db, request.username, request.password)
    if not user:
        return {
            "ok": False,
            "status": "error",
            "message": "Sai tên tài khoản hoặc mật khẩu",
            "data": None,
        }
    return {
        "ok": True,
        "status": "success",
        "message": "Đăng nhập thành công",
        "data": {"username": user.username, "email": user.email},
    }
