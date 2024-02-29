# urls.py
from django.urls import path
from .views import MerchantListCreateView, MerchantRetrieveUpdateDestroyView, merchant_list

urlpatterns = [
    path('api/', MerchantListCreateView.as_view(), name='merchant-list-create'),
    path('api/<int:pk>/', MerchantRetrieveUpdateDestroyView.as_view(), name='merchant-retrieve-update-destroy'),
    path('', merchant_list, name='merchant-list'),
]
