from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import des routes
from app.routes import user_routes

app = FastAPI(title="API Bibliothèque")

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Liste des origines autorisées
    allow_credentials=True, # Autoriser les cookies et les en-têtes d'autorisation
    allow_methods=["*"],    # Autoriser toutes les méthodes (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],    # Autoriser tous les en-têtes
)

# Inclusion des routes utilisateurs
app.include_router(user_routes.router)

# Route racine
@app.get("/")
async def root():
    return {"message": "Bienvenue sur l'API Bibliothèque"}
