from django.db import models


class Member(models.Model):

	name = models.CharField(max_length=256, unique=True)
	team = models.IntegerField()
	UID = models.CharField(max_length=12, unique=True)

	def __str__(self):

		return self.name + " (Team " + str(self.team) + ")"