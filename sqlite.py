import sqlite3
import random

def random_index(list):
    index = random.randint(0, len(list)-1)
    return index


def commit_data(data=None):

    conn = sqlite3.connect('qna.db')

    c = conn.cursor()

    #Creates database (not used after creation)
    '''c.execute("""CREATE TABLE questions (
    question text,
    answer text
    )""")'''

    if data:
        c.execute("INSERT INTO questions VALUES (?,?)", [data["question"], data["answer"]])
        conn.commit()

    c.execute("SELECT * FROM questions")

    items = c.fetchall()
  


    return items


    
    conn.close()



