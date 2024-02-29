from django.conf import settings
from django.db import models



class Merchant(models.Model):
    name = models.CharField(max_length=255, blank=False, null=False)
    description = models.TextField(null=True, blank=True)
    description_html = models.TextField(null=True, blank=True)
    email = models.EmailField(max_length=255, null=True, blank=True)
    phone_number = models.CharField(max_length=45, null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)
    


