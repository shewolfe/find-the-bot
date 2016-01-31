"""Add edges table; Add tweet entity table; Tweak indices

Revision ID: 4b0e812d4942
Revises: 8a3ad7a5b53
Create Date: 2016-01-16 22:46:40.708320

"""

# revision identifiers, used by Alembic.
revision = '4b0e812d4942'
down_revision = '8a3ad7a5b53'

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.create_index('tweet_by_tweet_id_uniq', 'tweet', ['tweet_id'], unique=True)
    op.drop_index('tweet_by_tweet_id', table_name='tweet')

    op.create_table('tuser_tuser',
    sa.Column('id', sa.BigInteger(), nullable=False),
    sa.Column('from_user', sa.String(length=32), nullable=True),
    sa.Column('to_user', sa.String(length=32), nullable=True),
    sa.Column('weight', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tweet_entity',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('tweet_id', sa.BigInteger(), nullable=True),
    sa.Column('type', sa.Text(), nullable=True),
    sa.Column('text', sa.Text(), nullable=True),
    sa.ForeignKeyConstraint(['tweet_id'], ['tweet.tweet_id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index('tweetentity_by_tweet_id', 'tweet_entity', ['tweet_id'], unique=False)
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_index('tweet_by_tweet_id', table_name='tweet')
    op.create_index('tweet_by_tweet_id', 'tweet', ['tweet_id'], unique=False)
    op.drop_index('tweetentity_by_tweet_id', table_name='tweet_entity')
    op.drop_table('tweet_entity')
    op.drop_table('tuser_tuser')
    ### end Alembic commands ###