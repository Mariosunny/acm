from django.contrib import admin
from inventory.models import Item, ItemType

admin.site.register(Item)
admin.site.register(ItemType)

