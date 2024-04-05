from fastapi import APIRouter

from app.configDB import session
from app.places.placesModels import Places
from app.places.placesSchemas import CreatePlace

seedsRoutes = APIRouter(prefix="/seeds")

@seedsRoutes.get("/places", tags=["Seeds"], response_model=str, description="Delete all data in the table 'Places' and adds 12 records of test data")
async def getPlaces():
    ##Delete all rows
    session.query(Places).delete()
    ##Add test data rows
    for i in range(12):
        rPlace = randomPlaces[i]        
        newPlace = Places()  
        newPlace.name = rPlace.name
        newPlace.city = rPlace.city
        newPlace.country = rPlace.country
        newPlace.foodType = rPlace.foodType
        newPlace.rating = rPlace.rating
        newPlace.visited = rPlace.visited
        session.add(newPlace)
    session.commit()
    session.close()
    return "Seed completed"



## TODO: Learn how to use faker to random generation
# https://faker.readthedocs.io/en/master/
randomPlaces = [
    CreatePlace(name="The Grand Hotel", city="Amsterdam", country="Netherlands", foodType="Mariscos", rating=4, visited=True),
    CreatePlace(name="Golden Gate Park", city="San Francisco", country="USA", foodType="Tradicional", rating=5, visited=True),
    CreatePlace(name="Sydney Opera House", city="Sydney", country="Australia", foodType="Helados", rating=4, visited=True),
    CreatePlace(name="The Louvre", city="Paris", country="France", foodType="Sandwiches", rating=5, visited=True),
    CreatePlace(name="Machu Picchu", city=None, country="Peru", foodType="Frituras", rating=None, visited=False),
    CreatePlace(name="Great Wall of China", city=None, country="China", foodType="Pizza", rating=5, visited=True),
    CreatePlace(name="Taj Mahal", city=None, country="India", foodType="Pizza", rating=5, visited=True),
    CreatePlace(name="Great Barrier Reef", city=None, country="Australia", foodType="Mariscos", rating=None, visited=False),
    CreatePlace(name="Petra", city=None, country="Jordan", foodType="Sushi", rating=4, visited=False),
    CreatePlace(name="Santorini", city=None, country="Greece", foodType="Mediterranea", rating=None, visited=False),
    CreatePlace(name="Yellowstone National Park", city="Wyoming", country="USA", foodType="Ternedor libre", rating=5, visited=True),
    CreatePlace(name="Dubai Marina", city="Dubai", country="UAE", foodType="Mariscos", rating=4, visited=True)
]