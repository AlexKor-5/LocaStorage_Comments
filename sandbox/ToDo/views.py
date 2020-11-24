from django.shortcuts import render
from django.http import JsonResponse
from .models import todo
import json

# Create your views here.
def controllerAW(request):
    return render(request, 'ToDo/index.html')

def done_list(request):
    return render(request, 'ToDo/indexDone.html')

def submit(request):
    print(request.body)
    data = json.loads(request.body)
    new_task = todo(body=data['todo'], index=data['index'], done=False)
    new_task.save()
    return JsonResponse("Done", safe=False)

def load(request):
    todos = todo.objects.filter(done=False)

    rs_d = list()

    for todo_l in todos:
        rs_d.append({'todo':todo_l.body,
                    'index':todo_l.index})
    print(rs_d)
    return JsonResponse(rs_d, safe=False)

def done(request):
    print(request.body)
    data = json.loads(request.body)
    print(data)
    change_todo = todo.objects.get(body=data['todo'], index=data['index'])
    print(change_todo)
    if request.method == 'POST':
        print('done  ', request.body)
        change_todo.done = True
        change_todo.save()
    if request.method == 'DELETE':
        print('delete  ', request.body)
        change_todo.delete()
    return JsonResponse('Ok', safe=False)

def delete(request):
    print('delete  ', request.body)
    
    request_data = request.body
    
    data = json.loads(request_data)
    change_todo = todo.objects.get(body=data['todo'], index=data['index'])
    print(change_todo)
    change_todo.done = True
    change_todo.delete()
    return JsonResponse('Ok', safe=False)

def done_all(request):
    todo.objects.filter(done=False).update(done=True)

    return JsonResponse('Ok',safe=False)

def remove_all_done(request):
    todo.objects.filter(done=True).delete()

    return JsonResponse("Ok", safe=False)

def remove_all_undone(request):
    todo.objects.filter(done=False).delete()

    return JsonResponse("Ok", safe=False)

def load_done(request):
    todos = todo.objects.filter(done=True)

    rs_d = list()

    for todo_l in todos:
        rs_d.append({'todo':todo_l.body,
                    'index':todo_l.index})
    print(rs_d)
    return JsonResponse(rs_d, safe=False)