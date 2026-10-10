from django.db import models

class Espacio(models.Model):
    nombre = models.CharField(max_length=150)
    ubicacion = models.CharField(max_length=100)
    aforo_maximo = models.PositiveIntegerField()
    estado_operativo = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.nombre} - {self.ubicacion}"

class RecursoTecnico(models.Model):
    nombre = models.CharField(max_length=150)
    codigo_inventario = models.CharField(max_length=50, unique=True)
    costo_mantenimiento = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=1)
    espacio = models.ForeignKey(Espacio, on_delete=models.PROTECT, related_name='recursos')

    def __str__(self):
        return f"{self.nombre} ({self.codigo_inventario})"