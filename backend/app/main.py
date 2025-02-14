import traceback

from contextlib import asynccontextmanager
from fastapi import Depends, FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from sqlmodel import Session, select
from starlette.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.db import get_session

from app.api.router import api_router

from app.models import (
    FruitTypeAssociation,
    FruitTypeEnum,
    FruitTypeRead,
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # on initializtion, do something
    yield

    # on end, clean up stuff here


app = FastAPI(title=settings.PROJECT_NAME, lifespan=lifespan)

app.include_router(api_router, prefix="/api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=settings.IS_ALLOWED_CREDENTIALS,
    allow_methods=settings.ALLOWED_METHODS,
    allow_headers=settings.ALLOWED_HEADERS,
)


@app.exception_handler(Exception)
async def global_expection_handler(request: Request, e: Exception):
    """In PROD show minimal information in failed responses"""
    if settings.ENVIRONMENT.is_prod:
        return JSONResponse(
            status_code=500, content={"message": "Internal server error"}
        )
    else:
        return JSONResponse(
            status_code=500,
            content={"message": str(e), "traceback": traceback.format_exc()},
        )


@app.get("/")
def read_root():
    return {"message": "Hello, World"}


@app.get("/info")
def read_info():
    return {"title": settings.PROJECT_NAME, "db-server": settings.POSTGRES_SERVER}


@app.get("/info/devil-fruit/types/enum/", tags=["Info"])
def get_info_devil_fruit_type():
    return {"info": list(FruitTypeEnum)}


@app.get("/info/devil-fruit/types/", response_model=list[FruitTypeRead], tags=["Info"])
def get_info_devil_fruit_types(*, session: Session = Depends(get_session)):
    fruit_types = session.exec(
        select(FruitTypeAssociation).distinct(FruitTypeAssociation.type)
    )

    if not fruit_types:
        raise HTTPException(status_code=404, detail="No types found")

    return fruit_types
