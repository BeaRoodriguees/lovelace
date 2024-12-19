import json
from typing import Annotated

import pika
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from lovelace.database import get_session
from lovelace.models import Submission, User
from lovelace.schemas import CreateSubmissionSchema, SubmissionSchema
from lovelace.security import get_current_user

CurrentSession = Annotated[Session, Depends(get_session)]
CurrentUser = Annotated[User, Depends(get_current_user)]

router = APIRouter(prefix='/submission', tags=['submission'])

RABBITMQ_HOST = 'rabbitmq'
QUEUE_NAME = 'submission_queue'


@router.post('/', response_model=SubmissionSchema)
def send_submission(submission: CreateSubmissionSchema, session: CurrentSession, user: CurrentUser):
    connection = pika.BlockingConnection(pika.ConnectionParameters(host=RABBITMQ_HOST))
    channel = connection.channel()
    channel.queue_declare(queue=QUEUE_NAME,
                          auto_delete=False,
                          durable=True)

    db_submission = Submission(
        user_id= user.id,
        problem_id=submission.problem_id,
        body=submission.body,
        language=submission.language,
    )

    session.add(db_submission)
    session.commit()
    session.refresh(db_submission)

    submission_id = db_submission.id

    channel.basic_publish(
        exchange='',
        routing_key=QUEUE_NAME,
        body=json.dumps({'submission_id': submission_id}),
        properties=pika.BasicProperties(
            delivery_mode=pika.DeliveryMode.Persistent
        )
    )

    channel.close()
    return db_submission
