from fastapi import FastAPI
from app.places.placesRoutes import placesRoutes
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.include_router(placesRoutes)

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
