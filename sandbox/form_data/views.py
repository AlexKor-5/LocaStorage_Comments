from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.http import require_POST


def base(request):
	if request.method == 'GET':
		print('base')
		return render(request, "form_data/index.html")
	if request.method == 'POST':
		return HttpResponse("OK!!!")
	

@require_POST
def ftemp(request):
	print('ftemp')
	print(request.body)
	return HttpResponse("OK!!!")