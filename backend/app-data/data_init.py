import os
import csv
import psycopg2
from collections import OrderedDict

population = False
births = False
deaths = False
crime = False

try:
    connect_str = "dbname='csodata' user='admin1' host='db' " +\
        "password='seismictoss613'"
    conn = psycopg2.connect(connect_str)
    cur = conn.cursor()

    cur.execute("SELECT data_id FROM graph WHERE graph_name='All Births (Number)'")
    data = cur.fetchall()
    if not data:
        births = True
    else:
        births = False

    cur.execute("SELECT data_id FROM graph WHERE graph_name='All Births (Number)'")
    data = cur.fetchall()
    if not data:
        births = True
    else:
        births = False

    cur.execute("SELECT data_id FROM graph WHERE graph_name='Deaths (Number)'")
    data = cur.fetchall()
    if not data:
        deaths = True
    else:
        deaths = False

    cur.execute("SELECT data_id FROM graph WHERE graph_name='Population (Number)'")
    data = cur.fetchall()
    if not data:
        population = True
    else:
        population = False

    cur.execute("SELECT data_id FROM graph WHERE graph_name='01 ,Homicide offences'")
    data = cur.fetchall()
    if not data:
        crime = True
    else:
        crime = False

except Exception as e:
    print("Issues Connecting: Exception Thrown")
    print(e)


__location__ = os.path.realpath(
    os.path.join(os.getcwd(), os.path.dirname(__file__)))

if population == True:
    with open(os.path.join(__location__, 'county-birth.py')) as source_file:
        exec(source_file.read())

if births == True:
    with open(os.path.join(__location__, 'county-population-mfb.py')) as source_file:
        exec(source_file.read())


if deaths == True:
    with open(os.path.join(__location__, 'ireland-death.py')) as source_file:
        exec(source_file.read())

if crime == True:
    with open(os.path.join(__location__, 'garda-region-crime.py')) as source_file:
        exec(source_file.read())

