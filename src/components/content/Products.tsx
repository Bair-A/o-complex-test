'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { useCart } from '@/components/providers/CartProvider';
import ProductCard from '@/components/content/ProductCard';
import { Product } from '@/types/types';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { cart, setCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          'http://o-complex.com:1337/products?page=1&page_size=20',
        );
        const data = await response.json();
        setProducts(data.items || []);
      } catch (error) {
        console.error('Ошибка при загрузке товаров:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = useCallback(
    (product: Product) => {
      setCart((prevCart) => ({
        ...prevCart,
        [product.id]: {
          title: product.title,
          price: product.price,
          quantity: 1,
        },
      }));
    },
    [setCart],
  );

  const updateCart = useCallback(
    (id: number, title: string, price: number, quantity: number) => {
      setCart((prevCart) => {
        const updatedCart = { ...prevCart };
        if (quantity <= 0) {
          delete updatedCart[id];
        } else {
          updatedCart[id] = { title, price, quantity };
        }
        return updatedCart;
      });
    },
    [setCart],
  );

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
            updateCart={updateCart}
            cart={cart}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
