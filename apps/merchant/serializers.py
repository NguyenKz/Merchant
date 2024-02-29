# serializers.py
from rest_framework import serializers
from .models import Merchant
from phonenumber_field.validators import validate_international_phonenumber
from django.conf import settings
class MerchantSerializer(serializers.ModelSerializer):
    created_at = serializers.SerializerMethodField()
    updated_at = serializers.SerializerMethodField()

    class Meta:
        model = Merchant
        fields = '__all__'
        read_only_fields = ["id","created_at","updated_at"]

    
    def get_created_at(self,instance:Merchant)->str:
        return instance.created_at.strftime("%Y-%m-%d %H:%M")

    def get_updated_at(self,instance:Merchant)->str:
        return instance.updated_at.strftime("%Y-%m-%d %H:%M")
    
    def validate_email(self,value):
        if not value:
            return value
        instance:Merchant = Merchant.objects.filter(email=value).first()
        if instance:
            if self.instance and instance.pk!=self.instance.pk or self.instance is None:
                raise serializers.ValidationError("Email already exists.")
        return value
    
    def validate_phone_number(self,value):
        if not value:
            return value
        if not value.startswith("+"):
            raise serializers.ValidationError("Phone number must start with '+'")
        validate_international_phonenumber(value)
        
        instance:Merchant = Merchant.objects.filter(phone_number=value).first()
        if instance:
            if self.instance and instance.pk!=self.instance.pk or self.instance is None:
                raise serializers.ValidationError("Phone already exists.")
        return value
      
    def validate(self, attrs):

        email = self.instance.email if self.instance else None
        phone_number = self.instance.phone_number if self.instance else None
        
        if "email" in attrs:
            email = attrs.get("email")
        if "phone_number" in attrs:
            phone_number = attrs.get("phone_number")
        
        if all([not email, not phone_number]):
            raise serializers.ValidationError({"email":"Email and phone can not be empty at the same time."})
        return super().validate(attrs)