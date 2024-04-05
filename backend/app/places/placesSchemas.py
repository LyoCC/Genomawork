from typing import Union
from pydantic import BaseModel

class Place(BaseModel):
    id: int
    name: str
    city: Union[str, None]
    country: Union[str, None]
    foodType: Union[str, None]
    rating: Union[int, None]
    visited: bool
