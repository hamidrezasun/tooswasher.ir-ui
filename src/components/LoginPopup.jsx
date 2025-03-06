/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { useState } from 'react';
import { loginUser } from '../api/api';
import { saveToken } from '../api/auth';

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
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
  }
`;

const buttonStyles = css`
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(135deg, #2563eb 0%, #60a5fa 100%);
  color: white;
  font-weight: 600;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
  &:hover {
    background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
  }
`;

const switchLinkStyles = css`
  color: #2563eb;
  font-weight: 500;
  transition: color 0.2s ease;
  &:hover {
    color: #1e40af;
    text-decoration: underline;
  }
`;

const LoginPopup = ({ onClose, onSwitchToRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await loginUser({ username, password });
      saveToken(response.access_token);
      onClose();
      window.location.reload();
    } catch (err) {
      setError(err.detail || 'نام کاربری یا رمز عبور اشتباه است');
    }
  };

  return (
    <div css={overlayStyles}>
      <div css={contentStyles}>
        <button css={closeButtonStyles} onClick={onClose}>
          ×
        </button>
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">ورود به حساب کاربری</h2>
        {error && <p className="text-red-500 text-center mb-4 font-medium">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              نام کاربری
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              css={inputStyles}
              placeholder="نام کاربری خود را وارد کنید"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              رمز عبور
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              css={inputStyles}
              placeholder="رمز عبور خود را وارد کنید"
            />
          </div>
          <button type="submit" css={buttonStyles}>
            ورود
          </button>
        </form>
        <p className="text-center mt-4">
          حساب کاربری ندارید؟{' '}
          <button css={switchLinkStyles} onClick={onSwitchToRegister}>
            ثبت‌نام کنید
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPopup;