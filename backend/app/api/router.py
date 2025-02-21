from fastapi import APIRouter

from app.api.endpoints import devil_fruits, users

api_router = APIRouter()

api_router.include_router(
    devil_fruits.router, prefix="/devil-fruits", tags=["Devil Fruits"]
)
api_router.include_router(users.router, prefix="/users", tags=["Users"])
