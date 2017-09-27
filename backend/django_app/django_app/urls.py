from django.conf.urls import url, include

urlpatterns = [
    url(r'^cso-api/', include('cso_api.urls')),
]
