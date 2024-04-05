from typing import Optional, Union
from pydantic import BaseModel, Field

class Place(BaseModel):
    id: int
    name: str
    city: Union[str, None]
    country: Union[str, None]
    foodType: Union[str, None]
    rating: Union[int, None]
    visited: bool

class CreatePlace(BaseModel):
    name: str = Field(min_length=3)
    city: Optional[str]  = ""
    country: Optional[str]  = ""
    foodType: Optional[str] = ""
    rating: Optional[int] = None
    visited: Optional[bool] = False

class UpdatePlace(BaseModel):
    name: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str]  = None
    foodType: Optional[str] = None
    rating: Optional[int] = None
    visited: Optional[bool] = None