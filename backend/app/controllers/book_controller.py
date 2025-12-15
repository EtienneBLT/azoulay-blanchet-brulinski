from sqlalchemy.orm import Session
from app.models.book import Book
from app.schemas.book import BookCreate, BookUpdate

# --- Création d'un livre ---
def create_book(db: Session, book_data: BookCreate) -> Book:
    db_book = Book(
        titre=book_data.titre,
        auteur=book_data.auteur,
        isbn=book_data.isbn,
        editeur=book_data.editeur,
        annee_publication=book_data.annee_publication,
        categorie=book_data.categorie
    )
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book

# --- Récupération de tous les livres ---
def get_books(db: Session) -> list[Book]:
    return db.query(Book).all()

# --- Récupération d'un livre par ID ---
def get_book_by_id(db: Session, book_id: int) -> Book | None:
    return db.query(Book).filter(Book.id_livre == book_id).first()

# --- Mise à jour d'un livre ---
def update_book(db: Session, book_id: int, book_data: BookUpdate) -> Book | None:
    db_book = get_book_by_id(db, book_id)
    if not db_book:
        return None

    # On ne met à jour que les champs fournis (exclude_unset=True)
    for field, value in book_data.dict(exclude_unset=True).items():
        setattr(db_book, field, value)

    db.commit()
    db.refresh(db_book)
    return db_book

# --- Suppression d'un livre ---
def delete_book(db: Session, book_id: int) -> bool:
    db_book = get_book_by_id(db, book_id)
    if not db_book:
        return False
    db.delete(db_book)
    db.commit()
    return True