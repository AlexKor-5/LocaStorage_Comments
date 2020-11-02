from django.shortcuts import render, render_to_response
from django.http import HttpResponse, JsonResponse
from .models import Comment
import json, pickle
from django.core import serializers

def base(request):
	return render_to_response("comments/index.html")

def temp(request):
	data = json.loads(request.body)
	print(request.body)
	comment = Comment(author=data['name'], text=data['comment'])
	comment.save()

	return HttpResponse("Yes")

def ttemp(request):
	comments = Comment.objects.all()
	data = serializers.serialize("json", comments)
	response_data = json.loads(data)

	return JsonResponse(response_data, safe=False)

