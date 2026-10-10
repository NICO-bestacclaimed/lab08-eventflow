from django.urls import path
from . import views

urlpatterns = [
    path('espacios/', views.EspacioListCreateView.as_view(), name='espacio-list'),
    path('espacios/<int:pk>/', views.EspacioDetailView.as_view(), name='espacio-detail'),
    path('recursos/', views.RecursoTecnicoListCreateView.as_view(), name='recurso-list'),
    path('recursos/<int:pk>/', views.RecursoTecnicoDetailView.as_view(), name='recurso-detail'),
]