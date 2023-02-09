from django.urls import path
from .views import checkout, stripe_webhook

urlpatterns = [
    path('create-checkout-session/', checkout, name='create-checkout-session'),
    path('webhooks/stripe', stripe_webhook, name='stripe_webhook'),
]