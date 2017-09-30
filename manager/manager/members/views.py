from django.shortcuts import render
from django.http import JsonResponse
import members.models as models

def init(request):

	members = []

	for member in models.Member.objects.all():

		members.append({
			"firstName": member.first_name,
			"lastName": member.last_name,
			"email": member.email,
			"ACMnumber": member.acm_number,
			"role": member.role.name,
			"classification": member.classification.name,
			"availability_table": member.decode_availability_table()
			})

	roles = [{"name": role.name} for role in models.Role.objects.all()]
	classifications = [{"name": classification.name} for classification in models.Classification.objects.all()]

	return JsonResponse({
		"members": members,
		"classifications": classifications,
		"roles": roles,
		})