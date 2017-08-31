import psycopg2

try:
    connect_str = "dbname='csodata' user='postgres' host='localhost' "
    # use our connection values to establish a connection
    conn = psycopg2.connect(connect_str)
    # create a psycopg2 cursor that can execute queries
    cursor = conn.cursor()
    # run a SELECT statement - no data in there, but we can try it

    #cursor.execute("""SELECT current_database()""")
    cursor.execute("""SELECT table_name FROM information_schema.tables WHERE table_schema='public'""")
    cursor.execute("""select column_name, data_type, character_maximum_length from INFORMATION_SCHEMA.COLUMNS where table_name = 'graph';""")
    rows = cursor.fetchall()
    print(rows)
except Exception as e:
    print("Uh oh, can't connect. Invalid dbname, user or password?")
    print(e)
