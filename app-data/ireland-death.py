import csv
import psycopg2
from collections import OrderedDict


class DeathEntry():
    def __init__(self):
        self.region = "state"
        self.years = ["1989", "1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999",
                      "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010",
                      "2011", "2012", "2013", "2014", "2015", "2016"]
        self.strdeaths = "32111,31370,31305,30931,32148,30948,32259,31723,31581,31563,32608,31391,30212,29683,29074,28665,28260,28488,28117,28274,28380,27961,28456,29186,29504,29252,29952,30390"
        self.strmaledeaths = "17058,16828,16603,16516,17035,16338,17075,16672,16501,16553,16961,16192,15691,15390,14882,14801,14412,14605,14391,14457,14727,14334,14492,14945,14958,14897,15150,15499"
        self.strfemaledeaths = "15053,14542,14702,14415,15113,14610,15184,15051,15080,15010,15647,15199,14521,14293,14192,13864,13848,13883,13726,13817,13653,13627,13964,14241,14546,14355,14802,14891"
        self.deaths = self.strdeaths.split(",")
        self.maledeaths = self.strmaledeaths.split(",")
        self.femaledeaths = self.strfemaledeaths.split(",")
        self.numdeaths = []
        self.nummaledeaths = []
        self.numfemaledeaths = []
        for x in self.deaths:
            if x != "..":
                self.numdeaths.append(int(x))
            else:
                self.numdeaths.append(0)
        for x in self.maledeaths:
            if x != "..":
                self.nummaledeaths.append(int(x))
            else:
                self.nummaledeaths.append(0)
        for x in self.femaledeaths:
            if x != "..":
                self.numfemaledeaths.append(int(x))
            else:
                self.numfemaledeaths.append(0)
        self.oddeaths = OrderedDict(zip(self.years, self.numdeaths))
        self.odmaledeaths = OrderedDict(zip(self.years, self.nummaledeaths))
        self.odfemaledeaths = OrderedDict(zip(self.years, self.numfemaledeaths))

deathentry = DeathEntry()


try:
    connect_str = "dbname='csodata' user='admin1' host='localhost' " +\
        "password='seismictoss613'"
    conn = psycopg2.connect(connect_str)
    cursor = conn.cursor()

    commandcreate = "INSERT INTO graph(region_name, graph_name, gender) values( 'State' , 'Deaths (Number)', 'female' )"
    commandfind = "SELECT data_id FROM graph WHERE region_name='State' AND gender='female' AND graph_name='Deaths (Number)'"
    cursor.execute(commandcreate)
    cursor.execute(commandfind)
    data_idVar = cursor.fetchone()

    for x, y in deathentry.odfemaledeaths.items():
        commandPointVars = (x, y, data_idVar)
        commandPointCreate = "INSERT INTO data_point(x_value, y_value, data_id) values(%s, %s, %s)"
        cursor.execute(commandPointCreate, commandPointVars)

    conn.commit()

    print("Finished Loading Crime Data")
    
except Exception as e:
    print("Issues Connecting: Exception Thrown")
    print(e)

