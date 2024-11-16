import json
from typing import Annotated

import pika
from fastapi import APIRouter, Depends
from sqlalchemy import ARRAY, Integer, case, cast, func, select
from sqlalchemy.orm import Session

from lovelace.database import get_session
from lovelace.models import Submission, User
from lovelace.schemas import CreateSubmissionSchema, SubmissionSchema
from lovelace.security import get_current_user

CurrentSession = Annotated[Session, Depends(get_session)]
CurrentUser = Annotated[User, Depends(get_current_user)]

router = APIRouter(prefix='/submission', tags=['submission'])

RABBITMQ_HOST = 'localhost'
QUEUE_NAME = 'submission_queue'

connection = pika.BlockingConnection(pika.URLParameters(RABBITMQ_HOST))
channel = connection.channel()
channel.queue_declare(queue=QUEUE_NAME)


@router.post('/', response_model=SubmissionSchema)
def send_submission(submission: CreateSubmissionSchema, session: Session):
    db_submission = Submission(
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
            delivery_mode=2,
        ),
    )
    connection.close()

    return db_submission
