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
	comment = Comment(author=data['name'], text=data['comment'], created=data['date'], index=data['index'])
	comment.save()

	return HttpResponse("Yes")

def ttemp(request):
	comments = Comment.objects.all()

	rs_d = dict()
	for comment in comments:
		rs_d[comment.id] = {'name':comment.author, 
							'comment':comment.text,
							'data':comment.created,
							'index':comment.index,
							}

	print(rs_d)
# Working	
	# data = serializers.serialize("json", comments)
	# response_data = json.loads(data)

	return JsonResponse(rs_d)

