import React, { useState, useEffect } from 'react';

const Donation = () => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [show, setShow] = useState(false); // for entrance animation

  const handleDonate = async (e) => {
    e.preventDefault();
    setError('');
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    setLoading(true);
    try {
      // Call backend to create Razorpay order
      const res = await fetch('/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Number(amount) }),
      });
      const order = await res.json();
      if (!order.id) throw new Error(order.error || 'Order creation failed');
      // Open Razorpay modal
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || 'rzp_test_xxxxxxxx', // Replace with your Razorpay key or use env
        amount: order.amount,
        currency: order.currency,
        name: 'Media Vision Bangalore',
        description: 'Donation',
        order_id: order.id,
        handler: function (response) {
          alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
        },
        prefill: {
          name: '',
          email: '',
        },
        theme: {
          color: '#2563eb',
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load Razorpay script
  useEffect(() => {
    if (!window.Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    }
    // Trigger entrance animation
    setTimeout(() => setShow(true), 100);
  }, []);

  return (
    <div className={`max-w-md mx-auto mt-10 p-6 bg-white rounded shadow transition-all duration-700 ease-out
      ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <h2 className="text-2xl font-bold mb-4 text-center">Donate to Media Vision Bangalore</h2>
      <form onSubmit={handleDonate} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Amount (INR)</label>
          <input
            type="number"
            min="1"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            required
          />
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition active:scale-95 duration-150"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Donate'}
        </button>
      </form>
    </div>
  );
};

export default Donation;