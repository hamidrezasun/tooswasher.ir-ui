/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getCategories } from '../api/api';

const pageStyles = css`
  padding-top: 7rem;
  min-height: 100vh;
  background-color: #f9fafb;
`;

const contentStyles = css`
  max-width: 7xl;
  margin: 0 auto;
  padding: 2rem 1rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Category = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categories = await getCategories();
        const foundCategory = findCategoryById(categories, parseInt(categoryId));
        if (!foundCategory) throw new Error('دسته‌بندی یافت نشد');
        setCategory(foundCategory);
      } catch (err) {
        setError(err.detail || 'خطا در بارگذاری دسته‌بندی');
      }
    };
    fetchCategory();
  }, [categoryId]);

  // Recursive function to find category by ID
  const findCategoryById = (categories, id) => {
    for (const cat of categories) {
      if (cat.id === id) return cat;
      if (cat.subcategories && cat.subcategories.length > 0) {
        const found = findCategoryById(cat.subcategories, id);
        if (found) return found;
      }
    }
    return null;
  };

  if (error) {
    return (
      <div css={pageStyles}>
        <Navbar />
        <div css={contentStyles} className="text-center text-red-500">
          {error}
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div css={pageStyles}>
        <Navbar />
        <div css={contentStyles} className="text-center">
          در حال بارگذاری...
        </div>
      </div>
    );
  }

  return (
    <div css={pageStyles}>
      <Navbar />
      <div css={contentStyles}>
        <h1 className="text-3xl font-bold mb-4 text-gray-800">{category.name}</h1>
        <p className="text-gray-700 mb-4">{category.description}</p>
        {category.subcategories && category.subcategories.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-2">زیرمجموعه‌ها</h2>
            <ul className="list-disc list-inside text-gray-700">
              {category.subcategories.map((subcat) => (
                <li key={subcat.id}>
                  <Link to={`/categories/${subcat.id}`} className="text-blue-600 hover:underline">
                    {subcat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;