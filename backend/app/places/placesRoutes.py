from fastapi import APIRouter
from typing import List

from app.configDB import session
from app.places.placesModels import Places
from app.places.placesSchemas import Place




placesRoutes = APIRouter(prefix="/places/api/v1")


@placesRoutes.get("/all", tags=["Places"], response_model=List[Place], description="Get all places")
async def getPlaces():
    places = session.query(Places)
    return places.all()  
