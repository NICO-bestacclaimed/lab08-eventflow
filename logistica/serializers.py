from rest_framework import serializers
from .models import Espacio, RecursoTecnico

class EspacioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Espacio
        fields = '__all__'

    # Validación defensiva solicitada en la Tarea
    def validate_aforo_maximo(self, value):
        if value <= 0:
            raise serializers.ValidationError("El aforo máximo debe ser mayor a 0.")
        return value

class RecursoTecnicoSerializer(serializers.ModelSerializer):
    # Incluye la información del espacio asociado (sólo lectura)
    espacio_detalle = EspacioSerializer(source='espacio', read_only=True)

    class Meta:
        model = RecursoTecnico
        fields = ['id', 'nombre', 'codigo_inventario', 'costo_mantenimiento', 'stock', 'espacio', 'espacio_detalle']

    # Validación defensiva solicitada en la Tarea
    def validate_costo_mantenimiento(self, value):
        if value < 0:
            raise serializers.ValidationError("El costo de mantenimiento no puede ser negativo.")
        return value

    def validate_stock(self, value):
        if value < 0:
            raise serializers.ValidationError("El stock no puede ser negativo.")
        return value