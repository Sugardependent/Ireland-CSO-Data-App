import csv
import psycopg2
from collections import OrderedDict


def trunc_at(s, d, n=4):
    return d.join(s.split(d, n)[n:])


class CrimeEntry():
    def __init__(self, regiont):
        self.region = regiont
        self.gender = "both"

        self.graphdatasets = {
            "01 ,Homicide offences": OrderedDict(),
            "0111 ,Murder": OrderedDict(),
            "0112 ,Manslaughter": OrderedDict(),
            "0113 ,Infanticide": OrderedDict(),
            "012 ,Dangerous driving leading to death": OrderedDict(),
            "02 ,Sexual offences": OrderedDict(),
            "021 ,Rape and sexual assault": OrderedDict(),
            "022 ,Other sexual offences": OrderedDict(),
            "03 ,Attempts/threats to murder, assaults, harassments and related offences": OrderedDict(),
            "0311 ,Murder-attempt": OrderedDict(),
            "0312 ,Murder-threat": OrderedDict(),
            "033 ,Harassment and related offences": OrderedDict(),
            "034 ,Assault causing harm, poisoning": OrderedDict(),
            "035 ,Other assault": OrderedDict(),
            "04 ,Dangerous or negligent acts": OrderedDict(),
            "0411 ,Dangerous driving causing serious bodily harm": OrderedDict(),
            "0412 ,Driving/in charge of a vehicle while over legal alcohol limit": OrderedDict(),
            "0413 ,Driving/in charge of a vehicle under the influence of drugs": OrderedDict(),
            "0421 ,Endangerment with potential for serious harm/death": OrderedDict(),
            "0422 ,Abandoning a child, child neglect and cruelty": OrderedDict(),
            "0423 ,Unseaworthy/dangerous use of boat or ship": OrderedDict(),
            "0424 ,False alarm/interference with aircraft or air transport facilities": OrderedDict(),
            "0425 ,Endangering traffic offences": OrderedDict(),
            "05 ,Kidnapping and related offences": OrderedDict(),
            "0511 ,False imprisonment": OrderedDict(),
            "0512 ,Abduction of person under 16 years of age": OrderedDict(),
            "0513 ,Human trafficking offences": OrderedDict(),
            "06 ,Robbery, extortion and hijacking offences": OrderedDict(),
            "0611 ,Robbery of an establishment or institution": OrderedDict(),
            "0612 ,Robbery of cash or goods in transit": OrderedDict(),
            "0613 ,Robbery from the person": OrderedDict(),
            "0621 ,Blackmail or extortion": OrderedDict(),
            "0631 ,Carjacking, hijacking/unlawful seizure of aircraft/vessel": OrderedDict(),
            "07 ,Burglary and related offences": OrderedDict(),
            "0711 ,Aggravated burglary": OrderedDict(),
            "0712 ,Burglary (not aggravated)": OrderedDict(),
            "0713 ,Possession of an article (with intent to burgle, steal, demand)": OrderedDict(),
            "08 ,Theft and related offences": OrderedDict(),
            "081 ,Theft/taking of vehicle and related offences": OrderedDict(),
            "0821 ,Theft from person": OrderedDict(),
            "0822 ,Theft from shop": OrderedDict(),
            "084 ,Other thefts, handling stolen property": OrderedDict(),
            "09 ,Fraud, deception and related offences": OrderedDict(),
            "10 ,Controlled drug offences": OrderedDict(),
            "1011 ,Importation of drugs": OrderedDict(),
            "1012 ,Cultivation or manufacture of drugs": OrderedDict(),
            "1021 ,Possession of drugs for sale or supply": OrderedDict(),
            "1022 ,Possession of drugs for personal use": OrderedDict(),
            "103 ,Other drug offences": OrderedDict(),
            "11 ,Weapons and Explosives Offences": OrderedDict(),
            "111 ,Explosives, chemical weapons offences": OrderedDict(),
            "1121 ,Discharging a firearm": OrderedDict(),
            "1122 ,Possession of a firearm": OrderedDict(),
            "113 ,Offensive weapons offences (n.e.c.)": OrderedDict(),
            "114 ,Fireworks offences": OrderedDict(),
            "12 ,Damage to property and to the environment": OrderedDict(),
            "1211 ,Arson": OrderedDict(),
            "1212 ,Criminal damage (not arson)": OrderedDict(),
            "1221 ,Litter offences": OrderedDict(),
            "13 ,Public order and other social code offences": OrderedDict(),
            "131 ,Disorderly conduct": OrderedDict(),
            "132 ,Trespass offences": OrderedDict(),
            "133 ,Liquor licensing offences": OrderedDict(),
            "134 ,Prostitution offences": OrderedDict(),
            "135 ,Regulated betting/money, collection/trading offences": OrderedDict(),
            "136 ,Social code offences (n.e.c.)": OrderedDict(),
            "15 ,Offences against government, justice procedures and organisation of crime": OrderedDict(),
            "151 ,Offences against government and its agents": OrderedDict(),
            "152 ,Organisation of crime and conspiracy to commit crime": OrderedDict(),
            "153 ,Perverting the course of justice": OrderedDict(),
            "157 ,Offences while in custody, breach of court orders": OrderedDict()
        }

    def setGraph(self):
        graphProps = {
            1: self.all_weapons,
            2: self.weapons_explosives
        }
        return graphProps.get(1, "Nope")


years = [
    "2003Q1", "2003Q2", "2003Q3", "2003Q4", "2004Q1", "2004Q2", "2004Q3", "2004Q4",
    "2005Q1", "2005Q2", "2005Q3", "2005Q4", "2006Q1", "2006Q2", "2006Q3", "2006Q4",
    "2007Q1", "2007Q2", "2007Q3", "2007Q4", "2008Q1", "2008Q2", "2008Q3", "2008Q4",
    "2009Q1", "2009Q2", "2009Q3", "2009Q4", "2010Q1", "2010Q2", "2010Q3", "2010Q4",
    "2011Q1", "2011Q2", "2011Q3", "2011Q4", "2012Q1", "2012Q2", "2012Q3", "2012Q4",
    "2013Q1", "2013Q2", "2013Q3", "2013Q4", "2014Q1", "2014Q2", "2014Q3", "2014Q4",
    "2015Q1", "2015Q2", "2015Q3", "2015Q4", "2016Q1", "2016Q2", "2016Q3", "2016Q4"
]

strgraphs = [
    "01 ,Homicide offences",
    "0111 ,Murder",
    "0112 ,Manslaughter",
    "0113 ,Infanticide",
    "012 ,Dangerous driving leading to death",
    "02 ,Sexual offences",
    "021 ,Rape and sexual assault",
    "022 ,Other sexual offences",
    "03 ,Attempts/threats to murder, assaults, harassments and related offences",
    "0311 ,Murder-attempt",
    "0312 ,Murder-threat",
    "033 ,Harassment and related offences",
    "034 ,Assault causing harm, poisoning",
    "035 ,Other assault",
    "04 ,Dangerous or negligent acts",
    "0411 ,Dangerous driving causing serious bodily harm",
    "0412 ,Driving/in charge of a vehicle while over legal alcohol limit",
    "0413 ,Driving/in charge of a vehicle under the influence of drugs",
    "0421 ,Endangerment with potential for serious harm/death",
    "0422 ,Abandoning a child, child neglect and cruelty",
    "0423 ,Unseaworthy/dangerous use of boat or ship",
    "0424 ,False alarm/interference with aircraft or air transport facilities",
    "0425 ,Endangering traffic offences",
    "05 ,Kidnapping and related offences",
    "0511 ,False imprisonment",
    "0512 ,Abduction of person under 16 years of age",
    "0513 ,Human trafficking offences",
    "06 ,Robbery, extortion and hijacking offences",
    "0611 ,Robbery of an establishment or institution",
    "0612 ,Robbery of cash or goods in transit",
    "0613 ,Robbery from the person",
    "0621 ,Blackmail or extortion",
    "0631 ,Carjacking, hijacking/unlawful seizure of aircraft/vessel",
    "07 ,Burglary and related offences",
    "0711 ,Aggravated burglary",
    "0712 ,Burglary (not aggravated)",
    "0713 ,Possession of an article (with intent to burgle, steal, demand)",
    "08 ,Theft and related offences",
    "081 ,Theft/taking of vehicle and related offences",
    "0821 ,Theft from person",
    "0822 ,Theft from shop",
    "084 ,Other thefts, handling stolen property",
    "09 ,Fraud, deception and related offences",
    "10 ,Controlled drug offences",
    "1011 ,Importation of drugs",
    "1012 ,Cultivation or manufacture of drugs",
    "1021 ,Possession of drugs for sale or supply",
    "1022 ,Possession of drugs for personal use",
    "103 ,Other drug offences",
    "11 ,Weapons and Explosives Offences",
    "111 ,Explosives, chemical weapons offences",
    "1121 ,Discharging a firearm",
    "1122 ,Possession of a firearm",
    "113 ,Offensive weapons offences (n.e.c.)",
    "114 ,Fireworks offences",
    "12 ,Damage to property and to the environment",
    "1211 ,Arson",
    "1212 ,Criminal damage (not arson)",
    "1221 ,Litter offences",
    "13 ,Public order and other social code offences",
    "131 ,Disorderly conduct",
    "132 ,Trespass offences",
    "133 ,Liquor licensing offences",
    "134 ,Prostitution offences",
    "135 ,Regulated betting/money, collection/trading offences",
    "136 ,Social code offences (n.e.c.)",
    "15 ,Offences against government, justice procedures and organisation of crime",
    "151 ,Offences against government and its agents",
    "152 ,Organisation of crime and conspiracy to commit crime",
    "153 ,Perverting the course of justice",
    "157 ,Offences while in custody, breach of court orders",
]

strregions = [
    ",Northern Region",
    ",Western Region",
    ",Southern Region",
    ",Eastern Region",
    ",South Eastern Region",
    ",Dublin Region",
]


with open('garda_region-crime.csv', newline='') as csvfile:
    reader = csv.reader(csvfile, delimiter=' ', quotechar='|')
    entries = []
    currentEntry = False
    genderTrig = 0
    count = 0
    countfile = 0
    grapharr = []
    for row in reader:
        countfile += 1
        genderTrig = 1

        if len(row) >= 1 and len(row) <= 4:
            for n in strregions:
                if n in (" ".join(row)):
                    if currentEntry:
                        entries.append(currentEntry)
                        #print(currentEntry.region, count)
                        print(len(grapharr))
                        count = 0
                        grapharr = []
                    s = n[1:]
                    count += 1
                    currentEntry = CrimeEntry(s)
                    break

        if " ".join(row)[:3] == '" "':

            
            #print(" ".join(row)[:50])
            for x in strgraphs:
                if x in (" ".join(row)):
                    #print(" ".join(row))
                    numentry = []
                    entry = trunc_at(" ".join(row), '"', 4)[1:]
                    entry = entry.split(",")
                    for y in entry:
                        if y != "..":
                            numentry.append(int(y))
                        else:
                            numentry.append(0)
                    entry = OrderedDict(zip(years, numentry))
                    currentEntry.graphdatasets[x] = entry
                    count += 1
                    grapharr.append(x)
                    break

    entries.append(currentEntry)
    print(countfile)
#for x in entries:
#    print(x.region)


#################################################################################

try:
    connect_str = "dbname='csodata' user='admin1' host='localhost' " +\
        "password='seismictoss613'"
    conn = psycopg2.connect(connect_str)
    cursor = conn.cursor()

    for a in entries:
        for x in strgraphs:
            graphdata = a.graphdatasets[x]
            graphname = x
            graphregion = a.region
            gender = "both"
            print(graphdata, "\n", graphname, " - ", graphregion, "\n", gender)
        
        
            commandcreate = "INSERT INTO graph(region_name, graph_name, gender) values(%s, %s, %s )"
            commandcreatevars = (graphregion, graphname, gender)
            commandfind = "SELECT data_id FROM graph WHERE region_name=%s AND graph_name=%s AND gender=%s"
            cursor.execute(commandcreate, commandcreatevars)
            cursor.execute(commandfind, commandcreatevars)
            data_idVar = cursor.fetchone()

            for x, y in graphdata.items():
                x = x.replace("Q", "0")
                commandPointVars = (x, y, data_idVar)
                commandPointCreate = "INSERT INTO data_point(x_value, y_value, data_id) values(%s, %s, %s)"
                cursor.execute(commandPointCreate, commandPointVars)
        
        conn.commit()

        #############################################################

except Exception as e:
    print("Issues Connecting: Exception Thrown")
    print(e)


    
        
