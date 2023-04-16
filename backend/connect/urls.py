from os import name
from django.urls import path
from .views import portfolio_view, price_view, transcript_tone_view

urlpatterns = [
    path('api/price/<str:symbol>/', price_view, name="price_view"),
    path('api/transcript/<str:symbol>/', transcript_tone_view, name="transcript_tone_view"),
    path('api/portfolio/<str:file>/', portfolio_view, name="portfolio_view"),
]
