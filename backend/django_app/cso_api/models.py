from __future__ import unicode_literals

from django.db import models


class Graph(models.Model):
    data_id = models.AutoField(primary_key=True)
    region_name = models.TextField()
    graph_name = models.TextField()
    gender = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'graph'


class Data_Point(models.Model):
    data = models.ForeignKey('Graph', models.CASCADE, blank=False, \
                                related_name='points')
    x_value = models.IntegerField()
    y_value = models.IntegerField()
    point_id = models.AutoField(primary_key=True)

    class Meta:
        db_table = 'data_point'

    def __unicode__(self):
        return '%d,%d' % (self.x_value, self.y_value)
