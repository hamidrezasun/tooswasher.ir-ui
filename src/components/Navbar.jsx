/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated, logoutUser } from '../api/auth';
import { getUserProfile, getPages, getCart } from '../api/api';
import LoginPopup from './LoginPopup';
import RegisterPopup from './RegisterPopup';
import CategoryPopup from './CategoryPopup';
import SearchPopup from './SearchPopup';
import SideNavbar from './SideNavbar';
import CartPopup from './CartPopup';
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
  categoryButtonStyles,
  searchButtonStyles,
  toggleButtonStyles,
  userInfoStyles,
  menuStyles,
  menuItemStyles,
} from './NavbarStyles';

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSideNavbarOpen, setIsSideNavbarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [menuPages, setMenuPages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated()) {
        try {
          const profile = await getUserProfile();
          setUser(profile);
          const cart = await getCart();
          setCartCount(cart.length);
        } catch (err) {
          console.error('Failed to fetch user profile or cart:', err);
          logoutUser();
        }
      }
      try {
        const pages = await getPages();
        const menuItems = pages.filter((page) => page.is_in_menu === true);
        console.log('Fetched pages:', pages);
        console.log('Menu items:', menuItems);
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
    setCartCount(0);
    window.location.reload();
  };

  const isStaffOrAdmin = user && (user.role === 'staff' || user.role === 'admin');

  return (
    <nav css={navbarStyles}>
      <div css={containerStyles}>
        <div css={topBarStyles}>
          <Link to="/" css={logoStyles}>طوس واشر</Link>
          <input
            type="text"
            placeholder="جستجو..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            css={searchStyles}
          />
          <div css={authCartStyles}>
            <button css={searchButtonStyles} onClick={() => setIsSearchOpen(true)}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              جستجو
            </button>
            {user ? (
              <>
                <span css={userInfoStyles}>{user.name || user.username} {user.last_name || ''}</span>
                <button css={logoutButtonStyles} onClick={handleLogout}>خروج</button>
              </>
            ) : (
              <>
                <button css={loginButtonStyles} onClick={() => setIsLoginOpen(true)}>ورود</button>
                <button css={registerButtonStyles} onClick={() => setIsRegisterOpen(true)}>ثبت‌نام</button>
              </>
            )}
            <button css={cartButtonStyles} onClick={() => setIsCartOpen(true)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h16l-1.5 7H6L4 4zm0 0l-1 4v9h18v-9l-1-4m-2 13a2 2 0 100-4 2 2 0 000 4zm-8 0a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
              <span>سبد خرید</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
        <div css={menuStyles}>
          {isStaffOrAdmin && (
            <button css={toggleButtonStyles} onClick={() => setIsSideNavbarOpen(true)}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              منو
            </button>
          )}
          <Link to="/" css={menuItemStyles}>خانه</Link>
          <Link to="/products" css={menuItemStyles}>محصولات</Link>
          {menuPages.map((page) => (
            <Link
              key={page.id}
              to={`/pages/${encodeURIComponent(page.name.replace(/\s+/g, '-'))}`}
              css={menuItemStyles}
            >
              {page.name}
            </Link>
          ))}
          <button css={categoryButtonStyles} onClick={() => setIsCategoryOpen(true)}>دسته‌بندی‌ها</button>
        </div>
      </div>
      {isLoginOpen && <LoginPopup onClose={() => setIsLoginOpen(false)} setIsRegisterOpen={setIsRegisterOpen} />}
      {isRegisterOpen && <RegisterPopup onClose={() => setIsRegisterOpen(false)} setIsLoginOpen={setIsLoginOpen} />}
      {isCategoryOpen && <CategoryPopup onClose={() => setIsCategoryOpen(false)} />}
      {isSearchOpen && <SearchPopup onClose={() => setIsSearchOpen(false)} />}
      {isStaffOrAdmin && isSideNavbarOpen && <SideNavbar onClose={() => setIsSideNavbarOpen(false)} />}
      {isCartOpen && <CartPopup onClose={() => setIsCartOpen(false)} />}
    </nav>
  );
};

export default Navbar;