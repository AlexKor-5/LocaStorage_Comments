from django.db import models

class Comment(models.Model):
	author = models.CharField(max_length=50)
	text = models.CharField(max_length=200)
	created = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return {'author':self.author, 'text':self.text, 'created':self.created}

	class Meta:
		ordering = ('-created',)
		verbose_name = "Коментар"
		verbose_name_plural = "Коментарі"
