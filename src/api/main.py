from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.api.upload import router as upload_router
from src.api.routers.cv_router import router as cv_router
from src.api.routers.jd_router import router as jd_router

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add upload router
app.include_router(upload_router)

# Add cv router
app.include_router(cv_router)

# Add jd router
app.include_router(jd_router)
