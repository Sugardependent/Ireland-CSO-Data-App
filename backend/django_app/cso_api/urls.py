from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from cso_api import views

urlpatterns = [
    url(r'^graphs/$', views.GraphList.as_view()),
    url(r'^graphs/(?P<pk>[0-9]+)/$', views.GraphDetail.as_view()),
    url(r'^graphs/(?P<graphid>.+)/points', views.GraphPointsList.as_view()),
    url(r'^graphs/(?P<pk>.+)/complete', views.GraphPointsCompleteList.as_view()),
    url(r'^graphs/prop/(?P<regionname>.+)/(?P<graphname>.+)/(?P<gender>.+)', views.GraphPointsRegionTypeGender.as_view()),
    url(r'^graphs/prop/(?P<regionname>.+)/(?P<graphname>.+)', views.GraphPointsRegionType.as_view()),
    url(r'^graphs/prop/(?P<regionname>.+)', views.GraphPointsRegion.as_view()),
    url(r'^points/$', views.Data_PointList.as_view()),
    url(r'^points/(?P<pk>[0-9]+)/$', views.Data_PointDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
