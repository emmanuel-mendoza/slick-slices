import { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext';
import attachNamesAndPrices from './attachNamesAndPrices';
import calculateOrderTotal from './calculateOrderTotal';
import formatMoney from './formatMoney';

export default function usePizza({ pizzas, values }) {
  // 1. Get the state from provider
  const [order, setOrder] = useContext(OrderContext);
  // 1.5 Server comm state
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // 2. Make a function add things to order
  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }
  // 3. Make a function remove things from order
  function removeFromOrder(index) {
    setOrder([
      // everything before the item we want to remove
      ...order.slice(0, index),
      // everything after the item we want to remove
      ...order.slice(index + 1),
    ]);
  }
  // 4. Send this data the a serevrless function when they check out
  async function submitOrder(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const reqBody = {
      order: attachNamesAndPrices(order, pizzas),
      total: formatMoney(calculateOrderTotal(order, pizzas)),
      name: values.name,
      email: values.email,
      mapleSyrup: values.mapleSyrup,
    };

    const res = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqBody),
      }
    );

    const resBody = await res.json();

    // eslint-disable-next-line no-unused-expressions
    res.ok
      ? setMessage('Success!! Come on down for your pizza')
      : setError(resBody.message);

    setLoading(false);
  }

  return {
    order,
    addToOrder,
    removeFromOrder,
    loading,
    error,
    message,
    submitOrder,
  };
}
