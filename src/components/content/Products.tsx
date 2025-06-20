'use client';
import React, { useEffect, useState } from 'react';
import { useCart } from '@/components/providers/CartProvider';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image_url: string;
}

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

  const addToCart = (product: Product) => {
    setCart((prevCart) => ({
      ...prevCart,
      [product.id]: {
        title: product.title,
        price: product.price,
        quantity: 1,
      },
    }));
  };

  const updateCart = (
    id: number,
    title: string,
    price: number,
    quantity: number,
  ) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (quantity <= 0) {
        delete updatedCart[id];
      } else {
        updatedCart[id] = { title, price, quantity };
      }
      return updatedCart;
    });
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      {/* Карточки товаров */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '16px',
              width: '200px',
            }}
          >
            <img
              src={product.image_url}
              alt={product.title}
              style={{ width: '100%', borderRadius: '8px' }}
            />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>Цена: {product.price} ₽</p>
            {cart[product.id] ? (
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <button
                  onClick={() =>
                    updateCart(
                      product.id,
                      product.title,
                      product.price,
                      cart[product.id].quantity - 1,
                    )
                  }
                >
                  -
                </button>
                <input
                  type="number"
                  value={cart[product.id].quantity}
                  onChange={(e) =>
                    updateCart(
                      product.id,
                      product.title,
                      product.price,
                      Number(e.target.value),
                    )
                  }
                  style={{ width: '50px', textAlign: 'center' }}
                />
                <button
                  onClick={() =>
                    updateCart(
                      product.id,
                      product.title,
                      product.price,
                      cart[product.id].quantity + 1,
                    )
                  }
                >
                  +
                </button>
              </div>
            ) : (
              <button onClick={() => addToCart(product)}>Купить</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
