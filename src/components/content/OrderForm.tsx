'use client';

import { Button, Field, Input, Stack, Center } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';

import { withMask } from 'use-mask-input';
import { formatPhoneNumber, isPhoneValid } from '@/utils/utils';
import { useCart } from '@/components/providers/CartProvider';

interface FormValues {
  phone: string;
}

const OrderForm = () => {
  const [customerPhone, setCustomerPhone] = useState('');
  const [isPhoneInValid, setIsPhoneInValid] = useState(false);
  const { register } = useForm<FormValues>();
  const { cart } = useCart();

  const onSubmit = async (e: React.FormEvent) => {
    if (!isPhoneValid(customerPhone)) {
      setIsPhoneInValid(true);
      return;
    }

    e.preventDefault();

    const cartItems = Object.entries(cart).map(([id, item]) => ({
      id: Number(id),
      quantity: item.quantity,
    }));

    console.log(cart, 'кор', cartItems);

    try {
      const response = await fetch('http://o-complex.com:1337/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: formatPhoneNumber(customerPhone),
          cart: cartItems,
        }),
      });
      if (response.ok) {
        alert('Заказ успешно отправлен!');
      } else {
        alert('Ошибка при отправке заказа');
      }
    } catch {
      alert('Ошибка сети');
    }
  };

  const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPhoneInValid(false);
    setCustomerPhone(e.target.value);
  };

  return (
    <Center
      mt={'100px'}
      flexDirection={'column'}
      style={{
        margin: '100px auto 20px auto',
        minHeight: '200px',
        maxWidth: '600px',
        marginBottom: '20px',
        border: '1px solid #ccc',
        padding: '10px',
      }}
    >
      <h2 style={{ fontWeight: 'bold' }}>Добавленные товары</h2>
      <div>
        {Object.entries(cart).map(([id, product]) => {
          return (
            <div key={id}>
              {product.title} - {product.quantity} шт. (Цена:{' '}
              {product.price * product.quantity} ₽)
            </div>
          );
        })}
      </div>

      <form onSubmit={onSubmit}>
        <Stack gap="4" maxW="md" flexDirection="row">
          <Field.Root invalid={isPhoneInValid}>
            <Input
              placeholder="+7 (___) ___-__-__"
              {...register('phone', { required: true })}
              value={customerPhone}
              onChange={onPhoneChange}
              ref={withMask('+7 (999) 999-99-99')}
            />
            <Field.ErrorText>Заполните номер телефона</Field.ErrorText>
          </Field.Root>
          <Button
            onClick={onSubmit}
            border="2px solid #71717a"
            borderRadius="8px"
            px={6}
            py={2}
          >
            заказать
          </Button>
        </Stack>
      </form>
    </Center>
  );
};

export default OrderForm;
