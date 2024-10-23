"""create mpv models

Revision ID: f66224a3166a
Revises: 7d826a538293
Create Date: 2024-10-23 18:00:20.592259

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'f66224a3166a'
down_revision: Union[str, None] = '7d826a538293'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('problems',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.Column('problem_input', sa.String(), nullable=False),
    sa.Column('problem_output', sa.String(), nullable=False),
    sa.Column('difficulty', sa.Enum('very_hard', 'hard', 'medium', 'easy', 'very_easy', name='difficulty'), nullable=False),
    sa.Column('status', sa.Enum('todo', 'correct', 'wrong', name='problemstatus'), server_default='todo', nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('problems_tags',
    sa.Column('problem_id', sa.Integer(), nullable=False),
    sa.Column('tag_id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('problem_id', 'tag_id')
    )
    op.create_table('tags',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('submissions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('problem_id', sa.Integer(), nullable=False),
    sa.Column('body', sa.String(), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
    sa.Column('language', sa.String(), nullable=False),
    sa.Column('status', sa.Enum('wrong_answer', 'accepted', 'compilation_error', 'runtime_error', 'time_limit_exceeded', 'presentation_error', 'pending', 'testing', 'memory_limit_exceeded', 'server_error', name='submissonstatus'), nullable=False),
    sa.ForeignKeyConstraint(['problem_id'], ['problems.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('submissions')
    op.drop_table('tags')
    op.drop_table('problems_tags')
    op.drop_table('problems')
    # ### end Alembic commands ###
