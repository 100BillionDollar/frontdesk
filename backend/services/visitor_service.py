from db.models import Visitor
from schemas.visitor import VisitorCreate
from sqlalchemy import select
from sqlalchemy.orm import Session


def create_visitor(db: Session, data: VisitorCreate) -> Visitor:
    visitor = Visitor(**data.model_dump())
    db.add(visitor)
    db.commit()
    db.refresh(visitor)
    return visitor


def list_visitors(db: Session) -> list[Visitor]:
    return list(db.scalars(select(Visitor).order_by(Visitor.id.desc())))
