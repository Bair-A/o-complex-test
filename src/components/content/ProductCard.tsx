'use client';
import React from 'react';
import { Product } from '@/types/types';
import { Button, Input } from '@chakra-ui/react';

const ProductCard: React.FC<{
  addToCart: (product: Product) => void;
  updateCart: (
    id: number,
    title: string,
    price: number,
    quantity: number,
  ) => void;
  cart: { [id: number]: { quantity: number } };
  product: Product;
}> = ({ addToCart, updateCart, cart, product }) => (
  <div
    style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      width: '300px',
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
        style={{
          marginTop: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}
      >
        <Button
          variant="subtle"
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
        </Button>
        <Input
          type="number"
          variant="subtle"
          color="white"
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
        <Button
          variant="subtle"
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
        </Button>
      </div>
    ) : (
      <Button
        variant="subtle"
        mt={'32px'}
        style={{ width: '100%' }}
        onClick={() => addToCart(product)}
      >
        Купить
      </Button>
    )}
  </div>
);

export default ProductCard;
