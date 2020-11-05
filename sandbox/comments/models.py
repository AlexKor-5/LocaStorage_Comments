from django.db import models

class PersonManager(models.Manager):
    def get_by_natural_key(self, author, text, created):
        return self.get(author=author, text=text, created=created)


class Comment(models.Model):
	author = models.CharField(max_length=50)
	text = models.CharField(max_length=200)
	created = models.CharField(max_length=50)
	index = models.BigIntegerField(null=True)

	def natural_key(self):
		return (self.author, self.text, self.created)

	class Meta:
		ordering = ('-created',)
		verbose_name = "Коментар"
		verbose_name_plural = "Коментарі"
