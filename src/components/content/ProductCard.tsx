import React from 'react';
import { Product } from '@/types/types';

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
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
);

export default ProductCard;
