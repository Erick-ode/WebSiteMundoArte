import os
from rest_framework import viewsets
from .serializers import ProductSerializer, CategorySerializer, SubcategorySerializer
from .models import Product, Category, Subcategory
from rest_framework.response import Response


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def list(self, request, *args, **kwargs):
        category_id = request.query_params.get('categoria')
        subcategory_id = request.query_params.get('subcategoria')

        if subcategory_id:
            products = Product.objects.filter(subcategory=subcategory_id)
        elif category_id:
            products = Product.objects.filter(category=category_id)
        else:
            products = Product.objects.all()

        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        os.remove(instance.image.path)
        self.perform_destroy(instance)
        return Response(serializer.data)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def list(self, request, *args, **kwargs):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)


class SubcategoryViewSet(viewsets.ModelViewSet):
    queryset = Subcategory.objects.all()
    serializer_class = SubcategorySerializer

    def list(self, request, *args, **kwargs):
        category_id = request.query_params.get('categoria')

        if category_id:
            subcategories = Product.objects.filter(category=category_id)
        else:
            subcategories = Subcategory.objects.all()

        serializer = SubcategorySerializer(subcategories, many=True)
        return Response(serializer.data)
