from pydantic import BaseModel
from typing import Optional

# Champs communs de base
class BookBase(BaseModel):
    titre: str
    auteur: str
    isbn: Optional[str] = None
    editeur: Optional[str] = None
    annee_publication: Optional[int] = None
    categorie: Optional[str] = None

# Schéma pour la CRÉATION (on force les champs obligatoires s'il y en a d'autres, ici c'est pareil que Base)
class BookCreate(BookBase):
    pass

# Schéma pour la MISE À JOUR (tous les champs sont optionnels)
class BookUpdate(BaseModel):
    titre: Optional[str] = None
    auteur: Optional[str] = None
    isbn: Optional[str] = None
    editeur: Optional[str] = None
    annee_publication: Optional[int] = None
    categorie: Optional[str] = None

# Schéma pour la RÉPONSE (ce que l'API renvoie, incluant l'ID)
class BookOut(BookBase):
    id_livre: int

    class Config:
        from_attributes = True