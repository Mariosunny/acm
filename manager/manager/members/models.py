from django.db import models


class Member(models.Model):

	first_name = models.CharField(max_length=128)
	last_name = models.CharField(max_length=128)
	acm_number = models.CharField(max_length=7)
	email = models.EmailField()
	role = models.ForeignKey("Role")
	classification = models.ForeignKey("Classification")
	availability_table = models.CharField(max_length=76)

	def decode_availability_table(self):

		table = self.availability_table
		decoded_table = []

		decoded_table.append(self.decode_availability_table_row(table, 0,12))
		decoded_table.append(self.decode_availability_table_row(table, 12,24))
		decoded_table.append(self.decode_availability_table_row(table, 24,32))
		decoded_table.append(self.decode_availability_table_row(table, 32,44))
		decoded_table.append(self.decode_availability_table_row(table, 44,52))
		decoded_table.append(self.decode_availability_table_row(table, 52,64))
		decoded_table.append(self.decode_availability_table_row(table, 64,76))

		return decoded_table


	def decode_availability_table_row(self, data, start, end):

		return list(map(lambda char: True if char == "1" else False, data[start:end]))

	def get_full_name(self):

		return self.first_name + " " + self.last_name

	def __str__(self):

		return self.get_full_name()


class Classification(models.Model):

	name = models.CharField(max_length=128)

	def __str__(self):

		return self.name


class Role(models.Model):

	name = models.CharField(max_length=128)

	def __str__(self):

		return self.name