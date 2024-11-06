from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy import Select, func, select
from sqlalchemy.orm import Session

from lovelace.database import get_session
from lovelace.models import (
    Problem,
    ProblemStatus,
    Submission,
    SubmissionStatus,
    User,
)
from lovelace.schemas import (
    ProblemList,
    ProblemsAndSubmissions,
    ProblemSchema,
    SubmissionSchema,
)
from lovelace.security import get_current_user

Session = Annotated[Session, Depends(get_session)]
CurrentUser = Annotated[User, Depends(get_current_user)]


router = APIRouter(prefix='/problemset', tags=['problemset'])


def get_problemset_with_user_status(session: Session, user_id: int):
    stmt = (
        Select(
            Problem,
            func.bool_or(Submission.status == SubmissionStatus.accepted)
        )
        .join(Submission,
                (Problem.id == Submission.problem_id)
                & (Submission.user_id == user_id),
                isouter=True)
        .group_by(Problem.id)
    )
    query_result = session.execute(stmt).all()

    problemset = []
    for q in query_result:
        if q[1] is None:
            status = ProblemStatus.todo
        elif q[1] is True:
            status = ProblemStatus.correct
        else:
            status = ProblemStatus.wrong

        problemset.append(
            (ProblemSchema.model_validate(q[0]), status)
        )
    return ProblemList(problems=problemset)


# get_problems
@router.get('/', response_model=ProblemList)
def get_problemset(session: Session, current_user: CurrentUser):
    return get_problemset_with_user_status(session, current_user.id)


# get_problem
@router.get('/{problem_id}', response_model=ProblemsAndSubmissions)
def get_problem(problem_id: int, current_user: CurrentUser, session: Session):
    problem = session.scalars(
        select(Problem).where(Problem.id == problem_id)
    ).first()
    submissions = session.scalars(
        select(Submission).where(
            Submission.problem_id == problem_id
            and Submission.user_id == current_user.id
        )
    )
    problems_and_submissions = ProblemsAndSubmissions(
        problem=ProblemSchema.model_validate(problem),
        submission=[
            SubmissionSchema.model_validate(submission)
            for submission in submissions
        ],
    )

    return problems_and_submissions


# post

# update

# delete
