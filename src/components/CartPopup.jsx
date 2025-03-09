/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import { getCart } from '../api/api';
import { popupStyles, popupContentStyles } from './NavbarStyles';

const CartPopup = ({ onClose }) => {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCart()
      .then((data) => {
        console.log('Cart data:', data);
        setCart(data);
      })
      .catch((err) => setError(err.message || 'خطا در بارگذاری سبد خرید'));
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
                  {item.product?.price
                    ? `${item.product.price.toLocaleString()} تومان`
                    : 'قیمت نامشخص'}
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