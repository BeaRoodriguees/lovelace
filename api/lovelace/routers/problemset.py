from http import HTTPStatus
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from lovelace.database import get_session
from lovelace.models import Problem, Submission, User
from lovelace.schemas import (
    ProblemList,
    ProblemsAndSubmissions,
    ProblemSchema,
    SubmissionSchema,
    TestcaseSchema,
    UserList,
    UserSchema,
)
from lovelace.security import get_current_user, get_password_hash

Session = Annotated[Session, Depends(get_session)]
CurrentUser = Annotated[User, Depends(get_current_user)]


router = APIRouter(prefix='/problemset', tags=['problemset'])


# get_problems
@router.get('/', response_model=ProblemList)
def get_problemset(session: Session):
    problemset = session.scalars(select(Problem)).all()

    response_problemset = ProblemList(
        problems=[
            ProblemSchema.model_validate(problem) for problem in problemset
        ]
    )

    return response_problemset


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
