from cso_api.models import Graph, Data_Point
from cso_api.serializers import GraphSerializer, Data_PointSerializer, GraphPointsSerializer
from rest_framework import generics


class GraphList(generics.ListCreateAPIView):
    queryset = Graph.objects.all()
    serializer_class = GraphSerializer


class GraphRegionList(generics.ListAPIView):
    serializer_class = GraphSerializer

    def get_queryset(self):
        regionT = self.kwargs['regionname'].title().replace("-", " ")
        return Graph.objects.filter(region_name=regionT)


class GraphDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Graph.objects.all()
    serializer_class = GraphSerializer


class Data_PointList(generics.ListCreateAPIView):
    queryset = Data_Point.objects.all()
    serializer_class = Data_PointSerializer


class Data_PointDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Data_Point.objects.all()
    serializer_class = Data_PointSerializer


class GraphPointsList(generics.ListAPIView):
    serializer_class = Data_PointSerializer

    def get_queryset(self):
        dataid = self.kwargs['graphid']
        return Data_Point.objects.filter(data_id=dataid)


class GraphPointsCompleteList(generics.RetrieveAPIView):
    queryset = Graph.objects.all()
    serializer_class = GraphPointsSerializer


class GraphPointsRegionTypeGender(generics.ListAPIView):
    serializer_class = GraphPointsSerializer

    def get_queryset(self):
        graphT = self.kwargs['graphname']
        regionT = self.kwargs['regionname'].title().replace("-", " ")
        genderT = self.kwargs['gender']
        if (graphT == 'population'):
            graphT = 'Population (Number)'
        elif (graphT == 'deaths'):
            graphT = 'Deaths (Number)'
        queryset = Graph.objects.filter(region_name=regionT).filter(
            graph_name=graphT).filter(gender=genderT)
        return queryset


class GraphPointsRegionType(generics.ListAPIView):
    serializer_class = GraphPointsSerializer

    def get_queryset(self):
        graphT = self.kwargs['graphname']
        regionT = self.kwargs['regionname'].title().replace("-", " ")
        if (graphT == 'population'):
            graphT = 'Population (Number)'
        elif (graphT == 'deaths'):
            graphT = 'Deaths (Number)'
        queryset = Graph.objects.filter(
            region_name=regionT).filter(graph_name=graphT)
        return queryset


class GraphPointsRegion(generics.ListAPIView):
    serializer_class = GraphPointsSerializer

    def get_queryset(self):
        regionT = self.kwargs['regionname'].title().replace("-", " ")
        queryset = Graph.objects.filter(region_name=regionT)
        return queryset


class GraphPointsBirth(generics.ListAPIView):
    serializer_class = GraphPointsSerializer

    def get_queryset(self):
        graphT = self.kwargs['graphtype']
        regionT = self.kwargs['regionname'].title().replace("-", " ")
        if (graphT == 'births-all'):
            graphT = 'All Births (Number)'
        elif (graphT == 'first-births'):
            graphT = 'First Births (Number)'
        elif (graphT == 'births-wm'):
            graphT = 'Births within Marriage (Number)'
        elif (graphT == 'births-om'):
            graphT = 'Births outside Marriage (Number)'
        elif (graphT == 'mother-average-age'):
            graphT = 'Average Age of Mother (Years)'
        elif (graphT == 'ft-mother-average-age'):
            graphT = 'Average Age of First Time Mother (Years)'
        queryset = Graph.objects.filter(
            region_name=regionT).filter(graph_name=graphT)
        return queryset


class GraphPointsCrime(generics.ListAPIView):
    serializer_class = GraphPointsSerializer

    def get_queryset(self):

        strgraphs = {
            "01": "01 ,Homicide offences",
            "0111": "0111 ,Murder",
            "0112": "0112 ,Manslaughter",
            "0113": "0113 ,Infanticide",
            "012": "012 ,Dangerous driving leading to death",
            "02": "02 ,Sexual offences",
            "021": "021 ,Rape and sexual assault",
            "022": "022 ,Other sexual offences",
            "03": "03 ,Attempts/threats to murder, assaults, harassments and related offences",
            "0311": "0311 ,Murder-attempt",
            "0312": "0312 ,Murder-threat",
            "033": "033 ,Harassment and related offences",
            "034": "034 ,Assault causing harm, poisoning",
            "035": "035 ,Other assault",
            "04": "04 ,Dangerous or negligent acts",
            "0411": "0411 ,Dangerous driving causing serious bodily harm",
            "0412": "0412 ,Driving/in charge of a vehicle while over legal alcohol limit",
            "0413": "0413 ,Driving/in charge of a vehicle under the influence of drugs",
            "0421": "0421 ,Endangerment with potential for serious harm/death",
            "0422": "0422 ,Abandoning a child, child neglect and cruelty",
            "0423": "0423 ,Unseaworthy/dangerous use of boat or ship",
            "0424": "0424 ,False alarm/interference with aircraft or air transport facilities",
            "0425": "0425 ,Endangering traffic offences",
            "05": "05 ,Kidnapping and related offences",
            "0511": "0511 ,False imprisonment",
            "0512": "0512 ,Abduction of person under 16 years of age",
            "0513": "0513 ,Human trafficking offences",
            "06": "06 ,Robbery, extortion and hijacking offences",
            "0611": "0611 ,Robbery of an establishment or institution",
            "0612": "0612 ,Robbery of cash or goods in transit",
            "0613": "0613 ,Robbery from the person",
            "0621": "0621 ,Blackmail or extortion",
            "0631": "0631 ,Carjacking, hijacking/unlawful seizure of aircraft/vessel",
            "07": "07 ,Burglary and related offences",
            "0711": "0711 ,Aggravated burglary",
            "0712": "0712 ,Burglary (not aggravated)",
            "0713": "0713 ,Possession of an article (with intent to burgle, steal, demand)",
            "08": "08 ,Theft and related offences",
            "081": "081 ,Theft/taking of vehicle and related offences",
            "0821": "0821 ,Theft from person",
            "0822": "0822 ,Theft from shop",
            "084": "084 ,Other thefts, handling stolen property",
            "09": "09 ,Fraud, deception and related offences",
            "10": "10 ,Controlled drug offences",
            "1011": "1011 ,Importation of drugs",
            "1012": "1012 ,Cultivation or manufacture of drugs",
            "1021": "1021 ,Possession of drugs for sale or supply",
            "1022": "1022 ,Possession of drugs for personal use",
            "103": "103 ,Other drug offences",
            "11": "11 ,Weapons and Explosives Offences",
            "111": "111 ,Explosives, chemical weapons offences",
            "1121": "1121 ,Discharging a firearm",
            "1122": "1122 ,Possession of a firearm",
            "113": "113 ,Offensive weapons offences (n.e.c.)",
            "114": "114 ,Fireworks offences",
            "12": "12 ,Damage to property and to the environment",
            "1211": "1211 ,Arson",
            "1212": "1212 ,Criminal damage (not arson)",
            "1221": "1221 ,Litter offences",
            "13": "13 ,Public order and other social code offences",
            "131": "131 ,Disorderly conduct",
            "132": "132 ,Trespass offences",
            "133": "133 ,Liquor licensing offences",
            "134": "134 ,Prostitution offences",
            "135": "135 ,Regulated betting/money, collection/trading offences",
            "136": "136 ,Social code offences (n.e.c.)",
            "15": "15 ,Offences against government, justice procedures and organisation of crime",
            "151": "151 ,Offences against government and its agents",
            "152": "152 ,Organisation of crime and conspiracy to commit crime",
            "153": "153 ,Perverting the course of justice",
            "157": "157 ,Offences while in custody, breach of court orders",
        }

        graphT = str(self.kwargs['graphtype'])
        regionT = self.kwargs['regionname'].title().replace("-", " ")
        if graphT in strgraphs.keys():
            graphTR = strgraphs[graphT]
        else:
            graphTR = "00"
        queryset = Graph.objects.filter(region_name=regionT).filter(graph_name=graphTR)
        return queryset
