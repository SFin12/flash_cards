import sqlite3
import random

unused_index = []
used_index= []
current_category = ""

def random_index(list):
    for n in range(0, len(list)):
        if n not in used_index and n not in unused_index:
            unused_index.append(n)
    
    if len(unused_index) > 1: 
        index = random.randint(1, len(unused_index)-1)
        popped = unused_index.pop(index)
        used_index.append(popped)
        return(popped)
    else:
        return 0

    
def restart():
    global unused_index
    global used_index
    unused_index = []
    used_index = []


def commit_data(data=None):
    global current_category
    categories = ["bible", "entertainment", "history", "math", "other", "science", "sports"]
    conn = sqlite3.connect('qna.db')

    """--------------------------------------"""
    """Possible Ideas on refactoring database"""
    """--------------------------------------"""
    #Id, Category, Question, Answer
    
    #Categories
    #CategoryId, CategoryName

    #QuestionAnswer
    #Id, CategoryId, Question, Answer

    #View
    #CategoryId, CantegoryName, QQuestion,Answer


    c = conn.cursor()

    #Creates database (not used after creation)
    for cat in categories:
        c.execute(f"""CREATE TABLE IF NOT EXISTS {cat} (question text,answer text)""")


    if data in categories:
        current_category = data
    elif data:
        c.execute(f"INSERT INTO {data['table']} VALUES (?,?)", [data["question"], data["answer"]])
        conn.commit()

    if not data:
        c.execute(f"SELECT * FROM {current_category}")
        items = c.fetchall()
        qna = items[random_index(items)] #primary row key
        return qna

    conn.close()



