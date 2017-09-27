from django.shortcuts import render
from django.http import JsonResponse
import inventory.models as models


def init(request):

	return JsonResponse({})