import os

from django.http import JsonResponse
from rest_framework import viewsets
from .serializers import ProductSerializer, CategorySerializer
from .models import Product, Category
from rest_framework.response import Response
from .. import settings


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def list(self, request, *args, **kwargs):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def list(self, request, *args, **kwargs):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)


def delete_image(request, product_id):
    product = Product.objects.get(id=product_id)
    image_path = os.path.join(settings.MEDIA_ROOT, product.image.name)

    if os.path.exists(image_path):
        os.remove(image_path)

        product.image = ''
        product.save()

        return JsonResponse({'message': 'Imagem excluída com sucesso.'})
    else:
        return JsonResponse({'message': 'Imagem não encontrada.'}, status=404)
