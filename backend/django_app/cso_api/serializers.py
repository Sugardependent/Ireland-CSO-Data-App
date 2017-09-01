from rest_framework import serializers
from cso_api.models import Graph, Data_Point


class GraphSerializer(serializers.ModelSerializer):
    class Meta:
        model = Graph
        fields = '__all__'
        #fields = ('data_id', 'region_name', 'graph_name', 'gender')


class Data_PointSerializer(serializers.ModelSerializer):
    class Meta:
        model = Data_Point
        fields = '__all__'
        #fields = ('data_id', 'x_value', 'y_value', 'point_id')


class GraphPointsSerializer(serializers.ModelSerializer):
    points = Data_PointSerializer

    class Meta:
        model = Graph
        fields = ('data_id', 'region_name', 'graph_name', 'gender', 'points')
        depth = 1
