from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from cso_api import views

urlpatterns = [
    url(r'^graphs/$', views.GraphList.as_view()),
    url(r'^graphs/list/(?P<regionname>.+)', views.GraphRegionList.as_view()),
    url(r'^graphs/(?P<pk>[0-9]+)/$', views.GraphDetail.as_view()),
    url(r'^graphs/(?P<graphid>.+)/points', views.GraphPointsList.as_view()),
    url(r'^graphs/(?P<pk>.+)/complete', views.GraphPointsCompleteList.as_view()),
    url(r'^graphs/query/(?P<regionname>.+)/(?P<graphname>.+)/(?P<gender>.+)', views.GraphPointsRegionTypeGender.as_view()),
    url(r'^graphs/birth/(?P<regionname>.+)/(?P<graphtype>.+)', views.GraphPointsBirth.as_view()),
    url(r'^graphs/crime/(?P<regionname>.+)/(?P<graphtype>.+)', views.GraphPointsCrime.as_view()),
    url(r'^graphs/query/(?P<regionname>.+)/(?P<graphname>.+)', views.GraphPointsRegionType.as_view()),
    url(r'^graphs/query/(?P<regionname>.+)', views.GraphPointsRegion.as_view()),
    url(r'^points/$', views.Data_PointList.as_view()),
    url(r'^points/(?P<pk>[0-9]+)/$', views.Data_PointDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
