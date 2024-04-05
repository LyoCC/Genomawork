from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.places.placesRoutes import placesRoutes
from app.seeds.seedsRoutes import seedsRoutes


app = FastAPI()
app.include_router(placesRoutes)
app.include_router(seedsRoutes)

origin = [
    '*'
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origin,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
    )
    