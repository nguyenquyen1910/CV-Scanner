from sqlalchemy.orm import Session
from src.models.account import Account
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def authenticate_user(db: Session, username: str, password: str) -> Account | None:
    user = db.query(Account).filter(Account.username == username).first()
    if not user:
        return None
    if not verify_password(password, user.password):
        return None
    return user
