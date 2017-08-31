import csv
from collections import OrderedDict

birthsLastTitle = "Births since last Census (Number)"
DeathsLastTitle = "Deaths since last Census (Number)"

class PopulationEntry():
    def __init__(self, region, gender):
        self.region = region
        self.populationNumber = OrderedDict()
        self.populationChange = OrderedDict()
        self.gender = gender

strregions = [
    "State",
    "Leinster",
    "Carlow",
    "Dublin",
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
    "Munster",
    "Clare",
    "Cork",
    "Kerry",
    "Limerick",
    "Tipperary",
    "Waterford",
    "Connacht",
    "Galway",
    "Leitrim",
    "Mayo",
    "Roscommon",
    "Sligo",
    "Cavan",
    "Donegal",
    "Monaghan"
]

stryears =    ["1881","1891","1901","1911","1926","1936","1946","1951",
            "1956","1961","1966","1971","1979","1981","1986","1991",
            "1996","2002","2006","2011"]
years    =  [int(x) for x in stryears]


with open('county-population-mfb-all.csv', newline='') as csvfile:
        reader = csv.reader(csvfile, delimiter=' ', quotechar='|')
        entries = []
        currentEntry = False;
        genderTrig = 0
        for row in reader:
            if (len(row) > 0) and (len(row) <= 2):
                if "Both" in row[0]:
                    genderTrig = 1
                elif "Male" in row[0]:
                    genderTrig = 2
                elif "Female" in row[0]:
                    genderTrig = 3


            if len(row) >= 2 and len(row) <= 3:
                for n in strregions:
                    if n in row[1]:
                        if currentEntry:
                            entries.append(currentEntry)
                        s = row[1]
                        if s[-1] == '"':
                            s = s[:-1]
                        s = s[3:]
                        currentEntry = PopulationEntry(s, genderTrig)
                        break

            elif len(row) > 3:

                if "Number" in row[3]:
                    numentry = []
                    entry = row[3][10:]
                    entry = entry.split(",")
                    for x in entry:
                        if x != "..":
                            numentry.append(int(x))
                        else:
                            numentry.append(-1)
                    entry = OrderedDict(zip(years, numentry))
                    currentEntry.populationNumber = entry

                elif "Change" in row[3]:
                    numentry = []
                    entry = row[7][10:]
                    entry = entry.split(",")
                    for x in entry:
                        if x != "..":
                            numentry.append(int(x))
                        else:
                            numentry.append(-1)
                    entry = OrderedDict(zip(years, numentry))
                    currentEntry.populationChange = entry


        entries.append(currentEntry)

        regions = []
        bothEntries = []
        maleEntries = []
        femaleEntries = []
        femaleRegions = []
        maleRegions = []
        bothRegions = []

        for index, z in enumerate(entries):
            if z.gender == 1:
                bothEntries.append(z)
                bothRegions.append(z.region)
            elif z.gender == 2:
                maleEntries.append(z)
                maleRegions.append(z.region)
            elif z.gender == 3:
                femaleEntries.append(z)
                femaleRegions.append(z.region)


        print(len(bothEntries))
        print(len(maleEntries))
        print(len(femaleEntries))
        print(femaleRegions)
        print(maleRegions)
