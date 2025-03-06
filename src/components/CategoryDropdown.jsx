/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../api/api';

const dropdownStyles = css`
  position: relative;
  display: inline-block;
`;

const buttonStyles = css`
  background-color: #2563eb;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: #1e40af;
    transform: translateY(-1px);
  }
`;

const menuContainerStyles = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const menuStyles = css`
  background: white;
  border-radius: 0.75rem;
  width: 80%;
  max-width: 800px;
  height: 80%;
  display: flex;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
`;

const parentCategoriesStyles = css`
  width: 40%;
  border-right: 1px solid #e2e8f0;
  overflow-y: auto;
  padding: 1rem;
`;

const subCategoriesStyles = css`
  width: 60%;
  overflow-y: auto;
  padding: 1rem;
`;

const itemStyles = css`
  padding: 0.75rem 1rem;
  color: #374151;
  text-align: right;
  transition: all 0.2s ease;
  cursor: pointer;
  &:hover {
    background-color: #f8fafc;
    color: #2563eb;
  }
`;

const CategoryDropdown = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        setError(err.detail || 'خطا در بارگذاری دسته‌بندی‌ها');
      }
    };
    fetchCategories();
  }, []);

  const topLevelCategories = categories.filter((cat) => !cat.parent_id);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div css={dropdownStyles}>
      <button 
        css={buttonStyles} 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="hover:shadow-lg"
      >
        دسته‌بندی‌ها
      </button>

      {isMenuOpen && (
        <div css={menuContainerStyles} onClick={() => setIsMenuOpen(false)}>
          <div css={menuStyles} onClick={(e) => e.stopPropagation()}>
            {/* Parent Categories */}
            <div css={parentCategoriesStyles}>
              {topLevelCategories.map((category) => (
                <div
                  key={category.id}
                  css={itemStyles}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category.name}
                </div>
              ))}
            </div>

            {/* Subcategories */}
            <div css={subCategoriesStyles}>
              {selectedCategory?.subcategories?.map((subcat) => (
                <div key={subcat.id} css={itemStyles}>
                  <Link to={`/categories/${subcat.id}`} className="w-full">
                    {subcat.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;