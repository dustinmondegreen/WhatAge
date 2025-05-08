import sqlite3

conn = sqlite3.connect('user.db')

cursor = conn.cursor()

cursor.execute('''
CREATE TABLE IF NOT EXISTS users (
    UserID INTEGER PRIMARY KEY AUTOINCREMENT,
    UserName TEXT,
    UserEmail TEXT,
    UserPassword TEXT
)
''')

conn.commit()
conn.close()