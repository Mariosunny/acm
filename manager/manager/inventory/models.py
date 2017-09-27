from django.db import models


class ItemType(models.Model):

	name = models.CharField(max_length=256)

	def __str__(self):

		return self.name


class Item(models.Model):

	item_type = models.ForeignKey(ItemType)
	quantity = models.IntegerField()

	def __str__(self):

		return self.item_type.name + " (" + str(self.quantity) + ")"

