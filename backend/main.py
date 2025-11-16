


# uvicorn main:app
# uvicorn main:app --reload

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
# from decouple import config

# Custom function imports
# ...

# Initiate App
app = FastAPI()

# CORS - Origins (frontend dev servers)
origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:4173",
    "http://localhost:3000",
]

# CORS Middleware: allow frontend dev servers to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Root endpoint
@app.get("/")
async def root():
    return {"message": "FastAPI + React Template running!"}

# Health check endpoint
@app.get("/health")
async def check_health():
    return {"response": "healthy"}