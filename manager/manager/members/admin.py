from django.contrib import admin
from members.models import Member, Role, Classification

admin.site.register(Member)
admin.site.register(Role)
admin.site.register(Classification)

