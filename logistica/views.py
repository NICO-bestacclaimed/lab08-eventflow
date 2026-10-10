from rest_framework import generics
from .models import Espacio, RecursoTecnico
from .serializers import EspacioSerializer, RecursoTecnicoSerializer

class EspacioListCreateView(generics.ListCreateAPIView):
    queryset = Espacio.objects.all()
    serializer_class = EspacioSerializer

class EspacioDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Espacio.objects.all()
    serializer_class = EspacioSerializer

class RecursoTecnicoListCreateView(generics.ListCreateAPIView):
    queryset = RecursoTecnico.objects.all()
    serializer_class = RecursoTecnicoSerializer

class RecursoTecnicoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = RecursoTecnico.objects.all()
    serializer_class = RecursoTecnicoSerializer