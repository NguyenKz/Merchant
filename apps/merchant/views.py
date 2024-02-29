# views.py
from rest_framework import generics
from .models import Merchant
from .serializers import MerchantSerializer
from django.shortcuts import render

class MerchantListCreateView(generics.ListCreateAPIView):
    queryset = Merchant.objects.all()
    serializer_class = MerchantSerializer

class MerchantRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Merchant.objects.all()
    serializer_class = MerchantSerializer



def merchant_list(request):
    merchants = Merchant.objects.all()
    return render(request, 'merchants_list.html', {'merchants': merchants})
