/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { loginForAccessToken } from '../api/api';
import { saveToken } from '../api/auth';
import { popupStyles, popupContentStyles } from './NavbarStyles';

const LoginPopup = ({ onClose, setIsRegisterOpen }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);
      const data = await loginForAccessToken(formData);
      saveToken(data.access_token);
      alert('ورود با موفقیت انجام شد');
      onClose();
    } catch (err) {
      setError(err.response?.data?.detail || 'خطا در ورود');
    }
  };

  return (
    <div css={popupStyles}>
      <div css={popupContentStyles}>
        <h2 className="text-xl font-bold mb-4 text-gray-800">ورود</h2>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="نام کاربری"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            placeholder="رمز عبور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button type="submit" className="w-full bg-indigo-500 text-white p-2 rounded hover:bg-indigo-600 transition">
            ورود
          </button>
          <button
            type="button"
            onClick={() => { onClose(); setIsRegisterOpen(true); }}
            className="w-full mt-2 bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition"
          >
            ثبت‌نام
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full mt-2 bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition"
          >
            لغو
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPopup;