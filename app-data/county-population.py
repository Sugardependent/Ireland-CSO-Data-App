import csv
from collections import OrderedDict

birthsLastTitle = "Births since last Census (Number)"
DeathsLastTitle = "Deaths since last Census (Number)"

class PopulationEntry():
    def __init__(self, region):
        self.region = region
        self.birthsLast = OrderedDict()
        self.deathsLast = OrderedDict()

stryears =    ["1881","1891","1901","1911","1926","1936","1946","1951",
            "1956","1961","1966","1971","1979","1981","1986","1991",
            "1996","2002","2006","2011"]
years    =  [int(x) for x in stryears]


with open('county-population.csv', newline='') as csvfile:
        spamreader = csv.reader(csvfile, delimiter=' ', quotechar='|')
        entries = []
        currentEntry = False;
        for row in spamreader:
            if len(row) ==  1:
                if currentEntry:
                    entries.append(currentEntry)
                currentEntry = PopulationEntry(row[0])
            elif len(row) > 1:
                if "Births" in row[1]:
                    numentry = []
                    entry = row[5][10:]
                    entry = entry.split(",")
                    for x in entry:
                        if x != "..":
                            numentry.append(int(x))
                        else:
                            numentry.append(-1)
                    entry = OrderedDict(zip(years, numentry))
                    currentEntry.birthsLast = entry
                elif "Deaths" in row[1]:
                    numentry = []
                    entry = row[5][10:]
                    entry = entry.split(",")
                    for x in entry:
                        if x != "..":
                            numentry.append(int(x))
                        else:
                            numentry.append(-1)
                    entry = OrderedDict(zip(years, numentry))
                    currentEntry.deathsLast = entry

        for x in entries:
            print(x.region, "\n", list(x.birthsLast.items())[0], \
            "\n", list(x.deathsLast.items())[0])


        regions = []
        for z in entries:
            s = z.region
            if (s[0] == s[-1]) and s.startswith(("'", '"')):
                s = s[1:-1]
            regions.append(s)

        print(regions)
        print(len(regions))
