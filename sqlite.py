import sqlite3
import random

unused_index = []
used_index= []

def random_index(list):
    for n in range(0, len(list)):
        if n not in used_index and n not in unused_index:
            unused_index.append(n)
        print(f"unsued index: {unused_index}")
    
    if len(unused_index) > 1: 
        index = random.randint(1, len(unused_index)-1)
        print(f'index: {index}')
        popped = unused_index.pop(index)
        used_index.append(popped)
        print(f"popped index: {used_index}")
        return(popped)
    else:
        print(f"out unsued index: {unused_index}")
        return 0

    
def restart():
    global unused_index
    global used_index
    unused_index = []
    used_index = []


def commit_data(data=None):

    conn = sqlite3.connect('qna.db')

    c = conn.cursor()

    #Creates database (not used after creation)
    '''c.execute("""CREATE TABLE questions (
    question text,
    answer text
    )""")'''

    if data:
        print(data)
        c.execute("INSERT INTO questions VALUES (?,?)", [data["question"], data["answer"]])
        conn.commit()

    if not data:
        c.execute("SELECT * FROM questions")
        items = c.fetchall()
        print(len(items))
        qna = items[random_index(items)]
        return qna

    conn.close()



