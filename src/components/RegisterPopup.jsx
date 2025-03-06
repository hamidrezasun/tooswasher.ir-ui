/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { useState } from 'react';
import { registerUser } from '../api/api';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const overlayStyles = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

const contentStyles = css`
  background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%);
  border-radius: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  position: relative;
  width: 100%;
  max-width: 450px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem;
  animation: ${fadeIn} 0.3s ease-out;
  border: 1px solid #e2e8f0;
`;

const closeButtonStyles = css`
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-size: 1.75rem;
  color: #64748b;
  cursor: pointer;
  transition: color 0.3s ease, transform 0.3s ease;
  &:hover {
    color: #ef4444;
    transform: rotate(90deg);
  }
`;

const inputStyles = css`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  text-align: right;
  transition: all 0.3s ease;
  &:focus {
    outline: none;
    border-color: #16a34a;
    box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.2);
  }
`;

const buttonStyles = css`
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(135deg, #16a34a 0%, #4ade80 100%);
  color: white;
  font-weight: 600;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(22, 163, 74, 0.3);
  &:hover {
    background: linear-gradient(135deg, #14532d 0%, #22c55e 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(22, 163, 74, 0.4);
  }
`;

const switchLinkStyles = css`
  color: #16a34a;
  font-weight: 500;
  transition: color 0.2s ease;
  &:hover {
    color: #14532d;
    text-decoration: underline;
  }
`;

const RegisterPopup = ({ onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
    last_name: '',
    national_id: '',
    address: '',
    state: '',
    city: '',
    phone_number: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await registerUser(formData);
      onClose();
      alert('ثبت‌نام با موفقیت انجام شد! حالا می‌توانید وارد شوید.');
    } catch (err) {
      setError(err.detail || 'خطایی در ثبت‌نام رخ داد');
    }
  };

  return (
    <div css={overlayStyles}>
      <div css={contentStyles}>
        <button css={closeButtonStyles} onClick={onClose}>
          ×
        </button>
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">ثبت‌نام</h2>
        {error && <p className="text-red-500 text-center mb-4 font-medium">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              نام کاربری
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              css={inputStyles}
              placeholder="نام کاربری خود را وارد کنید"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              ایمیل
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              css={inputStyles}
              placeholder="ایمیل خود را وارد کنید"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              رمز عبور
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              css={inputStyles}
              placeholder="رمز عبور خود را وارد کنید"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              نام
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              css={inputStyles}
              placeholder="نام خود را وارد کنید"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-2">
              نام خانوادگی
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              css={inputStyles}
              placeholder="نام خانوادگی خود را وارد کنید"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="national_id" className="block text-sm font-medium text-gray-700 mb-2">
              کد ملی
            </label>
            <input
              type="text"
              id="national_id"
              name="national_id"
              value={formData.national_id}
              onChange={handleChange}
              required
              css={inputStyles}
              placeholder="کد ملی خود را وارد کنید"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              آدرس
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              css={inputStyles}
              placeholder="آدرس خود را وارد کنید"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
              استان
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              css={inputStyles}
              placeholder="استان خود را وارد کنید"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
              شهر
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              css={inputStyles}
              placeholder="شهر خود را وارد کنید"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-2">
              شماره تلفن
            </label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              css={inputStyles}
              placeholder="شماره تلفن خود را وارد کنید"
            />
          </div>
          <button type="submit" css={buttonStyles}>
            ثبت‌نام
          </button>
        </form>
        <p className="text-center mt-4">
          قبلاً ثبت‌نام کرده‌اید؟{' '}
          <button css={switchLinkStyles} onClick={onSwitchToLogin}>
            وارد شوید
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPopup;