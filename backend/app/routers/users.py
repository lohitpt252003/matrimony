from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from .. import database, models, schemas, auth
from fastapi.security import OAuth2PasswordBearer

router = APIRouter(prefix="/users", tags=["users"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(database.get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        from jose import jwt, JWTError
        payload = jwt.decode(token, auth.SECRET_KEY, algorithms=[auth.ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = schemas.user.TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = db.query(models.user.User).filter(models.user.User.username == token_data.username).first()
    if user is None:
        raise credentials_exception
    return user

@router.get("/me", response_model=schemas.user.UserResponse)
def read_users_me(current_user: models.user.User = Depends(get_current_user)):
    return current_user

@router.get("/", response_model=List[schemas.user.UserResponse])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)):
    users = db.query(models.user.User).offset(skip).limit(limit).all()
    return users

@router.get("/{user_id}", response_model=schemas.user.UserResponse)
def read_user(user_id: int, db: Session = Depends(database.get_db)):
    db_user = db.query(models.user.User).filter(models.user.User.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user
