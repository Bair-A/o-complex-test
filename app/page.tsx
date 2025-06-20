import Reviews from '@/components/content/Reviews';
import Header from '@/components/content/Header';
import OrderForm from '@/components/content/OrderForm';

export default function Home() {
  return (
    <div>
      <main>
        <Header />
        <Reviews />
        <OrderForm />
      </main>
      <footer></footer>
    </div>
  );
}
