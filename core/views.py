# Create your views here.
from django.shortcuts import render
from django.http import Http404, HttpResponse
from core.models import Dashboard
import random
import string


def dashboard(request, dashboard_name):
    try:
        dashboard = Dashboard.objects.get(name=dashboard_name)
        exists = True
    except Dashboard.DoesNotExist:
        dashboard = Dashboard.objects.get(name='default')
        exists = False
    save_url = request.path.rstrip('/') + "/save/"
    return render(request, 'dashboard.html', {'name': dashboard_name, 
                                              'serialization': dashboard.serialization,
                                              'save_url': save_url,
                                              'exists': exists})


def index(request):
    s = string.lowercase + string.digits
    random_id = ''.join(random.sample(s,10))
    host_url = request.get_host()
    return render(request, 'index.html', {'random_id': random_id, 'host_url': host_url})

def save(request, dashboard_name):
    print dashboard_name

    if not request.method == 'GET':
        raise Http404

    try:
        serialization = request.GET['serialization']
    except KeyError:
        raise Http404

    try:
        dashboard = Dashboard.objects.get(name=dashboard_name)
    except Dashboard.DoesNotExist:
        dashboard = Dashboard.objects.create(name=dashboard_name)

    dashboard.serialization = serialization
    dashboard.save()

    return HttpResponse("")


