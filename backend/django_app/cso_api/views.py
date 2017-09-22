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
        queryset = Graph.objects.filter(region_name=regionT).filter(graph_name=graphT).filter(gender=genderT)
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
        queryset = Graph.objects.filter(region_name=regionT).filter(graph_name=graphT)
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
        queryset = Graph.objects.filter(region_name=regionT).filter(graph_name=graphT)
        return queryset