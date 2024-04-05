from fastapi import APIRouter

placesRoutes = APIRouter(prefix="/places/api/v1")


@placesRoutes.get("/all", tags=["Places"], description="Get all places")
async def getPlaces():
   return {"return all places"}   