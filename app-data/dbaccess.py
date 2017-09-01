import psycopg2

try:
    connect_str = "dbname='csodata' user='postgres' host='localhost' "
    # use our connection values to establish a connection
    conn = psycopg2.connect(connect_str)
    # create a psycopg2 cursor that can execute queries
    cursor = conn.cursor()
    # run a SELECT statement - no data in there, but we can try it

    #cursor.execute("""SELECT current_database()""")
    cursor.execute("""select * from graph""")

    rows = cursor.fetchall()
    cursor.execute("""select * from data_point""")

    rows = cursor.fetchall()


    print(rows)
except Exception as e:
    print("Uh oh, can't connect. Invalid dbname, user or password?")
    print(e)
