from django.shortcuts import render, render_to_response
from django.http import HttpResponse, JsonResponse
from .models import Comment
import json

def base(request):
	comments = Comment.objects.all()
	return render_to_response("comments/index.html", {'comments':comments})

def temp(request):
	data = json.loads(request.body)
	comment = Comment(author=data['name'], text=data['comment'])
	comment.save()

	return HttpResponse("Yes")
