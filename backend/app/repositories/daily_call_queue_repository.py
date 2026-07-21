from datetime import date

from sqlalchemy.orm import Session
from sqlalchemy.orm import joinedload

from app.models.daily_call_queue import DailyCallQueue
from app.models.lead_assignment import LeadAssignment
from app.models.business import Business


class DailyCallQueueRepository:

    def __init__(self, db: Session):
        self.db = db

    def create(
        self,
        queue: DailyCallQueue,
    ):

        self.db.add(queue)

        self.db.commit()

        self.db.refresh(queue)

        return queue

    def bulk_create(
        self,
        queues: list[DailyCallQueue],
    ):

        self.db.add_all(queues)

        self.db.commit()

    def get_employee_queue(
    self,
    employee_id: int
    ):

        return (

            self.db.query(DailyCallQueue)

            .filter(

                DailyCallQueue.employee_id == employee_id,

                DailyCallQueue.queue_date == date.today(),

                DailyCallQueue.status == "PENDING"

            )

            .order_by(
                DailyCallQueue.queue_order
            )

            .all()

        )

    def queue_exists(
    self,
    employee_id: int
    ):

        return (

            self.db.query(DailyCallQueue)

            .filter(

                DailyCallQueue.employee_id == employee_id,

                DailyCallQueue.queue_date == date.today(),

                DailyCallQueue.status == "PENDING"

            )

            .first()

            is not None

        )

    def delete_employee_queue(
    self,
    employee_id: int
    ):

        self.db.query(DailyCallQueue).filter(

            DailyCallQueue.employee_id == employee_id,

            DailyCallQueue.queue_date == date.today()

        ).delete()

        self.db.commit()

    
    def mark_completed(
    self,
    queue_id: int,
    ):
        queue = (
            self.db.query(DailyCallQueue)
            .filter(
                DailyCallQueue.id == queue_id
            )
            .first()
        )

        if queue:
            queue.status = "COMPLETED"

            self.db.commit()

            self.db.refresh(queue)

        return queue