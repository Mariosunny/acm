from django.shortcuts import render
from django.http import JsonResponse
import app.models as models

def index(request, UID):

	return render(request, "app/index.html", {
		"UID": UID
		})


def post(request):

	data = request.GET
	member = models.Member.objects.get(UID=data["UID"])
	team = int(data["team"])
	team_size = len(models.Member.objects.filter(team=team))
	print(team_size)

	if team_size < 5:

		member.team = team
		member.save()

	return JsonResponse({})


def load(request):

	return JsonResponse({"members": get_members()})


def get_members():

	return [{
			"UID": member.UID,
			"name": member.name,
			"team": member.team,
		} for member in models.Member.objects.all().order_by("name")]