import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

from src.models import *
from src.database.database import engine, create_tables

if __name__ == "__main__":
    try:
        print("Available tables before creation:", Base.metadata.tables.keys())
        create_tables()

        from sqlalchemy import inspect

        inspector = inspect(engine)
        tables = inspector.get_table_names()
        print("Created tables:", tables)

    except Exception as e:
        print(f"Error creating tables: {str(e)}")
