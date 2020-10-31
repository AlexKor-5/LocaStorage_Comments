from django.shortcuts import render
from . import views

def main(request):
	return render(request,'main.html')

