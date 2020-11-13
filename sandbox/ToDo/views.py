from django.shortcuts import render

# Create your views here.
def controllerAW(request):
    return render(request, 'ToDo/index.html')