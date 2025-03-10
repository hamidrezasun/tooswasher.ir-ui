/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import { getCart } from '../api/api';
import { popupStyles, popupContentStyles } from './NavbarStyles';

const CartPopup = ({ onClose }) => {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart();
        console.log('Fetched cart data:', data); // Debug the API response
        setCart(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || 'خطا در بارگذاری سبد خرید');
        console.error('Cart fetch error:', err.response?.data);
      }
    };
    fetchCart();
  }, []);

  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div css={popupStyles}>
      <div css={popupContentStyles}>
        <h2 className="text-xl font-bold mb-4 text-gray-800">سبد خرید</h2>
        {cart.length === 0 ? (
          <p className="text-gray-600">سبد خرید شما خالی است</p>
        ) : (
          <ul className="space-y-4">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center">
                <span>{item.product?.name || 'محصول نامشخص'}</span>
                <span>
                  {item.quantity} ×{' '}
                  {item.product?.price
                    ? `${item.product.price.toLocaleString()} تومان`
                    : 'قیمت نامشخص'}
                </span>
                <span className="ml-4">
                  {(item.quantity * (item.product?.price || 0)).toLocaleString()} تومان
                </span>
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition"
        >
          بستن
        </button>
      </div>
    </div>
  );
};

export default CartPopup;