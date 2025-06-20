import Reviews from '@/components/content/Reviews';
import Header from '@/components/content/Header';
import OrderForm from '@/components/content/OrderForm';
import Products from '@/components/content/Products';
import { CartProvider } from '@/components/providers/CartProvider';

export default function Home() {
  return (
    <CartProvider>
      <>
        <Header />
        <Reviews />
        <OrderForm />
        <Products />
      </>
    </CartProvider>
  );
}
