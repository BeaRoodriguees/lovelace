from pathlib import Path

import tomllib
from sqlalchemy.orm import Session

from lovelace.database import engine
from lovelace.models import (
    Difficulty,
    Problem,
    Role,
    Submission,
    SubmissionStatus,
    Tag,
    TestCase,
    User,
)
from lovelace.security import get_password_hash


def get_users():
    users = []
    with open('scripts/data/users.toml', 'rb') as file:
        data = tomllib.load(file)
        for user in data['users']:
            if user['email'] == 'super@admin.com':
                user['password'] = get_password_hash('Admin123')
            else:
                user['password'] = get_password_hash(user['password'])
            user['role'] = Role(user['role'])
            users.append(User(**user))

    return users


def get_and_add_problems(session):
    folder = Path('scripts/data/problems')
    problems = []

    # Get problems from file
    for filename in folder.iterdir():
        if filename.suffix == '.toml':
            with open(folder / filename.name, 'rb') as data:
                problem = tomllib.load(data)
                problem['difficulty'] = Difficulty(problem['difficulty'])
                problem['testcases'] = [
                    TestCase(**testcase) for testcase in problem['testcases']
                ]
                problem['tags'] = [Tag(**tag) for tag in problem['tags']]

                author_id = (
                    session.query(User.id)
                    .filter(User.username == problem['username'])
                    .first()[0]
                )
                problem.pop('username')

                problems.append(Problem(**problem, author_id=author_id))

    # Add tags from problems
    existing_tags = set([tag.name for tag in session.query(Tag).all()])
    inserting_tags = []
    for problem in problems:
        inserting_tags.extend([tag.name for tag in problem.tags])

    tags = set(inserting_tags) - existing_tags

    session.add_all([Tag(name=tag) for tag in tags])

    # Pull problem tags fro mdatabase and add them to the problem
    for i, problem in enumerate(problems):
        tags_names = [tag.name for tag in problem.tags]
        problems[i].tags = (
            session.query(Tag).filter(Tag.name.in_(tags_names)).all()
        )

    session.add_all(problems)


def get_and_add_submissions(session):
    if (
        session.query(Problem).count() == 0
        and session.query(User).count() == 0
    ):
        return

    submissions = []
    with open('scripts/data/submissions.toml', 'rb') as file:
        data = tomllib.load(file)
        for submission in data['submissions']:
            submission['status'] = SubmissionStatus(submission['status'])
            problem_id = (
                session.query(Problem.id)
                .filter(Problem.name == submission['problem_name'])
                .first()[0]
            )
            submission.pop('problem_name')
            user_id = (
                session.query(User.id)
                .filter(User.username == submission['username'])
                .first()[0]
            )
            submission.pop('username')
            submission_model = Submission(
                **submission, problem_id=problem_id, user_id=user_id
            )
            submissions.append(submission_model)

    session.add_all(submissions)


def is_populated():
    with Session(engine) as session:
        return session.query(Problem).count() > 0


def populate():
    with Session(engine) as session:
        # Add all users
        session.add_all(get_users())

        # Add all problems
        get_and_add_problems(session)

        # Add all submissions
        get_and_add_submissions(session)

        session.commit()


if __name__ == '__main__':
    if is_populated():
        print('Database is already populated.')
    else:
        print('Populating development database with mock entries...')
        populate()
        print('Populating process finished.')
