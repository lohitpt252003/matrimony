from pydantic import BaseModel, EmailStr, field_validator
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    username: str
    full_name: Optional[str] = None
    gender: Optional[str] = None
    age: Optional[int] = None
    religion: Optional[str] = None
    caste: Optional[str] = None
    education: Optional[str] = None
    occupation: Optional[str] = None
    bio: Optional[str] = None

    @field_validator('username')
    @classmethod
    def username_alphanumeric(cls, v):
        if not v.isalnum():
            raise ValueError('Username must be alphanumeric')
        return v
    
    @field_validator('age')
    @classmethod
    def age_valid(cls, v):
        if v is not None and (v < 18 or v > 100):
            raise ValueError('Age must be between 18 and 100')
        return v
    
    @field_validator('bio')
    @classmethod
    def bio_length(cls, v):
        if v is not None and len(v) > 1000:
            raise ValueError('Bio must be less than 1000 characters')
        return v

class UserCreate(UserBase):
    password: str
    
    @field_validator('password')
    @classmethod
    def password_strength(cls, v):
        if len(v) < 6:
            raise ValueError('Password must be at least 6 characters')
        return v

class UserUpdate(UserBase):
    password: Optional[str] = None

class UserResponse(UserBase):
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
