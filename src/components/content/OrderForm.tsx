'use client';

import { Button, Field, Input, Stack, Center } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { withMask } from 'use-mask-input';
import { isPhoneValid } from '@/utils/utils';

interface FormValues {
  phone: string;
}

const OrderForm = () => {
  const [customerPhone, setCustomerPhone] = useState('');
  const [isPhoneInValid, setIsPhoneInValid] = useState(false);
  const { register } = useForm<FormValues>();

  const onSubmit = () => {
    if (isPhoneValid(customerPhone)) {
      console.log(customerPhone);
      return;
    }
    setIsPhoneInValid(true);
  };

  const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPhoneInValid(false);
    setCustomerPhone(e.target.value);
  };

  return (
    <Center mt={'100px'}>
      <form onSubmit={onSubmit}>
        <Stack gap="4" align="flex-start" maxW="sm">
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
