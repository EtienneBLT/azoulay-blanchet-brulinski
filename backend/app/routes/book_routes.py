from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.db.session import get_db
from app.controllers.book_controller import create_book, get_books, get_book_by_id, update_book, delete_book
from app.schemas.book import BookCreate, BookUpdate, BookOut

router = APIRouter(
    prefix="/books",
    tags=["Books"]
)

# --- Créer un livre ---
@router.post("/", response_model=BookOut, status_code=status.HTTP_201_CREATED)
def create_book_endpoint(book: BookCreate, db: Session = Depends(get_db)):
    # Optionnel : Vérifier si l'ISBN existe déjà ici avant de créer
    return create_book(db, book)

# --- Récupérer tous les livres ---
@router.get("/", response_model=List[BookOut])
def get_books_endpoint(db: Session = Depends(get_db)):
    return get_books(db)

# --- Récupérer un livre par ID ---
@router.get("/{book_id}", response_model=BookOut)
def get_book_endpoint(book_id: int, db: Session = Depends(get_db)):
    db_book = get_book_by_id(db, book_id)
    if not db_book:
        raise HTTPException(status_code=404, detail="Livre non trouvé")
    return db_book

# --- Mettre à jour un livre ---
@router.put("/{book_id}", response_model=BookOut)
def update_book_endpoint(book_id: int, book: BookUpdate, db: Session = Depends(get_db)):
    db_book = update_book(db, book_id, book)
    if not db_book:
        raise HTTPException(status_code=404, detail="Livre non trouvé")
    return db_book

# --- Supprimer un livre ---
@router.delete("/{book_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_book_endpoint(book_id: int, db: Session = Depends(get_db)):
    success = delete_book(db, book_id)
    if not success:
        raise HTTPException(status_code=404, detail="Livre non trouvé")
    return None