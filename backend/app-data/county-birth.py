import os
import csv
import psycopg2
from collections import OrderedDict


class BirthEntry():
    def __init__(self, regiont):
        self.region = regiont
        self.gender = "both"
        self.all_births = OrderedDict()
        self.first_births = OrderedDict()
        self.births_wm = OrderedDict()
        self.births_om = OrderedDict()
        self.average_agem = OrderedDict()
        self.average_agefm = OrderedDict()

years = [
    "1985","1986","1987","1988","1989","1990","1991","1992","1993","1994","1995","1996","1997","1998",
    "1999","2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012",
    "2013","2014","2015","2016"
]

strregions = [
    "Dublin City",
    "Fingal",
    "Dun Laoghaire Rathdown",
    "South Dublin",
    "Carlow",
    "Kildare",
    "Kilkenny",
    "Laois",
    "Longford",
    "Louth",
    "Meath",
    "Offaly",
    "Westmeath",
    "Wexford",
    "Wicklow",
    "Clare",
    "Cork City",
    "Cork County",
    "Kerry",
    "Limerick City",
    "Limerick County",
    "North Tipperary",
    "South Tipperary",
    "Waterford City",
    "Waterford County",
    "Galway City",
    "Galway County",
    "Leitrim",
    "Mayo",
    "Roscommon",
    "Sligo",
    "Cavan",
    "Donegal",
    "Monaghan",
    "State"
]

__location__ = os.path.realpath(
    os.path.join(os.getcwd(), os.path.dirname(__file__)))

with open(os.path.join(__location__, 'county-birth.csv'), newline='') as csvfile:
        reader = csv.reader(csvfile, delimiter=' ', quotechar='|')
        entries = []
        currentEntry = False;
        genderTrig = 0
        count = 0
        for row in reader:
            genderTrig = 1


            if len(row) >= 1 and len(row) <= 3:
                for n in strregions:
                    if n in (" ".join(row)):
                        #print(row)
                        if currentEntry:
                            entries.append(currentEntry)
                        s = n
                        #print(s)
                        count += 1
                        currentEntry = BirthEntry(s)
                        break



            elif len(row) > 3:

                if "All Births (Number)" in (" ".join(row)):
                    numentry = []
                    entry = row[3][10:]
                    entry = entry.split(",")
                    for x in entry:
                        if x != "..":
                            numentry.append(int(x))
                        else:
                            numentry.append(0)
                    entry = OrderedDict(zip(years, numentry))
                    currentEntry.all_births = entry
                    

                elif "First Births (Number)" in (" ".join(row)):
                    numentry = []
                    entry = row[3][10:]
                    entry = entry.split(",")
                    for x in entry:
                        if x != "..":
                            numentry.append(int(x))
                        else:
                            numentry.append(0)
                    entry = OrderedDict(zip(years, numentry))
                    currentEntry.first_births = entry
                    

                elif "Births within Marriage (Number)" in (" ".join(row)):
                    numentry = []
                    entry = row[4][10:]
                    entry = entry.split(",")
                    for x in entry:
                        if x != "..":
                            numentry.append(int(x))
                        else:
                            numentry.append(0)
                    entry = OrderedDict(zip(years, numentry))
                    currentEntry.births_wm = entry
                    
                    

                elif "Births outside Marriage (Number)" in (" ".join(row)):
                    numentry = []
                    entry = row[4][10:]
                    entry = entry.split(",")
                    for x in entry:
                        if x != "..":
                            numentry.append(int(x))
                        else:
                            numentry.append(0)
                    entry = OrderedDict(zip(years, numentry))
                    currentEntry.births_om = entry

                

                elif "Average Age of Mother (Years)" in (" ".join(row)):
                    numentry = []
                    entry = row[5][9:]
                    entry = entry.split(",")
                    for x in entry:
                        if x != "..":
                            numentry.append(float(x))
                        else:
                            numentry.append(0)
                    entry = OrderedDict(zip(years, numentry))
                    currentEntry.average_agem = entry
                    
                    
                elif "Average Age of First Time Mother (Years)" in (" ".join(row)):
                    numentry = []
                    entry = row[7][9:]
                    entry = entry.split(",")
                    for x in entry:
                        if x != "..":
                            numentry.append(float(x))
                        else:
                            numentry.append(0)
                    entry = OrderedDict(zip(years, numentry))
                    currentEntry.average_agefm = entry
                    


        entries.append(currentEntry)


try:
    connect_str = "dbname='csodata' user='admin1' host='db' " +\
        "password='seismictoss613'"
    conn = psycopg2.connect(connect_str)
    cursor = conn.cursor()

    for a in entries:
        gender = a.gender
        region = a.region
        allBirths = a.all_births
        firstBirths = a.first_births
        birthsWM = a.births_wm
        birthsOM = a.births_om
        averageAM = a.average_agem
        averageAFM = a.average_agefm
        

        commandcreate = "INSERT INTO graph(region_name, graph_name, gender) values(%s, 'All Births (Number)', %s )"
        commandcreatevars = (region, gender)
        commandfind = "SELECT data_id FROM graph WHERE region_name=%s AND gender=%s AND graph_name='All Births (Number)'"
        cursor.execute(commandcreate, commandcreatevars)
        cursor.execute(commandfind, commandcreatevars)
        data_idVar = cursor.fetchone()

        for x, y in allBirths.items():
            commandPointVars = (x, y, data_idVar)
            commandPointCreate = "INSERT INTO data_point(x_value, y_value, data_id) values(%s, %s, %s)"
            cursor.execute(commandPointCreate, commandPointVars)

        
        conn.commit()

        #############################################################
        

        commandcreate = "INSERT INTO graph(region_name, graph_name, gender) values(%s, 'First Births (Number)', %s )"
        commandcreatevars = (region, gender)
        commandfind = "SELECT data_id FROM graph WHERE region_name=%s AND gender=%s AND graph_name='First Births (Number)'"
        cursor.execute(commandcreate, commandcreatevars)
        cursor.execute(commandfind, commandcreatevars)
        data_idVar = cursor.fetchone()

        for x, y in firstBirths.items():
            commandPointVars = (x, y, data_idVar)
            commandPointCreate = "INSERT INTO data_point(x_value, y_value, data_id) values(%s, %s, %s)"
            cursor.execute(commandPointCreate, commandPointVars)

        #############################################################

        commandcreate = "INSERT INTO graph(region_name, graph_name, gender) values(%s, 'Births within Marriage (Number)', %s )"
        commandcreatevars = (region, gender)
        commandfind = "SELECT data_id FROM graph WHERE region_name=%s AND gender=%s AND graph_name='Births within Marriage (Number)'"
        cursor.execute(commandcreate, commandcreatevars)
        cursor.execute(commandfind, commandcreatevars)
        data_idVar = cursor.fetchone()

        for x, y in birthsWM.items():
            commandPointVars = (x, y, data_idVar)
            commandPointCreate = "INSERT INTO data_point(x_value, y_value, data_id) values(%s, %s, %s)"
            cursor.execute(commandPointCreate, commandPointVars)
        
        #############################################################

        commandcreate = "INSERT INTO graph(region_name, graph_name, gender) values(%s, 'Births outside Marriage (Number)', %s )"
        commandcreatevars = (region, gender)
        commandfind = "SELECT data_id FROM graph WHERE region_name=%s AND gender=%s AND graph_name='Births outside Marriage (Number)'"
        cursor.execute(commandcreate, commandcreatevars)
        cursor.execute(commandfind, commandcreatevars)
        data_idVar = cursor.fetchone()

        for x, y in birthsOM.items():
            commandPointVars = (x, y, data_idVar)
            commandPointCreate = "INSERT INTO data_point(x_value, y_value, data_id) values(%s, %s, %s)"
            cursor.execute(commandPointCreate, commandPointVars)
        
        #############################################################

        commandcreate = "INSERT INTO graph(region_name, graph_name, gender) values(%s, 'Average Age of Mother (Years)', %s )"
        commandcreatevars = (region, gender)
        commandfind = "SELECT data_id FROM graph WHERE region_name=%s AND gender=%s AND graph_name='Average Age of Mother (Years)'"
        cursor.execute(commandcreate, commandcreatevars)
        cursor.execute(commandfind, commandcreatevars)
        data_idVar = cursor.fetchone()

        for x, y in averageAM.items():
            commandPointVars = (x, y, data_idVar)
            commandPointCreate = "INSERT INTO data_point(x_value, y_value, data_id) values(%s, %s, %s)"
            cursor.execute(commandPointCreate, commandPointVars)

        #############################################################

        commandcreate = "INSERT INTO graph(region_name, graph_name, gender) values(%s, 'Average Age of First Time Mother (Years)', %s )"
        commandcreatevars = (region, gender)
        commandfind = "SELECT data_id FROM graph WHERE region_name=%s AND gender=%s AND graph_name='Average Age of First Time Mother (Years)'"
        cursor.execute(commandcreate, commandcreatevars)
        cursor.execute(commandfind, commandcreatevars)
        data_idVar = cursor.fetchone()

        for x, y in averageAFM.items():
            commandPointVars = (x, y, data_idVar)
            commandPointCreate = "INSERT INTO data_point(x_value, y_value, data_id) values(%s, %s, %s)"
            cursor.execute(commandPointCreate, commandPointVars)
        
    print("Finished Loading Birth Data")
    
except Exception as e:
    print("Issues Connecting: Exception Thrown")
    print(e)




