from sqlalchemy import Column, Integer, String
from app.db.base import Base

class Book(Base):
    __tablename__ = "livres"

    id_livre = Column(Integer, primary_key=True, index=True)
    titre = Column(String(255), nullable=False)
    auteur = Column(String(255), nullable=False)
    isbn = Column(String(13), unique=True, index=True)
    editeur = Column(String(100))
    annee_publication = Column(Integer)
    categorie = Column(String(100))