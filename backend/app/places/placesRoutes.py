from fastapi import APIRouter, status, HTTPException, Query
from typing import List

from app.configDB import session
from app.places.placesModels import Places
from app.places.placesSchemas import Place, CreatePlace, UpdatePlace


placesRoutes = APIRouter(prefix="/places/api/v1")

@placesRoutes.get("/all", tags=["Places"], response_model=List[Place], description="Get all places")
async def getPlaces():
    places = session.query(Places)
    return places.all()    

@placesRoutes.get("/visited", tags=["Places"], response_model=List[Place], description="Get all places visited or unvisited")
async def getVisited(option: bool = Query(True, description="Filter places true:return all visited and false: return all unvisted/ default true")):       
    places = session.query(Places).filter(Places.visited == option)
    return places.all()  

@placesRoutes.post("/add", tags=["Places"], response_model=int, description="Create a new place", status_code=status.HTTP_201_CREATED)
async def addPlace(payload: CreatePlace):
    payloadDict = payload.model_dump()    
    newPlace = Places(**payloadDict)         
    session.add(newPlace)
    session.commit()
    return newPlace.id

@placesRoutes.delete("/delete/{id}",  tags=["Places"], response_model=str, description="Delete a place by id", status_code=status.HTTP_200_OK)
async def deletePlace(id: int ):
    placeToDelete = session.query(Places).filter(Places.id==id).first()
    if(placeToDelete is None):
        raise HTTPException(status_code=404, detail="Item not found")
    session.delete(placeToDelete)
    session.commit()
    return "place with id '" + str(id) + "' was deleted"

@placesRoutes.patch("/update/{id}",  tags=["Places"], response_model=str, description="Update a place", status_code=status.HTTP_200_OK)
async def updatePlace(id: int, data: UpdatePlace):
    placeToUpdate = session.query(Places).filter(Places.id==id).first()
    
    if(placeToUpdate is None):
        raise HTTPException(status_code=404, detail="Item not found")
    
    #Update all received values
    dictData = data.model_dump(exclude_unset=True) 
    for field, value in dictData.items():
        setattr(placeToUpdate, field, value)
    session.commit()
    return "place with id '" + str(id) + "' was updated"
