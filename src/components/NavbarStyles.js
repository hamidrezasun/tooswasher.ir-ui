/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';

export const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const navbarStyles = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: white;
  direction: rtl;
`;

export const containerStyles = css`
  padding: 0.75rem 1.5rem;
`;

export const topBarStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

export const logoStyles = css`
  color: #2563eb;
  font-weight: 700;
  font-size: 1.75rem;
  transition: color 0.3s ease;
`;

export const searchContainerStyles = css`
  position: relative;
  flex-grow: 1;
  max-width: 600px;
`;

export const searchStyles = css`
  width: 100%;
  padding: 0.75rem 1.25rem;
  border: 2px solid #e2e8f0;
  border-radius: 1rem;
  font-size: 1rem;
  transition: all 0.3s ease;
  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
  }
`;

export const searchButtonStyles = css`
  padding: 0.75rem;
  border-radius: 0.75rem;
  background: #2563eb;
  color: white;
  transition: all 0.3s ease;
  &:hover {
    background: #1e40af;
  }
`;

export const authCartStyles = css`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const buttonBase = css`
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const loginButtonStyles = css`
  ${buttonBase};
  background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
  color: white;
  &:hover {
    background: linear-gradient(135deg, #1e40af 0%, #2563eb 100%);
  }
`;

export const registerButtonStyles = css`
  ${buttonBase};
  background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
  color: white;
  &:hover {
    background: linear-gradient(135deg, #059669 0%, #10b981 100%);
  }
`;

export const logoutButtonStyles = css`
  ${buttonBase};
  background: linear-gradient(135deg, #ef4444 0%, #f87171 100%);
  color: white;
  &:hover {
    background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
  }
`;

export const cartButtonStyles = css`
  ${buttonBase};
  background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
  color: white;
  &:hover {
    background: linear-gradient(135deg, #d97706 0%, #f59e0b 100%);
  }
`;

export const userInfoStyles = css`
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  font-weight: 500;
`;

export const menuStyles = css`
  border-top: 2px solid #f1f5f9;
  margin-top: 0.5rem;
`;

export const menuItemStyles = css`
  padding: 0.75rem 1.25rem;
  transition: all 0.3s ease;
  color: #64748b;
  &:hover {
    color: #2563eb;
  }
`;