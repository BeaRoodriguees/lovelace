from sqlalchemy import select
from sqlalchemy.orm import Session

from lovelace.database import engine
from lovelace.models import (
    Difficulty,
    Problem,
    Submission,
    Tag,
    TestCase,
)


def main():
    with Session(engine) as session:
        problem = Problem(
            name='Em busca do ouro branco 3',
            description='Vc vai em busca do outro branco po, quer que eu diga o que mais?',
            problem_input='raaaapppppaiz',
            problem_output='iihh rapaiz',
            difficulty=Difficulty.hard,
            time_limit=1204,
            memory_limit=45754,
            testcases=[
                TestCase(
                    input='12342323',
                    output='7854555555555',
                    is_sample=True,
                ),
                TestCase(
                    input='45454',
                    output='74585',
                    is_sample=True,
                ),
            ],
            tags=[Tag('opa'), Tag('Rapaizz')],
        )

        print(problem)
        session.add(problem)
        session.commit()
        session.refresh(problem)
        print(problem)
        print(problem.id)
        problem2 = session.scalar(
            select(Problem).where((Problem.id == problem.id))
        )

        print(problem2)


if __name__ == '__main__':
    main()
