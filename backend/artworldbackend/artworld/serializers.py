from rest_framework import serializers
from .models import Product, Category, Subcategory


class ProductSerializer(serializers.ModelSerializer):
    subcategory_name = serializers.CharField(source='subcategory.name', read_only=True)
    category = serializers.IntegerField(source='subcategory.category.id', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Product
        fields = ('id', 'name', 'price', 'category', 'category_name', 'subcategory', 'subcategory_name', 'image')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')


class SubcategorySerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Subcategory
        fields = ('id', 'name', 'category', 'category_name')
