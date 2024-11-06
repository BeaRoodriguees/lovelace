from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy import ARRAY, Integer, Select, case, cast, func
from sqlalchemy.orm import Session

from lovelace.database import get_session
from lovelace.models import (
    Problem,
    ProblemStatus,
    Submission,
    SubmissionStatus,
    Tag,
    User,
)
from lovelace.schemas import (
    ProblemAndStatus,
    ProblemData,
    ProblemSchema,
    SubmissionSchema,
    TagSchema,
)
from lovelace.security import get_current_user

CurrentSession = Annotated[Session, Depends(get_session)]
CurrentUser = Annotated[User, Depends(get_current_user)]

ProblemList = list[ProblemAndStatus]
router = APIRouter(prefix='/problemset', tags=['problemset'])


def get_problem_status(query_result: bool | None) -> ProblemStatus:
    if query_result is None:
        return ProblemStatus.todo
    elif query_result is True:
        return ProblemStatus.correct
    else:
        return ProblemStatus.wrong


def get_problemset_with_status(session: Session, user_id: int) -> ProblemList:
    stmt = (
        Select(
            Problem,
            func.bool_or(Submission.status == SubmissionStatus.accepted),
        )
        .join(
            Submission,
            (Problem.id == Submission.problem_id)
            & (Submission.user_id == user_id),
            isouter=True,
        )
        .group_by(Problem.id)
    )
    query_result = session.execute(stmt).all()

    problemset = []
    for q in query_result:
        status = get_problem_status(q[1])
        problemset.append(
            ProblemAndStatus(
                problem=ProblemSchema.model_validate(q[0]),
                user_status=status,
            )
        )

    return problemset


def get_problem_data(
    session: Session, user_id: int, problem_id: int
) -> ProblemData:
    stmt = (
        Select(
            Problem,
            func.bool_or(Submission.status == SubmissionStatus.accepted),
            func.count(Submission.status),
            case(
                (
                    func.count(Submission.id) == 0,
                    cast([], ARRAY(Integer)),
                ),
                else_=func.array_agg(Submission.id),
            ),
        )
        .where(Problem.id == problem_id)
        .join(
            Submission,
            (Problem.id == Submission.problem_id)
            & (Submission.user_id == user_id),
            isouter=True,
        )
        .group_by(Problem.id)
    )

    # Pegar o problema, o status e os ids das submissões daquele usuário
    # para aquele problema.
    q = session.execute(stmt).first()

    status = get_problem_status(q[1])

    # Query paga pegar as submissões daquele usuário para aquele problema
    # Não é possível fazer isso em uma única query!
    submissions = session.scalars(
        Select(Submission).filter(Submission.id.in_(q[3]))
    )
    return ProblemData(
        problem=ProblemSchema.model_validate(q[0]),
        submissions=[SubmissionSchema.model_validate(s) for s in submissions],
        user_status=status,
    )


@router.get('/tags', response_model=list[TagSchema])
def get_tags(session: CurrentSession):
    return session.scalars(Select(Tag).order_by(Tag.name))


@router.get('/', response_model=ProblemList)
def get_problemset(session: CurrentSession, user: CurrentUser):
    return get_problemset_with_status(session, user.id)


@router.get('/{problem_id}', response_model=ProblemData)
def get_problem(problem_id: int, user: CurrentUser, session: CurrentSession):
    return get_problem_data(session, user.id, problem_id)


# post

# update

# delete
