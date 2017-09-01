from cso_api.models import Graph, Data_Point
from cso_api.serializers import GraphSerializer, Data_PointSerializer, GraphPointsSerializer
from rest_framework import generics


class GraphList(generics.ListCreateAPIView):
    queryset = Graph.objects.all()
    serializer_class = GraphSerializer

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


class GraphPointsCompleteList(generics.ListAPIView):
    serializer_class = GraphPointsSerializer

    def get_queryset(self):
        dataid = self.kwargs['graphid']
        return Graph.objects.filter(data_id=dataid)
