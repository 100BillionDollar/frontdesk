from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from db.database import get_db
from db.models import Visitor
from schemas.visitor import VisitorCreate, VisitorOut
from services import visitor_service

router = APIRouter(prefix="/visitors", tags=["visitors"])


@router.post("", response_model=VisitorOut, status_code=201)
def create_visitor(data: VisitorCreate, db: Session = Depends(get_db)) -> Visitor:  # noqa: B008
    return visitor_service.create_visitor(db, data)


@router.get("", response_model=list[VisitorOut])
def list_visitors(db: Session = Depends(get_db)) -> list[Visitor]:  # noqa: B008
    return visitor_service.list_visitors(db)
