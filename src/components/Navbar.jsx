/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated, logoutUser } from '../api/auth';
import { getUserProfile, getPages } from '../api/api';
import LoginPopup from './LoginPopup';
import RegisterPopup from './RegisterPopup';
import CategoryDropdown from './CategoryDropdown';
import {
  navbarStyles,
  containerStyles,
  topBarStyles,
  logoStyles,
  searchStyles,
  authCartStyles,
  loginButtonStyles,
  registerButtonStyles,
  logoutButtonStyles,
  cartButtonStyles,
  userInfoStyles,
  menuStyles,
  menuItemStyles,
} from './NavbarStyles';

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [menuPages, setMenuPages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated()) {
        try {
          const profile = await getUserProfile();
          setUser(profile);
        } catch (err) {
          console.error('Failed to fetch user profile:', err);
          logoutUser();
        }
      }

      try {
        const pages = await getPages();
        const menuItems = pages.filter((page) => page.is_in_menu === true);
        setMenuPages(menuItems);
      } catch (err) {
        console.error('Failed to fetch pages:', err);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    window.location.reload();
  };

  return (
    <nav css={navbarStyles} className="font-sans shadow-lg">
      <div css={containerStyles} className="max-w-7xl mx-auto">
        {/* Top Bar */}
        <div css={topBarStyles} className="flex items-center justify-between gap-2">
          <Link to="/" css={logoStyles} className="text-lg md:text-xl flex-shrink-0 hover:text-blue-700 transition-colors">
            طوس واشر
          </Link>

          {/* Search Input */}
          <input
            type="text"
            placeholder="جستجو..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            css={searchStyles}
            className="flex-grow mx-4"
          />

          {/* Auth and Cart */}
          <div css={authCartStyles} className="flex items-center gap-2 flex-shrink-0">
            {user ? (
              <>
                <span css={userInfoStyles} className="text-xs md:text-sm bg-blue-50">
                  {user.name || user.username} {user.last_name || ''}
                </span>
                <button 
                  css={logoutButtonStyles}
                  onClick={handleLogout}
                  className="hover:scale-105 transform transition-transform"
                >
                  خروج
                </button>
              </>
            ) : (
              <>
                <button 
                  css={loginButtonStyles}
                  onClick={() => setIsLoginOpen(true)}
                  className="hover:scale-105 transform transition-transform"
                >
                  ورود
                </button>
                <button 
                  css={registerButtonStyles}
                  onClick={() => setIsRegisterOpen(true)}
                  className="hover:scale-105 transform transition-transform"
                >
                  ثبت‌نام
                </button>
              </>
            )}
            <button 
              css={cartButtonStyles}
              className="hover:scale-105 transform transition-transform"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="hidden md:inline">سبد خرید</span>
            </button>
          </div>
        </div>

        {/* Menu Items and Categories */}
        <div css={menuStyles} className="flex flex-wrap gap-2 justify-end items-center py-2">
          {menuPages.map((page) => (
            <Link
              key={page.id}
              to={`/pages/${page.name.toLowerCase().replace(/\s+/g, '-')}`}
              css={menuItemStyles}
              className="text-sm md:text-base hover:bg-blue-50 rounded-lg"
            >
              {page.name}
            </Link>
          ))}
          <CategoryDropdown />
        </div>
      </div>

      {isLoginOpen && <LoginPopup onClose={() => setIsLoginOpen(false)} />}
      {isRegisterOpen && <RegisterPopup onClose={() => setIsRegisterOpen(false)} />}
    </nav>
  );
};

export default Navbar;